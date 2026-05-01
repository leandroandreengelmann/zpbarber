"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  CalendarBlankIcon,
  ClockIcon,
  CloudSunIcon,
  MoonStarsIcon,
  SunIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  AvailableDay,
  getAvailableDaysAction,
  getAvailableSlotsAction,
  SlotInfo,
} from "./actions";

const WEEKDAY_LABEL = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTH_LABEL = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

type Slot = { start: string; label: string };

function toLocalISO(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseLocalDateTime(s: string) {
  const [date, time] = s.split("T");
  if (!date) return null;
  const [y, mo, d] = date.split("-").map(Number);
  const [h = 0, mi = 0] = (time ?? "00:00").split(":").map(Number);
  return new Date(y, mo - 1, d, h, mi, 0, 0);
}

function formatDayLong(d: Date) {
  return `${WEEKDAY_LABEL[d.getDay()]}, ${d.getDate()} de ${MONTH_LABEL[d.getMonth()]}`;
}

function formatTime(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function groupSlots(slots: Slot[]) {
  const morning: Slot[] = [];
  const afternoon: Slot[] = [];
  const evening: Slot[] = [];
  for (const s of slots) {
    const h = parseInt(s.label.slice(0, 2), 10);
    if (h < 12) morning.push(s);
    else if (h < 18) afternoon.push(s);
    else evening.push(s);
  }
  return { morning, afternoon, evening };
}

export function SlotPicker({
  value,
  onChange,
  barberId,
  serviceId,
  baseDate,
  excludeAppointmentId,
  fetchSlots,
  fetchDays,
  disabled,
}: {
  value: string;
  onChange: (next: string) => void;
  barberId: string;
  serviceId: string;
  baseDate: string;
  excludeAppointmentId?: string;
  fetchSlots: typeof getAvailableSlotsAction;
  fetchDays: typeof getAvailableDaysAction;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const fromValue = value ? parseLocalDateTime(value) : null;
    return fromValue ? toLocalISO(fromValue) : baseDate;
  });
  const [info, setInfo] = useState<SlotInfo | null>(null);
  const [days, setDays] = useState<AvailableDay[] | null>(null);
  const [pendingSlots, startSlotsTransition] = useTransition();
  const [pendingDays, startDaysTransition] = useTransition();

  const ready = !!barberId && !!serviceId;
  const valueDate = value ? parseLocalDateTime(value) : null;

  useEffect(() => {
    if (!open || !ready) return;
    const today = new Date();
    const fromDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    startDaysTransition(async () => {
      const result = await fetchDays({ barberId, serviceId, fromDate, days: 14 });
      setDays(result);
      if (result.length > 0 && !result.some((d) => d.date === selectedDate)) {
        setSelectedDate(result[0].date);
      }
    });
  }, [open, ready, barberId, serviceId, fetchDays, selectedDate]);

  useEffect(() => {
    if (!open || !ready) return;
    if (!days || !days.some((d) => d.date === selectedDate)) return;
    startSlotsTransition(async () => {
      const result = await fetchSlots({
        barberId,
        serviceId,
        date: selectedDate,
        excludeAppointmentId,
      });
      setInfo(result);
    });
  }, [open, ready, selectedDate, barberId, serviceId, excludeAppointmentId, fetchSlots, days]);

  function handlePick(start: string) {
    onChange(start);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!disabled) setOpen(true);
        }}
        disabled={disabled}
        className="flex h-12 w-full items-center justify-between gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3.5 text-left text-text-md text-[var(--color-text-primary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)] transition-shadow outline-none focus-visible:border-[var(--color-border-brand)] focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--color-border-brand)_24%,transparent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span className="flex min-w-0 items-center gap-2">
          <CalendarBlankIcon
            size={20}
            weight="duotone"
            className="shrink-0 text-[var(--color-fg-quaternary)]"
          />
          {valueDate ? (
            <span className="flex flex-col leading-tight">
              <span className="truncate font-medium capitalize">
                {formatDayLong(valueDate)}
              </span>
              <span className="text-text-xs text-[var(--color-text-tertiary)]">
                {formatTime(valueDate)}
              </span>
            </span>
          ) : (
            <span className="text-[var(--color-text-placeholder)]">
              Escolher data e horário
            </span>
          )}
        </span>
        <ClockIcon
          size={20}
          weight="duotone"
          className="shrink-0 text-[var(--color-fg-quaternary)]"
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[90dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-md">
          <DialogHeader className="px-4 pt-5 sm:px-6 sm:pt-6">
            <DialogTitle>Escolher horário</DialogTitle>
            <DialogDescription>
              {ready
                ? "Toque em um dia, depois em um horário disponível."
                : "Selecione barbeiro e serviço primeiro."}
            </DialogDescription>
          </DialogHeader>

          <div className="sticky top-0 z-10 border-b border-[var(--color-border-secondary)] bg-popover px-4 pb-3 pt-3 sm:px-6">
            {ready && days && days.length > 0 && (
              <p className="mb-2 text-text-xs text-[var(--color-text-tertiary)]">
                Essas são as datas de atendimento do barbeiro. Toque em um dia
                para ver os horários.
              </p>
            )}
            {pendingDays && !days ? (
              <DayStripSkeleton />
            ) : days && days.length > 0 ? (
              <DayStrip
                days={days}
                selected={selectedDate}
                onSelect={setSelectedDate}
              />
            ) : null}
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-5 pt-4 sm:px-6">
            {!ready ? (
              <EmptyHint
                icon={<WarningCircleIcon size={32} weight="duotone" />}
                text="Selecione barbeiro e serviço para ver os horários."
              />
            ) : days && days.length === 0 ? (
              <EmptyHint
                icon={<CalendarBlankIcon size={32} weight="duotone" />}
                text="Sem dias disponíveis nas próximas 2 semanas."
              />
            ) : pendingSlots || pendingDays ? (
              <SlotsSkeleton />
            ) : info?.closed ? (
              <EmptyHint
                icon={<CalendarBlankIcon size={32} weight="duotone" />}
                text="Barbeiro fechado neste dia."
              />
            ) : info && info.slots.length === 0 ? (
              <EmptyHint
                icon={<ClockIcon size={32} weight="duotone" />}
                text="Sem horários livres neste dia."
              />
            ) : info ? (
              <SlotGroups slots={info.slots} value={value} onPick={handlePick} />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function DayStrip({
  days,
  selected,
  onSelect,
}: {
  days: AvailableDay[];
  selected: string;
  onSelect: (iso: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const btn = buttonRefs.current.get(selected);
    if (btn) {
      btn.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }
  }, [selected]);

  const todayISO = useMemo(() => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  }, []);

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Dias"
      className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {days.map((day) => {
        const iso = day.date;
        const isSelected = iso === selected;
        const isToday = iso === todayISO;
        const parsed = parseLocalDateTime(`${iso}T00:00`);
        if (!parsed) return null;
        return (
          <button
            key={iso}
            ref={(el) => {
              if (el) buttonRefs.current.set(iso, el);
              else buttonRefs.current.delete(iso);
            }}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelect(iso)}
            className={`flex min-h-14 min-w-[60px] shrink-0 flex-col items-center justify-center rounded-xl border px-3 py-1.5 transition-colors ${
              isSelected
                ? "border-[var(--color-blue-700)] bg-[var(--color-blue-600)] text-white shadow-[0_2px_8px_-2px_rgb(41_112_255_/_0.4)]"
                : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
            }`}
          >
            <span className="text-text-xs font-medium uppercase opacity-80">
              {isToday ? "Hoje" : WEEKDAY_LABEL[day.weekday]}
            </span>
            <span className="text-display-xs font-bold tabular-nums leading-none">
              {parsed.getDate()}
            </span>
            <span className="text-text-xs opacity-70">
              {MONTH_LABEL[parsed.getMonth()]}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function DayStripSkeleton() {
  return (
    <div className="flex gap-2 overflow-hidden">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="h-14 min-w-[60px] shrink-0 animate-pulse rounded-xl bg-[var(--color-bg-secondary)]"
        />
      ))}
    </div>
  );
}

function SlotGroups({
  slots,
  value,
  onPick,
}: {
  slots: Slot[];
  value: string;
  onPick: (start: string) => void;
}) {
  const { morning, afternoon, evening } = useMemo(() => groupSlots(slots), [slots]);

  return (
    <div className="grid gap-5">
      {morning.length > 0 && (
        <SlotSection
          icon={<SunIcon size={18} weight="duotone" />}
          title="Manhã"
          slots={morning}
          value={value}
          onPick={onPick}
        />
      )}
      {afternoon.length > 0 && (
        <SlotSection
          icon={<CloudSunIcon size={18} weight="duotone" />}
          title="Tarde"
          slots={afternoon}
          value={value}
          onPick={onPick}
        />
      )}
      {evening.length > 0 && (
        <SlotSection
          icon={<MoonStarsIcon size={18} weight="duotone" />}
          title="Noite"
          slots={evening}
          value={value}
          onPick={onPick}
        />
      )}
    </div>
  );
}

function SlotSection({
  icon,
  title,
  slots,
  value,
  onPick,
}: {
  icon: React.ReactNode;
  title: string;
  slots: Slot[];
  value: string;
  onPick: (start: string) => void;
}) {
  return (
    <section>
      <header className="mb-2 flex items-center gap-1.5 text-text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
        <span className="text-[var(--color-fg-quaternary)]">{icon}</span>
        {title}
        <span className="ml-1 rounded-full bg-[var(--color-bg-secondary)] px-1.5 py-0.5 text-text-xs font-medium normal-case tracking-normal text-[var(--color-text-secondary)] tabular-nums">
          {slots.length}
        </span>
      </header>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((s) => {
          const isSelected = value === s.start;
          return (
            <button
              key={s.start}
              type="button"
              onClick={() => onPick(s.start)}
              className={`h-12 rounded-lg border text-text-md font-semibold tabular-nums transition-colors ${
                isSelected
                  ? "border-[var(--color-blue-700)] bg-[var(--color-blue-600)] text-white shadow-[0_2px_8px_-2px_rgb(41_112_255_/_0.4)]"
                  : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] hover:border-[var(--color-blue-500)] hover:bg-[var(--color-blue-50)]"
              }`}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function SlotsSkeleton() {
  return (
    <div className="grid gap-5">
      {[8, 8, 4].map((count, idx) => (
        <div key={idx}>
          <div className="mb-2 h-3 w-16 animate-pulse rounded bg-[var(--color-bg-secondary)]" />
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-[var(--color-bg-secondary)]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyHint({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-text-sm text-[var(--color-text-tertiary)]">
      <span className="text-[var(--color-fg-quaternary)]">{icon}</span>
      {text}
    </div>
  );
}
