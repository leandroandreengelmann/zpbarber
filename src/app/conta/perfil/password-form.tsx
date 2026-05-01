"use client";

import { useActionState, useRef, useState } from "react";
import {
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateClientPasswordAction } from "./actions";

type State = { error?: string; ok?: boolean; message?: string };

export function PasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<State, FormData>(
    async (prev, fd) => {
      const result = await updateClientPasswordAction(prev, fd);
      if (result.ok) formRef.current?.reset();
      return result;
    },
    {}
  );

  return (
    <form ref={formRef} action={formAction} className="grid gap-4">
      {state.error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          <WarningCircleIcon size={20} weight="duotone" className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}
      {state.ok && state.message && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-success-subtle)] bg-[var(--color-success-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-success-primary)]">
          <CheckCircleIcon size={20} weight="duotone" className="mt-0.5 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <PasswordField
        id="current_password"
        name="current_password"
        label="Senha atual"
        autoComplete="current-password"
        required
      />
      <PasswordField
        id="new_password"
        name="new_password"
        label="Nova senha"
        autoComplete="new-password"
        required
        minLength={8}
        hint="Mínimo 8 caracteres."
      />
      <PasswordField
        id="confirm_password"
        name="confirm_password"
        label="Confirmar nova senha"
        autoComplete="new-password"
        required
        minLength={8}
      />

      <Button
        type="submit"
        disabled={pending}
        variant="outline"
        className="h-11 w-full font-semibold sm:w-fit"
      >
        <LockKeyIcon size={20} weight="duotone" />
        {pending ? "Alterando..." : "Alterar senha"}
      </Button>
    </form>
  );
}

function PasswordField({
  id,
  name,
  label,
  autoComplete,
  required,
  minLength,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
  hint?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <LockKeyIcon
          size={20}
          weight="duotone"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
        />
        <Input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          required={required}
          minLength={minLength}
          autoComplete={autoComplete}
          className="h-11 pl-9 pr-10"
          placeholder="••••••••"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[var(--color-fg-quaternary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg-secondary)]"
        >
          {visible ? (
            <EyeSlashIcon size={18} weight="duotone" />
          ) : (
            <EyeIcon size={18} weight="duotone" />
          )}
        </button>
      </div>
      {hint && (
        <p className="text-text-xs text-[var(--color-text-tertiary)]">{hint}</p>
      )}
    </div>
  );
}
