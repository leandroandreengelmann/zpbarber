import {
  ShieldCheckIcon,
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
import { formatDateTimeBR } from "@/lib/format";
import { AuditFilters } from "./_components/filters";
import { AuditPager } from "./_components/pager";

const PAGE_SIZE = 50;

const ACTION_LABEL: Record<string, string> = {
  "cash_session.open": "Abrir caixa",
  "cash_session.close": "Fechar caixa",
  "sale.create": "Criar venda",
  "sale.cancel": "Cancelar venda",
  "barbershop.create": "Criar barbearia",
  "barbershop.status_change": "Alterar status",
  "membership.role_change": "Alterar acesso",
  "membership.remove": "Remover acesso",
  "announcement.create": "Criar comunicado",
  "announcement.update": "Editar comunicado",
  "announcement.publish": "Publicar comunicado",
  "announcement.archive": "Arquivar comunicado",
  "announcement.delete": "Excluir comunicado",
  "platform_settings.update": "Atualizar config",
  "plan.create": "Criar plano",
  "plan.update": "Editar plano",
  "plan.archive": "Arquivar plano",
  "subscription.create": "Assinar plano",
  "subscription.cancel": "Cancelar assinatura",
};

const ACTION_TONE: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  "cash_session.open": "secondary",
  "cash_session.close": "secondary",
  "sale.create": "default",
  "sale.cancel": "destructive",
  "barbershop.create": "default",
  "barbershop.status_change": "secondary",
  "membership.role_change": "secondary",
  "membership.remove": "destructive",
  "announcement.create": "secondary",
  "announcement.update": "secondary",
  "announcement.publish": "default",
  "announcement.archive": "outline",
  "announcement.delete": "destructive",
  "platform_settings.update": "secondary",
  "plan.create": "default",
  "plan.update": "secondary",
  "plan.archive": "outline",
  "subscription.create": "default",
  "subscription.cancel": "destructive",
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

export default async function AdminAuditPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return typeof v === "string" ? v : "";
  };

  const barbershopFilter = get("shop");
  const actionFilter = get("action");
  const period = get("period") || "30";
  const page = Math.max(1, Number(get("page") || "1") || 1);
  const fromIso = startOfPeriod(period);

  const supabase = await createClient();

  const [shopsRes, distinctActionsRes] = await Promise.all([
    supabase
      .from("barbershops")
      .select("id, name, slug")
      .order("name", { ascending: true }),
    supabase
      .from("audit_logs")
      .select("action")
      .limit(500),
  ]);

  let q = supabase
    .from("audit_logs")
    .select(
      "id, created_at, action, resource_type, resource_id, metadata, barbershop_id, user_id",
      { count: "exact" }
    )
    .order("created_at", { ascending: false });

  if (barbershopFilter) q = q.eq("barbershop_id", barbershopFilter);
  if (actionFilter) q = q.eq("action", actionFilter);
  if (fromIso) q = q.gte("created_at", fromIso);

  const fromIdx = (page - 1) * PAGE_SIZE;
  const toIdx = fromIdx + PAGE_SIZE - 1;
  const logsRes = await q.range(fromIdx, toIdx);

  const logs = logsRes.data ?? [];
  const total = logsRes.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const userIds = Array.from(
    new Set(logs.map((l) => l.user_id).filter((x): x is string => !!x))
  );
  const shopIds = Array.from(
    new Set(logs.map((l) => l.barbershop_id).filter((x): x is string => !!x))
  );

  const [profilesRes, shopsForRowsRes] = await Promise.all([
    userIds.length > 0
      ? supabase
          .from("profiles")
          .select("id, full_name")
          .in("id", userIds)
      : Promise.resolve({ data: [] as { id: string; full_name: string | null }[] }),
    shopIds.length > 0
      ? supabase
          .from("barbershops")
          .select("id, name, slug")
          .in("id", shopIds)
      : Promise.resolve({ data: [] as { id: string; name: string; slug: string }[] }),
  ]);

  const profileMap = new Map(
    (profilesRes.data ?? []).map((p) => [p.id, p.full_name ?? "—"])
  );
  const shopMap = new Map(
    (shopsForRowsRes.data ?? []).map((s) => [s.id, { name: s.name, slug: s.slug }])
  );

  const distinctActions = Array.from(
    new Set((distinctActionsRes.data ?? []).map((r) => r.action))
  ).sort();
  const actionsForFilter =
    distinctActions.length > 0
      ? distinctActions
      : Object.keys(ACTION_LABEL);

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Logs de auditoria
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Rastreabilidade das ações sensíveis da plataforma.
          </p>
        </div>
      </div>

      <AuditFilters
        shops={shopsRes.data ?? []}
        actions={actionsForFilter.map((a) => ({
          value: a,
          label: ACTION_LABEL[a] ?? a,
        }))}
      />

      {logsRes.error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          <WarningCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
          <span>Erro ao carregar: {logsRes.error.message}</span>
        </div>
      )}

      {logs.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]">
            <ShieldCheckIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-1">
            <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Nenhum evento registrado
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Ações sensíveis (caixa, vendas, barbearias, equipe) aparecem aqui.
            </p>
          </div>
        </Card>
      ) : (
        <>
          <Card className="overflow-hidden p-0 lg:block">
            <ul className="divide-y divide-[var(--color-border-secondary)] lg:hidden">
              {logs.map((l) => {
                const shop = l.barbershop_id ? shopMap.get(l.barbershop_id) : null;
                const author = l.user_id ? profileMap.get(l.user_id) : null;
                return (
                  <li key={l.id} className="grid gap-2 px-4 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge variant={ACTION_TONE[l.action] ?? "outline"}>
                        {ACTION_LABEL[l.action] ?? l.action}
                      </Badge>
                      <span className="text-text-xs tabular-nums text-[var(--color-text-tertiary)]">
                        {formatDateTimeBR(l.created_at)}
                      </span>
                    </div>
                    <div className="grid gap-1 text-text-sm">
                      {shop && (
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                            Barbearia
                          </span>
                          <span className="font-medium text-[var(--color-text-primary)]">
                            {shop.name}
                          </span>
                          <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                            {shop.slug}
                          </span>
                        </div>
                      )}
                      {author && (
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                            Autor
                          </span>
                          <span className="text-[var(--color-text-primary)]">
                            {author}
                          </span>
                        </div>
                      )}
                      {l.resource_type && (
                        <div className="flex flex-wrap items-baseline gap-x-2">
                          <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                            Recurso
                          </span>
                          <span className="text-[var(--color-text-primary)]">
                            {l.resource_type}
                          </span>
                          {l.resource_id && (
                            <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                              {l.resource_id.slice(0, 8)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {l.metadata && (
                      <details className="group">
                        <summary className="cursor-pointer text-text-sm text-[var(--color-blue-700)] hover:underline">
                          Ver detalhes
                        </summary>
                        <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-[var(--color-bg-secondary)] p-2 font-mono text-text-xs text-[var(--color-text-secondary)]">
                          {JSON.stringify(l.metadata, null, 2)}
                        </pre>
                      </details>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-6 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Data
                    </TableHead>
                    <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Ação
                    </TableHead>
                    <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Barbearia
                    </TableHead>
                    <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Autor
                    </TableHead>
                    <TableHead className="px-4 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Recurso
                    </TableHead>
                    <TableHead className="px-6 pr-6 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Detalhes
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((l) => {
                    const shop = l.barbershop_id ? shopMap.get(l.barbershop_id) : null;
                    const author = l.user_id ? profileMap.get(l.user_id) : null;
                    return (
                      <TableRow key={l.id}>
                        <TableCell className="px-6 py-4 align-top text-text-sm tabular-nums text-[var(--color-text-tertiary)]">
                          {formatDateTimeBR(l.created_at)}
                        </TableCell>
                        <TableCell className="px-4 py-4 align-top">
                          <Badge variant={ACTION_TONE[l.action] ?? "outline"}>
                            {ACTION_LABEL[l.action] ?? l.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-4 py-4 align-top text-text-sm text-[var(--color-text-primary)]">
                          {shop ? (
                            <div className="grid gap-0.5">
                              <span className="font-medium">{shop.name}</span>
                              <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                                {shop.slug}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[var(--color-text-tertiary)]">—</span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-4 align-top text-text-sm text-[var(--color-text-primary)]">
                          {author ?? (
                            <span className="text-[var(--color-text-tertiary)]">—</span>
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-4 align-top text-text-sm text-[var(--color-text-tertiary)]">
                          {l.resource_type ? (
                            <div className="grid gap-0.5">
                              <span className="text-[var(--color-text-primary)]">
                                {l.resource_type}
                              </span>
                              {l.resource_id && (
                                <span className="font-mono text-text-xs">
                                  {l.resource_id.slice(0, 8)}
                                </span>
                              )}
                            </div>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="px-6 py-4 pr-6 align-top">
                          {l.metadata ? (
                            <details className="group max-w-md">
                              <summary className="cursor-pointer text-text-sm text-[var(--color-blue-700)] hover:underline">
                                Ver
                              </summary>
                              <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-[var(--color-bg-secondary)] p-2 font-mono text-text-xs text-[var(--color-text-secondary)]">
                                {JSON.stringify(l.metadata, null, 2)}
                              </pre>
                            </details>
                          ) : (
                            <span className="text-text-sm text-[var(--color-text-tertiary)]">
                              —
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>

          <AuditPager page={page} totalPages={totalPages} total={total} />
        </>
      )}
    </div>
  );
}
