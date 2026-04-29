import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PRESETS, type PresetKey } from "../_lib/period";

export function PeriodFilter({
  basePath,
  active,
  from,
  to,
}: {
  basePath: string;
  active: PresetKey;
  from: string;
  to: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-secondary)] px-4 py-3 md:px-6 md:py-4">
      <div className="-mx-4 flex w-[calc(100%+2rem)] items-center gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:w-auto md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        {PRESETS.map((p) => {
          const isActive = active === p.key;
          return (
            <Link
              key={p.key}
              href={`${basePath}?preset=${p.key}`}
              className={`shrink-0 rounded-md border px-3.5 py-2.5 text-text-sm font-medium transition-colors md:py-1.5 ${
                isActive
                  ? "border-[var(--color-blue-300)] bg-[var(--color-blue-50)] text-[var(--color-blue-700)]"
                  : "border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {p.label}
            </Link>
          );
        })}
      </div>
      <form className="flex w-full flex-wrap items-end gap-2 md:w-auto" action={basePath}>
        <label className="grid flex-1 gap-1 md:flex-none">
          <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
            De
          </span>
          <input
            type="date"
            name="from"
            defaultValue={from}
            className="h-11 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm md:h-9"
          />
        </label>
        <label className="grid flex-1 gap-1 md:flex-none">
          <span className="text-text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
            Até
          </span>
          <input
            type="date"
            name="to"
            defaultValue={to}
            className="h-11 rounded-md border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3 text-text-sm md:h-9"
          />
        </label>
        <button
          type="submit"
          className={buttonVariants({ size: "sm", variant: "outline", className: "h-11 md:h-7" })}
        >
          Aplicar
        </button>
      </form>
    </div>
  );
}
