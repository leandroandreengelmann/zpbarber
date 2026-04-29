"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type ShopOption = { id: string; name: string; slug: string };

const PERIOD_OPTIONS = [
  { value: "all", label: "Todo período" },
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
  { value: "365", label: "Último ano" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "Todos os status" },
  { value: "pending", label: "Pendentes" },
  { value: "paid", label: "Pagas" },
  { value: "overdue", label: "Atrasadas" },
  { value: "refunded", label: "Estornadas" },
  { value: "cancelled", label: "Canceladas" },
];

export function BillingFilters({ shops }: { shops: ShopOption[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    next.delete("page");
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`);
    });
  }

  const baseSelect =
    "h-10 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-blue-500)] focus:ring-2 focus:ring-[var(--color-blue-100)] disabled:opacity-60";

  return (
    <div className="flex flex-wrap gap-2" data-pending={pending || undefined}>
      <select
        aria-label="Filtrar por barbearia"
        className={baseSelect}
        defaultValue={params.get("shop") ?? "all"}
        onChange={(e) => setParam("shop", e.target.value)}
        disabled={pending}
      >
        <option value="all">Todas as barbearias</option>
        {shops.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      <select
        aria-label="Filtrar por status"
        className={baseSelect}
        defaultValue={params.get("status") ?? "all"}
        onChange={(e) => setParam("status", e.target.value)}
        disabled={pending}
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Filtrar por período"
        className={baseSelect}
        defaultValue={params.get("period") ?? "30"}
        onChange={(e) => setParam("period", e.target.value)}
        disabled={pending}
      >
        {PERIOD_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
