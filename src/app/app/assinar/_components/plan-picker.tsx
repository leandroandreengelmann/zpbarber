"use client";

import { useActionState, useEffect, useState } from "react";
import { CreditCardIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";
import { subscribeMyShopAction } from "../actions";

type Plan = {
  id: string;
  name: string;
  description: string | null;
  price_cents: number;
  billing_cycle: "monthly" | "quarterly" | "yearly";
  trial_days: number;
  features: string[];
};

type State = { error?: string; ok?: boolean };

const CYCLE_LABEL: Record<Plan["billing_cycle"], string> = {
  monthly: "/mês",
  quarterly: "/trimestre",
  yearly: "/ano",
};

function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function PlanPicker({ plans }: { plans: Plan[] }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    subscribeMyShopAction,
    {}
  );
  const [planId, setPlanId] = useState<string>(plans[0]?.id ?? "");

  useEffect(() => {
    if (state.ok) {
      notify.success("Assinatura criada", {
        description: "Sua assinatura foi gerada. Confira em Regularizar para o PIX.",
      });
    }
    if (state.error) notify.error("Falha", { description: state.error });
  }, [state]);

  if (plans.length === 0) {
    return (
      <div className="rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-4 text-text-sm text-[var(--color-text-tertiary)]">
        Nenhum plano disponível no momento. Fale com o suporte do ZP Barber.
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-2">
        {plans.map((p) => (
          <label
            key={p.id}
            className={`flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition ${
              planId === p.id
                ? "border-[var(--color-blue-500)] bg-[var(--color-blue-25)]"
                : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] hover:border-[var(--color-border-primary)]"
            }`}
          >
            <input
              type="radio"
              name="plan_id"
              value={p.id}
              checked={planId === p.id}
              onChange={() => setPlanId(p.id)}
              className="sr-only"
            />
            <div className="flex items-start justify-between gap-2">
              <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
                {p.name}
              </span>
              <span className="text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
                {formatBRL(p.price_cents)}
                <span className="text-text-sm font-normal text-[var(--color-text-tertiary)]">
                  {CYCLE_LABEL[p.billing_cycle]}
                </span>
              </span>
            </div>
            {p.description && (
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                {p.description}
              </p>
            )}
            <span className="text-text-xs text-[var(--color-text-tertiary)]">
              {p.trial_days > 0
                ? `${p.trial_days} dias grátis para testar`
                : "Cobrança imediata"}
            </span>
            {p.features.length > 0 && (
              <ul className="grid gap-1 text-text-sm text-[var(--color-text-secondary)]">
                {p.features.slice(0, 6).map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[var(--color-blue-500)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            )}
          </label>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={pending || !planId}>
          <CreditCardIcon size={28} weight="duotone" />
          {pending ? "Criando assinatura..." : "Confirmar assinatura"}
        </Button>
      </div>
    </form>
  );
}
