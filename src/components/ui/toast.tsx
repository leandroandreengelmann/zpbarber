"use client";

import * as React from "react";
import { toast as sonnerToast } from "sonner";
import {
  CheckCircleIcon,
  InfoIcon,
  SpinnerIcon,
  WarningIcon,
  XCircleIcon,
  XIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

type Variant = "success" | "error" | "warning" | "info" | "loading";

type Tone = {
  bg: string;
  border: string;
  iconBg: string;
  iconFg: string;
  accent: string;
  title: string;
  description: string;
  closeFg: string;
  closeHover: string;
};

const TONES: Record<Variant, Tone> = {
  success: {
    bg: "bg-[var(--color-success-50)]",
    border: "border-[var(--color-success-200)]",
    iconBg: "bg-[var(--color-success-100)]",
    iconFg: "text-[var(--color-success-600)]",
    accent: "bg-[var(--color-success-500)]",
    title: "text-[var(--color-success-800)]",
    description: "text-[var(--color-success-700)]",
    closeFg: "text-[var(--color-success-600)]",
    closeHover: "hover:bg-[var(--color-success-100)] hover:text-[var(--color-success-800)]",
  },
  error: {
    bg: "bg-[var(--color-error-50)]",
    border: "border-[var(--color-error-200)]",
    iconBg: "bg-[var(--color-error-100)]",
    iconFg: "text-[var(--color-error-600)]",
    accent: "bg-[var(--color-error-500)]",
    title: "text-[var(--color-error-800)]",
    description: "text-[var(--color-error-700)]",
    closeFg: "text-[var(--color-error-600)]",
    closeHover: "hover:bg-[var(--color-error-100)] hover:text-[var(--color-error-800)]",
  },
  warning: {
    bg: "bg-[var(--color-warning-50)]",
    border: "border-[var(--color-warning-200)]",
    iconBg: "bg-[var(--color-warning-100)]",
    iconFg: "text-[var(--color-warning-600)]",
    accent: "bg-[var(--color-warning-500)]",
    title: "text-[var(--color-warning-800)]",
    description: "text-[var(--color-warning-700)]",
    closeFg: "text-[var(--color-warning-600)]",
    closeHover: "hover:bg-[var(--color-warning-100)] hover:text-[var(--color-warning-800)]",
  },
  info: {
    bg: "bg-[var(--color-blue-50)]",
    border: "border-[var(--color-blue-200)]",
    iconBg: "bg-[var(--color-blue-100)]",
    iconFg: "text-[var(--color-blue-600)]",
    accent: "bg-[var(--color-blue-500)]",
    title: "text-[var(--color-blue-800)]",
    description: "text-[var(--color-blue-700)]",
    closeFg: "text-[var(--color-blue-600)]",
    closeHover: "hover:bg-[var(--color-blue-100)] hover:text-[var(--color-blue-800)]",
  },
  loading: {
    bg: "bg-[var(--color-bg-primary)]",
    border: "border-[var(--color-border-secondary)]",
    iconBg: "bg-[var(--color-bg-secondary)]",
    iconFg: "text-[var(--color-fg-secondary)]",
    accent: "bg-[var(--color-fg-quaternary)]",
    title: "text-[var(--color-text-primary)]",
    description: "text-[var(--color-text-tertiary)]",
    closeFg: "text-[var(--color-fg-quaternary)]",
    closeHover: "hover:bg-black/5 hover:text-[var(--color-fg-secondary)]",
  },
};

function Icon({ variant }: { variant: Variant }) {
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
    case "loading":
      return <SpinnerIcon {...props} className="animate-spin" />;
  }
}

type NotifyOptions = {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

function ToastCard({
  id,
  variant,
  title,
  description,
  action,
  dismissible = true,
}: {
  id: string | number;
  variant: Variant;
  title: string;
  description?: string;
  action?: NotifyOptions["action"];
  dismissible?: boolean;
}) {
  const tone = TONES[variant];

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full max-w-[380px] items-start gap-3 overflow-hidden rounded-xl border px-4 py-3 shadow-lg shadow-black/5",
        tone.bg,
        tone.border
      )}
      role={variant === "error" ? "alert" : "status"}
    >
      <span
        aria-hidden
        className={cn("absolute inset-y-0 left-0 w-1", tone.accent)}
      />
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          tone.iconBg,
          tone.iconFg
        )}
      >
        <Icon variant={variant} />
      </div>
      <div className="grid min-w-0 flex-1 gap-0.5 pt-0.5">
        <p className={cn("text-text-sm font-semibold", tone.title)}>
          {title}
        </p>
        {description && (
          <p className={cn("text-text-xs", tone.description)}>
            {description}
          </p>
        )}
        {action && (
          <button
            type="button"
            onClick={() => {
              action.onClick();
              sonnerToast.dismiss(id);
            }}
            className={cn(
              "mt-1.5 inline-flex w-fit items-center text-text-xs font-semibold underline-offset-2 hover:underline",
              tone.iconFg
            )}
          >
            {action.label}
          </button>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => sonnerToast.dismiss(id)}
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-md transition",
            tone.closeFg,
            tone.closeHover
          )}
        >
          <XIcon size={16} weight="bold" />
        </button>
      )}
    </div>
  );
}

function show(variant: Variant, title: string, opts: NotifyOptions = {}) {
  const duration =
    opts.duration ??
    (variant === "loading" ? Infinity : variant === "error" ? 6000 : 4000);

  return sonnerToast.custom(
    (id) => (
      <ToastCard
        id={id}
        variant={variant}
        title={title}
        description={opts.description}
        action={opts.action}
        dismissible={variant !== "loading"}
      />
    ),
    { duration }
  );
}

export const notify = {
  success: (title: string, opts?: NotifyOptions) => show("success", title, opts),
  error: (title: string, opts?: NotifyOptions) => show("error", title, opts),
  warning: (title: string, opts?: NotifyOptions) => show("warning", title, opts),
  info: (title: string, opts?: NotifyOptions) => show("info", title, opts),
  loading: (title: string, opts?: NotifyOptions) => show("loading", title, opts),
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  promise: <T,>(
    promise: Promise<T>,
    msgs: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((err: unknown) => string);
    }
  ) => {
    const id = show("loading", msgs.loading);
    promise
      .then((data) => {
        sonnerToast.dismiss(id);
        const title = typeof msgs.success === "function" ? msgs.success(data) : msgs.success;
        show("success", title);
      })
      .catch((err) => {
        sonnerToast.dismiss(id);
        const title = typeof msgs.error === "function" ? msgs.error(err) : msgs.error;
        show("error", title);
      });
    return promise;
  },
};
