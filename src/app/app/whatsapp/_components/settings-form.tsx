"use client";

import { useActionState } from "react";
import { CheckCircleIcon, FloppyDiskIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { saveSettingsAction } from "../actions";

type State = { error?: string; ok?: boolean };
const initial: State = {};

type Settings = {
  trigger_confirmation: boolean;
  trigger_reminder: boolean;
  trigger_reminder_hours_before: number;
  trigger_post_service: boolean;
  trigger_post_service_delay_hours: number;
  trigger_birthday: boolean;
  trigger_birthday_hour: number;
  business_hours_start: string;
  business_hours_end: string;
  business_hours_only: boolean;
  notify_phone: string;
  notify_enabled: boolean;
  notify_new_appointment: boolean;
  notify_new_payment: boolean;
};

export function SettingsForm({ initial: init }: { initial: Settings }) {
  const [state, action, pending] = useActionState<State, FormData>(
    saveSettingsAction,
    initial
  );

  return (
    <form action={action} className="grid gap-6">
      {state.error && (
        <Alert tone="error">{state.error}</Alert>
      )}
      {state.ok && <Alert tone="success">Configurações salvas.</Alert>}

      <Section title="Gatilhos automáticos" subtitle="Quando o sistema deve disparar mensagens.">
        <ToggleRow
          name="trigger_confirmation"
          label="Confirmação de agendamento"
          help="Envia logo após o agendamento ser criado."
          defaultChecked={init.trigger_confirmation}
        />
        <ToggleRow
          name="trigger_reminder"
          label="Lembrete antes do horário"
          help="Lembra o cliente algumas horas antes."
          defaultChecked={init.trigger_reminder}
        >
          <NumberField
            name="trigger_reminder_hours_before"
            label="Horas antes"
            min={1}
            max={72}
            defaultValue={init.trigger_reminder_hours_before}
          />
        </ToggleRow>
        <ToggleRow
          name="trigger_post_service"
          label="Pós-atendimento"
          help="Envia depois que o atendimento é finalizado."
          defaultChecked={init.trigger_post_service}
        >
          <NumberField
            name="trigger_post_service_delay_hours"
            label="Horas depois"
            min={0}
            max={48}
            defaultValue={init.trigger_post_service_delay_hours}
          />
        </ToggleRow>
        <ToggleRow
          name="trigger_birthday"
          label="Aniversário"
          help="Envia parabéns no dia do aniversário."
          defaultChecked={init.trigger_birthday}
        >
          <NumberField
            name="trigger_birthday_hour"
            label="Hora do envio"
            min={0}
            max={23}
            defaultValue={init.trigger_birthday_hour}
          />
        </ToggleRow>
      </Section>

      <Section
        title="Notificações pro seu WhatsApp"
        subtitle="Receba avisos no seu número particular toda vez que algo importante acontecer."
      >
        <div className="grid gap-1.5">
          <Label htmlFor="notify_phone" className="text-text-xs">
            Seu WhatsApp pessoal (com DDD)
          </Label>
          <Input
            id="notify_phone"
            name="notify_phone"
            placeholder="65 99999-9999"
            defaultValue={init.notify_phone}
            className="h-10"
          />
          <span className="text-text-xs text-[var(--color-text-tertiary)]">
            As mensagens serão enviadas a partir do número conectado da
            barbearia para esse número.
          </span>
        </div>
        <ToggleRow
          name="notify_enabled"
          label="Receber avisos no meu WhatsApp"
          help="Liga/desliga geral. Se estiver desligado, nada chega no seu número."
          defaultChecked={init.notify_enabled}
        />
        <ToggleRow
          name="notify_new_appointment"
          label="Aviso a cada novo agendamento"
          help="Inclui agendamentos online (cliente) e os criados na agenda."
          defaultChecked={init.notify_new_appointment}
        />
        <ToggleRow
          name="notify_new_payment"
          label="Aviso a cada novo recebimento no caixa"
          help="Avisa quando uma venda é registrada — cliente, valor, serviço e forma de pagamento."
          defaultChecked={init.notify_new_payment}
        />
      </Section>

      <Section
        title="Horário comercial"
        subtitle="Mensagens fora desse horário ficam aguardando até o próximo dia útil."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField
            name="business_hours_start"
            type="time"
            label="Início"
            defaultValue={init.business_hours_start.slice(0, 5)}
          />
          <NumberField
            name="business_hours_end"
            type="time"
            label="Fim"
            defaultValue={init.business_hours_end.slice(0, 5)}
          />
          <div className="flex items-end">
            <ToggleInline
              name="business_hours_only"
              label="Respeitar horário"
              defaultChecked={init.business_hours_only}
            />
          </div>
        </div>
      </Section>

      <div>
        <Button type="submit" disabled={pending}>
          <FloppyDiskIcon size={20} weight="duotone" />
          {pending ? "Salvando..." : "Salvar configurações"}
        </Button>
      </div>
    </form>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 rounded-2xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-5">
      <div>
        <h3 className="text-text-md font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-text-sm text-[var(--color-text-tertiary)]">
            {subtitle}
          </p>
        )}
      </div>
      <div className="grid gap-4">{children}</div>
    </div>
  );
}

function ToggleRow({
  name,
  label,
  help,
  defaultChecked,
  children,
}: {
  name: string;
  label: string;
  help?: string;
  defaultChecked: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 rounded-xl border border-[var(--color-border-secondary)] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
      <div className="grid gap-0.5">
        <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
          {label}
        </span>
        {help && (
          <span className="text-text-xs text-[var(--color-text-tertiary)]">
            {help}
          </span>
        )}
      </div>
      <Switch name={name} value="on" defaultChecked={defaultChecked} />
      {children && <div className="sm:col-span-2 sm:max-w-[200px]">{children}</div>}
    </div>
  );
}

function ToggleInline({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked: boolean;
}) {
  return (
    <label className="flex items-center gap-2">
      <Switch name={name} value="on" defaultChecked={defaultChecked} />
      <span className="text-text-sm text-[var(--color-text-secondary)]">
        {label}
      </span>
    </label>
  );
}

function NumberField({
  name,
  label,
  defaultValue,
  min,
  max,
  type = "number",
}: {
  name: string;
  label: string;
  defaultValue: number | string;
  min?: number;
  max?: number;
  type?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={name} className="text-text-xs">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        min={min}
        max={max}
        defaultValue={defaultValue}
        className="h-10"
      />
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
