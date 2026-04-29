"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { CalendarPlusIcon, TrashIcon } from "@phosphor-icons/react";
import { notify } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDateTimeBR } from "@/lib/format";

type State = { error?: string; ok?: boolean };

export type TimeOffRow = {
  id: string;
  starts_at: string;
  ends_at: string;
  reason: string | null;
};

export function BarberTimeOffForm({
  createAction,
  deleteAction,
  upcoming,
  disabled = false,
}: {
  createAction: (prev: State, fd: FormData) => Promise<State>;
  deleteAction: (id: string) => Promise<void>;
  upcoming: TimeOffRow[];
  disabled?: boolean;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    createAction,
    {}
  );
  const [formKey, setFormKey] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startDelete] = useTransition();

  useEffect(() => {
    if (state.ok) {
      notify.success("Folga registrada", {
        description: "A agenda já recusa agendamentos nesse período.",
      });
      setFormKey((k) => k + 1);
    }
    if (state.error) {
      notify.error("Não foi possível registrar", { description: state.error });
    }
  }, [state]);

  function handleDelete(id: string) {
    setDeletingId(id);
    startDelete(async () => {
      try {
        await deleteAction(id);
        notify.success("Folga removida");
      } catch (e) {
        notify.error("Não foi possível remover", {
          description: e instanceof Error ? e.message : "Tente novamente.",
        });
      } finally {
        setDeletingId(null);
      }
    });
  }

  return (
    <div className="grid gap-6">
      <form key={formKey} action={formAction} className="grid gap-4">
        <fieldset disabled={disabled || pending} className="grid gap-3 md:grid-cols-2">
          <div className="grid gap-1">
            <label
              htmlFor="starts_at"
              className="text-text-xs font-medium text-[var(--color-text-secondary)]"
            >
              Início
            </label>
            <Input
              id="starts_at"
              name="starts_at"
              type="datetime-local"
              required
            />
          </div>
          <div className="grid gap-1">
            <label
              htmlFor="ends_at"
              className="text-text-xs font-medium text-[var(--color-text-secondary)]"
            >
              Término
            </label>
            <Input id="ends_at" name="ends_at" type="datetime-local" required />
          </div>
          <div className="grid gap-1 md:col-span-2">
            <label
              htmlFor="reason"
              className="text-text-xs font-medium text-[var(--color-text-secondary)]"
            >
              Motivo (opcional)
            </label>
            <Input
              id="reason"
              name="reason"
              type="text"
              maxLength={200}
              placeholder="Ex.: almoço, médico, férias..."
            />
          </div>
        </fieldset>
        <div className="flex justify-end">
          <Button type="submit" disabled={pending || disabled} className="h-11">
            <CalendarPlusIcon size={28} weight="duotone" />
            {pending ? "Registrando..." : "Registrar folga"}
          </Button>
        </div>
      </form>

      <div className="grid gap-2">
        <h3 className="text-text-sm font-semibold text-[var(--color-text-primary)]">
          Próximas folgas
        </h3>
        {upcoming.length === 0 ? (
          <p className="rounded-lg border border-dashed border-[var(--color-border-secondary)] px-4 py-6 text-center text-text-sm text-[var(--color-text-tertiary)]">
            Nenhuma folga futura registrada.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--color-border-secondary)] rounded-lg border border-[var(--color-border-secondary)]">
            {upcoming.map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-center gap-3 px-4 py-3"
              >
                <div className="grid min-w-0 flex-1 gap-0.5">
                  <span className="text-text-sm font-medium text-[var(--color-text-primary)]">
                    {formatDateTimeBR(row.starts_at)} → {formatDateTimeBR(row.ends_at)}
                  </span>
                  {row.reason && (
                    <span className="text-text-xs text-[var(--color-text-tertiary)]">
                      {row.reason}
                    </span>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(row.id)}
                  disabled={disabled || deletingId === row.id}
                  className="text-[var(--color-error-600)] hover:text-[var(--color-error-700)]"
                >
                  <TrashIcon size={20} weight="duotone" />
                  {deletingId === row.id ? "Removendo..." : "Remover"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
