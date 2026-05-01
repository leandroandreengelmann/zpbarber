import Link from "next/link";
import {
  CaretRightIcon,
  StorefrontIcon,
  UsersThreeIcon,
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
import { formatDateTimeBR, formatMoney } from "@/lib/format";
import { formatPhoneBR } from "@/lib/phone";
import { ClientsFilters } from "./_components/filters";
import { ClientsPager } from "./_components/pager";

const PAGE_SIZE = 50;

type ClientItem = {
  client_key: string;
  user_id: string | null;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  avatar_url: string | null;
  has_account: boolean;
  shops_count: number;
  appointments_count: number;
  last_appointment_at: string | null;
  last_shop_name: string | null;
  total_spent_cents: number;
  created_by_shop_id: string | null;
  created_by_shop_name: string | null;
  created_at: string | null;
};

type ListResponse = {
  total: number;
  items: ClientItem[];
};

export default async function AdminClientsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const search = typeof sp.q === "string" ? sp.q : "";
  const shopId = typeof sp.shop === "string" && sp.shop ? sp.shop : null;
  const status = typeof sp.status === "string" && sp.status ? sp.status : null;
  const sort = typeof sp.sort === "string" && sp.sort ? sp.sort : "recent";
  const page = Math.max(1, Number(sp.page ?? 1) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const supabase = await createClient();
  const [listRes, shopsRes] = await Promise.all([
    supabase.rpc("fn_admin_list_clients", {
      p_search: search || null,
      p_shop_id: shopId,
      p_status: status,
      p_sort: sort,
      p_offset: offset,
      p_limit: PAGE_SIZE,
    }),
    supabase.from("barbershops").select("id, name").order("name"),
  ]);

  const data = (listRes.data as unknown as ListResponse | null) ?? {
    total: 0,
    items: [],
  };
  const items = data.items ?? [];
  const total = data.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const shops = shopsRes.data ?? [];

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Clientes
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Visão consolidada de todos os clientes da plataforma.
        </p>
      </div>

      <ClientsFilters
        shops={shops}
        defaultValues={{
          q: search,
          shop: shopId ?? "",
          status: status ?? "",
          sort,
        }}
      />

      {listRes.error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          <WarningCircleIcon size={20} weight="duotone" className="mt-0.5 shrink-0" />
          <span>Erro ao carregar: {listRes.error.message}</span>
        </div>
      )}

      {items.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
            <UsersThreeIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-1">
            <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Nenhum cliente encontrado
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Ajuste os filtros para tentar novamente.
            </p>
          </div>
        </Card>
      ) : (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cadastrado por</TableHead>
                  <TableHead className="text-right">Barbearias</TableHead>
                  <TableHead className="text-right">Atendimentos</TableHead>
                  <TableHead>Último atendimento</TableHead>
                  <TableHead className="text-right">Total gasto</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((c) => (
                  <TableRow key={c.client_key}>
                    <TableCell className="max-w-[260px]">
                      <Link
                        href={`/admin/clientes/${encodeURIComponent(c.client_key)}`}
                        className="grid gap-0.5 hover:opacity-80"
                      >
                        <span className="truncate text-text-sm font-semibold text-[var(--color-text-primary)]">
                          {c.full_name ?? "Sem nome"}
                        </span>
                        {c.email && (
                          <span className="truncate text-text-xs text-[var(--color-text-tertiary)]">
                            {c.email}
                          </span>
                        )}
                      </Link>
                    </TableCell>
                    <TableCell className="text-text-sm tabular-nums text-[var(--color-text-secondary)]">
                      {c.phone ? formatPhoneBR(c.phone) : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={c.has_account ? "default" : "outline"}>
                        {c.has_account ? "Com conta" : "Sem conta"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-text-sm text-[var(--color-text-secondary)]">
                      {c.created_by_shop_name ? (
                        <div className="inline-flex items-center gap-1.5">
                          <StorefrontIcon
                            size={14}
                            weight="duotone"
                            className="text-[var(--color-fg-quaternary)]"
                          />
                          <span className="truncate">{c.created_by_shop_name}</span>
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      <div className="inline-flex items-center gap-1.5 text-text-sm text-[var(--color-text-secondary)]">
                        <StorefrontIcon
                          size={16}
                          weight="duotone"
                          className="text-[var(--color-fg-quaternary)]"
                        />
                        {c.shops_count}
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-text-sm text-[var(--color-text-secondary)]">
                      {c.appointments_count}
                    </TableCell>
                    <TableCell className="text-text-sm text-[var(--color-text-secondary)]">
                      {c.last_appointment_at ? (
                        <div className="grid gap-0.5">
                          <span className="tabular-nums">
                            {formatDateTimeBR(c.last_appointment_at)}
                          </span>
                          {c.last_shop_name && (
                            <span className="truncate text-text-xs text-[var(--color-text-tertiary)]">
                              {c.last_shop_name}
                            </span>
                          )}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-text-sm font-semibold text-[var(--color-text-primary)]">
                      {formatMoney(c.total_spent_cents)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/clientes/${encodeURIComponent(c.client_key)}`}
                        className="inline-flex items-center text-[var(--color-fg-quaternary)] hover:text-[var(--color-fg-secondary)]"
                      >
                        <CaretRightIcon size={20} weight="bold" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {totalPages > 1 && (
        <ClientsPager page={page} totalPages={totalPages} total={total} />
      )}
    </div>
  );
}
