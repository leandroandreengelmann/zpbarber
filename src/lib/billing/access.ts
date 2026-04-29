import "server-only";
import { createClient } from "@/lib/supabase/server";

export type BillingState =
  | { kind: "trial"; reason: "no_subscription"; trialEndsAt: string | null }
  | { kind: "ok"; subscriptionStatus: "trialing" | "active" }
  | { kind: "warn"; subscriptionStatus: "past_due"; openInvoiceId: string | null }
  | {
      kind: "blocked";
      reason:
        | "suspended"
        | "cancelled"
        | "shop_suspended"
        | "shop_cancelled"
        | "trial_expired";
      openInvoiceId: string | null;
    };

/**
 * Resolve o estado de cobrança da barbearia para gating de acesso ao /app.
 * - trial: barbearia em trial sem assinatura paga ainda → libera tudo
 * - ok: assinatura ativa ou em trialing → libera tudo
 * - warn: past_due → libera tudo, exibe banner pra regularizar
 * - blocked: suspended/cancelled (sub) ou shop suspenso/cancelado → corta acesso
 */
export async function getBarbershopBillingState(
  barbershopId: string
): Promise<BillingState> {
  const supabase = await createClient();

  const { data: shop } = await supabase
    .from("barbershops")
    .select("status, trial_ends_at")
    .eq("id", barbershopId)
    .maybeSingle();

  if (shop?.status === "suspended") {
    return { kind: "blocked", reason: "shop_suspended", openInvoiceId: null };
  }
  if (shop?.status === "cancelled") {
    return { kind: "blocked", reason: "shop_cancelled", openInvoiceId: null };
  }

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("barbershop_id", barbershopId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!sub) {
    if (
      shop?.trial_ends_at &&
      new Date(shop.trial_ends_at).getTime() < Date.now()
    ) {
      return { kind: "blocked", reason: "trial_expired", openInvoiceId: null };
    }
    return {
      kind: "trial",
      reason: "no_subscription",
      trialEndsAt: shop?.trial_ends_at ?? null,
    };
  }

  if (sub.status === "active" || sub.status === "trialing") {
    return { kind: "ok", subscriptionStatus: sub.status };
  }

  // Para past_due/suspended/cancelled, busca a invoice em aberto mais recente
  const { data: openInvoice } = await supabase
    .from("invoices")
    .select("id")
    .eq("barbershop_id", barbershopId)
    .in("status", ["pending", "overdue"])
    .order("due_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (sub.status === "past_due") {
    return {
      kind: "warn",
      subscriptionStatus: "past_due",
      openInvoiceId: openInvoice?.id ?? null,
    };
  }

  return {
    kind: "blocked",
    reason: sub.status === "suspended" ? "suspended" : "cancelled",
    openInvoiceId: openInvoice?.id ?? null,
  };
}
