import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsLeftRightIcon,
  CashRegisterIcon,
  CircleNotchIcon,
  ReceiptIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
import { formatMoney, formatTimeBR, formatDateBR } from "@/lib/format";
import { computeCutoffAt, isSessionExpired } from "@/lib/caixa/cutoff";
import { Alert } from "@/components/ui/alert";
import { PAYMENT_LABEL, type PaymentMethod } from "@/lib/zod/caixa";
import { createCashMovementAction } from "../financeiro/actions";
import {
  closeCashSessionAction,
  openCashSessionAction,
} from "./actions";
import { OpenSessionForm } from "./_components/open-session-form";
import { CloseSessionFlow } from "./_components/close-session-flow";
import {
  type SaleClient,
  type SaleProduct,
  type SaleService,
} from "./_components/new-sale-form";
import { NewSaleDialog } from "./_components/new-sale-dialog";
import { PendingBills, type PendingAppt } from "./_components/pending-bills";
import { CashMovementForm } from "./_components/cash-movement-form";
import { DeleteMovementButton } from "./_components/movement-row-actions";

type OpenSession = {
  id: string;
  opened_at: string;
  opening_amount_cents: number;
  opened_by: { full_name: string | null } | null;
};

type SaleRow = {
  id: string;
  created_at: string;
  total_cents: number;
  status: "open" | "paid" | "cancelled";
  client: { full_name: string } | null;
  barber: { full_name: string | null } | null;
  payments: { method: PaymentMethod; amount_cents: number }[];
};

type CashMovementRow = {
  id: string;
  type: "in" | "out";
  reason: "supply" | "withdrawal" | "expense" | "receivable" | "other";
  amount_cents: number;
  description: string | null;
  created_at: string;
  expense_id: string | null;
  receivable_id: string | null;
  created_by: { full_name: string | null } | null;
};

const MOVEMENT_REASON_LABEL: Record<CashMovementRow["reason"], string> = {
  supply: "Suprimento",
  withdrawal: "Sangria",
  expense: "Despesa",
  receivable: "Recebimento",
  other: "Outro",
};

function dayBoundsBR(date = new Date()) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  open: {
    label: "Aberta",
    className:
      "bg-[var(--color-warning-50)] text-[var(--color-warning-700)] border border-[var(--color-warning-200)]",
  },
  paid: {
    label: "Paga",
    className:
      "bg-[var(--color-success-50)] text-[var(--color-success-700)] border border-[var(--color-success-200)]",
  },
  cancelled: {
    label: "Cancelada",
    className:
      "bg-[var(--color-error-50)] text-[var(--color-error-700)] border border-[var(--color-error-200)]",
  },
};

export default async function CaixaPage() {
  const { membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();
  const { start, end } = dayBoundsBR();

  const [
    { data: openSessionRaw },
    { data: clients },
    { data: services },
    { data: productsRaw },
  ] = await Promise.all([
    supabase
      .from("cash_sessions")
      .select(
        "id, opened_at, opening_amount_cents, opened_by:profiles!cash_sessions_opened_by_fkey(full_name)"
      )
      .eq("barbershop_id", shopId)
      .eq("status", "open")
      .maybeSingle(),
    supabase
      .from("clients")
      .select("id, full_name, phone")
      .eq("barbershop_id", shopId)
      .order("full_name"),
    supabase
      .from("services")
      .select("id, name, price_cents, duration_minutes")
      .eq("barbershop_id", shopId)
      .eq("is_active", true)
      .order("name"),
    supabase
      .from("products")
      .select("id, name, price_cents, stock_qty")
      .eq("barbershop_id", shopId)
      .eq("is_active", true)
      .order("name"),
  ]);

  const openSession = openSessionRaw as unknown as OpenSession | null;
  const isLocked = openSession ? isSessionExpired(openSession.opened_at) : false;
  const cutoffAt = openSession ? computeCutoffAt(openSession.opened_at) : null;

  const movementsPromise = openSession
    ? supabase
        .from("cash_movements")
        .select(
          "id, type, reason, amount_cents, description, created_at, expense_id, receivable_id, created_by:profiles!cash_movements_created_by_fkey(full_name)"
        )
        .eq("cash_session_id", openSession.id)
        .order("created_at", { ascending: false })
    : Promise.resolve({ data: [] as CashMovementRow[] });

  const [
    { data: salesTodayRaw },
    { data: completedTodayRaw },
    { data: linkedSalesRaw },
    { data: movementsRaw },
  ] = await Promise.all([
    supabase
      .from("sales")
      .select(
        "id, created_at, total_cents, status, client:clients(full_name), barber:profiles!sales_barber_id_fkey(full_name), payments:sale_payments(method, amount_cents)"
      )
      .eq("barbershop_id", shopId)
      .gte("created_at", start)
      .lte("created_at", end)
      .order("created_at", { ascending: false }),
    supabase
      .from("appointments")
      .select(
        "id, scheduled_at, price_cents, client_id, service_id, barber_id, client:clients(full_name), service:services(name), barber:profiles!appointments_barber_id_fkey(full_name)"
      )
      .eq("barbershop_id", shopId)
      .eq("status", "completed")
      .gte("scheduled_at", start)
      .lte("scheduled_at", end)
      .order("scheduled_at", { ascending: true }),
    supabase
      .from("sales")
      .select("appointment_id, status")
      .eq("barbershop_id", shopId)
      .not("appointment_id", "is", null)
      .in("status", ["open", "paid"]),
    movementsPromise,
  ]);

  const billedSet = new Set(
    (linkedSalesRaw ?? [])
      .map((s: { appointment_id: string | null }) => s.appointment_id)
      .filter((id: string | null): id is string => Boolean(id))
  );
  const pendingBills: PendingAppt[] = (
    (completedTodayRaw ?? []) as unknown as Array<{
      id: string;
      scheduled_at: string;
      price_cents: number;
      client_id: string;
      service_id: string;
      barber_id: string | null;
      client: { full_name: string } | null;
      service: { name: string } | null;
      barber: { full_name: string | null } | null;
    }>
  )
    .filter((a) => !billedSet.has(a.id))
    .map((a) => ({
      id: a.id,
      scheduled_at: a.scheduled_at,
      price_cents: a.price_cents,
      client_id: a.client_id,
      service_id: a.service_id,
      barber_id: a.barber_id,
      client_name: a.client?.full_name ?? "Cliente",
      service_name: a.service?.name ?? "Serviço",
      barber_name: a.barber?.full_name ?? null,
    }));

  const sales: SaleRow[] = (salesTodayRaw ?? []) as unknown as SaleRow[];
  const totalsByMethod: Record<PaymentMethod, number> = {
    cash: 0,
    pix: 0,
    debit: 0,
    credit: 0,
    voucher: 0,
    other: 0,
  };
  let totalPaid = 0;
  for (const s of sales) {
    if (s.status !== "paid") continue;
    for (const p of s.payments ?? []) {
      totalsByMethod[p.method as PaymentMethod] =
        (totalsByMethod[p.method as PaymentMethod] ?? 0) + (p.amount_cents ?? 0);
      totalPaid += p.amount_cents ?? 0;
    }
  }
  const movements = (movementsRaw ?? []) as unknown as CashMovementRow[];
  let movementsIn = 0;
  let movementsOut = 0;
  for (const m of movements) {
    if (m.type === "in") movementsIn += m.amount_cents;
    else movementsOut += m.amount_cents;
  }
  const expectedCash =
    (openSession?.opening_amount_cents ?? 0) +
    totalsByMethod.cash +
    movementsIn -
    movementsOut;

  const clientOpts: SaleClient[] = (clients ?? []).map((c) => ({
    id: c.id,
    full_name: c.full_name,
    phone: c.phone,
  }));
  const serviceOpts: SaleService[] = (services ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    price_cents: s.price_cents,
  }));
  const productOpts: SaleProduct[] = (productsRaw ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    price_cents: p.price_cents,
    stock_qty: p.stock_qty,
  }));

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Caixa
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Vendas, pagamentos e fechamento do dia.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          {openSession && !isLocked && (
            <>
              <Dialog>
                <DialogTrigger
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "h-11 w-full sm:w-auto",
                  })}
                >
                  <ArrowDownIcon size={24} weight="duotone" />
                  Suprimento
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Suprimento de caixa</DialogTitle>
                    <DialogDescription>
                      Entrada manual de dinheiro no caixa.
                    </DialogDescription>
                  </DialogHeader>
                  <CashMovementForm
                    type="in"
                    action={createCashMovementAction}
                  />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "h-11 w-full sm:w-auto",
                  })}
                >
                  <ArrowUpIcon size={24} weight="duotone" />
                  Sangria
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Sangria de caixa</DialogTitle>
                    <DialogDescription>
                      Retirada manual de dinheiro do caixa.
                    </DialogDescription>
                  </DialogHeader>
                  <CashMovementForm
                    type="out"
                    action={createCashMovementAction}
                  />
                </DialogContent>
              </Dialog>
              <NewSaleDialog
                clients={clientOpts}
                services={serviceOpts}
                products={productOpts}
              />
            </>
          )}
        </div>
      </div>

      {isLocked && cutoffAt && (
        <Alert variant="warning" title="Caixa expirado — feche para continuar">
          O ciclo deste caixa terminou à meia-noite de{" "}
          {formatDateBR(cutoffAt)}. Vendas, suprimentos e sangrias estão
          bloqueados até você fechar e abrir um novo caixa.
        </Alert>
      )}

      <Card>
        <CardContent className="grid gap-4 p-4 sm:gap-6 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="flex items-start gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
                <CashRegisterIcon size={28} weight="duotone" />
              </div>
              <div className="grid gap-1">
                <h2 className="text-text-lg font-semibold text-[var(--color-text-primary)]">
                  {openSession ? "Sessão de caixa aberta" : "Nenhuma sessão aberta"}
                </h2>
                {openSession ? (
                  <p className="text-text-sm text-[var(--color-text-tertiary)]">
                    Aberta {formatTimeBR(openSession.opened_at)} por{" "}
                    {openSession.opened_by?.full_name ?? "—"} · troco{" "}
                    {formatMoney(openSession.opening_amount_cents)}
                  </p>
                ) : (
                  <p className="text-text-sm text-[var(--color-text-tertiary)]">
                    Abra o caixa para começar a registrar vendas.
                  </p>
                )}
              </div>
            </div>
            {!openSession ? (
              <Dialog>
                <DialogTrigger className={buttonVariants({ size: "lg", className: "h-11 w-full sm:w-auto" })}>
                  <CircleNotchIcon size={28} weight="duotone" />
                  Abrir caixa
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Abrir caixa</DialogTitle>
                    <DialogDescription>
                      Informe o valor de troco em dinheiro disponível.
                    </DialogDescription>
                  </DialogHeader>
                  <OpenSessionForm action={openCashSessionAction} />
                </DialogContent>
              </Dialog>
            ) : (
              <CloseSessionFlow
                sessionId={openSession.id}
                expectedCents={expectedCash}
                action={closeCashSessionAction}
                triggerVariant={isLocked ? "default" : "outline"}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-[var(--color-border-secondary)] pt-4 sm:pt-6 lg:grid-cols-4">
            <KPI label="Faturado hoje" value={formatMoney(totalPaid)} highlight wide />
            <KPI label="Dinheiro" value={formatMoney(totalsByMethod.cash)} />
            <KPI label="PIX" value={formatMoney(totalsByMethod.pix)} />
            <KPI
              label="Cartões (D+C)"
              value={formatMoney(totalsByMethod.debit + totalsByMethod.credit)}
            />
          </div>

          {openSession && (
            <div className="grid grid-cols-2 gap-3 border-t border-[var(--color-border-secondary)] pt-4 sm:pt-6 lg:grid-cols-4">
              <KPI
                label="Suprimentos"
                value={formatMoney(movementsIn)}
              />
              <KPI label="Sangrias" value={formatMoney(movementsOut)} />
              <KPI
                label="Esperado em caixa"
                value={formatMoney(expectedCash)}
                highlight
              />
            </div>
          )}
        </CardContent>
      </Card>

      {openSession && !isLocked && (
        <PendingBills
          items={pendingBills}
          clients={clientOpts}
          services={serviceOpts}
          products={productOpts}
        />
      )}

      {openSession && (
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-[var(--color-border-secondary)] px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex items-center gap-2">
              <ArrowsLeftRightIcon
                size={28}
                weight="duotone"
                className="text-[var(--color-fg-secondary)]"
              />
              <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Movimentos de caixa
              </h2>
              <span className="text-text-sm text-[var(--color-text-tertiary)]">
                {movements.length}
              </span>
            </div>
          </div>
          <CardContent className="p-0">
            {movements.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                  <ArrowsLeftRightIcon size={28} weight="duotone" />
                </div>
                <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Sem movimentos manuais nesta sessão
                </p>
                <p className="text-text-sm text-[var(--color-text-tertiary)]">
                  Use Suprimento ou Sangria para registrar entradas e saídas.
                </p>
              </div>
            ) : (
              <>
                <ul className="grid gap-3 p-4 sm:hidden">
                  {movements.map((m) => {
                    const isIn = m.type === "in";
                    const reasonLabel = MOVEMENT_REASON_LABEL[m.reason];
                    const isManual =
                      m.reason === "supply" || m.reason === "withdrawal";
                    return (
                      <li key={m.id}>
                        <Card className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="grid gap-1 min-w-0">
                              <span
                                className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-0.5 text-text-xs font-medium ${
                                  isIn
                                    ? "border-[var(--color-success-200)] bg-[var(--color-success-50)] text-[var(--color-success-700)]"
                                    : "border-[var(--color-error-200)] bg-[var(--color-error-50)] text-[var(--color-error-700)]"
                                }`}
                              >
                                {reasonLabel}
                              </span>
                              <span className="text-text-sm text-[var(--color-text-primary)]">
                                {m.description ?? "—"}
                              </span>
                            </div>
                            <span
                              className={`shrink-0 text-text-lg font-semibold tabular-nums ${
                                isIn
                                  ? "text-[var(--color-success-700)]"
                                  : "text-[var(--color-error-700)]"
                              }`}
                            >
                              {isIn ? "+" : "−"} {formatMoney(m.amount_cents)}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--color-border-secondary)] pt-3 text-text-xs text-[var(--color-text-tertiary)]">
                            <span className="tabular-nums">
                              {formatTimeBR(m.created_at)}
                            </span>
                            <span className="truncate">
                              {m.created_by?.full_name ?? "—"}
                            </span>
                          </div>
                          {isManual && !isLocked && (
                            <div className="mt-3 border-t border-[var(--color-border-secondary)] pt-3">
                              <DeleteMovementButton id={m.id} />
                            </div>
                          )}
                        </Card>
                      </li>
                    );
                  })}
                </ul>
                <div className="hidden overflow-x-auto sm:block">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="bg-[var(--color-bg-secondary)] text-left">
                        <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Hora
                        </th>
                        <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Tipo
                        </th>
                        <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Descrição
                        </th>
                        <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Por
                        </th>
                        <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Valor
                        </th>
                        <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border-secondary)]">
                      {movements.map((m) => {
                        const isIn = m.type === "in";
                        const reasonLabel = MOVEMENT_REASON_LABEL[m.reason];
                        const isManual =
                          m.reason === "supply" || m.reason === "withdrawal";
                        return (
                          <tr key={m.id}>
                            <td className="px-6 py-4 text-text-sm tabular-nums text-[var(--color-text-secondary)]">
                              {formatTimeBR(m.created_at)}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-text-xs font-medium ${
                                  isIn
                                    ? "border-[var(--color-success-200)] bg-[var(--color-success-50)] text-[var(--color-success-700)]"
                                    : "border-[var(--color-error-200)] bg-[var(--color-error-50)] text-[var(--color-error-700)]"
                                }`}
                              >
                                {reasonLabel}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-text-sm text-[var(--color-text-primary)]">
                              {m.description ?? "—"}
                            </td>
                            <td className="px-6 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                              {m.created_by?.full_name ?? "—"}
                            </td>
                            <td
                              className={`px-6 py-4 text-right text-text-md font-semibold tabular-nums ${
                                isIn
                                  ? "text-[var(--color-success-700)]"
                                  : "text-[var(--color-error-700)]"
                              }`}
                            >
                              {isIn ? "+" : "−"} {formatMoney(m.amount_cents)}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {isManual && !isLocked ? (
                                <DeleteMovementButton id={m.id} />
                              ) : (
                                <span className="text-text-xs text-[var(--color-text-tertiary)]">
                                  {isManual ? "—" : "vinculado"}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      <Card className="p-0">
        <div className="flex items-center justify-between border-b border-[var(--color-border-secondary)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2">
            <ReceiptIcon
              size={28}
              weight="duotone"
              className="text-[var(--color-fg-secondary)]"
            />
            <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Vendas de hoje
            </h2>
            <span className="text-text-sm text-[var(--color-text-tertiary)]">
              {sales.length}
            </span>
          </div>
        </div>
        <CardContent className="p-0">
          {sales.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                <ReceiptIcon size={28} weight="duotone" />
              </div>
              <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Nenhuma venda registrada hoje
              </p>
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Use o botão Nova venda quando o caixa estiver aberto.
              </p>
            </div>
          ) : (
            <>
              <ul className="grid gap-3 p-4 sm:hidden">
                {sales.map((s) => {
                  const badge = STATUS_BADGE[s.status] ?? STATUS_BADGE.open;
                  const methods = (s.payments ?? [])
                    .map((p) => PAYMENT_LABEL[p.method as PaymentMethod])
                    .join(" · ");
                  return (
                    <li key={s.id}>
                      <Card className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="grid gap-0.5 min-w-0">
                            <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                              {s.client?.full_name ?? "Avulso"}
                            </span>
                            <span className="truncate text-text-xs text-[var(--color-text-tertiary)]">
                              {s.barber?.full_name ?? "—"}
                            </span>
                          </div>
                          <span
                            className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-text-xs font-medium ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <div className="mt-3 flex items-end justify-between gap-3 border-t border-[var(--color-border-secondary)] pt-3">
                          <div className="grid gap-0.5">
                            <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                              Total
                            </span>
                            <span className="text-text-xl font-semibold tabular-nums text-[var(--color-text-primary)]">
                              {formatMoney(s.total_cents)}
                            </span>
                          </div>
                          <div className="grid gap-0.5 text-right text-text-xs text-[var(--color-text-tertiary)]">
                            <span className="tabular-nums">
                              {formatTimeBR(s.created_at)}
                            </span>
                            <span className="truncate max-w-[180px]">
                              {methods || "—"}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </li>
                  );
                })}
              </ul>
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-[var(--color-bg-secondary)] text-left">
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Hora
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Barbeiro
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Pagamentos
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Total
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-secondary)]">
                    {sales.map((s) => {
                      const badge = STATUS_BADGE[s.status] ?? STATUS_BADGE.open;
                      const methods = (s.payments ?? [])
                        .map((p) => PAYMENT_LABEL[p.method as PaymentMethod])
                        .join(" · ");
                      return (
                        <tr key={s.id}>
                          <td className="px-6 py-4 text-text-sm tabular-nums text-[var(--color-text-secondary)]">
                            {formatTimeBR(s.created_at)}
                          </td>
                          <td className="px-6 py-4 text-text-sm text-[var(--color-text-primary)]">
                            {s.client?.full_name ?? "Avulso"}
                          </td>
                          <td className="px-6 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                            {s.barber?.full_name ?? "—"}
                          </td>
                          <td className="px-6 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                            {methods || "—"}
                          </td>
                          <td className="px-6 py-4 text-right text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
                            {formatMoney(s.total_cents)}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-text-xs font-medium ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
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
  highlight,
  wide,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`grid gap-1 rounded-lg border p-3 sm:p-4 ${
        wide ? "col-span-2 lg:col-span-1" : ""
      } ${
        highlight
          ? "border-[var(--color-blue-200)] bg-[var(--color-blue-50)]"
          : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]"
      }`}
    >
      <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
        {label}
      </span>
      <span
        className={`text-text-xl font-semibold tabular-nums sm:text-display-xs ${
          highlight
            ? "text-[var(--color-blue-700)]"
            : "text-[var(--color-text-primary)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
