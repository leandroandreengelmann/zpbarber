"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { formatMoney, parseMoneyToCents } from "@/lib/format";

type State = { error?: string; ok?: boolean };

export function CashMovementForm({
  type,
  action,
  onDone,
}: {
  type: "in" | "out";
  action: (prev: State, fd: FormData) => Promise<State>;
  onDone?: () => void;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    action,
    {}
  );
  const [cents, setCents] = useState(0);

  useEffect(() => {
    if (state.ok) {
      notify.success(
        type === "in" ? "Suprimento lançado" : "Sangria lançada"
      );
      onDone?.();
    }
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state, type, onDone]);

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="amount_cents" value={cents} />

      <div className="grid gap-1.5">
        <Label htmlFor="amount_display">Valor</Label>
        <Input
          id="amount_display"
          inputMode="numeric"
          value={formatMoney(cents)}
          onChange={(e) => setCents(parseMoneyToCents(e.target.value))}
          placeholder="R$ 0,00"
          className="tabular-nums"
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="description">
          {type === "in" ? "Origem do suprimento" : "Motivo da sangria"}
        </Label>
        <Input
          id="description"
          name="description"
          maxLength={200}
          placeholder={
            type === "in"
              ? "Ex.: troco extra do gestor"
              : "Ex.: pagamento de fornecedor"
          }
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className="h-10">
          {pending ? "Salvando..." : "Confirmar"}
        </Button>
      </div>
    </form>
  );
}
