"use client";

import { useActionState, useEffect, useState } from "react";
import { ChatTextIcon, FloppyDiskIcon } from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { respondReviewAction } from "../actions";

type State = { error?: string; ok?: boolean };

export function RespondButton({
  reviewId,
  current,
}: {
  reviewId: string;
  current: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState<State, FormData>(
    respondReviewAction,
    {}
  );

  useEffect(() => {
    if (state.ok) {
      notify.success("Resposta enviada");
      setOpen(false);
    } else if (state.error) {
      notify.error("Não foi possível responder", { description: state.error });
    }
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "outline", size: "sm" })}>
        <ChatTextIcon size={20} weight="duotone" />
        {current ? "Editar resposta" : "Responder"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Responder avaliação</DialogTitle>
          <DialogDescription>
            A resposta fica visível para a equipe e poderá aparecer publicamente no futuro.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-3">
          <input type="hidden" name="id" value={reviewId} />
          <div className="grid gap-1.5">
            <Label htmlFor="response">Sua resposta</Label>
            <textarea
              id="response"
              name="response"
              rows={5}
              maxLength={1000}
              defaultValue={current ?? ""}
              required
              className="w-full rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 text-text-md text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-fg-quaternary)] focus:border-[var(--color-blue-500)] focus:ring-2 focus:ring-[var(--color-blue-100)]"
              placeholder="Obrigado pelo feedback! ..."
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={pending}>
              <FloppyDiskIcon size={20} weight="duotone" />
              {pending ? "Salvando..." : "Salvar resposta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
