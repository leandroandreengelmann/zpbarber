"use client";

import { useActionState, useEffect, useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  LockKeyIcon,
  UserPlusIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupBarbershopAction } from "./actions";
import { maskCNPJ, maskCPF } from "@/lib/validators/tax-id";

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
  const [taxType, setTaxType] = useState<"cnpj" | "cpf">("cnpj");
  const [taxValue, setTaxValue] = useState("");
  const [pwVisible, setPwVisible] = useState(false);

  useEffect(() => {
    if (!slugManual) setShopSlug(slugify(shopName));
  }, [shopName, slugManual]);

  useEffect(() => {
    setTaxValue("");
  }, [taxType]);

  const taxLabel = taxType === "cnpj" ? "CNPJ da barbearia" : "Seu CPF";
  const taxPlaceholder =
    taxType === "cnpj" ? "00.000.000/0000-00" : "000.000.000-00";
  const taxMaxLen = taxType === "cnpj" ? 18 : 14;

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
        <div className="relative">
          <LockKeyIcon
            size={28}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            id="password"
            name="password"
            type={pwVisible ? "text" : "password"}
            required
            minLength={8}
            placeholder="Mínimo 8 caracteres"
            autoComplete="new-password"
            className="h-11 pl-9 pr-10 text-text-md"
          />
          <button
            type="button"
            onClick={() => setPwVisible((v) => !v)}
            aria-label={pwVisible ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[var(--color-fg-quaternary)] transition-colors hover:bg-[var(--color-bg-secondary)] hover:text-[var(--color-fg-secondary)]"
          >
            {pwVisible ? (
              <EyeSlashIcon size={20} weight="duotone" />
            ) : (
              <EyeIcon size={20} weight="duotone" />
            )}
          </button>
        </div>
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

      <div className="grid gap-2">
        <Label>A barbearia tem CNPJ?</Label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setTaxType("cnpj")}
            aria-pressed={taxType === "cnpj"}
            className={`rounded-lg border px-3 py-2.5 text-text-sm font-medium transition-colors ${
              taxType === "cnpj"
                ? "border-[var(--color-border-brand-solid)] bg-[var(--color-bg-brand-primary)] text-[var(--color-text-brand-primary)]"
                : "border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]"
            }`}
          >
            Sim, tenho CNPJ
          </button>
          <button
            type="button"
            onClick={() => setTaxType("cpf")}
            aria-pressed={taxType === "cpf"}
            className={`rounded-lg border px-3 py-2.5 text-text-sm font-medium transition-colors ${
              taxType === "cpf"
                ? "border-[var(--color-border-brand-solid)] bg-[var(--color-bg-brand-primary)] text-[var(--color-text-brand-primary)]"
                : "border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]"
            }`}
          >
            Pessoa física (CPF)
          </button>
        </div>
        <input type="hidden" name="tax_type" value={taxType} />
        <Label htmlFor="tax_value" className="mt-1">
          {taxLabel}
        </Label>
        <Input
          id="tax_value"
          name="tax_value"
          required
          inputMode="numeric"
          placeholder={taxPlaceholder}
          maxLength={taxMaxLen}
          value={taxValue}
          onChange={(e) => {
            const masked =
              taxType === "cnpj"
                ? maskCNPJ(e.target.value)
                : maskCPF(e.target.value);
            setTaxValue(masked);
          }}
        />
      </div>

      <Button type="submit" size="lg" disabled={pending} className="mt-2 h-11 w-full font-semibold">
        <UserPlusIcon size={28} weight="duotone" />
        {pending ? "Criando conta..." : `Criar conta e começar trial de ${trialDays} dias`}
      </Button>
    </form>
  );
}
