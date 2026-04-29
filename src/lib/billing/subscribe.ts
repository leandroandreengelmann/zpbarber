import { createClient } from "@/lib/supabase/server";
import {
  cancelAsaasSubscription,
  createAsaasCustomer,
  createAsaasSubscription,
  listAsaasPaymentsBySubscription,
  mapAsaasPaymentStatus,
  mapPlanCycleToAsaas,
} from "@/lib/asaas/client";
import { requireAsaasConfig } from "@/lib/asaas/config";

type Result =
  | { ok: true; subscriptionId: string; planName: string; planCycle: string; valueCents: number; trialDays: number; asaasCustomerId: string; asaasSubscriptionId: string }
  | { ok: false; error: string };

function isoDateOffsetDays(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + Math.max(0, days));
  return d.toISOString().slice(0, 10);
}

export async function subscribeShopToPlan(
  barbershopId: string,
  planId: string
): Promise<Result> {
  await requireAsaasConfig();

  const supabase = await createClient();

  const [shopRes, planRes, currentSubRes] = await Promise.all([
    supabase
      .from("barbershops")
      .select("id, name, email, cnpj, phone")
      .eq("id", barbershopId)
      .maybeSingle(),
    supabase
      .from("plans")
      .select("id, name, price_cents, billing_cycle, trial_days, is_active")
      .eq("id", planId)
      .maybeSingle(),
    supabase
      .from("subscriptions")
      .select("id, status")
      .eq("barbershop_id", barbershopId)
      .in("status", ["trialing", "active", "past_due"])
      .maybeSingle(),
  ]);

  if (!shopRes.data) return { ok: false, error: "Barbearia não encontrada." };
  if (!planRes.data) return { ok: false, error: "Plano não encontrado." };
  if (!planRes.data.is_active)
    return { ok: false, error: "Plano arquivado — escolha outro." };
  if (currentSubRes.data) {
    return {
      ok: false,
      error:
        "Esta barbearia já tem uma assinatura ativa. Cancele antes de criar outra.",
    };
  }

  const shop = shopRes.data;
  const plan = planRes.data;
  const trialDays = plan.trial_days ?? 0;
  const value = plan.price_cents / 100;
  const nextDueDate = isoDateOffsetDays(trialDays);

  let asaasCustomerId: string;
  let asaasSubscriptionId: string;
  try {
    const customer = await createAsaasCustomer({
      name: shop.name,
      email: shop.email ?? undefined,
      cpfCnpj: shop.cnpj ?? undefined,
      mobilePhone: shop.phone ?? undefined,
      externalReference: shop.id,
    });
    asaasCustomerId = customer.id;

    const sub = await createAsaasSubscription({
      customer: asaasCustomerId,
      value,
      nextDueDate,
      cycle: mapPlanCycleToAsaas(plan.billing_cycle),
      description: `${plan.name} — ${shop.name}`,
      externalReference: shop.id,
    });
    asaasSubscriptionId = sub.id;
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? `Falha no Asaas: ${err.message}`
          : "Falha ao criar assinatura no Asaas.",
    };
  }

  const trialEndsAt =
    trialDays > 0 ? new Date(nextDueDate + "T00:00:00Z").toISOString() : null;
  const status = trialDays > 0 ? "trialing" : "active";

  const { data: insertedSub, error: insertErr } = await supabase
    .from("subscriptions")
    .insert({
      barbershop_id: shop.id,
      plan_id: plan.id,
      status,
      asaas_customer_id: asaasCustomerId,
      asaas_subscription_id: asaasSubscriptionId,
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(nextDueDate + "T00:00:00Z").toISOString(),
      trial_ends_at: trialEndsAt,
    })
    .select("id")
    .single();

  if (insertErr) {
    try {
      await cancelAsaasSubscription(asaasSubscriptionId);
    } catch {}
    return { ok: false, error: `Falha ao salvar localmente: ${insertErr.message}` };
  }

  // Backfill payments (silent failure, webhook é o seguro)
  try {
    const payments = await listAsaasPaymentsBySubscription(asaasSubscriptionId, {
      limit: 5,
    });
    const rows = (payments.data ?? []).map((p) => ({
      subscription_id: insertedSub.id,
      barbershop_id: shop.id,
      asaas_payment_id: p.id,
      amount_cents: Math.round((p.value ?? 0) * 100),
      status: mapAsaasPaymentStatus(p.status),
      due_date: p.dueDate,
      payment_method: null,
      invoice_url: p.invoiceUrl ?? null,
      paid_at:
        mapAsaasPaymentStatus(p.status) === "paid" && p.paymentDate
          ? new Date(p.paymentDate).toISOString()
          : null,
    }));
    if (rows.length > 0) {
      await supabase.from("invoices").upsert(rows, { onConflict: "asaas_payment_id" });
    }
  } catch (err) {
    console.warn("[asaas] backfill payments failed:", err);
  }

  return {
    ok: true,
    subscriptionId: insertedSub.id,
    planName: plan.name,
    planCycle: plan.billing_cycle,
    valueCents: plan.price_cents,
    trialDays,
    asaasCustomerId,
    asaasSubscriptionId,
  };
}
