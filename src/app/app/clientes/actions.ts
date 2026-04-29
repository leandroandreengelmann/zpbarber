"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { clientSchema } from "@/lib/zod/agenda";

type State = { error?: string; ok?: boolean };

async function ensureStaff() {
  const { user, membership } = await requireBarbershop();
  return {
    userId: user.id,
    shopId: membership.barbershop!.id,
    role: membership.role,
  };
}

export async function createClientAction(_prev: State, fd: FormData): Promise<State> {
  const ctx = await ensureStaff();
  const parsed = clientSchema.safeParse({
    full_name: fd.get("full_name") ?? "",
    phone: fd.get("phone") ?? "",
    email: fd.get("email") ?? "",
    notes: fd.get("notes") ?? "",
    accepts_whatsapp: fd.get("accepts_whatsapp") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("clients").insert({
    barbershop_id: ctx.shopId,
    full_name: parsed.data.full_name,
    phone: parsed.data.phone || null,
    email: parsed.data.email || null,
    notes: parsed.data.notes || null,
    accepts_whatsapp: parsed.data.accepts_whatsapp,
  });
  if (error) return { error: error.message };
  revalidatePath("/app/clientes");
  return { ok: true };
}

export async function updateClientAction(
  id: string,
  _prev: State,
  fd: FormData
): Promise<State> {
  const ctx = await ensureStaff();
  const parsed = clientSchema.safeParse({
    full_name: fd.get("full_name") ?? "",
    phone: fd.get("phone") ?? "",
    email: fd.get("email") ?? "",
    notes: fd.get("notes") ?? "",
    accepts_whatsapp: fd.get("accepts_whatsapp") === "on",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const updates: {
    full_name: string;
    phone: string | null;
    email: string | null;
    notes: string | null;
    accepts_whatsapp: boolean;
    whatsapp_optout_at?: string | null;
  } = {
    full_name: parsed.data.full_name,
    phone: parsed.data.phone || null,
    email: parsed.data.email || null,
    notes: parsed.data.notes || null,
    accepts_whatsapp: parsed.data.accepts_whatsapp,
  };
  if (parsed.data.accepts_whatsapp) updates.whatsapp_optout_at = null;
  const { error } = await supabase
    .from("clients")
    .update(updates)
    .eq("id", id)
    .eq("barbershop_id", ctx.shopId);
  if (error) return { error: error.message };
  revalidatePath(`/app/clientes/${id}`);
  revalidatePath("/app/clientes");
  return { ok: true };
}

export async function deleteClientAction(id: string) {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") throw new Error("apenas gestores");
  const supabase = await createClient();
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("barbershop_id", membership.barbershop!.id);
  if (error) throw new Error(error.message);
  revalidatePath("/app/clientes");
  redirect("/app/clientes");
}
