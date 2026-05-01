import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export const TIMEZONE = "America/Sao_Paulo";

export function formatMoney(cents: number | null | undefined): string {
  const value = (cents ?? 0) / 100;
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Converte "YYYY-MM-DDTHH:MM" no fuso da loja para Date em UTC.
// Não depende de Intl/Temporal: itera duas vezes para acertar o offset com DST.
export function localStringToUtcDate(local: string, timezone: string): Date {
  const m = local.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/);
  if (!m) return new Date(local);
  const [, ys, mos, ds, hs, mis] = m;
  const y = Number(ys);
  const mo = Number(mos);
  const d = Number(ds);
  const h = Number(hs);
  const mi = Number(mis);
  const guess = Date.UTC(y, mo - 1, d, h, mi, 0, 0);
  const offset1 = tzOffsetMinutes(timezone, guess);
  let utc = guess - offset1 * 60_000;
  const offset2 = tzOffsetMinutes(timezone, utc);
  if (offset2 !== offset1) utc = guess - offset2 * 60_000;
  return new Date(utc);
}

// Para uma data UTC, retorna { date: "YYYY-MM-DD", hour, minute, totalMinutes } no fuso informado.
export function partsInTimezone(date: Date, timezone: string) {
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  const y = get("year");
  const mo = get("month");
  const d = get("day");
  const hh = Number(get("hour"));
  const mm = Number(get("minute"));
  return {
    date: `${y}-${mo}-${d}`,
    hour: hh,
    minute: mm,
    totalMinutes: hh * 60 + mm,
  };
}

function tzOffsetMinutes(timezone: string, utcMs: number): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour"),
    get("minute"),
    get("second"),
  );
  return Math.round((asUtc - utcMs) / 60_000);
}

export function parseMoneyToCents(input: string): number {
  if (!input) return 0;
  const cleaned = input.replace(/[^\d,.-]/g, "");
  if (!cleaned) return 0;
  const lastComma = cleaned.lastIndexOf(",");
  const lastDot = cleaned.lastIndexOf(".");
  const decimalSep = lastComma > lastDot ? "," : lastDot > -1 ? "." : null;
  let normalized: string;
  if (decimalSep) {
    const idx = decimalSep === "," ? lastComma : lastDot;
    const intPart = cleaned.slice(0, idx).replace(/[.,]/g, "");
    const decPart = cleaned.slice(idx + 1).replace(/[.,]/g, "");
    normalized = `${intPart}.${decPart}`;
  } else {
    normalized = cleaned;
  }
  const value = Number.parseFloat(normalized);
  if (Number.isNaN(value)) return 0;
  return Math.round(value * 100);
}

export function formatDateBR(
  value: string | Date,
  patternOrTimezone: string = "dd/MM/yyyy",
  timezone: string = TIMEZONE,
) {
  // Backward compat: if 2nd arg looks like an IANA timezone, treat it as tz with default pattern.
  const isTz = patternOrTimezone.includes("/");
  const pattern = isTz ? "dd/MM/yyyy" : patternOrTimezone;
  const tz = isTz ? patternOrTimezone : timezone;
  return formatInTimeZone(value, tz, pattern, { locale: ptBR });
}

export function formatDateTimeBR(value: string | Date, timezone: string = TIMEZONE) {
  return formatInTimeZone(value, timezone, "dd/MM/yyyy HH:mm", { locale: ptBR });
}

export function formatTimeBR(value: string | Date, timezone: string = TIMEZONE) {
  return formatInTimeZone(value, timezone, "HH:mm", { locale: ptBR });
}

export function formatRelativeBR(value: string | Date) {
  return format(new Date(value), "PPP", { locale: ptBR });
}
