"use client";

import { useActionState, useEffect } from "react";
import {
  EnvelopeSimpleIcon,
  FloppyDiskIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type State = { error?: string; ok?: boolean };

function FieldIcon({ Icon }: { Icon: typeof UserCircleIcon }) {
  return (
    <Icon
      size={28}
      weight="duotone"
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
    />
  );
}

function RequiredMark() {
  return (
    <span
      aria-hidden="true"
      className="text-[var(--color-error-600)]"
      title="Obrigatório"
    >
      *
    </span>
  );
}

export function ClientQuickForm({
  action,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  useEffect(() => {
    if (state.ok) {
      notify.success("Cliente cadastrado", {
        description: "Já aparece na busca.",
      });
    }
    if (state.error) {
      notify.error("Não foi possível cadastrar", { description: state.error });
    }
  }, [state]);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="full_name">
          Nome <RequiredMark />
        </Label>
        <div className="relative">
          <FieldIcon Icon={UserCircleIcon} />
          <Input
            id="full_name"
            name="full_name"
            required
            placeholder="João da Silva"
            className="pl-10"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="phone">
            Telefone <RequiredMark />
          </Label>
          <div className="relative">
            <FieldIcon Icon={PhoneIcon} />
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              minLength={8}
              placeholder="(11) 90000-0000"
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <FieldIcon Icon={EnvelopeSimpleIcon} />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="cliente@email.com"
              className="pl-10"
            />
          </div>
        </div>
      </div>
      <div className="sticky bottom-[-1rem] -mx-4 -mb-1 flex justify-end border-t border-[var(--color-border-secondary)] bg-popover px-4 pb-2 pt-3 sm:static sm:m-0 sm:border-0 sm:bg-transparent sm:p-0">
        <Button type="submit" disabled={pending} className="h-11 w-full sm:w-auto">
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : "Cadastrar cliente"}
        </Button>
      </div>
    </form>
  );
}
