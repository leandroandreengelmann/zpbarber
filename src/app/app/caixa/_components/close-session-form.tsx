"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircleIcon, MoneyIcon, NotePencilIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatMoney, parseMoneyToCents } from "@/lib/format";

type State = { error?: string; ok?: boolean };

export function CloseSessionForm({
  action,
  sessionId,
  expectedCents,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  sessionId: string;
  expectedCents: number;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [cents, setCents] = useState(expectedCents);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (state.ok) notify.success("Caixa fechado", { description: "Resumo do dia disponível no histórico." });
    if (state.error) notify.error("Não foi possível fechar", { description: state.error });
  }, [state]);

  const diff = cents - expectedCents;
  const diffLabel =
    diff === 0
      ? "Sem diferença"
      : diff > 0
        ? `Sobra de ${formatMoney(diff)}`
        : `Falta de ${formatMoney(Math.abs(diff))}`;
  const diffClass =
    diff === 0
      ? "text-[var(--color-text-tertiary)]"
      : diff > 0
        ? "text-[var(--color-success-700)]"
        : "text-[var(--color-error-700)]";

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="session_id" value={sessionId} />
      <input type="hidden" name="closing_amount_cents" value={cents} />

      <div className="grid gap-1.5">
        <Label htmlFor="closing_display">Valor contado em dinheiro</Label>
        <div className="relative">
          <MoneyIcon
            size={28}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            id="closing_display"
            inputMode="numeric"
            value={formatMoney(cents)}
            onChange={(e) => setCents(parseMoneyToCents(e.target.value))}
            placeholder="R$ 0,00"
            className="pl-10 tabular-nums"
          />
        </div>
        <p className={`text-text-xs tabular-nums ${diffClass}`}>{diffLabel}</p>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="notes">Observações</Label>
        <div className="relative">
          <NotePencilIcon
            size={28}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-3 text-[var(--color-fg-quaternary)]"
          />
          <textarea
            id="notes"
            name="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder="Ex.: sangria de R$ 50 retirada às 14h"
            className="flex min-h-[80px] w-full rounded-lg border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] py-2.5 pl-10 pr-3 text-text-md text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-blue-300)] focus:outline-none focus:ring-4 focus:ring-[var(--color-blue-100)]"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className="h-11">
          <CheckCircleIcon size={28} weight="duotone" />
          {pending ? "Fechando..." : "Fechar caixa"}
        </Button>
      </div>
    </form>
  );
}
