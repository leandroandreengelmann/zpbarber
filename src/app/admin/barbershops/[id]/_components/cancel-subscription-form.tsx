"use client";

import { useActionState, useEffect, useState } from "react";
import { ProhibitIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { cancelBarbershopSubscriptionAction } from "../subscription-actions";

type State = { error?: string; ok?: boolean };

export function CancelSubscriptionForm({
  barbershopId,
  subscriptionId,
}: {
  barbershopId: string;
  subscriptionId: string;
}) {
  const action = cancelBarbershopSubscriptionAction.bind(null, barbershopId);
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state.ok) {
      notify.success("Assinatura cancelada");
      setOpen(false);
    }
    if (state.error) notify.error("Falha", { description: state.error });
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" className="text-[var(--color-text-error-primary)]">
            <ProhibitIcon size={20} weight="duotone" />
            Cancelar assinatura
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancelar assinatura</DialogTitle>
          <DialogDescription>
            A cobrança recorrente para no Asaas. Invoices em aberto continuam
            com seu status atual.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4">
          <input type="hidden" name="subscription_id" value={subscriptionId} />
          <div className="grid gap-1.5">
            <Label htmlFor="reason">Motivo (opcional)</Label>
            <textarea
              id="reason"
              name="reason"
              rows={3}
              placeholder="Ex.: barbearia migrou de plano, inadimplência, encerramento."
              className="w-full rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 text-text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-blue-500)] focus:ring-2 focus:ring-[var(--color-blue-100)]"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={pending}
            >
              {pending ? "Cancelando..." : "Confirmar cancelamento"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
