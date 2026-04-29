"use client";

import { useActionState, useEffect } from "react";
import {
  AtIcon,
  BuildingOfficeIcon,
  CalendarBlankIcon,
  EnvelopeSimpleIcon,
  FloppyDiskIcon,
  IdentificationCardIcon,
  PaintBrushIcon,
  PhoneIcon,
  StorefrontIcon,
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

export type BarbershopFormValues = {
  slug: string;
  name: string;
  cnpj: string | null;
  phone: string | null;
  email: string | null;
  status: "trial" | "active" | "suspended" | "cancelled";
  primary_color: string | null;
  trial_ends_at: string | null;
};

function FieldIcon({ Icon }: { Icon: typeof StorefrontIcon }) {
  return (
    <Icon
      size={28}
      weight="duotone"
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
    />
  );
}

export function BarbershopForm({
  action,
  initial,
  submitLabel,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initial?: Partial<BarbershopFormValues>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  useEffect(() => {
    if (state.ok) notify.success("Barbearia salva", { description: "Os dados foram atualizados." });
    if (state.error) notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Nome</Label>
          <div className="relative">
            <FieldIcon Icon={StorefrontIcon} />
            <Input
              id="name"
              name="name"
              required
              defaultValue={initial?.name ?? ""}
              placeholder="Barbearia do João"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="slug">Slug (URL pública)</Label>
          <div className="relative">
            <FieldIcon Icon={AtIcon} />
            <Input
              id="slug"
              name="slug"
              required
              defaultValue={initial?.slug ?? ""}
              placeholder="barbearia-do-joao"
              className="pl-10 font-mono"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="cnpj">CNPJ</Label>
          <div className="relative">
            <FieldIcon Icon={IdentificationCardIcon} />
            <Input
              id="cnpj"
              name="cnpj"
              defaultValue={initial?.cnpj ?? ""}
              placeholder="00.000.000/0000-00"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="phone">Telefone</Label>
          <div className="relative">
            <FieldIcon Icon={PhoneIcon} />
            <Input
              id="phone"
              name="phone"
              defaultValue={initial?.phone ?? ""}
              placeholder="(11) 99999-9999"
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
              defaultValue={initial?.email ?? ""}
              placeholder="contato@barbearia.com"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="status">Status</Label>
          <Select name="status" defaultValue={initial?.status ?? "trial"}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trial">Trial</SelectItem>
              <SelectItem value="active">Ativa</SelectItem>
              <SelectItem value="suspended">Suspensa</SelectItem>
              <SelectItem value="cancelled">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="trial_ends_at">Trial termina em</Label>
          <div className="relative">
            <FieldIcon Icon={CalendarBlankIcon} />
            <Input
              id="trial_ends_at"
              name="trial_ends_at"
              type="date"
              defaultValue={initial?.trial_ends_at ? initial.trial_ends_at.slice(0, 10) : ""}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="primary_color">Cor primária</Label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <FieldIcon Icon={PaintBrushIcon} />
              <Input
                id="primary_color"
                name="primary_color"
                placeholder="#1570ef"
                defaultValue={initial?.primary_color ?? ""}
                className="pl-10 font-mono"
              />
            </div>
            {initial?.primary_color && (
              <div
                aria-hidden
                className="size-11 shrink-0 rounded-lg border border-[var(--color-border-secondary)]"
                style={{ backgroundColor: initial.primary_color }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className="h-11">
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
