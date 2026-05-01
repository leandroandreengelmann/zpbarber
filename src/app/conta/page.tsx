import Link from "next/link";
import {
  CalendarBlankIcon,
  CalendarCheckIcon,
  ClockIcon,
  ScissorsIcon,
  StorefrontIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireClient } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { formatDateBR, formatMoney, formatTimeBR } from "@/lib/format";
import { CancelAppointmentButton } from "./cancel-button";

const STATUS_LABEL: Record<string, string> = {
  scheduled: "Agendado",
  confirmed: "Confirmado",
  completed: "Concluído",
  cancelled: "Cancelado",
  no_show: "Não compareceu",
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  scheduled: "secondary",
  confirmed: "default",
  completed: "outline",
  cancelled: "destructive",
  no_show: "destructive",
};

export default async function ContaHomePage() {
  await requireClient();
  const supabase = await createClient();

  const [{ data: upcoming }, { data: past }] = await Promise.all([
    supabase.rpc("fn_client_my_appointments", { p_only_upcoming: true }),
    supabase.rpc("fn_client_my_appointments", { p_only_upcoming: false }),
  ]);

  const upcomingList = (upcoming ?? []).filter(
    (a) => a.status === "scheduled" || a.status === "confirmed"
  );
  const upcomingIds = new Set(upcomingList.map((a) => a.appointment_id));
  const pastList = (past ?? []).filter((a) => !upcomingIds.has(a.appointment_id));

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Meus agendamentos
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Acompanhe e gerencie seus horários em qualquer barbearia da plataforma.
        </p>
      </div>

      <section className="grid gap-3">
        <h2 className="text-text-lg font-semibold text-[var(--color-text-primary)]">
          Próximos
        </h2>
        {upcomingList.length === 0 ? (
          <EmptyUpcoming />
        ) : (
          <ul className="grid gap-3">
            {upcomingList.map((a) => (
              <li key={a.appointment_id}>
                <AppointmentCard appointment={a} cancellable />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid gap-3">
        <h2 className="text-text-lg font-semibold text-[var(--color-text-primary)]">
          Histórico
        </h2>
        {pastList.length === 0 ? (
          <Card className="p-6 text-center text-text-sm text-[var(--color-text-tertiary)]">
            Seus agendamentos passados aparecerão aqui.
          </Card>
        ) : (
          <ul className="grid gap-3">
            {pastList.slice(0, 20).map((a) => (
              <li key={a.appointment_id}>
                <AppointmentCard appointment={a} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

type Appointment = {
  appointment_id: string;
  scheduled_at: string;
  duration_minutes: number;
  price_cents: number;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";
  shop_name: string;
  shop_slug: string;
  shop_logo_url: string | null;
  service_name: string;
  barber_name: string;
};

function AppointmentCard({
  appointment,
  cancellable,
}: {
  appointment: Appointment;
  cancellable?: boolean;
}) {
  return (
    <Card className="grid gap-4 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-6">
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]">
        {appointment.shop_logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={appointment.shop_logo_url}
            alt={appointment.shop_name}
            className="size-full object-cover"
          />
        ) : (
          <StorefrontIcon size={28} weight="duotone" className="text-[var(--color-fg-secondary)]" />
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/${appointment.shop_slug}`}
            className="text-text-md font-semibold text-[var(--color-text-primary)] hover:underline"
          >
            {appointment.shop_name}
          </Link>
          <Badge variant={STATUS_VARIANT[appointment.status] ?? "outline"}>
            {STATUS_LABEL[appointment.status] ?? appointment.status}
          </Badge>
        </div>
        <div className="grid gap-1 text-text-sm text-[var(--color-text-secondary)]">
          <span className="inline-flex items-center gap-2">
            <CalendarCheckIcon size={20} weight="duotone" className="text-[var(--color-fg-secondary)]" />
            {formatDateBR(appointment.scheduled_at)} às {formatTimeBR(appointment.scheduled_at)}
          </span>
          <span className="inline-flex items-center gap-2">
            <ScissorsIcon size={20} weight="duotone" className="text-[var(--color-fg-secondary)]" />
            {appointment.service_name}
          </span>
          <span className="inline-flex items-center gap-2">
            <UserCircleIcon size={20} weight="duotone" className="text-[var(--color-fg-secondary)]" />
            {appointment.barber_name}
          </span>
          <span className="inline-flex items-center gap-2 text-[var(--color-text-tertiary)]">
            <ClockIcon size={20} weight="duotone" />
            {appointment.duration_minutes} min · {formatMoney(appointment.price_cents)}
          </span>
        </div>
      </div>

      {cancellable && (
        <div className="flex sm:justify-end">
          <CancelAppointmentButton appointmentId={appointment.appointment_id} />
        </div>
      )}
    </Card>
  );
}

function EmptyUpcoming() {
  return (
    <Card className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
        <CalendarBlankIcon size={28} weight="duotone" />
      </div>
      <div className="grid gap-1">
        <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
          Nenhum agendamento marcado
        </p>
        <p className="text-text-sm text-[var(--color-text-tertiary)]">
          Escolha uma barbearia e marque seu horário.
        </p>
      </div>
      <Link
        href="/"
        className={buttonVariants({ variant: "outline", className: "h-10" })}
      >
        Ver barbearias
      </Link>
    </Card>
  );
}
