"use client";

import { PageShell } from "@/components/layout/page-shell";
import { SectionHeading } from "@/components/common/section-heading";
import type { ReactNode } from "react";

export default function DashboardSettingsPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Settings"
        title="Settings"
        description "Application and learning settings"
      />
      <div className="mt-6 p-6 text-ink-soft rounded-lg bg-[var(--universe-surface)]">
        <Badge tone="coral" className="me-2">
          ⚙️
        </Badge>
        <p>
          Settings placeholder. This section will contain application settings,
          learning preferences, notification settings, and account management
          options for your student profile.
        </p>
      </div>
    </PageShell>
  );
}