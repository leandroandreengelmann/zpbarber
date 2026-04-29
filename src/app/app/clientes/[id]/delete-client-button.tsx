"use client";

import { useState, useTransition } from "react";
import { TrashIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteClientAction } from "../actions";

export function DeleteClientButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      try {
        await deleteClientAction(id);
      } catch (e) {
        notify.error("Não foi possível excluir", {
          description: e instanceof Error ? e.message : "Tente novamente.",
        });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className: "text-[var(--color-error-600)] hover:text-[var(--color-error-700)]",
        })}
      >
        <TrashIcon size={20} weight="duotone" />
        Excluir
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir cliente</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir <strong>{name}</strong>? Essa ação
            não pode ser desfeita. Os agendamentos e vendas mantêm o histórico,
            mas perdem o vínculo.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={pending}
          >
            {pending ? "Excluindo..." : "Excluir cliente"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
