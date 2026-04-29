"use client";

import { useActionState, useEffect, useState } from "react";
import {
  CheckCircleIcon,
  FloppyDiskIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { notify } from "@/components/ui/toast";
import { formatMoney } from "@/lib/format";

type State = { error?: string; ok?: boolean };

export function PayoutForm({
  action,
  defaultPeriodStart,
  defaultPeriodEnd,
  defaultTotalCents,
  disabled = false,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  defaultPeriodStart: string;
  defaultPeriodEnd: string;
  defaultTotalCents: number;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isEmpty = defaultTotalCents <= 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button disabled={disabled || isEmpty} className="h-11">
            <PlusIcon size={28} weight="duotone" />
            Registrar pagamento
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar pagamento</DialogTitle>
          <DialogDescription>
            Fecha o período e marca a comissão como paga. As linhas desse
            intervalo deixam de aparecer como pendentes.
          </DialogDescription>
        </DialogHeader>

        <PayoutFormInner
          action={action}
          defaultPeriodStart={defaultPeriodStart}
          defaultPeriodEnd={defaultPeriodEnd}
          defaultTotalCents={defaultTotalCents}
          onSuccess={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function PayoutFormInner({
  action,
  defaultPeriodStart,
  defaultPeriodEnd,
  defaultTotalCents,
  onSuccess,
  onCancel,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  defaultPeriodStart: string;
  defaultPeriodEnd: string;
  defaultTotalCents: number;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [state, formAction, pending] = useActionState<State, FormData>(action, {});
  const [method, setMethod] = useState<string>("pix");
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (state.ok) {
      notify.success("Pagamento registrado", {
        description: "O período foi fechado.",
      });
      onSuccess();
    }
    if (state.error) {
      notify.error("Não foi possível registrar", { description: state.error });
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="period_start" value={defaultPeriodStart} />
      <input type="hidden" name="period_end" value={defaultPeriodEnd} />
      <input type="hidden" name="total_cents" value={defaultTotalCents} />
      <input type="hidden" name="method" value={method} />

      <div className="grid gap-1.5">
        <Label>Total a pagar</Label>
        <div className="rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)]/40 px-3 py-2.5 text-display-xs font-semibold tabular-nums text-[var(--color-text-primary)]">
          {formatMoney(defaultTotalCents)}
        </div>
        <span className="text-text-xs text-[var(--color-text-tertiary)]">
          Soma das comissões pendentes do período selecionado.
        </span>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="method">Método</Label>
        <Select value={method} onValueChange={(v) => setMethod(String(v))}>
          <SelectTrigger id="method">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pix">Pix</SelectItem>
            <SelectItem value="cash">Dinheiro</SelectItem>
            <SelectItem value="bank_transfer">Transferência</SelectItem>
            <SelectItem value="other">Outro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="paid_at">Data do pagamento</Label>
        <Input
          id="paid_at"
          name="paid_at"
          type="date"
          required
          defaultValue={today}
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="notes">Observações</Label>
        <Input
          id="notes"
          name="notes"
          placeholder="Opcional"
          maxLength={500}
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={pending}>
          Cancelar
        </Button>
        <Button type="submit" disabled={pending} className="h-11">
          {pending ? (
            <>
              <FloppyDiskIcon size={28} weight="duotone" />
              Salvando...
            </>
          ) : (
            <>
              <CheckCircleIcon size={28} weight="duotone" />
              Confirmar pagamento
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
