import {
  CheckCircleIcon,
  InfoIcon,
  WarningCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react/dist/ssr";
import { createClient } from "@/lib/supabase/server";
import { DismissButton } from "./dismiss-button";

const SEVERITY_CONFIG: Record<
  string,
  {
    icon: typeof InfoIcon;
    border: string;
    bg: string;
    text: string;
    iconColor: string;
  }
> = {
  info: {
    icon: InfoIcon,
    border: "border-[var(--color-blue-200)]",
    bg: "bg-[var(--color-blue-25)]",
    text: "text-[var(--color-text-primary)]",
    iconColor: "text-[var(--color-blue-600)]",
  },
  success: {
    icon: CheckCircleIcon,
    border: "border-[var(--color-success-200)]",
    bg: "bg-[var(--color-success-25)]",
    text: "text-[var(--color-text-primary)]",
    iconColor: "text-[var(--color-success-600)]",
  },
  warning: {
    icon: WarningIcon,
    border: "border-[var(--color-warning-200)]",
    bg: "bg-[var(--color-warning-25)]",
    text: "text-[var(--color-text-primary)]",
    iconColor: "text-[var(--color-warning-600)]",
  },
  critical: {
    icon: WarningCircleIcon,
    border: "border-[var(--color-border-error-subtle)]",
    bg: "bg-[var(--color-error-25)]",
    text: "text-[var(--color-text-error-primary)]",
    iconColor: "text-[var(--color-error-600)]",
  },
};

export async function AnnouncementsBanner() {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("fn_active_announcements_for_user");
  if (error || !data || data.length === 0) return null;

  return (
    <div className="grid gap-3">
      {data.map((a) => {
        const cfg = SEVERITY_CONFIG[a.severity] ?? SEVERITY_CONFIG.info;
        const Icon = cfg.icon;
        return (
          <div
            key={a.id}
            className={`flex items-start gap-3 rounded-xl border ${cfg.border} ${cfg.bg} px-4 py-3`}
          >
            <Icon
              size={28}
              weight="duotone"
              className={`mt-0.5 shrink-0 ${cfg.iconColor}`}
            />
            <div className={`grid flex-1 gap-1 ${cfg.text}`}>
              <p className="text-text-sm font-semibold">{a.title}</p>
              <p className="whitespace-pre-line text-text-sm">{a.body}</p>
              {a.link_url && a.link_label && (
                <a
                  href={a.link_url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-text-sm font-medium underline"
                >
                  {a.link_label}
                </a>
              )}
            </div>
            <DismissButton id={a.id} />
          </div>
        );
      })}
    </div>
  );
}
