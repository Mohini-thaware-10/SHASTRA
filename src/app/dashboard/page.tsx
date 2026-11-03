"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/common/container";
import { UniverseTheme } from "@/components/common/universe-theme";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { mapClassToUniverse } from "@/config/dashboard";

interface DashboardPageProps {
  className?: string;
}

export default function DashboardPage({
  className,
}: DashboardPageProps) {
  // Determine universe from class number
  // In a real app, this would come from the learner's onboarding data
  const [learnerProfile, setLearnerProfile] = useState<{
    profile: any;
    universe: string;
  }>({ profile: null, universe: "nexus" });

  useEffect(() => {
    // Initialize with a default profile - in production this would come
    // from onboarding completion or auth state
    // For now, use class 7 as default (Nexus universe)
    const defaultClass = "7";
    const profile = getLearnerProfile(
      parseInt(defaultClass),
      undefined,
      "CBSE"
    );
    setLearnerProfile({
      profile,
      universe: profile.currentUniverse,
    });
  }, []);

  if (!learnerProfile.profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <UniverseTheme universe={learnerProfile.universe}>
      <DashboardLayout
        learnerProfile={learnerProfile.profile}
        className={className}
      />
    </UniverseTheme>
  );
}

/* Helper to map class to universe (kept for reference) */
function mapClassToUniverse(classNum: number): string {
  if (classNum >= 1 && classNum <= 5) return "junior";
  if (classNum >= 6 && classNum <= 10) return "nexus";
  return "ascend";
}