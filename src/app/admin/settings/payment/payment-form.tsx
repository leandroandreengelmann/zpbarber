"use client";

import { useActionState, useEffect, useState } from "react";
import {
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  FloppyDiskIcon,
  KeyIcon,
  LinkIcon,
  PlugsConnectedIcon,
  PlugsIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { notify } from "@/components/ui/toast";
import {
  disconnectPaymentGatewayAction,
  savePaymentGatewayAction,
} from "./actions";
import type { AsaasConfigStatus } from "@/lib/asaas/config";

type State = { error?: string; ok?: boolean; warning?: string };

function StatusBadge({ status }: { status: AsaasConfigStatus }) {
  if (!status.configured)
    return <Badge variant="outline">Não configurado</Badge>;
  if (!status.webhookRegistered)
    return <Badge variant="secondary">Webhook pendente</Badge>;
  return (
    <Badge variant="default" className="gap-1">
      <CheckCircleIcon size={14} weight="duotone" /> Conectado
    </Badge>
  );
}

export function PaymentGatewayForm({
  status,
  webhookUrl,
}: {
  status: AsaasConfigStatus;
  webhookUrl: string;
}) {
  const [saveState, saveAction, savePending] = useActionState<State, FormData>(
    savePaymentGatewayAction,
    {}
  );
  const [disconnectState, disconnectAction, disconnectPending] = useActionState<
    State,
    FormData
  >(disconnectPaymentGatewayAction, {});
  const [environment, setEnvironment] = useState(status.environment);
  const [showKey, setShowKey] = useState(false);
  const [keyValue, setKeyValue] = useState("");

  useEffect(() => {
    if (saveState.ok)
      notify.success("Gateway conectado", {
        description:
          saveState.warning ?? "Chave validada e webhook registrado no Asaas.",
      });
    if (saveState.error)
      notify.error("Falha ao conectar", { description: saveState.error });
  }, [saveState]);

  useEffect(() => {
    if (disconnectState.ok)
      notify.success("Gateway desconectado", {
        description: "Chave e webhook removidos.",
      });
    if (disconnectState.error)
      notify.error("Falha ao desconectar", { description: disconnectState.error });
  }, [disconnectState]);

  const hasExistingKey = status.hasKey;

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge status={status} />
        {status.accountName && (
          <span className="text-text-sm text-[var(--color-text-secondary)]">
            {status.accountName}
            {status.accountEmail ? ` · ${status.accountEmail}` : ""}
          </span>
        )}
        {status.lastValidatedAt && (
          <span className="text-text-xs text-[var(--color-text-tertiary)]">
            validado em {new Date(status.lastValidatedAt).toLocaleString("pt-BR")}
          </span>
        )}
      </div>

      <Separator />

      <form action={saveAction} className="grid gap-5">
        <input
          type="hidden"
          name="keep_existing_key"
          value={hasExistingKey && !keyValue ? "1" : "0"}
        />

        <div className="grid gap-1.5">
          <Label>Ambiente</Label>
          <div className="grid gap-2 sm:grid-cols-2">
            {(["sandbox", "production"] as const).map((opt) => (
              <label
                key={opt}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition ${
                  environment === opt
                    ? "border-[var(--color-blue-500)] bg-[var(--color-blue-25)]"
                    : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] hover:border-[var(--color-border-primary)]"
                }`}
              >
                <input
                  type="radio"
                  name="environment"
                  value={opt}
                  checked={environment === opt}
                  onChange={() => setEnvironment(opt)}
                  className="mt-1 size-4"
                />
                <div className="grid gap-0.5">
                  <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                    {opt === "sandbox" ? "Sandbox" : "Produção"}
                  </span>
                  <span className="text-text-xs text-[var(--color-text-tertiary)]">
                    {opt === "sandbox"
                      ? "sandbox.asaas.com — para testes"
                      : "api.asaas.com — cobranças reais"}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="asaas_api_key">API key do Asaas</Label>
          <div className="relative">
            <KeyIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="asaas_api_key"
              name="asaas_api_key"
              type={showKey ? "text" : "password"}
              placeholder={
                hasExistingKey ? "•••••••••••• (já salva)" : "Cole sua API key"
              }
              value={keyValue}
              onChange={(e) => setKeyValue(e.target.value)}
              className="pl-10 pr-10 font-mono"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)] hover:text-[var(--color-fg-secondary)]"
              aria-label={showKey ? "Ocultar" : "Mostrar"}
            >
              {showKey ? (
                <EyeSlashIcon size={20} weight="duotone" />
              ) : (
                <EyeIcon size={20} weight="duotone" />
              )}
            </button>
          </div>
          <p className="text-text-xs text-[var(--color-text-tertiary)]">
            Encontre em Asaas → Integrações → Chave de API. Nunca compartilhe.
          </p>
        </div>

        <div className="grid gap-1.5">
          <Label>URL de webhook (registrada automaticamente)</Label>
          <div className="relative">
            <LinkIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input value={webhookUrl} readOnly className="pl-10 font-mono" />
          </div>
          {webhookUrl.includes("localhost") && (
            <p className="flex items-start gap-1.5 text-text-xs text-[var(--color-text-warning-primary)]">
              <WarningCircleIcon size={14} weight="duotone" className="mt-0.5" />
              Defina a URL pública do app em Configurações primeiro — o Asaas
              não consegue alcançar localhost.
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button type="submit" size="lg" disabled={savePending}>
            {hasExistingKey ? (
              <PlugsConnectedIcon size={28} weight="duotone" />
            ) : (
              <FloppyDiskIcon size={28} weight="duotone" />
            )}
            {savePending
              ? "Conectando..."
              : hasExistingKey
                ? "Atualizar conexão"
                : "Conectar Asaas"}
          </Button>
        </div>
      </form>

      {hasExistingKey && (
        <>
          <Separator />
          <form action={disconnectAction} className="flex justify-end">
            <Button
              type="submit"
              variant="ghost"
              disabled={disconnectPending}
              className="text-[var(--color-text-error-primary)] hover:bg-[var(--color-error-25)]"
            >
              <PlugsIcon size={20} weight="duotone" />
              {disconnectPending ? "Desconectando..." : "Desconectar gateway"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
