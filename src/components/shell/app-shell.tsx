import { type ReactNode } from "react";
import { SidebarNav, type NavSection } from "./sidebar-nav";
import { Topbar } from "./topbar";
import { BottomNav, type BottomNavItem } from "./bottom-nav";
import { BrandMark } from "@/components/brand-mark";

export function AppShell({
  brandSubtitle,
  sections,
  topbarTitle,
  topbarSubtitle,
  email,
  bottomNavPrimary,
  children,
}: {
  brandSubtitle?: string;
  sections: NavSection[];
  topbarTitle: string;
  topbarSubtitle?: string;
  email?: string | null;
  bottomNavPrimary?: BottomNavItem[];
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] w-full bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex shrink-0 items-center border-b border-sidebar-border px-5 py-4">
          <BrandMark subtitle={brandSubtitle} />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <SidebarNav sections={sections} />
        </div>
        <div className="border-t border-sidebar-border px-5 py-3 text-[11px] text-muted-foreground">
          v0.1 · Fase 1
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <Topbar title={topbarTitle} subtitle={topbarSubtitle} email={email} />
        <div
          className="flex-1 overflow-y-auto p-4 md:p-8"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom) + 96px)",
          }}
        >
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </div>
      </main>
      <BottomNav sections={sections} primary={bottomNavPrimary} />
    </div>
  );
}
