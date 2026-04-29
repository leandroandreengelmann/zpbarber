"use client";

import { useActionState, useEffect, useState } from "react";
import {
  AtIcon,
  CurrencyDollarIcon,
  FloppyDiskIcon,
  PlusIcon,
  TextTIcon,
  TrashIcon,
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

export type PlanFormValues = {
  slug: string;
  name: string;
  description: string | null;
  price_cents: number;
  billing_cycle: "monthly" | "quarterly" | "yearly";
  trial_days: number;
  max_barbers: number | null;
  max_whatsapp_messages_per_month: number | null;
  features: string[];
  is_active: boolean;
  sort_order: number;
};

function FieldIcon({ Icon }: { Icon: typeof TextTIcon }) {
  return (
    <Icon
      size={28}
      weight="duotone"
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
    />
  );
}

export function PlanForm({
  action,
  initial,
  submitLabel,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initial?: Partial<PlanFormValues>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [features, setFeatures] = useState<string[]>(initial?.features ?? []);
  const [newFeature, setNewFeature] = useState("");
  const [priceReais, setPriceReais] = useState(
    ((initial?.price_cents ?? 0) / 100).toString()
  );

  useEffect(() => {
    if (state.ok)
      notify.success("Plano salvo", {
        description: "As alterações foram aplicadas.",
      });
    if (state.error)
      notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  function addFeature() {
    const v = newFeature.trim();
    if (!v) return;
    setFeatures((prev) => [...prev, v]);
    setNewFeature("");
  }

  function removeFeature(i: number) {
    setFeatures((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <form action={formAction} className="grid gap-5">
      <input
        type="hidden"
        name="price_cents"
        value={Math.round(Number(priceReais.replace(",", ".")) * 100) || 0}
      />
      {features.map((f) => (
        <input key={f} type="hidden" name="features" value={f} />
      ))}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Nome</Label>
          <div className="relative">
            <FieldIcon Icon={TextTIcon} />
            <Input
              id="name"
              name="name"
              required
              defaultValue={initial?.name ?? ""}
              placeholder="Plano Pro"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="slug">Slug</Label>
          <div className="relative">
            <FieldIcon Icon={AtIcon} />
            <Input
              id="slug"
              name="slug"
              required
              defaultValue={initial?.slug ?? ""}
              placeholder="pro"
              className="pl-10 font-mono"
            />
          </div>
        </div>

        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="description">Descrição</Label>
          <textarea
            id="description"
            name="description"
            defaultValue={initial?.description ?? ""}
            rows={2}
            placeholder="Para barbearias com até 5 barbeiros."
            className="rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 text-text-sm leading-relaxed text-[var(--color-text-primary)] outline-none focus:border-[var(--color-blue-500)] focus:ring-2 focus:ring-[var(--color-blue-100)]"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="price">Preço (R$)</Label>
          <div className="relative">
            <FieldIcon Icon={CurrencyDollarIcon} />
            <Input
              id="price"
              required
              inputMode="decimal"
              value={priceReais}
              onChange={(e) => setPriceReais(e.target.value)}
              placeholder="99,90"
              className="pl-10 tabular-nums"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="billing_cycle">Ciclo</Label>
          <Select
            name="billing_cycle"
            defaultValue={initial?.billing_cycle ?? "monthly"}
          >
            <SelectTrigger id="billing_cycle">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="quarterly">Trimestral</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="trial_days">Trial (dias)</Label>
          <Input
            id="trial_days"
            name="trial_days"
            type="number"
            min={0}
            max={365}
            defaultValue={initial?.trial_days ?? 0}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="sort_order">Ordem</Label>
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            min={0}
            max={9999}
            defaultValue={initial?.sort_order ?? 0}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="max_barbers">Barbeiros máx (opcional)</Label>
          <Input
            id="max_barbers"
            name="max_barbers"
            type="number"
            min={1}
            placeholder="ilimitado"
            defaultValue={initial?.max_barbers ?? ""}
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="max_wa">Mensagens WA/mês (opcional)</Label>
          <Input
            id="max_wa"
            name="max_whatsapp_messages_per_month"
            type="number"
            min={0}
            placeholder="ilimitado"
            defaultValue={initial?.max_whatsapp_messages_per_month ?? ""}
          />
        </div>
      </div>

      <fieldset className="grid gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4">
        <legend className="px-1 text-text-sm font-medium text-[var(--color-text-primary)]">
          Recursos do plano
        </legend>
        <div className="flex gap-2">
          <Input
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
            placeholder="Ex: Lembretes via WhatsApp"
          />
          <Button type="button" variant="outline" onClick={addFeature}>
            <PlusIcon size={20} weight="duotone" />
            Adicionar
          </Button>
        </div>
        {features.length > 0 && (
          <ul className="grid gap-1.5">
            {features.map((f, i) => (
              <li
                key={`${i}-${f}`}
                className="flex items-center justify-between rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-3 py-2 text-text-sm text-[var(--color-text-primary)]"
              >
                <span>{f}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="rounded p-1 text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary_hover)]"
                  aria-label="Remover"
                >
                  <TrashIcon size={20} weight="duotone" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      <label className="flex items-center gap-2 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={initial?.is_active ?? true}
          className="size-4"
        />
        <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
          Plano ativo (visível para vincular barbearias)
        </span>
      </label>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={pending}>
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
