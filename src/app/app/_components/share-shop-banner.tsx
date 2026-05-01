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
    <Card className="grid gap-3 border-l-4 border-l-[var(--color-brand-solid)] p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-4">
        <div className="grid gap-1 min-w-0">
          <div className="inline-flex items-center gap-1.5 text-text-xs font-semibold uppercase tracking-wide text-[var(--color-brand-secondary)]">
            <LinkSimpleIcon size={14} weight="bold" />
            Link de agendamento
          </div>
          <p className="truncate text-text-sm text-[var(--color-text-primary)] sm:text-text-md">
            {publicUrl}
          </p>
          <p className="text-text-xs text-[var(--color-text-tertiary)]">
            Compartilhe com seus clientes para receberem agendamentos online.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <button
            type="button"
            onClick={copy}
            className="inline-flex h-10 items-center gap-1.5 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]"
          >
            {copied ? (
              <>
                <CheckIcon size={16} weight="bold" />
                Copiado
              </>
            ) : (
              <>
                <CopyIcon size={16} weight="bold" />
                Copiar
              </>
            )}
          </button>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-1.5 rounded-md bg-[#25D366] px-3 text-text-sm font-semibold text-white hover:opacity-90"
          >
            <WhatsappLogoIcon size={18} weight="fill" />
            Compartilhar no WhatsApp
          </a>
        </div>
      </div>

      <div className="grid gap-2 rounded-lg border border-dashed border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-text-xs font-semibold uppercase tracking-wide text-[var(--color-text-tertiary)]">
            Mensagem que será enviada
          </span>
          {!editing && (
            <button
              type="button"
              onClick={openEditor}
              className="inline-flex items-center gap-1 text-text-xs font-medium text-[var(--color-brand-secondary)] hover:underline"
            >
              <PencilSimpleIcon size={14} weight="bold" />
              Editar mensagem
            </button>
          )}
        </div>
        {editing ? (
          <div className="grid gap-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={4}
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
                  className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]"
                >
                  <XIcon size={14} weight="bold" />
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={saveMessage}
                  className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[var(--color-brand-solid)] px-3 text-text-sm font-semibold text-white hover:opacity-90"
                >
                  <CheckIcon size={14} weight="bold" />
                  Salvar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-text-sm text-[var(--color-text-secondary)]">
            {message}
          </p>
        )}
      </div>
    </Card>
  );
}
