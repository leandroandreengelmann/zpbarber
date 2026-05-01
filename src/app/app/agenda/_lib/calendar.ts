import { TIMEZONE, localStringToUtcDate } from "@/lib/format";

export type CalendarView = "day" | "week" | "month";

export const VIEW_LABEL: Record<CalendarView, string> = {
  day: "Dia",
  week: "Semana",
  month: "Mês",
};

const ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isISODate(v: unknown): v is string {
  return typeof v === "string" && ISO_RE.test(v);
}

export function todayLocalISO(timezone: string = TIMEZONE) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date());
}

export function shiftDate(iso: string, deltaDays: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + deltaDays);
  return dt.toISOString().slice(0, 10);
}

export function shiftMonth(iso: string, deltaMonths: number) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1 + deltaMonths, 1));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function startOfWeekISO(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const dow = dt.getUTCDay(); // 0 = Sunday
  dt.setUTCDate(dt.getUTCDate() - dow);
  return dt.toISOString().slice(0, 10);
}

export function startOfMonthISO(iso: string) {
  const [y, m] = iso.split("-").map(Number);
  return `${y}-${String(m).padStart(2, "0")}-01`;
}

export function rangeBoundsUTC(
  startISO: string,
  days: number,
  timezone: string = TIMEZONE,
) {
  const endIso = shiftDate(startISO, days - 1);
  const start = localStringToUtcDate(`${startISO}T00:00`, timezone);
  // Para o fim do dia, somamos 1 dia ao último ISO e subtraímos 1 ms.
  const afterEndIso = shiftDate(endIso, 1);
  const afterEnd = localStringToUtcDate(`${afterEndIso}T00:00`, timezone);
  const end = new Date(afterEnd.getTime() - 1);
  return { startISO: start.toISOString(), endISO: end.toISOString() };
}

export function dayBoundsUTC(localISODate: string, timezone: string = TIMEZONE) {
  return rangeBoundsUTC(localISODate, 1, timezone);
}

export function weekBoundsUTC(localISODate: string, timezone: string = TIMEZONE) {
  return rangeBoundsUTC(startOfWeekISO(localISODate), 7, timezone);
}

export function monthBoundsUTC(localISODate: string, timezone: string = TIMEZONE) {
  const start = startOfMonthISO(localISODate);
  const next = shiftMonth(start, 1);
  const startDt = localStringToUtcDate(`${start}T00:00`, timezone);
  const endDt = localStringToUtcDate(`${next}T00:00`, timezone);
  return {
    startISO: startDt.toISOString(),
    endISO: new Date(endDt.getTime() - 1).toISOString(),
  };
}

export function formatDayHeader(iso: string, timezone: string = TIMEZONE) {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: timezone,
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(dt);
}

export function formatWeekHeader(startISO: string, timezone: string = TIMEZONE) {
  const endISO = shiftDate(startISO, 6);
  const [sy, sm, sd] = startISO.split("-").map(Number);
  const [ey, em, ed] = endISO.split("-").map(Number);
  const sDt = new Date(Date.UTC(sy, sm - 1, sd, 12));
  const eDt = new Date(Date.UTC(ey, em - 1, ed, 12));
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    timeZone: timezone,
    day: "2-digit",
    month: "short",
  });
  const yfmt = new Intl.DateTimeFormat("pt-BR", {
    timeZone: timezone,
    year: "numeric",
  });
  return `${fmt.format(sDt)} – ${fmt.format(eDt)} · ${yfmt.format(eDt)}`;
}

export function shortMonthName(iso: string, timezone: string = TIMEZONE) {
  const [y, m] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, 1, 12));
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: timezone,
    month: "short",
  })
    .format(dt)
    .replace(".", "")
    .toUpperCase();
}

export function dayOfMonth(iso: string) {
  return Number(iso.split("-")[2]);
}

export function formatMonthHeader(iso: string, timezone: string = TIMEZONE) {
  const [y, m] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, 1, 12));
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: timezone,
    month: "long",
    year: "numeric",
  }).format(dt);
}

export function isoFromDate(dt: Date, timezone: string = TIMEZONE) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(dt);
}

export function getMonthGrid(iso: string) {
  const start = startOfMonthISO(iso);
  const startWeek = startOfWeekISO(start);
  const days: string[] = [];
  for (let i = 0; i < 42; i++) {
    days.push(shiftDate(startWeek, i));
  }
  return days;
}

export function localTimeParts(isoTimestamp: string, timezone: string = TIMEZONE) {
  const dt = new Date(isoTimestamp);
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const [hh, mm] = fmt.format(dt).split(":").map(Number);
  return { hour: hh, minute: mm, totalMinutes: hh * 60 + mm };
}

export function localDateOnly(isoTimestamp: string, timezone: string = TIMEZONE) {
  return isoFromDate(new Date(isoTimestamp), timezone);
}

export const HOUR_START = 7;
export const HOUR_END = 22;
export const SLOT_MINUTES = 30;
