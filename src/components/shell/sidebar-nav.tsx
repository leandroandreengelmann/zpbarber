"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CalendarBlankIcon,
  CaretDownIcon,
  CashRegisterIcon,
  ChartBarIcon,
  ChartLineUpIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  GearSixIcon,
  GiftIcon,
  HeadsetIcon,
  MegaphoneIcon,
  PackageIcon,
  PulseIcon,
  ReceiptIcon,
  ScissorsIcon,
  ShieldCheckIcon,
  StarIcon,
  StorefrontIcon,
  UserSwitchIcon,
  UsersThreeIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ICONS = {
  calendar: CalendarBlankIcon,
  cashRegister: CashRegisterIcon,
  chartBar: ChartBarIcon,
  chartLineUp: ChartLineUpIcon,
  creditCard: CreditCardIcon,
  currencyDollar: CurrencyDollarIcon,
  gear: GearSixIcon,
  gift: GiftIcon,
  headset: HeadsetIcon,
  megaphone: MegaphoneIcon,
  package: PackageIcon,
  pulse: PulseIcon,
  receipt: ReceiptIcon,
  scissors: ScissorsIcon,
  shieldCheck: ShieldCheckIcon,
  star: StarIcon,
  storefront: StorefrontIcon,
  userSwitch: UserSwitchIcon,
  usersThree: UsersThreeIcon,
  whatsapp: WhatsappLogoIcon,
} satisfies Record<string, Icon>;

export type NavIconName = keyof typeof ICONS;

export type NavItem = {
  href: string;
  label: string;
  icon?: NavIconName;
  disabled?: boolean;
  exact?: boolean;
  children?: NavItem[];
};

export type NavSection = {
  title?: string;
  items: NavItem[];
};

function isItemActive(pathname: string, item: NavItem) {
  if (item.exact) return pathname === item.href;
  return (
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(item.href + "/"))
  );
}

function NavLeaf({
  item,
  isActive,
  indent,
}: {
  item: NavItem;
  isActive: boolean;
  indent?: boolean;
}) {
  const Icon = item.icon ? ICONS[item.icon] : null;
  return (
    <Link
      href={item.disabled ? "#" : item.href}
      aria-current={isActive ? "page" : undefined}
      aria-disabled={item.disabled}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
        indent && "ml-7 pl-3",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
        item.disabled && "pointer-events-none opacity-50"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 h-5 -translate-y-1/2 w-0.5 rounded-full bg-primary" />
      )}
      {Icon && (
        <Icon
          size={28}
          weight="duotone"
          className={cn(
            "shrink-0",
            isActive
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          )}
        />
      )}
      <span className="flex-1 truncate">{item.label}</span>
      {item.disabled && (
        <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
          em breve
        </span>
      )}
    </Link>
  );
}

function NavGroup({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const Icon = item.icon ? ICONS[item.icon] : null;
  const anyChildActive = (item.children ?? []).some((c) =>
    isItemActive(pathname, c)
  );
  const groupActive =
    isItemActive(pathname, { ...item, children: undefined }) || anyChildActive;
  const [open, setOpen] = useState<boolean>(groupActive);

  return (
    <div className="flex flex-col gap-0.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "group relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
          groupActive
            ? "text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        )}
      >
        {Icon && (
          <Icon
            size={28}
            weight="duotone"
            className={cn(
              "shrink-0",
              groupActive
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground"
            )}
          />
        )}
        <span className="flex-1 truncate text-left">{item.label}</span>
        <CaretDownIcon
          size={14}
          weight="bold"
          className={cn(
            "shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="flex flex-col gap-0.5">
          {(item.children ?? []).map((child) => (
            <NavLeaf
              key={child.href}
              item={child}
              isActive={isItemActive(pathname, child)}
              indent
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function SidebarNav({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-5">
      {sections.map((section, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          {section.title && (
            <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {section.title}
            </div>
          )}
          {section.items.map((item) =>
            item.children && item.children.length > 0 ? (
              <NavGroup key={item.href} item={item} />
            ) : (
              <NavLeaf
                key={item.href}
                item={item}
                isActive={isItemActive(pathname, item)}
              />
            )
          )}
        </div>
      ))}
    </nav>
  );
}
