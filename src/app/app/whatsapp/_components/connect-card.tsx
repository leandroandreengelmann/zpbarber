"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircleIcon,
  PlugsConnectedIcon,
  PlugsIcon,
  QrCodeIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  connectInstanceAction,
  deleteInstanceAction,
  disconnectInstanceAction,
  refreshConnectionStateAction,
} from "../actions";

type State = { error?: string; ok?: boolean; qr?: string };

const initial: State = {};

export function ConnectCard({
  status,
  phone,
  lastQr,
  lastConnectedAt,
}: {
  status: string;
  phone: string | null;
  lastQr: string | null;
  lastConnectedAt: string | null;
}) {
  const router = useRouter();
  const [, startPollingTransition] = useTransition();
  const [connectState, connectAct, connectPending] = useActionState<
    State,
    FormData
  >(connectInstanceAction, initial);
  const [refreshState, refreshAct, refreshPending] = useActionState<
    State,
    FormData
  >(refreshConnectionStateAction, initial);
  const [disconnectState, disconnectAct, disconnectPending] = useActionState<
    State,
    FormData
  >(disconnectInstanceAction, initial);
  const [deleteState, deleteAct, deletePending] = useActionState<
    State,
    FormData
  >(deleteInstanceAction, initial);

  // Polling do estado da conexão enquanto QR está pendente
  useEffect(() => {
    if (status !== "qr_pending" && status !== "connecting") return;
    const id = setInterval(() => {
      startPollingTransition(() => {
        refreshAct(new FormData());
      });
    }, 4000);
    return () => clearInterval(id);
  }, [status, refreshAct, startPollingTransition]);

  // Quando virou conectado, recarrega para atualizar a UI
  useEffect(() => {
    if (refreshState.ok) router.refresh();
  }, [refreshState.ok, router]);

  // Formata data só após hidratar (evita mismatch de timezone server/client).
  const [lastConnectedLabel, setLastConnectedLabel] = useState<string | null>(
    null
  );
  useEffect(() => {
    if (lastConnectedAt) {
      setLastConnectedLabel(new Date(lastConnectedAt).toLocaleString("pt-BR"));
    } else {
      setLastConnectedLabel(null);
    }
  }, [lastConnectedAt]);

  const isConnected = status === "connected";
  const qr = connectState.qr ?? lastQr;
  const error =
    connectState.error ??
    refreshState.error ??
    disconnectState.error ??
    deleteState.error;

  return (
    <div className="grid gap-5 rounded-2xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-5">
      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          <WarningCircleIcon
            size={20}
            weight="duotone"
            className="mt-0.5 shrink-0"
          />
          <span>{error}</span>
        </div>
      )}

      {isConnected ? (
        <div className="grid gap-4">
          <div className="flex items-start gap-3 rounded-xl border border-[var(--color-border-success-subtle)] bg-[var(--color-success-25)] p-4">
            <CheckCircleIcon
              size={28}
              weight="duotone"
              className="text-[var(--color-text-success-primary)]"
            />
            <div className="grid gap-0.5">
              <span className="text-text-md font-semibold text-[var(--color-text-success-primary)]">
                WhatsApp conectado
              </span>
              <span className="text-text-sm text-[var(--color-text-secondary)]">
                Número: <strong>+{phone ?? "—"}</strong>
              </span>
              {lastConnectedLabel && (
                <span
                  className="text-text-xs text-[var(--color-text-tertiary)]"
                  suppressHydrationWarning
                >
                  Desde {lastConnectedLabel}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <form action={refreshAct}>
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={refreshPending}
              >
                Atualizar status
              </Button>
            </form>
            <form action={disconnectAct}>
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={disconnectPending}
              >
                <PlugsIcon size={16} weight="duotone" />
                {disconnectPending ? "Desconectando..." : "Desconectar"}
              </Button>
            </form>
          </div>
        </div>
      ) : qr ? (
        <div className="grid gap-4">
          <div className="grid gap-1 text-center">
            <h3 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Escaneie o QR Code
            </h3>
            <p className="text-text-sm text-[var(--color-text-tertiary)]">
              No celular: WhatsApp → Configurações → Aparelhos conectados →
              Conectar um aparelho
            </p>
          </div>
          <div className="grid place-items-center">
            <div className="rounded-2xl border border-[var(--color-border-secondary)] bg-white p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qr.startsWith("data:") ? qr : `data:image/png;base64,${qr}`}
                alt="QR Code"
                className="size-64"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <form action={refreshAct}>
              <Button
                type="submit"
                variant="secondary"
                size="sm"
                disabled={refreshPending}
              >
                {refreshPending ? "Verificando..." : "Já escaneei, verificar"}
              </Button>
            </form>
            <form action={connectAct}>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                disabled={connectPending}
              >
                Gerar novo QR
              </Button>
            </form>
          </div>
          <p className="text-center text-text-xs text-[var(--color-text-tertiary)]">
            Aguardando leitura... a página atualiza sozinha quando conectar.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="grid gap-2 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[var(--color-bg-secondary)]">
              <QrCodeIcon
                size={28}
                weight="duotone"
                className="text-[var(--color-fg-secondary)]"
              />
            </div>
            <h3 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Nenhum WhatsApp conectado
            </h3>
            <p className="mx-auto max-w-md text-text-sm text-[var(--color-text-tertiary)]">
              Clique abaixo para gerar o QR Code e conectar o número da
              barbearia. As mensagens automáticas só funcionam depois disso.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <form action={connectAct}>
              <Button type="submit" disabled={connectPending}>
                <PlugsConnectedIcon size={20} weight="duotone" />
                {connectPending ? "Gerando QR..." : "Conectar WhatsApp"}
              </Button>
            </form>
            {(status === "error" || status === "disconnected") && phone && (
              <form action={deleteAct}>
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  disabled={deletePending}
                >
                  Reset completo da instância
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
