"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import {
  barberCommissionSettingsSchema,
  barberProductsPayloadSchema,
  barberServicesPayloadSchema,
  barberTimeOffSchema,
  barberWorkingDaySchema,
} from "@/lib/zod/barber-capabilities";
import { profileSchema } from "@/lib/zod/team";

type State = { error?: string; ok?: boolean };

async function ensureCanEdit(barberId: string) {
  const { user, membership } = await requireBarbershop();
  const isManager = membership.role === "gestor";
  const isSelf = user.id === barberId;
  if (!isManager && !isSelf) {
    return { error: "sem permissão para editar este barbeiro" } as const;
  }
  return { shopId: membership.barbershop!.id } as const;
}

async function ensureManager(barberId: string) {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") {
    return { error: "apenas gestores podem alterar" } as const;
  }
  return { shopId: membership.barbershop!.id, barberId } as const;
}

export async function saveBarberServicesAction(
  barberId: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  const ctx = await ensureCanEdit(barberId);
  if ("error" in ctx) return ctx;

  const raw = formData.get("payload");
  if (typeof raw !== "string") return { error: "payload inválido" };

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return { error: "payload inválido" };
  }

  const parsed = barberServicesPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  const supabase = await createClient();

  const enabledRows = parsed.data.rows.filter((r) => r.enabled);
  const disabledIds = parsed.data.rows
    .filter((r) => !r.enabled)
    .map((r) => r.service_id);

  if (enabledRows.length > 0) {
    const upsertRows = enabledRows.map((r) => ({
      barbershop_id: ctx.shopId,
      barber_id: barberId,
      service_id: r.service_id,
      price_cents: r.price_cents,
      duration_minutes: r.duration_minutes,
      commission_percent: r.commission_percent,
      is_active: true,
    }));
    const { error } = await supabase
      .from("barber_services")
      .upsert(upsertRows, { onConflict: "barber_id,service_id" });
    if (error) return { error: error.message };
  }

  if (disabledIds.length > 0) {
    const { error } = await supabase
      .from("barber_services")
      .update({ is_active: false })
      .eq("barber_id", barberId)
      .in("service_id", disabledIds);
    if (error) return { error: error.message };
  }

  revalidatePath(`/app/barbeiros/${barberId}`);
  return { ok: true };
}

export async function saveBarberWorkingHoursAction(
  barberId: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  const ctx = await ensureCanEdit(barberId);
  if ("error" in ctx) return ctx;

  const supabase = await createClient();
  const rows: Array<{
    barbershop_id: string;
    barber_id: string;
    weekday: number;
    is_closed: boolean;
    opens_at: string | null;
    closes_at: string | null;
    break_starts_at: string | null;
    break_ends_at: string | null;
  }> = [];

  for (let weekday = 0; weekday < 7; weekday++) {
    const isClosed = formData.get(`day_${weekday}_closed`) === "on";
    const opens = (formData.get(`day_${weekday}_opens`) as string) ?? "";
    const closes = (formData.get(`day_${weekday}_closes`) as string) ?? "";
    const breakStarts = (formData.get(`day_${weekday}_break_starts`) as string) ?? "";
    const breakEnds = (formData.get(`day_${weekday}_break_ends`) as string) ?? "";
    const parsed = barberWorkingDaySchema.safeParse({
      weekday,
      is_closed: isClosed,
      opens_at: opens,
      closes_at: closes,
      break_starts_at: breakStarts,
      break_ends_at: breakEnds,
    });
    if (!parsed.success) {
      return { error: `dia ${weekday}: ${parsed.error.issues[0].message}` };
    }
    const hasBreak =
      !parsed.data.is_closed &&
      parsed.data.break_starts_at !== "" &&
      parsed.data.break_ends_at !== "";
    rows.push({
      barbershop_id: ctx.shopId,
      barber_id: barberId,
      weekday,
      is_closed: parsed.data.is_closed,
      opens_at: parsed.data.is_closed ? null : parsed.data.opens_at,
      closes_at: parsed.data.is_closed ? null : parsed.data.closes_at,
      break_starts_at: hasBreak ? parsed.data.break_starts_at : null,
      break_ends_at: hasBreak ? parsed.data.break_ends_at : null,
    });
  }

  const { error } = await supabase
    .from("barber_working_hours")
    .upsert(rows, { onConflict: "barber_id,weekday" });
  if (error) return { error: error.message };

  revalidatePath(`/app/barbeiros/${barberId}`);
  return { ok: true };
}

export async function clearBarberWorkingHoursAction(barberId: string) {
  const ctx = await ensureCanEdit(barberId);
  if ("error" in ctx) throw new Error(ctx.error);
  const supabase = await createClient();
  const { error } = await supabase
    .from("barber_working_hours")
    .delete()
    .eq("barber_id", barberId);
  if (error) throw error;
  revalidatePath(`/app/barbeiros/${barberId}`);
}

export async function createBarberTimeOffAction(
  barberId: string,
  _prev: State,
  fd: FormData
): Promise<State> {
  const ctx = await ensureCanEdit(barberId);
  if ("error" in ctx) return ctx;

  const parsed = barberTimeOffSchema.safeParse({
    starts_at: fd.get("starts_at") ?? "",
    ends_at: fd.get("ends_at") ?? "",
    reason: fd.get("reason") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  const { user } = await requireBarbershop();
  const supabase = await createClient();
  const { error } = await supabase.from("barber_time_off").insert({
    barbershop_id: ctx.shopId,
    barber_id: barberId,
    starts_at: new Date(parsed.data.starts_at).toISOString(),
    ends_at: new Date(parsed.data.ends_at).toISOString(),
    reason: parsed.data.reason || null,
    created_by: user.id,
  });
  if (error) return { error: error.message };

  revalidatePath(`/app/barbeiros/${barberId}`);
  return { ok: true };
}

export async function deleteBarberTimeOffAction(
  barberId: string,
  timeOffId: string
) {
  const ctx = await ensureCanEdit(barberId);
  if ("error" in ctx) throw new Error(ctx.error);
  const supabase = await createClient();
  const { error } = await supabase
    .from("barber_time_off")
    .delete()
    .eq("id", timeOffId)
    .eq("barber_id", barberId);
  if (error) throw error;
  revalidatePath(`/app/barbeiros/${barberId}`);
}

export async function setBarberCommissionedAction(
  barberId: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  const ctx = await ensureManager(barberId);
  if ("error" in ctx) return ctx;

  const parsed = barberCommissionSettingsSchema.safeParse({
    is_commissioned: formData.get("is_commissioned") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("barbershop_members")
    .update({ is_commissioned: parsed.data.is_commissioned })
    .eq("barbershop_id", ctx.shopId)
    .eq("user_id", barberId);
  if (error) return { error: error.message };

  revalidatePath(`/app/barbeiros/${barberId}`);
  return { ok: true };
}

export async function saveBarberProductsAction(
  barberId: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  const ctx = await ensureManager(barberId);
  if ("error" in ctx) return ctx;

  const raw = formData.get("payload");
  if (typeof raw !== "string") return { error: "payload inválido" };

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return { error: "payload inválido" };
  }

  const parsed = barberProductsPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  const supabase = await createClient();

  const enabledRows = parsed.data.rows.filter((r) => r.enabled);
  const disabledIds = parsed.data.rows
    .filter((r) => !r.enabled)
    .map((r) => r.product_id);

  if (enabledRows.length > 0) {
    const upsertRows = enabledRows.map((r) => ({
      barbershop_id: ctx.shopId,
      barber_id: barberId,
      product_id: r.product_id,
      commission_percent: r.commission_percent ?? 0,
      is_active: true,
    }));
    const { error } = await supabase
      .from("barber_products")
      .upsert(upsertRows, { onConflict: "barber_id,product_id" });
    if (error) return { error: error.message };
  }

  if (disabledIds.length > 0) {
    const { error } = await supabase
      .from("barber_products")
      .update({ is_active: false })
      .eq("barber_id", barberId)
      .in("product_id", disabledIds);
    if (error) return { error: error.message };
  }

  revalidatePath(`/app/barbeiros/${barberId}`);
  return { ok: true };
}

export async function updateBarberProfileAction(
  barberId: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  const ctx = await ensureCanEdit(barberId);
  if ("error" in ctx) return ctx;

  const parsed = profileSchema.safeParse({
    full_name: formData.get("full_name") ?? "",
    phone: formData.get("phone") ?? "",
    avatar_url: formData.get("avatar_url") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("fn_update_member_profile", {
    _user_id: barberId,
    _full_name: parsed.data.full_name,
    _phone: parsed.data.phone ?? "",
    _avatar_url: parsed.data.avatar_url ?? "",
  });
  if (error) {
    if (error.message.includes("forbidden"))
      return { error: "sem permissão para editar este perfil" };
    return { error: error.message };
  }
  revalidatePath(`/app/barbeiros/${barberId}`);
  revalidatePath("/app/barbeiros");
  return { ok: true };
}
