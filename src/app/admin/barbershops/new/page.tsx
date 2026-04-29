import { ArrowLeftIcon, StorefrontIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarbershopForm } from "../barbershop-form";
import { createBarbershopAction } from "../actions";

export default function NewBarbershopPage() {
  return (
    <div className="mx-auto grid w-full max-w-3xl gap-6">
      <div className="grid gap-1">
        <Link
          href="/admin/barbershops"
          className="mb-2 inline-flex items-center gap-1 text-text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeftIcon size={28} weight="duotone" />
          Barbearias
        </Link>
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Nova barbearia
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Após criar, você poderá atribuir um gestor existente.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
              <StorefrontIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Dados da barbearia</CardTitle>
              <CardDescription>
                Informações cadastrais, plano e identidade visual.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BarbershopForm
            action={createBarbershopAction}
            submitLabel="Criar barbearia"
          />
        </CardContent>
      </Card>
    </div>
  );
}
