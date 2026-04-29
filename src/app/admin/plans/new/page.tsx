import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlanForm } from "../plan-form";
import { createPlanAction } from "../actions";

export default function NewPlanPage() {
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
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Novo plano
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Defina preço, ciclo e recursos.
          </p>
        </div>
      </div>
      <Card className="p-6">
        <PlanForm action={createPlanAction} submitLabel="Criar plano" />
      </Card>
    </div>
  );
}
