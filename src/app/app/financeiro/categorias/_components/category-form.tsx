"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import {
  CATEGORY_COLOR_CLASS,
  CATEGORY_COLORS,
  type CategoryColor,
} from "@/lib/zod/financeiro";

type State = { error?: string; ok?: boolean };

export function CategoryForm({
  action,
  initial,
  onSaved,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  initial?: { id: string; name: string; color: CategoryColor; is_active: boolean };
  onSaved?: () => void;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    action,
    {}
  );
  const [color, setColor] = useState<CategoryColor>(initial?.color ?? "gray");

  useEffect(() => {
    if (state.ok) {
      notify.success(initial ? "Categoria atualizada" : "Categoria criada");
      onSaved?.();
    }
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state, initial, onSaved]);

  return (
    <form action={formAction} className="grid gap-4">
      {initial && <input type="hidden" name="id" value={initial.id} />}
      <input type="hidden" name="color" value={color} />

      <div className="grid gap-1.5">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          defaultValue={initial?.name ?? ""}
          maxLength={60}
          required
          placeholder="Ex.: Aluguel"
        />
      </div>

      <div className="grid gap-1.5">
        <Label>Cor</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition ${
                CATEGORY_COLOR_CLASS[c]
              } ${color === c ? "ring-2 ring-offset-2 ring-[var(--color-blue-500)]" : ""}`}
              aria-label={c}
            >
              {color === c && <CheckIcon size={16} weight="bold" />}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-text-sm">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={initial?.is_active ?? true}
          value="true"
          className="h-4 w-4"
        />
        Categoria ativa
      </label>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={pending} className="h-10">
          {pending ? "Salvando..." : initial ? "Salvar" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
