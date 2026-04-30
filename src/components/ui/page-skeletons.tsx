import { Skeleton } from "@/components/ui/skeleton";

export function AuthPageSkeleton() {
  return (
    <div className="relative grid min-h-screen grid-cols-1 bg-[var(--color-bg-primary)] lg:grid-cols-2">
      <div className="flex min-h-screen items-center justify-center px-6 py-12 lg:px-10">
        <div className="grid w-full max-w-[440px] gap-5">
          <div className="mb-3 flex flex-col gap-6">
            <Skeleton className="h-40 w-40" />
            <div className="grid gap-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-11 w-full" />
          </div>
          <div className="grid gap-1.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full" />
          </div>
          <div className="grid gap-1.5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-11 w-full" />
          </div>
          <Skeleton className="mt-2 h-11 w-full" />
        </div>
      </div>
      <div className="hidden bg-[var(--color-bg-secondary)] lg:block" />
    </div>
  );
}

export function PageHeaderSkeleton({ withAction = true }: { withAction?: boolean }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="grid gap-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      {withAction && <Skeleton className="h-10 w-32" />}
    </div>
  );
}

export function StatsRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="grid gap-2 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4"
        >
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-24" />
        </div>
      ))}
    </div>
  );
}

export function CardListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="grid gap-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between gap-4 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-4"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="grid gap-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 8, cols = 5 }: { rows?: number; cols?: number }) {
  return (
    <div className="rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)]">
      <div className="grid gap-px bg-[var(--color-border-secondary)] [&>div]:bg-[var(--color-bg-primary)]">
        <div
          className="grid gap-4 px-4 py-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: cols }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="grid gap-4 px-4 py-3.5"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: cols }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GridCardsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="grid gap-3 rounded-xl border border-[var(--color-border-secondary)] bg-[var(--color-bg-primary)] p-5"
        >
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="mt-2 flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="grid max-w-2xl gap-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid gap-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-11 w-full" />
        </div>
      ))}
      <Skeleton className="mt-2 h-11 w-40" />
    </div>
  );
}

export function AppContentSkeleton({
  variant = "list",
}: {
  variant?: "list" | "table" | "grid" | "form" | "dashboard";
}) {
  return (
    <div>
      <PageHeaderSkeleton />
      {variant === "dashboard" && (
        <>
          <StatsRowSkeleton />
          <CardListSkeleton rows={4} />
        </>
      )}
      {variant === "list" && <CardListSkeleton />}
      {variant === "table" && <TableSkeleton />}
      {variant === "grid" && <GridCardsSkeleton />}
      {variant === "form" && <FormSkeleton />}
    </div>
  );
}
