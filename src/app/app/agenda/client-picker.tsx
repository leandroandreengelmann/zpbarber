"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  CaretDownIcon,
  EnvelopeSimpleIcon,
  FloppyDiskIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  UserCircleIcon,
  UserPlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ClientOpt } from "./appointment-form";
import type { createClientAction } from "./actions";

type CreateState = {
  error?: string;
  ok?: boolean;
  client?: { id: string; full_name: string; phone: string | null };
};

export function ClientPicker({
  clients: initialClients,
  value,
  onChange,
  createAction,
}: {
  clients: ClientOpt[];
  value: string;
  onChange: (id: string) => void;
  createAction: typeof createClientAction;
}) {
  const [clients, setClients] = useState<ClientOpt[]>(initialClients);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"select" | "create">("select");
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setMode("select");
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (open && mode === "select") {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open, mode]);

  const selected = clients.find((c) => c.id === value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter((c) => {
      const name = c.full_name.toLowerCase();
      const phone = (c.phone ?? "").toLowerCase();
      return name.includes(q) || phone.includes(q);
    });
  }, [clients, query]);

  function pick(id: string) {
    onChange(id);
    setOpen(false);
    setMode("select");
    setQuery("");
  }

  function handleCreated(c: { id: string; full_name: string; phone: string | null }) {
    const newClient: ClientOpt = {
      id: c.id,
      full_name: c.full_name,
      phone: c.phone,
    };
    setClients((prev) => {
      if (prev.some((p) => p.id === c.id)) return prev;
      return [newClient, ...prev];
    });
    onChange(c.id);
    setOpen(false);
    setMode("select");
    setQuery("");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3.5 text-left text-text-md text-[var(--color-text-primary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)] transition-shadow outline-none focus-visible:border-[var(--color-border-brand)] focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--color-border-brand)_24%,transparent)] aria-expanded:border-[var(--color-border-brand)]"
      >
        <span className="line-clamp-1 flex-1 truncate">
          {selected ? (
            <>
              {selected.full_name}
              {selected.phone ? (
                <span className="text-[var(--color-text-tertiary)]">
                  {" "}· {selected.phone}
                </span>
              ) : null}
            </>
          ) : (
            <span className="text-[var(--color-text-placeholder)]">
              Selecione ou cadastre um cliente
            </span>
          )}
        </span>
        <CaretDownIcon
          size={20}
          weight="regular"
          className="shrink-0 text-[var(--color-fg-quaternary)]"
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-[60vh] overflow-hidden rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] shadow-lg">
          {mode === "select" ? (
            <div className="flex max-h-[60vh] flex-col">
              <div className="relative border-b border-[var(--color-border-secondary)] p-2">
                <MagnifyingGlassIcon
                  size={20}
                  weight="duotone"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
                />
                <Input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por nome ou telefone..."
                  className="h-10 pl-9"
                />
              </div>
              <button
                type="button"
                onClick={() => setMode("create")}
                className="flex items-center gap-2 border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-3 py-2.5 text-left text-text-sm font-medium text-[var(--color-text-brand-secondary)] hover:bg-[var(--color-bg-tertiary)]"
              >
                <UserPlusIcon size={20} weight="duotone" />
                Cadastrar novo cliente
              </button>
              <div className="overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="px-3 py-4 text-center text-text-sm text-[var(--color-text-tertiary)]">
                    {query
                      ? "Nenhum cliente encontrado."
                      : "Nenhum cliente cadastrado."}
                  </div>
                ) : (
                  <ul role="listbox" className="py-1">
                    {filtered.map((c) => (
                      <li key={c.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={c.id === value}
                          onClick={() => pick(c.id)}
                          className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-text-sm hover:bg-[var(--color-bg-secondary)] aria-selected:bg-[var(--color-bg-brand-primary)] aria-selected:text-[var(--color-text-brand-primary)]"
                        >
                          <UserCircleIcon
                            size={20}
                            weight="duotone"
                            className="shrink-0 text-[var(--color-fg-quaternary)]"
                          />
                          <span className="flex-1 truncate">
                            {c.full_name}
                            {c.phone ? (
                              <span className="text-[var(--color-text-tertiary)]">
                                {" "}· {c.phone}
                              </span>
                            ) : null}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <InlineCreateForm
              action={createAction}
              onCancel={() => setMode("select")}
              onCreated={handleCreated}
            />
          )}
        </div>
      )}
    </div>
  );
}

function InlineCreateForm({
  action,
  onCancel,
  onCreated,
}: {
  action: typeof createClientAction;
  onCancel: () => void;
  onCreated: (c: { id: string; full_name: string; phone: string | null }) => void;
}) {
  const [pending, startTransition] = useTransition();
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function submit() {
    const full_name = fullNameRef.current?.value.trim() ?? "";
    const phone = phoneRef.current?.value.trim() ?? "";
    const email = emailRef.current?.value.trim() ?? "";
    if (!full_name) {
      notify.error("Nome é obrigatório");
      fullNameRef.current?.focus();
      return;
    }
    if (phone.length < 8) {
      notify.error("Informe um telefone válido");
      phoneRef.current?.focus();
      return;
    }
    const fd = new FormData();
    fd.set("full_name", full_name);
    fd.set("phone", phone);
    fd.set("email", email);
    startTransition(async () => {
      const result: CreateState = await action({}, fd);
      if (result.ok && result.client) {
        notify.success("Cliente cadastrado", {
          description: "Selecionado automaticamente no agendamento.",
        });
        onCreated(result.client);
      } else if (result.error) {
        notify.error("Não foi possível cadastrar", { description: result.error });
      }
    });
  }

  return (
    <div className="grid gap-3 p-3"
      onKeyDown={(e) => {
        if (e.key === "Enter" && !pending) {
          e.preventDefault();
          submit();
        }
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
          Novo cliente
        </span>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancelar"
          className="rounded-md p-1 text-[var(--color-fg-quaternary)] hover:bg-[var(--color-bg-secondary)]"
        >
          <XIcon size={18} weight="bold" />
        </button>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="qc_full_name" className="text-text-xs">
          Nome
        </Label>
        <div className="relative">
          <UserCircleIcon
            size={20}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            ref={fullNameRef}
            id="qc_full_name"
            name="full_name"
            required
            placeholder="João da Silva"
            className="h-10 pl-9"
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="qc_phone" className="text-text-xs">
          Telefone
        </Label>
        <div className="relative">
          <PhoneIcon
            size={20}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            ref={phoneRef}
            id="qc_phone"
            name="phone"
            type="tel"
            required
            minLength={8}
            placeholder="(11) 90000-0000"
            className="h-10 pl-9"
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="qc_email" className="text-text-xs">
          E-mail (opcional)
        </Label>
        <div className="relative">
          <EnvelopeSimpleIcon
            size={20}
            weight="duotone"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-fg-quaternary)]"
          />
          <Input
            ref={emailRef}
            id="qc_email"
            name="email"
            type="email"
            placeholder="cliente@email.com"
            className="h-10 pl-9"
          />
        </div>
      </div>
      <Button
        type="button"
        onClick={submit}
        disabled={pending}
        className="h-10 w-full"
      >
        <FloppyDiskIcon size={20} weight="duotone" />
        {pending ? "Cadastrando..." : "Cadastrar e selecionar"}
      </Button>
    </div>
  );
}
