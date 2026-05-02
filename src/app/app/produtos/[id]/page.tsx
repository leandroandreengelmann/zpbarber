import {
  ArrowLeftIcon,
  PackageIcon,
} from "@phosphor-icons/react/dist/ssr";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { ProductForm } from "../product-form";
import { updateProductAction } from "../actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeleteProductButton } from "./delete-product-button";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { membership } = await requireBarbershop();
  if (!can(membership, "produtos.gerenciar")) redirect("/app/produtos");

  const supabase = await createClient();
  const { data: prod } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!prod) notFound();

  const update = updateProductAction.bind(null, id);

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <Link
            href="/app/produtos"
            className="mb-2 inline-flex items-center gap-1 text-text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
          >
            <ArrowLeftIcon size={28} weight="duotone" />
            Produtos
          </Link>
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            {prod.name}
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Editar produto cadastrado.
          </p>
        </div>
        <DeleteProductButton id={prod.id} name={prod.name} />
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
          <ProductForm action={update} initial={prod} submitLabel="Salvar alterações" />
        </CardContent>
      </Card>
    </div>
  );
}
