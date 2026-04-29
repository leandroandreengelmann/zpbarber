import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { LoyaltySettingsForm } from "./_components/settings-form";

export default async function FidelidadeConfiguracoesPage() {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") redirect("/app/fidelidade");
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const [settingsRes, servicesRes, punchRes] = await Promise.all([
    supabase
      .from("loyalty_settings")
      .select(
        "is_active, points_per_real, expire_after_days, min_redemption_points, welcome_bonus_points, birthday_bonus_points, punch_card_active, punch_card_required, punch_card_reward_service_id, punch_card_expire_days"
      )
      .eq("barbershop_id", shopId)
      .maybeSingle(),
    supabase
      .from("services")
      .select("id, name")
      .eq("is_active", true)
      .order("name"),
    supabase
      .from("loyalty_punch_card_services")
      .select("service_id")
      .eq("barbershop_id", shopId),
  ]);

  const settings = settingsRes.data ?? {
    is_active: false,
    points_per_real: 1,
    expire_after_days: null,
    min_redemption_points: 0,
    welcome_bonus_points: 0,
    birthday_bonus_points: 0,
    punch_card_active: false,
    punch_card_required: 10,
    punch_card_reward_service_id: null,
    punch_card_expire_days: null,
  };

  const services = (servicesRes.data ?? []).map((s) => ({
    id: s.id,
    name: s.name,
  }));
  const selectedPunchServiceIds = (punchRes.data ?? []).map((r) => r.service_id);

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Configurações de fidelidade
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Configure pontos, bônus e cartão de carimbos.
        </p>
      </div>
      <LoyaltySettingsForm
        initial={{
          is_active: settings.is_active,
          points_per_real: Number(settings.points_per_real ?? 1),
          expire_after_days: settings.expire_after_days,
          min_redemption_points: settings.min_redemption_points ?? 0,
          welcome_bonus_points: settings.welcome_bonus_points ?? 0,
          birthday_bonus_points: settings.birthday_bonus_points ?? 0,
          punch_card_active: settings.punch_card_active ?? false,
          punch_card_required: settings.punch_card_required ?? 10,
          punch_card_reward_service_id: settings.punch_card_reward_service_id,
          punch_card_expire_days: settings.punch_card_expire_days,
        }}
        services={services}
        selectedPunchServiceIds={selectedPunchServiceIds}
      />
    </div>
  );
}
