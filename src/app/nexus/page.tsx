"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import type { NexusClass } from "@/types/dashboard";
import { getNexusCurriculum, getNexusSubjectsForClass, getNexusSubjectColor, getNexusSubjectDisplay } from "@/lib/nexus/curriculum";
import { createInitialProgress, getDailyGoalProgress as getDailyGoal, calculateProgressToNextLevel } from "@/lib/junior/progress";
import { JUNIOR_REWARD_CONFIG } from "@/lib/junior/curriculum";

import { cn } from "@/lib/utils";

export default function NexusHubPage() {
  const router = useRouter();

  // Initialize learner profile - default to class 7 (NEXUS)
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const [progressSummary, setProgressSummary] = useState<never>();
  const [dailyGoal, setDailyGoal] = useState<never>();
  const [recommendedSubjects, setRecommendedSubjects] = useState<never>();

  useEffect(() => {
    const classNum = 7; // Default to class 7 for NEXUS universe
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    const initialProgress = createInitialProgress(classNum, profile);
    setProgressSummary(initialProgress);

    const dailyGoalResult = getDailyGoalProgress(profile, classNum);
    setDailyGoal(dailyGoalResult);

    // Get subjects for this class
    const subjects = getNexusSubjectsForClass(classNum);
    setRecommendedSubjects(subjects.slice(0, 3)); // Show top 3
  }, [router]);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading student profile...</p>
      </div>
    );
  }

  const profile = learnerProfile as never;
  const classNum = profile.currentClass as NexusClass;
  const isUpperNexus = classNum >= 8;
  const progress = progressSummary as never;
  const themeClass = "violet"; // NEXUS theme tone

  // Determine theme colors based on universe
  const themes: Record<string, { background: string; soft: string; accent: string; ink: string; border: string }> = {
    violet: {
      background: "#f8fafc",
      soft: "#e2e8f0",
      accent: "#6c5ce7",
      ink: "#0f172a",
      border: "#cbd5e1",
    },
  };

  const theme = themes[themeClass as keyof typeof themes] || themes.violet;

  return (
    <div className="min-h-screen bg-background">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Top Navigation */}
        <div className="mb-6 rounded-2xl bg-[theme.background] border border-[theme.border] p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
          {/* Left: SHATRA NEXUS branding */}
          <div className="flex items-center gap-3">
            <span className="text-[theme.accent] text-xl font-bold">SHATRA NEXUS</span>
            <span className="text-[theme.inkSmall]">Classes 6‑10</span>
          </div>

          {/* Center: Student profile */}
          <div className="flex items-center gap-4">
            <span className="text-[theme.inkSmall] font-medium">
              {profile.fullName}
            </span>
            <span className="text-[theme.inkSmall]">
              • Class {profile.currentClass}
            </span>
            <span className="text-[theme.accent] text-xs font-medium">
              Level {progress.currentLevel || 1}
            </span>
            <span className="text-[theme.accent]">
              {progress.coins || 0} coins
            </span>
          </div>

          {/* Right: Notification/Menu */}
          <div className="flex items-center gap-2">
            <span className="relative">
              <svg
                className="w-6 h-6 text-[theme.ink] hover:text-[theme.accent] transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1l4 4m5 4l4 4m2-8l4 4" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[theme.accent]" />
            </span>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="rounded-2xl bg-[theme.background] border border-[theme.border] p-6 mb-8">
          <h2 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-3">
            Welcome back, Explorer!
          </h2>
          <p className="text-[theme.inkSmall] mb-3">
            {`Welcome back, ${profile.fullName}!`}
          </p>
          <p className="text-[theme.inkSmall]">
            Your academy journey continues in SHATRA NEXUS.
          </p>

          {/* Daily goal progress */}
          {dailyGoal && (
            <div className="mt-4 pt-4 border-t border-[theme.border]">
              <p className="text-[theme.inkSmall] mb-1">
                Daily Learning Goal
              </p>
              <div className="h-2 rounded-full bg-[theme.background] overflow-hidden mb-2">
                <div
                  className="h-full rounded-full bg-[theme.accent] transition-all duration-500"
                  style={{ width: `${dailyGoal.progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-[theme.inkSmall]">
                {dailyGoal.completedMinutes}/{dailyGoal.targetMinutes} min •{}{" "}
                {dailyGoal.progressPercentage}%
              </p>
              <p className="text-[theme.inkSmall] mt-1">
                {dailyGoal.suggestedAction}
              </p>
            </div>
          )}
        </div>

        {/* Academy World */}
        <div className="space-y-8">
          {/* Subject Domains */}
          <div>
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-4">
              Subject Domains
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Mathematics Domain */}
              <div
                key="mathematics"
                className={cn(
                  "rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg hover:transition-shadow transition-all duration-300",
                  "border border-[theme.border]"
                )}
                onClick={() => router.push("/nexus/subjects/mathematics")}
                style={{ background: "white" }}
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[NEXUS_SUBJECT_COLORS.mathematics] flex items-center justify-center mb-2">
                  <span className="text-white font-medium">📐</span>
                </div>
                <h4 className="text-sm font-medium text-[theme.accent] hover:text-[#8b5cf6] transition-colors">
                  Mathematics Realm
                </h4>
                <p className="text-[theme.inkSmall] mt-1">
                  Numbers, equations, and proof
                </p>
              </div>

              {/* Science Laboratory */}
              <div
                key="science"
                className={cn(
                  "rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg hover:transition-shadow transition-all duration-300",
                  "border border-[theme.border]"
                )}
                onClick={() => router.push("/nexus/subjects/science")}
                style={{ background: "white" }}
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[NEXUS_SUBJECT_COLORS.science] flex items-center justify-center mb-2">
                  <span className="text-white font-medium">🔬</span>
                </div>
                <h4 className="text-sm font-medium text-[theme.accent] hover-[#06b6d4] transition-colors">
                  Science Laboratory
                </h4>
                <p className="text-[theme.inkSmall] mt-1">
                  Experiment, discover, understand
                </p>
              </div>

              {/* Language Library */}
              <div
                key="language"
                className={cn(
                  "rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg hover:transition-shadow transition-all duration-300",
                  "border border-[theme.border]"
                )}
                onClick={() => router.push("/nexus/subjects/language")}
                style={{ background: "white" }}
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[NEXUS_SUBJECT_COLORS.language] flex items-center justify-center mb-2">
                  <span className="text-white font-medium">📖</span>
                </div>
                <h4 className="text-sm font-medium text-[theme.accent] hover:#a78bfa transition-colors">
                  Language Library
                </h4>
                <p className="text-[theme.inkSmall] mt-1">
                  Grammar, vocabulary, composition
                </p>
              </div>

              {/* Social Studies Archive */}
              <div
                key="social-studies"
                className={cn(
                  "rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg hover:transition-shadow transition-all duration-300",
                  "border border-[theme.border]"
                )}
                onClick={() => router.push("/nexus/subjects/social-studies")}
                style={{ background: "white" }}
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[NEXUS_SUBJECT_COLORS.social_studies] flex items-center justify-center mb-2">
                  <span className="text-white font-medium">📜</span>
                </div>
                <h4 className="text-sm font-medium text-[theme.accent] href:#[aria-label="open social studies"] hover:#f97316 transition-colors">
                  Social Studies Archive
                </h4>
                <p className="text-[theme.inkSmall] mt-1">
                  History, geography, civics
                </p>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div>
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-4">
              Progress Overview
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[["Mathematics", progress.mathProgress || 45], ["Science", progress.scienceProgress || 55], ["Language", progress.languageProgress || 50], ["Social Studies", progress.socialStudiesProgress || 40]].map(
                ([subject, progress]) => (
                  <div
                    key={subject}
                    className="rounded-lg bg-[theme.soft] p-3 border border-[theme.border]"
                  >
                    <span className="text-[0.625rem] text-[theme.inkSmall] mb-1">{subject}</span>
                    <div className="h-2 rounded-full bg-[theme.background] overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-[theme.accent] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-[0.55rem] text-[theme.inkSmall]">
                      {progress}% complete
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-4">
              Recent Activity
            </h3>
            <p className="text-[theme.inkSmall]">
              Complete topics and start new lessons to track progress.
            </p>
          </div>

          {/* Recommended Learning */}
          <div>
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-4">
              Recommended Learning
            </h3>
            {recommendedSubjects.length > 0 ? (
              <div className="space-y-3">
                {recommendedSubjects.map((subject) => (
                  <div
                    key={subject}
                    className="rounded-lg bg-white p-4 border border-[theme.border] hover:bg-[theme.soft] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-[theme.accent]">
                          {getNexusSubjectDisplay(subject)}
                        </h4>
                        <p className="text-[theme.inkSmall]">
                          {subject === "mathematics" ? "Algebra and equations" : subject === "science" ? "Force and motion" : subject === "language" ? "Grammar and comprehension" : "History and civics"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[0.75rem] font-bold text-[theme.accent]">
                          +{Math.floor(Math.random() * 30 + 10)} XP • {Math.floor(Math.random() * 10 + 5)} coins
                        </span>
                        <br />
                        <span className="text-[theme.inkSmall]">
                          Start Learning
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/nexus/topics/${subject}-6-1`)}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[theme.soft] text-[theme.accent] px-3 py-1 text-[theme.inkSmall] font-medium transition-colors hover:bg-[theme.accent] text-white"
                    >
                      Explore
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[theme.inkSmall]">
                No recommendations available. Complete activities to unlock suggestions!
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}