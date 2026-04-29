"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type BarberOption = { id: string; name: string };

const PERIOD_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "Todo período" },
  { value: "7", label: "Últimos 7 dias" },
  { value: "30", label: "Últimos 30 dias" },
  { value: "90", label: "Últimos 90 dias" },
  { value: "365", label: "Últimos 12 meses" },
];

const RATING_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "Todas as notas" },
  { value: "5", label: "5 estrelas" },
  { value: "4", label: "4 estrelas" },
  { value: "3", label: "3 estrelas" },
  { value: "2", label: "2 estrelas" },
  { value: "1", label: "1 estrela" },
];

export function ReviewFilters({ barbers }: { barbers: BarberOption[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`);
    });
  }

  const baseSelect =
    "h-10 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-blue-500)] focus:ring-2 focus:ring-[var(--color-blue-100)] disabled:opacity-60";

  return (
    <div className="flex flex-wrap gap-2" data-pending={pending || undefined}>
      <select
        aria-label="Filtrar por barbeiro"
        className={baseSelect}
        defaultValue={params.get("barber") ?? "all"}
        onChange={(e) => setParam("barber", e.target.value)}
        disabled={pending}
      >
        <option value="all">Todos os barbeiros</option>
        {barbers.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
      <select
        aria-label="Filtrar por nota"
        className={baseSelect}
        defaultValue={params.get("rating") ?? "all"}
        onChange={(e) => setParam("rating", e.target.value)}
        disabled={pending}
      >
        {RATING_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Filtrar por período"
        className={baseSelect}
        defaultValue={params.get("period") ?? "all"}
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
