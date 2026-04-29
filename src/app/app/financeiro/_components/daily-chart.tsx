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

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-4 text-text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm bg-[var(--color-success-500)]" />
          Receita {formatMoney(totalRevenue)}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-3 rounded-sm bg-[var(--color-error-500)]" />
          Despesas {formatMoney(totalExpenses)}
        </span>
      </div>
      <div className="flex w-full items-end gap-1 pb-2" style={{ minHeight: "180px" }}>
        {data.map((p) => {
          const rh = (p.revenue_cents / max) * 160;
          const eh = (p.expenses_cents / max) * 160;
          return (
            <div
              key={p.day}
              className="flex min-w-0 flex-1 flex-col items-center gap-1"
              title={`${formatDateBR(p.day)} · Receita ${formatMoney(
                p.revenue_cents
              )} · Despesas ${formatMoney(p.expenses_cents)}`}
            >
              <div className="flex h-[160px] w-full items-end justify-center gap-0.5">
                <div
                  className="w-1/3 max-w-[12px] rounded-t bg-[var(--color-success-500)]"
                  style={{ height: `${Math.max(rh, p.revenue_cents > 0 ? 2 : 0)}px` }}
                />
                <div
                  className="w-1/3 max-w-[12px] rounded-t bg-[var(--color-error-500)]"
                  style={{ height: `${Math.max(eh, p.expenses_cents > 0 ? 2 : 0)}px` }}
                />
              </div>
              <span className="text-[10px] tabular-nums text-[var(--color-text-tertiary)]">
                {formatDateBR(p.day, "dd/MM")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
