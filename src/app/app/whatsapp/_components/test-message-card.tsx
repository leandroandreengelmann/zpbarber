"use client";

import { useActionState, useEffect, useState } from "react";
import {
  PaperPlaneTiltIcon,
  TestTubeIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { sendManualMessageAction } from "../actions";

type State = { error?: string; ok?: boolean };

export function TestMessageCard({
  defaultPhone,
  disabled,
}: {
  defaultPhone: string | null;
  disabled?: boolean;
}) {
  const [state, action, pending] = useActionState<State, FormData>(
    sendManualMessageAction,
    {}
  );
  const [phone, setPhone] = useState(defaultPhone ?? "");
  const [body, setBody] = useState(
    "Mensagem de teste do ZP Barber. Se recebeu, está tudo funcionando!"
  );

  useEffect(() => {
    if (state.ok) notify.success("Mensagem enviada");
    if (state.error) notify.error("Falha", { description: state.error });
  }, [state]);

  return (
    <Card>
      <CardContent className="grid gap-4 p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-fg-secondary)]">
            <TestTubeIcon size={22} weight="duotone" />
          </div>
          <div>
            <h2 className="text-text-md font-semibold text-[var(--color-text-primary)]">
              Testar envio
            </h2>
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Mande uma mensagem para validar a conexão.
            </p>
          </div>
        </div>

        <form action={action} className="grid gap-3">
          <div className="grid gap-1.5">
            <Label htmlFor="to_phone">Telefone (com DDD, ex: 5566999999999)</Label>
            <Input
              id="to_phone"
              name="to_phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="55 66 99999-9999"
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="body">Mensagem</Label>
            <textarea
              id="body"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 text-text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-blue-500)] focus:ring-2 focus:ring-[var(--color-blue-100)]"
              maxLength={1000}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={pending || disabled || !phone || !body}
            className="justify-self-start"
          >
            <PaperPlaneTiltIcon size={20} weight="duotone" />
            {pending ? "Enviando..." : "Enviar teste"}
          </Button>
          {disabled && (
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Conecte o WhatsApp em Configurações antes de enviar.
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
