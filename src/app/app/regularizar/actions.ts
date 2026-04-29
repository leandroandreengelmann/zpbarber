"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import {
  getAsaasPayment,
  getAsaasPaymentPixQrCode,
  mapAsaasPaymentStatus,
} from "@/lib/asaas/client";
import { requireAsaasConfig } from "@/lib/asaas/config";

type State = { error?: string; ok?: boolean };

export async function syncOpenInvoiceAction(
  invoiceId: string,
  _prev: State
): Promise<State> {
  const { membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;
  await requireAsaasConfig();

  const supabase = await createClient();
  const { data: inv } = await supabase
    .from("invoices")
    .select("id, asaas_payment_id, barbershop_id")
    .eq("id", invoiceId)
    .maybeSingle();

  if (!inv) return { error: "Invoice não encontrada." };
  if (inv.barbershop_id !== shopId) return { error: "Acesso negado." };
  if (!inv.asaas_payment_id) return { error: "Sem ID do Asaas." };

  try {
    const payment = await getAsaasPayment(inv.asaas_payment_id);
    const status = mapAsaasPaymentStatus(payment.status);
    await supabase
      .from("invoices")
      .update({
        status,
        invoice_url: payment.invoiceUrl ?? null,
        paid_at:
          status === "paid" && payment.paymentDate
            ? new Date(payment.paymentDate).toISOString()
            : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", inv.id);

    if (status === "paid") {
      const { data: sub } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("barbershop_id", shopId)
        .in("status", ["past_due", "trialing"])
        .maybeSingle();
      if (sub) {
        await supabase
          .from("subscriptions")
          .update({ status: "active", updated_at: new Date().toISOString() })
          .eq("id", sub.id);
      }
    }
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? `Falha no Asaas: ${err.message}`
          : "Falha no Asaas.",
    };
  }

  revalidatePath("/app/regularizar");
  revalidatePath("/app");
  return { ok: true };
}

export async function fetchOpenInvoicePixAction(
  invoiceId: string
): Promise<{ payload?: string; image?: string; error?: string }> {
  const { membership } = await requireBarbershop();
  const shopId = membership.barbershop!.id;

  const supabase = await createClient();
  const { data: inv } = await supabase
    .from("invoices")
    .select(
      "id, asaas_payment_id, barbershop_id, pix_qrcode_payload, pix_qrcode_image"
    )
    .eq("id", invoiceId)
    .maybeSingle();

  if (!inv) return { error: "Invoice não encontrada." };
  if (inv.barbershop_id !== shopId) return { error: "Acesso negado." };

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
