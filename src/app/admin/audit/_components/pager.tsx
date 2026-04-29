"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AuditPager({
  page,
  totalPages,
  total,
}: {
  page: number;
  totalPages: number;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  function goTo(p: number) {
    const next = new URLSearchParams(params.toString());
    if (p <= 1) next.delete("page");
    else next.set("page", String(p));
    startTransition(() => {
      router.replace(`${pathname}?${next.toString()}`);
    });
  }

  const disabledClass = "pointer-events-none opacity-50";

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-3"
      data-pending={pending || undefined}
    >
      <p className="text-text-sm text-[var(--color-text-tertiary)]">
        Página {page} de {totalPages} · {total.toLocaleString("pt-BR")} eventos
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            (page <= 1 || pending) && disabledClass
          )}
          onClick={() => goTo(page - 1)}
          disabled={page <= 1 || pending}
        >
          <ArrowLeftIcon size={20} weight="duotone" />
          Anterior
        </button>
        <button
          type="button"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            (page >= totalPages || pending) && disabledClass
          )}
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages || pending}
        >
          Próxima
          <ArrowRightIcon size={20} weight="duotone" />
        </button>
      </div>
    </div>
  );
}
