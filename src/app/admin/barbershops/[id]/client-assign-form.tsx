"use client";

import { useActionState, useEffect } from "react";
import { EnvelopeSimpleIcon, LinkSimpleIcon } from "@phosphor-icons/react";
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

export function ClientAssignForm({
  action,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  useEffect(() => {
    if (state.ok) notify.success("Membro vinculado", { description: "Já tem acesso à barbearia." });
    if (state.error) notify.error("Não foi possível vincular", { description: state.error });
  }, [state]);

  return (
    <form action={formAction} className="grid gap-3 md:grid-cols-[1fr_200px_auto] md:items-end">
      <div className="grid gap-1.5">
        <Label htmlFor="assign-email">E-mail</Label>
        <div className="relative">
          <EnvelopeSimpleIcon
            size={28}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            id="assign-email"
            name="email"
            type="email"
            required
            placeholder="usuario@dominio.com"
            className="pl-10"
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="assign-role">Papel</Label>
        <Select name="role" defaultValue="gestor">
          <SelectTrigger id="assign-role">
            <SelectValue placeholder="Selecione o papel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gestor">Gestor</SelectItem>
            <SelectItem value="recepcionista">Recepcionista</SelectItem>
            <SelectItem value="barbeiro">Barbeiro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={pending} className="h-11">
        <LinkSimpleIcon size={28} weight="duotone" />
        {pending ? "Atribuindo..." : "Atribuir"}
      </Button>
    </form>
  );
}
