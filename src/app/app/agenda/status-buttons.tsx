"use client";

import { useTransition } from "react";
import {
  CheckCircleIcon,
  CheckIcon,
  ProhibitIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import type { AppointmentStatus } from "@/lib/zod/agenda";

export function StatusButtons({
  id,
  status,
  onChange,
}: {
  id: string;
  status: AppointmentStatus;
  onChange: (id: string, status: string) => Promise<void>;
}) {
  const [pending, start] = useTransition();

  function call(next: AppointmentStatus, label: string) {
    start(async () => {
      try {
        await onChange(id, next);
        notify.success(label);
      } catch (e) {
        notify.error("Não foi possível atualizar", {
          description: e instanceof Error ? e.message : "Tente novamente.",
        });
      }
    });
  }

  if (status === "completed" || status === "cancelled" || status === "no_show") {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5">
      {status === "scheduled" && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending}
          onClick={() => call("confirmed", "Confirmado")}
        >
          <CheckIcon size={28} weight="duotone" />
          Confirmar
        </Button>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={pending}
        onClick={() => call("completed", "Concluído")}
      >
        <CheckCircleIcon size={28} weight="duotone" />
        Concluir
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={pending}
        onClick={() => call("no_show", "Marcado como faltou")}
      >
        <ProhibitIcon size={28} weight="duotone" />
        Faltou
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled={pending}
        onClick={() => call("cancelled", "Cancelado")}
      >
        <XCircleIcon size={28} weight="duotone" />
        Cancelar
      </Button>
    </div>
  );
}
