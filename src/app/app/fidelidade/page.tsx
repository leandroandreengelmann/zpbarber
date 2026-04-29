import Link from "next/link";
import { GiftIcon, UsersThreeIcon, TicketIcon, CardsIcon, GearIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { formatDateBR } from "@/lib/format";
import { MaintenanceButtons } from "./_components/maintenance-buttons";

type ClientBalance = { client_id: string; name: string; phone: string | null; balance: number };

export default async function FidelidadePage() {
  const { membership } = await requireBarbershop();
  const isGestor = membership.role === "gestor";
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const [settingsRes, txRes, redemptionsRes, punchRes] = await Promise.all([
    supabase
      .from("loyalty_settings")
      .select("is_active, punch_card_active")
      .eq("barbershop_id", shopId)
      .maybeSingle(),
    supabase
      .from("loyalty_transactions")
      .select("client_id, points, type, expires_at")
      .eq("barbershop_id", shopId),
    supabase
      .from("loyalty_redemptions")
      .select(
        "id, code, reward_name, points_used, status, created_at, client_id, clients(full_name, phone)"
      )
      .eq("barbershop_id", shopId)
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("loyalty_punch_cards")
      .select("id, current_count, required, status")
      .eq("barbershop_id", shopId)
      .eq("status", "active"),
  ]);

  const isActive = settingsRes.data?.is_active ?? false;
  const punchActive = settingsRes.data?.punch_card_active ?? false;

  const transactions = txRes.data ?? [];
  const now = new Date();
  const balanceByClient = new Map<string, number>();
  for (const t of transactions) {
    if (t.expires_at && new Date(t.expires_at) < now && t.type === "earn") continue;
    balanceByClient.set(
      t.client_id,
      (balanceByClient.get(t.client_id) ?? 0) + t.points
    );
  }

  const clientIds = [...balanceByClient.keys()].filter(
    (id) => (balanceByClient.get(id) ?? 0) > 0
  );
  let topClients: ClientBalance[] = [];
  if (clientIds.length > 0) {
    const { data: cs } = await supabase
      .from("clients")
      .select("id, full_name, phone")
      .in("id", clientIds);
    topClients = (cs ?? [])
      .map((c) => ({
        client_id: c.id,
        name: c.full_name,
        phone: c.phone,
        balance: balanceByClient.get(c.id) ?? 0,
      }))
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 50);
  }

  const totalPoints = [...balanceByClient.values()].reduce(
    (s, v) => s + Math.max(0, v),
    0
  );
  const clientsWithPoints = clientIds.length;
  const pendingRedemptions = (redemptionsRes.data ?? []).filter(
    (r) => r.status === "pending"
  );
  const activePunchCards = (punchRes.data ?? []).length;

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Fidelidade
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Programa de pontos e cartão de carimbos.
          </p>
        </div>
        {isGestor && <MaintenanceButtons />}
      </div>

      {!isActive && !punchActive && (
        <Card>
          <CardContent className="flex flex-wrap items-center gap-4 py-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-warning-100)] text-[var(--color-warning-700)]">
              <GiftIcon size={24} weight="duotone" />
            </div>
            <div className="grid gap-0.5">
              <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Programa de fidelidade desativado
              </p>
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Ative pontos ou cartão de carimbos nas configurações para começar.
              </p>
            </div>
            {isGestor && (
              <Link
                href="/app/fidelidade/configuracoes"
                className={buttonVariants({ size: "sm", className: "ml-auto" })}
              >
                <GearIcon size={20} weight="duotone" />
                Configurar
              </Link>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<UsersThreeIcon size={24} weight="duotone" />}
          label="Clientes com pontos"
          value={clientsWithPoints.toString()}
        />
        <KpiCard
          icon={<GiftIcon size={24} weight="duotone" />}
          label="Pontos no programa"
          value={totalPoints.toLocaleString("pt-BR")}
        />
        <KpiCard
          icon={<TicketIcon size={24} weight="duotone" />}
          label="Resgates pendentes"
          value={pendingRedemptions.length.toString()}
        />
        <KpiCard
          icon={<CardsIcon size={24} weight="duotone" />}
          label="Cartões ativos"
          value={activePunchCards.toString()}
        />
      </div>

      {pendingRedemptions.length > 0 && (
        <Card className="p-0">
          <div className="border-b border-[var(--color-border-secondary)] px-4 py-4 sm:px-6">
            <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Resgates pendentes de uso
            </h2>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Códigos gerados ainda não aplicados em uma venda.
            </p>
          </div>
          <CardContent className="p-0">
            <ul className="grid gap-3 p-4 sm:hidden">
              {pendingRedemptions.map((r) => (
                <li
                  key={r.id}
                  className="rounded-lg border border-[var(--color-border-secondary)] p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid gap-0.5 min-w-0">
                      <span className="font-mono text-text-sm font-semibold text-[var(--color-text-primary)]">
                        {r.code}
                      </span>
                      <span className="truncate text-text-xs text-[var(--color-text-tertiary)]">
                        {r.reward_name}
                      </span>
                    </div>
                    <span className="shrink-0 text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
                      {r.points_used} pts
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3 border-t border-[var(--color-border-secondary)] pt-2 text-text-xs">
                    {r.client_id ? (
                      <Link
                        href={`/app/fidelidade/${r.client_id}`}
                        className="truncate font-medium text-[var(--color-blue-700)]"
                      >
                        {(r.clients as { full_name: string } | null)?.full_name ?? "—"}
                      </Link>
                    ) : (
                      <span className="text-[var(--color-text-tertiary)]">—</span>
                    )}
                    <span className="shrink-0 text-[var(--color-text-tertiary)]">
                      {formatDateBR(r.created_at)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full">
                <thead>
                  <tr className="bg-[var(--color-bg-secondary)] text-left">
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Código
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Recompensa
                    </th>
                    <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Pontos
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Criado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRedemptions.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-[var(--color-border-secondary)] last:border-b-0"
                    >
                      <td className="px-6 py-3 font-mono text-text-sm text-[var(--color-text-primary)]">
                        {r.code}
                      </td>
                      <td className="px-6 py-3 text-text-sm">
                        {r.client_id ? (
                          <Link
                            href={`/app/fidelidade/${r.client_id}`}
                            className="text-[var(--color-blue-700)] hover:underline"
                          >
                            {(r.clients as { full_name: string } | null)?.full_name ?? "—"}
                          </Link>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-6 py-3 text-text-sm text-[var(--color-text-primary)]">
                        {r.reward_name}
                      </td>
                      <td className="px-6 py-3 text-right tabular-nums text-text-sm text-[var(--color-text-primary)]">
                        {r.points_used}
                      </td>
                      <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
                        {formatDateBR(r.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="p-0">
        <div className="border-b border-[var(--color-border-secondary)] px-4 py-4 sm:px-6">
          <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Clientes com saldo de pontos
          </h2>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            Top 50 por saldo. Clique para ver extrato e aplicar resgate.
          </p>
        </div>
        <CardContent className="p-0">
          {topClients.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-12 text-center">
              <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Nenhum cliente com pontos ainda
              </p>
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Os pontos são lançados automaticamente quando uma venda é paga.
              </p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-[var(--color-border-secondary)] sm:hidden">
                {topClients.map((c) => (
                  <li key={c.client_id}>
                    <Link
                      href={`/app/fidelidade/${c.client_id}`}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <div className="grid gap-0.5 min-w-0">
                        <span className="truncate text-text-sm font-medium text-[var(--color-text-primary)]">
                          {c.name}
                        </span>
                        {c.phone && (
                          <span className="text-text-xs text-[var(--color-text-tertiary)]">
                            {c.phone}
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
                        {c.balance.toLocaleString("pt-BR")} pts
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--color-bg-secondary)] text-left">
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Telefone
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Saldo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topClients.map((c) => (
                      <tr
                        key={c.client_id}
                        className="border-b border-[var(--color-border-secondary)] last:border-b-0"
                      >
                        <td className="px-6 py-3 text-text-sm">
                          <Link
                            href={`/app/fidelidade/${c.client_id}`}
                            className="font-medium text-[var(--color-blue-700)] hover:underline"
                          >
                            {c.name}
                          </Link>
                        </td>
                        <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
                          {c.phone ?? "—"}
                        </td>
                        <td className="px-6 py-3 text-right tabular-nums text-text-sm font-semibold text-[var(--color-text-primary)]">
                          {c.balance.toLocaleString("pt-BR")} pts
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

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-5">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
          {icon}
        </div>
        <div className="grid gap-0.5">
          <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
            {label}
          </span>
          <span className="text-display-xs font-semibold tabular-nums text-[var(--color-text-primary)]">
            {value}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
