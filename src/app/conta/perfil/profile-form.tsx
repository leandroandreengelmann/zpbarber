"use client";

import { useActionState, useState } from "react";
import {
  CheckCircleIcon,
  FloppyDiskIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateClientProfileAction } from "./actions";

type State = { error?: string; ok?: boolean };

export function ProfileForm({
  initialName,
  initialPhone,
}: {
  initialName: string;
  initialPhone: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    updateClientProfileAction,
    {}
  );
  const [phone, setPhone] = useState(initialPhone);

  return (
    <form action={formAction} className="grid gap-5">
      {state.error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          <WarningCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}
      {state.ok && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-success-subtle)] bg-[var(--color-success-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-success-primary)]">
          <CheckCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
          <span>Perfil atualizado.</span>
        </div>
      )}

      <div className="grid gap-1.5">
        <Label htmlFor="full_name">Nome completo</Label>
        <Input
          id="full_name"
          name="full_name"
          required
          defaultValue={initialName}
          minLength={2}
          maxLength={120}
          autoComplete="name"
          className="h-11"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="phone">WhatsApp</Label>
        <Input
          id="phone"
          name="phone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-11"
        />
        <p className="text-text-xs text-[var(--color-text-tertiary)]">
          Mudou de número? Vamos vincular seus agendamentos antigos automaticamente.
        </p>
      </div>

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full font-semibold sm:w-fit"
      >
        <FloppyDiskIcon size={28} weight="duotone" />
        {pending ? "Salvando..." : "Salvar alterações"}
      </Button>
    </form>
  );
}
