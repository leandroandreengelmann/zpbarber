"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";

type State = { error?: string; ok?: boolean };

const payoutSchema = z.object({
  period_start: z.string().min(1, "informe o início do período"),
  period_end: z.string().min(1, "informe o fim do período"),
  total_cents: z.coerce.number().int().min(0, "total inválido"),
  method: z.enum(["cash", "pix", "bank_transfer", "other"], {
    message: "selecione um método",
  }),
  paid_at: z.string().min(1, "informe a data do pagamento"),
  notes: z.string().trim().max(500).optional().default(""),
});

async function ensureManager() {
  const { user, membership } = await requireBarbershop();
  if (membership.role !== "gestor") {
    return { error: "apenas gestores podem registrar pagamentos" } as const;
  }
  return { user, shopId: membership.barbershop!.id } as const;
}

export async function registerPayoutAction(
  barberId: string,
  _prev: State,
  fd: FormData
): Promise<State> {
  const ctx = await ensureManager();
  if ("error" in ctx) return ctx;

  const parsed = payoutSchema.safeParse({
    period_start: fd.get("period_start") ?? "",
    period_end: fd.get("period_end") ?? "",
    total_cents: fd.get("total_cents") ?? 0,
    method: fd.get("method") ?? "",
    paid_at: fd.get("paid_at") ?? "",
    notes: fd.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("commission_payouts").insert({
    barbershop_id: ctx.shopId,
    barber_id: barberId,
    period_start: parsed.data.period_start,
    period_end: parsed.data.period_end,
    total_cents: parsed.data.total_cents,
    method: parsed.data.method,
    paid_at: new Date(parsed.data.paid_at).toISOString(),
    notes: parsed.data.notes || null,
    created_by: ctx.user.id,
  });
  if (error) return { error: error.message };

  revalidatePath(`/app/comissoes/${barberId}`);
  revalidatePath("/app/comissoes");
  return { ok: true };
}

export async function deletePayoutAction(
  barberId: string,
  payoutId: string
): Promise<void> {
  const ctx = await ensureManager();
  if ("error" in ctx) throw new Error(ctx.error);
  const supabase = await createClient();
  const { error } = await supabase
    .from("commission_payouts")
    .delete()
    .eq("id", payoutId)
    .eq("barber_id", barberId)
    .eq("barbershop_id", ctx.shopId);
  if (error) throw error;
  revalidatePath(`/app/comissoes/${barberId}`);
  revalidatePath("/app/comissoes");
}
