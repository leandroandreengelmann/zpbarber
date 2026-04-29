"use client";

import { useEffect } from "react";
import {
  CalendarBlankIcon,
  CheckCircleIcon,
  ClockIcon,
  ScissorsIcon,
  UserCircleIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";
import { haptics } from "@/lib/haptics";

type Props = {
  shopName: string;
  serviceName: string;
  barberName: string;
  scheduledAt: string;
  durationMinutes: number;
  priceCents: number;
};

const WEEKDAYS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function formatLongDate(d: Date) {
  return `${WEEKDAYS[d.getDay()]}, ${d
    .getDate()
    .toString()
    .padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMoney(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function gcalLink(p: Props) {
  const start = new Date(p.scheduledAt);
  const end = new Date(start.getTime() + p.durationMinutes * 60_000);
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${p.serviceName} - ${p.shopName}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Profissional: ${p.barberName}`,
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

export function BookingSuccess(props: Props) {
  const start = new Date(props.scheduledAt);
  useEffect(() => {
    haptics.success();
  }, []);
  return (
    <div className="grid place-items-center py-6 text-center sm:py-10">
      <div className="grid w-full max-w-xl gap-4 sm:gap-5">
        <div className="grid place-items-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-full bg-[var(--color-success-50)] dark:bg-[var(--color-success-500)]/15 sm:size-16">
            <CheckCircleIcon
              size={48}
              weight="duotone"
              className="text-[var(--color-success-600)]"
            />
          </div>
          <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-display-sm">
            Agendamento confirmado!
          </h1>
          <p className="text-text-sm text-[var(--color-text-tertiary)] sm:text-text-md">
            Enviamos a confirmação no seu WhatsApp.
          </p>
        </div>

        <Card className="grid gap-3 p-4 text-left sm:p-5">
          <div className="flex items-center gap-3">
            <ScissorsIcon
              size={28}
              weight="duotone"
              className="shrink-0 text-[var(--color-fg-secondary)]"
            />
            <div className="grid min-w-0 gap-0.5">
              <span className="text-text-xs text-[var(--color-text-tertiary)] sm:text-text-sm">
                Serviço
              </span>
              <span className="truncate text-text-sm font-semibold text-[var(--color-text-primary)] sm:text-text-md">
                {props.serviceName} · {formatMoney(props.priceCents)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserCircleIcon
              size={28}
              weight="duotone"
              className="shrink-0 text-[var(--color-fg-secondary)]"
            />
            <div className="grid min-w-0 gap-0.5">
              <span className="text-text-xs text-[var(--color-text-tertiary)] sm:text-text-sm">
                Profissional
              </span>
              <span className="truncate text-text-sm font-semibold text-[var(--color-text-primary)] sm:text-text-md">
                {props.barberName}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CalendarBlankIcon
              size={28}
              weight="duotone"
              className="shrink-0 text-[var(--color-fg-secondary)]"
            />
            <div className="grid min-w-0 gap-0.5">
              <span className="text-text-xs text-[var(--color-text-tertiary)] sm:text-text-sm">
                Data
              </span>
              <span className="truncate text-text-sm font-semibold text-[var(--color-text-primary)] sm:text-text-md">
                {formatLongDate(start)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ClockIcon
              size={28}
              weight="duotone"
              className="shrink-0 text-[var(--color-fg-secondary)]"
            />
            <div className="grid min-w-0 gap-0.5">
              <span className="text-text-xs text-[var(--color-text-tertiary)] sm:text-text-sm">
                Horário
              </span>
              <span className="text-text-sm font-semibold tabular-nums text-[var(--color-text-primary)] sm:text-text-md">
                {formatTime(start)} ({props.durationMinutes} min)
              </span>
            </div>
          </div>
        </Card>

        <a
          href={gcalLink(props)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-5 text-text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] sm:w-auto sm:self-center"
        >
          <CalendarBlankIcon size={20} weight="duotone" />
          Adicionar ao Google Calendar
        </a>

        <p className="flex items-center justify-center gap-2 text-text-sm text-[var(--color-text-tertiary)]">
          <WhatsappLogoIcon
            size={20}
            weight="duotone"
            className="text-[var(--color-success-600)]"
          />
          Você receberá um lembrete antes do horário.
        </p>
      </div>
    </div>
  );
}
