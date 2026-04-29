import { TIMEZONE } from "@/lib/format";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export type PresetKey =
  | "today"
  | "this-week"
  | "this-month"
  | "last-month"
  | "last-30"
  | "this-year"
  | "custom";

export const PRESETS: { key: PresetKey; label: string }[] = [
  { key: "today", label: "Hoje" },
  { key: "this-week", label: "Esta semana" },
  { key: "this-month", label: "Este mês" },
  { key: "last-month", label: "Mês passado" },
  { key: "last-30", label: "Últimos 30 dias" },
  { key: "this-year", label: "Este ano" },
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function isISODate(v: unknown): v is string {
  return typeof v === "string" && ISO_DATE.test(v);
}

function todayLocal(): Date {
  return toZonedTime(new Date(), TIMEZONE);
}

function toISODate(d: Date): string {
  return formatInTimeZone(d, TIMEZONE, "yyyy-MM-dd");
}

export function todayISO(): string {
  return toISODate(todayLocal());
}

export function presetRange(key: PresetKey): { from: string; to: string } {
  const today = todayLocal();
  const y = today.getFullYear();
  const m = today.getMonth();
  const d = today.getDate();

  if (key === "today") {
    return { from: toISODate(today), to: toISODate(today) };
  }
  if (key === "this-week") {
    const day = today.getDay();
    const diffToMonday = (day + 6) % 7;
    const start = new Date(y, m, d - diffToMonday);
    return { from: toISODate(start), to: toISODate(today) };
  }
  if (key === "this-month") {
    const first = new Date(y, m, 1);
    return { from: toISODate(first), to: toISODate(today) };
  }
  if (key === "last-month") {
    const first = new Date(y, m - 1, 1);
    const last = new Date(y, m, 0);
    return { from: toISODate(first), to: toISODate(last) };
  }
  if (key === "last-30") {
    const start = new Date(y, m, d - 29);
    return { from: toISODate(start), to: toISODate(today) };
  }
  const first = new Date(y, 0, 1);
  return { from: toISODate(first), to: toISODate(today) };
}

export function resolvePeriod(sp: {
  from?: string;
  to?: string;
  preset?: string;
}): {
  from: string;
  to: string;
  active: PresetKey;
} {
  if (isISODate(sp.from) && isISODate(sp.to)) {
    const matched = matchPreset(sp.from, sp.to);
    return { from: sp.from, to: sp.to, active: matched ?? "custom" };
  }
  const key = (PRESETS.find((p) => p.key === sp.preset)?.key ??
    "this-month") as PresetKey;
  const r = presetRange(key);
  return { from: r.from, to: r.to, active: key };
}

function matchPreset(from: string, to: string): PresetKey | null {
  for (const p of PRESETS) {
    const r = presetRange(p.key);
    if (r.from === from && r.to === to) return p.key;
  }
  return null;
}
