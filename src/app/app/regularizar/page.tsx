import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircleIcon,
  ReceiptIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { requireBarbershop } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { getBarbershopBillingState } from "@/lib/billing/access";
import { formatDateBR, formatMoney } from "@/lib/format";
import { RegularizarPix } from "./_components/regularizar-pix";

const STATE_TITLE: Record<string, string> = {
  warn: "Pagamento em atraso",
  blocked_suspended: "Acesso suspenso",
  blocked_cancelled: "Assinatura cancelada",
  blocked_shop_suspended: "Conta suspensa",
  blocked_shop_cancelled: "Conta encerrada",
  blocked_trial_expired: "Período de avaliação encerrado",
};

const STATE_DESCRIPTION: Record<string, string> = {
  warn: "Sua fatura venceu. Quite agora para evitar bloqueio do acesso.",
  blocked_suspended:
    "Seu acesso foi suspenso por falta de pagamento. Quite a fatura abaixo para reativar.",
  blocked_cancelled:
    "Sua assinatura foi cancelada. Escolha um plano para reativar.",
  blocked_shop_suspended:
    "Sua conta foi suspensa pelo time ZP Barber. Entre em contato para reativar.",
  blocked_shop_cancelled:
    "Sua conta foi encerrada pelo time ZP Barber. Entre em contato para mais informações.",
  blocked_trial_expired:
    "Seu período de avaliação acabou. Escolha um plano para continuar usando.",
};

export default async function RegularizarPage() {
  const { membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  const isGestor = membership.role === "gestor";

  const billing = await getBarbershopBillingState(shopId);

  if (billing.kind === "trial" || billing.kind === "ok") {
    redirect("/app");
  }

  const stateKey =
    billing.kind === "blocked"
      ? `blocked_${billing.reason}`
      : "warn";
  const title = STATE_TITLE[stateKey] ?? "Regularize seu pagamento";
  const description = STATE_DESCRIPTION[stateKey] ?? "";

  const supabase = await createClient();
  const invoiceId =
    billing.kind === "warn" || billing.kind === "blocked"
      ? billing.openInvoiceId
      : null;

  const invoiceRes = invoiceId
    ? await supabase
        .from("invoices")
        .select(
          "id, amount_cents, due_date, status, invoice_url, asaas_payment_id, subscription:subscriptions(plan:plans(name, billing_cycle))"
        )
        .eq("id", invoiceId)
        .maybeSingle()
    : null;
  const invoice = invoiceRes?.data ?? null;

  const isContactOnly =
    billing.kind === "blocked" &&
    (billing.reason === "shop_suspended" || billing.reason === "shop_cancelled");
  const showSubscribeCta =
    isGestor &&
    billing.kind === "blocked" &&
    (billing.reason === "trial_expired" || billing.reason === "cancelled") &&
    !invoiceId;
  const showStaffNotice = !isGestor;

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          {title}
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          {description}
        </p>
      </div>

      <Card
        className={`flex items-start gap-3 border-l-4 px-5 py-4 ${
          billing.kind === "warn"
            ? "border-l-[var(--color-warning-500)]"
            : "border-l-[var(--color-error-500)]"
        }`}
      >
        <WarningCircleIcon
          size={32}
          weight="duotone"
          className={
            billing.kind === "warn"
              ? "text-[var(--color-text-warning-primary)]"
              : "text-[var(--color-text-error-primary)]"
          }
        />
        <div className="grid gap-1">
          <p className="text-text-sm font-semibold text-[var(--color-text-primary)]">
            {billing.kind === "warn"
              ? "Pague para manter o acesso"
              : "Acesso restrito"}
          </p>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            {billing.kind === "warn"
              ? "Você ainda tem acesso, mas após alguns dias sua conta pode ser suspensa."
              : "As funcionalidades do app foram desativadas até o pagamento ser confirmado."}
          </p>
        </div>
      </Card>

      {showStaffNotice ? (
        <Card className="grid gap-3 p-6">
          <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Peça ao gestor para regularizar.
          </p>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            Apenas o gestor da barbearia pode acessar a fatura e efetuar o
            pagamento. Assim que o pagamento for confirmado, seu acesso é
            restaurado automaticamente.
          </p>
        </Card>
      ) : isContactOnly ? (
        <Card className="grid gap-3 p-6">
          <p className="text-text-md text-[var(--color-text-secondary)]">
            Para reativar sua conta, fale com o suporte do ZP Barber.
          </p>
          <a
            href="mailto:contato@barberramos.com.br"
            className="text-text-sm font-semibold text-[var(--color-text-brand-secondary)] underline"
          >
            contato@barberramos.com.br
          </a>
        </Card>
      ) : invoice ? (
        <Card className="grid gap-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="grid gap-1">
              <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                Fatura em aberto
              </span>
              <span className="text-display-sm font-semibold tabular-nums text-[var(--color-text-primary)]">
                {formatMoney(invoice.amount_cents)}
              </span>
              <span className="text-text-sm text-[var(--color-text-tertiary)]">
                Vencimento: {formatDateBR(invoice.due_date)}
                {invoice.subscription?.plan?.name
                  ? ` · ${invoice.subscription.plan.name}`
                  : ""}
              </span>
            </div>
            <Badge
              variant={invoice.status === "overdue" ? "destructive" : "secondary"}
            >
              {invoice.status === "overdue" ? "Atrasada" : "Pendente"}
            </Badge>
          </div>

          <RegularizarPix
            invoiceId={invoice.id}
            invoiceUrl={invoice.invoice_url}
          />

          <div className="rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3 text-text-xs text-[var(--color-text-tertiary)]">
            <CheckCircleIcon
              size={18}
              weight="duotone"
              className="mr-1 inline text-[var(--color-success-600)]"
            />
            Após o pagamento, sua conta é liberada automaticamente em até 1
            minuto. Use o botão{" "}
            <span className="font-semibold">Já paguei, verificar</span> para
            forçar a checagem.
          </div>
        </Card>
      ) : showSubscribeCta ? (
        <Card className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <ReceiptIcon size={32} weight="duotone" />
          <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Escolha um plano para reativar
          </p>
          <p className="max-w-md text-text-sm text-[var(--color-text-tertiary)]">
            Selecione um plano e gere uma fatura PIX. Após o pagamento, seu
            acesso é liberado automaticamente.
          </p>
          <Link
            href="/app/assinar"
            className="mt-2 inline-flex h-10 items-center rounded-md bg-[var(--color-blue-600)] px-5 text-text-sm font-semibold text-white hover:bg-[var(--color-blue-700)]"
          >
            Escolher plano
          </Link>
        </Card>
      ) : (
        <Card className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <ReceiptIcon size={32} weight="duotone" />
          <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Nenhuma fatura em aberto encontrada
          </p>
          <p className="max-w-md text-text-sm text-[var(--color-text-tertiary)]">
            Entre em contato com o suporte para regularizar sua conta.
          </p>
          <Link
            href="mailto:contato@barberramos.com.br"
            className="text-text-sm font-semibold text-[var(--color-text-brand-secondary)] underline"
          >
            contato@barberramos.com.br
          </Link>
        </Card>
      )}
    </div>
  );
}
