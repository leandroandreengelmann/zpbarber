import Link from "next/link";
import {
  CaretRightIcon,
  CashRegisterIcon,
  EyeIcon,
  ReceiptIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { formatDateTimeBR, formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

type StatusFilter = "all" | "open" | "closed";

type SessionRow = {
  id: string;
  status: "open" | "closed";
  opened_at: string;
  closed_at: string | null;
  opening_amount_cents: number;
  closing_amount_cents: number | null;
  expected_amount_cents: number | null;
  difference_cents: number | null;
  opened_by: { full_name: string | null } | null;
  closed_by: { full_name: string | null } | null;
};

const STATUS_BADGE: Record<
  "open" | "closed",
  { label: string; className: string }
> = {
  open: {
    label: "Aberta",
    className:
      "bg-[var(--color-warning-50)] text-[var(--color-warning-700)] border border-[var(--color-warning-200)]",
  },
  closed: {
    label: "Fechada",
    className:
      "bg-[var(--color-success-50)] text-[var(--color-success-700)] border border-[var(--color-success-200)]",
  },
};

const PRESETS = [
  { key: "today", label: "Hoje" },
  { key: "7d", label: "7 dias" },
  { key: "30d", label: "30 dias" },
  { key: "all", label: "Tudo" },
] as const;
type PresetKey = (typeof PRESETS)[number]["key"];

function rangeFromPreset(preset: PresetKey): { from: string | null; to: string | null } {
  const now = new Date();
  if (preset === "all") return { from: null, to: null };
  const to = new Date(now);
  to.setHours(23, 59, 59, 999);
  const from = new Date(now);
  if (preset === "today") {
    from.setHours(0, 0, 0, 0);
  } else if (preset === "7d") {
    from.setDate(from.getDate() - 6);
    from.setHours(0, 0, 0, 0);
  } else {
    from.setDate(from.getDate() - 29);
    from.setHours(0, 0, 0, 0);
  }
  return { from: from.toISOString(), to: to.toISOString() };
}

function diffLabel(diff: number | null): {
  text: string;
  className: string;
} {
  if (diff === null)
    return {
      text: "—",
      className: "text-[var(--color-text-tertiary)]",
    };
  if (diff === 0)
    return {
      text: "Sem diferença",
      className: "text-[var(--color-text-tertiary)]",
    };
  if (diff > 0)
    return {
      text: `+ ${formatMoney(diff)}`,
      className: "text-[var(--color-success-700)]",
    };
  return {
    text: `− ${formatMoney(Math.abs(diff))}`,
    className: "text-[var(--color-error-700)]",
  };
}

export default async function RelatoriosCaixaPage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string; status?: string }>;
}) {
  const { membership } = await requireBarbershop();
  const role = membership.role;
  if (role === "barbeiro") {
    return (
      <div className="mx-auto w-full max-w-3xl">
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-text-md text-[var(--color-text-tertiary)]">
              Apenas gestor e recepcionista podem visualizar relatórios de caixa.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sp = await searchParams;
  const preset = (PRESETS.some((p) => p.key === sp.preset)
    ? sp.preset
    : "30d") as PresetKey;
  const status = (["all", "open", "closed"].includes(sp.status ?? "")
    ? (sp.status as StatusFilter)
    : "all") as StatusFilter;

  const shopId = membership.barbershop!.id;
  const supabase = await createClient();
  const { from, to } = rangeFromPreset(preset);

  let query = supabase
    .from("cash_sessions")
    .select(
      "id, status, opened_at, closed_at, opening_amount_cents, closing_amount_cents, expected_amount_cents, difference_cents, opened_by:profiles!cash_sessions_opened_by_fkey(full_name), closed_by:profiles!cash_sessions_closed_by_fkey(full_name)"
    )
    .eq("barbershop_id", shopId)
    .order("opened_at", { ascending: false })
    .limit(200);
  if (from) query = query.gte("opened_at", from);
  if (to) query = query.lte("opened_at", to);
  if (status !== "all") query = query.eq("status", status);

  const { data: rawRows } = await query;
  const rows = (rawRows ?? []) as unknown as SessionRow[];

  const totalCount = rows.length;
  const openCount = rows.filter((r) => r.status === "open").length;
  const closedCount = totalCount - openCount;
  const totalDifference = rows.reduce(
    (s, r) => s + (r.difference_cents ?? 0),
    0
  );

  function buildHref(next: { preset?: PresetKey; status?: StatusFilter }) {
    const params = new URLSearchParams();
    params.set("preset", next.preset ?? preset);
    params.set("status", next.status ?? status);
    return `/app/caixa/relatorios?${params.toString()}`;
  }

  return (
    <div className="mx-auto w-full grid max-w-6xl gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Relatório de caixas
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Histórico de sessões abertas e fechadas da empresa.
          </p>
        </div>
        <Link
          href="/app/caixa"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "h-11 w-full sm:w-auto",
          })}
        >
          <CashRegisterIcon size={28} weight="duotone" />
          Caixa atual
        </Link>
      </div>

      <Card>
        <CardContent className="grid gap-4 p-4 sm:gap-6 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="tablist"
              className="inline-flex flex-wrap rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-1"
            >
              {PRESETS.map((p) => (
                <Link
                  key={p.key}
                  href={buildHref({ preset: p.key })}
                  role="tab"
                  aria-selected={preset === p.key}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-text-sm font-medium transition-colors",
                    preset === p.key
                      ? "bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-sm"
                      : "text-[var(--color-text-tertiary)]"
                  )}
                >
                  {p.label}
                </Link>
              ))}
            </div>
            <div
              role="tablist"
              className="inline-flex flex-wrap rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-1"
            >
              {([
                { key: "all", label: "Todas" },
                { key: "open", label: "Abertas" },
                { key: "closed", label: "Fechadas" },
              ] as const).map((s) => (
                <Link
                  key={s.key}
                  href={buildHref({ status: s.key })}
                  role="tab"
                  aria-selected={status === s.key}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-text-sm font-medium transition-colors",
                    status === s.key
                      ? "bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-sm"
                      : "text-[var(--color-text-tertiary)]"
                  )}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-[var(--color-border-secondary)] pt-4 sm:pt-6 lg:grid-cols-4">
            <KPI label="Sessões" value={String(totalCount)} />
            <KPI label="Abertas" value={String(openCount)} />
            <KPI label="Fechadas" value={String(closedCount)} />
            <KPI
              label="Soma das diferenças"
              value={
                totalDifference === 0
                  ? formatMoney(0)
                  : totalDifference > 0
                    ? `+ ${formatMoney(totalDifference)}`
                    : `− ${formatMoney(Math.abs(totalDifference))}`
              }
              tone={
                totalDifference === 0
                  ? "muted"
                  : totalDifference > 0
                    ? "success"
                    : "error"
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="p-0">
        <div className="flex items-center justify-between border-b border-[var(--color-border-secondary)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2">
            <ReceiptIcon
              size={28}
              weight="duotone"
              className="text-[var(--color-fg-secondary)]"
            />
            <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Sessões
            </h2>
            <span className="text-text-sm text-[var(--color-text-tertiary)]">
              {totalCount}
            </span>
          </div>
        </div>
        <CardContent className="p-0">
          {totalCount === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                <ReceiptIcon size={28} weight="duotone" />
              </div>
              <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Nenhuma sessão no período
              </p>
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Ajuste os filtros para ampliar a busca.
              </p>
            </div>
          ) : (
            <>
              <ul className="grid gap-3 p-4 sm:hidden">
                {rows.map((r) => {
                  const badge = STATUS_BADGE[r.status];
                  const dl = diffLabel(r.difference_cents);
                  return (
                    <li key={r.id}>
                      <Link
                        href={`/app/caixa/relatorios/${r.id}`}
                        aria-label={`Abrir relatório de ${formatDateTimeBR(r.opened_at)}`}
                        className="group block rounded-xl ring-1 ring-[var(--color-border-secondary)] bg-card p-4 transition-colors hover:bg-[var(--color-bg-secondary)] active:bg-[var(--color-bg-tertiary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue-500)]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="grid gap-0.5 min-w-0">
                            <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                              {formatDateTimeBR(r.opened_at)}
                            </span>
                            <span className="truncate text-text-xs text-[var(--color-text-tertiary)]">
                              Aberto por {r.opened_by?.full_name ?? "—"}
                            </span>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-text-xs font-medium ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                            <CaretRightIcon
                              size={20}
                              weight="bold"
                              className="text-[var(--color-fg-quaternary)] transition-transform group-active:translate-x-0.5"
                            />
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--color-border-secondary)] pt-3 text-text-xs">
                          <span className="text-[var(--color-text-tertiary)]">
                            Contado
                          </span>
                          <span className="text-right tabular-nums text-[var(--color-text-primary)]">
                            {r.closing_amount_cents !== null
                              ? formatMoney(r.closing_amount_cents)
                              : "—"}
                          </span>
                          <span className="text-[var(--color-text-tertiary)]">
                            Diferença
                          </span>
                          <span
                            className={`text-right tabular-nums ${dl.className}`}
                          >
                            {dl.text}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-end border-t border-[var(--color-border-secondary)] pt-3">
                          <span className="inline-flex items-center gap-1 text-text-xs font-medium text-[var(--color-blue-700)]">
                            <EyeIcon size={16} weight="duotone" />
                            Ver detalhes
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full min-w-[860px]">
                  <thead>
                    <tr className="bg-[var(--color-bg-secondary)] text-left">
                      <Th>Abertura</Th>
                      <Th>Fechamento</Th>
                      <Th>Status</Th>
                      <Th>Aberto por</Th>
                      <Th>Fechado por</Th>
                      <Th align="right">Esperado</Th>
                      <Th align="right">Contado</Th>
                      <Th align="right">Diferença</Th>
                      <Th align="right">Ação</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-secondary)]">
                    {rows.map((r) => {
                      const badge = STATUS_BADGE[r.status];
                      const dl = diffLabel(r.difference_cents);
                      return (
                        <tr key={r.id}>
                          <td className="px-6 py-4 text-text-sm tabular-nums text-[var(--color-text-primary)]">
                            {formatDateTimeBR(r.opened_at)}
                          </td>
                          <td className="px-6 py-4 text-text-sm tabular-nums text-[var(--color-text-tertiary)]">
                            {r.closed_at ? formatDateTimeBR(r.closed_at) : "—"}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-text-xs font-medium ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                            {r.opened_by?.full_name ?? "—"}
                          </td>
                          <td className="px-6 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                            {r.closed_by?.full_name ?? "—"}
                          </td>
                          <td className="px-6 py-4 text-right text-text-sm tabular-nums text-[var(--color-text-tertiary)]">
                            {r.expected_amount_cents !== null
                              ? formatMoney(r.expected_amount_cents)
                              : "—"}
                          </td>
                          <td className="px-6 py-4 text-right text-text-sm tabular-nums text-[var(--color-text-primary)]">
                            {r.closing_amount_cents !== null
                              ? formatMoney(r.closing_amount_cents)
                              : "—"}
                          </td>
                          <td
                            className={`px-6 py-4 text-right text-text-sm font-semibold tabular-nums ${dl.className}`}
                          >
                            {dl.text}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/app/caixa/relatorios/${r.id}`}
                              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-text-sm font-medium text-[var(--color-blue-700)] hover:bg-[var(--color-blue-50)]"
                            >
                              <EyeIcon size={20} weight="duotone" />
                              Ver
                            </Link>
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

function Th({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={cn(
        "px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]",
        align === "right" ? "text-right" : "text-left"
      )}
    >
      {children}
    </th>
  );
}

function KPI({
  label,
  value,
  tone = "muted",
}: {
  label: string;
  value: string;
  tone?: "muted" | "success" | "error";
}) {
  const valueClass =
    tone === "success"
      ? "text-[var(--color-success-700)]"
      : tone === "error"
        ? "text-[var(--color-error-700)]"
        : "text-[var(--color-text-primary)]";
  return (
    <div className="grid gap-1 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3 sm:p-4">
      <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
        {label}
      </span>
      <span
        className={`text-text-xl font-semibold tabular-nums sm:text-display-xs ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

