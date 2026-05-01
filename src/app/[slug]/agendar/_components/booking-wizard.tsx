"use client";

import { useActionState, useEffect, useMemo, useState, useTransition } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarBlankIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  ScissorsIcon,
  UserCircleIcon,
  UserCheckIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createPublicAppointmentAction,
  loadAvailableSlotsAction,
  type BookingPageData,
} from "../actions";
import { BookingSuccess } from "./booking-success";

type Props = {
  slug: string;
  data: BookingPageData;
  currentClient: { name: string; phone: string } | null;
};

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS: Record<Step, string> = {
  1: "Profissional",
  2: "Serviço",
  3: "Data e horário",
  4: "Seus dados",
};

const WEEKDAY_LABELS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MONTH_FULL_LABELS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDate(d: Date) {
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
}

function isoDate(d: Date) {
  return `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
}

function formatMoney(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function BookingWizard({ slug, data, currentClient }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [barberId, setBarberId] = useState<string | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, startSlotsTransition] = useTransition();
  const [phone, setPhone] = useState(currentClient?.phone ?? "");

  const [state, formAction, pending] = useActionState(
    createPublicAppointmentAction,
    {}
  );

  const service = useMemo(
    () => data.services.find((s) => s.id === serviceId) ?? null,
    [data.services, serviceId]
  );

  const barber = useMemo(
    () => data.barbers.find((b) => b.id === barberId) ?? null,
    [data.barbers, barberId]
  );

  // Mesma regra do trigger fn_barbers_for_service espelhada no client:
  // - se o barbeiro escolhido NÃO tem nenhum vínculo em barber_services,
  //   ele atende todos os serviços ativos da barbearia.
  // - se tem vínculos, só os serviços vinculados a ele.
  const eligibleServices = useMemo(() => {
    if (!barber) return [];
    const barberHasAnyLink = data.barber_services.some(
      (l) => l.barber_id === barber.id
    );
    if (!barberHasAnyLink) return data.services;
    const linkedServiceIds = new Set(
      data.barber_services
        .filter((l) => l.barber_id === barber.id)
        .map((l) => l.service_id)
    );
    return data.services.filter((s) => linkedServiceIds.has(s.id));
  }, [data.barber_services, data.services, barber]);

  // Datas dos próximos 14 dias
  const dates = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
  }, []);

  // Carregar slots quando data muda
  useEffect(() => {
    if (step !== 3 || !date || !service || !barberId) {
      setSlots([]);
      return;
    }
    setSlot(null);
    startSlotsTransition(async () => {
      const result = await loadAvailableSlotsAction(
        slug,
        service.id,
        barberId,
        isoDate(date)
      );
      setSlots(result);
    });
  }, [step, date, service, barberId, slug]);

  if (state.ok && state.scheduledAt) {
    return (
      <BookingSuccess
        shopName={data.shop.name}
        serviceName={state.serviceName ?? ""}
        barberName={state.barberName ?? ""}
        scheduledAt={state.scheduledAt}
        durationMinutes={state.durationMinutes ?? 0}
        priceCents={state.priceCents ?? 0}
        isClient={!!currentClient}
      />
    );
  }

  const canAdvance =
    (step === 1 && !!barberId) ||
    (step === 2 && !!serviceId) ||
    (step === 3 && !!slot) ||
    step === 4;

  return (
    <div className="grid gap-4 sm:gap-6">
      <Stepper current={step} />

      {state.error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)] dark:bg-[var(--color-error-500)]/10">
          <WarningCircleIcon
            size={28}
            weight="duotone"
            className="mt-0.5 shrink-0"
          />
          <span>{state.error}</span>
        </div>
      )}

      {step === 1 && (
        <div className="grid gap-3">
          <h2 className="text-text-md font-semibold text-[var(--color-text-primary)] sm:text-text-lg">
            Com quem você quer atendimento?
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-3">
            {data.barbers.map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => {
                    setBarberId(b.id);
                    setServiceId(null);
                    setSlot(null);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition sm:px-4 sm:py-4 ${
                    barberId === b.id
                      ? "border-[var(--color-blue-600)] bg-[var(--color-blue-50)] ring-2 ring-[var(--color-blue-600)] dark:bg-[var(--color-blue-500)]/15"
                      : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] hover:border-[var(--color-fg-tertiary)]"
                  }`}
                >
                  {b.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={b.avatar_url}
                      alt={b.full_name}
                      className="size-10 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
                      <UserCircleIcon size={28} weight="duotone" />
                    </div>
                  )}
                  <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                    {b.full_name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {data.barbers.length === 0 && (
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              Nenhum profissional disponível no momento.
            </p>
          )}
        </div>
      )}

      {step === 2 && barber && (
        <div className="grid gap-3">
          <h2 className="text-text-md font-semibold text-[var(--color-text-primary)] sm:text-text-lg">
            Qual serviço com {barber.full_name}?
          </h2>
          {eligibleServices.length === 0 ? (
            <p className="rounded-lg border border-dashed border-[var(--color-border-secondary)] px-4 py-6 text-center text-text-sm text-[var(--color-text-tertiary)]">
              Esse profissional não tem serviços disponíveis. Volte e escolha outro.
            </p>
          ) : (
            <ul className="grid gap-3 sm:gap-3 md:grid-cols-2">
              {eligibleServices.map((s) => {
                const selected = serviceId === s.id;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setServiceId(s.id);
                        setSlot(null);
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left transition sm:px-4 sm:py-4 ${
                        selected
                          ? "border-[var(--color-blue-600)] bg-[var(--color-blue-50)] ring-2 ring-[var(--color-blue-600)] dark:bg-[var(--color-blue-500)]/15"
                          : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] hover:border-[var(--color-fg-tertiary)]"
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
                            selected
                              ? "bg-[var(--color-blue-600)] text-white"
                              : "bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]"
                          }`}
                        >
                          <ScissorsIcon size={28} weight="duotone" />
                        </div>
                        <div className="grid min-w-0 gap-0.5">
                          <span className="truncate text-text-md font-semibold text-[var(--color-text-primary)]">
                            {s.name}
                          </span>
                          <span className="text-text-xs text-[var(--color-text-tertiary)]">
                            {s.duration_minutes} min
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 text-text-md font-semibold tabular-nums text-[var(--color-text-primary)]">
                        {formatMoney(s.price_cents)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {step === 3 && service && barber && (
        <div className="grid gap-4">
          <h2 className="text-text-md font-semibold text-[var(--color-text-primary)] sm:text-text-lg">
            Escolha o dia e horário
          </h2>
          <div className="grid gap-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-text-sm font-semibold capitalize text-[var(--color-text-primary)]">
                {MONTH_FULL_LABELS[(date ?? dates[0]).getMonth()]}{" "}
                <span className="text-[var(--color-text-tertiary)]">
                  {(date ?? dates[0]).getFullYear()}
                </span>
              </span>
              <span className="text-text-xs text-[var(--color-text-tertiary)]">
                Próximos 14 dias
              </span>
            </div>
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Essas são as datas em que o profissional atende. Toque em um dia
              para ver os horários.
            </p>
            <div className="flex gap-2 overflow-x-auto px-0.5 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {dates.map((d) => {
                  const selected = !!date && isSameDay(d, date);
                  const today = isSameDay(d, dates[0]);
                  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      onClick={() => setDate(d)}
                      aria-pressed={selected}
                      className={`group relative grid min-w-[60px] shrink-0 gap-1 rounded-2xl border p-3 text-center transition-all duration-200 ease-out sm:min-w-[64px] ${
                        selected
                          ? "-translate-y-0.5 scale-[1.03] border-transparent bg-[var(--color-blue-600)] shadow-lg shadow-[var(--color-blue-600)]/25"
                          : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] hover:-translate-y-0.5 hover:border-[var(--color-blue-600)] hover:shadow-md"
                      }`}
                    >
                      <span
                        className={`text-text-xs font-medium uppercase tracking-wide transition-colors ${
                          selected
                            ? "text-white/80"
                            : isWeekend
                              ? "text-[var(--color-blue-600)]"
                              : "text-[var(--color-text-tertiary)]"
                        }`}
                      >
                        {WEEKDAY_LABELS[d.getDay()]}
                      </span>
                      <span
                        className={`text-display-xs font-bold tabular-nums leading-none transition-colors ${
                          selected ? "text-white" : "text-[var(--color-text-primary)]"
                        }`}
                      >
                        {d.getDate()}
                      </span>
                      <span
                        className={`mx-auto h-1 w-1 rounded-full transition-all ${
                          today
                            ? selected
                              ? "bg-white"
                              : "bg-[var(--color-blue-600)]"
                            : "bg-transparent"
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
            </div>
          </div>

          {!date && (
            <p className="flex items-center gap-2 text-text-sm text-[var(--color-text-tertiary)]">
              <CalendarBlankIcon size={20} weight="duotone" />
              Selecione um dia para ver os horários disponíveis.
            </p>
          )}

          {date && (
            <div className="grid gap-2">
              <span className="text-text-sm font-medium text-[var(--color-text-secondary)]">
                Horários disponíveis para {formatDate(date)}
              </span>
              {loadingSlots ? (
                <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-10 animate-pulse rounded-lg bg-[var(--color-bg-secondary)]"
                    />
                  ))}
                </div>
              ) : slots.length === 0 ? (
                <p className="rounded-lg border border-dashed border-[var(--color-border-secondary)] px-4 py-6 text-center text-text-sm text-[var(--color-text-tertiary)]">
                  Nenhum horário disponível neste dia. Tente outro.
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {slots.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`flex h-11 items-center justify-center rounded-lg border text-text-sm font-medium tabular-nums transition sm:h-10 ${
                        slot === s
                          ? "border-[var(--color-blue-600)] bg-[var(--color-blue-600)] text-white"
                          : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] hover:border-[var(--color-fg-tertiary)]"
                      }`}
                    >
                      {formatTime(s)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {step === 4 && service && barber && slot && (
        <form action={formAction} className="grid gap-5">
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="service_id" value={service.id} />
          <input type="hidden" name="barber_id" value={barber.id} />
          <input type="hidden" name="scheduled_at" value={slot} />
          {/* honeypot */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            aria-hidden="true"
          />

          <div className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3.5 text-text-sm text-[var(--color-text-secondary)] sm:p-4">
            <div className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
              <CheckCircleIcon
                size={20}
                weight="duotone"
                className="shrink-0 text-[var(--color-success-600)]"
              />
              Resumo do agendamento
            </div>
            <ul className="mt-2 grid gap-1.5">
              <li className="flex items-center gap-2">
                <UserCircleIcon size={18} weight="duotone" className="shrink-0" />
                <span className="truncate">{barber.full_name}</span>
              </li>
              <li className="flex items-center gap-2">
                <ScissorsIcon size={18} weight="duotone" className="shrink-0" />
                <span className="truncate">
                  {service.name} · {formatMoney(service.price_cents)}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <ClockIcon size={18} weight="duotone" className="shrink-0" />
                <span className="truncate">
                  {date && formatDate(date)} · {formatTime(slot)} (
                  {service.duration_minutes} min)
                </span>
              </li>
            </ul>
          </div>

          {currentClient && (
            <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-success-subtle)] bg-[var(--color-success-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-success-primary)]">
              <UserCheckIcon size={28} weight="duotone" className="mt-0.5 shrink-0" />
              <span>
                Logado como{" "}
                <strong>{currentClient.name || "cliente"}</strong>. Este agendamento ficará no seu painel.
              </span>
            </div>
          )}

          <div className="grid gap-1.5">
            <Label htmlFor="client_name">Seu nome</Label>
            <Input
              id="client_name"
              name="client_name"
              required
              minLength={2}
              maxLength={120}
              placeholder="João da Silva"
              autoComplete="name"
              defaultValue={currentClient?.name ?? ""}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="client_phone">WhatsApp</Label>
            <Input
              id="client_phone"
              name="client_phone"
              required
              inputMode="tel"
              placeholder="(11) 99999-9999"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Você receberá a confirmação e o lembrete por WhatsApp.
            </p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="notes">Observações (opcional)</Label>
            <Input
              id="notes"
              name="notes"
              maxLength={500}
              placeholder="Algo que o profissional precise saber"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="h-11 w-full font-semibold"
          >
            {pending ? "Agendando..." : "Confirmar agendamento"}
          </Button>
        </form>
      )}

      <div className="grid grid-cols-2 items-center gap-3 pt-2 sm:flex sm:justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => setStep((s) => Math.max(1, (s - 1) as Step) as Step)}
          disabled={step === 1 || pending}
          className="h-11 w-full sm:w-auto"
        >
          <ArrowLeftIcon size={20} weight="bold" className="size-5" />
          Voltar
        </Button>
        {step < 4 ? (
          <Button
            type="button"
            size="lg"
            onClick={() => setStep((s) => Math.min(4, (s + 1) as Step) as Step)}
            disabled={!canAdvance}
            className="h-11 w-full sm:w-auto"
          >
            Continuar
            <ArrowRightIcon size={20} weight="bold" className="size-5" />
          </Button>
        ) : (
          <span aria-hidden="true" className="hidden sm:block" />
        )}
      </div>
    </div>
  );
}

function Stepper({ current }: { current: Step }) {
  const steps: Step[] = [1, 2, 3, 4];
  const progressPct = ((current - 1) / (steps.length - 1)) * 100;
  return (
    <div className="grid gap-3">
      <div className="relative">
        <div className="absolute inset-x-0 top-4 h-0.5 rounded-full bg-[var(--color-bg-secondary)] sm:top-5" />
        <div
          className="absolute left-0 top-4 h-0.5 rounded-full bg-[var(--color-blue-600)] transition-[width] duration-500 ease-out sm:top-5"
          style={{ width: `${progressPct}%` }}
        />
        <ol className="relative grid grid-cols-4 gap-1">
          {steps.map((s) => {
            const done = s < current;
            const active = s === current;
            return (
              <li key={s} className="grid justify-items-center gap-2">
                <div
                  aria-current={active ? "step" : undefined}
                  className={`relative z-10 grid size-8 place-items-center rounded-full border-2 text-text-sm font-semibold tabular-nums transition-all duration-300 ease-out sm:size-10 ${
                    done
                      ? "border-[var(--color-blue-600)] bg-[var(--color-blue-600)] text-white"
                      : active
                        ? "scale-110 border-[var(--color-blue-600)] bg-[var(--color-blue-600)] text-white shadow-[0_0_0_4px_var(--color-blue-100)] dark:shadow-[0_0_0_4px_rgba(59,130,246,0.25)]"
                        : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-text-tertiary)]"
                  }`}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[var(--color-blue-600)] opacity-30" />
                  )}
                  {done ? (
                    <CheckIcon size={18} weight="bold" className="size-4 sm:size-5" />
                  ) : (
                    <span>{s}</span>
                  )}
                </div>
                <span
                  className={`hidden truncate text-text-xs font-medium transition-colors sm:block ${
                    done || active
                      ? "text-[var(--color-text-primary)]"
                      : "text-[var(--color-text-tertiary)]"
                  }`}
                >
                  {STEP_LABELS[s]}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="flex items-baseline justify-between gap-2 sm:hidden">
        <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
          {STEP_LABELS[current]}
        </span>
        <span className="text-text-xs font-medium text-[var(--color-text-tertiary)]">
          Etapa {current} de 4
        </span>
      </div>
    </div>
  );
}
