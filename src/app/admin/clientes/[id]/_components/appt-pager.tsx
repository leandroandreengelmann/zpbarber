"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

export function ApptPager({
  page,
  totalPages,
  total,
}: {
  page: number;
  totalPages: number;
  total: number;
}) {
  const sp = useSearchParams();

  function buildHref(p: number) {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(p));
    return `?${params.toString()}`;
  }

  const prev = page > 1 ? buildHref(page - 1) : null;
  const next = page < totalPages ? buildHref(page + 1) : null;

  return (
    <div className="flex items-center justify-between">
      <span className="text-text-sm text-[var(--color-text-tertiary)]">
        Página {page} de {totalPages} · {total} atendimentos
      </span>
      <div className="flex items-center gap-2">
        {prev ? (
          <Link
            href={prev}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
          >
            <CaretLeftIcon size={14} weight="bold" />
            Anterior
          </Link>
        ) : (
          <span className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-3 text-text-sm font-medium text-[var(--color-fg-quaternary)]">
            <CaretLeftIcon size={14} weight="bold" />
            Anterior
          </span>
        )}
        {next ? (
          <Link
            href={next}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
          >
            Próxima
            <CaretRightIcon size={14} weight="bold" />
          </Link>
        ) : (
          <span className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-3 text-text-sm font-medium text-[var(--color-fg-quaternary)]">
            Próxima
            <CaretRightIcon size={14} weight="bold" />
          </span>
        )}
      </div>
    </div>
  );
}
