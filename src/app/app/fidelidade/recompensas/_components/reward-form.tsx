"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import {
  LOYALTY_REWARD_TYPE_LABEL,
  LOYALTY_REWARD_TYPES,
  type LoyaltyRewardType,
} from "@/lib/zod/fidelidade";

type State = { error?: string; ok?: boolean };

type Service = { id: string; name: string };
type Product = { id: string; name: string };

type Initial = {
  id: string;
  name: string;
  description: string | null;
  cost_points: number;
  reward_type: LoyaltyRewardType;
  reward_value: number | null;
  service_id: string | null;
  product_id: string | null;
  is_active: boolean;
};

export function RewardForm({
  action,
  services,
  products,
  initial,
  onSaved,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  services: Service[];
  products: Product[];
  initial?: Initial;
  onSaved?: () => void;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    action,
    {}
  );
  const [type, setType] = useState<LoyaltyRewardType>(
    initial?.reward_type ?? "discount_amount"
  );

  useEffect(() => {
    if (state.ok) {
      notify.success(initial ? "Recompensa atualizada" : "Recompensa criada");
      onSaved?.();
    }
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state, initial, onSaved]);

  return (
    <form action={formAction} className="grid gap-4">
      {initial && <input type="hidden" name="id" value={initial.id} />}

      <div className="grid gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          defaultValue={initial?.name ?? ""}
          maxLength={80}
          required
          placeholder="Ex.: R$ 10 off na próxima compra"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="description">Descrição (opcional)</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={initial?.description ?? ""}
          maxLength={300}
          rows={2}
          className="rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 text-text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="cost_points">Custo (pontos)</Label>
          <Input
            id="cost_points"
            name="cost_points"
            type="number"
            min="1"
            step="1"
            defaultValue={initial?.cost_points ?? 100}
            required
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="reward_type">Tipo</Label>
          <select
            id="reward_type"
            name="reward_type"
            value={type}
            onChange={(e) => setType(e.target.value as LoyaltyRewardType)}
            className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm"
          >
            {LOYALTY_REWARD_TYPES.map((t) => (
              <option key={t} value={t}>
                {LOYALTY_REWARD_TYPE_LABEL[t]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(type === "discount_amount" || type === "discount_percent") && (
        <div className="grid gap-1.5">
          <Label htmlFor="reward_value">
            {type === "discount_amount" ? "Desconto (R$)" : "Desconto (%)"}
          </Label>
          <Input
            id="reward_value"
            name="reward_value"
            type="number"
            min="1"
            step="1"
            defaultValue={initial?.reward_value ?? ""}
            placeholder={type === "discount_amount" ? "Ex.: 10" : "Ex.: 15"}
            required
          />
          {type === "discount_amount" && (
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Valor inteiro em reais (sem centavos).
            </p>
          )}
        </div>
      )}

      {type === "free_service" && (
        <div className="grid gap-1.5">
          <Label htmlFor="service_id">Serviço grátis</Label>
          <select
            id="service_id"
            name="service_id"
            defaultValue={initial?.service_id ?? ""}
            required
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
      )}

      {type === "free_product" && (
        <div className="grid gap-1.5">
          <Label htmlFor="product_id">Produto grátis</Label>
          <select
            id="product_id"
            name="product_id"
            defaultValue={initial?.product_id ?? ""}
            required
            className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm"
          >
            <option value="">— Selecione —</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <label className="flex items-center gap-2 text-text-sm">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={initial?.is_active ?? true}
          value="true"
          className="h-4 w-4"
        />
        Recompensa ativa
      </label>

      <div className="sticky bottom-[-1rem] -mx-4 -mb-1 flex justify-end gap-2 border-t border-[var(--color-border-secondary)] bg-popover px-4 pb-2 pt-3 sm:static sm:m-0 sm:border-0 sm:bg-transparent sm:p-0">
        <Button type="submit" disabled={pending} className="h-11 w-full sm:h-10 sm:w-auto">
          {pending ? "Salvando..." : initial ? "Salvar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
