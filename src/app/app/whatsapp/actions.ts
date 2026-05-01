"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { requireBarbershop } from "@/lib/auth/guards";
import {
  createInstance,
  deleteInstance,
  fetchConnectionState,
  fetchInstance,
  fetchQRCode,
  isEvolutionConfigured,
  logoutInstance,
  normalizeBrazilNumber,
  sendText,
  setInstanceWebhook,
} from "@/lib/evolution/client";
import {
  sendManualMessageSchema,
  whatsappSettingsSchema,
  whatsappTemplateDeleteSchema,
  whatsappTemplateSchema,
  type WhatsappConnectionStatus,
} from "@/lib/zod/whatsapp";
import { logAudit } from "@/lib/audit/log";

type State = { error?: string; ok?: boolean; qr?: string };

async function ctx() {
  const { user, membership } = await requireBarbershop();
  return {
    userId: user.id,
    shopId: membership.barbershop!.id,
    shopSlug: membership.barbershop!.slug ?? null,
    role: membership.role,
  };
}

function flatten(issues: { message: string }[]) {
  return issues.map((i) => i.message).join("; ");
}

function instanceNameFor(shopId: string) {
  return `barberramos_${shopId.replace(/-/g, "")}`;
}

async function publicWebhookUrl(): Promise<string | null> {
  try {
    const h = await headers();
    const proto = h.get("x-forwarded-proto") ?? "https";
    const host = h.get("x-forwarded-host") ?? h.get("host");
    if (!host) return null;
    return `${proto}://${host}/api/whatsapp/webhook`;
  } catch {
    return null;
  }
}

function revalidateAll() {
  revalidatePath("/app/whatsapp");
  revalidatePath("/app/whatsapp/configuracoes");
  revalidatePath("/app/whatsapp/templates");
}

// ─────────────────────────────────────────────────────────────
// Conexão (instância Evolution)
// ─────────────────────────────────────────────────────────────

export async function connectInstanceAction(
  _prev: State,
  _fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor")
    return { error: "Apenas gestor pode conectar o WhatsApp." };
  if (!isEvolutionConfigured())
    return {
      error:
        "Servidor Evolution não configurado (defina EVOLUTION_BASE_URL e EVOLUTION_GLOBAL_KEY).",
    };

  const supabase = await createClient();
  const instanceName = instanceNameFor(c.shopId);
  const webhook = (await publicWebhookUrl()) ?? undefined;

  // Garante settings
  await supabase.from("whatsapp_settings").upsert(
    {
      barbershop_id: c.shopId,
      evolution_instance_name: instanceName,
      connection_status: "qr_pending",
      last_qr_at: new Date().toISOString(),
    },
    { onConflict: "barbershop_id" }
  );

  let qrBase64: string | undefined;
  let token: string | undefined;

  try {
    // tenta criar; se já existe, busca QR direto
    const created = await createInstance({ instanceName, webhookUrl: webhook });
    qrBase64 = created.qrcode?.base64;
    token =
      typeof created.hash === "string"
        ? created.hash
        : created.hash?.apikey ?? undefined;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!/already in use|exists/i.test(msg)) {
      await supabase
        .from("whatsapp_settings")
        .update({ connection_status: "error" })
        .eq("barbershop_id", c.shopId);
      return { error: msg };
    }
    // já existia: garante que o webhook está com o token atualizado e busca QR
    if (webhook) {
      try {
        await setInstanceWebhook({ instanceName, webhookUrl: webhook });
      } catch {}
    }
    try {
      const qr = await fetchQRCode(instanceName);
      qrBase64 = qr.base64;
    } catch (err2) {
      return {
        error: err2 instanceof Error ? err2.message : "Falha ao obter QR Code.",
      };
    }
  }

  await supabase
    .from("whatsapp_settings")
    .update({
      evolution_instance_name: instanceName,
      ...(token ? { evolution_instance_token: token } : {}),
      ...(qrBase64 ? { last_qr: qrBase64 } : {}),
      last_qr_at: new Date().toISOString(),
      connection_status: qrBase64 ? "qr_pending" : "connecting",
    })
    .eq("barbershop_id", c.shopId);

  await logAudit({
    action: "whatsapp.connect",
    barbershopId: c.shopId,
    resourceType: "whatsapp_settings",
    metadata: { instance_name: instanceName },
  });

  revalidateAll();
  return { ok: true, qr: qrBase64 };
}

export async function refreshConnectionStateAction(
  _prev: State,
  _fd: FormData
): Promise<State> {
  const c = await ctx();
  const supabase = await createClient();
  const { data: s } = await supabase
    .from("whatsapp_settings")
    .select("evolution_instance_name")
    .eq("barbershop_id", c.shopId)
    .maybeSingle();
  if (!s?.evolution_instance_name)
    return { error: "Nenhuma instância criada." };

  try {
    const info = await fetchInstance(s.evolution_instance_name);
    const state = info.instance?.state ?? "close";
    const isConnected = state === "open";
    const status: WhatsappConnectionStatus = isConnected
      ? "connected"
      : state === "qr"
        ? "qr_pending"
        : state === "connecting"
          ? "connecting"
          : "disconnected";
    const phone = info.instance?.owner
      ? info.instance.owner.split("@")[0]
      : null;

    await supabase
      .from("whatsapp_settings")
      .update({
        connection_status: status,
        ...(phone ? { phone_number: phone } : {}),
        ...(isConnected ? { last_connected_at: new Date().toISOString() } : {}),
      })
      .eq("barbershop_id", c.shopId);

    revalidateAll();
    return { ok: true };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Falha." };
  }
}

export async function disconnectInstanceAction(
  _prev: State,
  _fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor")
    return { error: "Apenas gestor pode desconectar." };
  const supabase = await createClient();
  const { data: s } = await supabase
    .from("whatsapp_settings")
    .select("evolution_instance_name")
    .eq("barbershop_id", c.shopId)
    .maybeSingle();
  if (!s?.evolution_instance_name)
    return { error: "Nenhuma instância para desconectar." };

  try {
    await logoutInstance(s.evolution_instance_name);
  } catch {}
  await supabase
    .from("whatsapp_settings")
    .update({
      connection_status: "disconnected",
      last_disconnected_at: new Date().toISOString(),
      last_qr: null,
    })
    .eq("barbershop_id", c.shopId);

  await logAudit({
    action: "whatsapp.disconnect",
    barbershopId: c.shopId,
    resourceType: "whatsapp_settings",
  });

  revalidateAll();
  return { ok: true };
}

export async function deleteInstanceAction(
  _prev: State,
  _fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor") return { error: "Apenas gestor." };
  const supabase = await createClient();
  const { data: s } = await supabase
    .from("whatsapp_settings")
    .select("evolution_instance_name")
    .eq("barbershop_id", c.shopId)
    .maybeSingle();
  if (s?.evolution_instance_name) {
    try {
      await deleteInstance(s.evolution_instance_name);
    } catch {}
  }
  await supabase
    .from("whatsapp_settings")
    .update({
      evolution_instance_name: null,
      evolution_instance_token: null,
      phone_number: null,
      connection_status: "disconnected",
      last_qr: null,
    })
    .eq("barbershop_id", c.shopId);
  revalidateAll();
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Configurações (toggles + horário)
// ─────────────────────────────────────────────────────────────

export async function saveSettingsAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor") return { error: "Apenas gestor." };

  const parsed = whatsappSettingsSchema.safeParse({
    trigger_confirmation: fd.get("trigger_confirmation") === "on",
    trigger_reminder: fd.get("trigger_reminder") === "on",
    trigger_reminder_hours_before: fd.get("trigger_reminder_hours_before") ?? 24,
    trigger_post_service: fd.get("trigger_post_service") === "on",
    trigger_post_service_delay_hours:
      fd.get("trigger_post_service_delay_hours") ?? 2,
    trigger_birthday: fd.get("trigger_birthday") === "on",
    trigger_birthday_hour: fd.get("trigger_birthday_hour") ?? 9,
    business_hours_start: fd.get("business_hours_start") ?? "08:00",
    business_hours_end: fd.get("business_hours_end") ?? "20:00",
    business_hours_only: fd.get("business_hours_only") === "on",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };

  const supabase = await createClient();
  const { error } = await supabase
    .from("whatsapp_settings")
    .upsert(
      { barbershop_id: c.shopId, ...parsed.data },
      { onConflict: "barbershop_id" }
    );
  if (error) return { error: error.message };

  await logAudit({
    action: "whatsapp.settings_update",
    barbershopId: c.shopId,
    resourceType: "whatsapp_settings",
  });

  revalidateAll();
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Templates
// ─────────────────────────────────────────────────────────────

export async function upsertTemplateAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor") return { error: "Apenas gestor." };

  const parsed = whatsappTemplateSchema.safeParse({
    id: fd.get("id") || undefined,
    slug: fd.get("slug") ?? "",
    trigger: fd.get("trigger") ?? "manual",
    name: fd.get("name") ?? "",
    body: fd.get("body") ?? "",
    is_active: fd.get("is_active") === "on" || fd.get("is_active") === "true",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };

  const supabase = await createClient();
  const payload = {
    barbershop_id: c.shopId,
    slug: parsed.data.slug,
    trigger: parsed.data.trigger,
    name: parsed.data.name,
    body: parsed.data.body,
    is_active: parsed.data.is_active,
  };

  if (parsed.data.id) {
    const { error } = await supabase
      .from("whatsapp_templates")
      .update(payload)
      .eq("id", parsed.data.id)
      .eq("barbershop_id", c.shopId);
    if (error) return { error: error.message };
    await logAudit({
      action: "whatsapp.template_update",
      barbershopId: c.shopId,
      resourceType: "whatsapp_template",
      resourceId: parsed.data.id,
      metadata: { trigger: parsed.data.trigger, slug: parsed.data.slug },
    });
  } else {
    const { error } = await supabase.from("whatsapp_templates").insert(payload);
    if (error) return { error: error.message };
    await logAudit({
      action: "whatsapp.template_create",
      barbershopId: c.shopId,
      resourceType: "whatsapp_template",
      metadata: { trigger: parsed.data.trigger, slug: parsed.data.slug },
    });
  }

  revalidateAll();
  return { ok: true };
}

export async function deleteTemplateAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  if (c.role !== "gestor") return { error: "Apenas gestor." };
  const parsed = whatsappTemplateDeleteSchema.safeParse({ id: fd.get("id") });
  if (!parsed.success) return { error: "id inválido" };
  const supabase = await createClient();
  const { error } = await supabase
    .from("whatsapp_templates")
    .delete()
    .eq("id", parsed.data.id)
    .eq("barbershop_id", c.shopId);
  if (error) return { error: error.message };

  await logAudit({
    action: "whatsapp.template_delete",
    barbershopId: c.shopId,
    resourceType: "whatsapp_template",
    resourceId: parsed.data.id,
  });

  revalidateAll();
  return { ok: true };
}

// ─────────────────────────────────────────────────────────────
// Envio manual (1 mensagem agora)
// ─────────────────────────────────────────────────────────────

export async function sendManualMessageAction(
  _prev: State,
  fd: FormData
): Promise<State> {
  const c = await ctx();
  const parsed = sendManualMessageSchema.safeParse({
    client_id: fd.get("client_id") || undefined,
    to_phone: fd.get("to_phone") || undefined,
    body: fd.get("body") ?? "",
  });
  if (!parsed.success) return { error: flatten(parsed.error.issues) };

  const supabase = await createClient();
  const { data: s } = await supabase
    .from("whatsapp_settings")
    .select("evolution_instance_name, connection_status")
    .eq("barbershop_id", c.shopId)
    .maybeSingle();
  if (!s || s.connection_status !== "connected")
    return { error: "WhatsApp não conectado." };

  let phone = parsed.data.to_phone ?? null;
  if (!phone && parsed.data.client_id) {
    const { data: cli } = await supabase
      .from("clients")
      .select("phone")
      .eq("id", parsed.data.client_id)
      .maybeSingle();
    phone = cli?.phone ?? null;
  }
  if (!phone) return { error: "Telefone não encontrado." };
  const number = normalizeBrazilNumber(phone);
  if (number.length < 10) return { error: "Telefone inválido." };

  const { data: msg, error } = await supabase
    .from("whatsapp_messages")
    .insert({
      barbershop_id: c.shopId,
      client_id: parsed.data.client_id ?? null,
      trigger: "manual",
      to_phone: number,
      body: parsed.data.body,
      status: "sending",
      scheduled_for: new Date().toISOString(),
      created_by: c.userId,
    })
    .select()
    .single();
  if (error || !msg) return { error: error?.message ?? "Falha." };

  try {
    const sent = await sendText({
      instanceName: s.evolution_instance_name!,
      number,
      text: parsed.data.body,
    });
    const provider_message_id = sent?.key?.id ?? sent?.messageId ?? null;
    await supabase
      .from("whatsapp_messages")
      .update({
        status: "sent",
        sent_at: new Date().toISOString(),
        provider_message_id,
        attempts: 1,
      })
      .eq("id", msg.id);
  } catch (err) {
    await supabase
      .from("whatsapp_messages")
      .update({
        status: "failed",
        failed_at: new Date().toISOString(),
        error: err instanceof Error ? err.message : String(err),
        attempts: 1,
      })
      .eq("id", msg.id);
    return { error: err instanceof Error ? err.message : "Falha no envio." };
  }

  await logAudit({
    action: "whatsapp.message_send_manual",
    barbershopId: c.shopId,
    resourceType: "whatsapp_message",
    resourceId: msg.id,
    metadata: { to_phone: number, client_id: parsed.data.client_id ?? null },
  });

  revalidateAll();
  return { ok: true };
}
