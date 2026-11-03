"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import type { ReactNode } from "react";

export default function DashboardAchievementsPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Achievements"
        title="Achievements"
        description "Badges, milestones and earned recognition"
      />
      <div className="mt-6 p-6 text-ink-soft rounded-lg bg-[var(--universe-surface)]">
        <Badge tone="gold" className="me-2">
          🏆
        </Badge>
        <p>
          Achievements placeholder. This section will show earned badges, milestone
          markers, and recognition for completed learning objectives across your
          learning journey.
        </p>
      </div>
    </PageShell>
  );
}