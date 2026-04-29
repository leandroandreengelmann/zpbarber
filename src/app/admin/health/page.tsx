import Link from "next/link";
import {
  ChatCircleTextIcon,
  CheckCircleIcon,
  PulseIcon,
  StorefrontIcon,
  WarningCircleIcon,
  WhatsappLogoIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { formatDateBR, formatDateTimeBR } from "@/lib/format";

const SHOP_STATUS_LABEL: Record<string, string> = {
  trial: "Trial",
  active: "Ativa",
  suspended: "Suspensa",
  cancelled: "Cancelada",
};

const WA_STATUS_LABEL: Record<string, string> = {
  connected: "Conectado",
  connecting: "Conectando",
  qr_pending: "Aguardando QR",
  disconnected: "Desconectado",
  error: "Erro",
};

const WA_STATUS_TONE: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  connected: "default",
  connecting: "secondary",
  qr_pending: "secondary",
  disconnected: "outline",
  error: "destructive",
};

function startOfMonthIso() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function startOf7DaysAgoIso() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function KpiCard({
  icon,
  label,
  value,
  hint,
  tone = "default",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "success" | "warning" | "danger";
}) {
  const toneClass: Record<string, string> = {
    default: "bg-[var(--color-blue-50)] text-[var(--color-blue-600)]",
    success: "bg-[var(--color-success-50)] text-[var(--color-success-600)]",
    warning: "bg-[var(--color-warning-50)] text-[var(--color-warning-600)]",
    danger: "bg-[var(--color-error-50)] text-[var(--color-error-600)]",
  };
  return (
    <Card>
      <CardContent className="grid gap-2 py-4 sm:py-5">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex size-9 items-center justify-center rounded-lg ${toneClass[tone]}`}
          >
            {icon}
          </div>
          <span className="text-text-sm text-[var(--color-text-tertiary)]">{label}</span>
        </div>
        <div className="text-text-xl font-semibold tabular-nums text-[var(--color-text-primary)] sm:text-display-xs">
          {value}
        </div>
        {hint && (
          <span className="text-text-xs text-[var(--color-text-tertiary)]">{hint}</span>
        )}
      </CardContent>
    </Card>
  );
}

export default async function AdminHealthPage() {
  const supabase = await createClient();
  const monthStart = startOfMonthIso();
  const weekStart = startOf7DaysAgoIso();

  const [
    shopsRes,
    waSettingsRes,
    waMessagesRes,
    pendingMessagesRes,
    failedRecentRes,
  ] = await Promise.all([
    supabase
      .from("barbershops")
      .select("id, name, slug, status, created_at, trial_ends_at"),
    supabase
      .from("whatsapp_settings")
      .select(
        "barbershop_id, connection_status, phone_number, last_disconnected_at, last_connected_at, evolution_instance_name"
      ),
    supabase
      .from("whatsapp_messages")
      .select("status, created_at")
      .gte("created_at", weekStart),
    supabase
      .from("whatsapp_messages")
      .select("id, barbershop_id, scheduled_for, template_slug, to_phone")
      .eq("status", "pending")
      .lte("scheduled_for", new Date().toISOString())
      .order("scheduled_for", { ascending: true })
      .limit(20),
    supabase
      .from("whatsapp_messages")
      .select(
        "id, barbershop_id, template_slug, to_phone, error, failed_at, created_at"
      )
      .eq("status", "failed")
      .gte("created_at", weekStart)
      .order("failed_at", { ascending: false })
      .limit(20),
  ]);

  const shops = shopsRes.data ?? [];
  const waSettings = waSettingsRes.data ?? [];
  const waMessages = waMessagesRes.data ?? [];
  const pendingMessages = pendingMessagesRes.data ?? [];
  const failedRecent = failedRecentRes.data ?? [];

  const totalShops = shops.length;
  const activeShops = shops.filter(
    (s) => s.status === "active" || s.status === "trial"
  ).length;
  const newThisMonth = shops.filter((s) => s.created_at >= monthStart).length;
  const cancelledThisMonth = shops.filter(
    (s) => s.status === "cancelled" && s.created_at >= monthStart
  ).length;
  const trialEndingSoon = shops.filter((s) => {
    if (s.status !== "trial" || !s.trial_ends_at) return false;
    const days = (new Date(s.trial_ends_at).getTime() - Date.now()) / 86_400_000;
    return days >= 0 && days <= 7;
  });

  const shopById = new Map(shops.map((s) => [s.id, s]));

  const waConnected = waSettings.filter((w) => w.connection_status === "connected").length;
  const waDisconnected = waSettings.filter(
    (w) =>
      w.connection_status === "disconnected" ||
      w.connection_status === "error" ||
      w.connection_status === "qr_pending"
  );

  const waSent = waMessages.filter(
    (m) => m.status === "sent" || m.status === "delivered" || m.status === "read"
  ).length;
  const waFailed = waMessages.filter((m) => m.status === "failed").length;
  const waPending = waMessages.filter((m) => m.status === "pending").length;
  const waTotal = waMessages.length;
  const waSuccessRate =
    waTotal > 0 ? Math.round(((waSent / waTotal) * 100 + Number.EPSILON) * 10) / 10 : 0;

  const alerts: { tone: "danger" | "warning"; message: string }[] = [];
  if (waDisconnected.length > 0) {
    alerts.push({
      tone: "warning",
      message: `${waDisconnected.length} instância(s) WhatsApp fora do ar.`,
    });
  }
  if (failedRecent.length > 0) {
    alerts.push({
      tone: "danger",
      message: `${failedRecent.length} mensagem(s) WhatsApp falharam nos últimos 7 dias.`,
    });
  }
  if (pendingMessages.length > 5) {
    alerts.push({
      tone: "warning",
      message: `${pendingMessages.length} mensagens pendentes vencidas (cron pode estar parado).`,
    });
  }
  if (trialEndingSoon.length > 0) {
    alerts.push({
      tone: "warning",
      message: `${trialEndingSoon.length} barbearia(s) com trial vencendo nos próximos 7 dias.`,
    });
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Saúde do sistema
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Visão operacional da plataforma e do canal WhatsApp.
          </p>
        </div>
      </div>

      {alerts.length > 0 && (
        <Card>
          <CardContent className="grid gap-2 py-4">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-2.5 text-text-sm">
                <WarningCircleIcon
                  size={22}
                  weight="duotone"
                  className={
                    a.tone === "danger"
                      ? "text-[var(--color-error-600)]"
                      : "text-[var(--color-warning-600)]"
                  }
                />
                <span className="text-[var(--color-text-secondary)]">{a.message}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <KpiCard
          icon={<StorefrontIcon size={22} weight="duotone" />}
          label="Barbearias ativas"
          value={activeShops.toString()}
          hint={`Total na plataforma: ${totalShops}`}
        />
        <KpiCard
          icon={<StorefrontIcon size={22} weight="duotone" />}
          label="Novas no mês"
          value={newThisMonth.toString()}
          tone="success"
        />
        <KpiCard
          icon={<XCircleIcon size={22} weight="duotone" />}
          label="Canceladas no mês"
          value={cancelledThisMonth.toString()}
          tone={cancelledThisMonth > 0 ? "danger" : "default"}
        />
        <KpiCard
          icon={<PulseIcon size={22} weight="duotone" />}
          label="Trial vencendo (7 dias)"
          value={trialEndingSoon.length.toString()}
          tone={trialEndingSoon.length > 0 ? "warning" : "default"}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <KpiCard
          icon={<WhatsappLogoIcon size={22} weight="duotone" />}
          label="WhatsApp conectado"
          value={`${waConnected} / ${waSettings.length}`}
          hint="Instâncias online"
          tone={waConnected === waSettings.length ? "success" : "warning"}
        />
        <KpiCard
          icon={<ChatCircleTextIcon size={22} weight="duotone" />}
          label="Mensagens 7d"
          value={waTotal.toLocaleString("pt-BR")}
          hint={`${waSent} entregues · ${waFailed} falhas · ${waPending} pendentes`}
        />
        <KpiCard
          icon={<CheckCircleIcon size={22} weight="duotone" />}
          label="Taxa de sucesso 7d"
          value={waTotal > 0 ? `${waSuccessRate}%` : "—"}
          tone={waSuccessRate >= 95 ? "success" : waSuccessRate >= 80 ? "warning" : "danger"}
        />
        <KpiCard
          icon={<WarningCircleIcon size={22} weight="duotone" />}
          label="Pendentes vencidas"
          value={pendingMessages.length.toString()}
          hint="scheduled_for no passado"
          tone={pendingMessages.length > 0 ? "warning" : "default"}
        />
      </div>

      <Card className="p-0">
        <CardHeader>
          <CardTitle>Instâncias WhatsApp fora do ar</CardTitle>
          <CardDescription>
            Barbearias que precisam reconectar o número.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {waDisconnected.length === 0 ? (
            <p className="px-6 py-6 text-center text-text-sm text-[var(--color-text-tertiary)]">
              Tudo certo. Todas as instâncias conectadas.
            </p>
          ) : (
            <div className="-mx-4 overflow-x-auto sm:mx-0">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-[var(--color-bg-secondary)] text-left">
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Barbearia
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Status
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Número
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Última desconexão
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {waDisconnected.map((w) => {
                    const shop = shopById.get(w.barbershop_id);
                    return (
                      <tr
                        key={w.barbershop_id}
                        className="border-b border-[var(--color-border-secondary)] last:border-b-0"
                      >
                        <td className="px-6 py-3 text-text-sm">
                          {shop ? (
                            <Link
                              href={`/admin/barbershops/${shop.id}`}
                              className="font-medium text-[var(--color-blue-700)] hover:underline"
                            >
                              {shop.name}
                            </Link>
                          ) : (
                            <span className="text-[var(--color-text-tertiary)]">—</span>
                          )}
                          {shop?.slug && (
                            <span className="ml-2 text-text-xs text-[var(--color-text-tertiary)]">
                              /{shop.slug}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-3 text-text-sm">
                          <Badge variant={WA_STATUS_TONE[w.connection_status] ?? "outline"}>
                            {WA_STATUS_LABEL[w.connection_status] ?? w.connection_status}
                          </Badge>
                        </td>
                        <td className="px-6 py-3 text-text-sm text-[var(--color-text-secondary)]">
                          {w.phone_number ?? "—"}
                        </td>
                        <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
                          {w.last_disconnected_at
                            ? formatDateTimeBR(w.last_disconnected_at)
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="p-0">
        <CardHeader>
          <CardTitle>Falhas recentes de WhatsApp (7d)</CardTitle>
          <CardDescription>
            Últimas mensagens que não conseguiram ser entregues.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {failedRecent.length === 0 ? (
            <p className="px-6 py-6 text-center text-text-sm text-[var(--color-text-tertiary)]">
              Nenhuma falha nos últimos 7 dias.
            </p>
          ) : (
            <div className="-mx-4 overflow-x-auto sm:mx-0">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-[var(--color-bg-secondary)] text-left">
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Barbearia
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Template
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Telefone
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Erro
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Quando
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {failedRecent.map((m) => {
                    const shop = shopById.get(m.barbershop_id);
                    return (
                      <tr
                        key={m.id}
                        className="border-b border-[var(--color-border-secondary)] last:border-b-0 align-top"
                      >
                        <td className="px-6 py-3 text-text-sm">
                          {shop ? (
                            <Link
                              href={`/admin/barbershops/${shop.id}`}
                              className="text-[var(--color-blue-700)] hover:underline"
                            >
                              {shop.name}
                            </Link>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-6 py-3 text-text-sm text-[var(--color-text-secondary)]">
                          {m.template_slug}
                        </td>
                        <td className="px-6 py-3 text-text-sm text-[var(--color-text-secondary)]">
                          {m.to_phone}
                        </td>
                        <td className="max-w-[280px] truncate px-6 py-3 text-text-xs text-[var(--color-text-tertiary)]">
                          {m.error ?? "—"}
                        </td>
                        <td className="px-6 py-3 text-text-xs text-[var(--color-text-tertiary)]">
                          {m.failed_at ? formatDateTimeBR(m.failed_at) : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {trialEndingSoon.length > 0 && (
        <Card className="p-0">
          <CardHeader>
            <CardTitle>Trials vencendo nos próximos 7 dias</CardTitle>
            <CardDescription>
              Bom momento pra puxar conversa de conversão.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="-mx-4 overflow-x-auto sm:mx-0">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="bg-[var(--color-bg-secondary)] text-left">
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Barbearia
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Status
                    </th>
                    <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Trial termina
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {trialEndingSoon.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-[var(--color-border-secondary)] last:border-b-0"
                    >
                      <td className="px-6 py-3 text-text-sm">
                        <Link
                          href={`/admin/barbershops/${s.id}`}
                          className="font-medium text-[var(--color-blue-700)] hover:underline"
                        >
                          {s.name}
                        </Link>
                        <span className="ml-2 text-text-xs text-[var(--color-text-tertiary)]">
                          /{s.slug}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-text-sm">
                        <Badge variant="secondary">{SHOP_STATUS_LABEL[s.status] ?? s.status}</Badge>
                      </td>
                      <td className="px-6 py-3 text-text-sm text-[var(--color-text-secondary)]">
                        {s.trial_ends_at ? formatDateBR(s.trial_ends_at) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
