"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import {
  businessHoursSchema,
  shopSettingsSchema,
} from "@/lib/zod/settings";

type State = { error?: string; ok?: boolean };

export async function updateShopSettingsAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") {
    return { error: "apenas gestores podem alterar" };
  }
  const shopId = membership.barbershop!.id;

  const parsed = shopSettingsSchema.safeParse({
    name: formData.get("name") ?? "",
    cnpj: formData.get("cnpj") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    primary_color: formData.get("primary_color") ?? "",
    logo_url: formData.get("logo_url") ?? "",
    address: {
      cep: formData.get("address.cep") ?? "",
      street: formData.get("address.street") ?? "",
      number: formData.get("address.number") ?? "",
      complement: formData.get("address.complement") ?? "",
      neighborhood: formData.get("address.neighborhood") ?? "",
      city: formData.get("address.city") ?? "",
      state: formData.get("address.state") ?? "",
    },
  });

  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const v = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("barbershops")
    .update({
      name: v.name,
      cnpj: v.cnpj || null,
      phone: v.phone || null,
      email: v.email || null,
      primary_color: v.primary_color || null,
      logo_url: v.logo_url || null,
      address: v.address,
    })
    .eq("id", shopId);

  if (error) return { error: error.message };
  revalidatePath("/app/configuracoes");
  return { ok: true };
}

export async function togglePublicBookingAction(formData: FormData): Promise<State> {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") {
    return { error: "apenas gestores podem alterar" };
  }
  const shopId = membership.barbershop!.id;
  const enabled = formData.get("enabled") === "true";
  const supabase = await createClient();
  const { error } = await supabase
    .from("barbershops")
    .update({ public_booking_enabled: enabled })
    .eq("id", shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/configuracoes");
  revalidatePath(`/[slug]`, "page");
  return { ok: true };
}

export async function updateBusinessHoursAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") {
    return { error: "apenas gestores podem alterar" };
  }
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const rows: Array<{
    barbershop_id: string;
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
    const parsed = businessHoursSchema.safeParse({
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
      barbershop_id: shopId,
      weekday,
      is_closed: parsed.data.is_closed,
      opens_at: parsed.data.is_closed ? null : parsed.data.opens_at,
      closes_at: parsed.data.is_closed ? null : parsed.data.closes_at,
      break_starts_at: hasBreak ? parsed.data.break_starts_at : null,
      break_ends_at: hasBreak ? parsed.data.break_ends_at : null,
    });
  }

  const { error } = await supabase
    .from("business_hours")
    .upsert(rows, { onConflict: "barbershop_id,weekday" });
  if (error) return { error: error.message };
  revalidatePath("/app/configuracoes");
  return { ok: true };
}
