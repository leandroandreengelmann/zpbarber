"use client";

import { useActionState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";
import { toggleReviewHiddenAction } from "../actions";

type State = { error?: string; ok?: boolean };

export function ToggleHidden({ reviewId, hidden }: { reviewId: string; hidden: boolean }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    toggleReviewHiddenAction,
    {}
  );

  useEffect(() => {
    if (state.ok) notify.success(hidden ? "Avaliação exibida" : "Avaliação oculta");
    else if (state.error) notify.error("Erro", { description: state.error });
  }, [state, hidden]);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={reviewId} />
      <input type="hidden" name="hidden" value={hidden ? "false" : "true"} />
      <Button type="submit" variant="outline" size="sm" disabled={pending}>
        {hidden ? (
          <>
            <EyeIcon size={20} weight="duotone" />
            Exibir
          </>
        ) : (
          <>
            <EyeSlashIcon size={20} weight="duotone" />
            Ocultar
          </>
        )}
      </Button>
    </form>
  );
}
