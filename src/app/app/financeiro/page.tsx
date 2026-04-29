import {
  CalendarBlankIcon,
  ChartLineUpIcon,
  CreditCardIcon,
  CurrencyDollarSimpleIcon,
  HandCoinsIcon,
  ReceiptIcon,
  TagIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { formatDateBR, formatMoney } from "@/lib/format";
import { PAYMENT_LABEL, type PaymentMethod } from "@/lib/zod/caixa";
import { resolvePeriod, todayISO } from "./_lib/period";
import { PeriodFilter } from "./_components/period-filter";
import { DailyChart } from "./_components/daily-chart";

type SearchParams = Promise<{ from?: string; to?: string; preset?: string }>;

type Summary = {
  revenue_cents: number;
  expenses_cents: number;
  commissions_cents: number;
  receivables_cents: number;
  net_cents: number;
  open_payable_cents: number;
  open_receivable_cents: number;
  overdue_payable_cents: number;
  overdue_receivable_cents: number;
  by_method: Record<string, number>;
  by_category: Record<string, number>;
};

function addDays(iso: string, days: number) {
  const d = new Date(`${iso}T12:00:00-03:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default async function FinanceiroPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { membership } = await requireBarbershop();
  if (membership.role === "barbeiro") {
    return (
      <p className="text-text-md text-[var(--color-text-tertiary)]">
        Sem permissão.
      </p>
    );
  }
  const sp = await searchParams;
  const period = resolvePeriod(sp);
  const today = todayISO();
  const weekFrom = today;
  const weekTo = addDays(today, 7);
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const [
    { data: rawSummary },
    { data: rawDaily },
    { data: weekPayables },
    { data: weekReceivables },
  ] = await Promise.all([
    supabase.rpc("fn_financial_summary", {
      p_shop: shopId,
      p_from: period.from,
      p_to: period.to,
    }),
    supabase.rpc("fn_financial_daily", {
      p_shop: shopId,
      p_from: period.from,
      p_to: period.to,
    }),
    supabase
      .from("expenses")
      .select(
        "id, description, amount_cents, due_date, category:expense_categories(name)"
      )
      .eq("barbershop_id", shopId)
      .is("paid_at", null)
      .gte("due_date", weekFrom)
      .lte("due_date", weekTo)
      .order("due_date", { ascending: true })
      .limit(10),
    supabase
      .from("receivables")
      .select(
        "id, description, amount_cents, due_date, client:clients(full_name)"
      )
      .eq("barbershop_id", shopId)
      .is("received_at", null)
      .gte("due_date", weekFrom)
      .lte("due_date", weekTo)
      .order("due_date", { ascending: true })
      .limit(10),
  ]);

  const summary = (rawSummary ?? {
    revenue_cents: 0,
    expenses_cents: 0,
    commissions_cents: 0,
    receivables_cents: 0,
    net_cents: 0,
    open_payable_cents: 0,
    open_receivable_cents: 0,
    overdue_payable_cents: 0,
    overdue_receivable_cents: 0,
    by_method: {},
    by_category: {},
  }) as unknown as Summary;

  const daily = (rawDaily ?? []) as Array<{
    day: string;
    revenue_cents: number;
    expenses_cents: number;
  }>;

  const byMethodEntries = Object.entries(summary.by_method ?? {})
    .map(([k, v]) => [k as PaymentMethod, Number(v)] as const)
    .sort((a, b) => b[1] - a[1]);
  const byCategoryEntries = Object.entries(summary.by_category ?? {})
    .map(([k, v]) => [k, Number(v)] as const)
    .sort((a, b) => b[1] - a[1]);

  const weekPay = weekPayables ?? [];
  const weekRec = weekReceivables ?? [];

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Financeiro
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Visão geral de receitas, despesas e resultado do período.
          </p>
        </div>
      </div>

      <Card className="p-0">
        <PeriodFilter
          basePath="/app/financeiro"
          active={period.active}
          from={period.from}
          to={period.to}
        />
      </Card>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <KPI
          label="Receita"
          value={formatMoney(summary.revenue_cents + summary.receivables_cents)}
          icon={<HandCoinsIcon size={28} weight="duotone" />}
          tone="success"
        />
        <KPI
          label="Despesas"
          value={formatMoney(summary.expenses_cents)}
          icon={<ReceiptIcon size={28} weight="duotone" />}
          tone="error"
        />
        <KPI
          label="Comissões"
          value={formatMoney(summary.commissions_cents)}
          icon={<CreditCardIcon size={28} weight="duotone" />}
          tone="info"
        />
        <KPI
          label="Líquido"
          value={formatMoney(summary.net_cents)}
          icon={<ChartLineUpIcon size={28} weight="duotone" />}
          tone={summary.net_cents >= 0 ? "success" : "error"}
        />
        <KPI
          label="A vencer (7 dias)"
          value={formatMoney(
            weekPay.reduce((s, e) => s + e.amount_cents, 0) +
              weekRec.reduce((s, r) => s + r.amount_cents, 0)
          )}
          icon={<CalendarBlankIcon size={28} weight="duotone" />}
          tone="warning"
        />
      </div>

      <Card>
        <CardContent className="grid gap-4 p-6">
          <div className="flex items-center gap-2">
            <ChartLineUpIcon
              size={24}
              weight="duotone"
              className="text-[var(--color-fg-secondary)]"
            />
            <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Receita × Despesas no período
            </h2>
          </div>
          <DailyChart data={daily} />
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="grid gap-4 p-6">
            <div className="flex items-center gap-2">
              <CurrencyDollarSimpleIcon
                size={24}
                weight="duotone"
                className="text-[var(--color-fg-secondary)]"
              />
              <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Receita por método
              </h2>
            </div>
            <BreakdownList
              items={byMethodEntries.map(([m, v]) => ({
                label: PAYMENT_LABEL[m] ?? String(m),
                value: v,
              }))}
              empty="Sem pagamentos no período"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-4 p-6">
            <div className="flex items-center gap-2">
              <TagIcon
                size={24}
                weight="duotone"
                className="text-[var(--color-fg-secondary)]"
              />
              <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Despesas por categoria
              </h2>
            </div>
            <BreakdownList
              items={byCategoryEntries.map(([k, v]) => ({ label: k, value: v }))}
              empty="Sem despesas pagas no período"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="grid gap-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarBlankIcon
                  size={24}
                  weight="duotone"
                  className="text-[var(--color-fg-secondary)]"
                />
                <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Despesas vencendo (7 dias)
                </h2>
              </div>
              <a
                href="/app/financeiro/a-pagar"
                className="text-text-sm font-medium text-[var(--color-blue-600)] hover:underline"
              >
                Ver todas →
              </a>
            </div>
            {weekPay.length === 0 ? (
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Nada vencendo nos próximos 7 dias.
              </p>
            ) : (
              <ul className="grid divide-y divide-[var(--color-border-secondary)]">
                {weekPay.map((e) => (
                  <li
                    key={e.id}
                    className="flex items-center justify-between gap-3 py-2.5"
                  >
                    <div className="grid gap-0.5">
                      <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                        {e.description}
                      </span>
                      <span className="text-text-xs text-[var(--color-text-tertiary)]">
                        {e.category?.name ?? "Sem categoria"} ·{" "}
                        {formatDateBR(e.due_date)}
                      </span>
                    </div>
                    <span className="text-text-sm font-semibold tabular-nums text-[var(--color-text-primary)]">
                      {formatMoney(e.amount_cents)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-4 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarBlankIcon
                  size={24}
                  weight="duotone"
                  className="text-[var(--color-fg-secondary)]"
                />
                <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Recebíveis a vencer (7 dias)
                </h2>
              </div>
              <a
                href="/app/financeiro/a-receber"
                className="text-text-sm font-medium text-[var(--color-blue-600)] hover:underline"
              >
                Ver todos →
              </a>
            </div>
            {weekRec.length === 0 ? (
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Nada vencendo nos próximos 7 dias.
              </p>
            ) : (
              <ul className="grid divide-y divide-[var(--color-border-secondary)]">
                {weekRec.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between gap-3 py-2.5"
                  >
                    <div className="grid gap-0.5">
                      <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                        {r.description}
                      </span>
                      <span className="text-text-xs text-[var(--color-text-tertiary)]">
                        {r.client?.full_name ?? "Sem cliente"} ·{" "}
                        {formatDateBR(r.due_date)}
                      </span>
                    </div>
                    <span className="text-text-sm font-semibold tabular-nums text-[var(--color-text-primary)]">
                      {formatMoney(r.amount_cents)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MiniKPI
          label="Em aberto a pagar"
          value={formatMoney(summary.open_payable_cents)}
          tone="warning"
        />
        <MiniKPI
          label="Vencidas a pagar"
          value={formatMoney(summary.overdue_payable_cents)}
          tone="error"
        />
        <MiniKPI
          label="Em aberto a receber"
          value={formatMoney(summary.open_receivable_cents)}
          tone="warning"
        />
        <MiniKPI
          label="Vencidos a receber"
          value={formatMoney(summary.overdue_receivable_cents)}
          tone="error"
        />
      </div>
    </div>
  );
}

function BreakdownList({
  items,
  empty,
}: {
  items: { label: string; value: number }[];
  empty: string;
}) {
  if (items.length === 0) {
    return (
      <p className="text-text-sm text-[var(--color-text-tertiary)]">{empty}</p>
    );
  }
  const max = Math.max(1, ...items.map((i) => i.value));
  const total = items.reduce((s, i) => s + i.value, 0);
  return (
    <ul className="grid gap-3">
      {items.map((i) => {
        const pct = total > 0 ? Math.round((i.value / total) * 100) : 0;
        return (
          <li key={i.label} className="grid gap-1">
            <div className="flex items-center justify-between text-text-sm">
              <span className="font-medium text-[var(--color-text-primary)]">
                {i.label}
              </span>
              <span className="tabular-nums text-[var(--color-text-secondary)]">
                {formatMoney(i.value)}{" "}
                <span className="text-text-xs text-[var(--color-text-tertiary)]">
                  ({pct}%)
                </span>
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-secondary)]">
              <div
                className="h-full rounded-full bg-[var(--color-blue-500)]"
                style={{ width: `${(i.value / max) * 100}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function KPI({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: "success" | "error" | "warning" | "info";
}) {
  const TONES = {
    success:
      "border-[var(--color-success-200)] bg-[var(--color-success-50)] text-[var(--color-success-700)]",
    error:
      "border-[var(--color-error-200)] bg-[var(--color-error-50)] text-[var(--color-error-700)]",
    warning:
      "border-[var(--color-warning-200)] bg-[var(--color-warning-50)] text-[var(--color-warning-700)]",
    info: "border-[var(--color-blue-200)] bg-[var(--color-blue-50)] text-[var(--color-blue-700)]",
  };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="grid gap-1">
          <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
            {label}
          </span>
          <span className="text-display-xs font-semibold tabular-nums text-[var(--color-text-primary)]">
            {value}
          </span>
        </div>
        <div
          className={`flex size-10 items-center justify-center rounded-lg border ${TONES[tone]}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

function MiniKPI({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "warning" | "error";
}) {
  const TONES = {
    warning:
      "border-[var(--color-warning-200)] bg-[var(--color-warning-50)] text-[var(--color-warning-700)]",
    error:
      "border-[var(--color-error-200)] bg-[var(--color-error-50)] text-[var(--color-error-700)]",
  };
  return (
    <div
      className={`grid gap-1 rounded-lg border p-4 ${TONES[tone]}`}
    >
      <span className="text-text-xs font-medium uppercase tracking-wide opacity-80">
        {label}
      </span>
      <span className="text-text-xl font-semibold tabular-nums">
        {value}
      </span>
    </div>
  );
}
