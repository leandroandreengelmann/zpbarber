import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  ScissorsIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { loadBookingDataAction } from "./actions";
import { BookingWizard } from "./_components/booking-wizard";

export default async function PublicBookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await loadBookingDataAction(slug);
  if (!data) notFound();

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

      <BookingWizard slug={slug} data={data} />
    </div>
  );
}
