"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import type { ReactNode } from "react";

export default function DashboardProgressPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Progress"
        title="Learning Progress"
        description "Your learning journey and milestones"
      />
      <div className="mt-6 p-6 text-ink-soft rounded-lg bg-[var(--universe-surface)]">
        <Badge tone="sky" className="me-2">
          📊
        </Badge>
        <p>
          Progress placeholder. This section will show your comprehensive learning
          progress, including level advancement, streak tracking, topic mastery,
          and overall learning statistics.
        </p>
      </div>
    </PageShell>
  );
}