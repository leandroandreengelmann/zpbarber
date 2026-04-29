"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import {
  CalendarBlankIcon,
  CurrencyCircleDollarIcon,
  FloppyDiskIcon,
  NotePencilIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/datetime-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type State = { error?: string; ok?: boolean };

export type ClientOpt = { id: string; full_name: string; phone?: string | null };
export type ServiceOpt = {
  id: string;
  name: string;
  duration_minutes: number;
  price_cents: number;
};
export type BarberOpt = { id: string; full_name: string };
export type BarberServiceLink = {
  barber_id: string;
  service_id: string;
  price_cents: number | null;
  duration_minutes: number | null;
};

function formatCents(cents?: number) {
  return cents ? (cents / 100).toFixed(2).replace(".", ",") : "";
}

function FieldIcon({
  Icon,
}: {
  Icon: typeof CalendarBlankIcon;
}) {
  return (
    <Icon
      size={28}
      weight="duotone"
      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
    />
  );
}

export type AppointmentInitial = {
  client_id: string;
  service_id: string;
  barber_id: string | null;
  scheduled_at: string;
  duration_minutes: number;
  price_cents: number;
  notes?: string | null;
};

export function AppointmentForm({
  action,
  clients,
  services,
  barbers,
  barberServices,
  defaultDate,
  initial,
  onSuccess,
  submitLabel,
  lockedBarberId,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  clients: ClientOpt[];
  services: ServiceOpt[];
  barbers: BarberOpt[];
  barberServices: BarberServiceLink[];
  defaultDate?: string;
  initial?: AppointmentInitial;
  onSuccess?: () => void;
  submitLabel?: string;
  lockedBarberId?: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [barberId, setBarberId] = useState<string>(
    lockedBarberId ?? initial?.barber_id ?? ""
  );
  const [serviceId, setServiceId] = useState<string>(initial?.service_id ?? "");
  const [clientId, setClientId] = useState<string>(initial?.client_id ?? "");
  const [duration, setDuration] = useState<number>(
    initial?.duration_minutes ?? 30
  );
  const [price, setPrice] = useState<string>(
    initial ? formatCents(initial.price_cents) : ""
  );

  const linksByBarber = useMemo(() => {
    const map = new Map<string, Map<string, BarberServiceLink>>();
    for (const link of barberServices) {
      let inner = map.get(link.barber_id);
      if (!inner) {
        inner = new Map();
        map.set(link.barber_id, inner);
      }
      inner.set(link.service_id, link);
    }
    return map;
  }, [barberServices]);

  const availableServices = useMemo(() => {
    if (!barberId) return services;
    const links = linksByBarber.get(barberId);
    if (!links || links.size === 0) return services;
    return services.filter((s) => links.has(s.id));
  }, [barberId, linksByBarber, services]);

  function resolveServiceValues(svcId: string, brbId: string) {
    const svc = services.find((s) => s.id === svcId);
    if (!svc) return null;
    const link = brbId ? linksByBarber.get(brbId)?.get(svcId) : undefined;
    return {
      duration: link?.duration_minutes ?? svc.duration_minutes,
      price_cents: link?.price_cents ?? svc.price_cents,
    };
  }

  function handleBarberPick(v: unknown) {
    const id = typeof v === "string" ? v : "";
    setBarberId(id);
    if (serviceId) {
      const links = id ? linksByBarber.get(id) : undefined;
      if (id && links && !links.has(serviceId)) {
        setServiceId("");
        setPrice("");
        return;
      }
      const vals = resolveServiceValues(serviceId, id);
      if (vals) {
        setDuration(vals.duration);
        setPrice(formatCents(vals.price_cents));
      }
    }
  }

  function handleServicePick(v: unknown) {
    const id = typeof v === "string" ? v : "";
    setServiceId(id);
    const vals = id ? resolveServiceValues(id, barberId) : null;
    if (vals) {
      setDuration(vals.duration);
      setPrice(formatCents(vals.price_cents));
    } else {
      setPrice("");
    }
  }

  useEffect(() => {
    if (state.ok) {
      notify.success("Agendamento salvo", {
        description: "A agenda foi atualizada.",
      });
      onSuccess?.();
    }
    if (state.error) {
      notify.error("Não foi possível salvar", { description: state.error });
    }
  }, [state, onSuccess]);

  function toLocalInputValue(d: Date) {
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  function nextSlotNow() {
    const d = new Date();
    d.setSeconds(0, 0);
    const m = d.getMinutes();
    const next = m % 5 === 0 ? m : m + (5 - (m % 5));
    d.setMinutes(next);
    return d;
  }
  const now = nextSlotNow();
  const todayLocal = toLocalInputValue(now).slice(0, 10);
  const initialStart = initial
    ? toLocalInputValue(new Date(initial.scheduled_at))
    : null;
  const isPastDate = !!defaultDate && defaultDate < todayLocal;
  const isToday = !!defaultDate && defaultDate === todayLocal;
  const baseDate = isPastDate ? todayLocal : (defaultDate ?? todayLocal);
  const defaultStart =
    initialStart ??
    (isToday
      ? toLocalInputValue(now)
      : defaultDate && !isPastDate
        ? `${baseDate}T09:00`
        : toLocalInputValue(now));
  const minStart = initial ? "" : toLocalInputValue(now);

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-1.5">
        <Label htmlFor="barber_id">
          {lockedBarberId ? "Barbeiro" : "Barbeiro (opcional)"}
        </Label>
        <input type="hidden" name="barber_id" value={barberId} />
        <Select
          value={barberId}
          onValueChange={handleBarberPick}
          disabled={!!lockedBarberId}
        >
          <SelectTrigger id="barber_id">
            <SelectValue placeholder="Sem preferência">
              {(value: string) => {
                const b = barbers.find((b) => b.id === value);
                return b?.full_name ?? "Sem preferência";
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {barbers.length === 0 ? (
              <div className="px-3 py-2 text-text-sm text-[var(--color-text-tertiary)]">
                Sem barbeiros vinculados.
              </div>
            ) : (
              barbers.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.full_name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="service_id">Serviço</Label>
        <input type="hidden" name="service_id" value={serviceId} />
        <Select value={serviceId} onValueChange={handleServicePick} required>
          <SelectTrigger id="service_id">
            <SelectValue placeholder="Selecione um serviço">
              {(value: string) => {
                const s = services.find((s) => s.id === value);
                if (!s) return "Selecione um serviço";
                const vals = resolveServiceValues(s.id, barberId);
                return `${s.name} · ${vals?.duration ?? s.duration_minutes} min`;
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {availableServices.length === 0 ? (
              <div className="px-3 py-2 text-text-sm text-[var(--color-text-tertiary)]">
                {barberId
                  ? "Este barbeiro ainda não tem serviços marcados."
                  : "Cadastre serviços antes."}
              </div>
            ) : (
              availableServices.map((s) => {
                const vals = resolveServiceValues(s.id, barberId);
                return (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} · {vals?.duration ?? s.duration_minutes} min
                  </SelectItem>
                );
              })
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="client_id">Cliente</Label>
        <input type="hidden" name="client_id" value={clientId} />
        <Select value={clientId} onValueChange={(v) => setClientId(v ?? "")} required>
          <SelectTrigger id="client_id">
            <SelectValue placeholder="Selecione um cliente">
              {(value: string) => {
                const c = clients.find((c) => c.id === value);
                if (!c) return "Selecione um cliente";
                return `${c.full_name}${c.phone ? ` · ${c.phone}` : ""}`;
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {clients.length === 0 ? (
              <div className="px-3 py-2 text-text-sm text-[var(--color-text-tertiary)]">
                Nenhum cliente cadastrado.
              </div>
            ) : (
              clients.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.full_name}
                  {c.phone ? ` · ${c.phone}` : ""}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-5">
        <div className="grid gap-1.5">
          <Label htmlFor="scheduled_at">Início</Label>
          <DateTimePicker
            id="scheduled_at"
            name="scheduled_at"
            defaultValue={defaultStart}
            min={minStart || undefined}
            required
            stepMinutes={duration}
          />
        </div>
      </div>

      <input type="hidden" name="duration_minutes" value={duration} />

      <div className="grid gap-1.5">
        <Label htmlFor="price">Preço (R$)</Label>
        <div className="relative">
          <FieldIcon Icon={CurrencyCircleDollarIcon} />
          <Input
            id="price"
            name="price"
            inputMode="decimal"
            placeholder="0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="pl-10 tabular-nums"
          />
        </div>
        {serviceId && (
          <span className="text-text-xs text-[var(--color-text-tertiary)]">
            Duração do serviço: {duration} min
            {barberId && linksByBarber.get(barberId)?.has(serviceId)
              ? " · valores deste barbeiro"
              : ""}
          </span>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="notes">Observações</Label>
        <div className="relative">
          <FieldIcon Icon={NotePencilIcon} />
          <Input
            id="notes"
            name="notes"
            placeholder="Notas internas..."
            defaultValue={initial?.notes ?? ""}
            className="pl-10"
          />
        </div>
      </div>

      <div className="sticky bottom-[-1rem] -mx-4 -mb-1 flex justify-end border-t border-[var(--color-border-secondary)] bg-popover px-4 pb-2 pt-3 sm:static sm:m-0 sm:border-0 sm:bg-transparent sm:p-0">
        <Button type="submit" disabled={pending} className="h-11 w-full sm:w-auto">
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : (submitLabel ?? "Agendar")}
        </Button>
      </div>
    </form>
  );
}
