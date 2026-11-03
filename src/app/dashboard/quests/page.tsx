"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import type { ReactNode } from "react";

export default function DashboardQuestsPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Quests"
        title="Missions & Quests"
        description="Active and upcoming quests based on your learning path"
      />
      <div className="mt-6 p-6 text-ink-soft rounded-lg bg-[var(--universe-surface)]">
        <Badge tone="violet" className="me-2">
          🎯
        </Badge>
        <p>
          Quests placeholder. This section will show your active missions, completed
          quests, and recommended challenges based on your assessment results and
          learning progress.
        </p>
      </div>
    </PageShell>
  );
}