"use client";

import { useActionState, useEffect, useState } from "react";
import {
  AtIcon,
  BuildingOfficeIcon,
  ClockClockwiseIcon,
  EnvelopeSimpleIcon,
  FloppyDiskIcon,
  GlobeIcon,
  HourglassMediumIcon,
  PaintBrushIcon,
  PhoneIcon,
  WrenchIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePlatformSettingsAction } from "./actions";
import type { PlatformSettings } from "@/lib/platform-settings";

type State = { error?: string; ok?: boolean };

function FieldIcon({ Icon }: { Icon: typeof GlobeIcon }) {
  return (
    <Icon
      size={28}
      weight="duotone"
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
    />
  );
}

export function SettingsForm({ initial }: { initial: PlatformSettings }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    updatePlatformSettingsAction,
    {}
  );
  const [maintenance, setMaintenance] = useState(initial.maintenance_mode);
  const [dunningDays, setDunningDays] = useState(
    String(initial.dunning_days_to_suspend ?? 7)
  );
  const [trialDays, setTrialDays] = useState(
    String(initial.default_trial_days ?? 14)
  );

  useEffect(() => {
    if (state.ok)
      notify.success("Configurações salvas", {
        description: "As mudanças já estão aplicadas.",
      });
    if (state.error)
      notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  return (
    <form action={formAction} className="grid gap-6">
      <section className="grid gap-4">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Marca e URLs
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="brand_name">Nome da marca</Label>
            <div className="relative">
              <FieldIcon Icon={BuildingOfficeIcon} />
              <Input
                id="brand_name"
                name="brand_name"
                required
                defaultValue={initial.brand_name}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="app_url">URL pública do app</Label>
            <div className="relative">
              <FieldIcon Icon={GlobeIcon} />
              <Input
                id="app_url"
                name="app_url"
                type="url"
                placeholder="https://app.barberramos.com.br"
                defaultValue={initial.app_url ?? ""}
                className="pl-10"
              />
            </div>
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Usada para gerar links em mensagens (avaliação, lembretes).
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="default_primary_color">Cor primária padrão</Label>
            <div className="relative">
              <FieldIcon Icon={PaintBrushIcon} />
              <Input
                id="default_primary_color"
                name="default_primary_color"
                placeholder="#1F2937"
                defaultValue={initial.default_primary_color ?? ""}
                className="pl-10 font-mono"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="default_trial_days">Trial padrão (dias)</Label>
            <div className="relative">
              <FieldIcon Icon={ClockClockwiseIcon} />
              <Input
                id="default_trial_days"
                name="default_trial_days"
                type="number"
                min={0}
                max={365}
                value={trialDays}
                onChange={(e) => setTrialDays(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Suporte
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="support_email">E-mail de suporte</Label>
            <div className="relative">
              <FieldIcon Icon={EnvelopeSimpleIcon} />
              <Input
                id="support_email"
                name="support_email"
                type="email"
                placeholder="suporte@barberramos.com.br"
                defaultValue={initial.support_email ?? ""}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="support_whatsapp">WhatsApp de suporte</Label>
            <div className="relative">
              <FieldIcon Icon={PhoneIcon} />
              <Input
                id="support_whatsapp"
                name="support_whatsapp"
                placeholder="+55 11 99999-9999"
                defaultValue={initial.support_whatsapp ?? ""}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Cobrança
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="dunning_days_to_suspend">
              Dias até suspender por inadimplência
            </Label>
            <div className="relative">
              <FieldIcon Icon={HourglassMediumIcon} />
              <Input
                id="dunning_days_to_suspend"
                name="dunning_days_to_suspend"
                type="number"
                min={0}
                max={120}
                value={dunningDays}
                onChange={(e) => setDunningDays(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Após X dias de atraso da fatura, a barbearia é suspensa
              automaticamente (cron diário).
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Manutenção
        </h2>
        <div className="flex items-center gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4">
          <input
            id="maintenance_mode"
            name="maintenance_mode"
            type="checkbox"
            checked={maintenance}
            onChange={(e) => setMaintenance(e.target.checked)}
            className="size-4"
          />
          <div className="grid gap-0.5">
            <Label htmlFor="maintenance_mode">Modo manutenção</Label>
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Quando ligado, exibe a mensagem abaixo nas páginas dos gestores.
            </p>
          </div>
          <WrenchIcon
            size={28}
            weight="duotone"
            className="ml-auto text-[var(--color-fg-quaternary)]"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="maintenance_message">Mensagem de manutenção</Label>
          <div className="relative">
            <AtIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-3 text-[var(--color-fg-quaternary)]"
            />
            <textarea
              id="maintenance_message"
              name="maintenance_message"
              rows={3}
              defaultValue={initial.maintenance_message ?? ""}
              placeholder="Estamos em manutenção, voltamos às 03h."
              className="w-full rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 pl-10 text-text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-blue-500)] focus:ring-2 focus:ring-[var(--color-blue-100)]"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={pending}>
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : "Salvar configurações"}
        </Button>
      </div>
    </form>
  );
}
