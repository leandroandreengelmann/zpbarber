"use client";

import { useActionState, useEffect } from "react";
import { TrashIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";

type State = { error?: string; ok?: boolean };

export function DeleteCategoryButton({
  id,
  action,
}: {
  id: string;
  action: (prev: State, fd: FormData) => Promise<State>;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    action,
    {}
  );

  useEffect(() => {
    if (state.ok) notify.success("Categoria excluída");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Excluir esta categoria? Despesas vinculadas ficarão sem categoria.")) {
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
        <TrashIcon size={20} weight="duotone" />
        Excluir
      </Button>
    </form>
  );
}
