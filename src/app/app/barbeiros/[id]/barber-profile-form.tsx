"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  CameraIcon,
  FloppyDiskIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/browser";

type State = { error?: string; ok?: boolean };

function initials(name?: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.at(-1)?.[0] ?? "")).toUpperCase() || "?";
}

export function BarberProfileForm({
  action,
  barberId,
  initial,
  disabled = false,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  barberId: string;
  initial: { full_name: string; phone: string; avatar_url: string };
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [name, setName] = useState(initial.full_name);
  const [phone, setPhone] = useState(initial.phone);
  const [avatarUrl, setAvatarUrl] = useState(initial.avatar_url);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.ok) notify.success("Perfil atualizado");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      notify.error("Formato inválido", {
        description: "Envie uma imagem JPG, PNG ou WebP.",
      });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      notify.error("Imagem muito grande", {
        description: "Máximo 2 MB.",
      });
      return;
    }
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `${barberId}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      setAvatarUrl(data.publicUrl);
      notify.success("Foto carregada", {
        description: "Lembre de salvar para confirmar.",
      });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Falha no upload";
      notify.error("Erro no upload", { description: msg });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleRemovePhoto() {
    setAvatarUrl("");
  }

  return (
    <form action={formAction} className="grid gap-6">
      <input type="hidden" name="avatar_url" value={avatarUrl} />

      <div className="flex items-center gap-4">
        <Avatar className="size-20">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name || "Foto"} />
          ) : null}
          <AvatarFallback className="text-text-lg font-semibold">
            {initials(name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={disabled || uploading}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <CameraIcon size={20} weight="duotone" />
              {uploading ? "Enviando..." : avatarUrl ? "Trocar foto" : "Enviar foto"}
            </Button>
            {avatarUrl && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || uploading}
                onClick={handleRemovePhoto}
                className="text-[var(--color-text-error-primary)]"
              >
                <TrashIcon size={20} weight="duotone" />
                Remover
              </Button>
            )}
          </div>
          <p className="text-text-xs text-[var(--color-text-tertiary)]">
            JPG, PNG ou WebP até 2 MB.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="profile_name">Nome completo</Label>
          <Input
            id="profile_name"
            name="full_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={120}
            disabled={disabled}
            placeholder="Ex: João da Silva"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="profile_phone">Telefone</Label>
          <Input
            id="profile_phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={40}
            disabled={disabled}
            placeholder="(11) 99999-9999"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={disabled || pending || uploading}>
          <FloppyDiskIcon size={20} weight="duotone" />
          {pending ? "Salvando..." : "Salvar alterações"}
        </Button>
      </div>
    </form>
  );
}
