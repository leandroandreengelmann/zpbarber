import {
  CaretRightIcon,
  PercentIcon,
  UserSwitchIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { Forbidden } from "@/app/app/_components/forbidden";
import { formatDateBR, formatMoney } from "@/lib/format";
import { resolvePeriod } from "./_lib/period";
import { PeriodFilter } from "./_components/period-filter";

type SearchParams = Promise<{ from?: string; to?: string; preset?: string }>;

export default async function ComissoesListPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { membership } = await requireBarbershop();
  if (!can(membership, "comissoes.ver")) return <Forbidden title="Comissões" />;

  const sp = await searchParams;
  const period = resolvePeriod(sp);
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const { data: members } = await supabase
    .from("barbershop_members")
    .select("user:profiles(id, full_name)")
    .eq("barbershop_id", shopId)
    .eq("is_active", true)
    .eq("is_commissioned", true)
    .eq("atende_clientes", true);

  const barbers = (members ?? [])
    .map((m) => m.user)
    .filter((u): u is { id: string; full_name: string | null } => Boolean(u?.id));

  const summaries = await Promise.all(
    barbers.map(async (b) => {
      const { data, error } = await supabase.rpc("fn_commission_summary", {
        p_barbershop_id: shopId,
        p_barber_id: b.id,
        p_from: period.fromIso,
        p_to: period.toIso,
      });
      if (error) {
        return {
          barber_id: b.id,
          name: b.full_name ?? "—",
          items: 0,
          grossCents: 0,
          commissionCents: 0,
        };
      }
      const items = data ?? [];
      const grossCents = items.reduce((s, it) => s + (it.total_cents ?? 0), 0);
      const commissionCents = items.reduce(
        (s, it) => s + (it.commission_cents ?? 0),
        0
      );
      return {
        barber_id: b.id,
        name: b.full_name ?? "—",
        items: items.length,
        grossCents,
        commissionCents,
      };
    })
  );

  const rows = summaries.sort((a, b) => b.commissionCents - a.commissionCents);
  const totalCommission = rows.reduce((s, r) => s + r.commissionCents, 0);
  const totalItems = rows.reduce((s, r) => s + r.items, 0);
  const totalGross = rows.reduce((s, r) => s + r.grossCents, 0);

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Comissões
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Mostra o que está pendente no período. Períodos já fechados (com
          pagamento registrado) ficam fora do cálculo.
        </p>
      </div>

      <Card className="p-0">
        <PeriodFilter
          basePath="/app/comissoes"
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
            label="Itens comissionáveis"
            value={totalItems.toLocaleString("pt-BR")}
            hint={`${formatMoney(totalGross)} em vendas`}
          />
          <Stat
            label="Comissão pendente"
            value={formatMoney(totalCommission)}
            highlight
          />
        </div>

        <CardContent className="p-0">
          {rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                <PercentIcon size={28} weight="duotone" />
              </div>
              <div className="grid gap-1">
                <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Nenhum barbeiro comissionado encontrado.
                </p>
                <p className="text-text-sm text-[var(--color-text-tertiary)]">
                  Marque &quot;Recebe comissão&quot; no perfil dos barbeiros
                  que devem aparecer aqui.
                </p>
              </div>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-[var(--color-border-secondary)] sm:hidden">
                {rows.map((r) => {
                  const detailHref = `/app/comissoes/${r.barber_id}?preset=${period.active === "custom" ? "this-month" : period.active}${period.active === "custom" ? `&from=${period.from}&to=${period.to}` : ""}`;
                  return (
                    <li key={r.barber_id}>
                      <Link
                        href={detailHref}
                        className="grid gap-2 px-4 py-4 hover:bg-[var(--color-bg-secondary)]/30"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-2 font-medium text-[var(--color-text-primary)]">
                            <UserSwitchIcon size={20} weight="duotone" className="text-[var(--color-fg-quaternary)]" />
                            {r.name}
                          </div>
                          <span className="text-text-md font-semibold tabular-nums text-[var(--color-blue-700)]">
                            {formatMoney(r.commissionCents)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-text-xs text-[var(--color-text-tertiary)]">
                          <span>{r.items.toLocaleString("pt-BR")} itens</span>
                          <span>· {formatMoney(r.grossCents)} fat.</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full text-text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)]/40 text-left text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      <th className="px-6 py-3 font-semibold">Barbeiro</th>
                      <th className="px-6 py-3 text-right font-semibold">Itens</th>
                      <th className="px-6 py-3 text-right font-semibold">Faturamento</th>
                      <th className="px-6 py-3 text-right font-semibold">Pendente</th>
                      <th className="px-6 py-3 text-right font-semibold sr-only">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr
                        key={r.barber_id}
                        className="border-b border-[var(--color-border-secondary)] last:border-b-0 hover:bg-[var(--color-bg-secondary)]/30"
                      >
                        <td className="px-6 py-4">
                          <Link
                            href={`/app/comissoes/${r.barber_id}?preset=${period.active === "custom" ? "this-month" : period.active}${period.active === "custom" ? `&from=${period.from}&to=${period.to}` : ""}`}
                            className="inline-flex items-center gap-2 font-medium text-[var(--color-text-primary)] hover:text-[var(--color-blue-700)]"
                          >
                            <UserSwitchIcon
                              size={20}
                              weight="duotone"
                              className="text-[var(--color-fg-quaternary)]"
                            />
                            {r.name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums text-[var(--color-text-secondary)]">
                          {r.items.toLocaleString("pt-BR")}
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums text-[var(--color-text-secondary)]">
                          {formatMoney(r.grossCents)}
                        </td>
                        <td className="px-6 py-4 text-right tabular-nums font-semibold text-[var(--color-text-primary)]">
                          {formatMoney(r.commissionCents)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/app/comissoes/${r.barber_id}?preset=${period.active === "custom" ? "this-month" : period.active}${period.active === "custom" ? `&from=${period.from}&to=${period.to}` : ""}`}
                            className="inline-flex items-center gap-1 text-text-sm font-medium text-[var(--color-blue-700)] hover:underline"
                          >
                            Ver detalhes
                            <CaretRightIcon size={16} weight="bold" />
                          </Link>
                        </td>
                      </tr>
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
