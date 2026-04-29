"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { adjustPointsAction } from "../../actions";

type State = { error?: string; ok?: boolean };

export function AdjustPointsForm({ clientId }: { clientId: string }) {
  const [state, formAction, pending] = useActionState<State, FormData>(
    adjustPointsAction,
    {}
  );
  useEffect(() => {
    if (state.ok) notify.success("Ajuste lançado");
    if (state.error) notify.error("Erro", { description: state.error });
  }, [state]);

  return (
    <form action={formAction} className="grid gap-3">
      <input type="hidden" name="client_id" value={clientId} />
      <div className="grid gap-1.5">
        <Label htmlFor="adjust_points">Pontos (use número negativo para remover)</Label>
        <Input
          id="adjust_points"
          name="points"
          type="number"
          step="1"
          required
          placeholder="Ex.: 50 ou -20"
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="adjust_description">Motivo</Label>
        <Input
          id="adjust_description"
          name="description"
          maxLength={200}
          required
          placeholder="Ex.: Bônus por indicação"
        />
      </div>
      <Button type="submit" variant="outline" disabled={pending} className="h-10">
        {pending ? "Lançando..." : "Lançar ajuste"}
      </Button>
    </form>
  );
}
