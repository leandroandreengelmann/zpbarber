"use client";

import { useEffect, useState } from "react";
import {
  DeviceMobileIcon,
  DownloadSimpleIcon,
  ShareNetworkIcon,
  XIcon,
} from "@phosphor-icons/react";
import { haptics } from "@/lib/haptics";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const STORAGE_KEY = "br_install_prompt_dismissed_at";
const SUPPRESS_DAYS = 14;

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari standalone flag
    (window.navigator as unknown as { standalone?: boolean }).standalone === true
  );
}

function isIOS() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !("MSStream" in window);
}

function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

function suppressed() {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (!v) return false;
    const at = Number(v);
    if (!Number.isFinite(at)) return false;
    return Date.now() - at < SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function InstallPrompt() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if (isStandalone() || suppressed() || !isMobileViewport()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iOS não dispara beforeinstallprompt — mostrar dica manual
    if (isIOS()) {
      const t = window.setTimeout(() => {
        setIosHint(true);
        setShow(true);
      }, 4000);
      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
        window.clearTimeout(t);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!show) return null;

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
    setShow(false);
  }

  async function install() {
    if (!event) return;
    haptics.tap();
    await event.prompt();
    const choice = await event.userChoice;
    if (choice.outcome === "accepted") haptics.success();
    if (choice.outcome !== "dismissed") {
      try {
        localStorage.setItem(STORAGE_KEY, String(Date.now()));
      } catch {}
    }
    setShow(false);
    setEvent(null);
  }

  return (
    <div
      className="fixed inset-x-3 z-50 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4 shadow-[0_8px_24px_rgb(10_13_18_/_0.12)] md:hidden"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 12px)" }}
      role="dialog"
      aria-label="Instalar ZP Barber"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-blue-50)] text-[var(--color-blue-600)]">
          <DeviceMobileIcon size={24} weight="duotone" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-text-sm font-semibold text-[var(--color-text-primary)]">
            Instalar ZP Barber
          </p>
          {iosHint ? (
            <p className="mt-0.5 flex flex-wrap items-center gap-1 text-text-xs text-[var(--color-text-tertiary)]">
              Toque em
              <ShareNetworkIcon
                size={14}
                weight="bold"
                className="inline-block"
              />
              <span>e em &quot;Adicionar à Tela de Início&quot;.</span>
            </p>
          ) : (
            <p className="mt-0.5 text-text-xs text-[var(--color-text-tertiary)]">
              Tenha o app na sua tela inicial e abra mais rápido.
            </p>
          )}
          {!iosHint && (
            <button
              type="button"
              onClick={install}
              className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--color-blue-600)] px-3 text-text-sm font-semibold text-white hover:bg-[var(--color-blue-700)]"
            >
              <DownloadSimpleIcon size={16} weight="bold" />
              Instalar
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Fechar"
          className="flex size-9 shrink-0 items-center justify-center rounded-md text-[var(--color-fg-quaternary)] hover:bg-[var(--color-bg-secondary)]"
        >
          <XIcon size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
