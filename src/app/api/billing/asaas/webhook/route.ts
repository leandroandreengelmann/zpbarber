import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { mapAsaasPaymentStatus } from "@/lib/asaas/client";
import type { Database } from "@/lib/database.types";

type InvoiceInsert = Database["public"]["Tables"]["invoices"]["Insert"];
type InvoiceUpdate = Database["public"]["Tables"]["invoices"]["Update"];

type AsaasWebhookEvent = {
  event: string;
  dateCreated?: string;
  payment?: {
    id: string;
    customer: string;
    subscription?: string;
    status: string;
    value: number;
    netValue?: number;
    dueDate: string;
    paymentDate?: string;
    invoiceUrl?: string;
    billingType?: string;
  };
};

export const dynamic = "force-dynamic";

function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(request: NextRequest) {
  const provided =
    request.headers.get("asaas-access-token") ??
    request.headers.get("Asaas-Access-Token") ??
    "";

  const supabase = createAdminClient();

  const { data: cfg, error: cfgErr } = await supabase
    .from("payment_gateway_settings")
    .select("webhook_token")
    .eq("id", 1)
    .maybeSingle();

  if (cfgErr || !cfg?.webhook_token) {
    return NextResponse.json(
      { error: "gateway not configured" },
      { status: 503 }
    );
  }

  if (!timingSafeEqualStrings(provided, cfg.webhook_token)) {
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }

  let body: AsaasWebhookEvent;
  try {
    body = (await request.json()) as AsaasWebhookEvent;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (!body.event || !body.payment) {
    return NextResponse.json({ ok: true, ignored: "no event payload" });
  }

  const p = body.payment;
  const dedupKey = `${body.event}:${p.id}`;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: dupErr } = await (supabase as any)
      .from("webhook_events_seen")
      .insert({ provider: "asaas", event_id: dedupKey });
    if (dupErr && (dupErr.code === "23505" || /duplicate/i.test(dupErr.message ?? ""))) {
      return NextResponse.json({ ok: true, ignored: "duplicate event" });
    }
  } catch {
    // tabela pode não existir ainda — segue (compat backwards até a migration ser aplicada)
  }
  const status = mapAsaasPaymentStatus(p.status);
  const nowIso = new Date().toISOString();

  let { data: invoice, error: findErr } = await supabase
    .from("invoices")
    .select("id, subscription_id, barbershop_id")
    .eq("asaas_payment_id", p.id)
    .maybeSingle();

  if (findErr) {
    return NextResponse.json({ error: findErr.message }, { status: 500 });
  }

  // Auto-cria invoice local se a subscription Asaas é conhecida
  if (!invoice && p.subscription) {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("id, barbershop_id")
      .eq("asaas_subscription_id", p.subscription)
      .maybeSingle();

    if (!sub) {
      return NextResponse.json({
        ok: true,
        ignored: "subscription not found locally",
      });
    }

    const insert: InvoiceInsert = {
      subscription_id: sub.id,
      barbershop_id: sub.barbershop_id,
      asaas_payment_id: p.id,
      amount_cents: Math.round((p.value ?? 0) * 100),
      status,
      due_date: p.dueDate,
      payment_method: p.billingType ?? null,
      invoice_url: p.invoiceUrl ?? null,
      paid_at:
        status === "paid" && p.paymentDate
          ? new Date(p.paymentDate).toISOString()
          : null,
      created_at: body.dateCreated ?? nowIso,
      updated_at: nowIso,
    };

    const { data: created, error: insErr } = await supabase
      .from("invoices")
      .insert(insert)
      .select("id, subscription_id, barbershop_id")
      .single();

    if (insErr) {
      // Se foi colisão de unique (asaas_payment_id), tenta releitura
      const { data: again } = await supabase
        .from("invoices")
        .select("id, subscription_id, barbershop_id")
        .eq("asaas_payment_id", p.id)
        .maybeSingle();
      if (!again) {
        return NextResponse.json({ error: insErr.message }, { status: 500 });
      }
      invoice = again;
    } else {
      invoice = created;
    }
  } else if (!invoice) {
    return NextResponse.json({
      ok: true,
      ignored: "invoice not found and no subscription in payload",
    });
  } else {
    // Atualiza a invoice já existente
    const update: InvoiceUpdate = {
      status,
      payment_method: p.billingType ?? null,
      invoice_url: p.invoiceUrl ?? null,
      updated_at: nowIso,
    };
    if (status === "paid" && p.paymentDate) {
      update.paid_at = new Date(p.paymentDate).toISOString();
    }
    const { error: updErr } = await supabase
      .from("invoices")
      .update(update)
      .eq("id", invoice.id);
    if (updErr) {
      return NextResponse.json({ error: updErr.message }, { status: 500 });
    }
  }

  // Reflete o estado de assinatura quando o pagamento confirma/atrasa
  if (status === "paid") {
    await supabase
      .from("subscriptions")
      .update({
        status: "active",
        updated_at: nowIso,
        current_period_start: nowIso,
      })
      .eq("id", invoice.subscription_id)
      .in("status", ["trialing", "past_due"]);
  } else if (status === "overdue") {
    await supabase
      .from("subscriptions")
      .update({ status: "past_due", updated_at: nowIso })
      .eq("id", invoice.subscription_id)
      .in("status", ["trialing", "active"]);
  }

  return NextResponse.json({
    ok: true,
    event: body.event,
    invoice_id: invoice.id,
    status,
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    note: "Asaas webhook endpoint — POST only.",
  });
}
