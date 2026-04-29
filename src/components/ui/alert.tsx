import * as React from "react";
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

type Variant = "success" | "error" | "warning" | "info";

const TONES: Record<
  Variant,
  {
    bg: string;
    border: string;
    iconBg: string;
    iconFg: string;
    accent: string;
    title: string;
    body: string;
  }
> = {
  success: {
    bg: "bg-[var(--color-success-50)]",
    border: "border-[var(--color-success-200)]",
    iconBg: "bg-[var(--color-success-100)]",
    iconFg: "text-[var(--color-success-600)]",
    accent: "bg-[var(--color-success-500)]",
    title: "text-[var(--color-success-800)]",
    body: "text-[var(--color-success-700)]",
  },
  error: {
    bg: "bg-[var(--color-error-50)]",
    border: "border-[var(--color-error-200)]",
    iconBg: "bg-[var(--color-error-100)]",
    iconFg: "text-[var(--color-error-600)]",
    accent: "bg-[var(--color-error-500)]",
    title: "text-[var(--color-error-800)]",
    body: "text-[var(--color-error-700)]",
  },
  warning: {
    bg: "bg-[var(--color-warning-50)]",
    border: "border-[var(--color-warning-200)]",
    iconBg: "bg-[var(--color-warning-100)]",
    iconFg: "text-[var(--color-warning-600)]",
    accent: "bg-[var(--color-warning-500)]",
    title: "text-[var(--color-warning-800)]",
    body: "text-[var(--color-warning-700)]",
  },
  info: {
    bg: "bg-[var(--color-blue-50)]",
    border: "border-[var(--color-blue-200)]",
    iconBg: "bg-[var(--color-blue-100)]",
    iconFg: "text-[var(--color-blue-600)]",
    accent: "bg-[var(--color-blue-500)]",
    title: "text-[var(--color-blue-800)]",
    body: "text-[var(--color-blue-700)]",
  },
};

function VariantIcon({ variant }: { variant: Variant }) {
  const props = { size: 22, weight: "duotone" as const };
  switch (variant) {
    case "success":
      return <CheckCircleIcon {...props} />;
    case "error":
      return <XCircleIcon {...props} />;
    case "warning":
      return <WarningIcon {...props} />;
    case "info":
      return <InfoIcon {...props} />;
  }
}

export function Alert({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: Variant;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const tone = TONES[variant];
  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      className={cn(
        "relative flex items-start gap-3 overflow-hidden rounded-xl border px-4 py-3",
        tone.bg,
        tone.border,
        className
      )}
    >
      <span aria-hidden className={cn("absolute inset-y-0 left-0 w-1", tone.accent)} />
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          tone.iconBg,
          tone.iconFg
        )}
      >
        <VariantIcon variant={variant} />
      </div>
      <div className="grid min-w-0 flex-1 gap-0.5 pt-0.5">
        {title && (
          <p className={cn("text-text-sm font-semibold", tone.title)}>
            {title}
          </p>
        )}
        {children && (
          <div className={cn("text-text-xs", tone.body)}>{children}</div>
        )}
      </div>
    </div>
  );
}
