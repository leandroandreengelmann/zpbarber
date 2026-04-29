"use client";

import { useActionState, useEffect, useState } from "react";
import { CircleNotchIcon, MoneyIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatMoney, parseMoneyToCents } from "@/lib/format";

type State = { error?: string; ok?: boolean };

export function OpenSessionForm({
  action,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [cents, setCents] = useState(0);

  useEffect(() => {
    if (state.ok) notify.success("Caixa aberto", { description: "Já pode registrar vendas." });
    if (state.error) notify.error("Não foi possível abrir", { description: state.error });
  }, [state]);

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="opening_amount_cents" value={cents} />
      <div className="grid gap-1.5">
        <Label htmlFor="opening_display">Valor de troco (dinheiro)</Label>
        <div className="relative">
          <MoneyIcon
            size={28}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            id="opening_display"
            inputMode="numeric"
            value={formatMoney(cents)}
            onChange={(e) => setCents(parseMoneyToCents(e.target.value))}
            placeholder="R$ 0,00"
            className="pl-10 tabular-nums"
          />
        </div>
        <p className="text-text-xs text-[var(--color-text-tertiary)]">
          Informe o valor disponível em dinheiro físico para troco.
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className="h-11">
          <CircleNotchIcon size={28} weight="duotone" />
          {pending ? "Abrindo..." : "Abrir caixa"}
        </Button>
      </div>
    </form>
  );
}
