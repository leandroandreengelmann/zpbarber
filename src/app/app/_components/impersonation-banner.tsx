"use client";

import { useTransition } from "react";
import { EyeIcon, SignOutIcon } from "@phosphor-icons/react";
import { exitBarbershopAction } from "@/app/admin/barbershops/actions";

export function ImpersonationBanner({ shopName }: { shopName: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-[var(--color-blue-300)] bg-[var(--color-blue-50)] px-4 py-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
      <div className="flex items-start gap-3 min-w-0">
        <EyeIcon
          size={24}
          weight="duotone"
          className="mt-0.5 shrink-0 text-[var(--color-blue-700)]"
        />
        <div className="grid gap-0.5 min-w-0">
          <p className="text-text-sm font-semibold text-[var(--color-blue-700)]">
            Modo administrador
          </p>
          <p className="line-clamp-2 text-text-xs text-[var(--color-text-tertiary)]">
            Você está visualizando &quot;{shopName}&quot; como super admin.
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          startTransition(async () => {
            await exitBarbershopAction();
          })
        }
        disabled={pending}
        className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-blue-600)] px-3 text-text-sm font-semibold text-white hover:bg-[var(--color-blue-700)] disabled:opacity-60 sm:h-9 sm:w-auto"
      >
        <SignOutIcon size={16} weight="bold" />
        Sair da barbearia
      </button>
    </div>
  );
}
