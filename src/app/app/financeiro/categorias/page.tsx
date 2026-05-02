import { redirect } from "next/navigation";
import { PlusIcon, TagIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import type { CategoryColor } from "@/lib/zod/financeiro";
import { saveExpenseCategoryAction } from "../actions";
import { CategoryForm } from "./_components/category-form";
import { CategoryCard, CategoryRow } from "./_components/category-row";

export default async function CategoriasPage() {
  const { membership } = await requireBarbershop();
  if (!can(membership, "financeiro.gerenciar")) redirect("/app/financeiro");
  const shopId = membership.barbershop!.id;
  const supabase = await createClient();

  const { data } = await supabase
    .from("expense_categories")
    .select("id, name, color, is_active")
    .eq("barbershop_id", shopId)
    .order("name");

  const items = (data ?? []).map((c) => ({
    ...c,
    color: c.color as CategoryColor,
  }));

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Categorias de despesa
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Organize as despesas por tipo (Aluguel, Produtos, Marketing…).
          </p>
        </div>
        <Dialog>
          <DialogTrigger
            className={buttonVariants({ size: "lg", className: "h-11 w-full sm:w-auto" })}
          >
            <PlusIcon size={28} weight="duotone" />
            Nova categoria
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova categoria</DialogTitle>
              <DialogDescription>
                Use cores para identificar rapidamente.
              </DialogDescription>
            </DialogHeader>
            <CategoryForm action={saveExpenseCategoryAction} />
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <Card className="p-0">
          <CardContent className="p-0">
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                <TagIcon size={28} weight="duotone" />
              </div>
              <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                Nenhuma categoria ainda
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <ul className="grid gap-3 sm:hidden">
            {items.map((c) => (
              <li key={c.id}>
                <CategoryCard category={c} />
              </li>
            ))}
          </ul>
          <Card className="hidden p-0 sm:block">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[var(--color-bg-secondary)] text-left">
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((c) => (
                      <CategoryRow key={c.id} category={c} />
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
