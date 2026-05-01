"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type ActionOption = { value: string; label: string };

const PERIOD_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "Todo período" },
  { value: "1", label: "Últimas 24h" },
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
];

export function ShopAuditFilters({ actions }: { actions: ActionOption[] }) {
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
        aria-label="Filtrar por ação"
        className={baseSelect}
        defaultValue={params.get("action") ?? "all"}
        onChange={(e) => setParam("action", e.target.value)}
        disabled={pending}
      >
        <option value="all">Todas as ações</option>
        {actions.map((a) => (
          <option key={a.value} value={a.value}>
            {a.label}
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
