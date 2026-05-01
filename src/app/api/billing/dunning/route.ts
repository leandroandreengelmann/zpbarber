import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET ?? "";
  if (!secret) return process.env.NODE_ENV !== "production";
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${secret}`;
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

async function handle(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase.rpc("fn_run_dunning");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const row = Array.isArray(data) ? data[0] : data;
  const suspendedCount = row?.suspended_count ?? 0;
  const ids: string[] = row?.suspended_subscription_ids ?? [];

  if (suspendedCount > 0) {
    const { data: subs } = await supabase
      .from("subscriptions")
      .select("id, barbershop_id")
      .in("id", ids);

    if (subs && subs.length > 0) {
      const rows = subs.map((s) => ({
        action: "subscription.suspend" as const,
        barbershop_id: s.barbershop_id,
        resource_type: "subscription",
        resource_id: s.id,
        metadata: { reason: "dunning_auto_suspend" },
      }));
      await supabase.from("audit_logs").insert(rows);
    }
  }

  return NextResponse.json({
    ok: true,
    suspended: suspendedCount,
    ids,
    ranAt: new Date().toISOString(),
  });
}
