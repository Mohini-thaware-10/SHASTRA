"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getLearnerProfile, getJuniorQuests, juniorQuests, getDailyGoalProgress, getRecommendedQuests } from "@/lib/dashboard/mock-data";
import type { JuniorClass } from "@/types/dashboard";
import { getJuniorCurriculum, getJuniorSubjectsForClass } from "@/lib/junior/curriculum";
import { createInitialProgress, getDailyGoalProgress as getDailyGoal, calculateProgressToNextLevel } from "@/lib/junior/progress";

import { cn } from "@/lib/utils";

export default function JuniorHomePage() {
  const router = useRouter();

  // Initialize learner profile - default to class 3 (JUNIOR)
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const [progressSummary, setProgressSummary] = useState<never>();
  const [dailyGoal, setDailyGoal] = useState<never>();
  const [recommendedQuests, setRecommendedQuestsState] = useState<never>();

  useEffect(() => {
    const classNum = 3; // Default to class 3 for junior universe
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    const initialProgress = createInitialProgress(classNum, profile);
    setProgressSummary(initialProgress);

    const dailyGoalResult = getDailyGoalProgress(profile, classNum);
    setDailyGoal(dailyGoalResult);

    // Get recommended quests based on learner progress
    const availableQuests = getRecommendedQuests(profile, juniorQuests);
    setRecommendedQuestsState(availableQuests.slice(0, 3)); // Show top 3
  }, [router]);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading student profile...</p>
      </div>
    );
  }

  const classNum = learnerProfile.currentClass as JuniorClass;
  const isUpperJunior = classNum >= 3;
  const themeClass = isUpperJunior ? "sky" : "coral";

  // Determine theme colors based on universe
  const themes: Record<string, { background: string; soft: string; accent: string; ink: string; border: string }> = {
    coral: {
      background: "#fffaf4",
      soft: "#fff0e7",
      accent: "#e98757",
      ink: "#512917",
      border: "#f1cfbb",
    },
    sky: {
      background: "#f0f8ff",
      soft: "#e6f7ff",
      accent: "#277d99",
      ink: "#17324a",
      border: "#cfe3ed",
    },
  };

  const theme = themes[themeClass as keyof typeof themes] || themes.coral;

  return (
    <div className="min-h-screen bg-background">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Top Navigation */}
        <div className="mb-6 rounded-2xl bg-[theme.background] border border-[theme.border] p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
          {/* Left: SHATRA JUNIOR branding */}
          <div className="flex items-center gap-3">
            <span className="text-[theme.accent] text-xl font-bold">SHATRA JUNIOR</span>
            <span className="text-[theme.inkSmall]">Classes 1‑5</span>
          </div>

          {/* Center: Student profile */}
          <div className="flex items-center gap-4">
            <span className="text-[theme.inkSmall] font-medium">
              {learnerProfile.fullName}
            </span>
            <span className="text-[theme.inkSmall]">
              • Class {learnerProfile.currentClass}
            </span>
            <span className="text-[theme.accent] text-xs font-medium">
              Level {progressSummary.currentLevel || 1}
            </span>
            <span className="text-[theme.accent]">
              {progressSummary.coins || 0} coins
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
            Welcome back, {learnerProfile.fullName}!
          </p>
          <p className="text-[theme.inkSmall]">
            Your learning adventure continues in SHATRA Junior.
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

        {/* Interactive Learning World */}
        <div className="space-y-8">
          {/* Subject Islands */}
          <div>
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-4">
              Subject Islands
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Mathematics Island */}
              <div
                key="mathematics-island"
                className="rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg hover:transition-shadow transition-all duration-300 border border-[theme.border]"
                onClick={() => router.push("/junior/subjects/mathematics")}
                style={{ background: "white" }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#ff6b6b] flex items-center justify-center mb-2">
                  <span className="text-white font-medium">🔢</span>
                </div>
                <h4 className="text-sm font-medium text-[theme.accent] hover:text-[#ff8c8c] transition-colors">
                  Mathematics Island
                </h4>
                <p className="text-[theme.inkSmall] mt-1">
                  Numbers, shapes, and calculations
                </p>
                <p className="text-xs text-[theme.inkSoft] mt-1">
                  Locked until Class 1 {isUpperJunior ? "" : "(all classes)"}
                </p>
              </div>

              {/* English Island */}
              <div
                key="english-island"
                className="rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg hover:transition-shadow transition-all duration-300 border border-[theme.border]"
                onClick={() => router.push("/junior/subjects/english")}
                style={{ background: "white" }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#4ecdc4] flex items-center justify-center mb-2">
                  <span className="text-white font-medium">🅰</span>
                </div>
                <h4 className="text-sm font-medium text-[theme.accent] hover:text-[#6fd5c5] transition-colors">
                  English Island
                </h4>
                <p className="text-[theme.inkSmall] mt-1">
                  Letters, words, and stories
                </p>
                <p className="text-xs text-[theme.inkSoft] mt-1">
                  Locked until Class 1 {isUpperJunior ? "" : "(all classes)"}
                </p>
              </div>

              {/* Science Island */}
              <div
                key="science-island"
                className="rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg hover:transition-shadow transition-all duration-300 border border-[theme.border]"
                onClick={() => router.push("/junior/subjects/science")}
                style={{ background: "white" }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#ffe66d] flex items-center justify-center mb-2">
                  <span className="text-white font-medium">🔬</span>
                </div>
                <h4 className="text-sm font-medium text-[theme.accent] hover:text-[#fffa6e] transition-colors">
                  Science Island
                </h4>
                <p className="text-[theme.inkSmall] mt-1">
                  Plants, animals, and environment
                </p>
                <p className="text-xs text-[theme.inkSoft] mt-1">
                  Locked until Class 1 {isUpperJunior ? "" : "(all classes)"}
                </p>
              </div>

              {/* Environmental Studies Island */}
              <div
                key="evs-island"
                className="rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg hover:transition-shadow transition-all duration-300 border border-[theme.border]"
                onClick={() => router.push("/junior/subjects/evs")}
                style={{ background: "white" }}
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#a855f7] flex items-center justify-center mb-2">
                  <span className="text-white font-medium">🌱</span>
                </div>
                <h4 className="text-sm font-medium text-[theme.accent] hover:text-[#c9a0dc] transition-colors">
                  Environmental Studies Island
                </h4>
                <p className="text-[theme.inkSmall] mt-1">
                  Family, nature, and our surroundings
                </p>
                <p className="text-xs text-[theme.inkSoft] mt-1">
                  Locked until Class 3 {isUpperJunior ? "(available)" : "Locked until Class 3"}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Overview (Upper Junior only) */}
          {isUpperJunior && (
            <div className="rounded-lg bg-white p-6 border border-[theme.border] mb-6">
              <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-3">
                Progress Overview
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[["Mathematics", 65], ["Language", 45], ["EVS", 55], ["Art", 30]].map(
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
                  )
                )}
              </div>
            </div>
          )}

          {/* Daily Learning Goals */}
          <div>
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-4">
              Daily Learning Goals
            </h3>
            <div className="rounded-lg bg-white p-4 border border-[theme.border]">
              <p className="text-[theme.inkSmall] mb-2">
                Lessons Completed: {progressSummary.lessonsCompleted || 0}
              </p>
              <p className="text-[theme.inkSmall] mb-2">
                Questions Answered: {progressSummary.activitiesCompleted || 0}
              </p>
              <p className="text-[theme.inkSmall] mb-2">
                XP Earned: {progressSummary.totalXP || 0}
              </p>
              <p className="text-[theme.inkSmall] mb-2">
                Current Streak: {progressSummary.learningStreak || 0} days
              </p>
              <div>
                <p className="text-[theme.inkSmall] mb-2">
                  {dailyGoal.suggestedAction}
                </p>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          <div>
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-4">
              Continue Learning
            </h3>
            <p className="text-[theme.inkSmall] mb-3">
              Most recent incomplete lesson:
            </p>
            <div className="rounded-lg bg-white p-4 border border-[theme.border]">
              <p className="text-[theme.inkSmall] mb-1">
                Continue "Number Friends" (Mathematics - Class 1)
              </p>
              <button
                className="w-full inline-flex items-center gap-2 rounded-lg bg-[theme.accent] text-white px-4 py-2 text-[theme.inkSmall] font-medium transition-colors hover:bg-[darken(theme.accent, 10)]"
              >
                <svg
                  className="transition-transform duration-200"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                Start Lesson
              </button>
            </div>
          </div>

          {/* Recommended Quests */}
          <div>
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-4">
              Recommended Quests
            </h3>
            {recommendedQuests.length > 0 ? (
              <div className="space-y-3">
                {recommendedQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className="rounded-lg bg-white p-4 border border-[theme.border] hover:bg-[theme.soft] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-[theme.accent]">
                          {quest.title}
                        </h4>
                        <p className="text-[theme.inkSmall]">
                          {quest.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[0.75rem] font-bold text-[theme.accent]">
                          +{quest.rewardXP} XP • {quest.rewardCoins} coins
                        </span>
                        <br />
                        <span className="text-[theme.inkSmall]">
                          {quest.estimatedDurationMinutes} min
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/junior/quests/${quest.id}`)}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[theme.soft] text-[theme.accent] px-3 py-1 text-[theme.inkSmall] font-medium transition-colors hover:bg-[theme.accent] text-white"
                    >
                      Start Quest
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[theme.inkSmall]">
                No quests available at this time. Complete activities to unlock quests!
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}