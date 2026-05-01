"use client";

import { useState } from "react";
import { EyeIcon, EyeSlashIcon, LockKeyIcon } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";

export function ClientPasswordInput() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <LockKeyIcon
        size={28}
        weight="duotone"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
      />
      <Input
        id="password"
        name="password"
        type={visible ? "text" : "password"}
        required
        autoComplete="current-password"
        className="h-11 pl-9 pr-10 text-text-md"
        placeholder="••••••••"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[var(--color-fg-quaternary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg-secondary)]"
      >
        {visible ? (
          <EyeSlashIcon size={20} weight="duotone" />
        ) : (
          <EyeIcon size={20} weight="duotone" />
        )}
      </button>
    </div>
  );
}
