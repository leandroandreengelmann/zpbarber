"use client";

import { useActionState, useEffect } from "react";
import {
  EnvelopeSimpleIcon,
  FloppyDiskIcon,
  NotePencilIcon,
  PhoneIcon,
  UserCircleIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { Switch } from "@/components/ui/switch";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type State = { error?: string; ok?: boolean };

export type ClientInitial = {
  full_name: string;
  phone: string | null;
  email: string | null;
  notes: string | null;
  accepts_whatsapp?: boolean;
};

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

export function ClientForm({
  action,
  initial,
  submitLabel,
  successMessage,
  onSuccess,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initial?: ClientInitial;
  submitLabel?: string;
  successMessage?: string;
  onSuccess?: () => void;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  useEffect(() => {
    if (state.ok) {
      notify.success(successMessage ?? "Cliente salvo", {
        description: "Os dados foram atualizados.",
      });
      onSuccess?.();
    }
    if (state.error) {
      notify.error("Não foi possível salvar", { description: state.error });
    }
  }, [state, successMessage, onSuccess]);

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
            defaultValue={initial?.full_name ?? ""}
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
              defaultValue={initial?.phone ?? ""}
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
              defaultValue={initial?.email ?? ""}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Observações</Label>
        <div className="relative">
          <FieldIcon Icon={NotePencilIcon} />
          <Input
            id="notes"
            name="notes"
            placeholder="Preferências, alergias, lembretes..."
            defaultValue={initial?.notes ?? ""}
            className="pl-10"
          />
        </div>
      </div>
      <label
        htmlFor="accepts_whatsapp"
        className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3.5"
      >
        <Switch
          id="accepts_whatsapp"
          name="accepts_whatsapp"
          value="on"
          defaultChecked={initial?.accepts_whatsapp ?? true}
          className="mt-0.5"
        />
        <div className="grid gap-0.5">
          <span className="inline-flex items-center gap-1.5 text-text-sm font-medium text-[var(--color-text-primary)]">
            <WhatsappLogoIcon size={20} weight="duotone" className="text-[#25D366]" />
            Aceita receber mensagens no WhatsApp
          </span>
          <span className="text-text-xs text-[var(--color-text-tertiary)]">
            Confirmações, lembretes, pós-serviço e felicitações de aniversário.
            O cliente pode pedir pra parar a qualquer momento respondendo PARAR.
          </span>
        </div>
      </label>
      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className="h-11">
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : (submitLabel ?? "Salvar cliente")}
        </Button>
      </div>
    </form>
  );
}
