"use client";

import { useActionState, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  LockKeyIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setNewClientPasswordAction } from "./actions";

type State = { error?: string };

export function ClientResetForm() {
  const [state, formAction, pending] = useActionState<State, FormData>(
    setNewClientPasswordAction,
    {}
  );
  const [visible, setVisible] = useState(false);

  return (
    <form action={formAction} className="grid gap-5">
      {state.error && (
        <div className="rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          {state.error}
        </div>
      )}

      <div className="grid gap-1.5">
        <Label htmlFor="password">Nova senha</Label>
        <div className="relative">
          <LockKeyIcon
            size={28}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            id="password"
            name="password"
            type={visible ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            className="h-11 pl-9 pr-10 text-text-md"
            placeholder="Mínimo 8 caracteres"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[var(--color-fg-quaternary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg-secondary)]"
          >
            {visible ? (
              <EyeSlashIcon size={20} weight="duotone" />
            ) : (
              <EyeIcon size={20} weight="duotone" />
            )}
          </button>
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="confirm">Confirmar nova senha</Label>
        <div className="relative">
          <LockKeyIcon
            size={28}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            id="confirm"
            name="confirm"
            type={visible ? "text" : "password"}
            required
            minLength={8}
            autoComplete="new-password"
            className="h-11 pl-9 text-text-md"
            placeholder="Repita a senha"
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-1 h-11 w-full font-semibold"
        disabled={pending}
      >
        <KeyIcon size={28} weight="duotone" />
        {pending ? "Salvando..." : "Definir nova senha"}
      </Button>
    </form>
  );
}
