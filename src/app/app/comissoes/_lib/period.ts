import { TIMEZONE } from "@/lib/format";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

export type PresetKey = "this-month" | "last-month" | "last-30" | "this-year" | "custom";

export const PRESETS: { key: PresetKey; label: string }[] = [
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

function startOfLocalDayUTC(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00-03:00`).toISOString();
}

function endOfLocalDayUTC(isoDate: string): string {
  return new Date(`${isoDate}T23:59:59.999-03:00`).toISOString();
}

export function presetRange(key: PresetKey): { from: string; to: string } {
  const today = todayLocal();
  const y = today.getFullYear();
  const m = today.getMonth();
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
    const start = new Date(y, m, today.getDate() - 29);
    return { from: toISODate(start), to: toISODate(today) };
  }
  const first = new Date(y, 0, 1);
  return { from: toISODate(first), to: toISODate(today) };
}

export function resolvePeriod(sp: { from?: string; to?: string; preset?: string }): {
  from: string;
  to: string;
  fromIso: string;
  toIso: string;
  active: PresetKey;
} {
  if (isISODate(sp.from) && isISODate(sp.to)) {
    const matched = matchPreset(sp.from, sp.to);
    return {
      from: sp.from,
      to: sp.to,
      fromIso: startOfLocalDayUTC(sp.from),
      toIso: endOfLocalDayUTC(sp.to),
      active: matched ?? "custom",
    };
  }
  const key: PresetKey =
    sp.preset === "last-month" ||
    sp.preset === "last-30" ||
    sp.preset === "this-year"
      ? sp.preset
      : "this-month";
  const r = presetRange(key);
  return {
    from: r.from,
    to: r.to,
    fromIso: startOfLocalDayUTC(r.from),
    toIso: endOfLocalDayUTC(r.to),
    active: key,
  };
}

function matchPreset(from: string, to: string): PresetKey | null {
  for (const p of PRESETS) {
    const r = presetRange(p.key);
    if (r.from === from && r.to === to) return p.key;
  }
  return null;
}

export function buildHref(
  base: string,
  params: { from?: string; to?: string; preset?: string }
): string {
  const sp = new URLSearchParams();
  if (params.preset) sp.set("preset", params.preset);
  if (params.from) sp.set("from", params.from);
  if (params.to) sp.set("to", params.to);
  const qs = sp.toString();
  return qs ? `${base}?${qs}` : base;
}
