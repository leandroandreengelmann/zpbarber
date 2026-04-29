"use client";

import { useActionState, useEffect } from "react";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";
import { backfillInvoicesFromAsaasAction } from "../actions";

type State = { error?: string; ok?: boolean; created?: number };

export function BackfillButton() {
  const [state, action, pending] = useActionState<State, FormData>(
    async (prev) => backfillInvoicesFromAsaasAction(prev),
    {}
  );

  useEffect(() => {
    if (state.ok) {
      notify.success("Sincronizado com Asaas", {
        description:
          state.created && state.created > 0
            ? `${state.created} invoice(s) atualizada(s)/criada(s).`
            : "Nenhuma invoice nova.",
      });
    }
    if (state.error) notify.error("Falha", { description: state.error });
  }, [state]);

  return (
    <form action={action}>
      <Button type="submit" variant="outline" disabled={pending}>
        <ArrowsClockwiseIcon size={20} weight="duotone" />
        {pending ? "Sincronizando..." : "Sincronizar com Asaas"}
      </Button>
    </form>
  );
}
