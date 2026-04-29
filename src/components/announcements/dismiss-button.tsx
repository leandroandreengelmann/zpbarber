"use client";

import { useTransition } from "react";
import { XIcon } from "@phosphor-icons/react";
import { dismissAnnouncementAction } from "@/app/admin/announcements/actions";

export function DismissButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      aria-label="Dispensar"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await dismissAnnouncementAction(id);
        })
      }
      className="rounded-md p-1 text-[var(--color-fg-secondary)] hover:bg-[var(--color-bg-secondary_hover)] disabled:opacity-50"
    >
      <XIcon size={20} weight="bold" />
    </button>
  );
}
