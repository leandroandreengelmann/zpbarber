"use client";

import { useTransition } from "react";
import { CheckCircleIcon, ProhibitIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function ToggleActiveForm({
  userId,
  isActive,
  onToggle,
}: {
  userId: string;
  isActive: boolean;
  onToggle: (userId: string, next: boolean) => Promise<void>;
}) {
  const [pending, start] = useTransition();
  return (
    <Button
      variant={isActive ? "outline" : "default"}
      size="sm"
      disabled={pending}
      onClick={() => start(() => onToggle(userId, !isActive))}
    >
      {isActive ? <ProhibitIcon size={28} weight="duotone" /> : <CheckCircleIcon size={28} weight="duotone" />}
      {isActive ? "Desativar" : "Ativar"}
    </Button>
  );
}
