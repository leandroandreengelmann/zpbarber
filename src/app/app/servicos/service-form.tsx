"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ClockIcon,
  CurrencyCircleDollarIcon,
  FloppyDiskIcon,
  PercentIcon,
  ScissorsIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type State = { error?: string; ok?: boolean };

export type ServiceValues = {
  name: string;
  duration_minutes: number;
  price_cents: number;
  commission_percent: number;
  is_active: boolean;
};

export function ServiceForm({
  action,
  initial,
  submitLabel,
  redirectTo,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initial?: Partial<ServiceValues>;
  submitLabel: string;
  redirectTo?: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const router = useRouter();
  const priceDefault = initial?.price_cents
    ? (initial.price_cents / 100).toFixed(2).replace(".", ",")
    : "";

  useEffect(() => {
    if (state.ok) {
      notify.success("Serviço salvo", { description: "Já aparece no catálogo." });
      if (redirectTo) router.push(redirectTo);
    }
    if (state.error) notify.error("Não foi possível salvar", { description: state.error });
  }, [state, redirectTo, router]);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Nome do serviço</Label>
        <div className="relative">
          <ScissorsIcon
            size={28}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            id="name"
            name="name"
            required
            defaultValue={initial?.name ?? ""}
            placeholder="Corte degradê, Barba, Combo..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        <div className="grid gap-1.5">
          <Label htmlFor="duration_minutes">Duração (min)</Label>
          <div className="relative">
            <ClockIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="duration_minutes"
              name="duration_minutes"
              type="number"
              min={5}
              max={600}
              required
              defaultValue={initial?.duration_minutes ?? 30}
              className="pl-10 tabular-nums"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="price">Preço (R$)</Label>
          <div className="relative">
            <CurrencyCircleDollarIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="price"
              name="price"
              inputMode="decimal"
              placeholder="0,00"
              defaultValue={priceDefault}
              className="pl-10 tabular-nums"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="commission_percent">Comissão (%)</Label>
          <div className="relative">
            <PercentIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="commission_percent"
              name="commission_percent"
              type="number"
              step="0.01"
              min={0}
              max={100}
              defaultValue={initial?.commission_percent ?? 0}
              className="pl-10 tabular-nums"
            />
          </div>
        </div>
      </div>
      <label className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-4 py-3.5 shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]">
        <div className="grid gap-0.5">
          <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
            Serviço ativo
          </span>
          <span className="text-text-sm text-[var(--color-text-tertiary)]">
            Quando inativo, não aparece em novos agendamentos.
          </span>
        </div>
        <Switch name="is_active" value="on" defaultChecked={initial?.is_active ?? true} />
      </label>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending} className="h-11">
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
