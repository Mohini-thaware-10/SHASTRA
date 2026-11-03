"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import type { ReactNode } from "react";

export default function DashboardRevisionPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Revision"
        title="Revision Centre"
        description="Topics to revise and previously attempted questions"
      />
      <div className="mt-6 p-6 text-ink-soft rounded-lg bg-[var(--universe-surface)]">
        <Badge tone="gold" className="me-2">
          📝
        </Badge>
        <p>
          Revision centre placeholder. This section will show topics scheduled for
          revision, previously attempted questions, and upcoming revision suggestions
          based on spaced repetition scheduling.
        </p>
      </div>
    </PageShell>
  );
}