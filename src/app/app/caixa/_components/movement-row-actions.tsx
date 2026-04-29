"use client";

import { useActionState, useEffect } from "react";
import { TrashIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";
import { deleteCashMovementAction } from "../../financeiro/actions";

type State = { error?: string; ok?: boolean };

export function DeleteMovementButton({ id }: { id: string }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    deleteCashMovementAction,
    {}
  );
  useEffect(() => {
    if (state.ok) notify.success("Movimento excluído");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Excluir este movimento?")) e.preventDefault();
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
        <TrashIcon size={18} weight="duotone" />
      </Button>
    </form>
  );
}
