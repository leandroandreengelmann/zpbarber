"use client";

import { useActionState, useEffect, useState } from "react";
import { CreditCardIcon, PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { subscribeBarbershopToPlanAction } from "../subscription-actions";

type Plan = {
  id: string;
  name: string;
  price_cents: number;
  billing_cycle: "monthly" | "quarterly" | "yearly";
  trial_days: number;
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

export function SubscribeDialog({
  barbershopId,
  plans,
  gatewayConfigured,
}: {
  barbershopId: string;
  plans: Plan[];
  gatewayConfigured: boolean;
}) {
  const action = subscribeBarbershopToPlanAction.bind(null, barbershopId);
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [open, setOpen] = useState(false);
  const [planId, setPlanId] = useState<string>("");

  useEffect(() => {
    if (state.ok) {
      notify.success("Assinatura criada", {
        description: "Customer e subscription registrados no Asaas.",
      });
      setOpen(false);
    }
    if (state.error) notify.error("Falha", { description: state.error });
  }, [state]);

  const disabled = !gatewayConfigured || plans.length === 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button disabled={disabled}>
            <PlusIcon size={28} weight="duotone" />
            Assinar plano
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assinar barbearia a um plano</DialogTitle>
          <DialogDescription>
            Cria customer + assinatura PIX no Asaas e registra a invoice local.
          </DialogDescription>
        </DialogHeader>

        {!gatewayConfigured ? (
          <div className="rounded-lg border border-[var(--color-border-warning-subtle)] bg-[var(--color-warning-25)] p-3 text-text-sm text-[var(--color-text-warning-primary)]">
            Configure o gateway de pagamento em /admin/settings/payment antes.
          </div>
        ) : plans.length === 0 ? (
          <div className="rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3 text-text-sm text-[var(--color-text-tertiary)]">
            Nenhum plano ativo. Crie um em /admin/plans.
          </div>
        ) : (
          <form action={formAction} className="grid gap-4">
            <div className="grid gap-2">
              <Label>Escolha o plano</Label>
              <div className="grid gap-2">
                {plans.map((p) => (
                  <label
                    key={p.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
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
                      className="mt-1 size-4"
                    />
                    <div className="grid flex-1 gap-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                          {p.name}
                        </span>
                        <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
                          {formatBRL(p.price_cents)}
                          <span className="text-[var(--color-text-tertiary)]">
                            {CYCLE_LABEL[p.billing_cycle]}
                          </span>
                        </span>
                      </div>
                      <span className="text-text-xs text-[var(--color-text-tertiary)]">
                        {p.trial_days > 0
                          ? `${p.trial_days} dias de trial`
                          : "Sem trial — primeira cobrança hoje"}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={pending || !planId}>
                <CreditCardIcon size={28} weight="duotone" />
                {pending ? "Criando..." : "Confirmar assinatura"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
