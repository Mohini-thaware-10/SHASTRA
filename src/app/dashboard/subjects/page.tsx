"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import type { ReactNode } from "react";

export default function DashboardSubjectsPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Subjects"
        title="Subject Overview"
        description="All subjects selected during onboarding"
      />
      <div className="mt-6 p-6 text-ink-soft rounded-lg bg-[var(--universe-surface)]">
        <Badge tone="sky" className="me-2">
          📖
        </Badge>
        <p>
          Subject overview placeholder. This section will display all your selected
          subjects with progress percentages, topic completion, and mastery
          classifications across your universe.
        </p>
      </div>
    </PageShell>
  );
}