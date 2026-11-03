"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

export default function DashboardLearningPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Learning"
        title="My Learning"
        description="Your learning journey and active sessions"
      />
      <div className="mt-6 p-6 text-ink-soft rounded-lg bg-[var(--universe-surface)]">
        <Badge tone="violet" className="me-2">
          📚
        </Badge>
        <p>
          Learning module placeholder. This section will display your active lessons,
          progress through topics, and learning materials tailored to your universe.
        </p>
      </div>
    </PageShell>
  );
}