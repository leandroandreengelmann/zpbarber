"use client";

import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NewSaleForm,
  type SaleClient,
  type SaleProduct,
  type SaleService,
} from "./new-sale-form";
import { createSaleAction } from "../actions";

export function NewSaleDialog({
  clients,
  services,
  products,
}: {
  clients: SaleClient[];
  services: SaleService[];
  products: SaleProduct[];
}) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setFormKey((k) => k + 1);
      }}
    >
      <DialogTrigger
        className={buttonVariants({
          size: "lg",
          className: "col-span-2 h-11 w-full sm:w-auto",
        })}
      >
        <PlusIcon size={28} weight="duotone" />
        Nova venda
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova venda avulsa</DialogTitle>
          <DialogDescription>
            Adicione itens e formas de pagamento.
          </DialogDescription>
        </DialogHeader>
        <NewSaleForm
          key={formKey}
          action={createSaleAction}
          clients={clients}
          services={services}
          products={products}
          onSuccess={() => {
            setOpen(false);
            setFormKey((k) => k + 1);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
