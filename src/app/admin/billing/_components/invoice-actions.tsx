"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import {
  ArrowsClockwiseIcon,
  ArrowSquareOutIcon,
  CheckIcon,
  CopyIcon,
  HandCoinsIcon,
  QrCodeIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { notify } from "@/components/ui/toast";
import {
  fetchInvoicePixQrAction,
  markInvoicePaidInCashAction,
  refreshInvoiceFromAsaasAction,
} from "../actions";

type State = { error?: string; ok?: boolean };

export function InvoiceActions({
  invoiceId,
  invoiceUrl,
  canFetchPix,
  canSync,
  canMarkPaid,
}: {
  invoiceId: string;
  invoiceUrl: string | null;
  canFetchPix: boolean;
  canSync: boolean;
  canMarkPaid: boolean;
}) {
  const [, syncTransition] = useTransition();
  const [, markTransition] = useTransition();
  const [pixOpen, setPixOpen] = useState(false);
  const [pixLoading, setPixLoading] = useState(false);
  const [pix, setPix] = useState<{ payload?: string; image?: string }>({});
  const [pixError, setPixError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const refreshAction = refreshInvoiceFromAsaasAction.bind(null, invoiceId);
  const markPaidAction = markInvoicePaidInCashAction.bind(null, invoiceId);
  const [refreshState, runRefresh, refreshPending] = useActionState<State, FormData>(
    async (prev) => refreshAction(prev),
    {}
  );
  const [markState, runMark, markPending] = useActionState<State, FormData>(
    async (prev) => markPaidAction(prev),
    {}
  );

  useEffect(() => {
    if (refreshState.ok) notify.success("Status sincronizado com Asaas");
    if (refreshState.error)
      notify.error("Falha ao sincronizar", { description: refreshState.error });
  }, [refreshState]);

  useEffect(() => {
    if (markState.ok) notify.success("Cobrança marcada como paga");
    if (markState.error)
      notify.error("Falha", { description: markState.error });
  }, [markState]);

  async function openPix() {
    setPixOpen(true);
    setPixError(null);
    if (pix.payload && pix.image) return;
    setPixLoading(true);
    const res = await fetchInvoicePixQrAction(invoiceId);
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
    <>
      <div className="flex flex-wrap justify-end gap-1">
        {invoiceUrl && (
          <a
            href={invoiceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
            aria-label="Abrir invoice no Asaas"
          >
            <ArrowSquareOutIcon size={20} weight="duotone" />
          </a>
        )}
        {canFetchPix && (
          <button
            type="button"
            onClick={openPix}
            className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
            aria-label="Ver PIX"
          >
            <QrCodeIcon size={20} weight="duotone" />
          </button>
        )}
        {canSync && (
          <form action={runRefresh}>
            <button
              type="submit"
              disabled={refreshPending}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] disabled:opacity-50"
              aria-label="Sincronizar com Asaas"
              onClick={(e) => {
                e.currentTarget.form?.requestSubmit();
                syncTransition(() => {});
              }}
            >
              <ArrowsClockwiseIcon size={20} weight="duotone" />
            </button>
          </form>
        )}
        {canMarkPaid && (
          <form action={runMark}>
            <button
              type="submit"
              disabled={markPending}
              className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)] disabled:opacity-50"
              aria-label="Marcar como paga em dinheiro"
              onClick={() => {
                if (
                  !confirm(
                    "Marcar como paga manualmente? Use só se confirmou recebimento fora do Asaas."
                  )
                )
                  return;
                markTransition(() => {});
              }}
            >
              <HandCoinsIcon size={20} weight="duotone" />
            </button>
          </form>
        )}
      </div>

      <Dialog open={pixOpen} onOpenChange={setPixOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pagamento PIX</DialogTitle>
            <DialogDescription>
              Mostre o QR ou copie o código para a barbearia pagar.
            </DialogDescription>
          </DialogHeader>
          {pixLoading ? (
            <div className="py-8 text-center text-text-sm text-[var(--color-text-tertiary)]">
              Carregando QR...
            </div>
          ) : pixError ? (
            <div className="rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] p-3 text-text-sm text-[var(--color-text-error-primary)]">
              {pixError}
            </div>
          ) : (
            <div className="grid gap-3">
              {pix.image && (
                <div className="flex justify-center rounded-lg border border-[var(--color-border-secondary)] bg-white p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:image/png;base64,${pix.image}`}
                    alt="QR Code PIX"
                    className="size-48"
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
                    rows={3}
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
        </DialogContent>
      </Dialog>
    </>
  );
}
