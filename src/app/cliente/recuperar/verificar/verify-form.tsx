"use client";

import { useActionState, useRef } from "react";
import { CheckCircleIcon, KeyIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyClientOtpAction } from "./actions";

type State = { error?: string };

export function ClientVerifyForm({ email }: { email: string }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    verifyClientOtpAction,
    {}
  );
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="email" value={email} />

      {state.error && (
        <div className="rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          {state.error}
        </div>
      )}

      <div className="grid gap-1.5">
        <Label htmlFor="token">Código recebido por e-mail</Label>
        <Input
          ref={inputRef}
          id="token"
          name="token"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          maxLength={8}
          minLength={6}
          pattern="\d{6,8}"
          autoFocus
          className="h-12 text-center text-display-xs font-semibold tracking-[0.4em] tabular-nums"
          placeholder="00000000"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-1 h-11 w-full font-semibold"
        disabled={pending}
      >
        {pending ? (
          <>
            <KeyIcon size={28} weight="duotone" />
            Verificando...
          </>
        ) : (
          <>
            <CheckCircleIcon size={28} weight="duotone" />
            Verificar código
          </>
        )}
      </Button>
    </form>
  );
}
