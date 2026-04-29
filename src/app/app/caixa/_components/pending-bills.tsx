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
      <div className="rounded-xl border border-[var(--color-warning-200)] bg-[var(--color-warning-50)] p-0">
        <div className="flex items-center justify-between border-b border-[var(--color-warning-200)] px-6 py-4">
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
              className="flex flex-wrap items-center gap-4 px-6 py-3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-blue-700)]">
                <UserCircleIcon size={22} weight="duotone" />
              </div>
              <div className="grid min-w-0 flex-1 gap-0.5">
                <span className="truncate text-text-sm font-semibold text-[var(--color-text-primary)]">
                  {a.client_name}
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-text-xs text-[var(--color-text-tertiary)]">
                  <span className="inline-flex items-center gap-1">
                    <ClockIcon size={14} weight="duotone" />
                    {formatTimeBR(a.scheduled_at)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ScissorsIcon size={14} weight="duotone" />
                    {a.service_name}
                  </span>
                  {a.barber_name && (
                    <span className="inline-flex items-center gap-1">
                      <UserSwitchIcon size={14} weight="duotone" />
                      {a.barber_name}
                    </span>
                  )}
                </div>
              </div>
              <span className="shrink-0 tabular-nums text-text-md font-semibold text-[var(--color-text-primary)]">
                {formatMoney(a.price_cents)}
              </span>
              <Button
                size="sm"
                onClick={() => setBilling(a)}
                className="h-9"
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
