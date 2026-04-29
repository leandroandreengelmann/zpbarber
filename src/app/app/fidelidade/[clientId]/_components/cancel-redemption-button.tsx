"use client";

import { useActionState, useEffect } from "react";
import { XIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";
import { cancelRedemptionAction } from "../../actions";

type State = { error?: string; ok?: boolean };

export function CancelRedemptionButton({ id }: { id: string }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    cancelRedemptionAction,
    {}
  );
  useEffect(() => {
    if (state.ok) notify.success("Resgate cancelado");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Cancelar este resgate? Os pontos voltam para o cliente.")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        disabled={pending}
        className="text-[var(--color-text-error-primary)]"
      >
        <XIcon size={18} weight="bold" />
        Cancelar
      </Button>
    </form>
  );
}
