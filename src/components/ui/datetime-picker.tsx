"use client";

import { useEffect, useMemo, useState } from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import {
  CaretLeftIcon,
  CaretRightIcon,
  CalendarBlankIcon,
  ClockIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTH_NAMES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseLocalInput(v: string | undefined) {
  if (!v) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(v);
  if (!m) return null;
  return {
    year: Number(m[1]),
    month: Number(m[2]),
    day: Number(m[3]),
    hour: Number(m[4]),
    minute: Number(m[5]),
  };
}

function buildLocalInput(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
) {
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`;
}

function formatHumanDate(parts: ReturnType<typeof parseLocalInput>) {
  if (!parts) return "Selecionar data e hora";
  const { year, month, day, hour, minute } = parts;
  return `${pad(day)}/${pad(month)}/${year} às ${pad(hour)}:${pad(minute)}`;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function buildMonthGrid(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1);
  const dow = firstDay.getDay();
  const totalDays = daysInMonth(year, month);
  const cells: ({ y: number; m: number; d: number; current: boolean })[] = [];

  if (dow > 0) {
    const prevDays = daysInMonth(year, month === 1 ? 12 : month - 1);
    const py = month === 1 ? year - 1 : year;
    const pm = month === 1 ? 12 : month - 1;
    for (let i = dow - 1; i >= 0; i--) {
      cells.push({ y: py, m: pm, d: prevDays - i, current: false });
    }
  }
  for (let d = 1; d <= totalDays; d++) {
    cells.push({ y: year, m: month, d, current: true });
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1];
    const ny = last.m === 12 ? last.y + 1 : last.y;
    const nm = last.m === 12 ? 1 : last.m + 1;
    const nd = (cells.length - (dow + totalDays)) + 1;
    cells.push({ y: ny, m: nm, d: nd, current: false });
  }
  return cells;
}

export type DateTimePickerProps = {
  id?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  min?: string;
  required?: boolean;
  onChange?: (v: string) => void;
  stepMinutes?: number;
};

export function DateTimePicker({
  id,
  name,
  value: controlled,
  defaultValue,
  min,
  required,
  onChange,
  stepMinutes,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState<string>(defaultValue ?? "");
  const value = controlled ?? uncontrolled;
  const parts = useMemo(() => parseLocalInput(value), [value]);
  const minParts = useMemo(() => parseLocalInput(min), [min]);

  const today = useMemo(() => {
    const d = new Date();
    return { y: d.getFullYear(), m: d.getMonth() + 1, d: d.getDate() };
  }, []);

  const initialMonth = parts
    ? { y: parts.year, m: parts.month }
    : { y: today.y, m: today.m };
  const [view, setView] = useState(initialMonth);

  function emit(next: string) {
    if (controlled === undefined) setUncontrolled(next);
    onChange?.(next);
  }

  function pickDate(y: number, m: number, d: number) {
    const h = parts?.hour ?? 9;
    const min = parts?.minute ?? 0;
    emit(buildLocalInput(y, m, d, h, min));
  }

  function pickHour(h: number) {
    const y = parts?.year ?? today.y;
    const m = parts?.month ?? today.m;
    const d = parts?.day ?? today.d;
    const min = parts?.minute ?? 0;
    emit(buildLocalInput(y, m, d, h, min));
  }

  function pickMinute(min: number) {
    const y = parts?.year ?? today.y;
    const m = parts?.month ?? today.m;
    const d = parts?.day ?? today.d;
    const h = parts?.hour ?? 9;
    emit(buildLocalInput(y, m, d, h, min));
  }

  function shiftView(delta: number) {
    setView((v) => {
      const total = v.y * 12 + (v.m - 1) + delta;
      return { y: Math.floor(total / 12), m: (total % 12) + 1 };
    });
  }

  function isBeforeMin(y: number, m: number, d: number) {
    if (!minParts) return false;
    const a = y * 10000 + m * 100 + d;
    const b = minParts.year * 10000 + minParts.month * 100 + minParts.day;
    return a < b;
  }

  const grid = buildMonthGrid(view.y, view.m);
  const stepRaw = Math.max(1, Math.min(60, Math.floor(stepMinutes ?? 15)));
  const step = 60 % stepRaw === 0 ? stepRaw : 15;
  const hours = Array.from({ length: 16 }, (_, i) => i + 7);
  const minutes = useMemo(() => {
    if (step >= 60) return [0];
    const list: number[] = [];
    for (let m = 0; m < 60; m += step) list.push(m);
    return list;
  }, [step]);

  const sameDayAsMin =
    parts &&
    minParts &&
    parts.year === minParts.year &&
    parts.month === minParts.month &&
    parts.day === minParts.day;

  useEffect(() => {
    if (!parts) return;
    if (parts.minute % step === 0) return;
    const snapped = Math.floor(parts.minute / step) * step;
    emit(buildLocalInput(parts.year, parts.month, parts.day, parts.hour, snapped));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <input type="hidden" name={name} value={value} required={required} />
      <PopoverPrimitive.Trigger
        id={id}
        type="button"
        className="flex h-11 w-full items-center gap-2 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3.5 text-left text-text-md text-[var(--color-text-primary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)] transition-shadow outline-none hover:border-[var(--color-border-primary)] focus-visible:border-[var(--color-border-brand)] focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--color-border-brand)_24%,transparent)] aria-expanded:border-[var(--color-border-brand)]"
      >
        <CalendarBlankIcon
          size={28}
          weight="duotone"
          className="shrink-0 text-[var(--color-fg-quaternary)]"
        />
        <span
          className={cn(
            "flex-1 truncate tabular-nums",
            !parts && "text-[var(--color-text-placeholder)]",
          )}
        >
          {formatHumanDate(parts)}
        </span>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side="bottom"
          align="start"
          sideOffset={6}
          className="z-[100]"
        >
          <PopoverPrimitive.Popup className="z-[100] grid w-[640px] max-w-[92vw] grid-cols-1 gap-4 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4 shadow-lg sm:grid-cols-[1fr_220px]">
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => shiftView(-1)}
                  className="inline-flex size-8 items-center justify-center rounded-md text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary)]"
                  aria-label="Mês anterior"
                >
                  <CaretLeftIcon size={20} weight="bold" />
                </button>
                <span className="text-text-md font-semibold capitalize text-[var(--color-text-primary)]">
                  {MONTH_NAMES[view.m - 1]} {view.y}
                </span>
                <button
                  type="button"
                  onClick={() => shiftView(1)}
                  className="inline-flex size-8 items-center justify-center rounded-md text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary)]"
                  aria-label="Próximo mês"
                >
                  <CaretRightIcon size={20} weight="bold" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-text-xs font-medium text-[var(--color-text-tertiary)]">
                {WEEKDAY_LABELS.map((w, i) => (
                  <span key={i}>{w}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {grid.map((c, i) => {
                  const isSelected =
                    parts &&
                    parts.year === c.y &&
                    parts.month === c.m &&
                    parts.day === c.d;
                  const isToday =
                    today.y === c.y && today.m === c.m && today.d === c.d;
                  const blocked = isBeforeMin(c.y, c.m, c.d);
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={blocked}
                      onClick={() => pickDate(c.y, c.m, c.d)}
                      className={cn(
                        "flex h-9 items-center justify-center rounded-md text-text-sm tabular-nums transition-colors",
                        c.current
                          ? "text-[var(--color-text-primary)]"
                          : "text-[var(--color-text-quaternary)]",
                        !blocked &&
                          !isSelected &&
                          "hover:bg-[var(--color-bg-secondary)]",
                        isSelected &&
                          "bg-[var(--color-blue-600)] font-semibold text-white hover:bg-[var(--color-blue-700)]",
                        !isSelected &&
                          isToday &&
                          "ring-1 ring-inset ring-[var(--color-blue-300)]",
                        blocked && "cursor-not-allowed opacity-40",
                      )}
                    >
                      {c.d}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-3 border-t border-[var(--color-border-secondary)] pt-4 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              <div className="flex items-center gap-2 text-text-sm font-semibold text-[var(--color-text-primary)]">
                <ClockIcon size={20} weight="duotone" />
                Horário
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-1">
                  <span className="text-text-xs text-[var(--color-text-tertiary)]">Hora</span>
                  <div className="grid max-h-48 grid-cols-2 gap-1 overflow-y-auto pr-1">
                    {hours.map((h) => {
                      const blocked =
                        sameDayAsMin && minParts ? h < minParts.hour : false;
                      const isSelected = parts?.hour === h;
                      return (
                        <button
                          key={h}
                          type="button"
                          disabled={blocked}
                          onClick={() => pickHour(h)}
                          className={cn(
                            "rounded-md px-2 py-1.5 text-text-sm tabular-nums transition-colors",
                            isSelected
                              ? "bg-[var(--color-blue-600)] font-semibold text-white"
                              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]",
                            blocked && "cursor-not-allowed opacity-40",
                          )}
                        >
                          {pad(h)}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid gap-1">
                  <span className="text-text-xs text-[var(--color-text-tertiary)]">Minuto</span>
                  <div className="grid grid-cols-2 gap-1">
                    {minutes.map((m) => {
                      const blocked =
                        sameDayAsMin &&
                        minParts &&
                        parts?.hour === minParts.hour &&
                        m < minParts.minute;
                      const isSelected = parts?.minute === m;
                      return (
                        <button
                          key={m}
                          type="button"
                          disabled={!!blocked}
                          onClick={() => pickMinute(m)}
                          className={cn(
                            "rounded-md px-2 py-1.5 text-text-sm tabular-nums transition-colors",
                            isSelected
                              ? "bg-[var(--color-blue-600)] font-semibold text-white"
                              : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]",
                            blocked && "cursor-not-allowed opacity-40",
                          )}
                        >
                          {pad(m)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-9 items-center justify-center rounded-md bg-[var(--color-blue-600)] px-3 text-text-sm font-medium text-white hover:bg-[var(--color-blue-700)] disabled:opacity-50"
                disabled={!parts}
              >
                Confirmar
              </button>
            </div>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
