import {
  CashRegisterIcon,
  ScissorsIcon,
  UserSwitchIcon,
} from "@phosphor-icons/react/dist/ssr";
import { formatTimeBR, formatMoney } from "@/lib/format";
import {
  HOUR_END,
  HOUR_START,
  SLOT_MINUTES,
  localTimeParts,
  todayLocalISO,
} from "../_lib/calendar";
import { layoutOverlaps } from "../_lib/layout";
import type { AppointmentStatus } from "@/lib/zod/agenda";
import { AppointmentMenu } from "../_components/appointment-menu";
import type {
  BarberOpt,
  BarberServiceLink,
  ClientOpt,
  ServiceOpt,
} from "../appointment-form";
import type {
  SaleClient,
  SaleProduct,
  SaleService,
} from "@/app/app/caixa/_components/new-sale-form";

export type DayAppt = {
  id: string;
  scheduled_at: string;
  duration_minutes: number;
  price_cents: number;
  status: AppointmentStatus;
  source?: "manual" | "public" | "whatsapp";
  client_id: string;
  service_id: string;
  barber_id: string | null;
  needs_billing?: boolean;
  client?: { full_name?: string | null } | null;
  service?: { name?: string | null } | null;
  barber?: { full_name?: string | null } | null;
};

const STATUS_BAR: Record<AppointmentStatus, string> = {
  scheduled: "bg-[var(--color-blue-500)]",
  confirmed: "bg-[var(--color-success-500)]",
  completed: "bg-[var(--color-gray-400)]",
  cancelled: "bg-[var(--color-error-500)]",
  no_show: "bg-[var(--color-warning-500)]",
};

const STATUS_SOLID: Record<AppointmentStatus, string> = {
  scheduled:
    "border-[var(--color-blue-700)] bg-[var(--color-blue-600)] text-white hover:bg-[var(--color-blue-700)]",
  confirmed:
    "border-[var(--color-success-700)] bg-[var(--color-success-600)] text-white hover:bg-[var(--color-success-700)]",
  completed:
    "border-[var(--color-gray-500)] bg-[var(--color-gray-400)] text-white hover:bg-[var(--color-gray-500)]",
  cancelled:
    "border-[var(--color-error-700)] bg-[var(--color-error-600)] text-white hover:bg-[var(--color-error-700)]",
  no_show:
    "border-[var(--color-warning-700)] bg-[var(--color-warning-500)] text-white hover:bg-[var(--color-warning-600)]",
};

const STATUS_OPACITY: Record<AppointmentStatus, string> = {
  scheduled: "",
  confirmed: "",
  completed: "",
  cancelled: "opacity-60",
  no_show: "opacity-70",
};

const PX_PER_MINUTE = 1.2;

function buildHours() {
  const hours: number[] = [];
  for (let h = HOUR_START; h <= HOUR_END; h++) hours.push(h);
  return hours;
}

export function DayView({
  items,
  date,
  clients,
  services,
  products,
  formClients,
  formServices,
  barbers,
  barberServices,
  lockedBarberId,
}: {
  items: DayAppt[];
  date: string;
  clients: SaleClient[];
  services: SaleService[];
  products: SaleProduct[];
  formClients: ClientOpt[];
  formServices: ServiceOpt[];
  barbers: BarberOpt[];
  barberServices: BarberServiceLink[];
  lockedBarberId?: string;
}) {
  const hours = buildHours();
  const totalMinutes = (HOUR_END - HOUR_START + 1) * 60;
  const totalHeight = totalMinutes * PX_PER_MINUTE;
  const today = todayLocalISO();
  const isPastDay = date < today;
  const isToday = date === today;
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowOffset = (nowMinutes - HOUR_START * 60) * PX_PER_MINUTE;

  return (
    <div className="overflow-x-auto">
      <div
        className="relative grid"
        style={{
          gridTemplateColumns: "64px 1fr",
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

        <div className="relative">
          {hours.map((h) => {
            const slotPast = isPastDay || (isToday && h < now.getHours());
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

          {isToday && nowOffset >= 0 && nowOffset <= totalHeight && (
            <div
              className="pointer-events-none absolute left-0 right-0 z-10 h-px bg-[var(--color-error-500)]"
              style={{ top: nowOffset }}
            >
              <span className="absolute -left-1 -top-1 size-2 rounded-full bg-[var(--color-error-500)]" />
            </div>
          )}

          {layoutOverlaps(items).map(({ appt: a, lane, total }) => {
            const { totalMinutes: startMin } = localTimeParts(a.scheduled_at);
            const offsetTop = (startMin - HOUR_START * 60) * PX_PER_MINUTE;
            const height = Math.max(
              SLOT_MINUTES * PX_PER_MINUTE,
              a.duration_minutes * PX_PER_MINUTE - 2
            );
            if (offsetTop < 0 || offsetTop > totalHeight) return null;
            const widthPct = 100 / total;
            const leftPct = widthPct * lane;
            return (
              <div
                key={a.id}
                className="absolute"
                style={{
                  top: offsetTop,
                  height,
                  left: `calc(${leftPct}% + 8px)`,
                  width: `calc(${widthPct}% - ${total > 1 ? 4 : 16}px)`,
                }}
              >
                <AppointmentMenu
                  appt={a}
                  clients={clients}
                  services={services}
                  products={products}
                  formClients={formClients}
                  formServices={formServices}
                  barbers={barbers}
                  barberServices={barberServices}
                  lockedBarberId={lockedBarberId}
                >
                  <div
                    className={`flex h-full w-full items-center overflow-hidden rounded-lg border px-3 py-2 shadow-[0_1px_2px_rgb(10_13_18_/_0.08)] transition-colors ${STATUS_SOLID[a.status]} ${STATUS_OPACITY[a.status]}`}
                  >
                    <span className="inline-flex min-w-0 flex-1 items-center gap-1 truncate text-text-sm font-semibold">
                      {a.needs_billing && (
                        <CashRegisterIcon
                          size={14}
                          weight="duotone"
                          className="shrink-0"
                        />
                      )}
                      {formatTimeBR(a.scheduled_at)} · {a.client?.full_name ?? "—"}
                    </span>
                    <span className="shrink-0 text-text-xs tabular-nums text-white/85">
                      {formatMoney(a.price_cents)}
                    </span>
                  </div>
                </AppointmentMenu>
              </div>
            );
          })}
        </div>
      </div>
      <span className="sr-only">{date}</span>
    </div>
  );
}

export function DayList({
  items,
  empty,
}: {
  items: DayAppt[];
  empty: React.ReactNode;
}) {
  if (items.length === 0) return <>{empty}</>;
  return (
    <ul className="divide-y divide-[var(--color-border-secondary)]">
      {items.map((a) => (
        <li key={a.id} className="flex flex-wrap items-center gap-4 px-6 py-5">
          <div className="flex w-20 shrink-0 flex-col">
            <span className="text-display-xs font-semibold tabular-nums text-[var(--color-text-primary)]">
              {formatTimeBR(a.scheduled_at)}
            </span>
            <span className="text-text-xs text-[var(--color-text-tertiary)]">
              {a.duration_minutes} min
            </span>
          </div>
          <div className="grid flex-1 gap-1">
            <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
              {a.client?.full_name ?? "—"}
            </span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-text-sm text-[var(--color-text-tertiary)]">
              <span className="inline-flex items-center gap-1.5">
                <ScissorsIcon size={16} weight="duotone" />
                {a.service?.name ?? "—"}
              </span>
              {a.barber?.full_name && (
                <span className="inline-flex items-center gap-1.5">
                  <UserSwitchIcon size={16} weight="duotone" />
                  {a.barber.full_name}
                </span>
              )}
            </div>
          </div>
          <span className="text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
            {formatMoney(a.price_cents)}
          </span>
        </li>
      ))}
    </ul>
  );
}
