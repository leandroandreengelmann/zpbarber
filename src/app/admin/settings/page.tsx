import Link from "next/link";
import {
  CaretRightIcon,
  CheckCircleIcon,
  CreditCardIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAsaasConfigStatus } from "@/lib/asaas/config";
import { getPlatformSettings } from "@/lib/platform-settings";
import { SettingsForm } from "./settings-form";

export default async function AdminSettingsPage() {
  const [settings, gatewayStatus] = await Promise.all([
    getPlatformSettings(),
    getAsaasConfigStatus(),
  ]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Configurações da plataforma
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Variáveis globais usadas por todas as barbearias.
        </p>
      </div>

      <Link
        href="/admin/settings/payment"
        className="block rounded-xl ring-offset-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue-500)]"
      >
        <Card className="flex items-center gap-4 p-5 transition hover:border-[var(--color-border-primary)] hover:shadow-sm">
          <div className="flex size-11 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
            <CreditCardIcon size={28} weight="duotone" />
          </div>
          <div className="grid flex-1 gap-0.5">
            <div className="flex items-center gap-2">
              <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Gateway de pagamento
              </span>
              {gatewayStatus.configured && gatewayStatus.webhookRegistered ? (
                <Badge variant="default" className="gap-1">
                  <CheckCircleIcon size={14} weight="duotone" /> Conectado
                </Badge>
              ) : gatewayStatus.configured ? (
                <Badge variant="secondary" className="gap-1">
                  <WarningCircleIcon size={14} weight="duotone" /> Webhook pendente
                </Badge>
              ) : (
                <Badge variant="outline">Não configurado</Badge>
              )}
            </div>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              {gatewayStatus.configured
                ? `Asaas (${gatewayStatus.environment === "production" ? "produção" : "sandbox"})${
                    gatewayStatus.accountName ? ` · ${gatewayStatus.accountName}` : ""
                  }`
                : "Cole sua API key do Asaas para começar a cobrar barbearias via PIX."}
            </p>
          </div>
          <CaretRightIcon
            size={24}
            weight="duotone"
            className="text-[var(--color-fg-quaternary)]"
          />
        </Card>
      </Link>

      <Card className="p-6">
        <SettingsForm initial={settings} />
      </Card>
    </div>
  );
}
