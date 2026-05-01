import "server-only";

const baseUrl = (process.env.EVOLUTION_BASE_URL ?? "").replace(/\/+$/, "");
const globalKey = process.env.EVOLUTION_GLOBAL_KEY ?? "";

function ensureConfigured() {
  if (!baseUrl || !globalKey) {
    throw new Error(
      "Evolution API não configurada. Defina EVOLUTION_BASE_URL e EVOLUTION_GLOBAL_KEY no .env.local"
    );
  }
}

type EvolutionInit = RequestInit & { useInstanceKey?: string };

async function call<T = unknown>(
  path: string,
  init: EvolutionInit = {}
): Promise<T> {
  ensureConfigured();
  const apikey = init.useInstanceKey ?? globalKey;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey,
    ...((init.headers as Record<string, string> | undefined) ?? {}),
  };
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  if (!res.ok) {
    let msg: string = `Evolution ${res.status}`;
    if (typeof data === "object" && data) {
      const d = data as {
        message?: unknown;
        error?: unknown;
        response?: { message?: unknown };
      };
      const raw =
        d.response?.message ?? d.message ?? d.error ?? null;
      if (Array.isArray(raw)) msg = raw.map(String).join("; ");
      else if (raw != null) msg = String(raw);
    } else if (typeof data === "string" && data) {
      msg = data;
    }
    throw new Error(`Evolution: ${msg}`);
  }
  return data as T;
}

export type EvolutionInstanceState =
  | "open"
  | "close"
  | "connecting"
  | "qr"
  | string;

export type CreateInstanceResponse = {
  instance: { instanceName: string; instanceId?: string; status?: string };
  hash?: { apikey?: string } | string;
  qrcode?: { base64?: string; code?: string; pairingCode?: string };
  webhook?: unknown;
};

export async function createInstance(params: {
  instanceName: string;
  webhookUrl?: string;
}): Promise<CreateInstanceResponse> {
  const webhookToken = process.env.EVOLUTION_WEBHOOK_TOKEN ?? "";
  return call<CreateInstanceResponse>("/instance/create", {
    method: "POST",
    body: JSON.stringify({
      instanceName: params.instanceName,
      qrcode: true,
      integration: "WHATSAPP-BAILEYS",
      ...(params.webhookUrl
        ? {
            webhook: {
              url: params.webhookUrl,
              byEvents: false,
              base64: false,
              events: [
                "QRCODE_UPDATED",
                "CONNECTION_UPDATE",
                "MESSAGES_UPSERT",
                "MESSAGES_UPDATE",
                "SEND_MESSAGE",
              ],
              ...(webhookToken
                ? { headers: { "x-evolution-token": webhookToken } }
                : {}),
            },
          }
        : {}),
    }),
  });
}

export async function setInstanceWebhook(params: {
  instanceName: string;
  webhookUrl: string;
}): Promise<void> {
  const webhookToken = process.env.EVOLUTION_WEBHOOK_TOKEN ?? "";
  await call(`/webhook/set/${encodeURIComponent(params.instanceName)}`, {
    method: "POST",
    body: JSON.stringify({
      webhook: {
        enabled: true,
        url: params.webhookUrl,
        byEvents: false,
        base64: false,
        events: [
          "QRCODE_UPDATED",
          "CONNECTION_UPDATE",
          "MESSAGES_UPSERT",
          "MESSAGES_UPDATE",
          "SEND_MESSAGE",
        ],
        ...(webhookToken
          ? { headers: { "x-evolution-token": webhookToken } }
          : {}),
      },
    }),
  });
}

export async function fetchQRCode(instanceName: string): Promise<{
  base64?: string;
  code?: string;
  pairingCode?: string;
}> {
  const data = await call<{
    base64?: string;
    code?: string;
    pairingCode?: string;
  }>(`/instance/connect/${encodeURIComponent(instanceName)}`, {
    method: "GET",
  });
  return data ?? {};
}

export async function fetchConnectionState(
  instanceName: string
): Promise<{ state?: EvolutionInstanceState }> {
  const data = await call<{ instance?: { state?: EvolutionInstanceState } }>(
    `/instance/connectionState/${encodeURIComponent(instanceName)}`,
    { method: "GET" }
  );
  return { state: data?.instance?.state };
}

export async function fetchInstance(instanceName: string): Promise<{
  instance?: {
    instanceName?: string;
    state?: EvolutionInstanceState;
    profileName?: string;
    profilePictureUrl?: string;
    owner?: string;
  };
}> {
  const data = await call<unknown>(
    `/instance/fetchInstances?instanceName=${encodeURIComponent(instanceName)}`,
    { method: "GET" }
  );
  // a v2 retorna array
  if (Array.isArray(data) && data.length > 0) {
    const it = data[0] as {
      instance?: Record<string, unknown>;
      name?: string;
      connectionStatus?: string;
      ownerJid?: string;
      profileName?: string;
    };
    return {
      instance: {
        instanceName: (it.instance?.instanceName as string) ?? it.name,
        state: (it.connectionStatus as EvolutionInstanceState) ?? undefined,
        owner: it.ownerJid,
        profileName: it.profileName,
      },
    };
  }
  return (data ?? {}) as {
    instance?: { state?: EvolutionInstanceState };
  };
}

export async function logoutInstance(instanceName: string): Promise<void> {
  await call(`/instance/logout/${encodeURIComponent(instanceName)}`, {
    method: "DELETE",
  });
}

export async function deleteInstance(instanceName: string): Promise<void> {
  await call(`/instance/delete/${encodeURIComponent(instanceName)}`, {
    method: "DELETE",
  });
}

export async function sendText(params: {
  instanceName: string;
  number: string;
  text: string;
  instanceKey?: string;
}): Promise<{ key?: { id?: string }; messageId?: string; status?: string }> {
  const number = onlyDigits(params.number);
  return call(`/message/sendText/${encodeURIComponent(params.instanceName)}`, {
    method: "POST",
    useInstanceKey: params.instanceKey,
    body: JSON.stringify({
      number,
      text: params.text,
    }),
  });
}

function onlyDigits(s: string) {
  return (s ?? "").replace(/\D+/g, "");
}

export function normalizeBrazilNumber(raw: string): string {
  const d = onlyDigits(raw);
  if (!d) return "";
  if (d.startsWith("55")) return d;
  if (d.length === 10 || d.length === 11) return `55${d}`;
  return d;
}

export function isEvolutionConfigured() {
  return !!(baseUrl && globalKey);
}
