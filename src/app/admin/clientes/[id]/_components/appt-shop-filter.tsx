"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Shop = { barbershop_id: string; shop_name: string };

export function ApptShopFilter({
  shops,
  selected,
}: {
  shops: Shop[];
  selected: string;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  function update(value: string) {
    const params = new URLSearchParams(sp.toString());
    if (value) params.set("shop", value);
    else params.delete("shop");
    params.delete("page");
    startTransition(() => router.push(`?${params.toString()}`));
  }

  if (shops.length <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <select
        value={selected}
        onChange={(e) => update(e.target.value)}
        className="h-9 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm text-[var(--color-text-primary)]"
      >
        <option value="">Todas as barbearias</option>
        {shops.map((s) => (
          <option key={s.barbershop_id} value={s.barbershop_id}>
            {s.shop_name}
          </option>
        ))}
      </select>
      {pending && (
        <span className="text-text-xs text-[var(--color-text-tertiary)]">
          Atualizando…
        </span>
      )}
    </div>
  );
}
