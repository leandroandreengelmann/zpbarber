"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { formatMoney, parseMoneyToCents } from "@/lib/format";
import { PAYMENT_LABEL, PAYMENT_METHODS } from "@/lib/zod/caixa";

type State = { error?: string; ok?: boolean };

type Category = { id: string; name: string };

type Initial = {
  id: string;
  category_id: string | null;
  description: string;
  amount_cents: number;
  due_date: string;
  notes: string | null;
};

export function ExpenseForm({
  action,
  categories,
  initial,
  defaultDate,
  cashSessionOpen,
  onSaved,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  categories: Category[];
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
  const [payNow, setPayNow] = useState(false);
  const [method, setMethod] = useState<string>("cash");

  useEffect(() => {
    if (state.ok) {
      notify.success(initial ? "Despesa atualizada" : "Despesa criada");
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
          placeholder="Ex.: Aluguel março"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="category_id">Categoria</Label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={initial?.category_id ?? ""}
            className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm"
          >
            <option value="">— Sem categoria —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
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
              name="pay_now"
              checked={payNow}
              onChange={(e) => setPayNow(e.target.checked)}
              className="h-4 w-4"
            />
            Já está paga
          </label>
          {payNow && (
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
                <Label htmlFor="paid_at">Pago em</Label>
                <Input
                  id="paid_at"
                  type="date"
                  name="paid_at"
                  defaultValue={defaultDate}
                />
              </div>
              {method === "cash" && !cashSessionOpen && (
                <p className="sm:col-span-2 text-text-xs text-[var(--color-text-warning-primary)]">
                  Sem caixa aberto — o pagamento em dinheiro não será lançado
                  como sangria automática.
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
