"use client";

import { useActionState, useState } from "react";
import { CheckCircleIcon, FloppyDiskIcon, TrashIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  TEMPLATE_VARIABLES,
  WHATSAPP_TRIGGERS,
  WHATSAPP_TRIGGER_LABEL,
  type WhatsappTrigger,
} from "@/lib/zod/whatsapp";
import { deleteTemplateAction, upsertTemplateAction } from "../actions";

type State = { error?: string; ok?: boolean };
const initial: State = {};

type Tpl = {
  id?: string;
  slug: string;
  trigger: WhatsappTrigger;
  name: string;
  body: string;
  is_active: boolean;
};

export function TemplateForm({
  template,
  onCancel,
  onSaved,
}: {
  template: Tpl;
  onCancel?: () => void;
  onSaved?: () => void;
}) {
  const [state, action, pending] = useActionState<State, FormData>(
    upsertTemplateAction,
    initial
  );
  const [delState, delAction, delPending] = useActionState<State, FormData>(
    deleteTemplateAction,
    initial
  );
  const [trigger, setTrigger] = useState<WhatsappTrigger>(template.trigger);
  const [body, setBody] = useState(template.body);

  if (state.ok && onSaved) onSaved();

  const variables = TEMPLATE_VARIABLES[trigger] ?? [];

  function insertVar(name: string) {
    const tag = `{${name}}`;
    setBody((b) => `${b}${b.endsWith(" ") || b.length === 0 ? "" : " "}${tag}`);
  }

  return (
    <div className="grid gap-4">
      <form action={action} className="grid gap-4">
        {state.error && (
          <Alert tone="error">{state.error}</Alert>
        )}
        {state.ok && <Alert tone="success">Template salvo.</Alert>}

        {template.id && (
          <input type="hidden" name="id" value={template.id} />
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={template.name}
              placeholder="Confirmação de agendamento"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              required
              pattern="[a-z0-9_]+"
              defaultValue={template.slug}
              placeholder="appointment_confirmation"
              disabled={!!template.id}
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="trigger">Gatilho</Label>
          <select
            id="trigger"
            name="trigger"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value as WhatsappTrigger)}
            className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm"
          >
            {WHATSAPP_TRIGGERS.map((t) => (
              <option key={t} value={t}>
                {WHATSAPP_TRIGGER_LABEL[t]}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="body">Mensagem</Label>
            <span className="text-text-xs text-[var(--color-text-tertiary)]">
              {body.length} caracteres
            </span>
          </div>
          <textarea
            id="body"
            name="body"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className="rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 font-mono text-text-sm leading-relaxed"
            placeholder="Olá {cliente}, ..."
          />
          {variables.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-text-xs text-[var(--color-text-tertiary)]">
                Variáveis:
              </span>
              {variables.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => insertVar(v)}
                  className="rounded-full border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-2.5 py-1 text-text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                >
                  {`{${v}}`}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Switch
            name="is_active"
            value="on"
            defaultChecked={template.is_active}
          />
          <Label className="text-text-sm">Ativo</Label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" disabled={pending}>
            <FloppyDiskIcon size={20} weight="duotone" />
            {pending ? "Salvando..." : "Salvar template"}
          </Button>
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </div>
      </form>

      {template.id && (
        <form action={delAction}>
          <input type="hidden" name="id" value={template.id} />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            disabled={delPending}
            className="text-[var(--color-text-error-primary)] hover:bg-[var(--color-error-50)]"
          >
            <TrashIcon size={16} weight="duotone" />
            {delPending ? "Excluindo..." : "Excluir template"}
          </Button>
          {delState.error && (
            <Alert tone="error">{delState.error}</Alert>
          )}
        </form>
      )}
    </div>
  );
}

function Alert({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: React.ReactNode;
}) {
  const isError = tone === "error";
  return (
    <div
      className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-text-sm ${
        isError
          ? "border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] text-[var(--color-text-error-primary)]"
          : "border-[var(--color-border-success-subtle)] bg-[var(--color-success-25)] text-[var(--color-text-success-primary)]"
      }`}
    >
      {isError ? (
        <WarningCircleIcon size={20} weight="duotone" className="mt-0.5 shrink-0" />
      ) : (
        <CheckCircleIcon size={20} weight="duotone" className="mt-0.5 shrink-0" />
      )}
      <span>{children}</span>
    </div>
  );
}
