"use client";

import { useState } from "react";
import {
  CheckIcon,
  CopyIcon,
  LinkSimpleIcon,
  PencilSimpleIcon,
  WhatsappLogoIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Card } from "@/components/ui/card";

type Props = {
  shopName: string;
  publicUrl: string;
};

const STORAGE_KEY = "shareShopMessage";

function defaultMessage(shopName: string, url: string) {
  return `Olá! Agende seu horário na ${shopName}: ${url}`;
}

export function ShareShopBanner({ shopName, publicUrl }: Props) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(() => {
    if (typeof window === "undefined")
      return defaultMessage(shopName, publicUrl);
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      return saved && saved.trim().length > 0
        ? saved
        : defaultMessage(shopName, publicUrl);
    } catch {
      return defaultMessage(shopName, publicUrl);
    }
  });
  const [draft, setDraft] = useState(message);

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(message)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  function openEditor() {
    setDraft(message);
    setEditing(true);
  }

  function saveMessage() {
    const next = draft.trim().length > 0 ? draft : defaultMessage(shopName, publicUrl);
    setMessage(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    setEditing(false);
  }

  function resetToDefault() {
    const next = defaultMessage(shopName, publicUrl);
    setDraft(next);
  }

  return (
    <Card className="border-l-4 border-l-[var(--color-brand-solid)] p-2.5 sm:p-3">
      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
        <LinkSimpleIcon
          size={16}
          weight="bold"
          className="shrink-0 text-[var(--color-brand-secondary)]"
        />
        <p
          className="min-w-0 flex-1 truncate text-text-sm text-[var(--color-text-primary)]"
          title={publicUrl}
        >
          {publicUrl}
        </p>
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={copy}
            title="Copiar link"
            className="inline-flex h-8 items-center gap-1 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-2 text-text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
          >
            {copied ? (
              <>
                <CheckIcon size={14} weight="bold" />
                Copiado
              </>
            ) : (
              <>
                <CopyIcon size={14} weight="bold" />
                Copiar
              </>
            )}
          </button>
          <button
            type="button"
            onClick={openEditor}
            title="Editar mensagem"
            className="inline-flex h-8 items-center gap-1 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-2 text-text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
          >
            <PencilSimpleIcon size={14} weight="bold" />
            Mensagem
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartilhar no WhatsApp"
            className="inline-flex h-8 items-center gap-1 rounded-md bg-[#25D366] px-2.5 text-text-xs font-semibold text-white hover:opacity-90"
          >
            <WhatsappLogoIcon size={14} weight="fill" />
            WhatsApp
          </a>
        </div>
      </div>

      {editing && (
        <div className="mt-2 grid gap-2 rounded-md border border-dashed border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-2.5">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-2 text-text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-solid)]"
            placeholder="Digite a mensagem..."
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={resetToDefault}
              className="text-text-xs font-medium text-[var(--color-text-tertiary)] hover:underline"
            >
              Restaurar padrão
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-2.5 text-text-xs font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]"
              >
                <XIcon size={12} weight="bold" />
                Cancelar
              </button>
              <button
                type="button"
                onClick={saveMessage}
                className="inline-flex h-8 items-center gap-1 rounded-md bg-[var(--color-brand-solid)] px-2.5 text-text-xs font-semibold text-white hover:opacity-90"
              >
                <CheckIcon size={12} weight="bold" />
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
