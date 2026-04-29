"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BarcodeIcon,
  CurrencyCircleDollarIcon,
  FloppyDiskIcon,
  PackageIcon,
  PercentIcon,
  ReceiptIcon,
  TagSimpleIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type State = { error?: string; ok?: boolean };

export type ProductValues = {
  name: string;
  sku: string | null;
  price_cents: number;
  cost_cents: number;
  stock_qty: number;
  stock_min: number;
  commission_percent: number;
  is_active: boolean;
};

const formatCents = (cents?: number) =>
  cents ? (cents / 100).toFixed(2).replace(".", ",") : "";

function FieldIcon({ Icon }: { Icon: typeof PackageIcon }) {
  return (
    <Icon
      size={28}
      weight="duotone"
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
    />
  );
}

export function ProductForm({
  action,
  initial,
  submitLabel,
  redirectTo,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initial?: Partial<ProductValues>;
  submitLabel: string;
  redirectTo?: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const router = useRouter();

  useEffect(() => {
    if (state.ok) {
      notify.success("Produto salvo", { description: "Estoque e preço atualizados." });
      if (redirectTo) router.push(redirectTo);
    }
    if (state.error) notify.error("Não foi possível salvar", { description: state.error });
  }, [state, redirectTo, router]);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-[1fr_200px]">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Nome</Label>
          <div className="relative">
            <FieldIcon Icon={PackageIcon} />
            <Input
              id="name"
              name="name"
              required
              defaultValue={initial?.name ?? ""}
              placeholder="Pomada modeladora..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="sku">SKU</Label>
          <div className="relative">
            <FieldIcon Icon={BarcodeIcon} />
            <Input
              id="sku"
              name="sku"
              defaultValue={initial?.sku ?? ""}
              placeholder="POM-001"
              className="pl-10 font-mono"
            />
          </div>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="price">Preço de venda (R$)</Label>
          <div className="relative">
            <FieldIcon Icon={TagSimpleIcon} />
            <Input
              id="price"
              name="price"
              inputMode="decimal"
              placeholder="0,00"
              defaultValue={formatCents(initial?.price_cents)}
              className="pl-10 tabular-nums"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cost">Custo (R$)</Label>
          <div className="relative">
            <FieldIcon Icon={CurrencyCircleDollarIcon} />
            <Input
              id="cost"
              name="cost"
              inputMode="decimal"
              placeholder="0,00"
              defaultValue={formatCents(initial?.cost_cents)}
              className="pl-10 tabular-nums"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="stock_qty">Estoque atual</Label>
          <div className="relative">
            <FieldIcon Icon={ReceiptIcon} />
            <Input
              id="stock_qty"
              name="stock_qty"
              type="number"
              defaultValue={initial?.stock_qty ?? 0}
              className="pl-10 tabular-nums"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="stock_min">Estoque mínimo</Label>
          <div className="relative">
            <FieldIcon Icon={WarningIcon} />
            <Input
              id="stock_min"
              name="stock_min"
              type="number"
              min={0}
              defaultValue={initial?.stock_min ?? 0}
              className="pl-10 tabular-nums"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="commission_percent">Comissão padrão (%)</Label>
          <div className="relative">
            <FieldIcon Icon={PercentIcon} />
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
          <span className="text-text-xs text-[var(--color-text-tertiary)]">
            0% = sem comissão. Pode ser ajustado por barbeiro.
          </span>
        </div>
      </div>
      <label className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-4 py-3.5 shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]">
        <div className="grid gap-0.5">
          <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
            Produto ativo
          </span>
          <span className="text-text-sm text-[var(--color-text-tertiary)]">
            Quando inativo, fica indisponível para venda no caixa.
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
