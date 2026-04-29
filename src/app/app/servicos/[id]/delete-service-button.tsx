"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@phosphor-icons/react";
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
import { notify } from "@/components/ui/toast";
import { deleteServiceAction } from "../actions";

export function DeleteServiceButton({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleConfirm() {
    startTransition(async () => {
      try {
        await deleteServiceAction(id);
        notify.success("Serviço removido", {
          description: "Não aparece mais no catálogo.",
        });
        router.push("/app/servicos");
      } catch (e) {
        notify.error("Não foi possível remover", {
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
          <DialogTitle>Excluir serviço</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir <strong>{name}</strong>? Se este
            serviço já foi vendido, ele será apenas desativado para preservar o
            histórico — caso contrário, será excluído permanentemente.
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
            {pending ? "Excluindo..." : "Excluir serviço"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
