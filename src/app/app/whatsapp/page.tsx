import Link from "next/link";
import {
  CheckCircleIcon,
  GearIcon,
  PaperPlaneTiltIcon,
  WarningCircleIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { formatDateTimeBR } from "@/lib/format";
import { WHATSAPP_TRIGGER_LABEL } from "@/lib/zod/whatsapp";
import { TestMessageCard } from "./_components/test-message-card";

const STATUS_LABEL: Record<string, string> = {
  connected: "Conectado",
  qr_pending: "Aguardando leitura do QR",
  connecting: "Conectando...",
  disconnected: "Desconectado",
  error: "Erro",
};

const STATUS_COLOR: Record<string, string> = {
  connected: "bg-[var(--color-success-50)] text-[var(--color-text-success-primary)] border-[var(--color-border-success-subtle)]",
  qr_pending: "bg-[var(--color-warning-50)] text-[var(--color-text-warning-primary)] border-[var(--color-border-warning-subtle)]",
  connecting: "bg-[var(--color-warning-50)] text-[var(--color-text-warning-primary)] border-[var(--color-border-warning-subtle)]",
  disconnected: "bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)] border-[var(--color-border-secondary)]",
  error: "bg-[var(--color-error-50)] text-[var(--color-text-error-primary)] border-[var(--color-border-error-subtle)]",
};

const MSG_STATUS_LABEL: Record<string, string> = {
  pending: "Pendente",
  sending: "Enviando",
  sent: "Enviada",
  delivered: "Entregue",
  read: "Lida",
  failed: "Falhou",
  cancelled: "Cancelada",
};

export default async function WhatsappPage() {
  const { membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const [settingsRes, msgsRes, countsRes] = await Promise.all([
    supabase
      .from("whatsapp_settings")
      .select("*")
      .eq("barbershop_id", shopId)
      .maybeSingle(),
    supabase
      .from("whatsapp_messages")
      .select(
        "id, to_phone, body, status, trigger, scheduled_for, sent_at, created_at, error, clients(full_name)"
      )
      .eq("barbershop_id", shopId)
      .order("created_at", { ascending: false })
      .limit(30),
    supabase
      .from("whatsapp_messages")
      .select("status", { count: "exact" })
      .eq("barbershop_id", shopId)
      .gte("created_at", new Date(Date.now() - 7 * 86400_000).toISOString()),
  ]);

  const settings = settingsRes.data;
  const status = settings?.connection_status ?? "disconnected";
  const phone = settings?.phone_number ?? null;
  const msgs = msgsRes.data ?? [];

  const counts = (countsRes.data ?? []).reduce(
    (acc: Record<string, number>, m: { status: string }) => {
      acc[m.status] = (acc[m.status] ?? 0) + 1;
      return acc;
    },
    {}
  );
  const totalWeek =
    (counts.sent ?? 0) +
    (counts.delivered ?? 0) +
    (counts.read ?? 0) +
    (counts.failed ?? 0);
  const failedWeek = counts.failed ?? 0;

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            WhatsApp
          </h1>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            Mensagens automáticas pelo número da barbearia.
          </p>
        </div>
        <Link
          href="/app/whatsapp/configuracoes"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          <GearIcon size={20} weight="duotone" /> Configurações
        </Link>
      </div>

      <Card>
        <CardContent className="grid gap-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[var(--color-success-50)] text-[var(--color-text-success-primary)]">
                <WhatsappLogoIcon size={28} weight="duotone" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
                    {phone ? `+${phone}` : "Nenhum número conectado"}
                  </span>
                  <Badge
                    className={`border ${STATUS_COLOR[status] ?? STATUS_COLOR.disconnected}`}
                  >
                    {STATUS_LABEL[status] ?? status}
                  </Badge>
                </div>
                <p className="text-text-xs text-[var(--color-text-tertiary)]">
                  {settings?.last_connected_at
                    ? `Conectado desde ${formatDateTimeBR(settings.last_connected_at)}`
                    : "Conecte um número em Configurações."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <KPI label="Enviadas (7d)" value={totalWeek} />
        <KPI label="Entregues (7d)" value={counts.delivered ?? counts.sent ?? 0} />
        <KPI
          label="Falhas (7d)"
          value={failedWeek}
          tone={failedWeek > 0 ? "danger" : undefined}
        />
      </div>

      <TestMessageCard
        defaultPhone={phone}
        disabled={status !== "connected"}
      />

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b border-[var(--color-border-secondary)] px-5 py-4">
            <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Últimas mensagens
            </h2>
            <span className="text-text-xs text-[var(--color-text-tertiary)]">
              {msgs.length} de 30
            </span>
          </div>
          {msgs.length === 0 ? (
            <div className="grid place-items-center gap-2 px-5 py-12 text-center">
              <PaperPlaneTiltIcon
                size={28}
                weight="duotone"
                className="text-[var(--color-fg-quaternary)]"
              />
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Nenhuma mensagem ainda. Conecte o WhatsApp e configure os
                gatilhos para começar.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border-secondary)]">
              {msgs.map((m) => (
                <div key={m.id} className="grid gap-1 px-5 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                        {m.clients?.full_name ?? `+${m.to_phone}`}
                      </span>
                      <Badge variant="secondary" className="text-text-xs">
                        {WHATSAPP_TRIGGER_LABEL[m.trigger as keyof typeof WHATSAPP_TRIGGER_LABEL] ??
                          m.trigger}
                      </Badge>
                      <MsgStatusBadge status={m.status} />
                    </div>
                    <span className="shrink-0 text-text-xs text-[var(--color-text-tertiary)]">
                      {formatDateTimeBR(m.created_at)}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-text-sm text-[var(--color-text-secondary)]">
                    {m.body}
                  </p>
                  {m.error && (
                    <div className="flex items-start gap-1 text-text-xs text-[var(--color-text-error-primary)]">
                      <WarningCircleIcon size={14} weight="duotone" />
                      {m.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function KPI({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "danger";
}) {
  return (
    <Card>
      <CardContent className="grid gap-1 p-5">
        <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
          {label}
        </span>
        <span
          className={`text-display-xs font-semibold ${
            tone === "danger"
              ? "text-[var(--color-text-error-primary)]"
              : "text-[var(--color-text-primary)]"
          }`}
        >
          {value}
        </span>
      </CardContent>
    </Card>
  );
}

function MsgStatusBadge({ status }: { status: string }) {
  const tone =
    status === "failed"
      ? "bg-[var(--color-error-50)] text-[var(--color-text-error-primary)]"
      : status === "delivered" || status === "read"
        ? "bg-[var(--color-success-50)] text-[var(--color-text-success-primary)]"
        : status === "sent"
          ? "bg-[var(--color-blue-50)] text-[var(--color-blue-700)]"
          : "bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)]";
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tone}`}
    >
      {status === "delivered" || status === "read" ? (
        <span className="inline-flex items-center gap-1">
          <CheckCircleIcon size={12} weight="duotone" />
          {MSG_STATUS_LABEL[status] ?? status}
        </span>
      ) : (
        MSG_STATUS_LABEL[status] ?? status
      )}
    </span>
  );
}
