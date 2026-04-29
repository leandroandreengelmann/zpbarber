"use client";

import { useActionState, useEffect } from "react";
import { FloppyDiskIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type State = { error?: string; ok?: boolean };

export type ShopValues = {
  name: string;
  cnpj: string | null;
  phone: string | null;
  email: string | null;
  primary_color: string | null;
  logo_url: string | null;
  address: {
    cep?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
  } | null;
};

export function SettingsForm({
  action,
  initial,
  disabled = false,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initial: ShopValues;
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const a = initial.address ?? {};

  useEffect(() => {
    if (state.ok) notify.success("Configurações salvas", { description: "As alterações foram aplicadas." });
    if (state.error) notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  return (
    <form action={formAction} className="grid gap-6">
      <fieldset disabled={disabled} className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" required defaultValue={initial.name} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input id="cnpj" name="cnpj" defaultValue={initial.cnpj ?? ""} placeholder="00.000.000/0000-00" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" name="phone" defaultValue={initial.phone ?? ""} placeholder="(11) 99999-9999" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" defaultValue={initial.email ?? ""} />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="primary_color">Cor primária</Label>
            <div className="flex items-center gap-2">
              <Input
                id="primary_color"
                name="primary_color"
                placeholder="#1570ef"
                defaultValue={initial.primary_color ?? ""}
                className="font-mono"
              />
              {initial.primary_color && (
                <div
                  aria-hidden
                  className="size-9 shrink-0 rounded-md border border-border"
                  style={{ backgroundColor: initial.primary_color }}
                />
              )}
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="logo_url">URL do logo</Label>
            <Input id="logo_url" name="logo_url" defaultValue={initial.logo_url ?? ""} placeholder="https://..." />
          </div>
        </div>

        <Separator />

        <div className="grid gap-4">
          <h3 className="text-sm font-semibold">Endereço</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-1.5">
              <Label htmlFor="address.cep">CEP</Label>
              <Input id="address.cep" name="address.cep" defaultValue={a.cep ?? ""} placeholder="00000-000" />
            </div>
            <div className="grid gap-1.5 md:col-span-2">
              <Label htmlFor="address.street">Rua</Label>
              <Input id="address.street" name="address.street" defaultValue={a.street ?? ""} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="address.number">Número</Label>
              <Input id="address.number" name="address.number" defaultValue={a.number ?? ""} />
            </div>
            <div className="grid gap-1.5 md:col-span-2">
              <Label htmlFor="address.complement">Complemento</Label>
              <Input
                id="address.complement"
                name="address.complement"
                defaultValue={a.complement ?? ""}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="address.neighborhood">Bairro</Label>
              <Input
                id="address.neighborhood"
                name="address.neighborhood"
                defaultValue={a.neighborhood ?? ""}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="address.city">Cidade</Label>
              <Input id="address.city" name="address.city" defaultValue={a.city ?? ""} />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="address.state">UF</Label>
              <Input
                id="address.state"
                name="address.state"
                maxLength={2}
                defaultValue={a.state ?? ""}
                className="uppercase"
              />
            </div>
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending || disabled}>
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : "Salvar configurações"}
        </Button>
      </div>
    </form>
  );
}
