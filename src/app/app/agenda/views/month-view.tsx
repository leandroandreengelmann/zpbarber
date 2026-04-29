import Link from "next/link";
import { LockSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import {
  getMonthGrid,
  localDateOnly,
  startOfMonthISO,
  todayLocalISO,
} from "../_lib/calendar";
import { formatTimeBR } from "@/lib/format";
import type { AppointmentStatus } from "@/lib/zod/agenda";
import type { DayAppt } from "./day-view";

const WEEKDAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const WEEKDAYS_INITIAL = ["D", "S", "T", "Q", "Q", "S", "S"];

const STATUS_DOT: Record<AppointmentStatus, string> = {
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

export function MonthView({
  items,
  date,
}: {
  items: DayAppt[];
  date: string;
}) {
  const monthStart = startOfMonthISO(date);
  const grid = getMonthGrid(date);
  const today = todayLocalISO();
  const monthNum = Number(monthStart.split("-")[1]);

  const byDay = new Map<string, DayAppt[]>();
  for (const a of items) {
    const k = localDateOnly(a.scheduled_at);
    const arr = byDay.get(k) ?? [];
    arr.push(a);
    byDay.set(k, arr);
  }

  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-7 border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]">
        {WEEKDAYS_SHORT.map((w, i) => (
          <div
            key={w + i}
            className="border-r border-[var(--color-border-secondary)] py-2 text-center text-text-xs font-medium text-[var(--color-text-tertiary)] last:border-r-0"
          >
            <span className="hidden sm:inline">{w}</span>
            <span className="sm:hidden">{WEEKDAYS_INITIAL[i]}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {grid.map((iso) => {
          const dayItems = (byDay.get(iso) ?? []).slice().sort((a, b) =>
            a.scheduled_at.localeCompare(b.scheduled_at)
          );
          const inMonth = Number(iso.split("-")[1]) === monthNum;
          const isToday = iso === today;
          const isPast = iso < today;
          const dayNum = Number(iso.split("-")[2]);

          // status únicos do dia (até 4 dots)
          const uniqueStatuses = Array.from(
            new Set(dayItems.map((a) => a.status))
          ).slice(0, 4) as AppointmentStatus[];

          const cellClasses = `group relative flex min-h-[64px] flex-col gap-1 border-r border-b border-[var(--color-border-secondary)] p-1.5 transition-colors sm:min-h-[140px] sm:p-2 ${
            inMonth
              ? "bg-[var(--color-bg-primary)]"
              : "bg-[var(--color-bg-secondary)]/50"
          } ${isPast ? "cursor-not-allowed" : "hover:bg-[var(--color-bg-secondary)]"}`;

          const content = (
            <>
              <div className="flex items-center justify-center gap-1 sm:justify-start">
                <span
                  className={`flex size-7 items-center justify-center rounded-full text-text-sm font-semibold tabular-nums sm:size-6 sm:text-text-xs ${
                    isToday
                      ? "bg-[var(--color-blue-600)] text-white"
                      : inMonth
                        ? "text-[var(--color-text-primary)] sm:text-[var(--color-text-tertiary)]"
                        : "text-[var(--color-text-quaternary)]"
                  }`}
                >
                  {dayNum}
                </span>
                {isPast && (
                  <LockSimpleIcon
                    size={12}
                    weight="duotone"
                    className="hidden text-[var(--color-text-quaternary)] sm:block"
                  />
                )}
              </div>

              {/* Mobile: dots compactos centralizados */}
              {dayItems.length > 0 && (
                <div className="flex items-center justify-center gap-0.5 sm:hidden">
                  {uniqueStatuses.map((s) => (
                    <span
                      key={s}
                      className={`size-1.5 rounded-full ${STATUS_DOT[s]}`}
                    />
                  ))}
                  {dayItems.length > 1 && (
                    <span className="ml-0.5 text-[10px] font-semibold tabular-nums text-[var(--color-text-tertiary)]">
                      {dayItems.length}
                    </span>
                  )}
                </div>
              )}

              {/* Desktop: lista detalhada */}
              <div
                className={`hidden sm:grid sm:gap-1 ${isPast && !isToday ? "opacity-60" : ""}`}
              >
                {dayItems.slice(0, 3).map((a) => (
                  <div
                    key={a.id}
                    className={`flex items-center gap-1 truncate rounded-md border px-2 py-1 ${STATUS_SOLID[a.status]}`}
                  >
                    <span className="truncate text-text-xs font-semibold">
                      {a.client?.full_name ?? "—"}
                    </span>
                    <span className="ml-auto shrink-0 text-text-xs tabular-nums text-white/85">
                      {formatTimeBR(a.scheduled_at)}
                    </span>
                  </div>
                ))}
                {dayItems.length > 3 && (
                  <span className="px-2 text-text-xs font-medium text-[var(--color-blue-600)]">
                    +{dayItems.length - 3} mais
                  </span>
                )}
              </div>
            </>
          );

          return isPast ? (
            <div
              key={iso}
              className={cellClasses}
              aria-disabled="true"
              title="Data passada — não é possível agendar"
            >
              {content}
            </div>
          ) : (
            <Link
              key={iso}
              href={`/app/agenda?v=day&d=${iso}`}
              className={cellClasses}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
