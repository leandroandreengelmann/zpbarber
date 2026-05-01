import "server-only";

export function safeNext(next: string | null | undefined, fallback: string): string {
  if (!next) return fallback;
  if (typeof next !== "string") return fallback;
  if (!next.startsWith("/")) return fallback;
  if (next.startsWith("//")) return fallback;
  if (next.startsWith("/\\")) return fallback;
  if (next.includes("\n") || next.includes("\r")) return fallback;
  return next;
}
