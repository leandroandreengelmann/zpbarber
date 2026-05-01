"use client";

import { useState } from "react";
import {
  CashRegisterIcon,
  ClockIcon,
  ScissorsIcon,
  UserCircleIcon,
  UserSwitchIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatMoney, formatTimeBR } from "@/lib/format";
import {
  NewSaleForm,
  type SaleClient,
  type SalePrefill,
  type SaleProduct,
  type SaleService,
} from "./new-sale-form";
import { createSaleAction } from "../actions";

export type PendingAppt = {
  id: string;
  scheduled_at: string;
  price_cents: number;
  client_id: string;
  service_id: string;
  barber_id: string | null;
  client_name: string;
  service_name: string;
  barber_name: string | null;
};

export function PendingBills({
  items,
  clients,
  services,
  products,
}: {
  items: PendingAppt[];
  clients: SaleClient[];
  services: SaleService[];
  products: SaleProduct[];
}) {
  const [billing, setBilling] = useState<PendingAppt | null>(null);

  if (items.length === 0) return null;

  const prefill: SalePrefill | null = billing
    ? {
        appointment_id: billing.id,
        client_id: billing.client_id,
        barber_id: billing.barber_id ?? "",
        items: [
          {
            service_id: billing.service_id,
            description: billing.service_name,
            quantity: 1,
            unit_cents: billing.price_cents,
          },
        ],
      }
    : null;

  return (
    <>
      <div className="rounded-xl border border-[var(--color-warning-200)] bg-[var(--color-warning-50)]">
        <div className="flex flex-col gap-1 border-b border-[var(--color-warning-200)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <div className="flex items-center gap-2">
            <CashRegisterIcon
              size={28}
              weight="duotone"
              className="text-[var(--color-warning-700)]"
            />
            <h2 className="text-text-md font-semibold text-[var(--color-warning-700)]">
              Aguardando cobrança
            </h2>
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-[var(--color-warning-700)] text-text-xs font-semibold text-white">
              {items.length}
            </span>
          </div>
          <span className="text-text-sm text-[var(--color-warning-700)]">
            Total {formatMoney(items.reduce((s, a) => s + a.price_cents, 0))}
          </span>
        </div>
        <ul className="divide-y divide-[var(--color-warning-200)]">
          {items.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:px-6"
            >
              <div className="flex items-center gap-3 sm:contents">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-blue-700)]">
                  <UserCircleIcon size={22} weight="duotone" />
                </div>
                <div className="grid min-w-0 flex-1 gap-1">
                  <span className="truncate text-text-sm font-semibold text-[var(--color-text-primary)]">
                    {a.client_name}
                  </span>
                  <div className="flex flex-col gap-1 text-text-xs text-[var(--color-text-tertiary)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-0.5">
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon
                        size={16}
                        weight="duotone"
                        className="text-[var(--color-text-secondary)]"
                      />
                      {formatTimeBR(a.scheduled_at)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ScissorsIcon
                        size={16}
                        weight="duotone"
                        className="text-[var(--color-text-secondary)]"
                      />
                      {a.service_name}
                    </span>
                    {a.barber_name && (
                      <span className="inline-flex items-center gap-1.5">
                        <UserSwitchIcon
                          size={16}
                          weight="duotone"
                          className="text-[var(--color-text-secondary)]"
                        />
                        {a.barber_name}
                      </span>
                    )}
                  </div>
                </div>
                <span className="shrink-0 tabular-nums text-text-md font-semibold text-[var(--color-text-primary)] sm:order-none">
                  {formatMoney(a.price_cents)}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => setBilling(a)}
                className="h-10 w-full sm:h-9 sm:w-auto"
              >
                <CashRegisterIcon size={18} weight="duotone" />
                Cobrar
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <Dialog open={!!billing} onOpenChange={(o) => !o && setBilling(null)}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Cobrar atendimento</DialogTitle>
            <DialogDescription>
              {billing?.client_name} · {billing?.service_name}
            </DialogDescription>
          </DialogHeader>
          {prefill && (
            <NewSaleForm
              action={createSaleAction}
              clients={clients}
              services={services}
              products={products}
              prefill={prefill}
              onSuccess={() => setBilling(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
