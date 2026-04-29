import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarBlankIcon,
  CalendarCheckIcon,
  ClockCounterClockwiseIcon,
  EnvelopeSimpleIcon,
  GiftIcon,
  PackageIcon,
  PhoneIcon,
  ReceiptIcon,
  ScissorsIcon,
  StarIcon,
  TrendUpIcon,
  UserCircleIcon,
  UserSwitchIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Stars } from "@/app/app/avaliacoes/_components/stars";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import { formatDateBR, formatDateTimeBR, formatMoney } from "@/lib/format";
import { updateClientAction } from "../actions";
import { ClientForm } from "../client-form";
import { DeleteClientButton } from "./delete-client-button";

const STATUS_LABEL: Record<string, string> = {
  scheduled: "Agendado",
  confirmed: "Confirmado",
  completed: "Concluído",
  cancelled: "Cancelado",
  no_show: "Não veio",
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  scheduled: "secondary",
  confirmed: "default",
  completed: "default",
  cancelled: "destructive",
  no_show: "outline",
};

function initials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase() || "?";
}

export default async function ClienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  const isGestor = membership.role === "gestor";

  const supabase = await createClient();
  const nowIso = new Date().toISOString();
  const [
    { data: client },
    { data: appointments },
    { data: sales },
    { data: nextAppt },
    { data: loyaltyBalance },
    { data: punchCard },
    { data: pendingRedemptions },
    { data: clientReviews },
  ] = await Promise.all([
    supabase
      .from("clients")
      .select("id, full_name, phone, email, notes, created_at, accepts_whatsapp")
      .eq("id", id)
      .eq("barbershop_id", shopId)
      .maybeSingle(),
    supabase
      .from("appointments")
      .select(
        "id, scheduled_at, status, price_cents, service:services(name), barber:profiles!appointments_barber_id_fkey(full_name)"
      )
      .eq("client_id", id)
      .eq("barbershop_id", shopId)
      .order("scheduled_at", { ascending: false })
      .limit(50),
    supabase
      .from("sales")
      .select(
        "id, status, total_cents, created_at, barber:profiles!sales_barber_id_fkey(full_name), items:sale_items(description, quantity, product_id, total_cents)"
      )
      .eq("client_id", id)
      .eq("barbershop_id", shopId)
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("appointments")
      .select(
        "id, scheduled_at, status, service:services(name), barber:profiles!appointments_barber_id_fkey(full_name)"
      )
      .eq("client_id", id)
      .eq("barbershop_id", shopId)
      .in("status", ["scheduled", "confirmed"])
      .gte("scheduled_at", nowIso)
      .order("scheduled_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
    supabase.rpc("fn_loyalty_balance", { p_client: id }),
    supabase
      .from("loyalty_punch_cards")
      .select("current_count, required, status")
      .eq("barbershop_id", shopId)
      .eq("client_id", id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("loyalty_redemptions")
      .select("id, code, reward_name, points_used, created_at")
      .eq("barbershop_id", shopId)
      .eq("client_id", id)
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
    supabase
      .from("reviews")
      .select(
        "id, rating, comment, created_at, manager_response, profiles!reviews_barber_id_fkey(full_name)"
      )
      .eq("barbershop_id", shopId)
      .eq("client_id", id)
      .eq("is_hidden", false)
      .order("created_at", { ascending: false })
      .limit(30),
  ]);

  if (!client) notFound();

  const apptItems = appointments ?? [];
  const saleItems = sales ?? [];

  const completedAppts = apptItems.filter((a) => a.status === "completed").length;
  const paidSales = saleItems.filter((s) => s.status === "paid");
  const totalSpent = paidSales.reduce((sum, s) => sum + (s.total_cents ?? 0), 0);
  const avgTicket = paidSales.length > 0 ? totalSpent / paidSales.length : 0;
  const lastVisit =
    apptItems.find((a) => a.status === "completed")?.scheduled_at ?? null;

  const completedDates = apptItems
    .filter((a) => a.status === "completed")
    .map((a) => new Date(a.scheduled_at).getTime())
    .sort((a, b) => a - b);
  let avgDaysBetween = 0;
  if (completedDates.length >= 2) {
    let total = 0;
    for (let i = 1; i < completedDates.length; i++) {
      total += completedDates[i] - completedDates[i - 1];
    }
    avgDaysBetween = Math.round(total / (completedDates.length - 1) / (1000 * 60 * 60 * 24));
  }

  const productCounts = new Map<string, { description: string; quantity: number; total: number }>();
  for (const s of paidSales) {
    for (const it of s.items ?? []) {
      if (!it.product_id) continue;
      const key = it.description;
      const prev = productCounts.get(key) ?? { description: key, quantity: 0, total: 0 };
      prev.quantity += it.quantity ?? 1;
      prev.total += it.total_cents ?? 0;
      productCounts.set(key, prev);
    }
  }
  const topProducts = [...productCounts.values()]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const updateAction = updateClientAction.bind(null, id);

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-4 sm:gap-6 [&>*]:min-w-0">
      <div>
        <Link
          href="/app/clientes"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeftIcon size={28} weight="duotone" />
          Voltar à lista
        </Link>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 shrink-0 md:size-14">
            <AvatarFallback className="text-text-sm font-semibold md:text-text-md">
              {initials(client.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="grid min-w-0 flex-1 gap-1">
            <h1 className="text-text-lg font-semibold tracking-tight text-[var(--color-text-primary)] md:text-display-xs break-words">
              {client.full_name}
            </h1>
          </div>
          {isGestor && (
            <div className="md:hidden">
              <DeleteClientButton id={client.id} name={client.full_name} />
            </div>
          )}
        </div>
        <div className="grid gap-1 text-text-xs text-[var(--color-text-tertiary)] md:flex md:flex-1 md:flex-wrap md:items-center md:gap-x-4 md:gap-y-1 md:text-text-sm">
          {client.phone && (
            <span className="inline-flex items-center gap-1">
              <PhoneIcon size={14} weight="duotone" />
              {client.phone}
            </span>
          )}
          {client.email && (
            <span className="inline-flex items-center gap-1 break-all">
              <EnvelopeSimpleIcon size={14} weight="duotone" />
              {client.email}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <CalendarBlankIcon size={14} weight="duotone" />
            Cadastrado em {formatDateBR(client.created_at)}
          </span>
        </div>
        {isGestor && (
          <div className="hidden md:block md:ml-auto">
            <DeleteClientButton id={client.id} name={client.full_name} />
          </div>
        )}
      </div>

      {nextAppt && (
        <Card className="border-[var(--color-blue-200)] bg-[var(--color-blue-50)]">
          <CardContent className="flex flex-wrap items-center gap-4 py-4">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-blue-100)] text-[var(--color-blue-700)]">
              <CalendarCheckIcon size={22} weight="duotone" />
            </div>
            <div className="grid min-w-0 flex-1 gap-0.5">
              <span className="text-text-xs font-semibold uppercase tracking-wide text-[var(--color-blue-700)]">
                Próximo agendamento
              </span>
              <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
                {formatDateTimeBR(nextAppt.scheduled_at)}
                {nextAppt.service?.name && ` · ${nextAppt.service.name}`}
              </span>
              {nextAppt.barber?.full_name && (
                <span className="text-text-xs text-[var(--color-text-tertiary)]">
                  Com {nextAppt.barber.full_name}
                </span>
              )}
            </div>
            <Badge variant="secondary">
              {STATUS_LABEL[nextAppt.status] ?? nextAppt.status}
            </Badge>
          </CardContent>
        </Card>
      )}

      <Card className="overflow-hidden p-0">
        <ul className="grid grid-cols-2 divide-x divide-y divide-[var(--color-border-secondary)] md:grid-cols-3 lg:grid-cols-5 lg:divide-y-0 [&>*]:min-w-0">
          <li className="flex min-w-0 items-center gap-2 p-3 md:gap-3 md:p-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--color-blue-100)] text-[var(--color-blue-600)]">
              <CalendarCheckIcon size={20} weight="duotone" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-text-xs text-muted-foreground">Visitas</p>
              <p className="font-heading text-text-md font-semibold tabular-nums leading-tight md:text-display-xs">
                {completedAppts}
              </p>
            </div>
          </li>
          <li className="flex min-w-0 items-center gap-2 p-3 md:gap-3 md:p-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--color-success-100)] text-[var(--color-success-600)]">
              <ReceiptIcon size={20} weight="duotone" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-text-xs text-muted-foreground">Total gasto</p>
              <p className="font-heading text-text-md font-semibold tabular-nums leading-tight md:text-display-xs">
                {formatMoney(totalSpent)}
              </p>
            </div>
          </li>
          <li className="flex min-w-0 items-center gap-2 p-3 md:gap-3 md:p-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--color-warning-100)] text-[var(--color-warning-600)]">
              <TrendUpIcon size={20} weight="duotone" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-text-xs text-muted-foreground">Ticket médio</p>
              <p className="font-heading text-text-md font-semibold tabular-nums leading-tight md:text-display-xs">
                {paidSales.length > 0 ? formatMoney(avgTicket) : "—"}
              </p>
            </div>
          </li>
          <li className="flex min-w-0 items-center gap-2 p-3 md:gap-3 md:p-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--color-blue-100)] text-[var(--color-blue-600)]">
              <ClockCounterClockwiseIcon size={20} weight="duotone" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-text-xs text-muted-foreground">Frequência</p>
              <p className="font-heading text-text-md font-semibold tabular-nums leading-tight md:text-display-xs">
                {avgDaysBetween > 0 ? `${avgDaysBetween}d` : "—"}
              </p>
            </div>
          </li>
          <li className="col-span-2 flex min-w-0 items-center gap-2 p-3 md:col-span-1 md:gap-3 md:p-4">
            <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
              <CalendarBlankIcon size={20} weight="duotone" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-text-xs text-muted-foreground">Última visita</p>
              <p className="font-heading text-text-md font-semibold tabular-nums leading-tight md:text-display-xs">
                {lastVisit ? formatDateBR(lastVisit) : "—"}
              </p>
            </div>
          </li>
        </ul>
      </Card>

      <Tabs defaultValue="history">
        <TabsList className="grid w-full grid-cols-6 md:inline-flex md:w-max">
          <TabsTrigger value="history" aria-label="Histórico" className="flex-1 md:flex-initial">
            <ClockCounterClockwiseIcon size={20} weight="duotone" />
            <span className="hidden md:inline">Histórico</span>
          </TabsTrigger>
          <TabsTrigger value="sales" aria-label="Vendas" className="flex-1 md:flex-initial">
            <ReceiptIcon size={20} weight="duotone" />
            <span className="hidden md:inline">Vendas</span>
          </TabsTrigger>
          <TabsTrigger value="products" aria-label="Produtos" className="flex-1 md:flex-initial">
            <PackageIcon size={20} weight="duotone" />
            <span className="hidden md:inline">Produtos</span>
          </TabsTrigger>
          <TabsTrigger value="loyalty" aria-label="Fidelidade" className="flex-1 md:flex-initial">
            <GiftIcon size={20} weight="duotone" />
            <span className="hidden md:inline">Fidelidade</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" aria-label="Avaliações" className="flex-1 md:flex-initial">
            <StarIcon size={20} weight="duotone" />
            <span className="hidden md:inline">Avaliações</span>
          </TabsTrigger>
          <TabsTrigger value="profile" aria-label="Perfil" className="flex-1 md:flex-initial">
            <UserCircleIcon size={20} weight="duotone" />
            <span className="hidden md:inline">Perfil</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card className="p-0">
            <CardHeader>
              <CardTitle>Agendamentos</CardTitle>
              <CardDescription>
                {apptItems.length === 0
                  ? "Sem agendamentos registrados."
                  : `${apptItems.length} agendamento${apptItems.length === 1 ? "" : "s"} (mais recentes primeiro).`}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {apptItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-text-sm text-[var(--color-text-tertiary)]">
                  Nenhum agendamento ainda.
                </div>
              ) : (
                <ul className="divide-y divide-[var(--color-border-secondary)]">
                  {apptItems.map((a) => (
                    <li
                      key={a.id}
                      className="grid gap-2 px-3 py-3 md:flex md:flex-wrap md:items-center md:gap-4 md:px-6 md:py-4"
                    >
                      <div className="flex items-center gap-2 md:grid md:w-28 md:shrink-0 md:gap-0">
                        <span className="text-text-sm font-semibold tabular-nums text-[var(--color-text-primary)]">
                          {formatDateBR(a.scheduled_at)}
                        </span>
                        <span className="text-text-xs tabular-nums text-[var(--color-text-tertiary)]">
                          {formatDateTimeBR(a.scheduled_at).slice(-5)}
                        </span>
                      </div>
                      <div className="grid min-w-0 flex-1 gap-0.5">
                        <span className="inline-flex items-center gap-1.5 text-text-sm font-medium text-[var(--color-text-primary)]">
                          <ScissorsIcon size={16} weight="duotone" />
                          {a.service?.name ?? "—"}
                        </span>
                        {a.barber?.full_name && (
                          <span className="inline-flex items-center gap-1.5 text-text-xs text-[var(--color-text-tertiary)]">
                            <UserSwitchIcon size={14} weight="duotone" />
                            {a.barber.full_name}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2 md:contents">
                        <Badge variant={STATUS_VARIANT[a.status] ?? "outline"}>
                          {STATUS_LABEL[a.status] ?? a.status}
                        </Badge>
                        <span className="text-right text-text-sm font-semibold tabular-nums text-[var(--color-text-primary)] md:w-24 md:shrink-0">
                          {formatMoney(a.price_cents)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <Card className="p-0">
            <CardHeader>
              <CardTitle>Vendas registradas</CardTitle>
              <CardDescription>
                {saleItems.length === 0
                  ? "Sem vendas registradas pra este cliente."
                  : `${saleItems.length} venda${saleItems.length === 1 ? "" : "s"}.`}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {saleItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-text-sm text-[var(--color-text-tertiary)]">
                  Nenhuma venda registrada.
                </div>
              ) : (
                <ul className="divide-y divide-[var(--color-border-secondary)]">
                  {saleItems.map((s) => (
                    <li key={s.id} className="grid gap-2 px-3 py-3 md:px-6 md:py-4">
                      <div className="grid gap-2 md:flex md:flex-wrap md:items-center md:gap-4">
                        <div className="flex items-center gap-2 md:grid md:w-28 md:shrink-0 md:gap-0">
                          <span className="text-text-sm font-semibold tabular-nums text-[var(--color-text-primary)]">
                            {formatDateBR(s.created_at)}
                          </span>
                          <span className="text-text-xs tabular-nums text-[var(--color-text-tertiary)]">
                            {formatDateTimeBR(s.created_at).slice(-5)}
                          </span>
                        </div>
                        <div className="min-w-0 md:flex-1">
                          {s.barber?.full_name ? (
                            <span className="inline-flex items-center gap-1.5 text-text-xs text-[var(--color-text-tertiary)]">
                              <UserSwitchIcon size={14} weight="duotone" />
                              {s.barber.full_name}
                            </span>
                          ) : (
                            <span className="text-text-xs italic text-[var(--color-text-tertiary)]">
                              Sem barbeiro
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between gap-2 md:contents">
                          <Badge
                            variant={
                              s.status === "paid"
                                ? "default"
                                : s.status === "cancelled"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {s.status === "paid"
                              ? "Pago"
                              : s.status === "cancelled"
                                ? "Cancelada"
                                : "Em aberto"}
                          </Badge>
                          <span className="text-right text-text-sm font-semibold tabular-nums text-[var(--color-text-primary)] md:w-24 md:shrink-0">
                            {formatMoney(s.total_cents)}
                          </span>
                        </div>
                      </div>
                      {s.items && s.items.length > 0 && (
                        <ul className="grid gap-0.5 text-text-xs text-[var(--color-text-tertiary)] md:ml-28">
                          {s.items.map((it: { description: string; total_cents: number }, i: number) => (
                            <li key={i} className="flex items-center justify-between gap-2">
                              <span className="min-w-0 break-words">{it.description}</span>
                              <span className="shrink-0 tabular-nums">
                                {formatMoney(it.total_cents)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card className="p-0">
            <CardHeader>
              <CardTitle>Produtos preferidos</CardTitle>
              <CardDescription>
                {topProducts.length === 0
                  ? "Nenhum produto comprado ainda."
                  : "Ranking dos produtos mais comprados por este cliente."}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {topProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-text-sm text-[var(--color-text-tertiary)]">
                  Quando o cliente comprar produtos no caixa, eles aparecem aqui.
                </div>
              ) : (
                <ul className="divide-y divide-[var(--color-border-secondary)]">
                  {topProducts.map((p, i) => (
                    <li
                      key={p.description}
                      className="flex flex-wrap items-center gap-3 px-3 py-3 md:gap-4 md:px-6 md:py-4"
                    >
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-text-sm font-semibold text-[var(--color-blue-700)]">
                        {i + 1}
                      </div>
                      <div className="grid min-w-0 flex-1 gap-0.5">
                        <span className="inline-flex items-center gap-1.5 text-text-sm font-medium text-[var(--color-text-primary)] break-words">
                          <PackageIcon size={16} weight="duotone" />
                          {p.description}
                        </span>
                        <span className="text-text-xs text-[var(--color-text-tertiary)]">
                          <TrendUpIcon size={12} weight="duotone" className="inline mr-1" />
                          {p.quantity} {p.quantity === 1 ? "compra" : "compras"}
                        </span>
                      </div>
                      <span className="shrink-0 text-right text-text-sm font-semibold tabular-nums text-[var(--color-text-primary)] md:w-24">
                        {formatMoney(p.total)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty">
          <Card>
            <CardHeader>
              <CardTitle>Fidelidade</CardTitle>
              <CardDescription>
                Saldo de pontos, cartão de carimbos e resgates pendentes.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="grid gap-1 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3 md:p-4">
                  <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Saldo
                  </span>
                  <span className="text-text-lg font-semibold tabular-nums text-[var(--color-text-primary)] md:text-display-xs">
                    {((loyaltyBalance as number | null) ?? 0).toLocaleString("pt-BR")} pts
                  </span>
                </div>
                <div className="grid gap-1 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3 md:p-4">
                  <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Cartão
                  </span>
                  <span className="text-text-lg font-semibold tabular-nums text-[var(--color-text-primary)] md:text-display-xs">
                    {punchCard
                      ? `${punchCard.current_count}/${punchCard.required}`
                      : "—"}
                  </span>
                  {punchCard && (
                    <span className="text-text-xs text-[var(--color-text-tertiary)]">
                      {punchCard.status === "active"
                        ? "Em andamento"
                        : punchCard.status === "completed"
                          ? "Completo · pendente de uso"
                          : punchCard.status}
                    </span>
                  )}
                </div>
                <div className="grid gap-1 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3 md:p-4">
                  <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Resgates pendentes
                  </span>
                  <span className="text-text-lg font-semibold tabular-nums text-[var(--color-text-primary)] md:text-display-xs">
                    {(pendingRedemptions ?? []).length}
                  </span>
                </div>
              </div>

              {(pendingRedemptions ?? []).length > 0 && (
                <div className="grid gap-2 rounded-lg border border-[var(--color-border-secondary)] p-4">
                  <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
                    Códigos disponíveis para uso
                  </span>
                  <ul className="grid gap-1.5">
                    {(pendingRedemptions ?? []).map((r) => (
                      <li
                        key={r.id}
                        className="flex flex-wrap items-center justify-between gap-2 text-text-sm"
                      >
                        <span className="font-mono font-semibold text-[var(--color-text-primary)]">
                          {r.code}
                        </span>
                        <span className="text-[var(--color-text-tertiary)]">
                          {r.reward_name} · {r.points_used} pts
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link
                href={`/app/fidelidade/${client.id}`}
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className: "w-fit",
                })}
              >
                <GiftIcon size={20} weight="duotone" />
                Gerenciar fidelidade
                <ArrowRightIcon size={16} weight="bold" />
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Avaliações deste cliente</CardTitle>
              <CardDescription>
                Feedback enviado após os atendimentos.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {(clientReviews ?? []).length === 0 ? (
                <p className="py-4 text-center text-text-sm text-[var(--color-text-tertiary)]">
                  Esse cliente ainda não enviou avaliações.
                </p>
              ) : (
                <ul className="grid gap-3">
                  {(clientReviews ?? []).map((r) => {
                    const barber = (r.profiles as { full_name?: string } | null)?.full_name;
                    return (
                      <li
                        key={r.id}
                        className="rounded-xl border border-[var(--color-border-secondary)] p-3.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <Stars rating={r.rating} size={16} />
                          <span className="text-text-xs text-[var(--color-text-tertiary)]">
                            {barber ? `com ${barber} · ` : ""}
                            {formatDateBR(r.created_at)}
                          </span>
                        </div>
                        {r.comment && (
                          <p className="mt-1.5 text-text-sm text-[var(--color-text-secondary)] break-words">
                            “{r.comment}”
                          </p>
                        )}
                        {r.manager_response && (
                          <p className="mt-2 rounded-lg bg-[var(--color-bg-secondary)] p-2 text-text-xs text-[var(--color-text-tertiary)]">
                            <strong className="text-[var(--color-text-secondary)]">Resposta:</strong>{" "}
                            {r.manager_response}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Editar perfil</CardTitle>
              <CardDescription>
                Atualize contato e observações. Tudo fica visível pra equipe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClientForm
                action={updateAction}
                submitLabel="Salvar alterações"
                successMessage="Cliente atualizado."
                initial={{
                  full_name: client.full_name,
                  phone: client.phone,
                  email: client.email,
                  notes: client.notes,
                  accepts_whatsapp: client.accepts_whatsapp ?? true,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
