import Link from "next/link";
import {
  MegaphoneIcon,
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
import { formatDateTimeBR } from "@/lib/format";

const STATUS_LABEL: Record<string, string> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Arquivado",
};

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  draft: "secondary",
  published: "default",
  archived: "outline",
};

const SEVERITY_LABEL: Record<string, string> = {
  info: "Info",
  success: "Sucesso",
  warning: "Atenção",
  critical: "Crítico",
};

const SEVERITY_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  info: "secondary",
  success: "default",
  warning: "outline",
  critical: "destructive",
};

export default async function AdminAnnouncementsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("announcements")
    .select(
      "id, title, severity, status, audience, audience_shop_ids, published_at, expires_at, created_at"
    )
    .order("created_at", { ascending: false });

  const items = data ?? [];

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Comunicados
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Avisos publicados para gestores das barbearias.
          </p>
        </div>
        <Link
          href="/admin/announcements/new"
          className={buttonVariants({ size: "lg", className: "h-11 w-full sm:w-auto" })}
        >
          <PlusIcon size={28} weight="duotone" />
          Novo comunicado
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
            <MegaphoneIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-1">
            <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Nenhum comunicado
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Crie o primeiro para avisar os gestores.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <ul className="grid gap-3 sm:hidden">
            {items.map((a) => (
              <li key={a.id}>
                <Link href={`/admin/announcements/${a.id}`} className="block">
                  <Card className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-text-md font-semibold text-[var(--color-text-primary)] min-w-0 break-words">
                        {a.title}
                      </span>
                      <Badge
                        variant={STATUS_VARIANT[a.status] ?? "outline"}
                        className="shrink-0"
                      >
                        {STATUS_LABEL[a.status] ?? a.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant={SEVERITY_VARIANT[a.severity] ?? "outline"}>
                        {SEVERITY_LABEL[a.severity] ?? a.severity}
                      </Badge>
                      <span className="text-text-xs text-[var(--color-text-tertiary)]">
                        {a.audience === "all"
                          ? "Todas as barbearias"
                          : `${a.audience_shop_ids.length} selecionada(s)`}
                      </span>
                    </div>
                    <div className="mt-3 border-t border-[var(--color-border-secondary)] pt-3 text-text-xs text-[var(--color-text-tertiary)]">
                      Publicado:{" "}
                      {a.published_at ? formatDateTimeBR(a.published_at) : "—"}
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
                  Título
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Status
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Tipo
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Audiência
                </TableHead>
                <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Publicado
                </TableHead>
                <TableHead className="px-6 pr-6 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="px-6 py-4">
                    <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                      {a.title}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Badge variant={STATUS_VARIANT[a.status] ?? "outline"}>
                      {STATUS_LABEL[a.status] ?? a.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Badge variant={SEVERITY_VARIANT[a.severity] ?? "outline"}>
                      {SEVERITY_LABEL[a.severity] ?? a.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                    {a.audience === "all"
                      ? "Todas"
                      : `${a.audience_shop_ids.length} selecionada(s)`}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-text-sm text-[var(--color-text-tertiary)]">
                    {a.published_at ? formatDateTimeBR(a.published_at) : "—"}
                  </TableCell>
                  <TableCell className="px-4 py-4 pr-6 text-right">
                    <Link
                      href={`/admin/announcements/${a.id}`}
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
