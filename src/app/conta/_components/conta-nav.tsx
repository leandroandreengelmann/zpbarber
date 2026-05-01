"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ContaTab({
  href,
  icon,
  label,
  exact,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, href, exact);
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-text-sm font-medium transition-colors ${
        active
          ? "border-[var(--color-blue-600)] text-[var(--color-text-primary)]"
          : "border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

export function ContaBottomTab({
  href,
  icon,
  label,
  exact,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const active = isActive(pathname, href, exact);
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
        active
          ? "text-[var(--color-blue-600)]"
          : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {icon}
      {label}
    </Link>
  );
}
