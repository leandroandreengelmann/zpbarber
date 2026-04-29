import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-lg border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] px-3.5 py-2 text-text-md text-[var(--color-text-primary)] shadow-[0_1px_2px_rgb(10_13_18_/_0.05)] transition-shadow outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-text-sm file:font-medium file:text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus-visible:border-[var(--color-border-brand)] focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--color-border-brand)_24%,transparent)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--color-bg-disabled)] disabled:opacity-60 aria-invalid:border-[var(--color-border-error)] aria-invalid:ring-4 aria-invalid:ring-[color-mix(in_srgb,var(--color-border-error)_24%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
