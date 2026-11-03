"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import type { ReactNode } from "react";

export default function DashboardProfilePage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Profile"
        title="My Profile"
        description "Student profile and learning preferences"
      />
      <div className="mt-6 p-6 text-ink-soft rounded-lg bg-[var(--universe-surface)]">
        <Badge tone="violet" className="me-2">
          👤
        </Badge>
        <p>
          Profile placeholder. This section will display your student profile,
          including name, class, board, selected universe, learning preferences,
          and account settings.
        </p>
      </div>
    </PageShell>
  );
}