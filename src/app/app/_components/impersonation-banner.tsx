"use client";

import { useTransition } from "react";
import { EyeIcon, SignOutIcon } from "@phosphor-icons/react";
import { exitBarbershopAction } from "@/app/admin/barbershops/actions";

export function ImpersonationBanner({ shopName }: { shopName: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3 rounded-xl border border-[var(--color-blue-300)] bg-[var(--color-blue-50)] px-4 py-3">
      <div className="flex items-start gap-3">
        <EyeIcon
          size={28}
          weight="duotone"
          className="mt-0.5 shrink-0 text-[var(--color-blue-700)]"
        />
        <div className="grid gap-0.5">
          <p className="text-text-sm font-semibold text-[var(--color-blue-700)]">
            Modo administrador
          </p>
          <p className="text-text-xs text-[var(--color-text-tertiary)]">
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
        className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--color-blue-600)] px-3 text-text-sm font-semibold text-white hover:bg-[var(--color-blue-700)] disabled:opacity-60"
      >
        <SignOutIcon size={16} weight="bold" />
        Sair da barbearia
      </button>
    </div>
  );
}
