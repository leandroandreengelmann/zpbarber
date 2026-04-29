"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireSuperAdmin } from "@/lib/auth/guards";
import { cancelAsaasSubscription } from "@/lib/asaas/client";
import { logAudit } from "@/lib/audit/log";
import { subscribeShopToPlan } from "@/lib/billing/subscribe";

type State = { error?: string; ok?: boolean };

export async function subscribeBarbershopToPlanAction(
  barbershopId: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  await requireSuperAdmin();
  const planId = String(formData.get("plan_id") ?? "").trim();
  if (!planId) return { error: "Selecione um plano." };

  const result = await subscribeShopToPlan(barbershopId, planId);
  if (!result.ok) return { error: result.error };

  await logAudit({
    action: "subscription.create",
    barbershopId,
    resourceType: "subscription",
    resourceId: result.subscriptionId,
    metadata: {
      plan_id: planId,
      plan_name: result.planName,
      cycle: result.planCycle,
      value_cents: result.valueCents,
      trial_days: result.trialDays,
      asaas_customer_id: result.asaasCustomerId,
      asaas_subscription_id: result.asaasSubscriptionId,
      via: "super_admin",
    },
  });

  revalidatePath(`/admin/barbershops/${barbershopId}`);
  revalidatePath("/admin/billing");
  return { ok: true };
}

export async function cancelBarbershopSubscriptionAction(
  barbershopId: string,
  _prev: State,
  formData: FormData
): Promise<State> {
  await requireSuperAdmin();
  const subscriptionId = String(formData.get("subscription_id") ?? "").trim();
  const reason = String(formData.get("reason") ?? "").trim() || null;
  if (!subscriptionId) return { error: "Assinatura não informada." };

  const supabase = await createClient();
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("id, asaas_subscription_id, barbershop_id, status")
    .eq("id", subscriptionId)
    .maybeSingle();

  if (!sub) return { error: "Assinatura não encontrada." };
  if (sub.barbershop_id !== barbershopId) return { error: "Assinatura inválida." };
  if (sub.status === "cancelled") return { error: "Já está cancelada." };

  if (sub.asaas_subscription_id) {
    try {
      await cancelAsaasSubscription(sub.asaas_subscription_id);
    } catch (err) {
      return {
        error:
          err instanceof Error
            ? `Falha ao cancelar no Asaas: ${err.message}`
            : "Falha ao cancelar no Asaas.",
      };
    }
  }

  const { error: updErr } = await supabase
    .from("subscriptions")
    .update({
      status: "cancelled",
      cancelled_at: new Date().toISOString(),
      cancel_reason: reason,
    })
    .eq("id", sub.id);
  if (updErr) return { error: updErr.message };

  await logAudit({
    action: "subscription.cancel",
    barbershopId,
    resourceType: "subscription",
    resourceId: sub.id,
    metadata: { reason },
  });

  revalidatePath(`/admin/barbershops/${barbershopId}`);
  revalidatePath("/admin/billing");
  return { ok: true };
}
