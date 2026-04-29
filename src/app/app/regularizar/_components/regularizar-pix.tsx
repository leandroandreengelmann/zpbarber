"use client";

import { useActionState, useEffect, useState } from "react";
import {
  ArrowSquareOutIcon,
  ArrowsClockwiseIcon,
  CheckIcon,
  CopyIcon,
  QrCodeIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { notify } from "@/components/ui/toast";
import {
  fetchOpenInvoicePixAction,
  syncOpenInvoiceAction,
} from "../actions";

type State = { error?: string; ok?: boolean };

export function RegularizarPix({
  invoiceId,
  invoiceUrl,
}: {
  invoiceId: string;
  invoiceUrl: string | null;
}) {
  const [pixLoading, setPixLoading] = useState(false);
  const [pix, setPix] = useState<{ payload?: string; image?: string }>({});
  const [pixError, setPixError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const syncBound = syncOpenInvoiceAction.bind(null, invoiceId);
  const [syncState, runSync, syncPending] = useActionState<State, FormData>(
    async (prev) => syncBound(prev),
    {}
  );

  useEffect(() => {
    if (syncState.ok) {
      notify.success("Status atualizado", {
        description: "Se pagou agora há pouco, o sistema pode levar alguns segundos para confirmar.",
      });
    }
    if (syncState.error)
      notify.error("Falha ao sincronizar", { description: syncState.error });
  }, [syncState]);

  async function loadPix() {
    setShowQr(true);
    if (pix.payload && pix.image) return;
    setPixLoading(true);
    setPixError(null);
    const res = await fetchOpenInvoicePixAction(invoiceId);
    setPixLoading(false);
    if (res.error) setPixError(res.error);
    else setPix({ payload: res.payload, image: res.image });
  }

  async function copyPayload() {
    if (!pix.payload) return;
    await navigator.clipboard.writeText(pix.payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        {!showQr && (
          <Button type="button" onClick={loadPix} variant="default">
            <QrCodeIcon size={20} weight="duotone" />
            Pagar com PIX
          </Button>
        )}
        {invoiceUrl && (
          <a
            href={invoiceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-4 text-text-sm font-semibold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
          >
            <ArrowSquareOutIcon size={20} weight="duotone" />
            Abrir fatura
          </a>
        )}
        <form action={runSync}>
          <Button type="submit" variant="outline" disabled={syncPending}>
            <ArrowsClockwiseIcon size={20} weight="duotone" />
            {syncPending ? "Verificando..." : "Já paguei, verificar"}
          </Button>
        </form>
      </div>

      {showQr && (
        <div className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4">
          {pixLoading ? (
            <div className="py-8 text-center text-text-sm text-[var(--color-text-tertiary)]">
              Gerando QR Code...
            </div>
          ) : pixError ? (
            <div className="rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] p-3 text-text-sm text-[var(--color-text-error-primary)]">
              {pixError}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-[auto,1fr] sm:items-start">
              {pix.image && (
                <div className="flex justify-center rounded-lg border border-[var(--color-border-secondary)] bg-white p-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:image/png;base64,${pix.image}`}
                    alt="QR Code PIX"
                    className="size-44"
                  />
                </div>
              )}
              {pix.payload && (
                <div className="grid gap-2">
                  <label className="text-text-xs uppercase tracking-wide text-[var(--color-text-tertiary)]">
                    Copia e cola
                  </label>
                  <textarea
                    readOnly
                    value={pix.payload}
                    rows={4}
                    className="w-full rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-3 py-2 font-mono text-text-xs text-[var(--color-text-secondary)]"
                  />
                  <Button type="button" onClick={copyPayload} variant="outline">
                    {copied ? (
                      <CheckIcon size={20} weight="duotone" />
                    ) : (
                      <CopyIcon size={20} weight="duotone" />
                    )}
                    {copied ? "Copiado!" : "Copiar código"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
