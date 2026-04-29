import "server-only";
import webpush from "web-push";
import { createAdminClient } from "@/lib/supabase/admin";

let configured = false;

function ensureConfigured() {
  if (configured) return true;
  const pub = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const priv = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT ?? "mailto:contato@barberramos.app";
  if (!pub || !priv) return false;
  webpush.setVapidDetails(subject, pub, priv);
  configured = true;
  return true;
}

type Payload = {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  icon?: string;
};

export async function sendPushToUser(userId: string, payload: Payload) {
  if (!ensureConfigured()) return { ok: false, reason: "no_vapid" as const };

  const admin = createAdminClient();
  const { data: subs, error } = await admin
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth")
    .eq("user_id", userId);

  if (error || !subs?.length) {
    return { ok: true, sent: 0, removed: 0 };
  }

  let sent = 0;
  let removed = 0;
  const stale: string[] = [];

  await Promise.all(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: s.endpoint,
            keys: { p256dh: s.p256dh, auth: s.auth },
          },
          JSON.stringify(payload)
        );
        sent++;
      } catch (err: unknown) {
        const status = (err as { statusCode?: number })?.statusCode;
        if (status === 404 || status === 410) stale.push(s.id);
      }
    })
  );

  if (stale.length) {
    await admin.from("push_subscriptions").delete().in("id", stale);
    removed = stale.length;
  }

  return { ok: true, sent, removed };
}

export async function sendPushToUsers(userIds: string[], payload: Payload) {
  const unique = Array.from(new Set(userIds.filter(Boolean)));
  const results = await Promise.all(
    unique.map((id) => sendPushToUser(id, payload))
  );
  return results;
}
