import {
  CalendarPlusIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

type Address = {
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
};

const WEEKDAYS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

function formatAddressLine(a?: Address | null) {
  if (!a) return null;
  const line1 = [a.street, a.number].filter(Boolean).join(", ");
  const line2 = [a.neighborhood, a.city && a.state ? `${a.city} - ${a.state}` : a.city]
    .filter(Boolean)
    .join(" · ");
  return [line1, line2, a.cep].filter(Boolean).join(" • ") || null;
}

function shortLocation(a?: Address | null) {
  if (!a) return null;
  if (a.city && a.state) return `${a.city} · ${a.state}`;
  return a.city ?? a.neighborhood ?? null;
}

function todayWeekday() {
  return new Date().getDay();
}

export default async function PublicShopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: shop } = await supabase
    .from("barbershops")
    .select("id, name, phone, email, address, public_booking_enabled")
    .eq("slug", slug)
    .maybeSingle();

  if (!shop) notFound();

  const { data: hours } = await supabase
    .from("business_hours")
    .select("weekday, is_closed, opens_at, closes_at")
    .eq("barbershop_id", shop.id)
    .order("weekday");

  const address = formatAddressLine(shop.address as Address | null);
  const location = shortLocation(shop.address as Address | null);
  const today = todayWeekday();
  const todayHours = (hours ?? []).find((h) => h.weekday === today);

  return (
    <div className="grid gap-6 sm:gap-8">
      <section className="grid gap-3 sm:gap-4">
        <h1 className="text-display-sm font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-display-md">
          {shop.name}
        </h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-text-sm text-[var(--color-text-tertiary)] sm:text-text-md">
          {location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon size={18} weight="duotone" className="shrink-0" />
              {location}
            </span>
          )}
          {todayHours && (
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon size={18} weight="duotone" className="shrink-0" />
              {todayHours.is_closed
                ? "Fechado hoje"
                : `Hoje ${todayHours.opens_at?.slice(0, 5)} – ${todayHours.closes_at?.slice(0, 5)}`}
            </span>
          )}
        </div>
        {shop.public_booking_enabled && (
          <Link
            href={`/${slug}/agendar`}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-blue-600)] px-5 text-text-md font-semibold text-white shadow-sm hover:bg-[var(--color-blue-700)] sm:w-fit"
          >
            <CalendarPlusIcon size={20} weight="duotone" className="size-5" />
            Agendar horário
          </Link>
        )}
      </section>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)] dark:bg-[var(--color-blue-500)]/15 dark:text-[var(--color-blue-300)]">
                <StorefrontIcon size={20} weight="duotone" className="size-5" />
              </div>
              <div className="min-w-0">
                <CardTitle>Contato</CardTitle>
                <CardDescription>Fale diretamente com a barbearia</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-2.5 text-text-sm text-[var(--color-text-secondary)] sm:text-text-md">
            {shop.phone && (
              <div className="flex items-center gap-2.5">
                <PhoneIcon
                  size={18}
                  weight="duotone"
                  className="shrink-0 text-[var(--color-fg-quaternary)]"
                />
                <span className="truncate">{shop.phone}</span>
              </div>
            )}
            {shop.email && (
              <div className="flex items-center gap-2.5">
                <EnvelopeSimpleIcon
                  size={18}
                  weight="duotone"
                  className="shrink-0 text-[var(--color-fg-quaternary)]"
                />
                <span className="truncate">{shop.email}</span>
              </div>
            )}
            {address && (
              <div className="flex items-start gap-2.5">
                <MapPinIcon
                  size={18}
                  weight="duotone"
                  className="mt-0.5 shrink-0 text-[var(--color-fg-quaternary)]"
                />
                <span>{address}</span>
              </div>
            )}
            {!shop.phone && !shop.email && !address && (
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Sem informações de contato.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)] dark:bg-[var(--color-blue-500)]/15 dark:text-[var(--color-blue-300)]">
                <ClockIcon size={20} weight="duotone" className="size-5" />
              </div>
              <div className="min-w-0">
                <CardTitle>Horário de funcionamento</CardTitle>
                <CardDescription>Confira antes de visitar</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-1.5 text-text-sm sm:text-text-md">
            {(hours ?? []).length === 0 && (
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Horários não cadastrados.
              </p>
            )}
            {(hours ?? []).map((h) => {
              const isToday = h.weekday === today;
              return (
                <div
                  key={h.weekday}
                  className={`flex items-center justify-between rounded-lg px-2 py-1 ${
                    isToday ? "bg-[var(--color-blue-50)] dark:bg-[var(--color-blue-500)]/10" : ""
                  }`}
                >
                  <span
                    className={
                      isToday
                        ? "font-semibold text-[var(--color-text-primary)]"
                        : "text-[var(--color-text-tertiary)]"
                    }
                  >
                    {WEEKDAYS[h.weekday]}
                    {isToday && (
                      <span className="ml-2 text-text-xs font-medium uppercase tracking-wide text-[var(--color-blue-600)]">
                        Hoje
                      </span>
                    )}
                  </span>
                  <span
                    className={`tabular-nums ${
                      h.is_closed
                        ? "text-[var(--color-text-tertiary)]"
                        : "font-medium text-[var(--color-text-primary)]"
                    }`}
                  >
                    {h.is_closed
                      ? "Fechado"
                      : `${h.opens_at?.slice(0, 5)} – ${h.closes_at?.slice(0, 5)}`}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
