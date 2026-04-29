"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { productSchema } from "@/lib/zod/catalog";
import { parseMoneyToCents } from "@/lib/format";

type State = { error?: string; ok?: boolean };

function parseForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name") ?? "",
    sku: formData.get("sku") ?? "",
    price_cents: parseMoneyToCents((formData.get("price") as string) ?? "0"),
    cost_cents: parseMoneyToCents((formData.get("cost") as string) ?? "0"),
    stock_qty: formData.get("stock_qty") ?? 0,
    stock_min: formData.get("stock_min") ?? 0,
    commission_percent: formData.get("commission_percent") ?? 0,
    is_active: formData.get("is_active") === "on",
  });
}

async function ensureManager() {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") {
    return { error: "apenas gestores podem alterar" } as const;
  }
  return { shopId: membership.barbershop!.id } as const;
}

export async function createProductAction(_prev: State, formData: FormData): Promise<State> {
  const ctx = await ensureManager();
  if ("error" in ctx) return ctx;
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }
  const supabase = await createClient();
  const { error } = await supabase.from("products").insert({
    barbershop_id: ctx.shopId,
    ...parsed.data,
    sku: parsed.data.sku || null,
  });
  if (error) return { error: error.message };
  revalidatePath("/app/produtos");
  return { ok: true };
}

export async function updateProductAction(
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
    .from("products")
    .update({ ...parsed.data, sku: parsed.data.sku || null })
    .eq("id", id)
    .eq("barbershop_id", ctx.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/produtos");
  revalidatePath(`/app/produtos/${id}`);
  return { ok: true };
}

export async function deleteProductAction(id: string) {
  const ctx = await ensureManager();
  if ("error" in ctx) throw new Error(ctx.error);
  const supabase = await createClient();

  const { count } = await supabase
    .from("sale_items")
    .select("id", { count: "exact", head: true })
    .eq("product_id", id);

  if ((count ?? 0) > 0) {
    const { error } = await supabase
      .from("products")
      .update({ is_active: false })
      .eq("id", id)
      .eq("barbershop_id", ctx.shopId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .eq("barbershop_id", ctx.shopId);
    if (error) throw error;
  }

  revalidatePath("/app/produtos");
}
