"use client";

import { useFormStatus } from "react-dom";
import { CircleNotchIcon, SignInIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function LoginSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      aria-busy={pending}
      className="mt-1 h-11 w-full text-text-md font-semibold"
    >
      {pending ? (
        <>
          <CircleNotchIcon size={28} weight="bold" className="animate-spin" />
          Entrando...
        </>
      ) : (
        <>
          <SignInIcon size={28} weight="duotone" />
          Entrar
        </>
      )}
    </Button>
  );
}
