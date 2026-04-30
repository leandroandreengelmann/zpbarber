"use client";

import { useState, useTransition } from "react";
import {
  ArrowCounterClockwiseIcon,
  CashRegisterIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  NotePencilIcon,
  ProhibitIcon,
  ScissorsIcon,
  UserCircleIcon,
  UserMinusIcon,
  UserSwitchIcon,
} from "@phosphor-icons/react";
import { formatMoney, formatTimeBR } from "@/lib/format";
import { notify } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NewSaleForm,
  type SaleClient,
  type SalePrefill,
  type SaleProduct,
  type SaleService,
} from "@/app/app/caixa/_components/new-sale-form";
import { createSaleAction } from "@/app/app/caixa/actions";
import { useIsMobile } from "@/hooks/use-is-mobile";
import {
  setAppointmentStatusAction,
  updateAppointmentAction,
} from "../actions";
import type { createClientAction } from "../actions";
import {
  AppointmentForm,
  type BarberOpt,
  type BarberServiceLink,
  type ClientOpt,
  type ServiceOpt,
} from "../appointment-form";
import type { DayAppt } from "../views/day-view";

type StatusKey = "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";

type ActionItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  variant?: "default" | "destructive";
  onClick: () => void;
  disabled?: boolean;
};

export function AppointmentMenu({
  appt,
  clients,
  services,
  products,
  formClients,
  formServices,
  barbers,
  barberServices,
  lockedBarberId,
  createClientAction: createClientActionProp,
  children,
}: {
  appt: DayAppt;
  clients: SaleClient[];
  services: SaleService[];
  products: SaleProduct[];
  formClients: ClientOpt[];
  formServices: ServiceOpt[];
  barbers: BarberOpt[];
  barberServices: BarberServiceLink[];
  lockedBarberId?: string;
  createClientAction: typeof createClientAction;
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [billOpen, setBillOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const isFinal =
    appt.status === "completed" ||
    appt.status === "cancelled" ||
    appt.status === "no_show";

  function runStatus(status: StatusKey) {
    startTransition(async () => {
      try {
        await setAppointmentStatusAction(appt.id, status);
        notify.success(STATUS_TOAST[status]);
        setOpen(false);
      } catch (e) {
        notify.error("Não foi possível atualizar", {
          description: e instanceof Error ? e.message : "Tente novamente.",
        });
      }
    });
  }

  const prefill: SalePrefill = {
    appointment_id: appt.id,
    client_id: appt.client_id,
    barber_id: appt.barber_id ?? "",
    items: [
      {
        service_id: appt.service_id,
        description: appt.service?.name ?? "Serviço",
        quantity: 1,
        unit_cents: appt.price_cents ?? 0,
      },
    ],
  };

  const editAction = updateAppointmentAction.bind(null, appt.id);

  const actions: ActionItem[] = isFinal
    ? [
        ...(appt.needs_billing
          ? [
              {
                key: "bill",
                label: "Cobrar",
                icon: <CashRegisterIcon size={22} weight="duotone" />,
                onClick: () => {
                  setOpen(false);
                  setBillOpen(true);
                },
              } as ActionItem,
            ]
          : []),
        {
          key: "reopen",
          label: "Reabrir agendamento",
          icon: <ArrowCounterClockwiseIcon size={22} weight="duotone" />,
          onClick: () => runStatus("scheduled"),
          disabled: pending,
        },
      ]
    : [
        {
          key: "bill",
          label: "Cobrar",
          icon: <CashRegisterIcon size={22} weight="duotone" />,
          onClick: () => {
            setOpen(false);
            setBillOpen(true);
          },
        },
        {
          key: "edit",
          label: "Editar",
          icon: <NotePencilIcon size={22} weight="duotone" />,
          onClick: () => {
            setOpen(false);
            setEditOpen(true);
          },
        },
        appt.status === "confirmed"
          ? {
              key: "unconfirm",
              label: "Desfazer confirmação",
              icon: <ArrowCounterClockwiseIcon size={22} weight="duotone" />,
              onClick: () => runStatus("scheduled"),
              disabled: pending,
            }
          : {
              key: "confirm",
              label: "Confirmar",
              icon: <CheckIcon size={22} weight="duotone" />,
              onClick: () => runStatus("confirmed"),
              disabled: pending,
            },
        {
          key: "complete",
          label: "Concluir",
          icon: <CheckCircleIcon size={22} weight="duotone" />,
          onClick: () => runStatus("completed"),
          disabled: pending,
        },
        {
          key: "no_show",
          label: "Não veio",
          icon: <UserMinusIcon size={22} weight="duotone" />,
          onClick: () => runStatus("no_show"),
          disabled: pending,
        },
        {
          key: "cancel",
          label: "Cancelar",
          icon: <ProhibitIcon size={22} weight="duotone" />,
          variant: "destructive",
          onClick: () => runStatus("cancelled"),
          disabled: pending,
        },
      ];

  const summary = (
    <div className="grid gap-2 border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-3 py-3 sm:rounded-t-xl">
      <div className="flex items-center gap-2.5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-100)] text-[var(--color-blue-700)]">
          <UserCircleIcon size={22} weight="duotone" />
        </div>
        <div className="grid min-w-0 flex-1 gap-0.5">
          <span className="truncate text-text-sm font-semibold text-[var(--color-text-primary)]">
            {appt.client?.full_name ?? "Cliente"}
          </span>
          <span className="inline-flex items-center gap-1 text-text-xs text-[var(--color-text-tertiary)]">
            <ClockIcon size={14} weight="duotone" />
            {formatTimeBR(appt.scheduled_at)} · {appt.duration_minutes}min
          </span>
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-text-xs font-semibold ${STATUS_PILL[appt.status]}`}
        >
          {STATUS_LABEL[appt.status]}
        </span>
      </div>
      <div className="flex items-end justify-between gap-2 border-t border-[var(--color-border-secondary)] pt-2">
        <div className="grid min-w-0 gap-0.5">
          <span className="inline-flex items-center gap-1.5 truncate text-text-sm font-medium text-[var(--color-text-secondary)]">
            <ScissorsIcon size={14} weight="duotone" />
            {appt.service?.name ?? "Serviço"}
          </span>
          {appt.barber?.full_name && (
            <span className="inline-flex items-center gap-1.5 truncate text-text-xs text-[var(--color-text-tertiary)]">
              <UserSwitchIcon size={14} weight="duotone" />
              {appt.barber.full_name}
            </span>
          )}
        </div>
        <span className="shrink-0 tabular-nums text-text-md font-semibold text-[var(--color-text-primary)]">
          {formatMoney(appt.price_cents ?? 0)}
        </span>
      </div>
    </div>
  );

  const billingHint = appt.needs_billing && (
    <div className="flex items-start gap-2 border-b border-[var(--color-warning-200)] bg-[var(--color-warning-50)] px-3 py-2">
      <CashRegisterIcon
        size={16}
        weight="duotone"
        className="mt-0.5 shrink-0 text-[var(--color-warning-700)]"
      />
      <div className="grid gap-0.5">
        <span className="text-text-xs font-semibold text-[var(--color-warning-700)]">
          Concluído mas não cobrado
        </span>
        <span className="text-text-xs text-[var(--color-warning-700)]">
          Use Cobrar para registrar pagamento e comissão.
        </span>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <>
          <button
            type="button"
            aria-label="Ações do agendamento"
            onClick={() => setOpen(true)}
            className="block h-full w-full cursor-pointer rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue-500)]"
          >
            {children}
          </button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
              showCloseButton={false}
              className="gap-0 p-0 sm:max-w-sm"
            >
              <DialogHeader className="sr-only">
                <DialogTitle>Ações do agendamento</DialogTitle>
                <DialogDescription>
                  {appt.client?.full_name ?? "Cliente"} ·{" "}
                  {appt.service?.name ?? "Serviço"}
                </DialogDescription>
              </DialogHeader>
              {summary}
              {billingHint}
              <div
                className="grid gap-1 px-2 py-2"
                style={{
                  paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
                }}
              >
                {actions.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={a.onClick}
                    disabled={a.disabled}
                    className={`flex h-12 items-center gap-3 rounded-lg px-3 text-left text-text-md font-medium transition-colors disabled:opacity-50 ${
                      a.variant === "destructive"
                        ? "text-[var(--color-error-700)] hover:bg-[var(--color-error-50)]"
                        : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
                    }`}
                  >
                    {a.icon}
                    {a.label}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                aria-label="Ações do agendamento"
                className="block h-full w-full cursor-pointer rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-blue-500)]"
              />
            }
          >
            {children}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-72 p-0">
            {summary}
            {billingHint}
            <div className="p-1.5">
              {actions.map((a, idx) => {
                const showSep =
                  !isFinal && (a.key === "edit" || a.key === "unconfirm" || a.key === "confirm");
                return (
                  <div key={a.key}>
                    <DropdownMenuItem
                      onClick={a.onClick}
                      disabled={a.disabled}
                      variant={a.variant === "destructive" ? "destructive" : undefined}
                    >
                      {a.icon}
                      {a.label}
                    </DropdownMenuItem>
                    {showSep && idx === 1 && <DropdownMenuSeparator />}
                  </div>
                );
              })}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Dialog open={billOpen} onOpenChange={setBillOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cobrar agendamento</DialogTitle>
            <DialogDescription>
              {appt.client?.full_name ?? "Cliente"} ·{" "}
              {appt.service?.name ?? "Serviço"}
            </DialogDescription>
          </DialogHeader>
          <NewSaleForm
            action={createSaleAction}
            clients={clients}
            services={services}
            products={products}
            prefill={prefill}
            onSuccess={() => setBillOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Editar agendamento</DialogTitle>
            <DialogDescription>
              Atualize cliente, serviço, barbeiro ou horário.
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm
            action={editAction}
            createClientAction={createClientActionProp}
            clients={formClients}
            services={formServices}
            barbers={barbers}
            barberServices={barberServices}
            lockedBarberId={lockedBarberId}
            initial={{
              client_id: appt.client_id,
              service_id: appt.service_id,
              barber_id: appt.barber_id,
              scheduled_at: appt.scheduled_at,
              duration_minutes: appt.duration_minutes,
              price_cents: appt.price_cents ?? 0,
              notes: null,
            }}
            submitLabel="Salvar alterações"
            onSuccess={() => setEditOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const STATUS_TOAST: Record<string, string> = {
  scheduled: "Agendamento reaberto.",
  confirmed: "Agendamento confirmado.",
  completed: "Agendamento concluído.",
  cancelled: "Agendamento cancelado.",
  no_show: "Marcado como não veio.",
};

const STATUS_LABEL: Record<string, string> = {
  scheduled: "Agendado",
  confirmed: "Confirmado",
  completed: "Concluído",
  cancelled: "Cancelado",
  no_show: "Não veio",
};

const STATUS_PILL: Record<string, string> = {
  scheduled: "bg-[var(--color-blue-100)] text-[var(--color-blue-700)]",
  confirmed: "bg-[var(--color-success-100)] text-[var(--color-success-700)]",
  completed: "bg-[var(--color-gray-200)] text-[var(--color-gray-700)]",
  cancelled: "bg-[var(--color-error-100)] text-[var(--color-error-700)]",
  no_show: "bg-[var(--color-warning-100)] text-[var(--color-warning-700)]",
};
