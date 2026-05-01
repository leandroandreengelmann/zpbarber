"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  CameraIcon,
  FloppyDiskIcon,
  LinkSimpleIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/browser";
import { SUPPORTED_TIMEZONES, type ShopLink, type ShopPhoto } from "@/lib/zod/settings";

type State = { error?: string; ok?: boolean };

export type ShopValues = {
  id: string;
  name: string;
  timezone: string;
  cnpj: string | null;
  phone: string | null;
  email: string | null;
  primary_color: string | null;
  logo_url: string | null;
  links: ShopLink[];
  gallery: ShopPhoto[];
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

  const [links, setLinks] = useState<ShopLink[]>(initial.links ?? []);
  const [gallery, setGallery] = useState<ShopPhoto[]>(initial.gallery ?? []);
  const [uploading, setUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState(initial.logo_url ?? "");
  const [logoUploading, setLogoUploading] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.ok) notify.success("Configurações salvas", { description: "As alterações foram aplicadas." });
    if (state.error) notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  function addLink() {
    if (links.length >= 12) return;
    setLinks([...links, { label: "", url: "" }]);
  }
  function updateLink(i: number, patch: Partial<ShopLink>) {
    setLinks(links.map((l, idx) => (idx === i ? { ...l, ...patch } : l)));
  }
  function removeLink(i: number) {
    setLinks(links.filter((_, idx) => idx !== i));
  }

  function updatePhoto(i: number, patch: Partial<ShopPhoto>) {
    setGallery(gallery.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }
  function removePhoto(i: number) {
    setGallery(gallery.filter((_, idx) => idx !== i));
  }

  async function handleLogoFile(file: File) {
    if (!file.type.startsWith("image/")) {
      notify.error("Formato inválido", {
        description: "Envie uma imagem JPG, PNG, WebP ou SVG.",
      });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      notify.error("Imagem muito grande", { description: "Máximo 2 MB." });
      return;
    }
    setLogoUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "png";
      const path = `${initial.id}/logo/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("shop-gallery")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });
      if (upErr) {
        notify.error("Falha no upload", { description: upErr.message });
        return;
      }
      const { data } = supabase.storage.from("shop-gallery").getPublicUrl(path);
      setLogoUrl(data.publicUrl);
      notify.success("Logo carregado", {
        description: "Lembre de salvar para confirmar.",
      });
    } finally {
      setLogoUploading(false);
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  }

  async function handleGalleryFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (gallery.length + files.length > 24) {
      notify.error("Limite de fotos", {
        description: "Máximo 24 fotos na galeria.",
      });
      return;
    }
    setUploading(true);
    try {
      const supabase = createClient();
      const newPhotos: ShopPhoto[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          notify.error("Formato inválido", {
            description: `${file.name}: envie apenas imagens.`,
          });
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          notify.error("Imagem muito grande", {
            description: `${file.name}: máximo 5 MB.`,
          });
          continue;
        }
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const path = `${initial.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("shop-gallery")
          .upload(path, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });
        if (upErr) {
          notify.error("Falha no upload", { description: upErr.message });
          continue;
        }
        const { data } = supabase.storage.from("shop-gallery").getPublicUrl(path);
        newPhotos.push({ url: data.publicUrl, caption: "" });
      }
      if (newPhotos.length > 0) {
        setGallery([...gallery, ...newPhotos]);
        notify.success("Fotos enviadas", {
          description: "Lembre de salvar para confirmar.",
        });
      }
    } finally {
      setUploading(false);
      if (galleryInputRef.current) galleryInputRef.current.value = "";
    }
  }

  return (
    <form action={formAction} className="grid gap-6">
      <input type="hidden" name="links_json" value={JSON.stringify(links)} />
      <input type="hidden" name="gallery_json" value={JSON.stringify(gallery)} />

      <fieldset disabled={disabled} className="grid gap-6">
        <div className="grid gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-4">
          <div>
            <Label className="text-text-md font-semibold">
              Logo da barbearia
            </Label>
            <p className="mt-0.5 text-text-xs text-[var(--color-text-tertiary)]">
              Aparece na página pública e no topo da agenda. JPG, PNG, WebP ou
              SVG até 2 MB.
            </p>
          </div>
          <input type="hidden" name="logo_url" value={logoUrl} />
          <input
            ref={logoInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleLogoFile(f);
            }}
          />
          <div className="flex items-center gap-4">
            <div className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="size-full object-contain"
                />
              ) : (
                <CameraIcon
                  size={32}
                  weight="duotone"
                  className="text-[var(--color-fg-quaternary)]"
                />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                disabled={disabled || logoUploading}
                onClick={() => logoInputRef.current?.click()}
              >
                <CameraIcon size={20} weight="duotone" />
                {logoUploading
                  ? "Enviando..."
                  : logoUrl
                    ? "Trocar logo"
                    : "Escolher arquivo"}
              </Button>
              {logoUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={disabled || logoUploading}
                  onClick={() => setLogoUrl("")}
                  className="text-[var(--color-text-error-primary)]"
                >
                  <TrashIcon size={18} weight="duotone" />
                  Remover
                </Button>
              )}
            </div>
          </div>
        </div>

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
          <div className="grid gap-1.5 md:col-span-2">
            <Label htmlFor="timezone">Fuso horário</Label>
            <select
              id="timezone"
              name="timezone"
              defaultValue={initial.timezone || "America/Sao_Paulo"}
              className="flex h-10 w-full rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-md text-[var(--color-text-primary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)] outline-none focus-visible:border-[var(--color-border-brand)] focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--color-border-brand)_24%,transparent)]"
            >
              {SUPPORTED_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
            <p className="text-text-xs text-[var(--color-text-tertiary)]">
              Define o fuso usado para horários de atendimento, agenda e mensagens.
            </p>
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
        </div>

        <Separator />

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold">Links da página pública</h3>
              <p className="text-text-xs text-[var(--color-text-tertiary)]">
                Instagram, Facebook, site, mapa, cardápio etc. Aparecem na página da barbearia.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLink}
              disabled={disabled || links.length >= 12}
            >
              <PlusIcon size={18} weight="bold" />
              Adicionar
            </Button>
          </div>
          {links.length === 0 ? (
            <p className="rounded-lg border border-dashed border-[var(--color-border-secondary)] px-4 py-5 text-center text-text-sm text-[var(--color-text-tertiary)]">
              Nenhum link adicionado. Toque em &ldquo;Adicionar&rdquo;.
            </p>
          ) : (
            <ul className="grid gap-2.5">
              {links.map((l, i) => (
                <li
                  key={i}
                  className="grid gap-2 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-3 sm:grid-cols-[1fr_2fr_auto] sm:items-end sm:gap-3"
                >
                  <div className="grid gap-1.5">
                    <Label htmlFor={`link_label_${i}`}>Título</Label>
                    <Input
                      id={`link_label_${i}`}
                      placeholder="Instagram"
                      value={l.label}
                      onChange={(e) => updateLink(i, { label: e.target.value })}
                      maxLength={60}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor={`link_url_${i}`}>URL</Label>
                    <Input
                      id={`link_url_${i}`}
                      placeholder="https://instagram.com/sua_barbearia"
                      value={l.url}
                      onChange={(e) => updateLink(i, { url: e.target.value })}
                      maxLength={2048}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(i)}
                    className="justify-self-end text-[var(--color-text-error-primary)]"
                  >
                    <TrashIcon size={18} weight="duotone" />
                    Remover
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Separator />

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold">Galeria de fotos</h3>
              <p className="text-text-xs text-[var(--color-text-tertiary)]">
                Mostre o ambiente da barbearia, cortes e equipe. JPG/PNG/WebP, até 5 MB cada.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => galleryInputRef.current?.click()}
              disabled={disabled || uploading || gallery.length >= 24}
            >
              <CameraIcon size={18} weight="duotone" />
              {uploading ? "Enviando..." : "Adicionar fotos"}
            </Button>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => handleGalleryFiles(e.target.files)}
            />
          </div>
          {gallery.length === 0 ? (
            <p className="rounded-lg border border-dashed border-[var(--color-border-secondary)] px-4 py-5 text-center text-text-sm text-[var(--color-text-tertiary)]">
              Nenhuma foto na galeria.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {gallery.map((p, i) => (
                <li
                  key={i}
                  className="group relative overflow-hidden rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt={p.caption || "Foto da barbearia"}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute right-1.5 top-1.5 rounded-md bg-black/60 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                    aria-label="Remover foto"
                  >
                    <TrashIcon size={16} weight="bold" />
                  </button>
                  <Input
                    placeholder="Legenda (opcional)"
                    value={p.caption ?? ""}
                    onChange={(e) => updatePhoto(i, { caption: e.target.value })}
                    maxLength={120}
                    className="rounded-none border-0 border-t border-[var(--color-border-secondary)] text-text-xs"
                  />
                </li>
              ))}
            </ul>
          )}
          <p className="flex items-center gap-1.5 text-text-xs text-[var(--color-text-tertiary)]">
            <LinkSimpleIcon size={14} weight="duotone" />
            {gallery.length}/24 fotos
          </p>
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
        <Button
          type="submit"
          disabled={pending || disabled || uploading || logoUploading}
        >
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : "Salvar configurações"}
        </Button>
      </div>
    </form>
  );
}
