"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { saveLoyaltySettingsAction } from "../../actions";

type State = { error?: string; ok?: boolean };

type Service = { id: string; name: string };

type Settings = {
  is_active: boolean;
  points_per_real: number;
  expire_after_days: number | null;
  min_redemption_points: number;
  welcome_bonus_points: number;
  birthday_bonus_points: number;
  punch_card_active: boolean;
  punch_card_required: number;
  punch_card_reward_service_id: string | null;
  punch_card_expire_days: number | null;
};

export function LoyaltySettingsForm({
  initial,
  services,
  selectedPunchServiceIds,
}: {
  initial: Settings;
  services: Service[];
  selectedPunchServiceIds: string[];
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    saveLoyaltySettingsAction,
    {}
  );
  const [isActive, setIsActive] = useState(initial.is_active);
  const [punchActive, setPunchActive] = useState(initial.punch_card_active);
  const [punchServices, setPunchServices] = useState<Set<string>>(
    new Set(selectedPunchServiceIds)
  );

  useEffect(() => {
    if (state.ok) notify.success("Configurações salvas");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);

  function toggleService(id: string, checked: boolean) {
    setPunchServices((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  return (
    <form action={formAction} className="grid gap-6">
      {[...punchServices].map((id) => (
        <input key={id} type="hidden" name="punch_card_service_ids" value={id} />
      ))}

      <section className="grid gap-4 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4 sm:p-6">
        <header className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <h2 className="text-text-lg font-semibold text-[var(--color-text-primary)]">
              Programa de pontos
            </h2>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Cliente ganha pontos a cada real gasto e troca por recompensas.
            </p>
          </div>
          <label className="flex items-center gap-2 text-text-sm font-medium">
            <input
              type="checkbox"
              name="is_active"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              value="true"
              className="h-4 w-4"
            />
            Ativo
          </label>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="points_per_real">Pontos por R$ 1,00</Label>
            <Input
              id="points_per_real"
              name="points_per_real"
              type="number"
              step="0.01"
              min="0"
              defaultValue={initial.points_per_real}
              required
            />
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Ex.: 1 = cada R$ 1,00 vira 1 ponto.
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="min_redemption_points">Mínimo p/ resgatar</Label>
            <Input
              id="min_redemption_points"
              name="min_redemption_points"
              type="number"
              min="0"
              step="1"
              defaultValue={initial.min_redemption_points}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="expire_after_days">Expira em (dias)</Label>
            <Input
              id="expire_after_days"
              name="expire_after_days"
              type="number"
              min="1"
              step="1"
              defaultValue={initial.expire_after_days ?? ""}
              placeholder="Não expira"
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="welcome_bonus_points">Bônus de boas-vindas</Label>
            <Input
              id="welcome_bonus_points"
              name="welcome_bonus_points"
              type="number"
              min="0"
              step="1"
              defaultValue={initial.welcome_bonus_points}
            />
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Aplicado na 1ª compra do cliente.
            </p>
          </div>

          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="birthday_bonus_points">Bônus de aniversário</Label>
            <Input
              id="birthday_bonus_points"
              name="birthday_bonus_points"
              type="number"
              min="0"
              step="1"
              defaultValue={initial.birthday_bonus_points}
            />
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Aplicado uma vez por ano via botão na visão geral.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4 sm:p-6">
        <header className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <h2 className="text-text-lg font-semibold text-[var(--color-text-primary)]">
              Cartão de carimbos
            </h2>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Após X cortes, ganha 1 corte grátis (ou outro serviço escolhido).
            </p>
          </div>
          <label className="flex items-center gap-2 text-text-sm font-medium">
            <input
              type="checkbox"
              name="punch_card_active"
              checked={punchActive}
              onChange={(e) => setPunchActive(e.target.checked)}
              value="true"
              className="h-4 w-4"
            />
            Ativo
          </label>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="punch_card_required">Carimbos para ganhar</Label>
            <Input
              id="punch_card_required"
              name="punch_card_required"
              type="number"
              min="1"
              step="1"
              defaultValue={initial.punch_card_required}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="punch_card_reward_service_id">Serviço de recompensa</Label>
            <select
              id="punch_card_reward_service_id"
              name="punch_card_reward_service_id"
              defaultValue={initial.punch_card_reward_service_id ?? ""}
              className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm"
            >
              <option value="">— Selecione —</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-1.5 sm:col-span-2">
            <Label htmlFor="punch_card_expire_days">Cartão expira em (dias)</Label>
            <Input
              id="punch_card_expire_days"
              name="punch_card_expire_days"
              type="number"
              min="1"
              step="1"
              defaultValue={initial.punch_card_expire_days ?? ""}
              placeholder="Não expira"
            />
          </div>

          <div className="grid gap-2 sm:col-span-2">
            <Label>Serviços que contam carimbo</Label>
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Vazio = todos os serviços contam.
            </p>
            <div className="grid gap-2 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3 sm:grid-cols-2">
              {services.length === 0 && (
                <p className="text-text-sm text-[var(--color-text-tertiary)]">
                  Nenhum serviço cadastrado.
                </p>
              )}
              {services.map((s) => (
                <label key={s.id} className="flex items-center gap-2 text-text-sm">
                  <input
                    type="checkbox"
                    checked={punchServices.has(s.id)}
                    onChange={(e) => toggleService(s.id, e.target.checked)}
                    className="h-4 w-4"
                  />
                  {s.name}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className="h-10">
          {pending ? "Salvando..." : "Salvar configurações"}
        </Button>
      </div>
    </form>
  );
}
