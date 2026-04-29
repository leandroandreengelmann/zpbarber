"use client";

import { useActionState, useEffect } from "react";
import {
  EnvelopeSimpleIcon,
  LockKeyIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type State = { error?: string; ok?: boolean };

export function NewStaffForm({
  action,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  useEffect(() => {
    if (state.ok) notify.success("Membro adicionado", { description: "Já aparece na equipe." });
    if (state.error) notify.error("Não foi possível adicionar", { description: state.error });
  }, [state]);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="full_name">Nome completo</Label>
          <div className="relative">
            <UserCircleIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="full_name"
              name="full_name"
              required
              placeholder="João da Silva"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <EnvelopeSimpleIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="joao@barbearia.com"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password">Senha temporária</Label>
          <div className="relative">
            <LockKeyIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="password"
              name="password"
              type="password"
              minLength={8}
              required
              placeholder="Mínimo 8 caracteres"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="role">Papel</Label>
          <Select name="role" defaultValue="barbeiro">
            <SelectTrigger id="role">
              <SelectValue placeholder="Selecione o papel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="barbeiro">Barbeiro</SelectItem>
              <SelectItem value="recepcionista">Recepcionista</SelectItem>
              <SelectItem value="gestor">Gestor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="sticky bottom-[-1rem] -mx-4 -mb-1 flex justify-end border-t border-[var(--color-border-secondary)] bg-popover px-4 pb-2 pt-3 sm:static sm:m-0 sm:border-0 sm:bg-transparent sm:p-0">
        <Button type="submit" disabled={pending} className="h-11 w-full sm:w-auto">
          <UserPlusIcon size={28} weight="duotone" />
          {pending ? "Adicionando..." : "Adicionar membro"}
        </Button>
      </div>
    </form>
  );
}
