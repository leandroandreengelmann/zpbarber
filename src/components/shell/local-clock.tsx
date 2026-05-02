"use client";

import { useEffect, useState } from "react";
import { ClockIcon } from "@phosphor-icons/react";

function formatLocal(tz: string): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: tz,
    }).format(new Date());
  } catch {
    return "";
  }
}

export function LocalClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState(() => formatLocal(timezone));

  useEffect(() => {
    setTime(formatLocal(timezone));
    const id = setInterval(() => setTime(formatLocal(timezone)), 30_000);
    return () => clearInterval(id);
  }, [timezone]);

  if (!time) return null;

  return (
    <span
      className="hidden items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium tabular-nums text-muted-foreground sm:inline-flex"
      title={`Horário local da barbearia (${timezone})`}
    >
      <ClockIcon size={14} weight="duotone" />
      {time}
    </span>
  );
}
