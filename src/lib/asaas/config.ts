import { createClient } from "@/lib/supabase/server";

export type AsaasEnvironment = "sandbox" | "production";

export type AsaasConfig = {
  apiKey: string;
  baseUrl: string;
  environment: AsaasEnvironment;
  webhookToken: string | null;
  webhookId: string | null;
  webhookRegisteredAt: string | null;
  lastValidatedAt: string | null;
  accountName: string | null;
  accountEmail: string | null;
};

export type AsaasConfigStatus = {
  configured: boolean;
  environment: AsaasEnvironment;
  hasKey: boolean;
  webhookRegistered: boolean;
  accountName: string | null;
  accountEmail: string | null;
  lastValidatedAt: string | null;
};

export function asaasBaseUrlFor(environment: AsaasEnvironment): string {
  return environment === "production"
    ? "https://api.asaas.com/v3"
    : "https://sandbox.asaas.com/api/v3";
}

export async function getAsaasConfig(): Promise<AsaasConfig | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("payment_gateway_settings")
    .select(
      "asaas_api_key, environment, webhook_token, webhook_id, webhook_registered_at, last_validated_at, asaas_account_name, asaas_account_email"
    )
    .eq("id", 1)
    .maybeSingle();
  if (error || !data || !data.asaas_api_key) return null;
  return {
    apiKey: data.asaas_api_key,
    baseUrl: asaasBaseUrlFor(data.environment),
    environment: data.environment,
    webhookToken: data.webhook_token,
    webhookId: data.webhook_id,
    webhookRegisteredAt: data.webhook_registered_at,
    lastValidatedAt: data.last_validated_at,
    accountName: data.asaas_account_name,
    accountEmail: data.asaas_account_email,
  };
}

export async function requireAsaasConfig(): Promise<AsaasConfig> {
  const cfg = await getAsaasConfig();
  if (!cfg) {
    throw new Error(
      "Gateway de pagamento não configurado. Cole a API key do Asaas em /admin/settings."
    );
  }
  return cfg;
}

export async function getAsaasConfigStatus(): Promise<AsaasConfigStatus> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("payment_gateway_settings")
    .select(
      "environment, asaas_api_key, asaas_account_name, asaas_account_email, webhook_id, webhook_registered_at, last_validated_at"
    )
    .eq("id", 1)
    .maybeSingle();
  const env = (data?.environment ?? "sandbox") as AsaasEnvironment;
  const hasKey = !!data?.asaas_api_key;
  return {
    configured: hasKey,
    environment: env,
    hasKey,
    webhookRegistered: !!data?.webhook_id,
    accountName: data?.asaas_account_name ?? null,
    accountEmail: data?.asaas_account_email ?? null,
    lastValidatedAt: data?.last_validated_at ?? null,
  };
}
