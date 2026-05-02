import {
  ArrowLeftIcon,
  ScissorsIcon,
} from "@phosphor-icons/react/dist/ssr";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { ServiceForm } from "../service-form";
import { updateServiceAction } from "../actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteServiceButton } from "./delete-service-button";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { membership } = await requireBarbershop();
  if (!can(membership, "servicos.gerenciar")) redirect("/app/servicos");

  const supabase = await createClient();
  const { data: svc } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!svc) notFound();

  const update = updateServiceAction.bind(null, id);

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <Link
            href="/app/servicos"
            className="mb-2 inline-flex items-center gap-1 text-text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
          >
            <ArrowLeftIcon size={28} weight="duotone" />
            Serviços
          </Link>
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            {svc.name}
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Editar serviço cadastrado.
          </p>
        </div>
        <DeleteServiceButton id={svc.id} name={svc.name} />
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
          <ServiceForm action={update} initial={svc} submitLabel="Salvar alterações" />
        </CardContent>
      </Card>
    </div>
  );
}
