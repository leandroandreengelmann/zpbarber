import Link from "next/link";
import {
  ArrowRightIcon,
  ChatCircleTextIcon,
  CurrencyDollarIcon,
  StarIcon,
  StorefrontIcon,
  TrendUpIcon,
  UserMinusIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

function startOfMonthIso() {
  const d = new Date();
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function startOf7DaysAgoIso() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function KpiCard({
  icon,
  label,
  value,
  hint,
  iconBg,
  iconFg,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
  iconBg: string;
  iconFg: string;
}) {
  return (
    <Card className="gap-4">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between">
          <div
            className="flex size-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: iconBg, color: iconFg }}
          >
            {icon}
          </div>
        </div>
        <div className="grid gap-1">
          <CardDescription className="text-text-sm font-medium text-[var(--color-text-tertiary)]">
            {label}
          </CardDescription>
          <CardTitle className="text-display-sm tabular-nums text-[var(--color-text-primary)]">
            {value}
          </CardTitle>
        </div>
      </CardHeader>
      {hint && (
        <CardContent>
          <p className="text-text-sm text-[var(--color-text-tertiary)]">{hint}</p>
        </CardContent>
      )}
    </Card>
  );
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const monthStart = startOfMonthIso();
  const weekStart = startOf7DaysAgoIso();

  const [shopsRes, waMessagesRes, reviewsRes] = await Promise.all([
    supabase.from("barbershops").select("id, status, created_at"),
    supabase
      .from("whatsapp_messages")
      .select("status")
      .gte("created_at", weekStart),
    supabase.from("reviews").select("rating").gte("created_at", weekStart),
  ]);

  const shops = shopsRes.data ?? [];
  const waMessages = waMessagesRes.data ?? [];
  const reviews = reviewsRes.data ?? [];

  const totalShops = shops.length;
  const activeShops = shops.filter(
    (s) => s.status === "active" || s.status === "trial"
  ).length;
  const newThisMonth = shops.filter((s) => s.created_at >= monthStart).length;
  const cancelledThisMonth = shops.filter(
    (s) => s.status === "cancelled" && s.created_at >= monthStart
  ).length;

  const waSent = waMessages.filter(
    (m) => m.status === "sent" || m.status === "delivered" || m.status === "read"
  ).length;

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="grid gap-6">
      <div className="grid gap-1">
        <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
          Dashboard global
        </h1>
        <p className="text-text-md text-[var(--color-text-tertiary)]">
          Visão executiva da plataforma.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          icon={<StorefrontIcon size={28} weight="duotone" />}
          label="Barbearias ativas"
          value={activeShops.toString()}
          hint={`${totalShops} no total na plataforma`}
          iconBg="var(--color-blue-50)"
          iconFg="var(--color-blue-600)"
        />
        <KpiCard
          icon={<TrendUpIcon size={28} weight="duotone" />}
          label="Novas no mês"
          value={newThisMonth.toString()}
          hint="Barbearias criadas neste mês"
          iconBg="var(--color-success-50)"
          iconFg="var(--color-success-600)"
        />
        <KpiCard
          icon={<UserMinusIcon size={28} weight="duotone" />}
          label="Canceladas no mês"
          value={cancelledThisMonth.toString()}
          hint="Status = cancelled"
          iconBg="var(--color-warning-50)"
          iconFg="var(--color-warning-600)"
        />
        <KpiCard
          icon={<CurrencyDollarIcon size={28} weight="duotone" />}
          label="MRR"
          value="—"
          hint="Aguardando módulo de Planos"
          iconBg="var(--color-bg-secondary)"
          iconFg="var(--color-fg-quaternary)"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <KpiCard
          icon={<ChatCircleTextIcon size={28} weight="duotone" />}
          label="WhatsApp 7d"
          value={waSent.toLocaleString("pt-BR")}
          hint="Mensagens entregues nos últimos 7 dias"
          iconBg="var(--color-blue-50)"
          iconFg="var(--color-blue-600)"
        />
        <KpiCard
          icon={<StarIcon size={28} weight="duotone" />}
          label="Avaliações 7d"
          value={reviews.length.toString()}
          hint={
            reviews.length > 0
              ? `Nota média ${avgRating.toFixed(2).replace(".", ",")}`
              : "Sem avaliações no período"
          }
          iconBg="var(--color-warning-50)"
          iconFg="var(--color-warning-600)"
        />
        <Card className="gap-4">
          <CardHeader className="gap-3">
            <CardDescription className="text-text-sm font-medium text-[var(--color-text-tertiary)]">
              Ações rápidas
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link
              href="/admin/barbershops"
              className={buttonVariants({ variant: "outline", size: "sm", className: "justify-between" })}
            >
              Ver barbearias
              <ArrowRightIcon size={20} weight="duotone" />
            </Link>
            <Link
              href="/admin/health"
              className={buttonVariants({ variant: "outline", size: "sm", className: "justify-between" })}
            >
              Saúde do sistema
              <ArrowRightIcon size={20} weight="duotone" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
