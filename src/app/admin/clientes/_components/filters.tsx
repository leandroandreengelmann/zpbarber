"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

type Shop = { id: string; name: string };

type Props = {
  shops: Shop[];
  defaultValues: { q: string; shop: string; status: string; sort: string };
};

export function ClientsFilters({ shops, defaultValues }: Props) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(defaultValues.q);

  function update(next: Record<string, string>) {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(next)) {
      if (v === "") params.delete(k);
      else params.set(k, v);
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/admin/clientes?${params.toString()}`);
    });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    update({ q });
  }

  function clear() {
    setQ("");
    startTransition(() => router.push("/admin/clientes"));
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center"
    >
      <div className="relative flex-1 sm:max-w-xs">
        <MagnifyingGlassIcon
          size={18}
          weight="duotone"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
        />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nome, telefone ou email"
          className="pl-9"
        />
      </div>

      <select
        value={defaultValues.shop}
        onChange={(e) => update({ shop: e.target.value })}
        className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm text-[var(--color-text-primary)]"
      >
        <option value="">Todas as barbearias</option>
        {shops.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <select
        value={defaultValues.status}
        onChange={(e) => update({ status: e.target.value })}
        className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm text-[var(--color-text-primary)]"
      >
        <option value="">Todos os status</option>
        <option value="with_account">Com conta</option>
        <option value="walk_in">Walk-in</option>
      </select>

      <select
        value={defaultValues.sort}
        onChange={(e) => update({ sort: e.target.value })}
        className="h-10 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm text-[var(--color-text-primary)]"
      >
        <option value="recent">Mais recentes</option>
        <option value="most_active">Mais ativos</option>
        <option value="top_spender">Maior ticket</option>
      </select>

      {(defaultValues.q ||
        defaultValues.shop ||
        defaultValues.status ||
        defaultValues.sort !== "recent") && (
        <button
          type="button"
          onClick={clear}
          className="inline-flex h-10 items-center gap-1.5 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
        >
          <XIcon size={14} weight="bold" />
          Limpar
        </button>
      )}

      {pending && (
        <span className="text-text-xs text-[var(--color-text-tertiary)]">
          Atualizando…
        </span>
      )}
    </form>
  );
}
