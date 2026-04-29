import {
  CurrencyDollarSimpleIcon,
  PlusIcon,
  ReceiptIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { formatMoney } from "@/lib/format";
import type { CategoryColor } from "@/lib/zod/financeiro";
import type { PaymentMethod } from "@/lib/zod/caixa";
import { resolvePeriod, todayISO } from "../_lib/period";
import { PeriodFilter } from "../_components/period-filter";
import { createExpenseAction } from "../actions";
import { ExpenseForm } from "./_components/expense-form";
import {
  ExpenseCard,
  ExpenseRow,
  type ExpenseRowData,
} from "./_components/expense-row";

type SearchParams = Promise<{
  from?: string;
  to?: string;
  preset?: string;
  status?: "all" | "open" | "paid" | "overdue";
}>;

export default async function APagarPage({
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
  const status = sp.status ?? "all";
  const today = todayISO();
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const [{ data: rawCats }, { data: openSession }, { data: rawExpenses }] =
    await Promise.all([
      supabase
        .from("expense_categories")
        .select("id, name, color, is_active")
        .eq("barbershop_id", shopId)
        .order("name"),
      supabase
        .from("cash_sessions")
        .select("id")
        .eq("barbershop_id", shopId)
        .eq("status", "open")
        .maybeSingle(),
      supabase
        .from("expenses")
        .select(
          "id, description, amount_cents, due_date, paid_at, payment_method, notes, category:expense_categories(id, name, color)"
        )
        .eq("barbershop_id", shopId)
        .gte("due_date", period.from)
        .lte("due_date", period.to)
        .order("due_date", { ascending: true }),
    ]);

  const categories = (rawCats ?? []).filter((c) => c.is_active);

  const expenses: ExpenseRowData[] = (rawExpenses ?? []).map((e) => ({
    id: e.id,
    description: e.description,
    amount_cents: e.amount_cents,
    due_date: e.due_date,
    paid_at: e.paid_at,
    payment_method: e.payment_method as PaymentMethod | null,
    notes: e.notes,
    category: e.category
      ? {
          id: e.category.id,
          name: e.category.name,
          color: e.category.color as CategoryColor,
        }
      : null,
  }));

  const filtered = expenses.filter((e) => {
    if (status === "all") return true;
    const isPaid = !!e.paid_at;
    const isOverdue = !isPaid && e.due_date < today;
    if (status === "paid") return isPaid;
    if (status === "open") return !isPaid && !isOverdue;
    if (status === "overdue") return isOverdue;
    return true;
  });

  const totalOpen = expenses
    .filter((e) => !e.paid_at)
    .reduce((s, e) => s + e.amount_cents, 0);
  const totalPaid = expenses
    .filter((e) => !!e.paid_at)
    .reduce((s, e) => s + e.amount_cents, 0);
  const totalOverdue = expenses
    .filter((e) => !e.paid_at && e.due_date < today)
    .reduce((s, e) => s + e.amount_cents, 0);

  const cashSessionOpen = !!openSession;

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            A pagar
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Despesas com vencimento no período selecionado.
          </p>
        </div>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({ size: "lg", className: "h-11 w-full sm:w-auto" })}
          >
            <PlusIcon size={28} weight="duotone" />
            Nova despesa
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Nova despesa</DialogTitle>
              <DialogDescription>
                Conta a pagar — informe vencimento e marque como paga se já foi.
              </DialogDescription>
            </DialogHeader>
            <ExpenseForm
              action={createExpenseAction}
              categories={categories}
              defaultDate={today}
              cashSessionOpen={cashSessionOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <KPI
          label="Em aberto"
          value={formatMoney(totalOpen)}
          icon={<ReceiptIcon size={28} weight="duotone" />}
          tone="warning"
        />
        <KPI
          label="Vencidas"
          value={formatMoney(totalOverdue)}
          icon={<CurrencyDollarSimpleIcon size={28} weight="duotone" />}
          tone="error"
        />
        <KPI
          label="Pagas no período"
          value={formatMoney(totalPaid)}
          icon={<ReceiptIcon size={28} weight="duotone" />}
          tone="success"
        />
      </div>

      <Card className="p-0">
        <PeriodFilter
          basePath="/app/financeiro/a-pagar"
          active={period.active}
          from={period.from}
          to={period.to}
        />
        <div className="flex flex-wrap items-center gap-2 border-b border-[var(--color-border-secondary)] px-4 py-3 text-text-sm sm:px-6">
          <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
            Filtrar:
          </span>
          {(["all", "open", "overdue", "paid"] as const).map((s) => {
            const labels = {
              all: "Todas",
              open: "Em aberto",
              overdue: "Vencidas",
              paid: "Pagas",
            };
            const isActive = status === s;
            const sp = new URLSearchParams();
            sp.set("preset", period.active);
            if (period.active === "custom") {
              sp.set("from", period.from);
              sp.set("to", period.to);
            }
            if (s !== "all") sp.set("status", s);
            return (
              <a
                key={s}
                href={`/app/financeiro/a-pagar?${sp.toString()}`}
                className={`rounded-md border px-2.5 py-1 text-text-xs font-medium ${
                  isActive
                    ? "border-[var(--color-blue-300)] bg-[var(--color-blue-50)] text-[var(--color-blue-700)]"
                    : "border-[var(--color-border-secondary)] text-[var(--color-text-tertiary)]"
                }`}
              >
                {labels[s]}
              </a>
            );
          })}
        </div>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                <ReceiptIcon size={28} weight="duotone" />
              </div>
              <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Nada por aqui
              </p>
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Tente ampliar o período ou alterar o filtro.
              </p>
            </div>
          ) : (
            <>
              <ul className="grid gap-3 p-4 sm:hidden">
                {filtered.map((e) => (
                  <li key={e.id}>
                    <ExpenseCard
                      expense={e}
                      categories={categories}
                      todayISO={today}
                      cashSessionOpen={cashSessionOpen}
                    />
                  </li>
                ))}
              </ul>
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--color-bg-secondary)] text-left">
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Vencimento
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Método
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((e) => (
                      <ExpenseRow
                        key={e.id}
                        expense={e}
                        categories={categories}
                        todayISO={today}
                        cashSessionOpen={cashSessionOpen}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
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
  tone: "warning" | "error" | "success";
}) {
  const TONES = {
    warning:
      "border-[var(--color-warning-200)] bg-[var(--color-warning-50)] text-[var(--color-warning-700)]",
    error:
      "border-[var(--color-error-200)] bg-[var(--color-error-50)] text-[var(--color-error-700)]",
    success:
      "border-[var(--color-success-200)] bg-[var(--color-success-50)] text-[var(--color-success-700)]",
  };
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="grid gap-1">
          <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
            {label}
          </span>
          <span className="text-text-xl font-semibold tabular-nums text-[var(--color-text-primary)] sm:text-display-xs">
            {value}
          </span>
        </div>
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${TONES[tone]}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
