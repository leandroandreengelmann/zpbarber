"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function TopProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState<number | null>(null);
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const safetyRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = () => {
    if (finishRef.current) {
      clearTimeout(finishRef.current);
      finishRef.current = null;
    }
    if (safetyRef.current) clearTimeout(safetyRef.current);
    setProgress(15);
    if (trickleRef.current) clearInterval(trickleRef.current);
    trickleRef.current = setInterval(() => {
      setProgress((p) => {
        if (p === null) return null;
        if (p >= 90) return p;
        const inc = (90 - p) * 0.08;
        return Math.min(p + inc, 90);
      });
    }, 200);
    safetyRef.current = setTimeout(() => done(), 8000);
  };

  const done = () => {
    if (trickleRef.current) {
      clearInterval(trickleRef.current);
      trickleRef.current = null;
    }
    if (safetyRef.current) {
      clearTimeout(safetyRef.current);
      safetyRef.current = null;
    }
    setProgress(100);
    finishRef.current = setTimeout(() => setProgress(null), 280);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      const href = a.getAttribute("href");
      if (!href) return;
      if (a.target === "_blank") return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      )
        return;
      try {
        const url = new URL(href, window.location.href);
        if (url.origin !== window.location.origin) return;
        if (
          url.pathname === window.location.pathname &&
          url.search === window.location.search
        )
          return;
      } catch {
        return;
      }
      start();
    };

    const onSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement | null;
      if (!form) return;
      if (form.target === "_blank") return;
      const action = form.getAttribute("action") ?? "";
      if (action.startsWith("javascript:")) return;
      start();
    };

    document.addEventListener("click", onClick, { capture: true });
    document.addEventListener("submit", onSubmit, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
      document.removeEventListener("submit", onSubmit, { capture: true } as EventListenerOptions);
    };
  }, []);

  useEffect(() => {
    if (progress === null) return;
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  useEffect(() => {
    return () => {
      if (trickleRef.current) clearInterval(trickleRef.current);
      if (finishRef.current) clearTimeout(finishRef.current);
      if (safetyRef.current) clearTimeout(safetyRef.current);
    };
  }, []);

  if (progress === null) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[2px]"
    >
      <div
        className="h-full bg-[var(--color-blue-600)] shadow-[0_0_8px_var(--color-blue-500)]"
        style={{
          width: `${progress}%`,
          opacity: progress >= 100 ? 0 : 1,
          transition:
            progress >= 100
              ? "width 200ms ease-out, opacity 280ms ease-out"
              : "width 220ms ease-out",
        }}
      />
    </div>
  );
}
