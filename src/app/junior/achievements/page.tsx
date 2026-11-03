"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useReducedMotion } from "framer-motion";

import { getLearnerProfile, getJuniorQuests, juniorQuests, juniorBadges } from "@/lib/dashboard/mock-data";
import type { JuniorBadgeType, JuniorAchievement, JuniorEarnedBadge } from "@/types/dashboard";

import { cn } from "@/lib/utils";

/* Achievement page theme colors (Junior) */
const ACHIEVEMENT_THEME = {
  background: "#fffaf4",
  soft: "#fff0e7",
  accent: "#e98757",
  ink: "#512917",
  inkSoft: "#77728a",
  border: "#f1cfbb",
};

/* Badge display names and descriptions */
const BADGE_DISPLAY_INFO: Record<JuniorBadgeType, {
  name: string;
  description: string;
  emoji: string;
}> = {
  first_steps: {
    name: "First Steps",
    description: "Complete your first lesson",
    emoji: "🌱",
  },
  topic_master: {
    name: "Topic Master",
    description: "Complete all activities in a topic",
    emoji: "📚",
  },
  quest_complete: {
    name: "Quest Complete",
    description: "Complete your first quest",
    emoji: "✨",
  },
  daily_streak: {
    name: "Daily Streak",
    description: "Maintain a 3-day learning streak",
    emoji: "🔥",
  },
  perfect_score: {
    name: "Perfect Score",
    description: "Get 100% in an activity",
    emoji: "💯",
  },
  speed_demon: {
    name: "Speed Demon",
    description: "Complete an activity in under 5 minutes",
    emoji: "⚡",
  },
  knowledge_seeker: {
    name: "Knowledge Seeker",
    description: "Complete 5 different topics",
    emoji: "🗺️",
  },
  class_champion: {
    name: "Class Champion",
    description: "Complete all topics in Mathematics",
    emoji: "🏆",
  },
};

/* Earned badge display */
const EARNED_BADGE_COLORS: Record<JuniorBadgeType, string> = {
  first_steps: "#ff6b6b",
  topic_master: "#4ecdc4",
  quest_complete: "#ffe66d",
  daily_streak: "#a855f7",
  perfect_score: "#ff8c42",
  speed_demon: "#14b8a6",
  knowledge_seeker: "#9b59b6",
  class_champion: "#e74c3c",
};

/* Progress bar colors per badge type */
const BADGE_PROGRESS_COLORS: Record<JuniorBadgeType, string> = {
  first_steps: "#ff6b6b",
  topic_master: "#4ecdc4",
  quest_complete: "#ffe66d",
  daily_streak: "#a855f7",
  perfect_score: "#ff8c42",
  speed_demon: "#14b8a6",
  knowledge_seeker: "#9b59b6",
  class_champion: "#e74c3c",
};

export default function JuniorAchievementsPage() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const [earnedBadges, setEarnedBadges] = useState<JuniorEarnedBadge[]>([]);
  const [progressBars, setProgressBars] = useState<Record<JuniorBadgeType, number>>({});
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const classNum = 3; // Default to class 3
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);
  }, []);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading student profile...</p>
      </div>
    );
  }

  const classNum = learnerProfile.currentClass as JuniorClass;
  const theme = ACHIEVEMENT_THEME;

  /* Get earned badges from profile */
  const earnedBadgeTypes = (learnerProfile.earnedBadges || []).map(
    (b: JuniorEarnedBadge) => b.badgeType
  );
  setEarnedBadges(learnerProfile.earnedBadges || []);

  /* Calculate progress for each badge type */
  const calculateProgress = (badgeType: JuniorBadgeType): number => {
    const classConfig = {
      "1": { fontScale: 1.4, lineHeight: 1.8, complexity: "simple", minTargetTime: 5, maxTargetTime: 15, activityCount: 1 },
      "2": { fontScale: 1.3, lineHeight: 1.7, complexity: "simple", minTargetTime: 5, maxTargetTime: 15, activityCount: 1 },
      "3": { fontScale: 1.2, lineHeight: 1.6, complexity: "standard", minTargetTime: 8, maxTargetTime: 20, activityCount: 2 },
      "4": { fontScale: 1.15, lineHeight: 1.5, complexity: "standard", minTargetTime: 10, maxTargetTime: 25, activityCount: 2 },
      "5": { fontScale: 1.1, lineHeight: 1.5, complexity: "standard", minTargetTime: 10, maxTargetTime: 25, activityCount: 3 },
    }[classNum] || { activityCount: 0 };

    const totalActivitiesNeeded = classConfig.activityCount || 0;

    switch (badgeType) {
      case "first_steps":
        return earnedBadgeTypes.includes("first_steps") ? 100 : 0;

      case "topic_master":
        // Count topics with all activities completed
        const completedTopics = (learnerProfile.completedTopics || []).length;
        const totalPossibleTopics = 5; // Math + English + Science + EVS + Art (upper junior) or 3 (lower junior)
        const isUpperJunior = classNum >= 3;
        const topicsForClass = isUpperJunior ? 5 : 3;
        const topicsCompleted = Math.min(completedTopics, topicsForClass);
        return totalActivitiesNeeded > 0 ? (topicsCompleted / totalActivitiesNeeded) * 100 : 0;

      case "quest_complete":
        const completedQuests = (learnerProfile.completedQuests || []).length;
        const totalQuests = juniorQuests.length;
        return totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;

      case "daily_streak":
        const streak = learnerProfile.learningStreak || 0;
        return streak >= 3 ? 100 : Math.min((streak / 3) * 100, 100);

      case "perfect_score":
        // Count activities with 100% score - simplified: check assessment
        const assessmentPct = (learnerProfile.assessmentScore /
          (learnerProfile.assessmentTotal || 100)) * 100;
        return assessmentPct >= 100 ? 100 : 0;

      case "speed_demon":
        // Simplified: check if any recent activity was completed quickly
        return 50; // Placeholder

      case "knowledge_seeker":
        // Count unique topics completed
        const uniqueTopics = new Set((learnerProfile.completedTopics || [])).size;
        return totalActivitiesNeeded > 0 ? (uniqueTopics / totalActivitiesNeeded) * 100 : 0;

      case "class_champion":
        // Check if all Mathematics topics are complete
        const mathTopicsCompleted = (learnerProfile.completedTopics || []).filter(
          (t: string) => t.startsWith("math-")
        ).length;
        const mathTotal = classNum >= 3 ? 5 : 3;
        return mathTopicsCompleted >= mathTotal ? 100 : 0;

      default:
        return 0;
    }
  };

  /* Initialize progress bars for all badges */
  const initProgressBars = () => {
    const badges: JuniorBadgeType[] = [
      "first_steps",
      "topic_master",
      "quest_complete",
      "daily_streak",
      "perfect_score",
      "speed_demon",
      "knowledge_seeker",
      "class_champion",
    ];
    const bars: Record<JuniorBadgeType, number> = {};
    badges.forEach(badge => {
      bars[badge] = calculateProgress(badge);
    });
    setProgressBars(bars);
  };

  initProgressBars();

  /* Handle badge earned animation */
  const handleBadgeEarned = (badgeType: JuniorBadgeType) => {
    const newEarnedBadge: JuniorEarnedBadge = {
      id: `badge-earned-${Date.now()}`,
      badgeType,
      earnedAt: new Date().toISOString(),
      subject: "Mathematics", // Would be determined by context
    };

    setEarnedBadges(prev => [...prev, newEarnedBadge]);
    initProgressBars(); // Recalculate progress
  };

  /* Get badge completion status */
  const getBadgeStatus = (badgeType: JuniorBadgeType) => {
    const progress = progressBars[badgeType];
    const isEarned = earnedBadgeTypes.includes(badgeType);
    const isComplete = progress >= 100;

    return { progress, isEarned, isComplete };
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/junior/world"
            className={cn(
              "flex items-center gap-2 text-[theme.accent] hover:text-[theme.accentDark] transition-colors",
              "text-sm font-medium"
            )}
          >
            ← Back to World Map
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-[theme.inkSmall] font-medium">
              {learnerProfile.fullName}
            </span>
            <span className="text-[theme.inkSmall]">
              • Class {learnerProfile.currentClass}
            </span>
          </div>
        </div>

        {/* Achievements Overview */}
        <div className="rounded-2xl bg-[theme.background] border border-[theme.border] p-6 mb-8">
          <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-3">
            Achievements & Badges
          </h3>
          <p className="text-[theme.inkSmall]">
            Collect badges by completing learning activities
          </p>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {earnedBadges.map((badge, index) => {
              const color = EARNED_BADGE_COLORS[badge.badgeType];
              const info = BADGE_DISPLAY_INFO[badge.badgeType];

              return (
                <div
                  key={badge.id}
                  className={cn(
                    "rounded-lg p-3 text-center",
    { background: color, color: "white" }
                  )}
                >
                  <span className="text-2xl mb-2">{info.emoji}</span>
                  <p className="text-[theme.inkSmall] font-medium">{info.name}</p>
                  <p className="text-[theme.inkSmall]">{info.description}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Progress Toward Badges */}
        {!earnedBadges.length || earnedBadges.length < 8 && (
          <div>
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-4">
              Progress Toward Badges
            </h3>
            <div className="space-y-3">
              {["first_steps", "topic_master", "quest_complete", "daily_streak", "perfect_score", "speed_demon", "knowledge_seeker", "class_champion"].map(
                badgeType => {
                  const { progress, isEarned, isComplete } = getBadgeStatus(
                    badgeType as JuniorBadgeType
                  );
                  const info = BADGE_DISPLAY_INFO[badgeType];

                  return (
                    <div
                      key={badgeType}
                      className="rounded-lg bg-white p-4 border border-[theme.border] hover:bg-[theme.soft] transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[theme.inkSmall]">
                          {info?.name || badgeType}
                        </span>
                        <span className="text-[theme.inkSmall] font-medium">
                          {progress}%
                        </span>
                      </div>

                      <div className="h-2 rounded-full bg-[theme.background] overflow-hidden mb-3">
                        <div
                          className={`h-full rounded-full ${BADGE_PROGRESS_COLORS[badgeType]} transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>

                      {!isEarned && (
                        <p className="text-[theme.inkSmall] mb-2">
                          {info?.description || "Keep learning!"}
                        </p>
                      )}

                      {isComplete && !isEarned && (
                        <button
                          onClick={() => handleBadgeEarned(badgeType as JuniorBadgeType)}
                          className="inline-flex items-center gap-2 rounded-lg bg-[theme.accent] text-white px-3 py-2 text-[theme.inkSmall] font-medium transition-colors hover:bg-[darken(theme.accent, 10)]"
                        >
                          Claim Badge
                          <svg className="transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M5 12hM12 5lM19 12lM5 12" />
                          </svg>
                        </button>
                      )}

                      {isEarned && (
                        <p className="text-[theme.inkSmall] text-[theme.accent]">
                          ✓ Earned
                        </p>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}