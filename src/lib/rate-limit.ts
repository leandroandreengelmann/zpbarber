import "server-only";
import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

export type RateLimitResult = { ok: boolean; remaining: number; resetAt: number };

export async function getClientIp(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const real = h.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

export async function checkRateLimit(
  key: string,
  max: number,
  windowSec: number
): Promise<RateLimitResult> {
  try {
    const admin = createAdminClient();
    type RateLimitRow = { allowed: boolean; remaining: number; reset_at: string };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (admin.rpc as any)("fn_rate_limit_check", {
      p_key: key,
      p_max: max,
      p_window_sec: windowSec,
    });
    if (error) {
      console.warn("[rate-limit] RPC error, allowing:", error.message);
      return { ok: true, remaining: max, resetAt: Date.now() + windowSec * 1000 };
    }
    const row = (Array.isArray(data) ? data[0] : data) as RateLimitRow | null;
    return {
      ok: !!row?.allowed,
      remaining: Number(row?.remaining ?? 0),
      resetAt: row?.reset_at ? new Date(row.reset_at).getTime() : Date.now() + windowSec * 1000,
    };
  } catch (err) {
    console.warn("[rate-limit] threw, allowing:", err);
    return { ok: true, remaining: max, resetAt: Date.now() + windowSec * 1000 };
  }
}
