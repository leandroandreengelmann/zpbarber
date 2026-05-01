import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ThemeToggle } from "@/components/theme-toggle";

function shopInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = words[0]?.[0] ?? "";
  const second = words[1]?.[0] ?? "";
  return (first + second).toUpperCase();
}

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
  const { data } = await supabase.rpc("fn_public_shop_meta", { p_slug: slug });
  const shop = data as
    | {
        id: string;
        slug: string;
        name: string;
        primary_color: string | null;
        logo_url: string | null;
      }
    | null;

  if (!shop) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg-primary)]">
      <header className="sticky top-0 z-30 border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-bg-primary)]/70">
        <div className="mx-auto flex h-32 max-w-5xl items-center justify-between gap-4 px-4 sm:h-40 sm:px-6">
          <Link
            href={`/${shop.slug}`}
            className="flex items-center gap-4 rounded-md transition-opacity hover:opacity-80 sm:gap-5"
          >
            {shop.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={shop.logo_url}
                alt={shop.name}
                className="size-24 rounded-xl object-cover sm:size-32"
              />
            ) : (
              <div
                aria-hidden
                className="flex size-24 items-center justify-center rounded-xl text-display-md font-bold text-white sm:size-32 sm:text-display-lg"
                style={{
                  backgroundColor:
                    shop.primary_color || "var(--color-blue-600)",
                }}
              >
                {shopInitials(shop.name)}
              </div>
            )}
            <span className="text-display-xs font-bold tracking-tight text-[var(--color-text-primary)] sm:text-display-sm">
              {shop.name}
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>
      <footer className="border-t border-[var(--color-border-secondary)]">
        <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-6 text-text-sm text-[var(--color-text-tertiary)] sm:px-6 sm:py-8">
          <span>
            © {new Date().getFullYear()} {shop.name}
          </span>
        </div>
      </footer>
    </div>
  );
}
