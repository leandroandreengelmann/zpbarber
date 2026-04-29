"use client";

import { useActionState, useEffect, useState } from "react";
import { FloppyDiskIcon } from "@phosphor-icons/react";
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
};

function buildRows(initial: DayHours[]): Row[] {
  const map = new Map(initial.map((h) => [h.weekday, h]));
  return Array.from({ length: 7 }, (_, weekday) => {
    const d = map.get(weekday);
    const breakStarts = d?.break_starts_at?.slice(0, 5) ?? "";
    const breakEnds = d?.break_ends_at?.slice(0, 5) ?? "";
    return {
      weekday,
      is_closed: d?.is_closed ?? true,
      opens: d?.opens_at?.slice(0, 5) ?? "09:00",
      closes: d?.closes_at?.slice(0, 5) ?? "18:00",
      has_break: !!(breakStarts && breakEnds),
      break_starts: breakStarts || "12:00",
      break_ends: breakEnds || "13:00",
    };
  });
}

export function HoursForm({
  action,
  initial,
  disabled = false,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initial: DayHours[];
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [rows, setRows] = useState<Row[]>(() => buildRows(initial));

  useEffect(() => {
    if (state.ok) notify.success("Horários salvos", { description: "Expediente da barbearia atualizado." });
    if (state.error) notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  function update(weekday: number, patch: Partial<Row>) {
    setRows((prev) =>
      prev.map((r) => (r.weekday === weekday ? { ...r, ...patch } : r))
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      <fieldset disabled={disabled || pending} className="grid gap-2">
        {rows.map((row) => {
          const label = WEEKDAYS[row.weekday];
          return (
            <div
              key={row.weekday}
              className="grid gap-3 rounded-lg border border-border bg-card px-4 py-3"
            >
              <div className="grid items-center gap-3 md:grid-cols-[120px_120px_1fr_1fr]">
                <div className="text-sm font-medium">{label}</div>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
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
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
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
                    <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
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
                <div className="grid gap-2 border-t border-dashed border-border pt-3 md:grid-cols-[120px_120px_1fr_1fr]">
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    Pausa
                  </span>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Switch
                      checked={row.has_break}
                      onCheckedChange={(v) => update(row.weekday, { has_break: !!v })}
                    />
                    Tem pausa
                  </label>
                  <div className="grid grid-cols-2 gap-2 md:col-span-2">
                    <div className="grid gap-1">
                      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
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
                      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
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

      <div className="flex justify-end">
        <Button type="submit" disabled={pending || disabled}>
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : "Salvar horários"}
        </Button>
      </div>
    </form>
  );
}
