"use client";

import { useActionState, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  UserPlusIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupClientAction } from "./actions";

type State = { error?: string; ok?: boolean };

export function ClientSignupForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    signupClientAction,
    {}
  );
  const [phone, setPhone] = useState("");
  const [pwVisible, setPwVisible] = useState(false);

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="next" value={next} />

      {state.error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          <WarningCircleIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="grid gap-1.5">
        <Label htmlFor="full_name">Seu nome</Label>
        <Input
          id="full_name"
          name="full_name"
          required
          minLength={2}
          maxLength={120}
          placeholder="João da Silva"
          autoComplete="name"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="voce@email.com"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="phone">WhatsApp</Label>
        <Input
          id="phone"
          name="phone"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <p className="text-text-xs text-[var(--color-text-tertiary)]">
          Vinculamos seus agendamentos antigos pelo número. Você recebe lembretes por aqui.
        </p>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="password">Senha</Label>
        <div className="relative">
          <LockKeyIcon
            size={28}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            id="password"
            name="password"
            type={pwVisible ? "text" : "password"}
            required
            minLength={8}
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
            className="h-11 pl-9 pr-10 text-text-md"
          />
          <button
            type="button"
            onClick={() => setPwVisible((v) => !v)}
            aria-label={pwVisible ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[var(--color-fg-quaternary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg-secondary)]"
          >
            {pwVisible ? (
              <EyeSlashIcon size={20} weight="duotone" />
            ) : (
              <EyeIcon size={20} weight="duotone" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="mt-1 h-11 w-full font-semibold"
      >
        <UserPlusIcon size={28} weight="duotone" />
        {pending ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
