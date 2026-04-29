"use client";

import { useActionState, useEffect, useState } from "react";
import { PaperPlaneTiltIcon, StarIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/toast";
import { submitPublicReviewAction, type PublicReviewState } from "./actions";

const RATING_LABELS = ["", "Muito ruim", "Ruim", "Regular", "Bom", "Excelente"];

export function PublicReviewForm({
  slug,
  appointmentId,
}: {
  slug: string;
  appointmentId: string;
}) {
  const [state, formAction, pending] = useActionState<PublicReviewState, FormData>(
    submitPublicReviewAction,
    {}
  );
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    if (state.error) {
      notify.error("Não foi possível enviar", { description: state.error });
    }
  }, [state]);

  if (state.ok) {
    return (
      <div className="grid gap-3 rounded-2xl border border-[var(--color-success-200)] bg-[var(--color-success-50)] p-6 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[var(--color-success-100)] text-[var(--color-success-600)]">
          <StarIcon size={28} weight="fill" />
        </div>
        <p className="text-text-lg font-semibold text-[var(--color-text-primary)]">
          Obrigado pela sua avaliação!
        </p>
        <p className="text-text-sm text-[var(--color-text-tertiary)]">
          Sua opinião ajuda a barbearia a oferecer um serviço cada vez melhor.
        </p>
      </div>
    );
  }

  const display = hover || rating;

  return (
    <form action={formAction} className="grid gap-5">
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="appointment_id" value={appointmentId} />
      <input type="hidden" name="rating" value={rating} />

      <div className="grid gap-2">
        <Label>Sua nota</Label>
        <div className="flex flex-wrap items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => {
            const active = n <= display;
            return (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${n} estrela${n > 1 ? "s" : ""}`}
                className="rounded-md p-1 transition hover:scale-110"
              >
                <StarIcon
                  size={44}
                  weight={active ? "fill" : "duotone"}
                  className={
                    active
                      ? "text-[#F5A524]"
                      : "text-[var(--color-fg-quaternary)]"
                  }
                />
              </button>
            );
          })}
          {display > 0 && (
            <span className="ml-2 text-text-md font-semibold text-[var(--color-text-primary)]">
              {RATING_LABELS[display]}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="comment">Comentário (opcional)</Label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          maxLength={1000}
          placeholder="Conte como foi a sua experiência..."
          className="w-full rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 py-2 text-text-md text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-fg-quaternary)] focus:border-[var(--color-blue-500)] focus:ring-2 focus:ring-[var(--color-blue-100)]"
        />
      </div>

      <Button
        type="submit"
        disabled={pending || rating === 0}
        className="h-12 w-full"
      >
        <PaperPlaneTiltIcon size={28} weight="duotone" />
        {pending ? "Enviando..." : "Enviar avaliação"}
      </Button>
    </form>
  );
}
