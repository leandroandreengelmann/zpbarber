"use client";

import { useActionState, useEffect, useState } from "react";
import {
  UserPlusIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupBarbershopAction } from "./actions";

type State = { error?: string; ok?: boolean };

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function SignupForm({ trialDays }: { trialDays: number }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    signupBarbershopAction,
    {}
  );
  const [shopName, setShopName] = useState("");
  const [shopSlug, setShopSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (!slugManual) setShopSlug(slugify(shopName));
  }, [shopName, slugManual]);

  return (
    <form action={formAction} className="grid gap-5">
      {state.error && (
        <div className="flex items-start gap-2 rounded-lg border border-[var(--color-border-error-subtle)] bg-[var(--color-error-25)] px-3 py-2.5 text-text-sm text-[var(--color-text-error-primary)]">
          <WarningCircleIcon
            size={28}
            weight="duotone"
            className="mt-0.5 shrink-0"
          />
          <span>{state.error}</span>
        </div>
      )}

      <div className="grid gap-1.5">
        <Label htmlFor="full_name">Seu nome</Label>
        <Input
          id="full_name"
          name="full_name"
          required
          minLength={2}
          maxLength={120}
          placeholder="João da Silva"
          autoComplete="name"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="email">Seu e-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="voce@barbearia.com"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
        />
      </div>

      <div className="border-t border-[var(--color-border-secondary)] pt-5" />

      <div className="grid gap-1.5">
        <Label htmlFor="shop_name">Nome da barbearia</Label>
        <Input
          id="shop_name"
          name="shop_name"
          required
          minLength={2}
          maxLength={120}
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          placeholder="Barbearia do João"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="shop_slug">Endereço (link público)</Label>
        <Input
          id="shop_slug"
          name="shop_slug"
          required
          value={shopSlug}
          onChange={(e) => {
            setSlugManual(true);
            setShopSlug(slugify(e.target.value));
          }}
          placeholder="barbearia-do-joao"
          className="font-mono"
          pattern="[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          minLength={3}
          maxLength={40}
        />
        <p className="text-text-xs text-[var(--color-text-tertiary)]">
          Será sua URL pública: barberramos.com.br/<span className="font-mono">{shopSlug || "sua-barbearia"}</span>
        </p>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="shop_phone">Telefone (opcional)</Label>
        <Input
          id="shop_phone"
          name="shop_phone"
          placeholder="(11) 99999-9999"
          maxLength={40}
        />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="mt-2 h-11 w-full font-semibold">
        <UserPlusIcon size={28} weight="duotone" />
        {pending ? "Criando conta..." : `Criar conta e começar trial de ${trialDays} dias`}
      </Button>
    </form>
  );
}
