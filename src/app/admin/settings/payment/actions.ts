"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireSuperAdmin } from "@/lib/auth/guards";
import {
  createAsaasWebhook,
  deleteAsaasWebhook,
  listAsaasWebhooks,
  updateAsaasWebhook,
  validateAsaasKey,
} from "@/lib/asaas/client";
import type { AsaasEnvironment } from "@/lib/asaas/config";
import { getAppBaseUrl } from "@/lib/platform-settings";
import { logAudit } from "@/lib/audit/log";

type State = { error?: string; ok?: boolean; warning?: string };

function newToken(): string {
  return randomBytes(24).toString("base64url");
}

function parseEnvironment(value: FormDataEntryValue | null): AsaasEnvironment {
  return value === "production" ? "production" : "sandbox";
}

export async function savePaymentGatewayAction(
  _prev: State,
  formData: FormData
): Promise<State> {
  const user = await requireSuperAdmin();
  const supabase = await createClient();

  const environment = parseEnvironment(formData.get("environment"));
  const rawKey = String(formData.get("asaas_api_key") ?? "").trim();
  const keepExisting = formData.get("keep_existing_key") === "1";

  const { data: existing } = await supabase
    .from("payment_gateway_settings")
    .select(
      "asaas_api_key, environment, webhook_id, webhook_token, asaas_account_name, asaas_account_email"
    )
    .eq("id", 1)
    .maybeSingle();

  const apiKey = rawKey || (keepExisting ? existing?.asaas_api_key ?? "" : "");
  if (!apiKey) return { error: "Cole a API key do Asaas." };

  // 1. Valida key contra Asaas /myAccount
  let account;
  try {
    account = await validateAsaasKey({ apiKey, environment });
  } catch (err) {
    return {
      error:
        err instanceof Error
          ? `Falha ao validar a API key: ${err.message}`
          : "Falha ao validar a API key.",
    };
  }

  // 2. Resolve URL pública e webhook token
  const baseUrl = await getAppBaseUrl();
  if (baseUrl.startsWith("http://localhost") || baseUrl.startsWith("http://127.")) {
    return {
      error:
        "Defina a URL pública do app em Configurações antes de configurar o gateway. O Asaas precisa de uma URL https acessível para enviar eventos.",
    };
  }
  const webhookUrl = `${baseUrl}/api/billing/asaas/webhook`;
  const webhookToken = existing?.webhook_token ?? newToken();

  // 3. Garante que existe um único webhook nosso registrado
  let webhookId = existing?.webhook_id ?? null;
  let webhookWarning: string | undefined;
  try {
    const list = await listAsaasWebhooks({ apiKey, environment });
    const ours = list.data?.find(
      (w) => w.url === webhookUrl || (webhookId && w.id === webhookId)
    );
    if (ours) {
      const updated = await updateAsaasWebhook({
        apiKey,
        environment,
        id: ours.id,
        url: webhookUrl,
        authToken: webhookToken,
      });
      webhookId = updated.id;
    } else {
      const created = await createAsaasWebhook({
        apiKey,
        environment,
        url: webhookUrl,
        authToken: webhookToken,
        email: account.email,
      });
      webhookId = created.id;
    }
  } catch (err) {
    webhookWarning =
      err instanceof Error
        ? `Key salva, mas não foi possível registrar o webhook automaticamente: ${err.message}`
        : "Key salva, mas não foi possível registrar o webhook automaticamente.";
  }

  // 4. Persiste no banco
  const nowIso = new Date().toISOString();
  const { error } = await supabase
    .from("payment_gateway_settings")
    .upsert(
      {
        id: 1,
        provider: "asaas",
        environment,
        asaas_api_key: apiKey,
        asaas_account_name: account.name ?? null,
        asaas_account_email: account.email ?? null,
        webhook_token: webhookToken,
        webhook_id: webhookId,
        webhook_registered_at: webhookId ? nowIso : null,
        last_validated_at: nowIso,
        updated_by: user.id,
        updated_at: nowIso,
      },
      { onConflict: "id" }
    );
  if (error) return { error: error.message };

  await logAudit({
    action: "platform_settings.update",
    resourceType: "payment_gateway_settings",
    resourceId: "1",
    metadata: {
      provider: "asaas",
      environment,
      account_email: account.email ?? null,
      webhook_registered: !!webhookId,
    },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/admin/settings/payment");
  return webhookWarning ? { ok: true, warning: webhookWarning } : { ok: true };
}

export async function disconnectPaymentGatewayAction(
  _prev: State
): Promise<State> {
  const user = await requireSuperAdmin();
  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("payment_gateway_settings")
    .select("asaas_api_key, environment, webhook_id")
    .eq("id", 1)
    .maybeSingle();

  if (existing?.webhook_id && existing.asaas_api_key) {
    try {
      await deleteAsaasWebhook({
        apiKey: existing.asaas_api_key,
        environment: existing.environment,
        id: existing.webhook_id,
      });
    } catch {
      // best effort — segue desconectando local mesmo se a chamada falhar
    }
  }

  const { error } = await supabase
    .from("payment_gateway_settings")
    .update({
      asaas_api_key: null,
      asaas_account_name: null,
      asaas_account_email: null,
      webhook_token: null,
      webhook_id: null,
      webhook_registered_at: null,
      last_validated_at: null,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
  if (error) return { error: error.message };

  await logAudit({
    action: "platform_settings.update",
    resourceType: "payment_gateway_settings",
    resourceId: "1",
    metadata: { disconnected: true },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/admin/settings/payment");
  return { ok: true };
}
