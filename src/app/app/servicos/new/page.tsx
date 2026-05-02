import { ArrowLeftIcon, ScissorsIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { ServiceForm } from "../service-form";
import { createServiceAction } from "../actions";

export default async function NewServicePage() {
  const { membership } = await requireBarbershop();
  if (!can(membership, "servicos.gerenciar")) redirect("/app/servicos");

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-6">
      <div className="grid gap-1">
        <Link
          href="/app/servicos"
          className="mb-2 inline-flex items-center gap-1 text-text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeftIcon size={28} weight="duotone" />
          Serviços
        </Link>
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Novo serviço
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Defina nome, duração e preço de um novo serviço.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
              <ScissorsIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Detalhes</CardTitle>
              <CardDescription>Preço, duração e comissão.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ServiceForm
            action={createServiceAction}
            submitLabel="Criar serviço"
            redirectTo="/app/servicos"
          />
        </CardContent>
      </Card>
    </div>
  );
}
