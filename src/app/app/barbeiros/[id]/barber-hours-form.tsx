"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { ArrowCounterClockwiseIcon, FloppyDiskIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type State = { error?: string; ok?: boolean };

const WEEKDAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export type DayHours = {
  weekday: number;
  is_closed: boolean;
  opens_at: string | null;
  closes_at: string | null;
  break_starts_at: string | null;
  break_ends_at: string | null;
};

type Row = {
  weekday: number;
  is_closed: boolean;
  opens: string;
  closes: string;
  has_break: boolean;
  break_starts: string;
  break_ends: string;
  inherited: boolean;
};

function buildRows(
  shopHours: DayHours[],
  barberHours: DayHours[]
): Row[] {
  const shopMap = new Map(shopHours.map((h) => [h.weekday, h]));
  const barberMap = new Map(barberHours.map((h) => [h.weekday, h]));
  return Array.from({ length: 7 }, (_, weekday) => {
    const own = barberMap.get(weekday);
    const fallback = shopMap.get(weekday);
    const source = own ?? fallback;
    const breakStarts = source?.break_starts_at?.slice(0, 5) ?? "";
    const breakEnds = source?.break_ends_at?.slice(0, 5) ?? "";
    return {
      weekday,
      is_closed: source?.is_closed ?? true,
      opens: source?.opens_at?.slice(0, 5) ?? "09:00",
      closes: source?.closes_at?.slice(0, 5) ?? "18:00",
      has_break: !!(breakStarts && breakEnds),
      break_starts: breakStarts || "12:00",
      break_ends: breakEnds || "13:00",
      inherited: !own,
    };
  });
}

export function BarberHoursForm({
  action,
  onClear,
  shopHours,
  barberHours,
  disabled = false,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  onClear: () => Promise<void>;
  shopHours: DayHours[];
  barberHours: DayHours[];
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [rows, setRows] = useState<Row[]>(() => buildRows(shopHours, barberHours));
  const [clearing, startClear] = useTransition();
  const hasOwn = barberHours.length > 0;

  useEffect(() => {
    if (state.ok) notify.success("Horários salvos", { description: "Expediente do barbeiro atualizado." });
    if (state.error) notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  function update(weekday: number, patch: Partial<Row>) {
    setRows((prev) =>
      prev.map((r) => (r.weekday === weekday ? { ...r, ...patch } : r))
    );
  }

  function handleClear() {
    startClear(async () => {
      try {
        await onClear();
        setRows(buildRows(shopHours, []));
        notify.success("Horários zerados", { description: "Agora segue o padrão da barbearia." });
      } catch (e) {
        notify.error("Não foi possível limpar", {
          description: e instanceof Error ? e.message : "Tente novamente.",
        });
      }
    });
  }

  return (
    <form action={formAction} className="grid gap-4">
      <fieldset disabled={disabled || pending} className="grid gap-2">
        {rows.map((row) => {
          const label = WEEKDAYS[row.weekday];
          return (
            <div
              key={row.weekday}
              className="grid gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-4 py-3"
            >
              <div className="grid items-center gap-3 md:grid-cols-[140px_120px_1fr_1fr]">
                <div className="flex flex-col">
                  <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                    {label}
                  </span>
                  {row.inherited && (
                    <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Herdado
                    </span>
                  )}
                </div>
                <label className="flex items-center gap-2 text-text-sm text-[var(--color-text-tertiary)]">
                  <Switch
                    name={`day_${row.weekday}_closed`}
                    checked={row.is_closed}
                    onCheckedChange={(v) => update(row.weekday, { is_closed: !!v })}
                    value="on"
                  />
                  Fechado
                </label>
                <div className="grid grid-cols-2 gap-2 md:col-span-2">
                  <div className="grid gap-1">
                    <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Abre
                    </span>
                    <Input
                      name={`day_${row.weekday}_opens`}
                      type="time"
                      value={row.opens}
                      onChange={(e) => update(row.weekday, { opens: e.target.value })}
                      disabled={row.is_closed}
                    />
                  </div>
                  <div className="grid gap-1">
                    <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
                      Fecha
                    </span>
                    <Input
                      name={`day_${row.weekday}_closes`}
                      type="time"
                      value={row.closes}
                      onChange={(e) => update(row.weekday, { closes: e.target.value })}
                      disabled={row.is_closed}
                    />
                  </div>
                </div>
              </div>

              {!row.is_closed && (
                <div className="grid gap-2 border-t border-dashed border-[var(--color-border-secondary)] pt-3 md:grid-cols-[140px_120px_1fr_1fr]">
                  <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Pausa
                  </span>
                  <label className="flex items-center gap-2 text-text-sm text-[var(--color-text-tertiary)]">
                    <Switch
                      checked={row.has_break}
                      onCheckedChange={(v) => update(row.weekday, { has_break: !!v })}
                    />
                    Tem pausa
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:col-span-2">
                    <div className="grid gap-1">
                      <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Começa
                      </span>
                      <Input
                        name={`day_${row.weekday}_break_starts`}
                        type="time"
                        value={row.has_break ? row.break_starts : ""}
                        onChange={(e) => update(row.weekday, { break_starts: e.target.value })}
                        disabled={!row.has_break}
                      />
                    </div>
                    <div className="grid gap-1">
                      <span className="text-[11px] uppercase tracking-wide text-[var(--color-text-tertiary)]">
                        Termina
                      </span>
                      <Input
                        name={`day_${row.weekday}_break_ends`}
                        type="time"
                        value={row.has_break ? row.break_ends : ""}
                        onChange={(e) => update(row.weekday, { break_ends: e.target.value })}
                        disabled={!row.has_break}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </fieldset>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-text-xs text-[var(--color-text-tertiary)]">
          Sem horários próprios o barbeiro segue o expediente da barbearia.
        </p>
        <div className="flex gap-2">
          {hasOwn && (
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              disabled={disabled || clearing || pending}
              className="h-11"
            >
              <ArrowCounterClockwiseIcon size={28} weight="duotone" />
              {clearing ? "Limpando..." : "Voltar a herdar"}
            </Button>
          )}
          <Button type="submit" disabled={pending || disabled} className="h-11">
            <FloppyDiskIcon size={28} weight="duotone" />
            {pending ? "Salvando..." : "Salvar horários"}
          </Button>
        </div>
      </div>
    </form>
  );
}
