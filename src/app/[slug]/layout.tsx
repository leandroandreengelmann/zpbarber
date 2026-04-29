import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScissorsIcon } from "@phosphor-icons/react/dist/ssr";
import { createClient } from "@/lib/supabase/server";
import { ThemeToggle } from "@/components/theme-toggle";

const RESERVED = new Set([
  "admin",
  "app",
  "auth",
  "api",
  "colors",
  "_next",
  "favicon.ico",
]);

export default async function PublicShopLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (RESERVED.has(slug)) notFound();

  const supabase = await createClient();
  const { data: shop } = await supabase
    .from("barbershops")
    .select("id, slug, name, primary_color, logo_url")
    .eq("slug", slug)
    .maybeSingle();

  if (!shop) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-primary)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg-primary)]/70">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href={`/${shop.slug}`}
            className="flex items-center gap-2.5 rounded-md transition-opacity hover:opacity-80"
          >
            {shop.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.logo_url}
                alt={shop.name}
                className="size-9 rounded-lg object-cover"
              />
            ) : (
              <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--color-blue-600)] text-white">
                <ScissorsIcon size={28} weight="duotone" />
              </div>
            )}
            <span className="text-text-md font-semibold tracking-tight text-[var(--color-text-primary)]">
              {shop.name}
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>
      <footer className="border-t border-[var(--color-border-secondary)]">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-3 px-4 text-text-xs text-[var(--color-text-tertiary)] sm:px-6">
          <span>{shop.name}</span>
          <span>Powered by ZP Barber</span>
        </div>
      </footer>
    </div>
  );
}
