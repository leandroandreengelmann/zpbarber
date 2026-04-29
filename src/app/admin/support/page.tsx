import Link from "next/link";
import {
  ChatCircleTextIcon,
  EnvelopeSimpleIcon,
  GearSixIcon,
  HeadsetIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getPlatformSettings } from "@/lib/platform-settings";

function buildWhatsappLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

function ChannelCard({
  icon,
  label,
  value,
  href,
  iconBg,
  iconFg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  href?: string;
  iconBg: string;
  iconFg: string;
}) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: iconBg, color: iconFg }}
        >
          {icon}
        </div>
        <div className="grid flex-1 gap-1">
          <p className="text-text-sm font-medium text-[var(--color-text-tertiary)]">
            {label}
          </p>
          {value ? (
            href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-text-md font-semibold text-[var(--color-text-primary)] hover:underline"
              >
                {value}
              </a>
            ) : (
              <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
                {value}
              </span>
            )
          ) : (
            <span className="text-text-sm text-[var(--color-text-tertiary)]">
              Não configurado
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

export default async function AdminSupportPage() {
  const settings = await getPlatformSettings();
  const hasEmail = !!settings.support_email;
  const hasWhatsapp = !!settings.support_whatsapp;
  const allConfigured = hasEmail && hasWhatsapp;

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Suporte
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Canais oficiais expostos para os gestores das barbearias.
          </p>
        </div>
        <Link
          href="/admin/settings"
          className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 w-full sm:w-auto" })}
        >
          <GearSixIcon size={28} weight="duotone" />
          Editar canais
        </Link>
      </div>

      {!allConfigured && (
        <div className="flex items-start gap-3 rounded-xl border border-[var(--color-warning-200)] bg-[var(--color-warning-25)] px-4 py-3">
          <HeadsetIcon
            size={28}
            weight="duotone"
            className="mt-0.5 shrink-0 text-[var(--color-warning-600)]"
          />
          <div className="grid gap-1">
            <p className="text-text-sm font-semibold text-[var(--color-text-primary)]">
              Canais incompletos
            </p>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Configure os canais em{" "}
              <Link
                href="/admin/settings"
                className="font-medium text-[var(--color-blue-700)] hover:underline"
              >
                Configurações da plataforma
              </Link>{" "}
              para que os gestores tenham como falar com você.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <ChannelCard
          icon={<EnvelopeSimpleIcon size={28} weight="duotone" />}
          label="E-mail"
          value={settings.support_email}
          href={settings.support_email ? `mailto:${settings.support_email}` : undefined}
          iconBg="var(--color-blue-50)"
          iconFg="var(--color-blue-600)"
        />
        <ChannelCard
          icon={<WhatsappLogoIcon size={28} weight="duotone" />}
          label="WhatsApp"
          value={settings.support_whatsapp}
          href={
            settings.support_whatsapp
              ? buildWhatsappLink(settings.support_whatsapp)
              : undefined
          }
          iconBg="var(--color-success-50)"
          iconFg="var(--color-success-600)"
        />
      </div>

      <Card className="p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: "var(--color-bg-secondary)", color: "var(--color-fg-secondary)" }}
          >
            <ChatCircleTextIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-2">
            <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Sistema de tickets
            </h2>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Em breve: abertura e acompanhamento de chamados pelos gestores
              dentro do app, com histórico e SLA.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
