"use client";

import { useActionState, useEffect } from "react";
import { FloppyDiskIcon, PercentIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

type State = { error?: string; ok?: boolean };

export function BarberCommissionForm({
  action,
  isCommissioned,
  disabled = false,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  isCommissioned: boolean;
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  useEffect(() => {
    if (state.ok)
      notify.success("Configuração salva", {
        description: "As próximas vendas vão respeitar a nova regra.",
      });
    if (state.error)
      notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  return (
    <form action={formAction} className="grid gap-4">
      <fieldset disabled={disabled || pending} className="grid gap-3">
        <label className="flex items-start justify-between gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-4 py-3.5">
          <div className="flex items-start gap-3">
            <PercentIcon
              size={28}
              weight="duotone"
              className="mt-0.5 text-[var(--color-blue-600)]"
            />
            <div className="grid gap-0.5">
              <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
                Recebe comissão
              </span>
              <span className="text-text-sm text-[var(--color-text-tertiary)]">
                Desligue para barbeiros contratados (CLT) ou para o dono da
                barbearia. Sem comissão, nenhuma venda gera valor a pagar.
              </span>
            </div>
          </div>
          <Switch name="is_commissioned" value="on" defaultChecked={isCommissioned} />
        </label>
      </fieldset>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending || disabled} className="h-11">
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </form>
  );
}
