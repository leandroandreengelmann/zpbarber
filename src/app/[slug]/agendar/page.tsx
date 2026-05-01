import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  ScissorsIcon,
  SignInIcon,
  UserCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { getCurrentUser } from "@/lib/auth/current-user";
import { formatPhoneBR } from "@/lib/phone";
import { loadBookingDataAction } from "./actions";
import { BookingWizard } from "./_components/booking-wizard";

export default async function PublicBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [data, user] = await Promise.all([
    loadBookingDataAction(slug),
    getCurrentUser(),
  ]);
  if (!data) notFound();

  const currentClient =
    user && user.profile.is_client
      ? {
          name: user.profile.full_name ?? "",
          phone: user.profile.phone ? formatPhoneBR(user.profile.phone) : "",
        }
      : null;

  if (!data.shop.is_open) {
    return (
      <div className="grid place-items-center px-4 py-12 text-center sm:py-16">
        <WarningCircleIcon
          size={48}
          weight="duotone"
          className="text-[var(--color-text-tertiary)]"
        />
        <h1 className="mt-4 text-text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-display-xs">
          Esta barbearia não está aceitando agendamentos.
        </h1>
      </div>
    );
  }

  if (!data.shop.public_booking_enabled) {
    return (
      <div className="grid place-items-center px-4 py-12 text-center sm:py-16">
        <CalendarBlankIcon
          size={48}
          weight="duotone"
          className="text-[var(--color-text-tertiary)]"
        />
        <h1 className="mt-4 text-text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-display-xs">
          Agendamento online indisponível.
        </h1>
        {data.shop.phone && (
          <p className="mt-2 text-text-md text-[var(--color-text-tertiary)]">
            Entre em contato pelo telefone {data.shop.phone}.
          </p>
        )}
      </div>
    );
  }

  if (data.barbers.length === 0 || data.services.length === 0) {
    return (
      <div className="grid place-items-center px-4 py-12 text-center sm:py-16">
        <ScissorsIcon
          size={48}
          weight="duotone"
          className="text-[var(--color-text-tertiary)]"
        />
        <h1 className="mt-4 text-text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-display-xs">
          Nenhum profissional disponível para agendamento.
        </h1>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6">
      <header className="grid gap-2 sm:gap-3">
        <Link
          href={`/${slug}`}
          className="inline-flex w-fit items-center gap-1.5 rounded-md text-text-sm font-medium text-[var(--color-text-tertiary)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeftIcon size={16} weight="bold" />
          Voltar para {data.shop.name}
        </Link>
        <div className="grid gap-1.5 sm:gap-2">
          <h1 className="text-display-sm font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-display-md">
            Agendar horário
          </h1>
          <p className="text-text-sm text-[var(--color-text-tertiary)] sm:text-text-md">
            Em poucos passos você reserva seu horário em {data.shop.name}.
          </p>
        </div>
      </header>

      {!currentClient && (
        <div className="relative overflow-hidden rounded-2xl border border-[var(--color-blue-200)] bg-gradient-to-br from-[var(--color-blue-50)] via-[var(--color-bg-primary)] to-[var(--color-bg-primary)] p-5 shadow-[0_1px_3px_rgb(10_13_18_/_0.05)] dark:border-[var(--color-blue-500)]/30 dark:from-[var(--color-blue-500)]/10 dark:via-[var(--color-bg-primary)] dark:to-[var(--color-bg-primary)] sm:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-[var(--color-blue-600)]/10 blur-2xl"
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-blue-600)] text-white shadow-md shadow-[var(--color-blue-600)]/25">
                <UserCircleIcon size={28} weight="duotone" />
              </div>
              <div className="grid gap-1">
                <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Já tem conta?
                </p>
                <p className="text-text-sm text-[var(--color-text-tertiary)]">
                  Entre para acompanhar e cancelar pelo seu painel.
                </p>
              </div>
            </div>
            <Link
              href={`/cliente/login?next=${encodeURIComponent(`/${slug}/agendar`)}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--color-blue-600)] px-5 text-text-sm font-semibold text-white shadow-md shadow-[var(--color-blue-600)]/25 transition-all hover:-translate-y-0.5 hover:bg-[var(--color-blue-700)] hover:shadow-lg sm:w-auto"
            >
              <SignInIcon size={20} weight="duotone" />
              Entrar / Criar conta
            </Link>
          </div>
        </div>
      )}

      <BookingWizard slug={slug} data={data} currentClient={currentClient} />
    </div>
  );
}
