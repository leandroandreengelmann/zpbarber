import {
  CalendarBlankIcon,
  CaretLeftIcon,
  CaretRightIcon,
  PlusIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { formatMoney } from "@/lib/format";
import {
  createAppointmentAction,
  createClientAction,
  getAvailableDaysAction,
  getAvailableSlotsAction,
} from "./actions";
import {
  AppointmentForm,
  type BarberOpt,
  type BarberServiceLink,
  type ClientOpt,
  type ServiceOpt,
} from "./appointment-form";
import { ClientQuickForm } from "./client-quick-form";
import { DayView, type DayAppt } from "./views/day-view";
import { WeekView } from "./views/week-view";
import { MonthView } from "./views/month-view";
import { NewAppointmentFab } from "./_components/new-appointment-fab";
import type {
  SaleClient,
  SaleProduct,
  SaleService,
} from "@/app/app/caixa/_components/new-sale-form";
import {
  dayBoundsUTC,
  dayOfMonth,
  formatDayHeader,
  formatMonthHeader,
  formatWeekHeader,
  isISODate,
  monthBoundsUTC,
  shiftDate,
  shiftMonth,
  shortMonthName,
  startOfMonthISO,
  startOfWeekISO,
  todayLocalISO,
  weekBoundsUTC,
  type CalendarView,
  VIEW_LABEL,
} from "./_lib/calendar";

const VIEWS: CalendarView[] = ["day", "week", "month"];
function isView(v: unknown): v is CalendarView {
  return typeof v === "string" && (VIEWS as string[]).includes(v);
}

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string; v?: string }>;
}) {
  const sp = await searchParams;
  const { user, membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  const timezone = membership.barbershop!.timezone ?? "America/Sao_Paulo";
  const date = isISODate(sp.d) ? sp.d : todayLocalISO(timezone);
  const view: CalendarView = isView(sp.v) ? sp.v : "day";
  const isBarberRole = !can(membership, "agenda.gerenciar");
  const supabase = await createClient();

  const { startISO, endISO } =
    view === "day"
      ? dayBoundsUTC(date, timezone)
      : view === "week"
        ? weekBoundsUTC(date, timezone)
        : monthBoundsUTC(date, timezone);

  let apptQuery = supabase
    .from("appointments")
    .select(
      "id, scheduled_at, duration_minutes, price_cents, status, source, client_id, service_id, barber_id, client:clients(full_name), service:services(name), barber:profiles!appointments_barber_id_fkey(full_name)"
    )
    .eq("barbershop_id", shopId)
    .gte("scheduled_at", startISO)
    .lte("scheduled_at", endISO);
  if (isBarberRole) apptQuery = apptQuery.eq("barber_id", user.id);

  const [
    { data: appointments },
    { data: clients },
    { data: services },
    { data: members },
    { data: barberServices },
    { data: linkedSales },
    { data: productsRaw },
  ] = await Promise.all([
    apptQuery.order("scheduled_at"),
    supabase
      .from("clients")
      .select("id, full_name, phone")
      .eq("barbershop_id", shopId)
      .order("full_name"),
    supabase
      .from("services")
      .select("id, name, duration_minutes, price_cents")
      .eq("barbershop_id", shopId)
      .eq("is_active", true)
      .order("name"),
    supabase
      .from("barbershop_members")
      .select("role, is_active, user:profiles(id, full_name)")
      .eq("barbershop_id", shopId)
      .eq("is_active", true)
      .in("role", ["barbeiro", "gestor"]),
    supabase
      .from("barber_services")
      .select("barber_id, service_id, price_cents, duration_minutes")
      .eq("barbershop_id", shopId)
      .eq("is_active", true),
    supabase
      .from("sales")
      .select("appointment_id, status")
      .eq("barbershop_id", shopId)
      .not("appointment_id", "is", null)
      .in("status", ["open", "paid"]),
    supabase
      .from("products")
      .select("id, name, price_cents, stock_qty")
      .eq("barbershop_id", shopId)
      .eq("is_active", true)
      .order("name"),
  ]);

  const billedApptIds = new Set(
    (linkedSales ?? [])
      .map((s: { appointment_id: string | null }) => s.appointment_id)
      .filter((id: string | null): id is string => Boolean(id))
  );

  const items: DayAppt[] = ((appointments ?? []) as unknown as DayAppt[]).map(
    (a) => ({
      ...a,
      needs_billing: a.status === "completed" && !billedApptIds.has(a.id),
    })
  );
  const totalCents = items
    .filter((a) => a.status !== "cancelled" && a.status !== "no_show")
    .reduce((sum, a) => sum + (a.price_cents ?? 0), 0);

  const barbers: BarberOpt[] = (members ?? [])
    .map((m) => m.user)
    .filter((u): u is { id: string; full_name: string } => Boolean(u?.id))
    .map((u) => ({ id: u.id, full_name: u.full_name ?? "—" }));

  const clientOpts: ClientOpt[] = (clients ?? []).map((c) => ({
    id: c.id,
    full_name: c.full_name,
    phone: c.phone,
  }));
  const serviceOpts: ServiceOpt[] = services ?? [];
  const barberServiceLinks: BarberServiceLink[] = (barberServices ?? []).map((bs) => ({
    barber_id: bs.barber_id,
    service_id: bs.service_id,
    price_cents: bs.price_cents,
    duration_minutes: bs.duration_minutes,
  }));

  const saleClients: SaleClient[] = (clients ?? []).map((c) => ({
    id: c.id,
    full_name: c.full_name,
    phone: c.phone ?? null,
  }));
  const saleServices: SaleService[] = (services ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    price_cents: s.price_cents,
  }));
  const saleProducts: SaleProduct[] = (productsRaw ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    price_cents: p.price_cents,
    stock_qty: p.stock_qty,
  }));

  const navPrev =
    view === "day"
      ? shiftDate(date, -1)
      : view === "week"
        ? shiftDate(startOfWeekISO(date), -7)
        : shiftMonth(startOfMonthISO(date), -1);
  const navNext =
    view === "day"
      ? shiftDate(date, 1)
      : view === "week"
        ? shiftDate(startOfWeekISO(date), 7)
        : shiftMonth(startOfMonthISO(date), 1);

  const headerText =
    view === "day"
      ? formatDayHeader(date, timezone)
      : view === "week"
        ? formatWeekHeader(startOfWeekISO(date), timezone)
        : formatMonthHeader(date, timezone);

  const iconISO =
    view === "day"
      ? date
      : view === "week"
        ? startOfWeekISO(date)
        : startOfMonthISO(date);
  const iconMonth = shortMonthName(iconISO, timezone);
  const iconDay = dayOfMonth(iconISO);

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            Agenda
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            Atendimentos do dia, com confirmação e baixa rápida.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger
              className={buttonVariants({ variant: "outline", className: "h-11" })}
            >
              <UserCircleIcon size={28} weight="duotone" />
              <span className="hidden sm:inline">Novo cliente</span>
              <span className="sm:hidden">Cliente</span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo cliente</DialogTitle>
                <DialogDescription>
                  Cadastro rápido — só nome é obrigatório.
                </DialogDescription>
              </DialogHeader>
              <ClientQuickForm action={createClientAction} />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger
              className={buttonVariants({
                size: "lg",
                className: "hidden h-11 md:inline-flex",
              })}
            >
              <PlusIcon size={28} weight="duotone" />
              Novo agendamento
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Novo agendamento</DialogTitle>
                <DialogDescription>
                  Selecione cliente, serviço e horário.
                </DialogDescription>
              </DialogHeader>
              <AppointmentForm
                action={createAppointmentAction}
                createClientAction={createClientAction}
                getAvailableSlotsAction={getAvailableSlotsAction}
                getAvailableDaysAction={getAvailableDaysAction}
                clients={clientOpts}
                services={serviceOpts}
                barbers={barbers}
                barberServices={barberServiceLinks}
                lockedBarberId={isBarberRole ? user.id : undefined}
                defaultDate={
                  view === "day" && date >= todayLocalISO(timezone)
                    ? date
                    : todayLocalISO(timezone)
                }
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <NewAppointmentFab
        action={createAppointmentAction}
        createClientAction={createClientAction}
        getAvailableSlotsAction={getAvailableSlotsAction}
        getAvailableDaysAction={getAvailableDaysAction}
        clients={clientOpts}
        services={serviceOpts}
        barbers={barbers}
        barberServices={barberServiceLinks}
        lockedBarberId={isBarberRole ? user.id : undefined}
        defaultDate={
          view === "day" && date >= todayLocalISO(timezone) ? date : todayLocalISO(timezone)
        }
      />

      <Card className="p-0">
        <div className="flex flex-col gap-3 border-b border-[var(--color-border-secondary)] px-4 py-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-4 md:px-6 md:py-4">
          <div className="flex items-center gap-2">
            <Link
              href={`/app/agenda?v=${view}&d=${navPrev}`}
              aria-label="Anterior"
              className={buttonVariants({ variant: "outline", size: "icon-sm", className: "h-10 w-10 sm:h-8 sm:w-8" })}
            >
              <CaretLeftIcon size={24} weight="duotone" />
            </Link>
            <Link
              href={`/app/agenda?v=${view}&d=${todayLocalISO(timezone)}`}
              className={buttonVariants({ variant: "outline", size: "sm", className: "h-10 sm:h-8" })}
            >
              Hoje
            </Link>
            <Link
              href={`/app/agenda?v=${view}&d=${navNext}`}
              aria-label="Próximo"
              className={buttonVariants({ variant: "outline", size: "icon-sm", className: "h-10 w-10 sm:h-8 sm:w-8" })}
            >
              <CaretRightIcon size={24} weight="duotone" />
            </Link>
            <div className="ml-2 flex min-w-0 flex-1 items-center gap-3 md:ml-3">
              <div className="flex h-12 w-14 shrink-0 flex-col overflow-hidden rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] md:h-14 md:w-16">
                <span className="bg-[var(--color-bg-secondary)] py-0.5 text-center text-text-xs font-semibold uppercase text-[var(--color-text-tertiary)]">
                  {iconMonth}
                </span>
                <span className="flex flex-1 items-center justify-center text-text-md font-bold tabular-nums text-[var(--color-blue-700)] md:text-text-lg">
                  {iconDay}
                </span>
              </div>
              <div className="grid min-w-0">
                <span className="truncate text-text-sm font-semibold capitalize text-[var(--color-text-primary)] md:text-text-md">
                  {headerText}
                </span>
                <span className="truncate text-text-xs text-[var(--color-text-tertiary)]">
                  {items.length} {items.length === 1 ? "agend." : "agend."} · {formatMoney(totalCents)}
                </span>
              </div>
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-1 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-1 shadow-[0_1px_2px_rgb(10_13_18_/_0.05)] md:inline-flex md:w-auto">
            {VIEWS.map((v) => {
              const active = v === view;
              return (
                <Link
                  key={v}
                  href={`/app/agenda?v=${v}&d=${date}`}
                  className={`flex h-10 items-center justify-center rounded-md px-3 text-text-sm font-medium transition-colors md:h-auto md:py-1.5 ${
                    active
                      ? "bg-[var(--color-blue-50)] text-[var(--color-blue-700)]"
                      : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                  }`}
                >
                  {VIEW_LABEL[v]}
                </Link>
              );
            })}
          </div>
        </div>

        <CardContent className="p-0">
          {items.length === 0 && view === "day" ? (
            <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)]">
                <CalendarBlankIcon size={28} weight="duotone" />
              </div>
              <div className="grid gap-1">
                <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Nada agendado
                </p>
                <p className="text-text-sm text-[var(--color-text-tertiary)]">
                  Use o botão Novo agendamento para começar.
                </p>
              </div>
            </div>
          ) : view === "day" ? (
            <DayView
              items={items}
              date={date}
              timezone={timezone}
              clients={saleClients}
              services={saleServices}
              products={saleProducts}
              formClients={clientOpts}
              formServices={serviceOpts}
              barbers={barbers}
              barberServices={barberServiceLinks}
              lockedBarberId={isBarberRole ? user.id : undefined}
              createClientAction={createClientAction}
              getAvailableSlotsAction={getAvailableSlotsAction}
              getAvailableDaysAction={getAvailableDaysAction}
            />
          ) : view === "week" ? (
            <WeekView items={items} date={date} timezone={timezone} />
          ) : (
            <MonthView items={items} date={date} timezone={timezone} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
