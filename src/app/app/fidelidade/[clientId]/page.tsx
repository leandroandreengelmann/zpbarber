import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { formatDateBR, formatDateTimeBR } from "@/lib/format";
import { LOYALTY_REWARD_TYPE_LABEL, type LoyaltyRewardType } from "@/lib/zod/fidelidade";
import { RedeemForm } from "./_components/redeem-form";
import { AdjustPointsForm } from "./_components/adjust-form";
import { CancelRedemptionButton } from "./_components/cancel-redemption-button";

const TX_TYPE_LABEL: Record<string, string> = {
  earn: "Ganho",
  bonus: "Bônus",
  welcome: "Boas-vindas",
  birthday: "Aniversário",
  redeem: "Resgate",
  expire: "Expiração",
  adjust: "Ajuste",
  refund: "Estorno",
};

const REDEMPTION_STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  pending: {
    label: "Pendente",
    cls: "bg-[var(--color-warning-100)] text-[var(--color-warning-700)]",
  },
  used: {
    label: "Usado",
    cls: "bg-[var(--color-success-100)] text-[var(--color-success-700)]",
  },
  cancelled: {
    label: "Cancelado",
    cls: "bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)]",
  },
  expired: {
    label: "Expirado",
    cls: "bg-[var(--color-error-100)] text-[var(--color-error-700)]",
  },
};

export default async function FidelidadeClientPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const { membership } = await requireBarbershop();
  const isGestor = can(membership, "fidelidade.gerenciar");
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const [clientRes, balanceRes, txRes, redemptionsRes, punchCardRes, rewardsRes] =
    await Promise.all([
      supabase
        .from("clients")
        .select("id, full_name, phone, birth_date")
        .eq("id", clientId)
        .eq("barbershop_id", shopId)
        .maybeSingle(),
      supabase.rpc("fn_loyalty_balance", { p_client: clientId }),
      supabase
        .from("loyalty_transactions")
        .select("id, type, points, description, created_at, expires_at")
        .eq("barbershop_id", shopId)
        .eq("client_id", clientId)
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("loyalty_redemptions")
        .select("id, code, reward_name, reward_type, points_used, status, created_at, used_at")
        .eq("barbershop_id", shopId)
        .eq("client_id", clientId)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("loyalty_punch_cards")
        .select("id, current_count, required, status, started_at, expires_at, completed_at")
        .eq("barbershop_id", shopId)
        .eq("client_id", clientId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("loyalty_rewards")
        .select("id, name, cost_points")
        .eq("barbershop_id", shopId)
        .eq("is_active", true)
        .order("cost_points", { ascending: true }),
    ]);

  if (!clientRes.data) notFound();
  const client = clientRes.data;
  const balance = (balanceRes.data as number | null) ?? 0;
  const txs = txRes.data ?? [];
  const redemptions = redemptionsRes.data ?? [];
  const card = punchCardRes.data;
  const rewards = rewardsRes.data ?? [];

  const canManage = can(membership, "fidelidade.gerenciar");

  return (
    <div className="grid gap-6">
      <div>
        <Link
          href="/app/fidelidade"
          className="inline-flex items-center gap-1 text-text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeftIcon size={16} weight="bold" />
          Voltar
        </Link>
      </div>

      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          {client.full_name}
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          {client.phone ?? "Sem telefone"}
          {client.birth_date && ` · Aniversário ${formatDateBR(client.birth_date)}`}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardContent className="grid gap-2 py-6">
            <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
              Saldo de pontos
            </span>
            <span className="text-display-md font-semibold tabular-nums text-[var(--color-text-primary)]">
              {balance.toLocaleString("pt-BR")}
            </span>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardContent className="grid gap-3 py-6">
            <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
              Cartão de carimbos
            </span>
            {!card ? (
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Sem cartão ativo. Será iniciado na próxima venda elegível.
              </p>
            ) : (
              <PunchCardView card={card} />
            )}
          </CardContent>
        </Card>
      </div>

      {canManage && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardContent className="grid gap-3 py-5">
              <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Gerar resgate
              </h2>
              <RedeemForm clientId={clientId} rewards={rewards} balance={balance} />
            </CardContent>
          </Card>

          {isGestor && (
            <Card>
              <CardContent className="grid gap-3 py-5">
                <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Ajuste manual
                </h2>
                <p className="text-text-xs text-[var(--color-text-tertiary)]">
                  Some ou subtraia pontos com motivo registrado.
                </p>
                <AdjustPointsForm clientId={clientId} />
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Card className="p-0">
        <div className="border-b border-[var(--color-border-secondary)] px-4 py-4 sm:px-6">
          <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Resgates
          </h2>
        </div>
        <CardContent className="p-0">
          {redemptions.length === 0 ? (
            <p className="px-4 py-8 text-text-sm text-[var(--color-text-tertiary)] sm:px-6">
              Nenhum resgate ainda.
            </p>
          ) : (
            <>
              <ul className="grid gap-3 p-4 sm:hidden">
                {redemptions.map((r) => {
                  const s =
                    REDEMPTION_STATUS_LABEL[r.status] ??
                    REDEMPTION_STATUS_LABEL.pending;
                  return (
                    <li
                      key={r.id}
                      className="rounded-lg border border-[var(--color-border-secondary)] p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="grid gap-0.5 min-w-0">
                          <span className="text-text-sm font-semibold text-[var(--color-text-primary)] truncate">
                            {r.reward_name}
                          </span>
                          <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                            {r.code}
                          </span>
                        </div>
                        <span
                          className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-text-xs font-medium ${s.cls}`}
                        >
                          {s.label}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-3 border-t border-[var(--color-border-secondary)] pt-2 text-text-xs text-[var(--color-text-tertiary)]">
                        <span>
                          {LOYALTY_REWARD_TYPE_LABEL[r.reward_type as LoyaltyRewardType]}
                        </span>
                        <span className="tabular-nums font-medium text-[var(--color-text-primary)]">
                          {r.points_used} pts
                        </span>
                      </div>
                      <div className="mt-2 text-text-xs text-[var(--color-text-tertiary)]">
                        {formatDateTimeBR(r.created_at)}
                      </div>
                      {r.status === "pending" && canManage && (
                        <div className="mt-2 border-t border-[var(--color-border-secondary)] pt-2">
                          <CancelRedemptionButton id={r.id} />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="hidden overflow-x-auto sm:block">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--color-bg-secondary)] text-left">
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Código
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Recompensa
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Pontos
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Status
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Criado
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {redemptions.map((r) => {
                      const s =
                        REDEMPTION_STATUS_LABEL[r.status] ??
                        REDEMPTION_STATUS_LABEL.pending;
                      return (
                        <tr
                          key={r.id}
                          className="border-b border-[var(--color-border-secondary)] last:border-b-0"
                        >
                          <td className="px-6 py-3 font-mono text-text-sm text-[var(--color-text-primary)]">
                            {r.code}
                          </td>
                          <td className="px-6 py-3 text-text-sm text-[var(--color-text-primary)]">
                            {r.reward_name}
                          </td>
                          <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
                            {LOYALTY_REWARD_TYPE_LABEL[r.reward_type as LoyaltyRewardType]}
                          </td>
                          <td className="px-6 py-3 text-right tabular-nums text-text-sm text-[var(--color-text-primary)]">
                            {r.points_used}
                          </td>
                          <td className="px-6 py-3">
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-text-xs font-medium ${s.cls}`}
                            >
                              {s.label}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
                            {formatDateTimeBR(r.created_at)}
                          </td>
                          <td className="px-6 py-3 text-right">
                            {r.status === "pending" && canManage && (
                              <CancelRedemptionButton id={r.id} />
                            )}
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

      <Card className="p-0">
        <div className="border-b border-[var(--color-border-secondary)] px-4 py-4 sm:px-6">
          <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Extrato de pontos
          </h2>
        </div>
        <CardContent className="p-0">
          {txs.length === 0 ? (
            <p className="px-4 py-8 text-text-sm text-[var(--color-text-tertiary)] sm:px-6">
              Sem lançamentos ainda.
            </p>
          ) : (
            <>
              <ul className="divide-y divide-[var(--color-border-secondary)] sm:hidden">
                {txs.map((t) => (
                  <li key={t.id} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid gap-0.5 min-w-0">
                        <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                          {TX_TYPE_LABEL[t.type] ?? t.type}
                        </span>
                        {t.description && (
                          <span className="text-text-xs text-[var(--color-text-tertiary)]">
                            {t.description}
                          </span>
                        )}
                        <span className="text-text-xs text-[var(--color-text-tertiary)]">
                          {formatDateTimeBR(t.created_at)}
                        </span>
                      </div>
                      <span
                        className={`shrink-0 text-text-md font-semibold tabular-nums ${
                          t.points >= 0
                            ? "text-[var(--color-success-700)]"
                            : "text-[var(--color-error-700)]"
                        }`}
                      >
                        {t.points >= 0 ? "+" : ""}
                        {t.points}
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
                        Data
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Descrição
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Pontos
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {txs.map((t) => (
                      <tr
                        key={t.id}
                        className="border-b border-[var(--color-border-secondary)] last:border-b-0"
                      >
                        <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
                          {formatDateTimeBR(t.created_at)}
                        </td>
                        <td className="px-6 py-3 text-text-sm text-[var(--color-text-primary)]">
                          {TX_TYPE_LABEL[t.type] ?? t.type}
                        </td>
                        <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
                          {t.description ?? "—"}
                        </td>
                        <td
                          className={`px-6 py-3 text-right tabular-nums text-text-sm font-semibold ${
                            t.points >= 0
                              ? "text-[var(--color-success-700)]"
                              : "text-[var(--color-error-700)]"
                          }`}
                        >
                          {t.points >= 0 ? "+" : ""}
                          {t.points}
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

function PunchCardView({
  card,
}: {
  card: {
    current_count: number;
    required: number;
    status: string;
    expires_at: string | null;
  };
}) {
  const stamps = Array.from({ length: card.required }, (_, i) => i < card.current_count);
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
          {card.current_count}/{card.required}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-text-xs font-medium ${
            card.status === "active"
              ? "bg-[var(--color-blue-100)] text-[var(--color-blue-700)]"
              : card.status === "completed"
                ? "bg-[var(--color-success-100)] text-[var(--color-success-700)]"
                : "bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)]"
          }`}
        >
          {card.status === "active"
            ? "Ativo"
            : card.status === "completed"
              ? "Completo"
              : card.status === "redeemed"
                ? "Resgatado"
                : "Expirado"}
        </span>
        {card.expires_at && (
          <span className="text-text-xs text-[var(--color-text-tertiary)]">
            Expira em {formatDateBR(card.expires_at)}
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {stamps.map((filled, i) => (
          <div
            key={i}
            className={`flex size-8 items-center justify-center rounded-full border-2 text-text-xs font-bold ${
              filled
                ? "border-[var(--color-success-500)] bg-[var(--color-success-500)] text-white"
                : "border-[var(--color-border-secondary)] text-[var(--color-text-tertiary)]"
            }`}
          >
            {filled ? "✓" : i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
