"use client";

import { useEffect, useState } from "react";
import { BellRingingIcon, BellSlashIcon, BellIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { haptics } from "@/lib/haptics";

type Status = "loading" | "unsupported" | "denied" | "off" | "on";

function urlBase64ToUint8Array(base64: string): Uint8Array<ArrayBuffer> {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(b64);
  const buffer = new ArrayBuffer(raw.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return bytes;
}

export function NotificationsToggle({ vapidPublicKey }: { vapidPublicKey: string | null }) {
  const [status, setStatus] = useState<Status>("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!vapidPublicKey) {
      setStatus("unsupported");
      return;
    }
    if (typeof window === "undefined") return;
    if (
      !("serviceWorker" in navigator) ||
      !("PushManager" in window) ||
      !("Notification" in window)
    ) {
      setStatus("unsupported");
      return;
    }
    if (Notification.permission === "denied") {
      setStatus("denied");
      return;
    }
    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setStatus(sub ? "on" : "off"))
      .catch(() => setStatus("off"));
  }, [vapidPublicKey]);

  async function enable() {
    if (!vapidPublicKey) return;
    setBusy(true);
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        setStatus(perm === "denied" ? "denied" : "off");
        toast.error("Permissão negada para notificações");
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      });

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      if (!res.ok) throw new Error("subscribe_failed");

      haptics.success();
      setStatus("on");
      toast.success("Notificações ativadas");
    } catch {
      toast.error("Não foi possível ativar notificações");
      setStatus("off");
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      haptics.tap();
      setStatus("off");
      toast.success("Notificações desativadas");
    } catch {
      toast.error("Falha ao desativar");
    } finally {
      setBusy(false);
    }
  }

  if (status === "loading") return null;

  if (status === "unsupported") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-4 py-3">
        <BellSlashIcon size={24} weight="duotone" className="mt-0.5 shrink-0 text-[var(--color-fg-quaternary)]" />
        <div>
          <p className="text-text-sm font-medium text-[var(--color-text-primary)]">
            Notificações indisponíveis
          </p>
          <p className="text-text-xs text-[var(--color-text-tertiary)]">
            Seu navegador não suporta ou o sistema ainda não foi configurado.
            {!vapidPublicKey && " (chaves VAPID ausentes no servidor)"}
          </p>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-[var(--color-border-warning-subtle)] bg-[var(--color-warning-25)] px-4 py-3">
        <BellSlashIcon size={24} weight="duotone" className="mt-0.5 shrink-0 text-[var(--color-text-warning-primary)]" />
        <div>
          <p className="text-text-sm font-medium text-[var(--color-text-warning-primary)]">
            Permissão bloqueada
          </p>
          <p className="text-text-xs text-[var(--color-text-tertiary)]">
            Libere notificações para este site nas configurações do navegador.
          </p>
        </div>
      </div>
    );
  }

  const on = status === "on";
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-4 py-3">
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${
            on
              ? "bg-[var(--color-blue-50)] text-[var(--color-blue-600)]"
              : "bg-[var(--color-bg-secondary)] text-[var(--color-fg-quaternary)]"
          }`}
        >
          {on ? <BellRingingIcon size={20} weight="duotone" /> : <BellIcon size={20} weight="duotone" />}
        </div>
        <div>
          <p className="text-text-sm font-semibold text-[var(--color-text-primary)]">
            Notificações no aparelho
          </p>
          <p className="text-text-xs text-[var(--color-text-tertiary)]">
            Receba avisos de novos agendamentos mesmo com o app fechado.
          </p>
        </div>
      </div>
      <Switch
        checked={on}
        disabled={busy}
        onCheckedChange={(v) => (v ? enable() : disable())}
        aria-label={on ? "Desativar notificações" : "Ativar notificações"}
      />
    </div>
  );
}
