"use client";

import { useActionState, useEffect, useState } from "react";
import { TicketIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { redeemRewardAction } from "../../actions";

type State = { error?: string; ok?: boolean };

type RewardOption = {
  id: string;
  name: string;
  cost_points: number;
};

export function RedeemForm({
  clientId,
  rewards,
  balance,
}: {
  clientId: string;
  rewards: RewardOption[];
  balance: number;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    redeemRewardAction,
    {}
  );
  const [rewardId, setRewardId] = useState<string>("");

  useEffect(() => {
    if (state.ok) {
      notify.success("Resgate gerado");
      setRewardId("");
    }
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);

  const eligible = rewards.filter((r) => r.cost_points <= balance);

  if (rewards.length === 0) {
    return (
      <p className="text-text-sm text-[var(--color-text-tertiary)]">
        Nenhuma recompensa ativa cadastrada.
      </p>
    );
  }

  return (
    <form action={formAction} className="grid gap-3">
      <input type="hidden" name="client_id" value={clientId} />
      <div className="grid gap-1.5">
        <Label htmlFor="reward_id">Recompensa</Label>
        <select
          id="reward_id"
          name="reward_id"
          value={rewardId}
          onChange={(e) => setRewardId(e.target.value)}
          required
          className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm"
        >
          <option value="">— Selecione —</option>
          {rewards.map((r) => {
            const ok = r.cost_points <= balance;
            return (
              <option key={r.id} value={r.id} disabled={!ok}>
                {r.name} — {r.cost_points} pts {ok ? "" : "(saldo insuficiente)"}
              </option>
            );
          })}
        </select>
        {eligible.length === 0 && (
          <p className="text-text-xs text-[var(--color-text-tertiary)]">
            Saldo insuficiente para qualquer recompensa.
          </p>
        )}
      </div>
      <Button type="submit" disabled={pending || !rewardId} className="h-10">
        <TicketIcon size={20} weight="duotone" />
        {pending ? "Gerando..." : "Gerar resgate"}
      </Button>
    </form>
  );
}
