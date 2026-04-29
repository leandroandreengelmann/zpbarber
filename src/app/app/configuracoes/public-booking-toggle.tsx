"use client";

import { useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { togglePublicBookingAction } from "./actions";

type Props = {
  initialEnabled: boolean;
  disabled?: boolean;
  slug: string;
};

export function PublicBookingToggle({ initialEnabled, disabled, slug }: Props) {
  const [pending, startTransition] = useTransition();

  function handleToggle(next: boolean) {
    const fd = new FormData();
    fd.set("enabled", next ? "true" : "false");
    startTransition(async () => {
      await togglePublicBookingAction(fd);
    });
  }

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-4 py-3">
        <div className="grid gap-0.5">
          <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
            Aceitar agendamentos pelo site público
          </span>
          <span className="text-text-xs text-[var(--color-text-tertiary)]">
            Quando ligado, clientes podem marcar horário em barberramos.com.br/{slug}/agendar
          </span>
        </div>
        <Switch
          defaultChecked={initialEnabled}
          disabled={disabled || pending}
          onCheckedChange={handleToggle}
        />
      </div>
    </div>
  );
}
