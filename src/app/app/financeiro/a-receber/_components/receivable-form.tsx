"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { formatMoney, parseMoneyToCents } from "@/lib/format";
import { PAYMENT_LABEL, PAYMENT_METHODS } from "@/lib/zod/caixa";

type State = { error?: string; ok?: boolean };

type Client = { id: string; full_name: string };

type Initial = {
  id: string;
  client_id: string | null;
  description: string;
  amount_cents: number;
  due_date: string;
  notes: string | null;
};

export function ReceivableForm({
  action,
  clients,
  initial,
  defaultDate,
  cashSessionOpen,
  onSaved,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  clients: Client[];
  initial?: Initial;
  defaultDate: string;
  cashSessionOpen?: boolean;
  onSaved?: () => void;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    action,
    {}
  );
  const [cents, setCents] = useState(initial?.amount_cents ?? 0);
  const [receiveNow, setReceiveNow] = useState(false);
  const [method, setMethod] = useState<string>("cash");

  useEffect(() => {
    if (state.ok) {
      notify.success(initial ? "Recebível atualizado" : "Recebível criado");
      onSaved?.();
    }
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state, initial, onSaved]);

  return (
    <form action={formAction} className="grid gap-4">
      {initial && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="amount_cents" value={cents} />

      <div className="grid gap-1.5">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          name="description"
          defaultValue={initial?.description ?? ""}
          maxLength={160}
          required
          placeholder="Ex.: Pacote 5 cortes"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="client_id">Cliente</Label>
          <select
            id="client_id"
            name="client_id"
            defaultValue={initial?.client_id ?? ""}
            className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm"
          >
            <option value="">— Sem cliente —</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="due_date">Vencimento</Label>
          <Input
            id="due_date"
            type="date"
            name="due_date"
            defaultValue={initial?.due_date ?? defaultDate}
            required
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="amount_display">Valor</Label>
        <Input
          id="amount_display"
          inputMode="numeric"
          value={formatMoney(cents)}
          onChange={(e) => setCents(parseMoneyToCents(e.target.value))}
          placeholder="R$ 0,00"
          className="tabular-nums"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="notes">Observações (opcional)</Label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={initial?.notes ?? ""}
          maxLength={500}
          rows={2}
          className="rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 text-text-sm"
        />
      </div>

      {!initial && (
        <div className="grid gap-3 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3">
          <label className="flex items-center gap-2 text-text-sm font-medium">
            <input
              type="checkbox"
              name="receive_now"
              checked={receiveNow}
              onChange={(e) => setReceiveNow(e.target.checked)}
              className="h-4 w-4"
            />
            Já recebido
          </label>
          {receiveNow && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="payment_method">Método</Label>
                <select
                  id="payment_method"
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
                <Label htmlFor="received_at">Recebido em</Label>
                <Input
                  id="received_at"
                  type="date"
                  name="received_at"
                  defaultValue={defaultDate}
                />
              </div>
              {method === "cash" && !cashSessionOpen && (
                <p className="sm:col-span-2 text-text-xs text-[var(--color-text-warning-primary)]">
                  Sem caixa aberto — o recebimento em dinheiro não será lançado
                  como suprimento automático.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={pending} className="h-10">
          {pending ? "Salvando..." : initial ? "Salvar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
