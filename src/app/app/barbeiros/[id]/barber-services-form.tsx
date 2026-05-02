"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { CaretDownIcon, FloppyDiskIcon, ScissorsIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { formatMoney } from "@/lib/format";

type State = { error?: string; ok?: boolean };

export type ShopService = {
  id: string;
  name: string;
  duration_minutes: number;
  price_cents: number;
  commission_percent: number;
};

export type BarberOverride = {
  service_id: string;
  is_active: boolean;
  price_cents: number | null;
  duration_minutes: number | null;
  commission_percent: number | null;
};

type RowState = {
  service_id: string;
  enabled: boolean;
  expanded: boolean;
  price: string;
  duration: string;
  commission: string;
};

function centsToInput(cents: number | null) {
  if (cents == null) return "";
  return (cents / 100).toFixed(2).replace(".", ",");
}

function inputToCents(input: string) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const normalized = trimmed.replace(/\s/g, "").replace(",", ".");
  const value = Number.parseFloat(normalized);
  if (!Number.isFinite(value) || value < 0) return null;
  return Math.round(value * 100);
}

export function BarberServicesForm({
  action,
  services,
  overrides,
  disabled = false,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  services: ShopService[];
  overrides: BarberOverride[];
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});

  const overrideMap = useMemo(
    () => new Map(overrides.map((o) => [o.service_id, o])),
    [overrides]
  );

  const [rows, setRows] = useState<RowState[]>(() =>
    services.map((s) => {
      const o = overrideMap.get(s.id);
      return {
        service_id: s.id,
        enabled: o?.is_active ?? false,
        expanded: false,
        price: centsToInput(o?.price_cents ?? null),
        duration: o?.duration_minutes != null ? String(o.duration_minutes) : "",
        commission:
          o?.commission_percent != null
            ? String(o.commission_percent).replace(".", ",")
            : "",
      };
    })
  );

  useEffect(() => {
    if (state.ok) {
      notify.success("Serviços salvos", { description: "As alterações foram aplicadas." });
      setRows((prev) => prev.map((r) => ({ ...r, expanded: false })));
    }
    if (state.error) notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  function update(idx: number, patch: Partial<RowState>) {
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  }

  const payload = JSON.stringify({
    rows: rows.map((r) => ({
      service_id: r.service_id,
      enabled: r.enabled,
      price_cents: r.price.trim() ? inputToCents(r.price) : null,
      duration_minutes: r.duration.trim() ? Number(r.duration) : null,
      commission_percent: r.commission.trim()
        ? Number(r.commission.replace(",", "."))
        : null,
    })),
  });

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <ScissorsIcon
          size={28}
          weight="duotone"
          className="text-[var(--color-fg-quaternary)]"
        />
        <p className="text-text-sm text-[var(--color-text-tertiary)]">
          Cadastre serviços antes em <strong>Serviços</strong>.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="payload" value={payload} />

      <fieldset disabled={disabled || pending} className="grid gap-2">
        {rows.map((row, idx) => {
          const svc = services.find((s) => s.id === row.service_id)!;
          return (
            <div
              key={row.service_id}
              data-enabled={row.enabled}
              className="grid gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3 sm:p-4 data-[enabled=false]:opacity-70"
            >
              <div className="flex items-center justify-between gap-3">
                <label className="flex flex-1 items-center gap-3">
                  <Switch
                    checked={row.enabled}
                    onCheckedChange={(v) =>
                      update(idx, { enabled: !!v, expanded: !!v ? row.expanded : false })
                    }
                  />
                  <div className="grid min-w-0 flex-1">
                    <span className="text-text-sm font-semibold text-[var(--color-text-primary)] break-words">
                      {svc.name}
                    </span>
                    <span className="text-text-xs text-[var(--color-text-tertiary)]">
                      Padrão: {svc.duration_minutes} min ·{" "}
                      {formatMoney(svc.price_cents)} · {svc.commission_percent}% comissão
                    </span>
                  </div>
                </label>
                {row.enabled && (
                  <button
                    type="button"
                    onClick={() => update(idx, { expanded: !row.expanded })}
                    className="inline-flex h-9 shrink-0 items-center gap-1 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-2.5 text-text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
                    aria-expanded={row.expanded}
                  >
                    {row.expanded ? "Fechar" : "Personalizar"}
                    <CaretDownIcon
                      size={14}
                      weight="bold"
                      className={row.expanded ? "rotate-180 transition-transform" : "transition-transform"}
                    />
                  </button>
                )}
              </div>

              {row.enabled && row.expanded && (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="grid gap-1">
                    <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Preço próprio (R$)
                    </span>
                    <Input
                      inputMode="decimal"
                      placeholder={centsToInput(svc.price_cents) || "0,00"}
                      value={row.price}
                      onChange={(e) => update(idx, { price: e.target.value })}
                      className="tabular-nums"
                    />
                  </div>
                  <div className="grid gap-1">
                    <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Duração (min)
                    </span>
                    <Input
                      type="number"
                      min={5}
                      max={600}
                      placeholder={String(svc.duration_minutes)}
                      value={row.duration}
                      onChange={(e) => update(idx, { duration: e.target.value })}
                      className="tabular-nums"
                    />
                  </div>
                  <div className="grid gap-1">
                    <span className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Comissão (%)
                    </span>
                    <Input
                      inputMode="decimal"
                      placeholder={String(svc.commission_percent)}
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
        Campos vazios herdam o valor padrão do serviço.
      </p>

      <div className="flex justify-stretch sm:justify-end">
        <Button type="submit" disabled={pending || disabled} className="h-11 w-full sm:w-auto">
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : "Salvar serviços"}
        </Button>
      </div>
    </form>
  );
}
