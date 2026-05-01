"use client";

import { useActionState } from "react";
import {
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateClientEmailAction } from "./actions";

type State = { error?: string; ok?: boolean; message?: string };

export function EmailForm({ currentEmail }: { currentEmail: string }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    updateClientEmailAction,
    {}
  );

  return (
    <form action={formAction} className="grid gap-4">
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

      <div className="grid gap-1.5">
        <Label htmlFor="current_email">E-mail atual</Label>
        <Input
          id="current_email"
          type="email"
          value={currentEmail}
          disabled
          className="h-11 bg-[var(--color-bg-secondary)]"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="new_email">Novo e-mail</Label>
        <Input
          id="new_email"
          name="new_email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="seu-novo@email.com"
          className="h-11"
        />
        <p className="text-text-xs text-[var(--color-text-tertiary)]">
          Você receberá um link de confirmação no novo e-mail. A alteração só vale após clicar nele.
        </p>
      </div>

      <Button
        type="submit"
        disabled={pending}
        variant="outline"
        className="h-11 w-full font-semibold sm:w-fit"
      >
        <EnvelopeSimpleIcon size={20} weight="duotone" />
        {pending ? "Enviando..." : "Atualizar e-mail"}
      </Button>
    </form>
  );
}
