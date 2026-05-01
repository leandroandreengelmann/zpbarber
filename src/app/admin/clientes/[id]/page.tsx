import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  CurrencyCircleDollarIcon,
  HeartIcon,
  ScissorsIcon,
  StorefrontIcon,
  UserCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { formatDateBR, formatDateTimeBR, formatMoney } from "@/lib/format";
import { formatPhoneBR } from "@/lib/phone";
import { ApptShopFilter } from "./_components/appt-shop-filter";
import { ApptPager } from "./_components/appt-pager";

const APPT_PAGE_SIZE = 30;

type Detail = {
  profile: {
    user_id: string | null;
    full_name: string | null;
    phone: string | null;
    email: string | null;
    avatar_url: string | null;
    has_account: boolean;
  };
  kpis: {
    appointments_total: number;
    spent_total_cents: number;
    shops_count: number;
    first_appointment_at: string | null;
  };
  shops: Array<{
    barbershop_id: string;
    shop_name: string;
    shop_slug: string;
    shop_logo_url: string | null;
    appointments_count: number;
    last_visit_at: string | null;
    total_spent_cents: number;
    loyalty_current: number | null;
    loyalty_required: number | null;
  }>;
  appointments: Array<{
    id: string;
    scheduled_at: string;
    status: string;
    price_cents: number;
    duration_minutes: number;
    shop_name: string;
    shop_slug: string;
    service_name: string | null;
    barber_name: string | null;
  }>;
  appointments_total: number;
};

const STATUS_LABEL: Record<string, string> = {
  scheduled: "Agendado",
  confirmed: "Confirmado",
  completed: "Concluído",
  cancelled: "Cancelado",
  no_show: "Não compareceu",
};

const STATUS_VARIANT: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  scheduled: "secondary",
  confirmed: "secondary",
  completed: "default",
  cancelled: "destructive",
  no_show: "outline",
};

export default async function AdminClientDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const apptShop =
    typeof sp.shop === "string" && sp.shop ? sp.shop : null;
  const apptPage = Math.max(1, Number(sp.page ?? 1) || 1);
  const apptOffset = (apptPage - 1) * APPT_PAGE_SIZE;

  const clientKey = decodeURIComponent(id);
  const supabase = await createClient();
  const { data } = await supabase.rpc("fn_admin_client_detail", {
    p_client_key: clientKey,
    p_appt_offset: apptOffset,
    p_appt_limit: APPT_PAGE_SIZE,
    p_appt_shop_id: apptShop,
  });

  const detail = data as unknown as Detail | null;
  if (!detail) notFound();

  const apptTotalPages = Math.max(
    1,
    Math.ceil(detail.appointments_total / APPT_PAGE_SIZE)
  );

  return (
    <div className="grid gap-4 sm:gap-6">
      <Link
        href="/admin/clientes"
        className="inline-flex w-fit items-center gap-1.5 text-text-sm font-medium text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
      >
        <ArrowLeftIcon size={16} weight="bold" />
        Voltar para clientes
      </Link>

      <Card className="grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-6">
        <div className="flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
          {detail.profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={detail.profile.avatar_url}
              alt={detail.profile.full_name ?? ""}
              className="size-full object-cover"
            />
          ) : (
            <UserCircleIcon size={36} weight="duotone" />
          )}
        </div>
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            {detail.profile.full_name ?? "Sem nome"}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-text-sm text-[var(--color-text-tertiary)]">
            {detail.profile.phone && (
              <span className="tabular-nums">
                {formatPhoneBR(detail.profile.phone)}
              </span>
            )}
            {detail.profile.email && <span>· {detail.profile.email}</span>}
          </div>
        </div>
        <Badge
          variant={detail.profile.has_account ? "default" : "outline"}
          className="w-fit"
        >
          {detail.profile.has_account ? "Com conta" : "Walk-in"}
        </Badge>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<CalendarBlankIcon size={20} weight="duotone" />}
          label="Atendimentos"
          value={String(detail.kpis.appointments_total)}
        />
        <KpiCard
          icon={<CurrencyCircleDollarIcon size={20} weight="duotone" />}
          label="Total gasto"
          value={formatMoney(detail.kpis.spent_total_cents)}
        />
        <KpiCard
          icon={<StorefrontIcon size={20} weight="duotone" />}
          label="Barbearias"
          value={String(detail.kpis.shops_count)}
        />
        <KpiCard
          icon={<UserCircleIcon size={20} weight="duotone" />}
          label="Cliente desde"
          value={
            detail.kpis.first_appointment_at
              ? formatDateBR(detail.kpis.first_appointment_at)
              : "—"
          }
        />
      </div>

      {detail.shops.length > 0 && (
        <section className="grid gap-3">
          <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Barbearias frequentadas
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {detail.shops.map((s) => (
              <li key={s.barbershop_id}>
                <Card className="grid gap-3 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]">
                      {s.shop_logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.shop_logo_url}
                          alt={s.shop_name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <StorefrontIcon
                          size={22}
                          weight="duotone"
                          className="text-[var(--color-fg-secondary)]"
                        />
                      )}
                    </div>
                    <div className="grid min-w-0 flex-1 gap-0.5">
                      <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                        {s.shop_name}
                      </span>
                      <span className="text-text-xs text-[var(--color-text-tertiary)]">
                        {s.appointments_count} atendimentos ·{" "}
                        {formatMoney(s.total_spent_cents)}
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-1 text-text-xs text-[var(--color-text-tertiary)]">
                    {s.last_visit_at && (
                      <span>
                        Última visita: {formatDateTimeBR(s.last_visit_at)}
                      </span>
                    )}
                    {s.loyalty_required && s.loyalty_current !== null && (
                      <span className="inline-flex items-center gap-1.5">
                        <HeartIcon
                          size={14}
                          weight="duotone"
                          className="text-[var(--color-fg-quaternary)]"
                        />
                        Fidelidade: {s.loyalty_current}/{s.loyalty_required}
                      </span>
                    )}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="grid gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
            Histórico de atendimentos
          </h2>
          <ApptShopFilter shops={detail.shops} selected={apptShop ?? ""} />
        </div>

        {detail.appointments.length === 0 ? (
          <Card className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <ScissorsIcon
              size={28}
              weight="duotone"
              className="text-[var(--color-fg-secondary)]"
            />
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Sem atendimentos para este filtro.
            </p>
          </Card>
        ) : (
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Barbearia</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detail.appointments.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="tabular-nums text-text-sm text-[var(--color-text-secondary)]">
                        {formatDateTimeBR(a.scheduled_at)}
                      </TableCell>
                      <TableCell className="text-text-sm">
                        <Link
                          href={`/${a.shop_slug}`}
                          className="font-medium text-[var(--color-text-primary)] hover:underline"
                        >
                          {a.shop_name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-text-sm text-[var(--color-text-secondary)]">
                        {a.service_name ?? "—"}
                      </TableCell>
                      <TableCell className="text-text-sm text-[var(--color-text-secondary)]">
                        {a.barber_name ?? "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={STATUS_VARIANT[a.status] ?? "outline"}>
                          {STATUS_LABEL[a.status] ?? a.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-text-sm font-semibold text-[var(--color-text-primary)]">
                        {formatMoney(a.price_cents)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}

        {apptTotalPages > 1 && (
          <ApptPager
            page={apptPage}
            totalPages={apptTotalPages}
            total={detail.appointments_total}
          />
        )}
      </section>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="grid gap-2 p-4">
      <div className="flex items-center gap-2 text-[var(--color-fg-secondary)]">
        {icon}
        <span className="text-text-xs text-[var(--color-text-tertiary)]">
          {label}
        </span>
      </div>
      <span className="text-display-xs font-semibold text-[var(--color-text-primary)]">
        {value}
      </span>
    </Card>
  );
}
