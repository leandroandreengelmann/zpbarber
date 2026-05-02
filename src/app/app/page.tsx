import {
  ArrowSquareOutIcon,
  CalendarBlankIcon,
  CashRegisterIcon,
  ClockIcon,
  ReceiptIcon,
  ScissorsIcon,
  TrendUpIcon,
  UserSwitchIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { requireBarbershop } from "@/lib/auth/guards";
import { can } from "@/lib/auth/capabilities";
import { createClient } from "@/lib/supabase/server";
import {
  formatDateBR,
  formatMoney,
  formatTimeBR,
  localStringToUtcDate,
} from "@/lib/format";
import { dayBoundsUTC, todayLocalISO } from "./agenda/_lib/calendar";
import { AnnouncementsBanner } from "@/components/announcements/banner";
import { ShareShopBanner } from "./_components/share-shop-banner";
import { getAppBaseUrl } from "@/lib/platform-settings";

type AppointmentRow = {
  id: string;
  scheduled_at: string;
  status: string;
  price_cents: number | null;
  client: { full_name: string | null } | null;
  service: { name: string | null } | null;
  barber: { full_name: string | null } | null;
};

export default async function AppDashboardPage() {
  const { user, membership } = await requireBarbershop();
  const shop = membership.barbershop!;
  const timezone = shop.timezone ?? "America/Sao_Paulo";
  const isBarber = !can(membership, "agenda.gerenciar");
  const isGestor = can(membership, "relatorios.ver");
  const today = todayLocalISO(timezone);
  const { startISO, endISO } = dayBoundsUTC(today, timezone);

  const supabase = await createClient();
  const appBaseUrl = await getAppBaseUrl();
  const publicUrl = shop.slug ? `${appBaseUrl}/${shop.slug}` : null;

  let apptQuery = supabase
    .from("appointments")
    .select(
      "id, scheduled_at, status, price_cents, client:clients(full_name), service:services(name), barber:profiles!appointments_barber_id_fkey(full_name)"
    )
    .eq("barbershop_id", shop.id)
    .gte("scheduled_at", startISO)
    .lte("scheduled_at", endISO)
    .order("scheduled_at");
  if (isBarber) apptQuery = apptQuery.eq("barber_id", user.id);

  let salesQuery = supabase
    .from("sales")
    .select("total_cents, barber_id")
    .eq("barbershop_id", shop.id)
    .eq("status", "paid")
    .gte("created_at", startISO)
    .lte("created_at", endISO);
  if (isBarber) salesQuery = salesQuery.eq("barber_id", user.id);

  const [
    { data: appointments },
    { data: salesToday },
    { data: openSession },
  ] = await Promise.all([
    apptQuery,
    salesQuery,
    supabase
      .from("cash_sessions")
      .select("id, opened_at, opening_amount_cents")
      .eq("barbershop_id", shop.id)
      .is("closed_at", null)
      .order("opened_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const items = (appointments ?? []) as AppointmentRow[];
  const todayCount = items.length;
  const confirmedCount = items.filter(
    (a) => a.status === "confirmed" || a.status === "completed"
  ).length;
  const pendingCount = items.filter((a) => a.status === "scheduled").length;
  const expectedRevenue = items
    .filter((a) => a.status !== "cancelled" && a.status !== "no_show")
    .reduce((sum, a) => sum + (a.price_cents ?? 0), 0);

  const paidRevenue = (salesToday ?? []).reduce(
    (sum, s) => sum + (s.total_cents ?? 0),
    0
  );

  const now = new Date();
  const upcoming = items
    .filter(
      (a) =>
        new Date(a.scheduled_at) >= now &&
        a.status !== "cancelled" &&
        a.status !== "completed" &&
        a.status !== "no_show"
    )
    .slice(0, 5);

  const KPIS: { label: string; value: string; hint: string; icon: Icon; accent: string }[] = [
    {
      label: isBarber ? "Meu faturamento (hoje)" : "Faturamento de hoje",
      value: formatMoney(paidRevenue),
      hint:
        (salesToday?.length ?? 0) === 0
          ? "Sem vendas pagas ainda"
          : `${salesToday!.length} venda${salesToday!.length === 1 ? "" : "s"} paga${salesToday!.length === 1 ? "" : "s"}`,
      icon: CashRegisterIcon,
      accent: "text-success-primary",
    },
    {
      label: isBarber ? "Meus atendimentos hoje" : "Atendimentos hoje",
      value: String(todayCount),
      hint:
        todayCount === 0
          ? "Agenda vazia"
          : `${confirmedCount} concluído/confirmado · ${pendingCount} a confirmar`,
      icon: CalendarBlankIcon,
      accent: "text-primary",
    },
    {
      label: "Receita prevista",
      value: formatMoney(expectedRevenue),
      hint: "Soma dos preços dos agendamentos do dia",
      icon: TrendUpIcon,
      accent: "text-brand-secondary",
    },
    {
      label: "Caixa",
      value: openSession ? "Aberto" : "Fechado",
      hint: openSession
        ? `Aberto em ${formatDateBR(openSession.opened_at, "dd/MM/yyyy", timezone)} · Fundo ${formatMoney(openSession.opening_amount_cents)}`
        : "Abra um caixa pra registrar vendas",
      icon: ReceiptIcon,
      accent: "text-warning-primary",
    },
  ];

  let topBarbers: { id: string; name: string; cents: number }[] = [];
  if (isGestor) {
    const monthStartIso = localStringToUtcDate(
      `${today.slice(0, 7)}-01T00:00`,
      timezone,
    ).toISOString();
    const [{ data: monthSales }, { data: members }] = await Promise.all([
      supabase
        .from("sales")
        .select("barber_id, total_cents")
        .eq("barbershop_id", shop.id)
        .eq("status", "paid")
        .gte("created_at", monthStartIso),
      supabase
        .from("barbershop_members")
        .select("user:profiles(id, full_name)")
        .eq("barbershop_id", shop.id)
        .eq("is_active", true)
        .in("role", ["barbeiro", "gestor"]),
    ]);
    const names = new Map<string, string>();
    for (const m of members ?? []) {
      if (m.user?.id) names.set(m.user.id, m.user.full_name ?? "—");
    }
    const totals = new Map<string, number>();
    for (const s of monthSales ?? []) {
      if (!s.barber_id) continue;
      totals.set(s.barber_id, (totals.get(s.barber_id) ?? 0) + (s.total_cents ?? 0));
    }
    topBarbers = Array.from(totals.entries())
      .map(([id, cents]) => ({ id, name: names.get(id) ?? "—", cents }))
      .sort((a, b) => b.cents - a.cents)
      .slice(0, 5);
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div className="grid gap-1">
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
            {isBarber ? `Bom dia, ${user.profile.full_name?.split(" ")[0] ?? ""}` : "Visão geral"}
          </h1>
          <p className="text-text-md text-[var(--color-text-tertiary)]">
            {formatDateBR(today, "dd/MM/yyyy", timezone)} ·{" "}
            {isBarber
              ? "Seus atendimentos e ganhos do dia."
              : "Resumo da operação da barbearia."}
          </p>
        </div>
        {shop.slug && (
          <Link
            href={`/${shop.slug}`}
            target="_blank"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-11",
            })}
          >
            <ArrowSquareOutIcon size={28} weight="duotone" />
            Ver página pública
          </Link>
        )}
      </div>

      <AnnouncementsBanner />

      {publicUrl && (
        <ShareShopBanner shopName={shop.name} publicUrl={publicUrl} />
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {KPIS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{kpi.label}</CardDescription>
                  <div
                    className={`flex size-8 items-center justify-center rounded-lg bg-muted ${kpi.accent}`}
                  >
                    <Icon size={28} weight="duotone" />
                  </div>
                </div>
                <CardTitle className="text-display-sm tabular-nums">
                  {kpi.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{kpi.hint}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className={isGestor ? "lg:col-span-2" : "lg:col-span-3"}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-text-lg">Próximos atendimentos</CardTitle>
              <Link
                href="/app/agenda"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Ver agenda
              </Link>
            </div>
            <CardDescription>
              {upcoming.length === 0
                ? "Nada pra hoje a partir de agora."
                : `Próximos ${upcoming.length} de ${todayCount} agendamento${todayCount === 1 ? "" : "s"}.`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {upcoming.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                  <CalendarBlankIcon size={28} weight="duotone" />
                </div>
                <p className="text-text-sm text-[var(--color-text-tertiary)]">
                  Sem horários pendentes hoje.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-[var(--color-border-secondary)]">
                {upcoming.map((a) => (
                  <li
                    key={a.id}
                    className="flex items-center gap-4 px-6 py-4"
                  >
                    <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] px-2 py-2">
                      <span className="inline-flex items-center gap-1 text-text-xs font-medium uppercase text-[var(--color-text-tertiary)]">
                        <ClockIcon size={14} weight="duotone" />
                      </span>
                      <span className="text-text-md font-bold tabular-nums text-[var(--color-blue-700)]">
                        {formatTimeBR(a.scheduled_at, timezone)}
                      </span>
                    </div>
                    <div className="grid min-w-0 flex-1 gap-0.5">
                      <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                        {a.client?.full_name ?? "—"}
                      </span>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-text-xs text-[var(--color-text-tertiary)]">
                        <span className="inline-flex items-center gap-1">
                          <ScissorsIcon size={14} weight="duotone" />
                          {a.service?.name ?? "—"}
                        </span>
                        {!isBarber && a.barber?.full_name && (
                          <span className="inline-flex items-center gap-1">
                            <UserSwitchIcon size={14} weight="duotone" />
                            {a.barber.full_name}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="shrink-0 text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
                      {formatMoney(a.price_cents)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {isGestor && (
          <Card>
            <CardHeader>
              <CardTitle className="text-text-lg">Top barbeiros do mês</CardTitle>
              <CardDescription>
                Faturamento bruto em vendas pagas neste mês.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {topBarbers.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-fg-secondary)]">
                    <TrendUpIcon size={28} weight="duotone" />
                  </div>
                  <p className="text-text-sm text-[var(--color-text-tertiary)]">
                    Sem vendas pagas neste mês.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-[var(--color-border-secondary)]">
                  {topBarbers.map((b, i) => (
                    <li
                      key={b.id}
                      className="flex items-center gap-3 px-6 py-3"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-50)] text-text-xs font-bold text-[var(--color-blue-700)]">
                        {i + 1}
                      </span>
                      <span className="flex-1 truncate text-text-sm font-medium text-[var(--color-text-primary)]">
                        {b.name}
                      </span>
                      <span className="shrink-0 text-text-sm font-semibold tabular-nums text-[var(--color-text-primary)]">
                        {formatMoney(b.cents)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
