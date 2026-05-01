import {
  CalendarPlusIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
  ScissorsIcon,
  UsersThreeIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { formatMoney } from "@/lib/format";

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

function isOpenNow(
  hours: Array<{
    weekday: number;
    is_closed: boolean;
    opens_at: string | null;
    closes_at: string | null;
  }>
) {
  const now = new Date();
  const today = hours.find((h) => h.weekday === now.getDay());
  if (!today || today.is_closed || !today.opens_at || !today.closes_at) return false;
  const [oH, oM] = today.opens_at.split(":").map(Number);
  const [cH, cM] = today.closes_at.split(":").map(Number);
  const cur = now.getHours() * 60 + now.getMinutes();
  return cur >= oH * 60 + oM && cur < cH * 60 + cM;
}

function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

export default async function PublicShopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.rpc("fn_public_booking_data", { p_slug: slug });
  const payload = data as
    | {
        shop: {
          id: string;
          name: string;
          phone: string | null;
          email: string | null;
          address: Address | null;
          primary_color: string | null;
          public_booking_enabled: boolean;
          is_open: boolean;
        };
        services: { id: string; name: string; duration_minutes: number; price_cents: number }[];
        barbers: { id: string; full_name: string | null; avatar_url: string | null }[];
        business_hours: {
          weekday: number;
          is_closed: boolean;
          opens_at: string | null;
          closes_at: string | null;
        }[];
      }
    | null;

  if (!payload?.shop) notFound();

  const shop = payload.shop;
  const hours = payload.business_hours ?? [];
  const services = payload.services ?? [];
  const barbers = payload.barbers ?? [];

  const address = formatAddressLine(shop.address as Address | null);
  const location = shortLocation(shop.address as Address | null);
  const today = todayWeekday();
  const todayHours = hours.find((h) => h.weekday === today);
  const openNow = isOpenNow(hours);
  const phoneDigits = shop.phone ? onlyDigits(shop.phone) : null;

  return (
    <div className="grid gap-8 sm:gap-12">
      <section className="relative overflow-hidden rounded-3xl border border-[var(--color-border-secondary)] bg-gradient-to-br from-[var(--color-blue-50)] via-[var(--color-bg-primary)] to-[var(--color-bg-primary)] px-5 py-8 sm:px-10 sm:py-12 dark:from-[var(--color-blue-500)]/10">
        <Image
          src="/symbol.png"
          alt=""
          aria-hidden
          width={320}
          height={320}
          className="pointer-events-none absolute -right-16 -top-12 size-72 select-none opacity-[0.07] sm:size-96 sm:opacity-[0.09]"
        />
        <div className="relative grid gap-5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-text-xs font-semibold ${
                openNow
                  ? "bg-[var(--color-success-50)] text-[var(--color-success-700)] dark:bg-[var(--color-success-500)]/15 dark:text-[var(--color-success-300)]"
                  : "bg-[var(--color-bg-secondary)] text-[var(--color-text-tertiary)]"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  openNow ? "bg-[var(--color-success-500)]" : "bg-[var(--color-fg-quaternary)]"
                }`}
              />
              {openNow ? "Aberto agora" : "Fechado"}
            </span>
            {todayHours && !todayHours.is_closed && todayHours.opens_at && todayHours.closes_at && (
              <span className="inline-flex items-center gap-1.5 text-text-xs text-[var(--color-text-tertiary)]">
                <ClockIcon size={14} weight="duotone" />
                Hoje {todayHours.opens_at.slice(0, 5)} – {todayHours.closes_at.slice(0, 5)}
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1.5 text-text-xs text-[var(--color-text-tertiary)]">
                <MapPinIcon size={14} weight="duotone" />
                {location}
              </span>
            )}
          </div>
          <h1 className="text-display-md font-bold tracking-tight text-[var(--color-text-primary)] sm:text-display-lg">
            {shop.name}
          </h1>
          <p className="max-w-xl text-text-md text-[var(--color-text-tertiary)] sm:text-text-lg">
            Reserve seu horário em poucos cliques. Sem ligação, sem espera.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {shop.public_booking_enabled && (
              <Link
                href={`/${slug}/agendar`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--color-blue-600)] px-6 text-text-md font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-blue-700)]"
              >
                <CalendarPlusIcon size={20} weight="duotone" />
                Agendar horário
              </Link>
            )}
            {phoneDigits && (
              <a
                href={`https://wa.me/55${phoneDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-5 text-text-md font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-secondary)]"
              >
                <WhatsappLogoIcon size={20} weight="duotone" />
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </section>

      {services.length > 0 && (
        <section className="grid gap-4 sm:gap-6">
          <div className="flex items-end justify-between gap-3">
            <div className="grid gap-1">
              <h2 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
                Serviços
              </h2>
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Escolha um serviço e agende com seu profissional preferido.
              </p>
            </div>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.id}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex items-start gap-3 p-4 sm:p-5">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)] dark:bg-[var(--color-blue-500)]/15 dark:text-[var(--color-blue-300)]">
                      <ScissorsIcon size={20} weight="duotone" />
                    </div>
                    <div className="grid flex-1 gap-1">
                      <span className="text-text-md font-semibold text-[var(--color-text-primary)]">
                        {s.name}
                      </span>
                      <span className="text-text-xs text-[var(--color-text-tertiary)]">
                        {s.duration_minutes} min
                      </span>
                    </div>
                    <span className="shrink-0 text-text-md font-semibold text-[var(--color-text-primary)]">
                      {formatMoney(s.price_cents)}
                    </span>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      {barbers.length > 0 && (
        <section className="grid gap-4 sm:gap-6">
          <div className="grid gap-1">
            <h2 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
              Equipe
            </h2>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Profissionais prontos para te atender.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {barbers.map((b) => (
              <li key={b.id}>
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center gap-2.5 p-4 text-center">
                    {b.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={b.avatar_url}
                        alt={b.full_name ?? ""}
                        className="size-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex size-16 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-fg-quaternary)]">
                        <UsersThreeIcon size={28} weight="duotone" />
                      </div>
                    )}
                    <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                      {b.full_name ?? "—"}
                    </span>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="grid gap-4 p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)] dark:bg-[var(--color-blue-500)]/15 dark:text-[var(--color-blue-300)]">
                <ClockIcon size={20} weight="duotone" />
              </div>
              <div className="min-w-0">
                <h3 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Horário de funcionamento
                </h3>
                <p className="text-text-xs text-[var(--color-text-tertiary)]">
                  Confira antes de visitar
                </p>
              </div>
            </div>
            <div className="grid gap-1 text-text-sm">
              {hours.length === 0 ? (
                <p className="text-[var(--color-text-tertiary)]">
                  Horários não cadastrados.
                </p>
              ) : (
                hours.map((h) => {
                  const isToday = h.weekday === today;
                  return (
                    <div
                      key={h.weekday}
                      className={`flex items-center justify-between rounded-md px-2 py-1.5 ${
                        isToday
                          ? "bg-[var(--color-blue-50)] dark:bg-[var(--color-blue-500)]/10"
                          : ""
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
                })
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid gap-4 p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)] dark:bg-[var(--color-blue-500)]/15 dark:text-[var(--color-blue-300)]">
                <MapPinIcon size={20} weight="duotone" />
              </div>
              <div className="min-w-0">
                <h3 className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Contato
                </h3>
                <p className="text-text-xs text-[var(--color-text-tertiary)]">
                  Fale diretamente com a barbearia
                </p>
              </div>
            </div>
            <div className="grid gap-2.5 text-text-sm text-[var(--color-text-secondary)]">
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
                <p className="text-[var(--color-text-tertiary)]">
                  Sem informações de contato.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
