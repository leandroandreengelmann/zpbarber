// Cliente HTTP da API do Asaas (https://docs.asaas.com).
// Configuração é lida do banco (payment_gateway_settings) via getAsaasConfig().
// Gateway: PIX recorrente via assinaturas.

import {
  asaasBaseUrlFor,
  getAsaasConfig,
  requireAsaasConfig,
  type AsaasConfig,
  type AsaasEnvironment,
} from "@/lib/asaas/config";

type AsaasFetchInit = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | undefined>;
};

type AsaasCallContext = {
  apiKey: string;
  baseUrl: string;
};

async function callAsaas<T>(
  ctx: AsaasCallContext,
  path: string,
  init: AsaasFetchInit = {}
): Promise<T> {
  const url = new URL(`${ctx.baseUrl}${path}`);
  if (init.query) {
    for (const [k, v] of Object.entries(init.query)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url, {
    method: init.method ?? "GET",
    headers: {
      access_token: ctx.apiKey,
      "Content-Type": "application/json",
      "User-Agent": "barberramos/1.0",
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Asaas ${res.status}: ${text || res.statusText}`);
  }
  return text ? (JSON.parse(text) as T) : ({} as T);
}

async function withConfig<T>(
  fn: (ctx: AsaasCallContext) => Promise<T>
): Promise<T> {
  const cfg = await requireAsaasConfig();
  return fn({ apiKey: cfg.apiKey, baseUrl: cfg.baseUrl });
}

// ---------- Account / validation ----------

export type AsaasAccount = {
  name?: string;
  email?: string;
  apiVersion?: string;
  walletId?: string;
};

/**
 * Valida uma API key chamando /myAccount sem precisar gravar no banco.
 * Útil pro form de configurações.
 */
export async function validateAsaasKey(input: {
  apiKey: string;
  environment: AsaasEnvironment;
}): Promise<AsaasAccount> {
  return callAsaas<AsaasAccount>(
    { apiKey: input.apiKey, baseUrl: asaasBaseUrlFor(input.environment) },
    "/myAccount"
  );
}

export async function fetchAsaasAccount(): Promise<AsaasAccount> {
  return withConfig((ctx) => callAsaas<AsaasAccount>(ctx, "/myAccount"));
}

// ---------- Webhooks ----------

export type AsaasWebhook = {
  id: string;
  url: string;
  email?: string;
  enabled: boolean;
  apiVersion?: number;
  events: string[];
  authToken?: string;
  interrupted?: boolean;
  sendType?: "SEQUENTIALLY" | "NON_SEQUENTIALLY";
};

const DEFAULT_WEBHOOK_EVENTS = [
  "PAYMENT_CREATED",
  "PAYMENT_UPDATED",
  "PAYMENT_CONFIRMED",
  "PAYMENT_RECEIVED",
  "PAYMENT_OVERDUE",
  "PAYMENT_DELETED",
  "PAYMENT_REFUNDED",
  "PAYMENT_RECEIVED_IN_CASH_UNDONE",
];

export async function listAsaasWebhooks(input?: {
  apiKey?: string;
  environment?: AsaasEnvironment;
}): Promise<{ data: AsaasWebhook[] }> {
  const cfg = input?.apiKey && input.environment
    ? { apiKey: input.apiKey, baseUrl: asaasBaseUrlFor(input.environment) }
    : await requireAsaasConfig().then((c) => ({ apiKey: c.apiKey, baseUrl: c.baseUrl }));
  return callAsaas<{ data: AsaasWebhook[] }>(cfg, "/webhooks");
}

export async function createAsaasWebhook(input: {
  apiKey: string;
  environment: AsaasEnvironment;
  url: string;
  email?: string;
  authToken: string;
  events?: string[];
}): Promise<AsaasWebhook> {
  return callAsaas<AsaasWebhook>(
    { apiKey: input.apiKey, baseUrl: asaasBaseUrlFor(input.environment) },
    "/webhooks",
    {
      method: "POST",
      body: {
        name: "ZP Barber",
        url: input.url,
        email: input.email,
        sendType: "SEQUENTIALLY",
        enabled: true,
        interrupted: false,
        apiVersion: 3,
        authToken: input.authToken,
        events: input.events ?? DEFAULT_WEBHOOK_EVENTS,
      },
    }
  );
}

export async function updateAsaasWebhook(input: {
  apiKey: string;
  environment: AsaasEnvironment;
  id: string;
  url: string;
  authToken: string;
  events?: string[];
  email?: string;
}): Promise<AsaasWebhook> {
  return callAsaas<AsaasWebhook>(
    { apiKey: input.apiKey, baseUrl: asaasBaseUrlFor(input.environment) },
    `/webhooks/${input.id}`,
    {
      method: "PUT",
      body: {
        name: "ZP Barber",
        url: input.url,
        email: input.email,
        sendType: "SEQUENTIALLY",
        enabled: true,
        interrupted: false,
        apiVersion: 3,
        authToken: input.authToken,
        events: input.events ?? DEFAULT_WEBHOOK_EVENTS,
      },
    }
  );
}

export async function deleteAsaasWebhook(input: {
  apiKey: string;
  environment: AsaasEnvironment;
  id: string;
}): Promise<void> {
  await callAsaas(
    { apiKey: input.apiKey, baseUrl: asaasBaseUrlFor(input.environment) },
    `/webhooks/${input.id}`,
    { method: "DELETE" }
  );
}

// ---------- Customers ----------

export type AsaasCustomer = {
  id: string;
  name: string;
  email?: string;
  cpfCnpj?: string;
  mobilePhone?: string;
};

export async function createAsaasCustomer(input: {
  name: string;
  email?: string;
  cpfCnpj?: string;
  mobilePhone?: string;
  externalReference?: string;
}): Promise<AsaasCustomer> {
  return withConfig((ctx) =>
    callAsaas<AsaasCustomer>(ctx, "/customers", { method: "POST", body: input })
  );
}

// ---------- Subscriptions (cobrança recorrente PIX) ----------

export type AsaasSubscription = {
  id: string;
  customer: string;
  status: string;
  cycle: "MONTHLY" | "QUARTERLY" | "YEARLY";
  value: number;
  nextDueDate: string;
};

export async function createAsaasSubscription(input: {
  customer: string;
  value: number; // em reais (não centavos)
  nextDueDate: string; // YYYY-MM-DD
  cycle: "MONTHLY" | "QUARTERLY" | "YEARLY";
  description?: string;
  externalReference?: string;
}): Promise<AsaasSubscription> {
  return withConfig((ctx) =>
    callAsaas<AsaasSubscription>(ctx, "/subscriptions", {
      method: "POST",
      body: { ...input, billingType: "PIX" },
    })
  );
}

export async function cancelAsaasSubscription(id: string): Promise<void> {
  await withConfig((ctx) =>
    callAsaas(ctx, `/subscriptions/${id}`, { method: "DELETE" })
  );
}

// ---------- Payments (cobranças individuais geradas pela subscription) ----------

export type AsaasPayment = {
  id: string;
  customer: string;
  subscription?: string;
  status: string;
  value: number;
  netValue?: number;
  dueDate: string;
  paymentDate?: string;
  invoiceUrl?: string;
  bankSlipUrl?: string;
};

export async function getAsaasPayment(id: string): Promise<AsaasPayment> {
  return withConfig((ctx) => callAsaas<AsaasPayment>(ctx, `/payments/${id}`));
}

export async function listAsaasPaymentsBySubscription(
  subscriptionId: string,
  options?: { limit?: number }
): Promise<{ data: AsaasPayment[]; totalCount?: number }> {
  return withConfig((ctx) =>
    callAsaas<{ data: AsaasPayment[]; totalCount?: number }>(ctx, "/payments", {
      query: { subscription: subscriptionId, limit: options?.limit ?? 10 },
    })
  );
}

export type AsaasPixQrCode = {
  encodedImage: string; // base64 PNG
  payload: string; // copia-e-cola
  expirationDate?: string;
};

export async function getAsaasPaymentPixQrCode(id: string): Promise<AsaasPixQrCode> {
  return withConfig((ctx) =>
    callAsaas<AsaasPixQrCode>(ctx, `/payments/${id}/pixQrCode`)
  );
}

export function mapAsaasPaymentStatus(
  status: string
): "pending" | "paid" | "overdue" | "refunded" | "cancelled" {
  switch (status) {
    case "RECEIVED":
    case "CONFIRMED":
    case "RECEIVED_IN_CASH":
      return "paid";
    case "OVERDUE":
      return "overdue";
    case "REFUNDED":
    case "REFUND_REQUESTED":
      return "refunded";
    case "DELETED":
      return "cancelled";
    default:
      return "pending";
  }
}

export function mapPlanCycleToAsaas(
  cycle: "monthly" | "quarterly" | "yearly"
): "MONTHLY" | "QUARTERLY" | "YEARLY" {
  return cycle.toUpperCase() as "MONTHLY" | "QUARTERLY" | "YEARLY";
}

export type { AsaasConfig };
