import Link from "next/link";
import {
  CreditCardIcon,
  PencilSimpleIcon,
  PlusIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
import { formatMoney } from "@/lib/format";

const CYCLE_LABEL: Record<string, string> = {
  monthly: "Mensal",
  quarterly: "Trimestral",
  yearly: "Anual",
};

export default async function AdminPlansPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("plans")
    .select(
      "id, slug, name, price_cents, billing_cycle, trial_days, is_active, sort_order, created_at"
    )
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const items = data ?? [];

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Planos
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Catálogo de planos vendidos para as barbearias.
          </p>
        </div>
        <Link
          href="/admin/plans/new"
          className={buttonVariants({ size: "lg", className: "h-11 w-full sm:w-auto" })}
        >
          <PlusIcon size={28} weight="duotone" />
          Novo plano
        </Link>
      </div>

      {error && (
        <div className="rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          Erro ao carregar: {error.message}
        </div>
      )}

      {items.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]">
            <CreditCardIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-1">
            <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Nenhum plano cadastrado
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Crie o primeiro plano para começar a vincular barbearias.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <ul className="grid gap-3 sm:hidden">
            {items.map((p) => (
              <li key={p.id}>
                <Link href={`/admin/plans/${p.id}`} className="block">
                  <Card className={`p-4 ${!p.is_active ? "opacity-70" : ""}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid gap-0.5 min-w-0">
                        <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                          {p.name}
                        </span>
                        <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                          {p.slug}
                        </span>
                      </div>
                      <Badge
                        variant={p.is_active ? "default" : "outline"}
                        className="shrink-0"
                      >
                        {p.is_active ? "Ativo" : "Arquivado"}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-end justify-between gap-3 border-t border-[var(--color-border-secondary)] pt-3">
                      <div className="grid gap-0.5">
                        <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Preço
                        </span>
                        <span className="text-text-xl font-semibold tabular-nums text-[var(--color-text-primary)]">
                          {formatMoney(p.price_cents)}
                        </span>
                      </div>
                      <div className="grid gap-0.5 text-right text-text-xs text-[var(--color-text-tertiary)]">
                        <span>{CYCLE_LABEL[p.billing_cycle] ?? p.billing_cycle}</span>
                        <span>
                          Trial: {p.trial_days > 0 ? `${p.trial_days} dias` : "—"}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
          <Card className="hidden overflow-hidden p-0 sm:block">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Nome
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Slug
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Preço
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Ciclo
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Trial
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Status
                </TableHead>
                <TableHead className="px-6 pr-6 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="px-6 py-4 text-text-sm font-medium text-[var(--color-text-primary)]">
                    {p.name}
                  </TableCell>
                  <TableCell className="px-4 py-4 font-mono text-text-xs text-[var(--color-text-tertiary)]">
                    {p.slug}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-text-sm tabular-nums text-[var(--color-text-primary)]">
                    {formatMoney(p.price_cents)}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                    {CYCLE_LABEL[p.billing_cycle] ?? p.billing_cycle}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                    {p.trial_days > 0 ? `${p.trial_days} dias` : "—"}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Badge variant={p.is_active ? "default" : "outline"}>
                      {p.is_active ? "Ativo" : "Arquivado"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 pr-6 text-right">
                    <Link
                      href={`/admin/plans/${p.id}`}
                      className={buttonVariants({ variant: "ghost", size: "sm" })}
                    >
                      <PencilSimpleIcon size={28} weight="duotone" />
                      Editar
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Card>
        </>
      )}
    </div>
  );
}
