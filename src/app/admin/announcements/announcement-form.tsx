"use client";

import { useActionState, useEffect, useState } from "react";
import {
  CalendarBlankIcon,
  FloppyDiskIcon,
  LinkIcon,
  TextTIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type State = { error?: string; ok?: boolean };

export type AnnouncementFormValues = {
  title: string;
  body: string;
  severity: "info" | "success" | "warning" | "critical";
  audience: "all" | "selected";
  audience_shop_ids: string[];
  link_url: string | null;
  link_label: string | null;
  expires_at: string | null;
};

type ShopOption = { id: string; name: string; slug: string };

export function AnnouncementForm({
  action,
  initial,
  shops,
  submitLabel,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initial?: Partial<AnnouncementFormValues>;
  shops: ShopOption[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [audience, setAudience] = useState<string>(initial?.audience ?? "all");
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initial?.audience_shop_ids ?? [])
  );

  useEffect(() => {
    if (state.ok)
      notify.success("Comunicado salvo", {
        description: "As alterações foram aplicadas.",
      });
    if (state.error)
      notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  function toggleShop(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <form action={formAction} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="title">Título</Label>
          <div className="relative">
            <TextTIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="title"
              name="title"
              required
              defaultValue={initial?.title ?? ""}
              placeholder="Manutenção programada — domingo 02h"
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5 md:col-span-2">
          <Label htmlFor="body">Mensagem</Label>
          <textarea
            id="body"
            name="body"
            required
            defaultValue={initial?.body ?? ""}
            rows={6}
            placeholder="Descreva o comunicado em detalhes..."
            className="rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 text-text-sm leading-relaxed text-[var(--color-text-primary)] outline-none focus:border-[var(--color-blue-500)] focus:ring-2 focus:ring-[var(--color-blue-100)]"
          />
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="severity">Tipo</Label>
          <Select name="severity" defaultValue={initial?.severity ?? "info"}>
            <SelectTrigger id="severity">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Informativo</SelectItem>
              <SelectItem value="success">Sucesso</SelectItem>
              <SelectItem value="warning">Atenção</SelectItem>
              <SelectItem value="critical">Crítico</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="expires_at">Expira em (opcional)</Label>
          <div className="relative">
            <CalendarBlankIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="expires_at"
              name="expires_at"
              type="datetime-local"
              defaultValue={
                initial?.expires_at
                  ? new Date(initial.expires_at).toISOString().slice(0, 16)
                  : ""
              }
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="link_url">Link (opcional)</Label>
          <div className="relative">
            <LinkIcon
              size={28}
              weight="duotone"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
            />
            <Input
              id="link_url"
              name="link_url"
              type="url"
              defaultValue={initial?.link_url ?? ""}
              placeholder="https://..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="link_label">Rótulo do link</Label>
          <Input
            id="link_label"
            name="link_label"
            defaultValue={initial?.link_label ?? ""}
            placeholder="Saber mais"
          />
        </div>
      </div>

      <fieldset className="grid gap-3 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4">
        <legend className="px-1 text-text-sm font-medium text-[var(--color-text-primary)]">
          Audiência
        </legend>
        <div className="flex flex-wrap gap-4 text-text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="audience"
              value="all"
              checked={audience === "all"}
              onChange={() => setAudience("all")}
            />
            Todas as barbearias
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="audience"
              value="selected"
              checked={audience === "selected"}
              onChange={() => setAudience("selected")}
            />
            Selecionar barbearias
          </label>
        </div>
        {audience === "selected" && (
          <div className="grid max-h-64 gap-2 overflow-auto rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3">
            {shops.length === 0 ? (
              <p className="text-text-sm text-[var(--color-text-tertiary)]">
                Nenhuma barbearia cadastrada.
              </p>
            ) : (
              shops.map((s) => (
                <label
                  key={s.id}
                  className="flex items-center gap-2 text-text-sm text-[var(--color-text-primary)]"
                >
                  <input
                    type="checkbox"
                    name="audience_shop_ids"
                    value={s.id}
                    checked={selected.has(s.id)}
                    onChange={() => toggleShop(s.id)}
                  />
                  <span>{s.name}</span>
                  <span className="font-mono text-text-xs text-[var(--color-text-tertiary)]">
                    {s.slug}
                  </span>
                </label>
              ))
            )}
          </div>
        )}
      </fieldset>

      <div className="flex justify-end">
        <Button type="submit" size="lg" disabled={pending}>
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
