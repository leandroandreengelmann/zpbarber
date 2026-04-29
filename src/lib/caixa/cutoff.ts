const TZ = "America/Sao_Paulo";

export function computeCutoffAt(openedAt: string | Date): Date {
  const opened = new Date(openedAt);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(opened);
  const y = parts.find((p) => p.type === "year")!.value;
  const m = parts.find((p) => p.type === "month")!.value;
  const d = parts.find((p) => p.type === "day")!.value;
  const nextDay = new Date(`${y}-${m}-${d}T00:00:00-03:00`);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  return nextDay;
}

export function isSessionExpired(
  openedAt: string | Date,
  now: Date = new Date()
): boolean {
  return now.getTime() >= computeCutoffAt(openedAt).getTime();
}
