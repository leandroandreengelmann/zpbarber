import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CreditCardIcon,
  InfoIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { getBarbershopBillingState } from "@/lib/billing/access";
import { getAsaasConfigStatus } from "@/lib/asaas/config";
import { PlanPicker } from "./_components/plan-picker";

export default async function AssinarPage() {
  const { membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  const isGestor = membership.role === "gestor";

  if (!isGestor) {
    return (
      <div className="mx-auto grid w-full max-w-2xl gap-4">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Assinar plano
        </h1>
        <Card className="grid gap-2 p-6">
          <div className="flex items-center gap-2 text-[var(--color-text-warning-primary)]">
            <WarningCircleIcon size={28} weight="duotone" />
            <span className="text-text-md font-semibold">Acesso restrito</span>
          </div>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            Apenas o gestor da barbearia pode escolher e contratar um plano.
          </p>
        </Card>
      </div>
    );
  }

  const billing = await getBarbershopBillingState(shopId);

  // Já tem assinatura ativa/trial → manda pra regularizar (que mostra fatura aberta)
  if (billing.kind === "ok" || billing.kind === "warn") {
    redirect("/app/regularizar");
  }
  // Caso shop_suspended/cancelled — só suporte resolve
  if (
    billing.kind === "blocked" &&
    (billing.reason === "shop_suspended" || billing.reason === "shop_cancelled")
  ) {
    redirect("/app/regularizar");
  }

  const supabase = await createClient();
  const [{ data: plans }, gateway] = await Promise.all([
    supabase
      .from("plans")
      .select(
        "id, slug, name, description, price_cents, billing_cycle, trial_days, features, sort_order"
      )
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("price_cents", { ascending: true }),
    getAsaasConfigStatus(),
  ]);

  const planList =
    (plans ?? []).map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description ?? null,
      price_cents: p.price_cents,
      billing_cycle: p.billing_cycle as "monthly" | "quarterly" | "yearly",
      trial_days: p.trial_days ?? 0,
      features: Array.isArray(p.features) ? (p.features as string[]) : [],
    }));

  const trialExpired =
    billing.kind === "blocked" && billing.reason === "trial_expired";

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Escolha seu plano
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          {trialExpired
            ? "Seu período de avaliação acabou. Selecione um plano para continuar usando."
            : "Selecione um plano para ativar a cobrança recorrente via PIX."}
        </p>
      </div>

      {!gateway.configured ? (
        <Card className="grid gap-2 border-l-4 border-l-[var(--color-warning-500)] p-5">
          <div className="flex items-center gap-2">
            <InfoIcon
              size={28}
              weight="duotone"
              className="text-[var(--color-text-warning-primary)]"
            />
            <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Pagamento indisponível no momento
            </span>
          </div>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            O gateway de pagamento ainda não está configurado pelo time ZP Barber.
            Tente novamente em alguns minutos ou{" "}
            <a
              href="mailto:contato@barberramos.com.br"
              className="font-semibold text-[var(--color-text-brand-secondary)] underline"
            >
              fale conosco
            </a>
            .
          </p>
        </Card>
      ) : (
        <PlanPicker plans={planList} />
      )}

      <Card className="flex items-start gap-3 p-4">
        <CreditCardIcon
          size={28}
          weight="duotone"
          className="mt-0.5 shrink-0 text-[var(--color-fg-secondary)]"
        />
        <div className="grid gap-1">
          <p className="text-text-sm font-semibold text-[var(--color-text-primary)]">
            Como funciona
          </p>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            Após escolher o plano, geramos uma fatura PIX no Asaas. Você paga
            pelo QR Code (em <Link href="/app/regularizar" className="font-semibold underline">Regularizar</Link>) e seu acesso é
            liberado automaticamente em até 1 minuto.
          </p>
        </div>
      </Card>
    </div>
  );
}
