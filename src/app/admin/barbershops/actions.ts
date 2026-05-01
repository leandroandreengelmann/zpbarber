"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { ACTIVE_TENANT_COOKIE } from "@/lib/auth/current-tenant";
import {
  assignMemberSchema,
  barbershopSchema,
} from "@/lib/zod/barbershop";
import { logAudit } from "@/lib/audit/log";
import { getPlatformSettings } from "@/lib/platform-settings";

type State = { error?: string; ok?: boolean };

function parseForm(formData: FormData) {
  return barbershopSchema.safeParse({
    slug: formData.get("slug") ?? "",
    name: formData.get("name") ?? "",
    cnpj: formData.get("cnpj") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    status: formData.get("status") ?? "trial",
    primary_color: formData.get("primary_color") ?? "",
    trial_ends_at: formData.get("trial_ends_at") ?? "",
  });
}

export async function createBarbershopAction(_prev: State, formData: FormData): Promise<State> {
  await requireSuperAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const v = parsed.data;
  const supabase = await createClient();

  let trialEndsAt: string | null = v.trial_ends_at || null;
  if (v.status === "trial" && !trialEndsAt) {
    const settings = await getPlatformSettings();
    const days = settings.default_trial_days ?? 14;
    const dt = new Date();
    dt.setUTCDate(dt.getUTCDate() + days);
    dt.setUTCHours(23, 59, 59, 999);
    trialEndsAt = dt.toISOString();
  }

  const { data, error } = await supabase
    .from("barbershops")
    .insert({
      slug: v.slug,
      name: v.name,
      cnpj: v.cnpj || null,
      phone: v.phone || null,
      email: v.email || null,
      status: v.status,
      primary_color: v.primary_color || null,
      trial_ends_at: trialEndsAt,
    })
    .select("id")
    .single();
  if (error) return { error: error.message };
  await logAudit({
    action: "barbershop.create",
    barbershopId: data.id,
    resourceType: "barbershop",
    resourceId: data.id,
    metadata: {
      slug: v.slug,
      name: v.name,
      status: v.status,
      trial_ends_at: trialEndsAt,
    },
  });
  revalidatePath("/admin/barbershops");
  redirect(`/admin/barbershops/${data.id}`);
}

export async function updateBarbershopAction(
  id: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  await requireSuperAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const v = parsed.data;
  const supabase = await createClient();
  const { data: prev } = await supabase
    .from("barbershops")
    .select("status")
    .eq("id", id)
    .maybeSingle();
  const { error } = await supabase
    .from("barbershops")
    .update({
      slug: v.slug,
      name: v.name,
      cnpj: v.cnpj || null,
      phone: v.phone || null,
      email: v.email || null,
      status: v.status,
      primary_color: v.primary_color || null,
      trial_ends_at: v.trial_ends_at || null,
    })
    .eq("id", id);
  if (error) return { error: error.message };

  if (prev && prev.status !== v.status) {
    await logAudit({
      action: "barbershop.status_change",
      barbershopId: id,
      resourceType: "barbershop",
      resourceId: id,
      metadata: { from: prev.status, to: v.status },
    });
  }

  revalidatePath("/admin/barbershops");
  revalidatePath(`/admin/barbershops/${id}`);
  return { ok: true };
}

export async function assignMemberAction(
  barbershopId: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  await requireSuperAdmin();
  const parsed = assignMemberSchema.safeParse({
    email: formData.get("email") ?? "",
    role: formData.get("role") ?? "gestor",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const { error } = await supabase.rpc("assign_member_by_email", {
    _barbershop: barbershopId,
    _email: parsed.data.email,
    _role: parsed.data.role,
  });
  if (error) {
    if (error.message.includes("user_not_found")) {
      return { error: "usuário não encontrado — peça para criar conta primeiro" };
    }
    return { error: error.message };
  }
  await logAudit({
    action: "membership.role_change",
    barbershopId,
    resourceType: "membership",
    metadata: { email: parsed.data.email, role: parsed.data.role },
  });
  revalidatePath(`/admin/barbershops/${barbershopId}`);
  return { ok: true };
}

export async function enterBarbershopAction(barbershopId: string) {
  await requireSuperAdmin();
  const c = await cookies();
  c.set(ACTIVE_TENANT_COOKIE, barbershopId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  await logAudit({
    action: "barbershop.impersonate_enter",
    barbershopId,
    resourceType: "barbershop",
    resourceId: barbershopId,
  });
  redirect("/app");
}

export async function exitBarbershopAction() {
  await requireSuperAdmin();
  const c = await cookies();
  const previous = c.get(ACTIVE_TENANT_COOKIE)?.value ?? null;
  c.delete(ACTIVE_TENANT_COOKIE);
  if (previous) {
    await logAudit({
      action: "barbershop.impersonate_exit",
      barbershopId: previous,
      resourceType: "barbershop",
      resourceId: previous,
    });
  }
  redirect("/admin/barbershops");
}

export async function setMemberActiveAction(
  barbershopId: string,
  userId: string,
  isActive: boolean
) {
  await requireSuperAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("barbershop_members")
    .update({ is_active: isActive })
    .eq("barbershop_id", barbershopId)
    .eq("user_id", userId);
  if (error) throw error;
  await logAudit({
    action: isActive ? "membership.role_change" : "membership.remove",
    barbershopId,
    resourceType: "membership",
    resourceId: userId,
    metadata: { is_active: isActive },
  });
  revalidatePath(`/admin/barbershops/${barbershopId}`);
}
