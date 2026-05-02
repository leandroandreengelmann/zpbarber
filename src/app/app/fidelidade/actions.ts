"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import {
  adjustPointsSchema,
  cancelRedemptionSchema,
  loyaltyRewardDeleteSchema,
  loyaltyRewardSchema,
  loyaltySettingsSchema,
  redeemRewardSchema,
} from "@/lib/zod/fidelidade";
import { logAudit } from "@/lib/audit/log";
import { can } from "@/lib/auth/capabilities";

type State = { error?: string; ok?: boolean };

async function ctx() {
  const { user, membership } = await requireBarbershop();
  return {
    userId: user.id,
    shopId: membership.barbershop!.id,
    role: membership.role,
    capabilities: membership.capabilities ?? null,
  };
}

function flatten(issues: { message: string }[]) {
  return issues.map((i) => i.message).join("; ");
}

function revalidateAll() {
  revalidatePath("/app/fidelidade");
  revalidatePath("/app/fidelidade/configuracoes");
  revalidatePath("/app/fidelidade/recompensas");
  revalidatePath("/app/clientes", "layout");
  revalidatePath("/app/caixa");
}

// ─────────────────────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────────────────────

export async function saveLoyaltySettingsAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (!can(c, "fidelidade.gerenciar"))
    return { error: "Sem permissão para alterar configurações." };

  const punchServiceIds = fd.getAll("punch_card_service_ids").map(String);

  const parsed = loyaltySettingsSchema.safeParse({
    is_active: fd.get("is_active") === "on" || fd.get("is_active") === "true",
    points_per_real: fd.get("points_per_real") ?? 1,
    expire_after_days: fd.get("expire_after_days") || undefined,
    min_redemption_points: fd.get("min_redemption_points") ?? 0,
    welcome_bonus_points: fd.get("welcome_bonus_points") ?? 0,
    birthday_bonus_points: fd.get("birthday_bonus_points") ?? 0,
    punch_card_active:
      fd.get("punch_card_active") === "on" ||
      fd.get("punch_card_active") === "true",
    punch_card_required: fd.get("punch_card_required") ?? 10,
    punch_card_reward_service_id: fd.get("punch_card_reward_service_id") || undefined,
    punch_card_expire_days: fd.get("punch_card_expire_days") || undefined,
    punch_card_service_ids: punchServiceIds,
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };

  const d = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.from("loyalty_settings").upsert({
    barbershop_id: c.shopId,
    is_active: d.is_active,
    points_per_real: d.points_per_real,
    expire_after_days: d.expire_after_days ?? null,
    min_redemption_points: d.min_redemption_points,
    welcome_bonus_points: d.welcome_bonus_points,
    birthday_bonus_points: d.birthday_bonus_points,
    punch_card_active: d.punch_card_active,
    punch_card_required: d.punch_card_required,
    punch_card_reward_service_id: d.punch_card_reward_service_id ?? null,
    punch_card_expire_days: d.punch_card_expire_days ?? null,
  });
  if (error) return { error: error.message };

  // Sync punch card services
  await supabase
    .from("loyalty_punch_card_services")
    .delete()
    .eq("barbershop_id", c.shopId);
  if (d.punch_card_service_ids.length > 0) {
    const rows = d.punch_card_service_ids.map((sid) => ({
      barbershop_id: c.shopId,
      service_id: sid,
    }));
    const { error: e2 } = await supabase
      .from("loyalty_punch_card_services")
      .insert(rows);
    if (e2) return { error: e2.message };
  }

  await logAudit({
    action: "loyalty.settings_update",
    barbershopId: c.shopId,
    resourceType: "loyalty_settings",
    metadata: {
      is_active: d.is_active,
      points_per_real: d.points_per_real,
      punch_card_active: d.punch_card_active,
    },
  });

  revalidateAll();
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Rewards
// ─────────────────────────────────────────────────────────────

export async function saveLoyaltyRewardAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (!can(c, "fidelidade.gerenciar"))
    return { error: "Sem permissão para gerenciar recompensas." };

  const parsed = loyaltyRewardSchema.safeParse({
    id: fd.get("id") || undefined,
    name: fd.get("name") ?? "",
    description: fd.get("description") ?? "",
    cost_points: fd.get("cost_points") ?? 0,
    reward_type: fd.get("reward_type") ?? "discount_amount",
    reward_value: fd.get("reward_value") || undefined,
    service_id: fd.get("service_id") || undefined,
    product_id: fd.get("product_id") || undefined,
    is_active: fd.get("is_active") !== "false",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };

  const d = parsed.data;
  const supabase = await createClient();
  const payload = {
    barbershop_id: c.shopId,
    name: d.name,
    description: d.description || null,
    cost_points: d.cost_points,
    reward_type: d.reward_type,
    reward_value: d.reward_value ?? null,
    service_id: d.service_id ?? null,
    product_id: d.product_id ?? null,
    is_active: d.is_active,
  };
  if (d.id) {
    const { error } = await supabase
      .from("loyalty_rewards")
      .update(payload)
      .eq("id", d.id)
      .eq("barbershop_id", c.shopId);
    if (error) return { error: error.message };
    await logAudit({
      action: "loyalty.reward_update",
      barbershopId: c.shopId,
      resourceType: "loyalty_reward",
      resourceId: d.id,
      metadata: { name: d.name, cost_points: d.cost_points },
    });
  } else {
    const { error } = await supabase.from("loyalty_rewards").insert(payload);
    if (error) return { error: error.message };
    await logAudit({
      action: "loyalty.reward_create",
      barbershopId: c.shopId,
      resourceType: "loyalty_reward",
      metadata: {
        name: d.name,
        cost_points: d.cost_points,
        reward_type: d.reward_type,
      },
    });
  }
  revalidateAll();
  return { ok: true };
}

export async function deleteLoyaltyRewardAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (!can(c, "fidelidade.gerenciar"))
    return { error: "Sem permissão para excluir recompensas." };
  const parsed = loyaltyRewardDeleteSchema.safeParse({ id: fd.get("id") ?? "" });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const supabase = await createClient();
  const { error } = await supabase
    .from("loyalty_rewards")
    .delete()
    .eq("id", parsed.data.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };

  await logAudit({
    action: "loyalty.reward_delete",
    barbershopId: c.shopId,
    resourceType: "loyalty_reward",
    resourceId: parsed.data.id,
  });

  revalidateAll();
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Redemptions
// ─────────────────────────────────────────────────────────────

export async function redeemRewardAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (!can(c, "fidelidade.gerenciar"))
    return { error: "Sem permissão para resgatar." };
  const parsed = redeemRewardSchema.safeParse({
    client_id: fd.get("client_id") ?? "",
    reward_id: fd.get("reward_id") ?? "",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const supabase = await createClient();
  const { error } = await supabase.rpc("fn_redeem_reward", {
    p_client: parsed.data.client_id,
    p_reward: parsed.data.reward_id,
  });
  if (error) return { error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function cancelRedemptionAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (!can(c, "fidelidade.gerenciar"))
    return { error: "Sem permissão para cancelar resgate." };
  const parsed = cancelRedemptionSchema.safeParse({ id: fd.get("id") ?? "" });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const supabase = await createClient();
  const { error } = await supabase.rpc("fn_cancel_redemption", {
    p_redemption: parsed.data.id,
  });
  if (error) return { error: error.message };
  revalidateAll();
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Adjust manual (gestor)
// ─────────────────────────────────────────────────────────────

export async function adjustPointsAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (!can(c, "fidelidade.gerenciar"))
    return { error: "Sem permissão para ajustar pontos." };
  const parsed = adjustPointsSchema.safeParse({
    client_id: fd.get("client_id") ?? "",
    points: fd.get("points") ?? 0,
    description: fd.get("description") ?? "",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const d = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.from("loyalty_transactions").insert({
    barbershop_id: c.shopId,
    client_id: d.client_id,
    type: "adjust",
    points: d.points,
    description: d.description,
    created_by: c.userId,
  });
  if (error) return { error: error.message };

  await logAudit({
    action: "loyalty.points_adjust",
    barbershopId: c.shopId,
    resourceType: "loyalty_transaction",
    metadata: {
      client_id: d.client_id,
      points: d.points,
      description: d.description,
    },
  });

  revalidateAll();
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Manutenção (gestor)
// ─────────────────────────────────────────────────────────────

export async function expireOldPointsAction(
  _prev: State,
  _fd: FormData
): Promise<State> {
  const c = await ctx();
  if (!can(c, "fidelidade.gerenciar")) return { error: "Sem permissão." };
  const supabase = await createClient();
  const { error } = await supabase.rpc("fn_expire_old_points", {
    p_shop: c.shopId,
  });
  if (error) return { error: error.message };
  revalidateAll();
  return { ok: true };
}

export async function awardBirthdayBonusAction(
  _prev: State,
  _fd: FormData
): Promise<State> {
  const c = await ctx();
  if (!can(c, "fidelidade.gerenciar")) return { error: "Sem permissão." };
  const supabase = await createClient();
  const { error } = await supabase.rpc("fn_award_birthday_bonus", {
    p_shop: c.shopId,
  });
  if (error) return { error: error.message };
  revalidateAll();
  return { ok: true };
}
