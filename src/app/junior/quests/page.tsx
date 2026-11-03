"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useReducedMotion } from "framer-motion";

import { getLearnerProfile, getJuniorQuests, juniorQuests } from "@/lib/dashboard/mock-data";
import type { JuniorQuest, JuniorClass } from "@/types/dashboard";

import { cn } from "@/lib/utils";
import { JuniorClass } from "@/types/dashboard";

/* Quest page theme colors (Junior) */
const QUEST_THEME = {
  background: "#fffaf4",
  soft: "#fff0e7",
  accent: "#e98757",
  ink: "#512917",
  inkSoft: "#77728a",
  border: "#f1cfbb",
};

/* Badge display names */
const BADGE_DISPLAY_NAMES: Record<string, string> = {
  first_steps: "First Steps",
  topic_master: "Topic Master",
  quest_complete: "Quest Complete",
  daily_streak: "Daily Streak",
  perfect_score: "Perfect Score",
  speed_demon: "Speed Demon",
  knowledge_seeker: "Knowledge Seeker",
  class_champion: "Class Champion",
};

/* Get badge emoji */
const BADGE_EMOJIS: Record<string, string> = {
  first_steps: "🌱",
  topic_master: "📚",
  quest_complete: "✨",
  daily_streak: "🔥",
  perfect_score: "💯",
  speed_demon: "⚡",
  knowledge_seeker: "🗺️",
  class_champion: "🏆",
};

export default function JuniorQuestsPage() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const [completedQuests, setCompletedQuests] = useState<JuniorQuest[]>([]);
  const [availableQuests, setAvailableQuests] = useState<JuniorQuest[]>([]);
  const [showQuestDetail, setShowQuestDetail] = useState<{ quest: JuniorQuest | null; topic: JuniorTopic | null }>({ quest: null, topic: null });
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
  const theme = QUEST_THEME;
  const allQuests = getJuniorQuests(learnerProfile);
  const unlockedQuests = allQuests.filter(q => {
    // Check if quest topic is unlocked based on class
    const topicClasses: Record<string, number> = {
      "math-1-1": 1, "math-1-2": 1, "math-1-3": 1,
      "eng-1-1": 1, "eng-1-2": 1,
      "sci-1-1": 1, "sci-1-2": 1,
      "evs-1-1": 1, "evs-1-2": 1,
      "math-3-1": 3, "math-3-2": 3, "math-3-3": 3, "math-5-1": 5,
      "eng-2-1": 3, "eng-3-1": 3,
      "sci-2-1": 3, "sci-3-1": 3,
      "evs-3-1": 3, "evs-1-3": 1,
    };
    return classNum >= (topicClasses[q.topicId] || 1);
  });

  completedQuests.unlockedQuests = unlockedQuests;
  setCompletedQuests(unlockedQuests);
  setAvailableQuests(allQuests.filter(q => !unlockedQuests.includes(q)));

  /* Handle quest start */
  const handleStartQuest = (quest: JuniorQuest) => {
    setShowQuestDetail({ quest, topic: null });
  };

  /* Handle quest complete */
  const handleQuestComplete = (quest: JuniorQuest) => {
    // Mark quest as completed
    const updatedQuests = allQuests.map(q =>
      q.id === quest.id ? { ...q, isCompleted: true, progress: 100 } : q
    );

    // Update learner profile - add to completed quests
    const completedQuestIds = (learnerProfile.completedQuests || []).concat(quest.id);

    // Award XP and coins
    const rewardXP = quest.rewardXP;
    const rewardCoins = quest.rewardCoins;

    // Update badges
    const badge = quest.rewardBadge;
    const updatedBadges = (learnerProfile.earnedBadges || []).filter(
      b => b.badgeType !== badge
    );
    if (badge) {
      updatedBadges.push({
        id: `badge-${badge}-${Date.now()}`,
        badgeType: badge,
        earnedAt: new Date().toISOString(),
        subject: quest.subject,
      });
    }

    // Create updated profile
    const updatedProfile: LearnerProfile = {
      ...learnerProfile,
      completedQuests: completedQuestIds,
      totalXP: (learnerProfile.totalXP || 0) + rewardXP,
      coins: (learnerProfile.coins || 0) + rewardCoins,
      earnedBadges: updatedBadges,
    };

    setLearnerProfile(updatedProfile);
    setShowQuestDetail({ quest: null, topic: null });
    router.push(`/junior/quests`);
  };

  /* Handle back to quests list */
  const handleBackToQuests = () => {
    setShowQuestDetail({ quest: null, topic: null });
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

        {/* Quests Overview */}
        <div className="rounded-2xl bg-[theme.background] border border-[theme.border] p-6 mb-8">
          <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-3">
            Learning Quests
          </h3>
          <p className="text-[theme.inkSmall]">
            Complete quests to earn XP, coins, and badges
          </p>
        </div>

        {/* Available Quests */}
        {availableQuests.length > 0 && (
          <div className="space-y-4">
            {availableQuests.map(quest => {
              const topicClasses: Record<string, number> = {
                "math-1-1": 1, "math-1-2": 1, "math-1-3": 1,
                "eng-1-1": 1, "eng-1-2": 1,
                "sci-1-1": 1, "sci-1-2": 1,
                "evs-1-1": 1, "evs-1-2": 1,
                "math-3-1": 3, "math-3-2": 3, "math-3-3": 3, "math-5-1": 5,
                "eng-2-1": 3, "eng-3-1": 3,
                "sci-2-1": 3, "sci-3-1": 3,
                "evs-3-1": 3, "evs-1-3": 1,
              };
              const isUnlocked = classNum >= (topicClasses[quest.topicId] || 1);

              return (
                <div
                  key={quest.id}
                  className={cn(
                    "rounded-lg bg-white p-5 border border-[theme.border] hover:bg-[theme.soft] transition-colors cursor-pointer",
                    !isUnlocked && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => handleStartQuest(quest)}
                  style={{ background: "white" }}
                >
                  <div className="flex items-start justify-between mb-3">
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
                        {quest.difficulty.toUpperCase()}
                      </span>
                      <br />
                      <span className="text-[theme.inkSmall]">
                        {quest.estimatedDurationMinutes} min
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[theme.border]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[theme.inkSmall]">Reward</span>
                      <span className="text-[theme.accent] font-medium">
                        +{quest.rewardXP} XP • {quest.rewardCoins} coins
                      </span>
                    </div>
                    <p className="text-[theme.inkSmall]">
                      {quest.conditionValue === 100
                        ? "Score 100% in an activity"
                        : quest.conditionValue === 1
                          ? "Complete the topic"
                          : `Complete ${quest.conditionValue} activities`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Completed Quests */}
        {completedQuests.length > 0 && (
          <div className="mt-8">
            <h3 className="text-[theme.accent] text-sm font-semibold uppercase tracked mb-3">
              Completed Quests
            </h3>
            <div className="space-y-3">
              {completedQuests.map(quest => {
                const badgeEmoji = BADGE_EMOJIS[quest.rewardBadge] || "🏅";
                const badgeName = BADGE_DISPLAY_NAMES[quest.rewardBadge] || "Badge";

                return (
                  <div
                    key={quest.id}
                    className="rounded-lg bg-white p-4 border border-[theme.border] flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded bg-[theme.soft] flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium">
                        {badgeEmoji}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-[theme.accent]">
                        {quest.title}
                      </h4>
                      <p className="text-[theme.inkSmall]">
                        {quest.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[theme.inkSmall]">
                        {quest.progress}% complete
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Active Quest Detail */}
        {showQuestDetail.quest && (
          <div className="mt-8 rounded-lg bg-white p-6 mb-6 border border-[theme.border]">
            <h3 className="text-[theme.accent] text-lg font-semibold mb-4">
              {showQuestDetail.quest.title}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[theme.inkSmall] mb-1">Subject</p>
                <p className="font-medium text-[theme.accent]">
                  {showQuestDetail.quest.subject}
                </p>
              </div>
              <div>
                <p className="text-[theme.inkSmall] mb-1">Difficulty</p>
                <p className="font-medium text-[theme.accent]">
                  {showQuestDetail.quest.difficulty.toUpperCase()}
                </p>
              </div>
            </div>

            <p className="text-[theme.inkSmall] mb-4">
              {showQuestDetail.quest.description}
            </p>

            <div className="mb-4">
              <p className="text-[theme.inkSmall] mb-1">Estimated Duration</p>
              <p className="font-medium">
                {showQuestDetail.quest.estimatedDurationMinutes} minutes
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[theme.inkSmall] mb-1">Reward</p>
              <p className="font-medium text-[theme.accent]">
                +{showQuestDetail.quest.rewardXP} XP • {showQuestDetail.quest.rewardCoins} coins
              </p>
              {showQuestDetail.quest.rewardBadge && (
                <p className="text-[theme.inkSmall] mt-2">
                  Earned: {BADGE_DISPLAY_NAMES[showQuestDetail.quest.rewardBadge]}
                </p>
              )}
            </div>

            {!showQuestDetail.quest.isCompleted && (
              <button
                onClick={() => handleQuestComplete(showQuestDetail.quest)}
                className="inline-flex items-center gap-2 rounded-lg bg-[theme.accent] text-white px-6 py-3 font-medium transition-colors hover:bg-[darken(theme.accent, 10)]"
              >
                <svg className="transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                Complete Quest
              </button>
            )}

            {showQuestDetail.quest.isCompleted && (
              <div className="mt-4 p-3 bg-[theme.soft] rounded border border-[theme.accent]">
                <p className="text-[theme.inkSmall]">
                  ✓ Quest Complete! Rewards have been added to your profile.
                </p>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}