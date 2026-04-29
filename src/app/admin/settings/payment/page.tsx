import Link from "next/link";
import { ArrowLeftIcon, CreditCardIcon } from "@phosphor-icons/react/dist/ssr";
import { Card } from "@/components/ui/card";
import { getAsaasConfigStatus } from "@/lib/asaas/config";
import { getAppBaseUrl } from "@/lib/platform-settings";
import { PaymentGatewayForm } from "./payment-form";

export default async function PaymentGatewayPage() {
  const status = await getAsaasConfigStatus();
  const baseUrl = await getAppBaseUrl();
  const webhookUrl = `${baseUrl}/api/billing/asaas/webhook`;

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <Link
            href="/admin/settings"
            className="inline-flex w-fit items-center gap-1 text-text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
          >
            <ArrowLeftIcon size={20} weight="duotone" /> Voltar
          </Link>
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Gateway de pagamento
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Cole sua API key do Asaas — o webhook é registrado automaticamente.
          </p>
        </div>
      </div>

      <Card className="grid gap-4 p-6">
        <div className="flex items-start gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
            <CreditCardIcon size={28} weight="duotone" />
          </div>
          <div className="grid gap-0.5">
            <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Asaas — PIX recorrente
            </h2>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Use a chave de produção para cobrar barbearias reais; sandbox para testes.
            </p>
          </div>
        </div>
        <PaymentGatewayForm status={status} webhookUrl={webhookUrl} />
      </Card>
    </div>
  );
}
