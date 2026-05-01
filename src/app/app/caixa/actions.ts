"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import {
  closeSessionSchema,
  createSaleSchema,
  openSessionSchema,
} from "@/lib/zod/caixa";
import { enqueueWhatsappMessage } from "@/lib/whatsapp/enqueue";
import { logAudit } from "@/lib/audit/log";
import { getAppBaseUrl } from "@/lib/platform-settings";
import { isSessionExpired } from "@/lib/caixa/cutoff";

type State = { error?: string; ok?: boolean; saleId?: string };

export type ClosingSummary = {
  shop: { name: string; slug: string };
  session: {
    id: string;
    opened_at: string;
    closed_at: string;
    opened_by: string;
    closed_by: string;
    opening_amount_cents: number;
    closing_amount_cents: number;
    expected_amount_cents: number;
    difference_cents: number;
    notes: string | null;
  };
  totals: {
    paid: number;
    by_method: Record<string, number>;
    movements_in: number;
    movements_out: number;
    expected_cash: number;
  };
  sales: Array<{
    id: string;
    created_at: string;
    total_cents: number;
    status: string;
    client_name: string;
    barber_name: string;
    methods: string;
  }>;
  movements: Array<{
    id: string;
    created_at: string;
    type: "in" | "out";
    reason: string;
    description: string;
    amount_cents: number;
    created_by: string;
  }>;
};

type CloseState = State & { summary?: ClosingSummary };

async function ctx() {
  const { user, membership } = await requireBarbershop();
  return { userId: user.id, shopId: membership.barbershop!.id, role: membership.role };
}

export async function openCashSessionAction(_prev: State, fd: FormData): Promise<State> {
  const c = await ctx();
  if (c.role === "barbeiro") return { error: "Apenas gestor/recepcionista pode abrir caixa." };
  const parsed = openSessionSchema.safeParse({
    opening_amount_cents: fd.get("opening_amount_cents") ?? 0,
  });
  if (!parsed.success) return { error: parsed.error.issues.map((i) => i.message).join("; ") };

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("cash_sessions")
    .select("id")
    .eq("barbershop_id", c.shopId)
    .eq("status", "open")
    .maybeSingle();
  if (existing) return { error: "Já existe um caixa aberto." };

  const { data: inserted, error } = await supabase
    .from("cash_sessions")
    .insert({
      barbershop_id: c.shopId,
      opened_by: c.userId,
      opening_amount_cents: parsed.data.opening_amount_cents,
    })
    .select("id")
    .maybeSingle();
  if (error) return { error: error.message };

  await logAudit({
    action: "cash_session.open",
    barbershopId: c.shopId,
    resourceType: "cash_session",
    resourceId: inserted?.id ?? null,
    metadata: { opening_amount_cents: parsed.data.opening_amount_cents },
  });

  revalidatePath("/app/caixa");
  return { ok: true };
}

export async function closeCashSessionAction(
  _prev: CloseState,
  fd: FormData
): Promise<CloseState> {
  const c = await ctx();
  if (c.role === "barbeiro") return { error: "Apenas gestor/recepcionista pode fechar caixa." };
  const parsed = closeSessionSchema.safeParse({
    session_id: fd.get("session_id") ?? "",
    closing_amount_cents: fd.get("closing_amount_cents") ?? 0,
    notes: fd.get("notes") ?? "",
  });
  if (!parsed.success) return { error: parsed.error.issues.map((i) => i.message).join("; ") };

  const supabase = await createClient();
  const { data: session, error: e1 } = await supabase
    .from("cash_sessions")
    .select("id, opening_amount_cents, status, barbershop_id, opened_at, opened_by")
    .eq("id", parsed.data.session_id)
    .maybeSingle();
  if (e1 || !session) return { error: "Sessão não encontrada." };
  if (session.status !== "open") return { error: "Sessão já fechada." };
  if (session.barbershop_id !== c.shopId) return { error: "Sessão de outra barbearia." };

  const { data: cashSum } = await supabase
    .from("sale_payments")
    .select("amount_cents, sales!inner(cash_session_id)")
    .eq("method", "cash")
    .eq("sales.cash_session_id", session.id);
  const cashTotal = (cashSum ?? []).reduce((s, p) => s + (p.amount_cents ?? 0), 0);
  const expected = (session.opening_amount_cents ?? 0) + cashTotal;
  const difference = parsed.data.closing_amount_cents - expected;
  const closedAt = new Date().toISOString();

  const { error } = await supabase
    .from("cash_sessions")
    .update({
      status: "closed",
      closed_by: c.userId,
      closed_at: closedAt,
      closing_amount_cents: parsed.data.closing_amount_cents,
      expected_amount_cents: expected,
      difference_cents: difference,
      notes: parsed.data.notes || null,
    })
    .eq("id", session.id);
  if (error) return { error: error.message };

  await logAudit({
    action: "cash_session.close",
    barbershopId: c.shopId,
    resourceType: "cash_session",
    resourceId: session.id,
    metadata: {
      closing_amount_cents: parsed.data.closing_amount_cents,
      expected_amount_cents: expected,
      difference_cents: difference,
    },
  });

  const summary = await buildClosingSummary(session.id);

  return { ok: true, summary: summary ?? undefined };
}

export async function buildClosingSummary(sessionId: string): Promise<ClosingSummary | null> {
  const supabase = await createClient();
  const { data: row } = await supabase
    .from("cash_sessions")
    .select(
      "id, opened_at, closed_at, opening_amount_cents, closing_amount_cents, expected_amount_cents, difference_cents, notes, barbershop_id, opened_by:profiles!cash_sessions_opened_by_fkey(full_name), closed_by:profiles!cash_sessions_closed_by_fkey(full_name), barbershop:barbershops(name, slug)"
    )
    .eq("id", sessionId)
    .maybeSingle();
  if (!row) return null;

  const sess = row as unknown as {
    id: string;
    opened_at: string;
    closed_at: string;
    opening_amount_cents: number;
    closing_amount_cents: number;
    expected_amount_cents: number;
    difference_cents: number;
    notes: string | null;
    barbershop_id: string;
    opened_by: { full_name: string | null } | null;
    closed_by: { full_name: string | null } | null;
    barbershop: { name: string; slug: string } | null;
  };

  const [salesRes, movementsRes] = await Promise.all([
    supabase
      .from("sales")
      .select(
        "id, created_at, total_cents, status, client:clients(full_name), barber:profiles!sales_barber_id_fkey(full_name), payments:sale_payments(method, amount_cents)"
      )
      .eq("cash_session_id", sessionId)
      .order("created_at", { ascending: true }),
    supabase
      .from("cash_movements")
      .select(
        "id, created_at, type, reason, amount_cents, description, created_by:profiles!cash_movements_created_by_fkey(full_name)"
      )
      .eq("cash_session_id", sessionId)
      .order("created_at", { ascending: true }),
  ]);

  type SaleRow = {
    id: string;
    created_at: string;
    total_cents: number;
    status: string;
    client: { full_name: string | null } | null;
    barber: { full_name: string | null } | null;
    payments: { method: string; amount_cents: number }[] | null;
  };
  type MovRow = {
    id: string;
    created_at: string;
    type: "in" | "out";
    reason: string;
    amount_cents: number;
    description: string | null;
    created_by: { full_name: string | null } | null;
  };

  const salesData = (salesRes.data ?? []) as unknown as SaleRow[];
  const movsData = (movementsRes.data ?? []) as unknown as MovRow[];

  const byMethod: Record<string, number> = {
    cash: 0,
    pix: 0,
    debit: 0,
    credit: 0,
    voucher: 0,
    other: 0,
  };
  let paid = 0;
  for (const s of salesData) {
    if (s.status !== "paid") continue;
    for (const p of s.payments ?? []) {
      byMethod[p.method] = (byMethod[p.method] ?? 0) + (p.amount_cents ?? 0);
      paid += p.amount_cents ?? 0;
    }
  }
  let movIn = 0;
  let movOut = 0;
  for (const m of movsData) {
    if (m.type === "in") movIn += m.amount_cents;
    else movOut += m.amount_cents;
  }
  const expectedCash =
    sess.opening_amount_cents + (byMethod.cash ?? 0) + movIn - movOut;

  const methodLabel: Record<string, string> = {
    cash: "Dinheiro",
    pix: "PIX",
    debit: "Débito",
    credit: "Crédito",
    voucher: "Voucher",
    other: "Outro",
  };
  const reasonLabel: Record<string, string> = {
    supply: "Suprimento",
    withdrawal: "Sangria",
    expense: "Despesa",
    receivable: "Recebimento",
    other: "Outro",
  };

  return {
    shop: {
      name: sess.barbershop?.name ?? "Barbearia",
      slug: sess.barbershop?.slug ?? "",
    },
    session: {
      id: sess.id,
      opened_at: sess.opened_at,
      closed_at: sess.closed_at,
      opened_by: sess.opened_by?.full_name ?? "—",
      closed_by: sess.closed_by?.full_name ?? "—",
      opening_amount_cents: sess.opening_amount_cents,
      closing_amount_cents: sess.closing_amount_cents,
      expected_amount_cents: sess.expected_amount_cents,
      difference_cents: sess.difference_cents,
      notes: sess.notes,
    },
    totals: {
      paid,
      by_method: byMethod,
      movements_in: movIn,
      movements_out: movOut,
      expected_cash: expectedCash,
    },
    sales: salesData.map((s) => ({
      id: s.id,
      created_at: s.created_at,
      total_cents: s.total_cents,
      status: s.status,
      client_name: s.client?.full_name ?? "Avulso",
      barber_name: s.barber?.full_name ?? "—",
      methods: (s.payments ?? [])
        .map((p) => methodLabel[p.method] ?? p.method)
        .join(" · "),
    })),
    movements: movsData.map((m) => ({
      id: m.id,
      created_at: m.created_at,
      type: m.type,
      reason: reasonLabel[m.reason] ?? m.reason,
      description: m.description ?? "",
      amount_cents: m.amount_cents,
      created_by: m.created_by?.full_name ?? "—",
    })),
  };
}

export async function createSaleAction(_prev: State, fd: FormData): Promise<State> {
  const c = await ctx();
  let payload: unknown;
  const raw = (fd.get("payload") as string) ?? "{}";
  if (raw.length > 64 * 1024) {
    return { error: "Payload muito grande." };
  }
  try {
    payload = JSON.parse(raw);
  } catch {
    return { error: "Payload inválido." };
  }
  const parsed = createSaleSchema.safeParse(payload);
  if (!parsed.success) return { error: parsed.error.issues.map((i) => i.message).join("; ") };

  const d = parsed.data;
  const supabase = await createClient();

  const { data: openSess } = await supabase
    .from("cash_sessions")
    .select("opened_at")
    .eq("barbershop_id", c.shopId)
    .eq("status", "open")
    .maybeSingle();
  if (openSess && isSessionExpired(openSess.opened_at))
    return { error: "Caixa expirado — feche-o antes de continuar." };

  let redemptionId: string | null = null;
  let redemptionDiscount = 0;
  if (d.redemption_code) {
    const { data: red } = await supabase
      .from("loyalty_redemptions")
      .select(
        "id, status, client_id, reward_type, reward_value, service_id, product_id"
      )
      .eq("barbershop_id", c.shopId)
      .eq("code", d.redemption_code)
      .maybeSingle();
    if (!red) return { error: "Código de resgate inválido." };
    if (red.status !== "pending")
      return { error: "Este resgate já foi usado ou cancelado." };
    if (d.client_id && red.client_id !== d.client_id)
      return { error: "Resgate é de outro cliente." };
    redemptionId = red.id;

    const subtotal = d.items.reduce((s, it) => s + it.quantity * it.unit_cents, 0);
    if (red.reward_type === "discount_amount") {
      redemptionDiscount = (red.reward_value ?? 0) * 100;
    } else if (red.reward_type === "discount_percent") {
      redemptionDiscount = Math.floor(subtotal * (red.reward_value ?? 0) / 100);
    } else if (red.reward_type === "free_service" && red.service_id) {
      const item = d.items.find((it) => it.service_id === red.service_id);
      if (!item)
        return {
          error: "Adicione o serviço da recompensa aos itens antes de aplicar.",
        };
      redemptionDiscount = item.unit_cents * item.quantity;
    } else if (red.reward_type === "free_product" && red.product_id) {
      const item = d.items.find((it) => it.product_id === red.product_id);
      if (!item)
        return {
          error: "Adicione o produto da recompensa aos itens antes de aplicar.",
        };
      redemptionDiscount = item.unit_cents * item.quantity;
    }
  }

  const totalDiscount = d.discount_cents + redemptionDiscount;
  const subtotal = d.items.reduce((s, it) => s + it.quantity * it.unit_cents, 0);
  const total = subtotal - totalDiscount;
  if (total < 0) return { error: "Desconto maior que o subtotal." };
  const paid = d.payments.reduce((s, p) => s + p.amount_cents, 0);
  if (paid !== total) return { error: `Pagamentos (${paid}) não batem com total (${total}).` };

  const { data, error } = await supabase.rpc("fn_create_sale", {
    _barbershop: c.shopId,
    _appointment: (d.appointment_id || null) as unknown as string,
    _client: (d.client_id || null) as unknown as string,
    _barber: (d.barber_id || null) as unknown as string,
    _discount_cents: totalDiscount,
    _notes: (d.notes || null) as unknown as string,
    _items: d.items.map((it) => ({
      service_id: it.service_id || "",
      product_id: it.product_id || "",
      description: it.description,
      quantity: it.quantity,
      unit_cents: it.unit_cents,
    })),
    _payments: d.payments.map((p) => ({
      method: p.method,
      amount_cents: p.amount_cents,
      paid_by_name: p.paid_by_name || "",
    })),
  });
  if (error) return { error: error.message };
  const saleId = data as unknown as string;

  await logAudit({
    action: "sale.create",
    barbershopId: c.shopId,
    resourceType: "sale",
    resourceId: saleId,
    metadata: {
      total_cents: total,
      discount_cents: totalDiscount,
      items: d.items.length,
      payments: d.payments.map((p) => ({ method: p.method, amount_cents: p.amount_cents })),
      client_id: d.client_id || null,
      barber_id: d.barber_id || null,
      appointment_id: d.appointment_id || null,
      redemption_code: d.redemption_code || null,
    },
  });

  if (redemptionId) {
    await supabase
      .from("loyalty_redemptions")
      .update({
        status: "used",
        used_at: new Date().toISOString(),
        sale_id: saleId,
      })
      .eq("id", redemptionId);
  }

  await supabase.rpc("fn_award_points_for_sale", { p_sale: saleId });

  // WhatsApp pós-atendimento
  if (d.client_id) {
    await dispatchPostServiceMessage({
      shopId: c.shopId,
      clientId: d.client_id,
      barberId: d.barber_id || null,
      appointmentId: d.appointment_id || null,
    });
  }

  revalidatePath("/app/caixa");
  revalidatePath("/app/agenda");
  revalidatePath("/app/fidelidade");
  if (d.client_id) revalidatePath(`/app/fidelidade/${d.client_id}`);
  return { ok: true, saleId };
}

async function dispatchPostServiceMessage(p: {
  shopId: string;
  clientId: string;
  barberId: string | null;
  appointmentId: string | null;
}) {
  try {
    const supabase = await createClient();
    const [shopRes, clientRes, barberRes, settingsRes] = await Promise.all([
      supabase.from("barbershops").select("name, slug").eq("id", p.shopId).maybeSingle(),
      supabase.from("clients").select("full_name").eq("id", p.clientId).maybeSingle(),
      p.barberId
        ? supabase.from("profiles").select("full_name").eq("id", p.barberId).maybeSingle()
        : Promise.resolve({ data: null }),
      supabase
        .from("whatsapp_settings")
        .select("trigger_post_service_delay_hours")
        .eq("barbershop_id", p.shopId)
        .maybeSingle(),
    ]);
    const delayHours = settingsRes.data?.trigger_post_service_delay_hours ?? 2;
    const scheduledFor = new Date(Date.now() + delayHours * 3600_000);
    const slug = shopRes.data?.slug ?? "";
    const appBase = await getAppBaseUrl();
    const linkAvaliacao =
      slug && p.appointmentId
        ? `${appBase}/${slug}/avaliar?a=${p.appointmentId}`
        : "";
    await enqueueWhatsappMessage({
      barbershopId: p.shopId,
      clientId: p.clientId,
      appointmentId: p.appointmentId,
      trigger: "post_service",
      templateSlug: "post_service",
      scheduledFor,
      vars: {
        cliente: clientRes.data?.full_name?.split(" ")[0] ?? "Cliente",
        barbeiro: barberRes.data?.full_name ?? "—",
        link_avaliacao: linkAvaliacao,
        barbearia: shopRes.data?.name ?? "Barbearia",
      },
    });
  } catch (err) {
    console.error("[whatsapp] dispatchPostServiceMessage:", err);
  }
}

export async function cancelSaleAction(saleId: string) {
  const c = await ctx();
  if (c.role !== "gestor") throw new Error("Apenas gestor pode cancelar venda.");
  const supabase = await createClient();
  const { error } = await supabase
    .from("sales")
    .update({ status: "cancelled" })
    .eq("id", saleId)
    .eq("barbershop_id", c.shopId);
  if (error) throw error;

  await logAudit({
    action: "sale.cancel",
    barbershopId: c.shopId,
    resourceType: "sale",
    resourceId: saleId,
  });

  revalidatePath("/app/caixa");
}
