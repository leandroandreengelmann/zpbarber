"use client";

import { useRouter } from "next/navigation";
import { ClosingReport, type ClosingSummary } from "../../_components/closing-report";

export function ClosingReportView({
  summary,
  backHref,
}: {
  summary: ClosingSummary;
  backHref: string;
}) {
  const router = useRouter();
  return (
    <ClosingReport summary={summary} onClose={() => router.push(backHref)} />
  );
}
