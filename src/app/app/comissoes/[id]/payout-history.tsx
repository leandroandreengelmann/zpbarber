"use client";

import { useState, useTransition } from "react";
import { TrashIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";
import { formatDateBR, formatMoney } from "@/lib/format";

const METHOD_LABEL: Record<string, string> = {
  pix: "Pix",
  cash: "Dinheiro",
  bank_transfer: "Transferência",
  other: "Outro",
};

export type PayoutRow = {
  id: string;
  period_start: string;
  period_end: string;
  total_cents: number;
  method: string;
  paid_at: string;
  notes: string | null;
};

export function PayoutHistory({
  rows,
  deleteAction,
  disabled = false,
}: {
  rows: PayoutRow[];
  deleteAction: (id: string) => Promise<void>;
  disabled?: boolean;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startDelete] = useTransition();

  function handleDelete(id: string) {
    if (!confirm("Excluir este pagamento? O período voltará a aparecer como pendente.")) {
      return;
    }
    setDeletingId(id);
    startDelete(async () => {
      try {
        await deleteAction(id);
        notify.success("Pagamento removido");
      } catch (e) {
        notify.error("Não foi possível remover", {
          description: e instanceof Error ? e.message : "Tente novamente.",
        });
      } finally {
        setDeletingId(null);
      }
    });
  }

  if (rows.length === 0) {
    return (
      <p className="text-text-sm text-[var(--color-text-tertiary)]">
        Nenhum pagamento registrado ainda.
      </p>
    );
  }

  return (
    <>
      <ul className="flex flex-col gap-2 sm:hidden">
        {rows.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-text-sm font-semibold text-[var(--color-text-primary)]">
                  {formatDateBR(r.paid_at)}
                </div>
                <div className="mt-0.5 text-text-xs text-[var(--color-text-tertiary)]">
                  {formatDateBR(r.period_start)} → {formatDateBR(r.period_end)}
                </div>
                <div className="mt-1 text-text-xs text-[var(--color-text-secondary)]">
                  {METHOD_LABEL[r.method] ?? r.method}
                </div>
                {r.notes && (
                  <div className="mt-0.5 text-text-xs text-[var(--color-text-tertiary)]">
                    {r.notes}
                  </div>
                )}
              </div>
              <div className="text-right tabular-nums text-text-sm font-semibold text-[var(--color-text-primary)]">
                {formatMoney(r.total_cents)}
              </div>
            </div>
            <div className="mt-2 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(r.id)}
                disabled={disabled || deletingId === r.id}
                className="text-[var(--color-error-600)] hover:text-[var(--color-error-700)]"
              >
                <TrashIcon size={20} weight="duotone" />
                {deletingId === r.id ? "Removendo..." : "Excluir"}
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)]/40 text-left text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
              <th className="px-4 py-2.5 font-semibold">Pago em</th>
              <th className="px-4 py-2.5 font-semibold">Período</th>
              <th className="px-4 py-2.5 font-semibold">Método</th>
              <th className="px-4 py-2.5 text-right font-semibold">Total</th>
              <th className="px-4 py-2.5 text-right font-semibold sr-only">Ação</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-[var(--color-border-secondary)] last:border-b-0"
              >
                <td className="px-4 py-3 text-[var(--color-text-primary)]">
                  {formatDateBR(r.paid_at)}
                </td>
                <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                  {formatDateBR(r.period_start)} → {formatDateBR(r.period_end)}
                </td>
                <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                  {METHOD_LABEL[r.method] ?? r.method}
                  {r.notes && (
                    <span className="block text-text-xs text-[var(--color-text-tertiary)]">
                      {r.notes}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold text-[var(--color-text-primary)]">
                  {formatMoney(r.total_cents)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(r.id)}
                    disabled={disabled || deletingId === r.id}
                    className="text-[var(--color-error-600)] hover:text-[var(--color-error-700)]"
                  >
                    <TrashIcon size={20} weight="duotone" />
                    {deletingId === r.id ? "Removendo..." : "Excluir"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
