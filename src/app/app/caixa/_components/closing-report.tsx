"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { DownloadSimpleIcon, PrinterIcon, XIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/format";
import type { ClosingSummary } from "../actions";

export type { ClosingSummary };

const PdfDownloadButton = dynamic(() => import("./closing-report-pdf"), {
  ssr: false,
  loading: () => (
    <Button type="button" variant="outline" disabled className="h-11">
      <DownloadSimpleIcon size={28} weight="duotone" />
      Preparando PDF...
    </Button>
  ),
});

function formatBR(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTimeOnly(date: string) {
  return new Date(date).toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ClosingReport({
  summary,
  onClose,
}: {
  summary: ClosingSummary;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<"simple" | "detailed">("simple");

  const diff = summary.session.difference_cents;
  const diffLabel =
    diff === 0
      ? "Sem diferença"
      : diff > 0
        ? `Sobra de ${formatMoney(diff)}`
        : `Falta de ${formatMoney(Math.abs(diff))}`;

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          className="inline-flex rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "simple"}
            onClick={() => setMode("simple")}
            className={`px-3 py-1.5 text-text-sm font-medium rounded-md transition-colors ${
              mode === "simple"
                ? "bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-sm"
                : "text-[var(--color-text-tertiary)]"
            }`}
          >
            Simples
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "detailed"}
            onClick={() => setMode("detailed")}
            className={`px-3 py-1.5 text-text-sm font-medium rounded-md transition-colors ${
              mode === "detailed"
                ? "bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-sm"
                : "text-[var(--color-text-tertiary)]"
            }`}
          >
            Detalhado
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.print()}
            className="h-11"
          >
            <PrinterIcon size={28} weight="duotone" />
            Imprimir
          </Button>
          <PdfDownloadButton summary={summary} mode={mode} />
          <Button type="button" onClick={onClose} className="h-11">
            <XIcon size={28} weight="duotone" />
            Fechar
          </Button>
        </div>
      </div>

      <div
        data-slot="closing-report"
        className="grid gap-4 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4 max-h-[60vh] overflow-auto"
      >
        <header className="grid gap-1 border-b border-[var(--color-border-secondary)] pb-3">
          <h3 className="text-text-lg font-semibold text-[var(--color-text-primary)]">
            {summary.shop.name}
          </h3>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            Fechamento de caixa · {formatBR(summary.session.closed_at)}
          </p>
        </header>

        <section className="grid gap-2 text-text-sm">
          <Row label="Aberto em" value={formatBR(summary.session.opened_at)} />
          <Row label="Aberto por" value={summary.session.opened_by} />
          <Row label="Fechado em" value={formatBR(summary.session.closed_at)} />
          <Row label="Fechado por" value={summary.session.closed_by} />
          <Row
            label="Troco inicial"
            value={formatMoney(summary.session.opening_amount_cents)}
          />
        </section>

        <section className="grid gap-2 border-t border-[var(--color-border-secondary)] pt-3 text-text-sm">
          <h4 className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Faturamento
          </h4>
          <Row
            label="Total recebido"
            value={formatMoney(summary.totals.paid)}
            strong
          />
          <Row
            label="Dinheiro"
            value={formatMoney(summary.totals.by_method.cash ?? 0)}
          />
          <Row
            label="PIX"
            value={formatMoney(summary.totals.by_method.pix ?? 0)}
          />
          <Row
            label="Débito"
            value={formatMoney(summary.totals.by_method.debit ?? 0)}
          />
          <Row
            label="Crédito"
            value={formatMoney(summary.totals.by_method.credit ?? 0)}
          />
          <Row
            label="Voucher"
            value={formatMoney(summary.totals.by_method.voucher ?? 0)}
          />
          <Row
            label="Outros"
            value={formatMoney(summary.totals.by_method.other ?? 0)}
          />
        </section>

        <section className="grid gap-2 border-t border-[var(--color-border-secondary)] pt-3 text-text-sm">
          <h4 className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Caixa
          </h4>
          <Row
            label="Suprimentos"
            value={formatMoney(summary.totals.movements_in)}
          />
          <Row
            label="Sangrias"
            value={formatMoney(summary.totals.movements_out)}
          />
          <Row
            label="Esperado em dinheiro"
            value={formatMoney(summary.totals.expected_cash)}
          />
          <Row
            label="Contado"
            value={formatMoney(summary.session.closing_amount_cents)}
            strong
          />
          <Row label="Diferença" value={diffLabel} strong />
        </section>

        {summary.session.notes && (
          <section className="grid gap-1 border-t border-[var(--color-border-secondary)] pt-3 text-text-sm">
            <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
              Observações
            </span>
            <p className="text-[var(--color-text-secondary)]">
              {summary.session.notes}
            </p>
          </section>
        )}

        {mode === "detailed" && (
          <>
            <section className="grid gap-2 border-t border-[var(--color-border-secondary)] pt-3 text-text-sm">
              <h4 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Vendas ({summary.sales.length})
              </h4>
              {summary.sales.length === 0 ? (
                <p className="text-[var(--color-text-tertiary)]">
                  Nenhuma venda registrada.
                </p>
              ) : (
                <ul className="grid gap-2">
                  {summary.sales.map((s) => (
                    <li
                      key={s.id}
                      className="grid gap-1 rounded-md border border-[var(--color-border-secondary)] p-2 text-text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {s.client_name}
                        </span>
                        <span className="tabular-nums text-[var(--color-text-primary)]">
                          {formatMoney(s.total_cents)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 text-[var(--color-text-tertiary)]">
                        <span>
                          {formatTimeOnly(s.created_at)} · {s.barber_name}
                        </span>
                        <span>{s.methods || "—"}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="grid gap-2 border-t border-[var(--color-border-secondary)] pt-3 text-text-sm">
              <h4 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Movimentos ({summary.movements.length})
              </h4>
              {summary.movements.length === 0 ? (
                <p className="text-[var(--color-text-tertiary)]">
                  Nenhum movimento manual.
                </p>
              ) : (
                <ul className="grid gap-2">
                  {summary.movements.map((m) => (
                    <li
                      key={m.id}
                      className="grid gap-1 rounded-md border border-[var(--color-border-secondary)] p-2 text-text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {m.reason}
                        </span>
                        <span
                          className={`tabular-nums ${
                            m.type === "in"
                              ? "text-[var(--color-success-700)]"
                              : "text-[var(--color-error-700)]"
                          }`}
                        >
                          {m.type === "in" ? "+" : "−"} {formatMoney(m.amount_cents)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 text-[var(--color-text-tertiary)]">
                        <span>
                          {formatTimeOnly(m.created_at)} · {m.created_by}
                        </span>
                        <span className="truncate max-w-[180px]">
                          {m.description || "—"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[var(--color-text-tertiary)]">{label}</span>
      <span
        className={`tabular-nums ${
          strong
            ? "font-semibold text-[var(--color-text-primary)]"
            : "text-[var(--color-text-primary)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
