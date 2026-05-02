"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { FloppyDiskIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CAPABILITY_GROUPS,
  CAPABILITY_LABELS,
  CAPABILITIES,
  ROLE_PRESETS,
  type Capability,
} from "@/lib/auth/capabilities";

type State = { error?: string; ok?: boolean };
type AssignableRole = "gestor" | "recepcionista" | "barbeiro";

const ROLE_LABEL: Record<AssignableRole, string> = {
  gestor: "Gestor",
  recepcionista: "Recepcionista",
  barbeiro: "Barbeiro",
};

export function PermissionsForm({
  action,
  initialRole,
  initialCapabilities,
  disabled = false,
  selfBlocked = false,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initialRole: AssignableRole;
  initialCapabilities: Capability[] | null;
  disabled?: boolean;
  selfBlocked?: boolean;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [role, setRole] = useState<AssignableRole>(initialRole);
  const [mode, setMode] = useState<"preset" | "custom">(
    initialCapabilities === null ? "preset" : "custom"
  );
  const initialSet = useMemo(
    () =>
      new Set<Capability>(
        initialCapabilities ?? ROLE_PRESETS[initialRole] ?? []
      ),
    [initialCapabilities, initialRole]
  );
  const [enabled, setEnabled] = useState<Set<Capability>>(initialSet);

  useEffect(() => {
    if (state.ok) notify.success("Permissões salvas");
    if (state.error)
      notify.error("Não foi possível salvar", { description: state.error });
  }, [state]);

  const presetSet = new Set<Capability>(ROLE_PRESETS[role] ?? []);
  const effective = mode === "preset" ? presetSet : enabled;

  function toggle(cap: Capability) {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(cap)) next.delete(cap);
      else next.add(cap);
      return next;
    });
  }

  function applyPresetToCustom() {
    setEnabled(new Set(presetSet));
  }

  const isDisabled = disabled || selfBlocked;

  return (
    <form action={formAction} className="grid gap-5">
      {selfBlocked && (
        <div className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] px-4 py-3 text-text-sm text-[var(--color-text-tertiary)]">
          Você não pode alterar suas próprias permissões.
        </div>
      )}

      <fieldset disabled={isDisabled || pending} className="grid gap-5">
        <div className="grid gap-1.5">
          <Label htmlFor="role">Função</Label>
          <Select
            name="role"
            value={role}
            onValueChange={(v) => setRole(v as AssignableRole)}
          >
            <SelectTrigger id="role" className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="barbeiro">Barbeiro</SelectItem>
              <SelectItem value="recepcionista">Recepcionista</SelectItem>
              <SelectItem value="gestor">Gestor</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-text-xs text-[var(--color-text-tertiary)]">
            Define o conjunto padrão de permissões.
          </p>
        </div>

        <label className="flex items-start justify-between gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-4 py-3.5">
          <div className="flex items-start gap-3">
            <ShieldCheckIcon
              size={28}
              weight="duotone"
              className="mt-0.5 text-[var(--color-blue-600)]"
            />
            <div className="grid gap-0.5">
              <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
                Personalizar permissões
              </span>
              <span className="text-text-sm text-[var(--color-text-tertiary)]">
                Quando ligado, escolha exatamente o que essa pessoa pode fazer.
                Quando desligado, segue o padrão da função selecionada.
              </span>
            </div>
          </div>
          <Switch
            checked={mode === "custom"}
            onCheckedChange={(v) => {
              const next = v ? "custom" : "preset";
              setMode(next);
              if (next === "custom") applyPresetToCustom();
            }}
          />
        </label>
        <input type="hidden" name="mode" value={mode} />

        {mode === "custom" && (
          <div className="grid gap-4">
            {CAPABILITY_GROUPS.map((group) => (
              <div
                key={group.label}
                className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-text-sm font-semibold text-[var(--color-text-primary)]">
                    {group.label}
                  </span>
                  <button
                    type="button"
                    className="text-text-xs font-medium text-[var(--color-text-brand-secondary)] hover:underline"
                    onClick={() => {
                      const allOn = group.items.every((c) => enabled.has(c));
                      setEnabled((prev) => {
                        const next = new Set(prev);
                        if (allOn) {
                          for (const c of group.items) next.delete(c);
                        } else {
                          for (const c of group.items) next.add(c);
                        }
                        return next;
                      });
                    }}
                  >
                    {group.items.every((c) => enabled.has(c))
                      ? "Desmarcar tudo"
                      : "Marcar tudo"}
                  </button>
                </div>
                <div className="grid gap-2">
                  {group.items.map((cap) => (
                    <label
                      key={cap}
                      className="flex items-center justify-between gap-3 rounded-lg px-1 py-1.5"
                    >
                      <span className="text-text-sm text-[var(--color-text-secondary)]">
                        {CAPABILITY_LABELS[cap]}
                      </span>
                      <Switch
                        checked={enabled.has(cap)}
                        onCheckedChange={() => toggle(cap)}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
            {CAPABILITIES.map((cap) =>
              enabled.has(cap) ? (
                <input
                  key={cap}
                  type="hidden"
                  name={`cap:${cap}`}
                  value="on"
                />
              ) : null
            )}
          </div>
        )}

        <div className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)] p-3 text-text-xs text-[var(--color-text-tertiary)]">
          <span className="font-semibold text-[var(--color-text-secondary)]">
            Resumo
          </span>{" "}
          · {effective.size} permiss{effective.size === 1 ? "ão" : "ões"} ativa
          {effective.size === 1 ? "" : "s"}
          {mode === "preset"
            ? ` · padrão de ${ROLE_LABEL[role]}`
            : " · personalizadas"}
          .
        </div>
      </fieldset>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={pending || isDisabled}
          className="h-11"
        >
          <FloppyDiskIcon size={28} weight="duotone" />
          {pending ? "Salvando..." : "Salvar permissões"}
        </Button>
      </div>
    </form>
  );
}
