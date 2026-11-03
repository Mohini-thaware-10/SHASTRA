"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Layout, Menu, Shield, Users, GraduationCap, Clock, Sparkles, BookOpen, Target } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { UniverseTheme } from "@/components/common/universe-theme";
import { useAuth } from "@/components/auth/AuthStateProvider";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import type { LearnerProfile } from "@/types/dashboard";
import { getDailyGoal, calculateDailyGoal } from "@/lib/dashboard/calculations";
import { getContinueLearningCards, getSubjectOverviewCards, getLearningJourneyNodes } from "@/lib/dashboard/mock-data";
import { universeThemesConfig } from "@/config/dashboard";
import { calculateSubjectProgress, calculateGamificationSummary, calculateLearningJourneyNodes, getProgressSvgParams } from "@/lib/dashboard/calculations";
import { generateRecommendations, getRecommendationsWithStatus } from "@/lib/dashboard/recommendations";
import { getRecentActivityEvents } from "@/lib/dashboard/mock-data";
import { getMockAssessmentResult } from "@/lib/dashboard/mock-data";

interface DashboardLayoutProps {
  learnerProfile: LearnerProfile;
  className?: string;
}

export function DashboardLayout({ learnerProfile, className }: DashboardLayoutProps) {
  const { authState, profileState, user, role, institutionId, learnerProfile: authLearnerProfile } = useAuth();
  const [expanded, setExpanded] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  // Use data provider - will fall back to mock if Supabase not configured
  const provider = useDataProvider();

  // Determine universe from class
  const currentUniverse = role === "student" ? getUniverseForClass(parseInt(learnerProfile.currentClass)) : "nexus";
  const themeConfig = universeThemesConfig[currentUniverse];

  // --- DASHBOARD DATA (from appropriate source) ---
  let dailyGoal, subjectProgress, journeyNodes, gamification, recommendations, activityEvents, assessmentResult;

  if (authState === "authenticated" && profileState.status === "loaded") {
    // Use real data provider when authenticated
    dailyGoal = provider.calculateDailyGoal
      ? provider.calculateDailyGoal(learnerProfile)
      : calculateDailyGoal(learnerProfile);
    subjectProgress = provider.calculateSubjectProgress
      ? provider.calculateSubjectProgress(learnerProfile)
      : calculateSubjectProgress(learnerProfile);
    journeyNodes = provider.calculateLearningJourneyNodes
      ? provider.calculateLearningJourneyNodes(learnerProfile)
      : calculateLearningJourneyNodes(learnerProfile);
    gamification = provider.calculateGamificationSummary
      ? provider.calculateGamificationSummary(learnerProfile)
      : calculateGamificationSummary(learnerProfile);

    // Recommendations grounded in assessment data
    const { recommendations: recs, hasAssessmentData } = provider.getRecommendationsWithStatus
      ? provider.getRecommendationsWithStatus(learnerProfile)
      : getRecommendationsWithStatus(learnerProfile);
    recommendations = recs;
    hasAssessmentDataFlag = hasAssessmentData;

    activityEvents = provider.getRecentActivityEvents
      ? provider.getRecentActivityEvents(learnerProfile)
      : getRecentActivityEvents(learnerProfile);
    assessmentResult = provider.getMockAssessmentResult
      ? provider.getMockAssessmentResult(learnerProfile)
      : getMockAssessmentResult(learnerProfile);
  } else {
    // Fallback to mock data for unauthenticated/loading state
    dailyGoal = calculateDailyGoal(authLearnerProfile);
    subjectProgress = calculateSubjectProgress(authLearnerProfile);
    journeyNodes = calculateLearningJourneyNodes(authLearnerProfile);
    gamification = calculateGamificationSummary(authLearnerProfile);
    recommendations = generateRecommendations(authLearnerProfile);
    activityEvents = getRecentActivityEvents(authLearnerProfile);
    assessmentResult = getMockAssessmentResult(authLearnerProfile);
  }

  const { progressOffset, pathLength, percentage } = getProgressSvgParams(dailyGoal);

  // --- SIDEBAR NAVIGATION (shared across all universes) ---
  const navItems = [
    { label: "Home", href: "/dashboard", icon: Home, key: "home" },
    { label: "My Learning", href: "/dashboard/learning", icon: BookOpen, key: "learning" },
    { label: "Subjects", href: "/dashboard/subjects", icon: GraduationCap, key: "subjects" },
    { label: "Quests", href: "/dashboard/quests", icon: Target, key: "quests" },
    { label: "Revision", href: "/dashboard/revision", icon: Clock, key: "revision" },
    { label: "Assessments", href: "/dashboard/assessments", icon: Sparkles, key: "assessments" },
    { label: "Achievements", href: "/dashboard/achievements", icon: Sparkles, key: "achievements" },
    { label: "Progress", href: "/dashboard/progress", icon: Users, key: "progress" },
  ];

  // --- TOP NAVIGATION ---
  const topNavItems = [
    { label: "Home", href: "/dashboard", key: "home" },
    { label: "Learning", href: "/dashboard/learning", key: "learning" },
    { label: "Subjects", href: "/dashboard/subjects", key: "subjects" },
    { label: "Quests", href: "/dashboard/quests", key: "quests" },
    { label: "Revision", href: "/dashboard/revision", key: "revision" },
    { label: "Assessments", href: "/dashboard/assessments", key: "assessments" },
    { label: "Achievements", href: "/dashboard/achievements", key: "achievements" },
    { label: "Profile", href: "/dashboard/profile", key: "profile" },
  ];

  return (
    <div className={cn("min-h-screen", className)}>
      {/* Universe theme wrapper */}
      <UniverseTheme universe={currentUniverse}>

        {/* Sidebar Navigation */}
        <aside
          className="fixed left-0 top-0 bottom-0 w-64 bg-[var(--shatra-surface)] border-r border-line/80 transition-transform duration-300 ease-in-out sm:translate-x-0 -translate-x-full lg:block"
          aria-label="Main sidebar"
        >
          <div className="h-[var(--header-height)] border-b border-line/80 p-4 flex items-center justify-between">
            <h2 className="text-[0.875rem] font-semibold text-ink">
              SHATRA Dashboard
            </h2>
            <button
              onClick={() => setExpanded((o) => !o)}
              aria-expanded={expanded}
              aria-label="Toggle sidebar"
              className="p-2 rounded-md hover:bg-ink/[0.04] transition-colors"
            >
              {expanded ? (
                <Menu className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5 line-through text-ink" />
              )}
            </button>
          </div>

          <nav
            aria-label="Dashboard navigation"
            className={cn(
              "flex flex-col gap-2 p-2 rounded-lg transition-all duration-300",
              expanded ? "opacity-100" : "opacity-0",
              expanded ? "pointer-events-auto" : "pointer-events-none"
            )}
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-[0.8125rem] font-medium text-ink/80 transition-colors hover:text-ink hover:bg-ink/[0.045] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-violet-strong",
                  expanded ? "" : "group"
                )}
              >
                {/* Show/hide navigation items based on role */}
                {showNavigationItem(item.label, role)}
                {item.icon && (
                  <item.icon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={1.8}
                  />
                )}
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile navigation shortcuts */}
          <div className="mt-6 pt-6 border-t border-line/80">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => window.location.href = "/dashboard"}
            >
              Return Home
            </Button>
          </div>
        </aside>

        {/* Main content area */}
        <main className="ml-64 flex-1 overflow-x-hidden pb-8">
          {/* Top navigation / breadcrumb area */}
          <header className="border-b border-line/80 backdrop-blur-sm bg-[var(--shatra-surface)]/80 sticky top-0 z-10">
            <div className="Container py-3">
              <div className="flex items-center justify-between gap-4">
                {/* Brand & Universe indicator */}
                <div className="flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2"
                    aria-label="SHATRA home"
                  >
                    <span className="text-[0.875rem] font-semibold text-ink">
                      SHATRA
                    </span>
                  </Link>

                  <div className="flex items-center gap-2 rounded-full border border-[var(--universe-border)] bg-[var(--universe-soft)] px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--universe-accent)]" />
                    <span className="text-[0.6875rem] font-medium text-[var(--universe-accent)]">
                      {currentUniverse.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Profile menu */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Student profile"
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    <Users className="h-5 w-5" strokeWidth={1.8} />
                  </Button>

                  {/* Profile dropdown menu */}
                  {showSearch && (
                    <div
                      className="absolute right-0 mt-2 w-64 rounded-lg border border-line/80 bg-white/90 p-4 shadow-lg z-50 min-w-[180px]"
                      aria-label="Profile menu"
                    >
                      <h3 className="text-[0.75rem] font-semibold text-ink mb-3">My Profile</h3>

                      <div className="space-y-2">
                        <a
                          href="/dashboard/profile"
                          className="flex items-center gap-3 py-2 rounded-md hover:bg-ink/[0.04] transition-colors"
                        >
                          <span className="text-ink-soft">My Profile</span>
                        </a>
                        <a
                          href="/dashboard/learning-preferences"
                          className="flex items-center gap-3 py-2 rounded-md hover:bg-ink/[0.04] transition-colors"
                        >
                          <span className="text-ink-soft">Learning Preferences</span>
                        </a>
                        <a
                          href="/dashboard/settings"
                          className="flex items-center gap-3 py-2 rounded-md hover:bg-ink/[0.04] transition-colors"
                        >
                          <span className="text-ink-soft">Settings</span>
                        </a>
                        <hr className="my-2 border-border-soft" />
                        <a
                          href="/auth/sign-out"
                          className="flex items-center gap-3 py-2 rounded-md hover:bg-ink/[0.04] transition-colors text-error"
                        >
                          <span className="text-ink-soft">Sign Out</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <section className="Container py-6">
            {className ? (
              <div className={cn("space-y-6", className)}>
                {children}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Welcome Section */}
                <WelcomeSection
                  learnerProfile={learnerProfile}
                  dailyGoal={dailyGoal}
                  progressOffset={progressOffset}
                  percentage={percentage}
                  pathLength={pathLength}
                />

                {/* Daily Goal Card */}
                <DailyGoalCard dailyGoal={dailyGoal} />

                {/* Continue Learning Section */}
                <ContinueLearning cards={getContinueLearningCards(learnerProfile)} />

                {/* Subject Overview */}
                <SubjectOverview subjects={subjectProgress} />

                {/* Learning Journey */}
                <LearningJourney nodes={journeyNodes} />

                {/* XP & Streak Summary */}
                <GamificationSummary summary={gamification} />

                {/* Recommended Quests */}
                <RecommendedQuests recommendations={recommendations} hasAssessmentData={false} />

                {/* Revision Centre */}
                <RevisionCentre />

                {/* Upcoming Assessments */}
                <UpcomingAssessments />

                {/* Recent Learning Activity */}
                <RecentActivity events={activityEvents} />

                {/* AI Tutor Entry Point */}
                <AITutorEntry />
              </div>
            )}
          </section>
        </main>
      </UniverseTheme>
    </div>
  );
}

/**
 * Determine whether to show a navigation item based on user role.
 * Only shows items appropriate for the user's role.
 */
function showNavigationItem(itemLabel: string, userRole: string): boolean {
  // All roles can see Home
  if (itemLabel === "Home") return true;

  // Students can see learning-related items
  if (userRole === "student") {
    return [
      "My Learning",
      "Subjects",
      "Quests",
      "Revision",
      "Assessments",
      "Achievements",
      "Progress",
    ].includes(itemLabel);
  }

  // Teachers/admins can see all items
  if (userRole === "teacher" || userRole === "admin") {
    return true;
  }

  // Default: show item
  return true;
}