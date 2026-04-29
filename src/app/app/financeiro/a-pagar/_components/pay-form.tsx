"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { PAYMENT_LABEL, PAYMENT_METHODS } from "@/lib/zod/caixa";

type State = { error?: string; ok?: boolean };

export function PayExpenseForm({
  id,
  action,
  defaultDate,
  cashSessionOpen,
  onDone,
}: {
  id: string;
  action: (prev: State, fd: FormData) => Promise<State>;
  defaultDate: string;
  cashSessionOpen: boolean;
  onDone?: () => void;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    action,
    {}
  );
  const [method, setMethod] = useState<string>("cash");

  useEffect(() => {
    if (state.ok) {
      notify.success("Despesa marcada como paga");
      onDone?.();
    }
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state, onDone]);

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="id" value={id} />
      <div className="grid gap-1.5">
        <Label htmlFor={`m-${id}`}>Método</Label>
        <select
          id={`m-${id}`}
          name="payment_method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm"
        >
          {PAYMENT_METHODS.map((m) => (
            <option key={m} value={m}>
              {PAYMENT_LABEL[m]}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor={`d-${id}`}>Pago em</Label>
        <Input
          id={`d-${id}`}
          type="date"
          name="paid_at"
          defaultValue={defaultDate}
          required
        />
      </div>
      {method === "cash" && !cashSessionOpen && (
        <p className="text-text-xs text-[var(--color-text-warning-primary)]">
          Sem caixa aberto — o pagamento em dinheiro não será lançado como
          sangria automática.
        </p>
      )}
      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className="h-10">
          {pending ? "Salvando..." : "Confirmar pagamento"}
        </Button>
      </div>
    </form>
  );
}
