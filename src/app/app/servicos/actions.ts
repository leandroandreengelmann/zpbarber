"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { serviceSchema } from "@/lib/zod/catalog";
import { parseMoneyToCents } from "@/lib/format";
import { can } from "@/lib/auth/capabilities";

type State = { error?: string; ok?: boolean };

function parseForm(formData: FormData) {
  return serviceSchema.safeParse({
    name: formData.get("name") ?? "",
    duration_minutes: formData.get("duration_minutes") ?? 0,
    price_cents: parseMoneyToCents((formData.get("price") as string) ?? "0"),
    commission_percent: formData.get("commission_percent") ?? 0,
    is_active: formData.get("is_active") === "on",
  });
}

async function ensureManager() {
  const { membership } = await requireBarbershop();
  if (!can(membership, "servicos.gerenciar")) {
    return { error: "Sem permissão para alterar serviços." } as const;
  }
  return { shopId: membership.barbershop!.id } as const;
}

export async function createServiceAction(_prev: State, formData: FormData): Promise<State> {
  const ctx = await ensureManager();
  if ("error" in ctx) return ctx;
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("services").insert({
    barbershop_id: ctx.shopId,
    ...parsed.data,
  });
  if (error) return { error: error.message };
  revalidatePath("/app/servicos");
  return { ok: true };
}

export async function updateServiceAction(
  id: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  const ctx = await ensureManager();
  if ("error" in ctx) return ctx;
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("services")
    .update(parsed.data)
    .eq("id", id)
    .eq("barbershop_id", ctx.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/servicos");
  revalidatePath(`/app/servicos/${id}`);
  return { ok: true };
}

export async function deleteServiceAction(id: string) {
  const ctx = await ensureManager();
  if ("error" in ctx) throw new Error(ctx.error);
  const supabase = await createClient();

  const { count } = await supabase
    .from("sale_items")
    .select("id", { count: "exact", head: true })
    .eq("service_id", id);

  if ((count ?? 0) > 0) {
    const { error } = await supabase
      .from("services")
      .update({ is_active: false })
      .eq("id", id)
      .eq("barbershop_id", ctx.shopId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id)
      .eq("barbershop_id", ctx.shopId);
    if (error) throw error;
  }

  revalidatePath("/app/servicos");
}
