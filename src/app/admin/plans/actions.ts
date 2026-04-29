"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { planUpsertSchema } from "@/lib/zod/plans";
import { logAudit } from "@/lib/audit/log";

type State = { error?: string; ok?: boolean };

function parseForm(formData: FormData) {
  const features = formData
    .getAll("features")
    .map((v) => String(v).trim())
    .filter(Boolean);
  return planUpsertSchema.safeParse({
    id: (formData.get("id") as string) || undefined,
    slug: formData.get("slug") ?? "",
    name: formData.get("name") ?? "",
    description: formData.get("description") ?? "",
    price_cents: formData.get("price_cents") ?? 0,
    billing_cycle: formData.get("billing_cycle") ?? "monthly",
    trial_days: formData.get("trial_days") ?? 0,
    max_barbers: formData.get("max_barbers") ?? "",
    max_whatsapp_messages_per_month:
      formData.get("max_whatsapp_messages_per_month") ?? "",
    features,
    is_active: formData.get("is_active") === "on",
    sort_order: formData.get("sort_order") ?? 0,
  });
}

export async function createPlanAction(
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
  const { data, error } = await supabase
    .from("plans")
    .insert({
      slug: v.slug,
      name: v.name,
      description: v.description ?? null,
      price_cents: v.price_cents,
      billing_cycle: v.billing_cycle,
      trial_days: v.trial_days,
      max_barbers: v.max_barbers ?? null,
      max_whatsapp_messages_per_month: v.max_whatsapp_messages_per_month ?? null,
      features: v.features,
      is_active: v.is_active,
      sort_order: v.sort_order,
    })
    .select("id")
    .single();
  if (error) return { error: error.message };

  await logAudit({
    action: "plan.create",
    resourceType: "plan",
    resourceId: data.id,
    metadata: { slug: v.slug, price_cents: v.price_cents, cycle: v.billing_cycle },
  });

  revalidatePath("/admin/plans");
  redirect(`/admin/plans/${data.id}`);
}

export async function updatePlanAction(
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
  const { error } = await supabase
    .from("plans")
    .update({
      slug: v.slug,
      name: v.name,
      description: v.description ?? null,
      price_cents: v.price_cents,
      billing_cycle: v.billing_cycle,
      trial_days: v.trial_days,
      max_barbers: v.max_barbers ?? null,
      max_whatsapp_messages_per_month: v.max_whatsapp_messages_per_month ?? null,
      features: v.features,
      is_active: v.is_active,
      sort_order: v.sort_order,
    })
    .eq("id", id);
  if (error) return { error: error.message };

  await logAudit({
    action: "plan.update",
    resourceType: "plan",
    resourceId: id,
    metadata: { slug: v.slug, price_cents: v.price_cents, is_active: v.is_active },
  });

  revalidatePath("/admin/plans");
  revalidatePath(`/admin/plans/${id}`);
  return { ok: true };
}

export async function archivePlanAction(id: string) {
  await requireSuperAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("plans")
    .update({ is_active: false })
    .eq("id", id);
  if (error) throw error;
  await logAudit({
    action: "plan.archive",
    resourceType: "plan",
    resourceId: id,
  });
  revalidatePath("/admin/plans");
  revalidatePath(`/admin/plans/${id}`);
}
