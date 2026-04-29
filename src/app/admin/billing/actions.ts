"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireSuperAdmin } from "@/lib/auth/guards";
import {
  getAsaasPayment,
  getAsaasPaymentPixQrCode,
  listAsaasPaymentsBySubscription,
  mapAsaasPaymentStatus,
} from "@/lib/asaas/client";
import { logAudit } from "@/lib/audit/log";

type State = { error?: string; ok?: boolean };

export async function refreshInvoiceFromAsaasAction(
  invoiceId: string,
  _prev: State
): Promise<State> {
  await requireSuperAdmin();
  const supabase = await createClient();

  const { data: inv } = await supabase
    .from("invoices")
    .select("id, asaas_payment_id, subscription_id")
    .eq("id", invoiceId)
    .maybeSingle();

  if (!inv) return { error: "Invoice não encontrada." };
  if (!inv.asaas_payment_id) return { error: "Sem ID do Asaas — não dá pra sincronizar." };

  let payment;
  try {
    payment = await getAsaasPayment(inv.asaas_payment_id);
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? `Falha no Asaas: ${err.message}`
          : "Falha ao consultar o Asaas.",
    };
  }

  const status = mapAsaasPaymentStatus(payment.status);
  const update = {
    status,
    payment_method: payment.invoiceUrl ? "PIX" : null,
    invoice_url: payment.invoiceUrl ?? null,
    paid_at:
      status === "paid" && payment.paymentDate
        ? new Date(payment.paymentDate).toISOString()
        : null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("invoices").update(update).eq("id", inv.id);
  if (error) return { error: error.message };

  revalidatePath("/admin/billing");
  return { ok: true };
}

export async function fetchInvoicePixQrAction(
  invoiceId: string
): Promise<{ payload?: string; image?: string; error?: string }> {
  await requireSuperAdmin();
  const supabase = await createClient();

  const { data: inv } = await supabase
    .from("invoices")
    .select("id, asaas_payment_id, pix_qrcode_payload, pix_qrcode_image")
    .eq("id", invoiceId)
    .maybeSingle();

  if (!inv) return { error: "Invoice não encontrada." };

  if (inv.pix_qrcode_payload && inv.pix_qrcode_image) {
    return { payload: inv.pix_qrcode_payload, image: inv.pix_qrcode_image };
  }
  if (!inv.asaas_payment_id) return { error: "Sem ID do Asaas." };

  try {
    const qr = await getAsaasPaymentPixQrCode(inv.asaas_payment_id);
    await supabase
      .from("invoices")
      .update({
        pix_qrcode_payload: qr.payload,
        pix_qrcode_image: qr.encodedImage,
        updated_at: new Date().toISOString(),
      })
      .eq("id", inv.id);
    return { payload: qr.payload, image: qr.encodedImage };
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? `Falha no Asaas: ${err.message}`
          : "Falha ao buscar PIX.",
    };
  }
}

/**
 * Puxa todas as cobranças geradas pela Asaas para subscriptions ativas e cria
 * as invoices locais que ainda não existem. Útil pra primeira cobrança após
 * assinar um plano (caso o webhook não tenha entregado ainda).
 */
export async function backfillInvoicesFromAsaasAction(
  _prev: { error?: string; ok?: boolean; created?: number }
): Promise<{ error?: string; ok?: boolean; created?: number }> {
  await requireSuperAdmin();
  const supabase = await createClient();

  const { data: subs, error } = await supabase
    .from("subscriptions")
    .select("id, barbershop_id, asaas_subscription_id")
    .in("status", ["trialing", "active", "past_due"])
    .not("asaas_subscription_id", "is", null);

  if (error) return { error: error.message };
  if (!subs || subs.length === 0) {
    return { ok: true, created: 0 };
  }

  let created = 0;
  for (const sub of subs) {
    if (!sub.asaas_subscription_id) continue;
    try {
      const res = await listAsaasPaymentsBySubscription(sub.asaas_subscription_id, {
        limit: 20,
      });
      const rows = (res.data ?? []).map((p) => ({
        subscription_id: sub.id,
        barbershop_id: sub.barbershop_id,
        asaas_payment_id: p.id,
        amount_cents: Math.round((p.value ?? 0) * 100),
        status: mapAsaasPaymentStatus(p.status),
        due_date: p.dueDate,
        invoice_url: p.invoiceUrl ?? null,
        paid_at:
          mapAsaasPaymentStatus(p.status) === "paid" && p.paymentDate
            ? new Date(p.paymentDate).toISOString()
            : null,
      }));
      if (rows.length > 0) {
        const { count, error: upErr } = await supabase
          .from("invoices")
          .upsert(rows, {
            onConflict: "asaas_payment_id",
            ignoreDuplicates: false,
            count: "exact",
          });
        if (upErr) console.warn("[billing backfill]", sub.id, upErr.message);
        else created += count ?? 0;
      }
    } catch (err) {
      console.warn(
        "[billing backfill]",
        sub.id,
        err instanceof Error ? err.message : err
      );
    }
  }

  revalidatePath("/admin/billing");
  return { ok: true, created };
}

export async function markInvoicePaidInCashAction(
  invoiceId: string,
  _prev: State
): Promise<State> {
  await requireSuperAdmin();
  const supabase = await createClient();
  const { data: inv } = await supabase
    .from("invoices")
    .select("id, status, subscription_id, barbershop_id")
    .eq("id", invoiceId)
    .maybeSingle();
  if (!inv) return { error: "Invoice não encontrada." };
  if (inv.status === "paid") return { error: "Já está paga." };

  const nowIso = new Date().toISOString();
  const { error } = await supabase
    .from("invoices")
    .update({
      status: "paid",
      payment_method: "CASH",
      paid_at: nowIso,
      updated_at: nowIso,
    })
    .eq("id", inv.id);
  if (error) return { error: error.message };

  await supabase
    .from("subscriptions")
    .update({ status: "active", updated_at: nowIso })
    .eq("id", inv.subscription_id)
    .in("status", ["trialing", "past_due"]);

  await logAudit({
    action: "platform_settings.update",
    barbershopId: inv.barbershop_id,
    resourceType: "invoice",
    resourceId: inv.id,
    metadata: { marked_paid_in_cash: true },
  });

  revalidatePath("/admin/billing");
  return { ok: true };
}
