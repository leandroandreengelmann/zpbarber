import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChartLineUpIcon,
  CurrencyCircleDollarIcon,
  ReceiptIcon,
  StorefrontIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { formatDateBR, formatMoney } from "@/lib/format";

const CYCLE_TO_MONTHS: Record<string, number> = {
  monthly: 1,
  quarterly: 3,
  yearly: 12,
};

function daysAgoIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function nextDaysIso(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(23, 59, 59, 999);
  return d.toISOString();
}

export default async function AdminFinancialsPage() {
  const supabase = await createClient();
  const now = new Date();
  const last30Iso = daysAgoIso(30);
  const last7Iso = daysAgoIso(7);
  const next30Iso = nextDaysIso(30);

  const [
    activeSubsRes,
    cancelled30dRes,
    activeBefore30dRes,
    paid30dRes,
    paid7dRes,
    overdueRes,
    pendingNext30Res,
    shopsActiveRes,
  ] = await Promise.all([
    supabase
      .from("subscriptions")
      .select(
        "id, plan:plans(price_cents, billing_cycle), status, barbershop:barbershops(id, name)"
      )
      .in("status", ["trialing", "active", "past_due"]),
    supabase
      .from("subscriptions")
      .select("id, cancelled_at")
      .eq("status", "cancelled")
      .gte("cancelled_at", last30Iso),
    supabase
      .from("subscriptions")
      .select("id")
      .in("status", ["trialing", "active", "past_due", "cancelled"])
      .lte("created_at", last30Iso),
    supabase
      .from("invoices")
      .select("amount_cents, paid_at")
      .eq("status", "paid")
      .gte("paid_at", last30Iso),
    supabase
      .from("invoices")
      .select("amount_cents, paid_at")
      .eq("status", "paid")
      .gte("paid_at", last7Iso),
    supabase
      .from("invoices")
      .select(
        "id, amount_cents, due_date, barbershop:barbershops(id, name, slug)"
      )
      .eq("status", "overdue")
      .order("due_date", { ascending: true })
      .limit(20),
    supabase
      .from("invoices")
      .select(
        "id, amount_cents, due_date, status, barbershop:barbershops(id, name, slug)"
      )
      .eq("status", "pending")
      .lte("due_date", next30Iso.slice(0, 10))
      .order("due_date", { ascending: true })
      .limit(20),
    supabase
      .from("barbershops")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
  ]);

  // MRR: soma do valor mensalizado de todas as subs com status active/trialing/past_due
  const mrrCents = (activeSubsRes.data ?? []).reduce((acc, s) => {
    const months = s.plan?.billing_cycle
      ? CYCLE_TO_MONTHS[s.plan.billing_cycle]
      : 0;
    if (!months || !s.plan?.price_cents) return acc;
    return acc + Math.round(s.plan.price_cents / months);
  }, 0);

  const activeCount = activeSubsRes.data?.length ?? 0;
  const cancelled30d = cancelled30dRes.data?.length ?? 0;
  const baseline = activeBefore30dRes.data?.length ?? 0;
  const churnPct = baseline > 0 ? (cancelled30d / baseline) * 100 : 0;

  const recv30d = (paid30dRes.data ?? []).reduce(
    (acc, i) => acc + i.amount_cents,
    0
  );
  const recv7d = (paid7dRes.data ?? []).reduce(
    (acc, i) => acc + i.amount_cents,
    0
  );

  const overdue = overdueRes.data ?? [];
  const overdueTotal = overdue.reduce((a, i) => a + i.amount_cents, 0);
  const pendingNext30 = pendingNext30Res.data ?? [];
  const pendingNext30Total = pendingNext30.reduce(
    (a, i) => a + i.amount_cents,
    0
  );
  const shopsActive = shopsActiveRes.count ?? 0;

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Financeiro
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Receita recorrente, churn e cobranças em aberto.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi
          icon={<ChartLineUpIcon size={28} weight="duotone" />}
          label="MRR"
          value={formatMoney(mrrCents)}
          hint={`${activeCount} ${activeCount === 1 ? "assinatura ativa" : "assinaturas ativas"}`}
        />
        <Kpi
          icon={<CurrencyCircleDollarIcon size={28} weight="duotone" />}
          label="Recebido (30d)"
          value={formatMoney(recv30d)}
          hint={`${formatMoney(recv7d)} nos últimos 7d`}
          tone="success"
        />
        <Kpi
          icon={<ArrowDownIcon size={28} weight="duotone" />}
          label="Churn (30d)"
          value={`${churnPct.toFixed(1)}%`}
          hint={`${cancelled30d} cancelamentos / ${baseline} subs`}
          tone={churnPct > 5 ? "danger" : "muted"}
        />
        <Kpi
          icon={<StorefrontIcon size={28} weight="duotone" />}
          label="Barbearias ativas"
          value={shopsActive.toLocaleString("pt-BR")}
          hint=""
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Kpi
          icon={<WarningCircleIcon size={28} weight="duotone" />}
          label="Inadimplência"
          value={formatMoney(overdueTotal)}
          hint={`${overdue.length} ${overdue.length === 1 ? "cobrança atrasada" : "cobranças atrasadas"}`}
          tone={overdueTotal > 0 ? "danger" : "muted"}
        />
        <Kpi
          icon={<ReceiptIcon size={28} weight="duotone" />}
          label="A receber (próx. 30d)"
          value={formatMoney(pendingNext30Total)}
          hint={`${pendingNext30.length} ${pendingNext30.length === 1 ? "cobrança" : "cobranças"} pendentes`}
        />
      </div>

      <section className="grid gap-2">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Cobranças atrasadas
        </h2>
        {overdue.length === 0 ? (
          <Card className="py-8 text-center text-text-sm text-[var(--color-text-tertiary)]">
            Nenhuma cobrança atrasada — segue o jogo.
          </Card>
        ) : (
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6">Vencimento</TableHead>
                  <TableHead className="px-4">Barbearia</TableHead>
                  <TableHead className="px-4 text-right">Valor</TableHead>
                  <TableHead className="px-4 pr-6">Dias atrás</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {overdue.map((inv) => {
                  const days = Math.floor(
                    (now.getTime() - new Date(inv.due_date).getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return (
                    <TableRow key={inv.id}>
                      <TableCell className="px-6 py-3 tabular-nums text-text-sm text-[var(--color-text-tertiary)]">
                        {formatDateBR(inv.due_date)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-text-sm">
                        <div className="grid gap-0.5">
                          <span className="font-medium text-[var(--color-text-primary)]">
                            {inv.barbershop?.name ?? "—"}
                          </span>
                          <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                            {inv.barbershop?.slug}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right font-medium tabular-nums text-text-sm text-[var(--color-text-primary)]">
                        {formatMoney(inv.amount_cents)}
                      </TableCell>
                      <TableCell className="px-4 py-3 pr-6">
                        <Badge variant="destructive">{days}d</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            </div>
          </Card>
        )}
      </section>

      <section className="grid gap-2">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Próximas cobranças (30 dias)
        </h2>
        {pendingNext30.length === 0 ? (
          <Card className="py-8 text-center text-text-sm text-[var(--color-text-tertiary)]">
            Sem cobranças pendentes nos próximos 30 dias.
          </Card>
        ) : (
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-6">Vencimento</TableHead>
                  <TableHead className="px-4">Barbearia</TableHead>
                  <TableHead className="px-4 pr-6 text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingNext30.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="px-6 py-3 tabular-nums text-text-sm text-[var(--color-text-tertiary)]">
                      {formatDateBR(inv.due_date)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-text-sm">
                      <div className="grid gap-0.5">
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {inv.barbershop?.name ?? "—"}
                        </span>
                        <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                          {inv.barbershop?.slug}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 pr-6 text-right font-medium tabular-nums text-text-sm text-[var(--color-text-primary)]">
                      {formatMoney(inv.amount_cents)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  tone?: "default" | "success" | "danger" | "muted";
}) {
  const valueColor =
    tone === "success"
      ? "text-[var(--color-success-primary)]"
      : tone === "danger"
        ? "text-[var(--color-text-error-primary)]"
        : "text-[var(--color-text-primary)]";
  return (
    <Card className="grid gap-2 p-3 sm:p-4">
      <div className="flex items-center justify-between text-[var(--color-fg-quaternary)]">
        <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
          {label}
        </span>
        {icon}
      </div>
      <span className={`text-text-xl font-semibold tabular-nums sm:text-display-xs ${valueColor}`}>
        {value}
      </span>
      {hint && (
        <span className="text-text-xs text-[var(--color-text-tertiary)]">
          {hint}
        </span>
      )}
      <ArrowUpIcon className="hidden" />
    </Card>
  );
}
