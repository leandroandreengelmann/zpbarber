"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { FloppyDiskIcon, PackageIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { formatMoney } from "@/lib/format";

type State = { error?: string; ok?: boolean };

export type ShopProduct = {
  id: string;
  name: string;
  price_cents: number;
  commission_percent: number;
};

export type BarberProductOverride = {
  product_id: string;
  is_active: boolean;
  commission_percent: number;
};

type RowState = {
  product_id: string;
  enabled: boolean;
  commission: string;
};

export function BarberProductsForm({
  action,
  products,
  overrides,
  disabled = false,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  products: ShopProduct[];
  overrides: BarberProductOverride[];
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  const overrideMap = useMemo(
    () => new Map(overrides.map((o) => [o.product_id, o])),
    [overrides]
  );

  const [rows, setRows] = useState<RowState[]>(() =>
    products.map((p) => {
      const o = overrideMap.get(p.id);
      return {
        product_id: p.id,
        enabled: o?.is_active ?? false,
        commission:
          o?.commission_percent != null
            ? String(o.commission_percent).replace(".", ",")
            : "",
      };
    })
  );

  useEffect(() => {
    if (state.ok)
      notify.success("Produtos salvos", {
        description: "As comissões foram aplicadas.",
      });
    if (state.error)
      notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  function update(idx: number, patch: Partial<RowState>) {
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  }

  const payload = JSON.stringify({
    rows: rows.map((r) => ({
      product_id: r.product_id,
      enabled: r.enabled,
      commission_percent: r.commission.trim()
        ? Number(r.commission.replace(",", "."))
        : null,
    })),
  });

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <PackageIcon
          size={28}
          weight="duotone"
          className="text-[var(--color-fg-quaternary)]"
        />
        <p className="text-text-sm text-[var(--color-text-tertiary)]">
          Cadastre produtos antes em <strong>Produtos</strong>.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="payload" value={payload} />

      <fieldset disabled={disabled || pending} className="grid gap-2">
        {rows.map((row, idx) => {
          const prod = products.find((p) => p.id === row.product_id)!;
          return (
            <div
              key={row.product_id}
              data-enabled={row.enabled}
              className="grid gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4 data-[enabled=false]:opacity-70"
            >
              <div className="flex items-center justify-between gap-3">
                <label className="flex flex-1 items-center gap-3">
                  <Switch
                    checked={row.enabled}
                    onCheckedChange={(v) => update(idx, { enabled: !!v })}
                  />
                  <div className="grid">
                    <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
                      {prod.name}
                    </span>
                    <span className="text-text-xs text-[var(--color-text-tertiary)]">
                      Padrão: {formatMoney(prod.price_cents)} ·{" "}
                      {prod.commission_percent}% comissão
                    </span>
                  </div>
                </label>
              </div>

              {row.enabled && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="grid gap-1">
                    <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Comissão própria (%)
                    </span>
                    <Input
                      inputMode="decimal"
                      placeholder={String(prod.commission_percent)}
                      value={row.commission}
                      onChange={(e) => update(idx, { commission: e.target.value })}
                      className="tabular-nums"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </fieldset>

      <p className="text-text-xs text-[var(--color-text-tertiary)]">
        Marque os produtos que esse barbeiro vende. Comissão vazia herda o padrão.
      </p>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending || disabled} className="h-11">
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : "Salvar produtos"}
        </Button>
      </div>
    </form>
  );
}
