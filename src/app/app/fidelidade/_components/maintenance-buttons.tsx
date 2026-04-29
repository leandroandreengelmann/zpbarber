"use client";

import { useActionState, useEffect } from "react";
import { CakeIcon, ClockCounterClockwiseIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";
import {
  awardBirthdayBonusAction,
  expireOldPointsAction,
} from "../actions";

type State = { error?: string; ok?: boolean };

function ActionButton({
  action,
  label,
  icon,
  successMsg,
  confirmMsg,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  label: string;
  icon: React.ReactNode;
  successMsg: string;
  confirmMsg: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    action,
    {}
  );
  useEffect(() => {
    if (state.ok) notify.success(successMsg);
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state, successMsg]);
  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm(confirmMsg)) e.preventDefault();
      }}
    >
      <Button type="submit" variant="outline" size="sm" disabled={pending}>
        {icon}
        {pending ? "Processando..." : label}
      </Button>
    </form>
  );
}

export function MaintenanceButtons() {
  return (
    <div className="flex flex-wrap gap-2">
      <ActionButton
        action={awardBirthdayBonusAction}
        label="Aplicar bônus de aniversário"
        successMsg="Bônus de aniversário aplicado"
        confirmMsg="Aplicar bônus para clientes aniversariantes do mês?"
        icon={<CakeIcon size={20} weight="duotone" />}
      />
      <ActionButton
        action={expireOldPointsAction}
        label="Expirar pontos antigos"
        successMsg="Pontos antigos expirados"
        confirmMsg="Marcar como expirados todos os pontos vencidos?"
        icon={<ClockCounterClockwiseIcon size={20} weight="duotone" />}
      />
    </div>
  );
}
