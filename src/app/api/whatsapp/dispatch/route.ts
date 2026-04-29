import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  isEvolutionConfigured,
  normalizeBrazilNumber,
  sendText,
} from "@/lib/evolution/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BATCH = 50;
const MAX_ATTEMPTS = 5;

function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET ?? "";
  if (!secret) return true; // dev sem secret
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
  if (!isEvolutionConfigured()) {
    return NextResponse.json(
      { error: "evolution not configured" },
      { status: 500 }
    );
  }

  const supabase = createAdminClient();
  const nowIso = new Date().toISOString();

  // pega lote pending dentro da janela
  const { data: msgs, error } = await supabase
    .from("whatsapp_messages")
    .select(
      "id, barbershop_id, to_phone, body, attempts, scheduled_for, status"
    )
    .eq("status", "pending")
    .lte("scheduled_for", nowIso)
    .order("scheduled_for", { ascending: true })
    .limit(MAX_BATCH);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  if (!msgs || msgs.length === 0) {
    return NextResponse.json({ processed: 0 });
  }

  // pega settings das barbearias envolvidas (1 query)
  const shopIds = Array.from(new Set(msgs.map((m) => m.barbershop_id)));
  const { data: settings } = await supabase
    .from("whatsapp_settings")
    .select(
      "barbershop_id, evolution_instance_name, connection_status, business_hours_start, business_hours_end, business_hours_only"
    )
    .in("barbershop_id", shopIds);
  const settingsMap = new Map(
    (settings ?? []).map((s) => [s.barbershop_id, s])
  );

  const results: Array<{ id: string; ok: boolean; reason?: string }> = [];

  for (const m of msgs) {
    const s = settingsMap.get(m.barbershop_id);
    if (!s || s.connection_status !== "connected" || !s.evolution_instance_name) {
      // pula sem incrementar tentativas (vai ficar pending até conectar)
      results.push({ id: m.id, ok: false, reason: "not_connected" });
      continue;
    }

    if (s.business_hours_only && !insideBusinessHours(s.business_hours_start, s.business_hours_end)) {
      // remarca para o início do horário comercial do dia atual/próximo
      const next = nextBusinessOpening(s.business_hours_start, s.business_hours_end);
      await supabase
        .from("whatsapp_messages")
        .update({ scheduled_for: next.toISOString() })
        .eq("id", m.id);
      results.push({ id: m.id, ok: false, reason: "outside_hours" });
      continue;
    }

    // marca como sending
    await supabase
      .from("whatsapp_messages")
      .update({ status: "sending", attempts: (m.attempts ?? 0) + 1 })
      .eq("id", m.id);

    try {
      const number = normalizeBrazilNumber(m.to_phone);
      const sent = await sendText({
        instanceName: s.evolution_instance_name,
        number,
        text: m.body,
      });
      const provider_message_id = sent?.key?.id ?? sent?.messageId ?? null;
      await supabase
        .from("whatsapp_messages")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
          provider_message_id,
        })
        .eq("id", m.id);
      results.push({ id: m.id, ok: true });
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : String(err);
      const attempts = (m.attempts ?? 0) + 1;
      const failed = attempts >= MAX_ATTEMPTS;
      await supabase
        .from("whatsapp_messages")
        .update({
          status: failed ? "failed" : "pending",
          failed_at: failed ? new Date().toISOString() : null,
          error: errMsg,
          // backoff linear: 5min * tentativas
          ...(failed
            ? {}
            : {
                scheduled_for: new Date(
                  Date.now() + attempts * 5 * 60_000
                ).toISOString(),
              }),
        })
        .eq("id", m.id);
      results.push({ id: m.id, ok: false, reason: errMsg });
    }
  }

  return NextResponse.json({
    processed: results.length,
    sent: results.filter((r) => r.ok).length,
    failed: results.filter((r) => !r.ok).length,
    results,
  });
}

function insideBusinessHours(start: string, end: string): boolean {
  const now = new Date();
  // hora local de São Paulo (sem TZ db; usa offset do runtime)
  const minsNow = now.getHours() * 60 + now.getMinutes();
  return minsNow >= toMins(start) && minsNow < toMins(end);
}

function toMins(s: string): number {
  const [h, m] = s.split(":").map((n) => Number(n));
  return h * 60 + (m ?? 0);
}

function nextBusinessOpening(start: string, end: string): Date {
  const now = new Date();
  const startMins = toMins(start);
  const minsNow = now.getHours() * 60 + now.getMinutes();
  const tgt = new Date(now);
  if (minsNow < startMins) {
    tgt.setHours(Math.floor(startMins / 60), startMins % 60, 0, 0);
  } else {
    tgt.setDate(tgt.getDate() + 1);
    tgt.setHours(Math.floor(startMins / 60), startMins % 60, 0, 0);
  }
  void end;
  return tgt;
}
