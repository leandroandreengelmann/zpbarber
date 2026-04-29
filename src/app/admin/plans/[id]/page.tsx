import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArchiveIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { PlanForm } from "../plan-form";
import { archivePlanAction, updatePlanAction } from "../actions";

export default async function EditPlanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("plans").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  const { count: subsCount } = await supabase
    .from("subscriptions")
    .select("*", { count: "exact", head: true })
    .eq("plan_id", id)
    .in("status", ["trialing", "active", "past_due"]);

  const updateBound = updatePlanAction.bind(null, id);
  const archiveBound = archivePlanAction.bind(null, id);

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Link
          href="/admin/plans"
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
            className: "w-fit",
          })}
        >
          <ArrowLeftIcon size={20} weight="duotone" />
          Voltar
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="grid gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
                {data.name}
              </h1>
              <Badge variant={data.is_active ? "default" : "outline"}>
                {data.is_active ? "Ativo" : "Arquivado"}
              </Badge>
            </div>
            <p className="text-text-md text-[var(--color-text-tertiary)]">
              {subsCount ?? 0} barbearia(s) com assinatura ativa neste plano.
            </p>
          </div>
          {data.is_active && (
            <form action={archiveBound}>
              <button
                type="submit"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <ArchiveIcon size={20} weight="duotone" />
                Arquivar
              </button>
            </form>
          )}
        </div>
      </div>

      <Card className="p-6">
        <PlanForm
          action={updateBound}
          initial={{
            slug: data.slug,
            name: data.name,
            description: data.description,
            price_cents: data.price_cents,
            billing_cycle: data.billing_cycle,
            trial_days: data.trial_days,
            max_barbers: data.max_barbers,
            max_whatsapp_messages_per_month: data.max_whatsapp_messages_per_month,
            features: Array.isArray(data.features) ? (data.features as string[]) : [],
            is_active: data.is_active,
            sort_order: data.sort_order,
          }}
          submitLabel="Salvar alterações"
        />
      </Card>
    </div>
  );
}
