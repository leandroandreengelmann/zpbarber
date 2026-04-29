"use server";

import { revalidatePath } from "next/cache";
import { requireBarbershop } from "@/lib/auth/guards";
import { logAudit } from "@/lib/audit/log";
import { subscribeShopToPlan } from "@/lib/billing/subscribe";

type State = { error?: string; ok?: boolean };

export async function subscribeMyShopAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor")
    return { error: "Apenas o gestor pode assinar um plano." };

  const shopId = membership.barbershop!.id;
  const planId = String(formData.get("plan_id") ?? "").trim();
  if (!planId) return { error: "Selecione um plano." };

  const result = await subscribeShopToPlan(shopId, planId);
  if (!result.ok) return { error: result.error };

  await logAudit({
    action: "subscription.create",
    barbershopId: shopId,
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
      via: "self_service",
    },
  });

  revalidatePath("/app/assinar");
  revalidatePath("/app/regularizar");
  revalidatePath("/app");
  return { ok: true };
}
