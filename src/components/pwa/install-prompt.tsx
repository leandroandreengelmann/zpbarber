"use client";

import { useEffect, useState } from "react";
import {
  DeviceMobileIcon,
  DownloadSimpleIcon,
  PlusSquareIcon,
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

function isIOSSafari() {
  if (typeof window === "undefined") return false;
  if (!isIOS()) return false;
  const ua = window.navigator.userAgent;
  // Safari, exclui Chrome (CriOS), Firefox (FxiOS), Edge (EdgiOS)
  return /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
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
  const [ios, setIos] = useState(false);
  const [iosModal, setIosModal] = useState(false);

  useEffect(() => {
    if (isStandalone() || suppressed() || !isMobileViewport()) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setEvent(e as BeforeInstallPromptEvent);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // iOS não dispara beforeinstallprompt — mostrar banner com modal
    if (isIOSSafari()) {
      const t = window.setTimeout(() => {
        setIos(true);
        setShow(true);
      }, 4000);
      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
        window.clearTimeout(t);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {}
    setShow(false);
    setIosModal(false);
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

  function openIosGuide() {
    haptics.tap();
    setIosModal(true);
  }

  if (!show) return null;

  return (
    <>
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
            <p className="mt-0.5 text-text-xs text-[var(--color-text-tertiary)]">
              Tenha o app na sua tela inicial e abra mais rápido.
            </p>
            <button
              type="button"
              onClick={ios ? openIosGuide : install}
              className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--color-blue-600)] px-3 text-text-sm font-semibold text-white hover:bg-[var(--color-blue-700)]"
            >
              <DownloadSimpleIcon size={16} weight="bold" />
              Instalar app
            </button>
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

      {iosModal && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Como instalar no iPhone"
          onClick={() => setIosModal(false)}
        >
          <div
            className="w-full rounded-t-2xl bg-[var(--color-bg-primary)] p-5 shadow-[0_-12px_32px_rgb(10_13_18_/_0.18)]"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 20px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              aria-hidden
              className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[var(--color-bg-tertiary)]"
            />
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-text-md font-semibold text-[var(--color-text-primary)]">
                  Instalar no iPhone
                </p>
                <p className="mt-1 text-text-sm text-[var(--color-text-tertiary)]">
                  Em 3 passos pelo Safari.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIosModal(false)}
                aria-label="Fechar"
                className="flex size-9 shrink-0 items-center justify-center rounded-md text-[var(--color-fg-quaternary)] hover:bg-[var(--color-bg-secondary)]"
              >
                <XIcon size={18} weight="bold" />
              </button>
            </div>

            <ol className="space-y-3">
              <li className="flex items-center gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-600)] text-text-xs font-bold text-white">
                  1
                </span>
                <span className="flex-1 text-text-sm text-[var(--color-text-primary)]">
                  Toque no botão{" "}
                  <span className="font-semibold">Compartilhar</span> na barra do
                  Safari.
                </span>
                <ShareNetworkIcon
                  size={22}
                  weight="duotone"
                  className="text-[var(--color-blue-600)]"
                />
              </li>
              <li className="flex items-center gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-600)] text-text-xs font-bold text-white">
                  2
                </span>
                <span className="flex-1 text-text-sm text-[var(--color-text-primary)]">
                  Role e toque em{" "}
                  <span className="font-semibold">
                    Adicionar à Tela de Início
                  </span>
                  .
                </span>
                <PlusSquareIcon
                  size={22}
                  weight="duotone"
                  className="text-[var(--color-blue-600)]"
                />
              </li>
              <li className="flex items-center gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-blue-600)] text-text-xs font-bold text-white">
                  3
                </span>
                <span className="flex-1 text-text-sm text-[var(--color-text-primary)]">
                  Toque em <span className="font-semibold">Adicionar</span> no
                  canto superior direito.
                </span>
                <DeviceMobileIcon
                  size={22}
                  weight="duotone"
                  className="text-[var(--color-blue-600)]"
                />
              </li>
            </ol>

            <p className="mt-4 text-text-xs text-[var(--color-text-tertiary)]">
              Importante: precisa estar aberto no <strong>Safari</strong>. Não
              funciona pelo Chrome ou outros navegadores no iPhone.
            </p>

            <button
              type="button"
              onClick={() => setIosModal(false)}
              className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-[var(--color-blue-600)] px-3 text-text-sm font-semibold text-white hover:bg-[var(--color-blue-700)]"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </>
  );
}
