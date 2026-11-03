"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import type { ReactNode } from "react";

export default function DashboardAssessmentsPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Assessments"
        title="Upcoming Assessments"
        description "Scheduled tests and evaluation dates"
      />
      <div className="mt-6 p-6 text-ink-soft rounded-lg bg-[var(--universe-surface)]">
        <Badge tone="coral" className="me-2">
          📋
        </Badge>
        <p>
          Assessments placeholder. This section will display upcoming assessment
          dates, past assessment results, and performance analytics across all
          your selected subjects.
        </p>
      </div>
    </PageShell>
  );
}