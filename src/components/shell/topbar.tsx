import Link from "next/link";
import { SignOutIcon, UserCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { signOutAction } from "@/app/auth/login/actions";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

export function Topbar({
  title,
  subtitle,
  email,
}: {
  title: string;
  subtitle?: string;
  email?: string | null;
}) {
  return (
    <header
      className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-sm font-semibold tracking-tight text-foreground">
          {title}
        </span>
        {subtitle && (
          <span className="truncate text-xs text-muted-foreground">{subtitle}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Separator orientation="vertical" className="!h-5" />
        <Link
          href="/app/perfil"
          className="hidden items-center gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground md:flex"
          title="Meu perfil"
        >
          <UserCircleIcon size={28} weight="duotone" />
          {email && <span>{email}</span>}
        </Link>
        <form action={signOutAction}>
          <Button type="submit" variant="outline" size="sm">
            <SignOutIcon size={28} weight="duotone" />
            Sair
          </Button>
        </form>
      </div>
    </header>
  );
}
