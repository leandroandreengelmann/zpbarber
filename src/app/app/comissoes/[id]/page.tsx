import {
  ArrowLeftIcon,
  ClockCounterClockwiseIcon,
  ScissorsIcon,
  PackageIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Forbidden } from "@/app/app/_components/forbidden";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { formatDateBR, formatDateTimeBR, formatMoney } from "@/lib/format";
import { resolvePeriod } from "../_lib/period";
import { PeriodFilter } from "../_components/period-filter";
import { registerPayoutAction, deletePayoutAction } from "./actions";
import { PayoutForm } from "./payout-form";
import { PayoutHistory, type PayoutRow } from "./payout-history";

type SearchParams = Promise<{ from?: string; to?: string; preset?: string }>;

function initials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase() || "?";
}

export default async function ComissaoDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SearchParams;
}) {
  const { id } = await params;
  const { membership } = await requireBarbershop();
  if (!can(membership, "comissoes.ver")) return <Forbidden title="Comissões" />;

  const sp = await searchParams;
  const period = resolvePeriod(sp);
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const [{ data: member }, { data: items }, { data: payouts }] = await Promise.all([
    supabase
      .from("barbershop_members")
      .select(
        "role, is_active, is_commissioned, user:profiles(id, full_name, phone)"
      )
      .eq("barbershop_id", shopId)
      .eq("user_id", id)
      .maybeSingle(),
    supabase.rpc("fn_commission_summary", {
      p_barbershop_id: shopId,
      p_barber_id: id,
      p_from: period.fromIso,
      p_to: period.toIso,
    }),
    supabase
      .from("commission_payouts")
      .select("id, period_start, period_end, total_cents, method, paid_at, notes")
      .eq("barbershop_id", shopId)
      .eq("barber_id", id)
      .order("paid_at", { ascending: false }),
  ]);

  if (!member || !member.user) notFound();

  const rows = items ?? [];
  const totalGross = rows.reduce((s, r) => s + (r.total_cents ?? 0), 0);
  const totalCommission = rows.reduce(
    (s, r) => s + (r.commission_cents ?? 0),
    0
  );

  const registerAction = registerPayoutAction.bind(null, id);
  const deleteAction = deletePayoutAction.bind(null, id);

  const services = rows.filter((r) => r.kind === "service");
  const products = rows.filter((r) => r.kind === "product");

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-4 sm:gap-6">
      <div>
        <Link
          href="/app/comissoes"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeftIcon size={28} weight="duotone" />
          Voltar
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Avatar className="size-14">
          <AvatarFallback className="text-text-md font-semibold">
            {initials(member.user.full_name)}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            {member.user.full_name ?? "Sem nome"}
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant={member.is_commissioned ? "default" : "outline"}>
              {member.is_commissioned ? "Comissionado" : "Sem comissão"}
            </Badge>
            <Badge variant={member.is_active ? "default" : "outline"}>
              {member.is_active ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </div>
      </div>

      <Card className="p-0">
        <PeriodFilter
          basePath={`/app/comissoes/${id}`}
          active={period.active}
          from={period.from}
          to={period.to}
        />

        <div className="grid grid-cols-1 gap-4 border-b border-[var(--color-border-secondary)] px-4 py-4 sm:grid-cols-3 sm:px-6 sm:py-5">
          <Stat
            label="Período"
            value={`${formatDateBR(period.from)} → ${formatDateBR(period.to)}`}
          />
          <Stat
            label="Itens"
            value={rows.length.toLocaleString("pt-BR")}
            hint={`${formatMoney(totalGross)} em vendas`}
          />
          <Stat
            label="Comissão pendente"
            value={formatMoney(totalCommission)}
            highlight
          />
        </div>

        <div className="flex justify-end px-4 py-3 sm:px-6 sm:py-4">
          <PayoutForm
            action={registerAction}
            defaultPeriodStart={period.from}
            defaultPeriodEnd={period.to}
            defaultTotalCents={totalCommission}
          />
        </div>
      </Card>

      {!member.is_commissioned ? (
        <Card>
          <CardHeader>
            <CardTitle>Comissão desligada</CardTitle>
            <CardDescription>
              Esse barbeiro está marcado como &quot;sem comissão&quot; no
              perfil. As vendas não geram valor a pagar.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ScissorsIcon size={24} weight="duotone" />
                Serviços
              </CardTitle>
              <CardDescription>
                {services.length === 0
                  ? "Nenhum serviço comissionável no período."
                  : `${services.length} item(ns) — ${formatMoney(
                      services.reduce((s, r) => s + (r.commission_cents ?? 0), 0)
                    )} em comissão`}
              </CardDescription>
            </CardHeader>
            {services.length > 0 && (
              <CardContent className="p-0">
                <ItemTable rows={services} />
              </CardContent>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PackageIcon size={24} weight="duotone" />
                Produtos
              </CardTitle>
              <CardDescription>
                {products.length === 0
                  ? "Nenhum produto comissionável no período."
                  : `${products.length} item(ns) — ${formatMoney(
                      products.reduce((s, r) => s + (r.commission_cents ?? 0), 0)
                    )} em comissão`}
              </CardDescription>
            </CardHeader>
            {products.length > 0 && (
              <CardContent className="p-0">
                <ItemTable rows={products} />
              </CardContent>
            )}
          </Card>
        </>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockCounterClockwiseIcon size={24} weight="duotone" />
            Histórico de pagamentos
          </CardTitle>
          <CardDescription>
            Pagamentos já registrados para esse barbeiro. Excluir um pagamento
            faz o período voltar a aparecer como pendente.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <PayoutHistory
            rows={(payouts ?? []) as PayoutRow[]}
            deleteAction={deleteAction}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function ItemTable({
  rows,
}: {
  rows: {
    item_id: string;
    description: string;
    quantity: number;
    unit_cents: number;
    total_cents: number;
    commission_percent: number;
    commission_cents: number;
    sale_created_at: string;
  }[];
}) {
  return (
    <>
      <ul className="grid gap-2 p-4 sm:hidden">
        {rows.map((r) => (
          <li
            key={r.item_id}
            className="rounded-lg border border-[var(--color-border-secondary)] p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="grid gap-0.5 min-w-0">
                <span className="text-text-sm font-medium text-[var(--color-text-primary)] truncate">
                  {r.description}
                </span>
                <span className="text-text-xs text-[var(--color-text-tertiary)]">
                  {formatDateTimeBR(r.sale_created_at)}
                </span>
              </div>
              <div className="grid gap-0.5 text-right">
                <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Comissão
                </span>
                <span className="text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
                  {formatMoney(r.commission_cents)}
                </span>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-[var(--color-border-secondary)] pt-2 text-text-xs tabular-nums text-[var(--color-text-tertiary)]">
              <span>Qtd: {r.quantity}</span>
              <span>{formatMoney(r.total_cents)}</span>
              <span>{Number(r.commission_percent).toFixed(1)}%</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)]/40 text-left text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
              <th className="px-4 py-2.5 font-semibold">Data</th>
              <th className="px-4 py-2.5 font-semibold">Descrição</th>
              <th className="px-4 py-2.5 text-right font-semibold">Qtd</th>
              <th className="px-4 py-2.5 text-right font-semibold">Valor</th>
              <th className="px-4 py-2.5 text-right font-semibold">%</th>
              <th className="px-4 py-2.5 text-right font-semibold">Comissão</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.item_id}
                className="border-b border-[var(--color-border-secondary)] last:border-b-0"
              >
                <td className="px-4 py-3 text-[var(--color-text-tertiary)]">
                  {formatDateTimeBR(r.sale_created_at)}
                </td>
                <td className="px-4 py-3 text-[var(--color-text-primary)]">
                  {r.description}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-[var(--color-text-secondary)]">
                  {r.quantity}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-[var(--color-text-secondary)]">
                  {formatMoney(r.total_cents)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-[var(--color-text-tertiary)]">
                  {Number(r.commission_percent).toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-semibold text-[var(--color-text-primary)]">
                  {formatMoney(r.commission_cents)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Stat({
  label,
  value,
  hint,
  highlight,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div className="grid gap-1">
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
      {hint && (
        <span className="text-text-xs text-[var(--color-text-tertiary)]">
          {hint}
        </span>
      )}
    </div>
  );
}

