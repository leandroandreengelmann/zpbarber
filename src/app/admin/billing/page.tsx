import {
  CurrencyCircleDollarIcon,
  ReceiptIcon,
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
import { formatDateBR, formatDateTimeBR, formatMoney } from "@/lib/format";
import { getAsaasConfigStatus } from "@/lib/asaas/config";
import { BillingFilters } from "./_components/filters";
import { BillingPager } from "./_components/pager";
import { InvoiceActions } from "./_components/invoice-actions";
import { BackfillButton } from "./_components/backfill-button";

const PAGE_SIZE = 50;

const STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  paid: "Paga",
  overdue: "Atrasada",
  refunded: "Estornada",
  cancelled: "Cancelada",
};

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  paid: "default",
  overdue: "destructive",
  refunded: "outline",
  cancelled: "outline",
};

function startOfPeriod(period: string | null): string | null {
  if (!period || period === "all") return null;
  const days = Number(period);
  if (!Number.isFinite(days) || days <= 0) return null;
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function AdminBillingPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return typeof v === "string" ? v : "";
  };

  const shopFilter = get("shop");
  const statusFilter = get("status");
  const period = get("period") || "30";
  const page = Math.max(1, Number(get("page") || "1") || 1);
  const fromIso = startOfPeriod(period);

  const supabase = await createClient();
  const gatewayStatus = await getAsaasConfigStatus();

  const shopsRes = await supabase
    .from("barbershops")
    .select("id, name, slug")
    .order("name", { ascending: true });

  let q = supabase
    .from("invoices")
    .select(
      "id, created_at, due_date, paid_at, amount_cents, status, payment_method, invoice_url, asaas_payment_id, barbershop_id, subscription_id, barbershop:barbershops(id, name, slug), subscription:subscriptions(id, plan:plans(name))",
      { count: "exact" }
    )
    .order("created_at", { ascending: false });

  const VALID_STATUS = ["pending", "paid", "overdue", "refunded", "cancelled"] as const;
  type InvoiceStatus = (typeof VALID_STATUS)[number];
  const statusValue = (VALID_STATUS as readonly string[]).includes(statusFilter)
    ? (statusFilter as InvoiceStatus)
    : null;

  if (shopFilter) q = q.eq("barbershop_id", shopFilter);
  if (statusValue) q = q.eq("status", statusValue);
  if (fromIso) q = q.gte("created_at", fromIso);

  const fromIdx = (page - 1) * PAGE_SIZE;
  const toIdx = fromIdx + PAGE_SIZE - 1;
  const invoicesRes = await q.range(fromIdx, toIdx);

  const invoices = invoicesRes.data ?? [];
  const total = invoicesRes.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Totais agregados (do filtro corrente)
  const totalsAgg = invoices.reduce(
    (acc, inv) => {
      acc.gross += inv.amount_cents;
      if (inv.status === "paid") acc.paid += inv.amount_cents;
      else if (inv.status === "overdue") acc.overdue += inv.amount_cents;
      else if (inv.status === "pending") acc.pending += inv.amount_cents;
      return acc;
    },
    { gross: 0, paid: 0, pending: 0, overdue: 0 }
  );

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Cobranças
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Invoices das assinaturas das barbearias.
          </p>
        </div>
        {gatewayStatus.configured && <BackfillButton />}
      </div>

      {!gatewayStatus.configured && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-warning-subtle)] bg-[var(--color-warning-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-warning-primary)]">
          <WarningCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
          <span>
            Gateway de pagamento não configurado. Configure em
            /admin/settings/payment para começar a cobrar barbearias.
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard label="Total bruto" valueCents={totalsAgg.gross} />
        <SummaryCard label="Recebido" valueCents={totalsAgg.paid} tone="default" />
        <SummaryCard label="Em aberto" valueCents={totalsAgg.pending} tone="secondary" />
        <SummaryCard label="Atrasado" valueCents={totalsAgg.overdue} tone="destructive" />
      </div>

      <BillingFilters shops={shopsRes.data ?? []} />

      {invoicesRes.error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          <WarningCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
          <span>Erro ao carregar: {invoicesRes.error.message}</span>
        </div>
      )}

      {invoices.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]">
            <ReceiptIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-1">
            <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Nenhuma cobrança no filtro
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Ajuste os filtros ou assine uma barbearia a um plano para gerar invoices.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <Card className="overflow-hidden p-0">
            <ul className="divide-y divide-[var(--color-border-secondary)] lg:hidden">
              {invoices.map((inv) => (
                <li key={inv.id} className="grid gap-2 px-4 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="grid gap-0.5">
                      {inv.barbershop ? (
                        <>
                          <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
                            {inv.barbershop.name}
                          </span>
                          <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                            {inv.barbershop.slug}
                          </span>
                        </>
                      ) : (
                        <span className="text-[var(--color-text-tertiary)]">—</span>
                      )}
                    </div>
                    <div className="grid justify-items-end gap-1">
                      <span className="text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
                        {formatMoney(inv.amount_cents)}
                      </span>
                      <Badge variant={STATUS_VARIANT[inv.status] ?? "outline"}>
                        {STATUS_LABEL[inv.status] ?? inv.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="grid gap-1 text-text-sm">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Vencimento
                      </span>
                      <span className="tabular-nums text-[var(--color-text-primary)]">
                        {formatDateBR(inv.due_date)}
                      </span>
                    </div>
                    {inv.subscription?.plan?.name && (
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Plano
                        </span>
                        <span className="text-[var(--color-text-primary)]">
                          {inv.subscription.plan.name}
                        </span>
                      </div>
                    )}
                    {inv.paid_at && (
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Pago em
                        </span>
                        <span className="tabular-nums text-[var(--color-text-tertiary)]">
                          {formatDateTimeBR(inv.paid_at)}
                        </span>
                      </div>
                    )}
                    {inv.payment_method && (
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Método
                        </span>
                        <span className="text-[var(--color-text-tertiary)]">
                          {inv.payment_method}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end pt-1">
                    <InvoiceActions
                      invoiceId={inv.id}
                      invoiceUrl={inv.invoice_url}
                      canFetchPix={
                        !!inv.asaas_payment_id && inv.status === "pending"
                      }
                      canSync={!!inv.asaas_payment_id}
                      canMarkPaid={inv.status === "pending" || inv.status === "overdue"}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-6 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Vencimento
                    </TableHead>
                    <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Barbearia
                    </TableHead>
                    <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Plano
                    </TableHead>
                    <TableHead className="px-4 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Valor
                    </TableHead>
                    <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Status
                    </TableHead>
                    <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Pago em
                    </TableHead>
                    <TableHead className="px-6 pr-6 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="px-6 py-4 align-top text-text-sm tabular-nums text-[var(--color-text-tertiary)]">
                        {formatDateBR(inv.due_date)}
                      </TableCell>
                      <TableCell className="px-4 py-4 align-top text-text-sm">
                        {inv.barbershop ? (
                          <div className="grid gap-0.5">
                            <span className="font-medium text-[var(--color-text-primary)]">
                              {inv.barbershop.name}
                            </span>
                            <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                              {inv.barbershop.slug}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[var(--color-text-tertiary)]">—</span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-4 align-top text-text-sm text-[var(--color-text-primary)]">
                        {inv.subscription?.plan?.name ?? "—"}
                      </TableCell>
                      <TableCell className="px-4 py-4 align-top text-right text-text-sm font-medium tabular-nums text-[var(--color-text-primary)]">
                        {formatMoney(inv.amount_cents)}
                      </TableCell>
                      <TableCell className="px-4 py-4 align-top">
                        <Badge variant={STATUS_VARIANT[inv.status] ?? "outline"}>
                          {STATUS_LABEL[inv.status] ?? inv.status}
                        </Badge>
                        {inv.payment_method && (
                          <div className="mt-1 text-text-xs text-[var(--color-text-tertiary)]">
                            {inv.payment_method}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-4 align-top text-text-sm tabular-nums text-[var(--color-text-tertiary)]">
                        {inv.paid_at ? formatDateTimeBR(inv.paid_at) : "—"}
                      </TableCell>
                      <TableCell className="px-6 py-4 pr-6 align-top text-right">
                        <InvoiceActions
                          invoiceId={inv.id}
                          invoiceUrl={inv.invoice_url}
                          canFetchPix={
                            !!inv.asaas_payment_id && inv.status === "pending"
                          }
                          canSync={!!inv.asaas_payment_id}
                          canMarkPaid={inv.status === "pending" || inv.status === "overdue"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          <BillingPager page={page} totalPages={totalPages} total={total} />
        </>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  valueCents,
  tone,
}: {
  label: string;
  valueCents: number;
  tone?: "default" | "secondary" | "destructive";
}) {
  const color =
    tone === "default"
      ? "text-[var(--color-success-primary)]"
      : tone === "destructive"
        ? "text-[var(--color-text-error-primary)]"
        : tone === "secondary"
          ? "text-[var(--color-text-warning-primary)]"
          : "text-[var(--color-text-primary)]";
  return (
    <Card className="grid gap-1 p-3 sm:p-4">
      <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
        {label}
      </span>
      <span className={`text-text-xl font-semibold tabular-nums sm:text-display-xs ${color}`}>
        {formatMoney(valueCents)}
      </span>
      <CurrencyCircleDollarIcon
        size={20}
        weight="duotone"
        className="hidden text-[var(--color-fg-quaternary)]"
      />
    </Card>
  );
}
