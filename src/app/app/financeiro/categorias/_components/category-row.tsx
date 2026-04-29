"use client";

import { useState } from "react";
import { PencilSimpleIcon } from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CATEGORY_COLOR_CLASS,
  type CategoryColor,
} from "@/lib/zod/financeiro";
import {
  deleteExpenseCategoryAction,
  saveExpenseCategoryAction,
} from "../../actions";
import { CategoryForm } from "./category-form";
import { DeleteCategoryButton } from "./delete-button";

type Category = {
  id: string;
  name: string;
  color: CategoryColor;
  is_active: boolean;
};

function CategoryActions({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <PencilSimpleIcon size={20} weight="duotone" />
          Editar
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar categoria</DialogTitle>
          </DialogHeader>
          <CategoryForm
            action={saveExpenseCategoryAction}
            initial={category}
            onSaved={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
      <DeleteCategoryButton
        id={category.id}
        action={deleteExpenseCategoryAction}
      />
    </>
  );
}

export function CategoryRow({ category }: { category: Category }) {
  return (
    <tr className="border-b border-[var(--color-border-secondary)] last:border-b-0">
      <td className="px-6 py-3">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-text-xs font-medium ${
            CATEGORY_COLOR_CLASS[category.color]
          }`}
        >
          {category.name}
        </span>
      </td>
      <td className="px-6 py-3 text-text-sm text-[var(--color-text-tertiary)]">
        {category.is_active ? "Ativa" : "Inativa"}
      </td>
      <td className="px-6 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <CategoryActions category={category} />
        </div>
      </td>
    </tr>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Card className={`p-4 ${!category.is_active ? "opacity-70" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-text-xs font-medium ${
            CATEGORY_COLOR_CLASS[category.color]
          }`}
        >
          {category.name}
        </span>
        <span className="text-text-xs text-[var(--color-text-tertiary)]">
          {category.is_active ? "Ativa" : "Inativa"}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-end gap-1 border-t border-[var(--color-border-secondary)] pt-3">
        <CategoryActions category={category} />
      </div>
    </Card>
  );
}
