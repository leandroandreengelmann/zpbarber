import Link from "next/link";
import {
  CalendarBlankIcon,
  ScissorsIcon,
  UserSwitchIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  HOUR_END,
  HOUR_START,
  isoFromDate,
  localDateOnly,
  localTimeParts,
  shiftDate,
  startOfWeekISO,
  todayLocalISO,
} from "../_lib/calendar";
import { layoutOverlaps } from "../_lib/layout";
import { formatMoney, formatTimeBR } from "@/lib/format";
import type { AppointmentStatus } from "@/lib/zod/agenda";
import type { DayAppt } from "./day-view";

const PX_PER_MINUTE = 1.4;

const WEEKDAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const WEEKDAYS_LONG = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const STATUS_BAR: Record<AppointmentStatus, string> = {
  scheduled: "bg-[var(--color-blue-500)]",
  confirmed: "bg-[var(--color-success-500)]",
  completed: "bg-[var(--color-gray-400)]",
  cancelled: "bg-[var(--color-error-500)]",
  no_show: "bg-[var(--color-warning-500)]",
};

const STATUS_SOLID: Record<AppointmentStatus, string> = {
  scheduled:
    "border-[var(--color-blue-700)] bg-[var(--color-blue-600)] text-white",
  confirmed:
    "border-[var(--color-success-700)] bg-[var(--color-success-600)] text-white",
  completed:
    "border-[var(--color-gray-500)] bg-[var(--color-gray-400)] text-white",
  cancelled:
    "border-[var(--color-error-700)] bg-[var(--color-error-600)] text-white",
  no_show:
    "border-[var(--color-warning-700)] bg-[var(--color-warning-500)] text-white",
};

const STATUS_SOLID_SUB: Record<AppointmentStatus, string> = {
  scheduled: "text-white/80",
  confirmed: "text-white/80",
  completed: "text-white/80",
  cancelled: "text-white/80",
  no_show: "text-white/85",
};

const STATUS_OPACITY: Record<AppointmentStatus, string> = {
  scheduled: "",
  confirmed: "",
  completed: "",
  cancelled: "opacity-60",
  no_show: "opacity-70",
};

function buildHours() {
  const hours: number[] = [];
  for (let h = HOUR_START; h <= HOUR_END; h++) hours.push(h);
  return hours;
}

export function WeekView({
  items,
  date,
  timezone,
}: {
  items: DayAppt[];
  date: string;
  timezone: string;
}) {
  const start = startOfWeekISO(date);
  const days = Array.from({ length: 7 }, (_, i) => shiftDate(start, i));
  const today = todayLocalISO(timezone);
  const hours = buildHours();
  const totalMinutes = (HOUR_END - HOUR_START + 1) * 60;
  const totalHeight = totalMinutes * PX_PER_MINUTE;
  const nowParts = localTimeParts(new Date().toISOString(), timezone);
  const nowHour = nowParts.hour;
  const nowMinutes = nowParts.totalMinutes;
  const nowOffset = (nowMinutes - HOUR_START * 60) * PX_PER_MINUTE;

  const byDay = new Map<string, DayAppt[]>();
  for (const a of items) {
    const k = localDateOnly(a.scheduled_at, timezone);
    const arr = byDay.get(k) ?? [];
    arr.push(a);
    byDay.set(k, arr);
  }

  return (
    <>
      {/* Mobile (<md): lista vertical agrupada por dia */}
      <div className="md:hidden">
        <ul className="divide-y divide-[var(--color-border-secondary)]">
          {days.map((d) => {
            const [y, m, dd] = d.split("-").map(Number);
            const dt = new Date(Date.UTC(y, m - 1, dd, 12));
            const dow = dt.getUTCDay();
            const isToday = d === today;
            const dayItems = (byDay.get(d) ?? [])
              .slice()
              .sort((a, b) => a.scheduled_at.localeCompare(b.scheduled_at));

            return (
              <li key={d} className="px-4 py-3">
                <Link
                  href={`/app/agenda?v=day&d=${d}`}
                  className="mb-2 flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue-500)] rounded"
                >
                  <div
                    className={`flex size-10 shrink-0 flex-col items-center justify-center rounded-lg ${
                      isToday
                        ? "bg-[var(--color-blue-600)] text-white"
                        : "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)]"
                    }`}
                  >
                    <span className="text-text-xs font-medium uppercase leading-none opacity-80">
                      {WEEKDAYS_SHORT[dow]}
                    </span>
                    <span className="text-text-md font-bold tabular-nums leading-none">
                      {String(dd).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="grid min-w-0 flex-1">
                    <span
                      className={`truncate text-text-sm font-semibold ${
                        isToday
                          ? "text-[var(--color-blue-700)]"
                          : "text-[var(--color-text-primary)]"
                      }`}
                    >
                      {WEEKDAYS_LONG[dow]}
                    </span>
                    <span className="text-text-xs text-[var(--color-text-tertiary)]">
                      {dayItems.length === 0
                        ? "Sem agendamentos"
                        : `${dayItems.length} ${
                            dayItems.length === 1
                              ? "agendamento"
                              : "agendamentos"
                          }`}
                    </span>
                  </div>
                </Link>

                {dayItems.length > 0 && (
                  <ul className="grid gap-1.5 pl-13">
                    {dayItems.map((a) => (
                      <li key={a.id}>
                        <Link
                          href={`/app/agenda?v=day&d=${d}`}
                          className={`flex flex-col overflow-hidden rounded-lg border px-3 py-2 transition-colors ${STATUS_SOLID[a.status]} ${STATUS_OPACITY[a.status]}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-text-sm font-semibold">
                              {formatTimeBR(a.scheduled_at, timezone)} ·{" "}
                              {a.client?.full_name ?? "—"}
                            </span>
                            <span className="shrink-0 text-text-xs tabular-nums text-white/85">
                              {formatMoney(a.price_cents)}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-text-xs text-white/85">
                            <span className="inline-flex items-center gap-1 truncate">
                              <ScissorsIcon size={12} weight="duotone" />
                              {a.service?.name ?? "—"}
                            </span>
                            {a.barber?.full_name && (
                              <span className="inline-flex items-center gap-1 truncate">
                                <UserSwitchIcon size={12} weight="duotone" />
                                {a.barber.full_name}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {dayItems.length === 0 && (
                  <div className="ml-13 flex items-center gap-2 text-text-xs text-[var(--color-text-quaternary)]">
                    <CalendarBlankIcon size={14} weight="duotone" />
                    Dia livre
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Desktop (md+): grade horária 7 colunas */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <div
            className="grid border-b border-[var(--color-border-secondary)]"
            style={{ gridTemplateColumns: "64px repeat(7, minmax(120px, 1fr))" }}
          >
            <div className="border-r border-[var(--color-border-secondary)]" />
            {days.map((d) => {
              const [y, m, dd] = d.split("-").map(Number);
              const dt = new Date(Date.UTC(y, m - 1, dd, 12));
              const dow = dt.getUTCDay();
              const isToday = d === today;
              return (
                <div
                  key={d}
                  className={`flex flex-col items-center justify-center gap-0.5 border-r border-[var(--color-border-secondary)] py-3 last:border-r-0 ${
                    isToday ? "bg-[var(--color-blue-50)]" : ""
                  }`}
                >
                  <span className="text-text-xs font-medium text-[var(--color-text-tertiary)]">
                    {WEEKDAYS_SHORT[dow]}
                  </span>
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-text-sm font-bold tabular-nums ${
                      isToday
                        ? "bg-[var(--color-blue-600)] text-white"
                        : "text-[var(--color-text-primary)]"
                    }`}
                  >
                    {String(dd).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="relative grid"
            style={{
              gridTemplateColumns: "64px repeat(7, minmax(120px, 1fr))",
              minHeight: totalHeight,
            }}
          >
            <div className="border-r border-[var(--color-border-secondary)]">
              {hours.map((h) => (
                <div
                  key={h}
                  className="relative text-text-xs font-medium text-[var(--color-text-tertiary)]"
                  style={{ height: 60 * PX_PER_MINUTE }}
                >
                  <span className="absolute -top-2 right-2 tabular-nums">
                    {String(h).padStart(2, "0")}:00
                  </span>
                </div>
              ))}
            </div>

            {days.map((d) => {
              const dayItems = byDay.get(d) ?? [];
              const dayPast = d < today;
              const dayIsToday = d === today;
              return (
                <div
                  key={d}
                  className="relative border-r border-[var(--color-border-secondary)] last:border-r-0"
                >
                  {hours.map((h) => {
                    const slotPast = dayPast || (dayIsToday && h < nowHour);
                    return (
                      <div
                        key={h}
                        className={`border-b border-[var(--color-border-secondary)] ${
                          slotPast
                            ? "bg-[var(--color-bg-secondary)]/40 [background-image:repeating-linear-gradient(135deg,transparent_0,transparent_8px,rgba(10,13,18,0.03)_8px,rgba(10,13,18,0.03)_9px)]"
                            : "bg-[var(--color-bg-primary)]"
                        }`}
                        style={{ height: 60 * PX_PER_MINUTE }}
                      />
                    );
                  })}
                  {dayIsToday && nowOffset >= 0 && nowOffset <= totalHeight && (
                    <div
                      className="pointer-events-none absolute left-0 right-0 z-10 h-px bg-[var(--color-error-500)]"
                      style={{ top: nowOffset }}
                    >
                      <span className="absolute -left-1 -top-1 size-2 rounded-full bg-[var(--color-error-500)]" />
                    </div>
                  )}
                  {layoutOverlaps(dayItems).map(({ appt: a, lane, total }) => {
                    const { totalMinutes: startMin } = localTimeParts(
                      a.scheduled_at,
                      timezone
                    );
                    const offsetTop =
                      (startMin - HOUR_START * 60) * PX_PER_MINUTE;
                    const height = Math.max(
                      44,
                      a.duration_minutes * PX_PER_MINUTE - 2
                    );
                    if (offsetTop < 0 || offsetTop > totalHeight) return null;
                    const widthPct = 100 / total;
                    const leftPct = widthPct * lane;
                    return (
                      <div
                        key={a.id}
                        className={`absolute flex flex-col overflow-hidden rounded-md border px-2 py-1.5 shadow-[0_1px_2px_rgb(10_13_18_/_0.08)] ${STATUS_SOLID[a.status]} ${STATUS_OPACITY[a.status]}`}
                        style={{
                          top: offsetTop,
                          height,
                          left: `calc(${leftPct}% + 4px)`,
                          width: `calc(${widthPct}% - ${total > 1 ? 2 : 8}px)`,
                        }}
                        title={`${formatTimeBR(a.scheduled_at, timezone)} · ${
                          a.client?.full_name ?? ""
                        } · ${a.service?.name ?? ""} · ${formatMoney(
                          a.price_cents
                        )}`}
                      >
                        <div className="truncate text-text-xs font-semibold leading-tight">
                          {a.client?.full_name ?? "—"}
                        </div>
                        <div
                          className={`truncate text-text-xs leading-tight tabular-nums ${STATUS_SOLID_SUB[a.status]}`}
                        >
                          {formatTimeBR(a.scheduled_at, timezone)} ·{" "}
                          {a.service?.name ?? ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <span className="sr-only">{isoFromDate(new Date(), timezone)}</span>
    </>
  );
}
