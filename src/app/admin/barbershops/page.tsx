import Link from "next/link";
import {
  ArrowSquareOutIcon,
  PencilSimpleIcon,
  PlusIcon,
  SignInIcon,
  StorefrontIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { createClient } from "@/lib/supabase/server";
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
import { formatDateBR } from "@/lib/format";
import { enterBarbershopAction } from "./actions";

const STATUS_LABEL: Record<string, string> = {
  trial: "Trial",
  active: "Ativa",
  suspended: "Suspensa",
  cancelled: "Cancelada",
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  trial: "secondary",
  active: "default",
  suspended: "outline",
  cancelled: "destructive",
};

export default async function BarbershopsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("barbershops")
    .select("id, slug, name, status, trial_ends_at, created_at")
    .order("created_at", { ascending: false });

  const items = data ?? [];

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Barbearias
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Gerencie todas as barbearias da plataforma.
          </p>
        </div>
        <Link
          href="/admin/barbershops/new"
          className={buttonVariants({ size: "lg", className: "h-11 w-full sm:w-auto" })}
        >
          <PlusIcon size={28} weight="duotone" />
          Nova barbearia
        </Link>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          <WarningCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
          <span>Erro ao carregar: {error.message}</span>
        </div>
      )}

      {items.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]">
            <StorefrontIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-1">
            <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Nenhuma barbearia cadastrada
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Crie a primeira barbearia para começar.
            </p>
          </div>
          <Link
            href="/admin/barbershops/new"
            className={buttonVariants({ variant: "outline", className: "h-11" })}
          >
            <PlusIcon size={28} weight="duotone" />
            Nova barbearia
          </Link>
        </Card>
      ) : (
        <>
          <ul className="grid gap-3 sm:hidden">
            {items.map((b) => (
              <li key={b.id}>
                <Card className="p-4">
                  <Link href={`/admin/barbershops/${b.id}`} className="flex items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                      <StorefrontIcon size={28} weight="duotone" />
                    </div>
                    <div className="grid flex-1 gap-1 min-w-0">
                      <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                        {b.name}
                      </span>
                      <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                        {b.slug}
                      </span>
                      <Badge
                        variant={STATUS_VARIANT[b.status] ?? "outline"}
                        className="w-fit"
                      >
                        {STATUS_LABEL[b.status] ?? b.status}
                      </Badge>
                    </div>
                  </Link>
                  <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[var(--color-border-secondary)] pt-3 text-text-xs">
                    <div className="grid gap-0.5">
                      <span className="uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Trial até
                      </span>
                      <span className="text-[var(--color-text-secondary)]">
                        {b.trial_ends_at ? formatDateBR(b.trial_ends_at) : "—"}
                      </span>
                    </div>
                    <div className="grid gap-0.5">
                      <span className="uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Criada em
                      </span>
                      <span className="text-[var(--color-text-secondary)]">
                        {formatDateBR(b.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-[var(--color-border-secondary)] pt-3">
                    <form action={enterBarbershopAction.bind(null, b.id)}>
                      <button
                        type="submit"
                        title="Entrar no painel"
                        aria-label="Entrar no painel"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        <SignInIcon size={20} weight="duotone" />
                        Entrar
                      </button>
                    </form>
                    <Link
                      href={`/${b.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Ver página pública"
                      aria-label="Ver página pública"
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      <ArrowSquareOutIcon size={20} weight="duotone" />
                      Pública
                    </Link>
                    <Link
                      href={`/admin/barbershops/${b.id}`}
                      title="Editar"
                      aria-label="Editar"
                      className={buttonVariants({ variant: "outline", size: "sm" })}
                    >
                      <PencilSimpleIcon size={20} weight="duotone" />
                      Editar
                    </Link>
                  </div>
                </Card>
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
                  Status
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Trial até
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Criada em
                </TableHead>
                <TableHead className="px-6 pr-6 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
                        <StorefrontIcon size={28} weight="duotone" />
                      </div>
                      <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                        {b.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4 font-mono text-text-xs text-[var(--color-text-tertiary)]">
                    {b.slug}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Badge variant={STATUS_VARIANT[b.status] ?? "outline"}>
                      {STATUS_LABEL[b.status] ?? b.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                    {b.trial_ends_at ? formatDateBR(b.trial_ends_at) : "—"}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                    {formatDateBR(b.created_at)}
                  </TableCell>
                  <TableCell className="px-4 py-4 pr-6 text-right">
                    <div className="inline-flex items-center gap-1">
                      <form action={enterBarbershopAction.bind(null, b.id)}>
                        <button
                          type="submit"
                          title="Entrar no painel"
                          aria-label="Entrar no painel"
                          className={buttonVariants({ variant: "ghost", size: "sm" })}
                        >
                          <SignInIcon size={20} weight="duotone" />
                        </button>
                      </form>
                      <Link
                        href={`/${b.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Ver página pública"
                        aria-label="Ver página pública"
                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                      >
                        <ArrowSquareOutIcon size={20} weight="duotone" />
                      </Link>
                      <Link
                        href={`/admin/barbershops/${b.id}`}
                        title="Editar"
                        aria-label="Editar"
                        className={buttonVariants({ variant: "ghost", size: "sm" })}
                      >
                        <PencilSimpleIcon size={20} weight="duotone" />
                      </Link>
                    </div>
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
