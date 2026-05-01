import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { normalizePhone } from "@/lib/phone";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EvolutionEvent = {
  event?: string;
  instance?: string;
  data?: unknown;
};

function authorizedEvolution(req: Request): boolean {
  const secret = process.env.EVOLUTION_WEBHOOK_TOKEN ?? "";
  if (!secret) return process.env.NODE_ENV !== "production";
  const provided =
    req.headers.get("x-evolution-token") ??
    req.headers.get("X-Evolution-Token") ??
    "";
  if (provided.length !== secret.length) return false;
  let diff = 0;
  for (let i = 0; i < secret.length; i++) {
    diff |= secret.charCodeAt(i) ^ provided.charCodeAt(i);
  }
  return diff === 0;
}

export async function POST(req: Request) {
  if (!authorizedEvolution(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let payload: EvolutionEvent | null = null;
  try {
    payload = (await req.json()) as EvolutionEvent;
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (!payload?.event) return NextResponse.json({ ok: true });

  const supabase = createAdminClient();
  const event = payload.event.toLowerCase();
  const instanceName = payload.instance ?? "";

  try {
    switch (event) {
      case "qrcode.updated":
      case "qrcode_updated": {
        const data = payload.data as { qrcode?: { base64?: string } } | undefined;
        const qr = data?.qrcode?.base64;
        if (instanceName) {
          await supabase
            .from("whatsapp_settings")
            .update({
              connection_status: "qr_pending",
              ...(qr ? { last_qr: qr } : {}),
              last_qr_at: new Date().toISOString(),
            })
            .eq("evolution_instance_name", instanceName);
        }
        break;
      }
      case "connection.update":
      case "connection_update": {
        const data = payload.data as
          | { state?: string; statusReason?: number; wuid?: string }
          | undefined;
        const state = (data?.state ?? "").toLowerCase();
        const isOpen = state === "open";
        const isClose = state === "close";
        const phone = data?.wuid ? data.wuid.split("@")[0] : undefined;
        if (instanceName) {
          await supabase
            .from("whatsapp_settings")
            .update({
              connection_status: isOpen
                ? "connected"
                : isClose
                  ? "disconnected"
                  : (state as "connecting" | "qr_pending" | "error" | "disconnected"),
              ...(isOpen
                ? {
                    last_connected_at: new Date().toISOString(),
                    ...(phone ? { phone_number: phone } : {}),
                    last_qr: null,
                  }
                : {}),
              ...(isClose
                ? { last_disconnected_at: new Date().toISOString() }
                : {}),
            })
            .eq("evolution_instance_name", instanceName);
        }
        break;
      }
      case "messages.upsert":
      case "messages_upsert": {
        // Mensagens recebidas (cliente respondeu).
        // Detecta opt-out: PARAR / SAIR / STOP / CANCELAR.
        const data = payload.data as
          | {
              key?: { remoteJid?: string; fromMe?: boolean };
              message?: {
                conversation?: string;
                extendedTextMessage?: { text?: string };
              };
            }
          | undefined;
        if (data?.key?.fromMe) break;
        const text = (
          data?.message?.conversation ??
          data?.message?.extendedTextMessage?.text ??
          ""
        )
          .trim()
          .toUpperCase();
        const remoteJid = data?.key?.remoteJid ?? "";
        const phone = remoteJid.split("@")[0]?.replace(/\D/g, "") ?? "";
        const isOptOut = /^(PARAR|SAIR|STOP|UNSUBSCRIBE)$/.test(text);
        if (isOptOut && phone && instanceName) {
          const { data: shop } = await supabase
            .from("whatsapp_settings")
            .select("barbershop_id")
            .eq("evolution_instance_name", instanceName)
            .maybeSingle();
          if (shop?.barbershop_id) {
            const e164 = normalizePhone(phone) ?? normalizePhone(`+${phone}`);
            const last8 = phone.slice(-8);
            const last9 = phone.slice(-9);
            const candidates = Array.from(
              new Set([e164, `+${phone}`, phone, last9, last8].filter(Boolean) as string[])
            );
            await supabase
              .from("clients")
              .update({
                accepts_whatsapp: false,
                whatsapp_optout_at: new Date().toISOString(),
              })
              .eq("barbershop_id", shop.barbershop_id)
              .in("phone", candidates);
          }
        }
        break;
      }
      case "messages.update":
      case "messages_update":
      case "send.message":
      case "send_message": {
        const data = payload.data as
          | {
              key?: { id?: string };
              status?: string;
              messageId?: string;
              update?: { status?: string };
            }
          | undefined;
        const id = data?.key?.id ?? data?.messageId;
        const rawStatus = (data?.update?.status ?? data?.status ?? "").toString().toUpperCase();
        if (id && rawStatus) {
          const map: Record<string, "sent" | "delivered" | "read" | "failed"> = {
            SERVER_ACK: "sent",
            DELIVERY_ACK: "delivered",
            DELIVERED: "delivered",
            READ: "read",
            PLAYED: "read",
            ERROR: "failed",
            FAILED: "failed",
          };
          const next = map[rawStatus];
          if (next) {
            const updates: {
              status: "sent" | "delivered" | "read" | "failed";
              delivered_at?: string;
              read_at?: string;
              failed_at?: string;
            } = { status: next };
            if (next === "delivered") updates.delivered_at = new Date().toISOString();
            if (next === "read") updates.read_at = new Date().toISOString();
            if (next === "failed") updates.failed_at = new Date().toISOString();
            await supabase
              .from("whatsapp_messages")
              .update(updates)
              .eq("provider_message_id", id);
          }
        }
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error("[whatsapp webhook]", err);
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true });
}
