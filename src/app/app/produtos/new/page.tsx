import { ArrowLeftIcon, PackageIcon } from "@phosphor-icons/react/dist/ssr";
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
import { ProductForm } from "../product-form";
import { createProductAction } from "../actions";

export default async function NewProductPage() {
  const { membership } = await requireBarbershop();
  if (membership.role !== "gestor") redirect("/app/produtos");

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-6">
      <div className="grid gap-1">
        <Link
          href="/app/produtos"
          className="mb-2 inline-flex items-center gap-1 text-text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeftIcon size={28} weight="duotone" />
          Produtos
        </Link>
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Novo produto
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Cadastre um novo item de catálogo e estoque.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
              <PackageIcon size={28} weight="duotone" />
            </div>
            <div>
              <CardTitle>Detalhes</CardTitle>
              <CardDescription>Catálogo, preço e estoque.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ProductForm
            action={createProductAction}
            submitLabel="Criar produto"
            redirectTo="/app/produtos"
          />
        </CardContent>
      </Card>
    </div>
  );
}
