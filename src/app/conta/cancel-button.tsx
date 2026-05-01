"use client";

import { useActionState } from "react";
import { XCircleIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cancelMyAppointmentAction } from "./actions";

type State = { error?: string; ok?: boolean };

export function CancelAppointmentButton({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    cancelMyAppointmentAction,
    {}
  );

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Cancelar este agendamento?")) e.preventDefault();
      }}
      className="grid gap-1.5"
    >
      <input type="hidden" name="appointment_id" value={appointmentId} />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        disabled={pending}
        className="text-[var(--color-text-error-primary)]"
      >
        {pending ? (
          <>
            <CircleNotchIcon size={20} weight="bold" className="animate-spin" />
            Cancelando...
          </>
        ) : (
          <>
            <XCircleIcon size={20} weight="duotone" />
            Cancelar
          </>
        )}
      </Button>
      {state.error && (
        <p className="text-text-xs text-[var(--color-text-error-primary)]">
          {state.error}
        </p>
      )}
    </form>
  );
}
