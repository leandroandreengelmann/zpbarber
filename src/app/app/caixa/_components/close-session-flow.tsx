"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircleIcon, MoneyIcon, NotePencilIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatMoney, parseMoneyToCents } from "@/lib/format";
import type { ClosingSummary } from "../actions";
import { ClosingReport } from "./closing-report";

type State = { error?: string; ok?: boolean; summary?: ClosingSummary };

export function CloseSessionFlow({
  sessionId,
  expectedCents,
  action,
  triggerVariant = "outline",
}: {
  sessionId: string;
  expectedCents: number;
  action: (prev: State, fd: FormData) => Promise<State>;
  triggerVariant?: "default" | "outline";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [cents, setCents] = useState(expectedCents);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setCents(expectedCents);
  }, [expectedCents]);

  useEffect(() => {
    if (state.ok && state.summary)
      notify.success("Caixa fechado", {
        description: "Confira o resumo e gere o relatório.",
      });
    if (state.error)
      notify.error("Não foi possível fechar", { description: state.error });
  }, [state]);

  const summary = state.ok ? state.summary : undefined;

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

  function handleClose() {
    const wasClosed = state.ok && !!state.summary;
    setOpen(false);
    setNotes("");
    setCents(expectedCents);
    if (wasClosed) router.refresh();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
        else setOpen(true);
      }}
    >
      <DialogTrigger
        className={buttonVariants({
          variant: triggerVariant,
          size: "lg",
          className: "h-11 w-full sm:w-auto",
        })}
      >
        <CheckCircleIcon size={28} weight="duotone" />
        Fechar caixa
      </DialogTrigger>
      <DialogContent className={summary ? "sm:max-w-3xl" : undefined}>
        {summary ? (
          <>
            <DialogHeader>
              <DialogTitle>Resumo do fechamento</DialogTitle>
              <DialogDescription>
                Imprima ou baixe o relatório antes de fechar.
              </DialogDescription>
            </DialogHeader>
            <ClosingReport summary={summary} onClose={handleClose} />
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Fechar caixa</DialogTitle>
              <DialogDescription>
                Esperado em dinheiro: <strong>{formatMoney(expectedCents)}</strong>.
                Confira o caixa físico e informe o valor contado.
              </DialogDescription>
            </DialogHeader>
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
                  {pending ? "Fechando..." : "Confirmar fechamento"}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
