import Link from "next/link";
import {
  PackageIcon,
  PencilSimpleIcon,
  PlusIcon,
  WarningIcon,
} from "@phosphor-icons/react/dist/ssr";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatMoney } from "@/lib/format";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";

export default async function ProductsPage() {
  const { membership } = await requireBarbershop();
  const isManager = can(membership, "produtos.gerenciar");
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("id, name, sku, price_cents, stock_qty, stock_min, is_active")
    .order("name");

  const items = data ?? [];

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Produtos
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Controle de catálogo e estoque básico.
          </p>
        </div>
        {isManager && (
          <Link
            href="/app/produtos/new"
            className={buttonVariants({ size: "lg", className: "h-11 w-full sm:w-auto" })}
          >
            <PlusIcon size={28} weight="duotone" />
            Novo produto
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]">
            <PackageIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-1">
            <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Nenhum produto cadastrado
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Cadastre pomadas, óleos e acessórios para revenda.
            </p>
          </div>
          {isManager && (
            <Link
              href="/app/produtos/new"
              className={buttonVariants({ variant: "outline", className: "h-11" })}
            >
              <PlusIcon size={28} weight="duotone" />
              Novo produto
            </Link>
          )}
        </Card>
      ) : (
        <>
          <ul className="grid gap-3 sm:hidden">
            {items.map((p) => {
              const low = p.stock_qty <= p.stock_min;
              return (
                <li key={p.id}>
                  <Card className={`p-4 ${!p.is_active ? "opacity-70" : ""}`}>
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                        <PackageIcon size={28} weight="duotone" />
                      </div>
                      <div className="grid flex-1 gap-1 min-w-0">
                        <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                          {p.name}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={p.is_active ? "default" : "outline"}>
                            {p.is_active ? "Ativo" : "Inativo"}
                          </Badge>
                          {p.sku && (
                            <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                              {p.sku}
                            </span>
                          )}
                        </div>
                      </div>
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
                      <div className="grid gap-0.5 text-right">
                        <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                          Estoque
                        </span>
                        <span
                          className={`inline-flex items-center justify-end gap-1.5 text-text-md font-semibold tabular-nums ${
                            low
                              ? "text-[var(--color-text-error-primary)]"
                              : "text-[var(--color-text-primary)]"
                          }`}
                        >
                          {low && <WarningIcon size={20} weight="duotone" />}
                          {p.stock_qty}
                          {low && (
                            <Badge variant="destructive">Baixo</Badge>
                          )}
                        </span>
                      </div>
                    </div>
                    {isManager && (
                      <Link
                        href={`/app/produtos/${p.id}`}
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                          className: "mt-3 h-10 w-full justify-center",
                        })}
                      >
                        <PencilSimpleIcon size={28} weight="duotone" />
                        Editar
                      </Link>
                    )}
                  </Card>
                </li>
              );
            })}
          </ul>
          <Card className="hidden overflow-hidden p-0 sm:block">
            <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Nome
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  SKU
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Preço
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Estoque
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Status
                </TableHead>
                {isManager && (
                  <TableHead className="px-6 pr-6 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Ações
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((p) => {
                const low = p.stock_qty <= p.stock_min;
                return (
                  <TableRow key={p.id}>
                    <TableCell className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
                          <PackageIcon size={28} weight="duotone" />
                        </div>
                        <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                          {p.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 font-mono text-text-xs text-[var(--color-text-tertiary)]">
                      {p.sku ?? "—"}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-text-sm font-medium text-[var(--color-text-primary)] tabular-nums">
                      {formatMoney(p.price_cents)}
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 text-text-sm tabular-nums ${
                          low
                            ? "font-medium text-[var(--color-text-error-primary)]"
                            : "text-[var(--color-text-tertiary)]"
                        }`}
                      >
                        {low && <WarningIcon size={28} weight="duotone" />}
                        {p.stock_qty}
                        {low && (
                          <Badge variant="destructive" className="ml-1">
                            Baixo
                          </Badge>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-4">
                      <Badge variant={p.is_active ? "default" : "outline"}>
                        {p.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    {isManager && (
                      <TableCell className="px-4 py-4 pr-6 text-right">
                        <Link
                          href={`/app/produtos/${p.id}`}
                          className={buttonVariants({ variant: "ghost", size: "sm" })}
                        >
                          <PencilSimpleIcon size={28} weight="duotone" />
                          Editar
                        </Link>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          </Card>
        </>
      )}
    </div>
  );
}
