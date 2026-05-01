"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import {
  cashMovementSchema,
  deleteCashMovementSchema,
  deleteExpenseCategorySchema,
  expenseCategorySchema,
  expenseCreateSchema,
  expenseDeleteSchema,
  expensePaySchema,
  expenseUnpaySchema,
  expenseUpdateSchema,
  receivableCreateSchema,
  receivableDeleteSchema,
  receivableReceiveSchema,
  receivableUnreceiveSchema,
  receivableUpdateSchema,
} from "@/lib/zod/financeiro";
import { isSessionExpired } from "@/lib/caixa/cutoff";

type State = { error?: string; ok?: boolean };

async function ctx() {
  const { user, membership } = await requireBarbershop();
  return {
    userId: user.id,
    shopId: membership.barbershop!.id,
    role: membership.role,
  };
}

function flatten(issues: { message: string }[]) {
  return issues.map((i) => i.message).join("; ");
}

function isoFromDate(date: string): string {
  return new Date(`${date}T12:00:00-03:00`).toISOString();
}

async function openCashSessionId(shopId: string): Promise<string | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("cash_sessions")
    .select("id")
    .eq("barbershop_id", shopId)
    .eq("status", "open")
    .maybeSingle();
  return data?.id ?? null;
}

async function openCashSessionRow(shopId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("cash_sessions")
    .select("id, opened_at")
    .eq("barbershop_id", shopId)
    .eq("status", "open")
    .maybeSingle();
  return data;
}

// ─────────────────────────────────────────────────────────────
// Categorias de despesa
// ─────────────────────────────────────────────────────────────

export async function saveExpenseCategoryAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor")
    return { error: "Apenas gestor pode gerenciar categorias." };
  const parsed = expenseCategorySchema.safeParse({
    id: fd.get("id") || undefined,
    name: fd.get("name") ?? "",
    color: fd.get("color") ?? "gray",
    is_active: fd.get("is_active") === "false" ? false : true,
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };

  const supabase = await createClient();
  const payload = {
    barbershop_id: c.shopId,
    name: parsed.data.name,
    color: parsed.data.color,
    is_active: parsed.data.is_active,
  };
  if (parsed.data.id) {
    const { error } = await supabase
      .from("expense_categories")
      .update(payload)
      .eq("id", parsed.data.id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from("expense_categories")
      .insert(payload);
    if (error) return { error: error.message };
  }
  revalidatePath("/app/financeiro/categorias");
  revalidatePath("/app/financeiro/a-pagar");
  return { ok: true };
}

export async function deleteExpenseCategoryAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor")
    return { error: "Apenas gestor pode excluir categorias." };
  const parsed = deleteExpenseCategorySchema.safeParse({
    id: fd.get("id") ?? "",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const supabase = await createClient();
  const { error } = await supabase
    .from("expense_categories")
    .delete()
    .eq("id", parsed.data.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/financeiro/categorias");
  revalidatePath("/app/financeiro/a-pagar");
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Despesas (a pagar / pagas)
// ─────────────────────────────────────────────────────────────

async function recordCashMovementForExpense(
  shopId: string,
  userId: string,
  expenseId: string,
  amount: number,
  description: string,
  paymentMethod: string,
  cashSessionId: string | null
) {
  if (paymentMethod !== "cash" || !cashSessionId) return;
  const supabase = await createClient();
  await supabase.from("cash_movements").insert({
    barbershop_id: shopId,
    cash_session_id: cashSessionId,
    type: "out",
    reason: "expense",
    amount_cents: amount,
    description,
    expense_id: expenseId,
    created_by: userId,
  });
}

export async function createExpenseAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role === "barbeiro")
    return { error: "Sem permissão para criar despesa." };
  const parsed = expenseCreateSchema.safeParse({
    category_id: fd.get("category_id") ?? "",
    description: fd.get("description") ?? "",
    amount_cents: fd.get("amount_cents") ?? 0,
    due_date: fd.get("due_date") ?? "",
    notes: fd.get("notes") ?? "",
    pay_now: fd.get("pay_now") === "on" || fd.get("pay_now") === "true",
    payment_method: (fd.get("payment_method") || undefined) as string | undefined,
    paid_at: (fd.get("paid_at") || undefined) as string | undefined,
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const d = parsed.data;
  if (d.pay_now && !d.payment_method)
    return { error: "Escolha o método de pagamento." };

  const sessionId = d.pay_now ? await openCashSessionId(c.shopId) : null;
  const supabase = await createClient();
  const { data: row, error } = await supabase
    .from("expenses")
    .insert({
      barbershop_id: c.shopId,
      category_id: d.category_id ?? null,
      description: d.description,
      amount_cents: d.amount_cents,
      due_date: d.due_date,
      notes: d.notes || null,
      paid_at: d.pay_now
        ? isoFromDate(d.paid_at ?? d.due_date)
        : null,
      payment_method: d.pay_now ? d.payment_method! : null,
      cash_session_id:
        d.pay_now && d.payment_method === "cash" ? sessionId : null,
      created_by: c.userId,
    })
    .select("id")
    .single();
  if (error || !row) return { error: error?.message ?? "Erro ao salvar." };

  if (d.pay_now && d.payment_method === "cash") {
    await recordCashMovementForExpense(
      c.shopId,
      c.userId,
      row.id,
      d.amount_cents,
      d.description,
      d.payment_method,
      sessionId
    );
  }
  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-pagar");
  revalidatePath("/app/caixa");
  return { ok: true };
}

export async function updateExpenseAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role === "barbeiro")
    return { error: "Sem permissão para editar despesa." };
  const parsed = expenseUpdateSchema.safeParse({
    id: fd.get("id") ?? "",
    category_id: fd.get("category_id") ?? "",
    description: fd.get("description") ?? "",
    amount_cents: fd.get("amount_cents") ?? 0,
    due_date: fd.get("due_date") ?? "",
    notes: fd.get("notes") ?? "",
    pay_now: false,
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const d = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .update({
      category_id: d.category_id ?? null,
      description: d.description,
      amount_cents: d.amount_cents,
      due_date: d.due_date,
      notes: d.notes || null,
    })
    .eq("id", d.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-pagar");
  return { ok: true };
}

export async function payExpenseAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role === "barbeiro")
    return { error: "Sem permissão para pagar despesa." };
  const parsed = expensePaySchema.safeParse({
    id: fd.get("id") ?? "",
    payment_method: fd.get("payment_method") ?? "",
    paid_at: fd.get("paid_at") ?? "",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const d = parsed.data;

  const supabase = await createClient();
  const { data: exp } = await supabase
    .from("expenses")
    .select("id, amount_cents, description, barbershop_id, paid_at")
    .eq("id", d.id)
    .maybeSingle();
  if (!exp) return { error: "Despesa não encontrada." };
  if (exp.barbershop_id !== c.shopId)
    return { error: "Despesa de outra barbearia." };
  if (exp.paid_at) return { error: "Despesa já paga." };

  const sessionId =
    d.payment_method === "cash" ? await openCashSessionId(c.shopId) : null;

  const { error } = await supabase
    .from("expenses")
    .update({
      paid_at: isoFromDate(d.paid_at),
      payment_method: d.payment_method,
      cash_session_id: d.payment_method === "cash" ? sessionId : null,
    })
    .eq("id", d.id);
  if (error) return { error: error.message };

  await recordCashMovementForExpense(
    c.shopId,
    c.userId,
    exp.id,
    exp.amount_cents,
    exp.description,
    d.payment_method,
    sessionId
  );

  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-pagar");
  revalidatePath("/app/caixa");
  return { ok: true };
}

export async function unpayExpenseAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor")
    return { error: "Apenas gestor pode reverter pagamento." };
  const parsed = expenseUnpaySchema.safeParse({ id: fd.get("id") ?? "" });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const supabase = await createClient();
  await supabase
    .from("cash_movements")
    .delete()
    .eq("expense_id", parsed.data.id);
  const { error } = await supabase
    .from("expenses")
    .update({
      paid_at: null,
      payment_method: null,
      cash_session_id: null,
    })
    .eq("id", parsed.data.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-pagar");
  revalidatePath("/app/caixa");
  return { ok: true };
}

export async function deleteExpenseAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor")
    return { error: "Apenas gestor pode excluir despesa." };
  const parsed = expenseDeleteSchema.safeParse({ id: fd.get("id") ?? "" });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const supabase = await createClient();
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", parsed.data.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-pagar");
  revalidatePath("/app/caixa");
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Recebíveis
// ─────────────────────────────────────────────────────────────

async function recordCashMovementForReceivable(
  shopId: string,
  userId: string,
  receivableId: string,
  amount: number,
  description: string,
  paymentMethod: string,
  cashSessionId: string | null
) {
  if (paymentMethod !== "cash" || !cashSessionId) return;
  const supabase = await createClient();
  await supabase.from("cash_movements").insert({
    barbershop_id: shopId,
    cash_session_id: cashSessionId,
    type: "in",
    reason: "receivable",
    amount_cents: amount,
    description,
    receivable_id: receivableId,
    created_by: userId,
  });
}

export async function createReceivableAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role === "barbeiro")
    return { error: "Sem permissão para criar recebível." };
  const parsed = receivableCreateSchema.safeParse({
    client_id: fd.get("client_id") ?? "",
    description: fd.get("description") ?? "",
    amount_cents: fd.get("amount_cents") ?? 0,
    due_date: fd.get("due_date") ?? "",
    notes: fd.get("notes") ?? "",
    receive_now:
      fd.get("receive_now") === "on" || fd.get("receive_now") === "true",
    payment_method: (fd.get("payment_method") || undefined) as string | undefined,
    received_at: (fd.get("received_at") || undefined) as string | undefined,
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const d = parsed.data;
  if (d.receive_now && !d.payment_method)
    return { error: "Escolha o método de pagamento." };

  const sessionId = d.receive_now ? await openCashSessionId(c.shopId) : null;
  const supabase = await createClient();
  const { data: row, error } = await supabase
    .from("receivables")
    .insert({
      barbershop_id: c.shopId,
      client_id: d.client_id ?? null,
      description: d.description,
      amount_cents: d.amount_cents,
      due_date: d.due_date,
      notes: d.notes || null,
      received_at: d.receive_now
        ? isoFromDate(d.received_at ?? d.due_date)
        : null,
      payment_method: d.receive_now ? d.payment_method! : null,
      cash_session_id:
        d.receive_now && d.payment_method === "cash" ? sessionId : null,
      created_by: c.userId,
    })
    .select("id")
    .single();
  if (error || !row) return { error: error?.message ?? "Erro ao salvar." };

  if (d.receive_now && d.payment_method === "cash") {
    await recordCashMovementForReceivable(
      c.shopId,
      c.userId,
      row.id,
      d.amount_cents,
      d.description,
      d.payment_method,
      sessionId
    );
  }
  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-receber");
  revalidatePath("/app/caixa");
  return { ok: true };
}

export async function updateReceivableAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role === "barbeiro")
    return { error: "Sem permissão para editar recebível." };
  const parsed = receivableUpdateSchema.safeParse({
    id: fd.get("id") ?? "",
    client_id: fd.get("client_id") ?? "",
    description: fd.get("description") ?? "",
    amount_cents: fd.get("amount_cents") ?? 0,
    due_date: fd.get("due_date") ?? "",
    notes: fd.get("notes") ?? "",
    receive_now: false,
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const d = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase
    .from("receivables")
    .update({
      client_id: d.client_id ?? null,
      description: d.description,
      amount_cents: d.amount_cents,
      due_date: d.due_date,
      notes: d.notes || null,
    })
    .eq("id", d.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-receber");
  return { ok: true };
}

export async function receiveReceivableAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role === "barbeiro")
    return { error: "Sem permissão para receber." };
  const parsed = receivableReceiveSchema.safeParse({
    id: fd.get("id") ?? "",
    payment_method: fd.get("payment_method") ?? "",
    received_at: fd.get("received_at") ?? "",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const d = parsed.data;

  const supabase = await createClient();
  const { data: rec } = await supabase
    .from("receivables")
    .select("id, amount_cents, description, barbershop_id, received_at")
    .eq("id", d.id)
    .maybeSingle();
  if (!rec) return { error: "Recebível não encontrado." };
  if (rec.barbershop_id !== c.shopId)
    return { error: "Recebível de outra barbearia." };
  if (rec.received_at) return { error: "Já recebido." };

  const sessionId =
    d.payment_method === "cash" ? await openCashSessionId(c.shopId) : null;

  const { error } = await supabase
    .from("receivables")
    .update({
      received_at: isoFromDate(d.received_at),
      payment_method: d.payment_method,
      cash_session_id: d.payment_method === "cash" ? sessionId : null,
    })
    .eq("id", d.id);
  if (error) return { error: error.message };

  await recordCashMovementForReceivable(
    c.shopId,
    c.userId,
    rec.id,
    rec.amount_cents,
    rec.description,
    d.payment_method,
    sessionId
  );

  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-receber");
  revalidatePath("/app/caixa");
  return { ok: true };
}

export async function unreceiveReceivableAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor")
    return { error: "Apenas gestor pode reverter recebimento." };
  const parsed = receivableUnreceiveSchema.safeParse({
    id: fd.get("id") ?? "",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const supabase = await createClient();
  await supabase
    .from("cash_movements")
    .delete()
    .eq("receivable_id", parsed.data.id);
  const { error } = await supabase
    .from("receivables")
    .update({
      received_at: null,
      payment_method: null,
      cash_session_id: null,
    })
    .eq("id", parsed.data.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-receber");
  revalidatePath("/app/caixa");
  return { ok: true };
}

export async function deleteReceivableAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor")
    return { error: "Apenas gestor pode excluir recebível." };
  const parsed = receivableDeleteSchema.safeParse({ id: fd.get("id") ?? "" });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const supabase = await createClient();
  const { error } = await supabase
    .from("receivables")
    .delete()
    .eq("id", parsed.data.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/financeiro");
  revalidatePath("/app/financeiro/a-receber");
  revalidatePath("/app/caixa");
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Movimentos de caixa (sangria/suprimento)
// ─────────────────────────────────────────────────────────────

export async function createCashMovementAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role === "barbeiro")
    return { error: "Sem permissão para movimentar caixa." };
  const parsed = cashMovementSchema.safeParse({
    type: fd.get("type") ?? "",
    amount_cents: fd.get("amount_cents") ?? 0,
    description: fd.get("description") ?? "",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const session = await openCashSessionRow(c.shopId);
  if (!session) return { error: "Abra o caixa antes de movimentar." };
  if (isSessionExpired(session.opened_at))
    return { error: "Caixa expirado — feche-o antes de continuar." };

  const d = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.from("cash_movements").insert({
    barbershop_id: c.shopId,
    cash_session_id: session.id,
    type: d.type,
    reason: d.type === "in" ? "supply" : "withdrawal",
    amount_cents: d.amount_cents,
    description: d.description || null,
    created_by: c.userId,
  });
  if (error) return { error: error.message };
  revalidatePath("/app/caixa");
  return { ok: true };
}

export async function deleteCashMovementAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor")
    return { error: "Apenas gestor pode excluir movimento." };
  const parsed = deleteCashMovementSchema.safeParse({
    id: fd.get("id") ?? "",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };
  const supabase = await createClient();
  const { error } = await supabase
    .from("cash_movements")
    .delete()
    .eq("id", parsed.data.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };
  revalidatePath("/app/caixa");
  return { ok: true };
}
