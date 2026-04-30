"use client";

import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";
import { haptics } from "@/lib/haptics";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AppointmentForm,
  type BarberOpt,
  type BarberServiceLink,
  type ClientOpt,
  type ServiceOpt,
} from "../appointment-form";
import type {
  createAppointmentAction,
  createClientAction,
} from "../actions";

export function NewAppointmentFab({
  action,
  createClientAction: createClientActionProp,
  clients,
  services,
  barbers,
  barberServices,
  lockedBarberId,
  defaultDate,
}: {
  action: typeof createAppointmentAction;
  createClientAction: typeof createClientAction;
  clients: ClientOpt[];
  services: ServiceOpt[];
  barbers: BarberOpt[];
  barberServices: BarberServiceLink[];
  lockedBarberId?: string;
  defaultDate: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          haptics.tap();
          setOpen(true);
        }}
        aria-label="Novo agendamento"
        className="fixed right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[var(--color-blue-600)] text-white shadow-[0_8px_24px_-4px_rgb(41_112_255_/_0.5)] transition-transform active:scale-95 md:hidden"
        style={{
          bottom: "calc(env(safe-area-inset-bottom) + 80px)",
        }}
      >
        <PlusIcon size={28} weight="bold" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Novo agendamento</DialogTitle>
            <DialogDescription>
              Selecione cliente, serviço e horário.
            </DialogDescription>
          </DialogHeader>
          <AppointmentForm
            action={action}
            createClientAction={createClientActionProp}
            clients={clients}
            services={services}
            barbers={barbers}
            barberServices={barberServices}
            lockedBarberId={lockedBarberId}
            defaultDate={defaultDate}
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
