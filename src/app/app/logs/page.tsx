import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { Forbidden } from "@/app/app/_components/forbidden";
import {
  ACTION_LABEL,
  AuditEmptyState,
  AuditList,
  type AuditLogRow,
  type AuditShopInfo,
} from "@/components/audit/audit-list";
import { ShopAuditFilters } from "./_components/filters";
import { ShopAuditPager } from "./_components/pager";

const PAGE_SIZE = 50;

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

export default async function ShopAuditPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { membership } = await requireBarbershop();
  if (!can(membership, "configuracoes.gerenciar"))
    return <Forbidden title="Logs de auditoria" />;
  const shop = membership.barbershop!;

  const sp = await searchParams;
  const get = (k: string) => {
    const v = sp[k];
    return typeof v === "string" ? v : "";
  };

  const actionFilter = get("action");
  const period = get("period") || "30";
  const page = Math.max(1, Number(get("page") || "1") || 1);
  const fromIso = startOfPeriod(period);

  const supabase = await createClient();

  const distinctActionsRes = await supabase
    .from("audit_logs")
    .select("action")
    .eq("barbershop_id", shop.id)
    .limit(500);

  let q = supabase
    .from("audit_logs")
    .select(
      "id, created_at, action, resource_type, resource_id, metadata, barbershop_id, user_id",
      { count: "exact" }
    )
    .eq("barbershop_id", shop.id)
    .order("created_at", { ascending: false });

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

  const profilesRes =
    userIds.length > 0
      ? await supabase.from("profiles").select("id, full_name").in("id", userIds)
      : { data: [] as { id: string; full_name: string | null }[] };

  const profileMap = new Map<string, string>(
    (profilesRes.data ?? []).map((p) => [p.id, p.full_name ?? "—"])
  );
  const shopMap = new Map<string, AuditShopInfo>();

  const distinctActions = Array.from(
    new Set((distinctActionsRes.data ?? []).map((r) => r.action))
  ).sort();
  const actionsForFilter =
    distinctActions.length > 0 ? distinctActions : Object.keys(ACTION_LABEL);

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Logs
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Histórico das ações realizadas em {shop.name}.
        </p>
      </div>

      <ShopAuditFilters
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
        <AuditEmptyState message="As ações sensíveis (caixa, vendas, equipe) realizadas nesta barbearia aparecem aqui." />
      ) : (
        <>
          <AuditList
            logs={logs as AuditLogRow[]}
            showShop={false}
            shopMap={shopMap}
            profileMap={profileMap}
          />
          <ShopAuditPager page={page} totalPages={totalPages} total={total} />
        </>
      )}
    </div>
  );
}
