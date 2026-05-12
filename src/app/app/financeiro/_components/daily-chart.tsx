import { formatDateBR, formatMoney } from "@/lib/format";

type Point = { day: string; revenue_cents: number; expenses_cents: number };

export function DailyChart({ data }: { data: Point[] }) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-12 text-center">
        <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Sem dados no período
        </p>
        <p className="text-text-sm text-[var(--color-text-tertiary)]">
          Selecione um período com vendas ou despesas pagas.
        </p>
      </div>
    );
  }

  const max = Math.max(
    1,
    ...data.map((p) => Math.max(p.revenue_cents, p.expenses_cents))
  );
  const totalRevenue = data.reduce((s, p) => s + p.revenue_cents, 0);
  const totalExpenses = data.reduce((s, p) => s + p.expenses_cents, 0);
  const hasExpenses = totalExpenses > 0;
  const labelStep = data.length > 14 ? Math.ceil(data.length / 7) : 1;
  const BAR_AREA = 170;

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-text-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-[var(--color-success-500)]" />
            <span className="text-[var(--color-text-tertiary)]">Receita</span>
            <span className="font-semibold tabular-nums text-[var(--color-text-primary)]">
              {formatMoney(totalRevenue)}
            </span>
          </span>
          {hasExpenses && (
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2.5 rounded-sm bg-[var(--color-error-500)]" />
              <span className="text-[var(--color-text-tertiary)]">Despesas</span>
              <span className="font-semibold tabular-nums text-[var(--color-text-primary)]">
                {formatMoney(totalExpenses)}
              </span>
            </span>
          )}
        </div>
        <span className="text-text-xs tabular-nums text-[var(--color-text-tertiary)]">
          Pico: {formatMoney(max)}
        </span>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 grid"
          style={{ height: `${BAR_AREA}px` }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-t border-dashed border-[var(--color-border-secondary)]"
            />
          ))}
        </div>

        <div
          className="relative flex w-full items-end gap-0.5 sm:gap-1"
          style={{ height: `${BAR_AREA}px` }}
        >
          {data.map((p) => {
            const rh = Math.max(
              (p.revenue_cents / max) * BAR_AREA,
              p.revenue_cents > 0 ? 2 : 0
            );
            const eh = Math.max(
              (p.expenses_cents / max) * BAR_AREA,
              p.expenses_cents > 0 ? 2 : 0
            );
            return (
              <div
                key={p.day}
                className="flex min-w-0 flex-1 flex-col items-center justify-end"
                title={`${formatDateBR(p.day)} · Receita ${formatMoney(
                  p.revenue_cents
                )}${
                  hasExpenses
                    ? ` · Despesas ${formatMoney(p.expenses_cents)}`
                    : ""
                }`}
              >
                <div
                  className={`flex w-full items-end justify-center ${
                    hasExpenses ? "gap-0.5" : ""
                  }`}
                  style={{ height: `${BAR_AREA}px` }}
                >
                  <div
                    className={`${
                      hasExpenses ? "w-1/2 max-w-[10px]" : "w-2/3 max-w-[18px]"
                    } rounded-t bg-[var(--color-success-500)]`}
                    style={{ height: `${rh}px` }}
                  />
                  {hasExpenses && (
                    <div
                      className="w-1/2 max-w-[10px] rounded-t bg-[var(--color-error-500)]"
                      style={{ height: `${eh}px` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-1.5 flex w-full gap-0.5 sm:gap-1">
          {data.map((p, idx) => (
            <span
              key={p.day}
              className="min-w-0 flex-1 truncate text-center text-[10px] tabular-nums text-[var(--color-text-tertiary)]"
            >
              {idx % labelStep === 0 ? formatDateBR(p.day, "dd/MM") : "\u00a0"}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
