import Link from "next/link";
import { LockIcon } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export function Forbidden({
  title = "Sem permissão",
  description = "Você não tem acesso a esta área. Peça ao gestor da barbearia para liberar a permissão necessária.",
  homeHref = "/app",
}: {
  title?: string;
  description?: string;
  homeHref?: string;
}) {
  return (
    <div className="mx-auto grid w-full max-w-xl gap-4">
      <Card>
        <CardContent className="grid gap-4 py-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-bg-secondary)] text-[var(--color-fg-quaternary)]">
            <LockIcon size={32} weight="duotone" />
          </div>
          <div className="grid gap-1">
            <h1 className="text-display-xs font-semibold tracking-tight text-[var(--color-text-primary)]">
              {title}
            </h1>
            <p className="text-text-md text-[var(--color-text-tertiary)]">
              {description}
            </p>
          </div>
          <div>
            <Link
              href={homeHref}
              className={buttonVariants({ variant: "outline" })}
            >
              Voltar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
