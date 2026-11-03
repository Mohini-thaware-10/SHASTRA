/* Junior Quest Engine
 * Core quest logic and completion conditions
 * Links quest completion to actual learning activity completion
 * Prevents duplicate quest rewards
 */

import type {
  JuniorQuest,
  JuniorQuest,
  JuniorEarnedBadge,
  JuniorBadgeType,
  LearnerProfile,
  JuniorProgressSummary,
  TopicProgressRecord,
} from "@/lib/junior/curriculum";
import type { LearnerProfile as LPType } from "@/types/dashboard";

/** Check if a quest is available for a learner */
export function isQuestAvailable(
  quest: JuniorQuest,
  learnerProfile: LPType
): boolean {
  const completedQuests = learnerProfile.completedQuests || [];
  const completedTopics = learnerProfile.completedTopics || [];

  // Check if already completed
  if (completedQuests.includes(quest.id)) return false;

  // Check topic unlock based on class
  const topicClassMap: Record<string, number> = {
    "math-1-1": 1, "math-1-2": 1, "math-1-3": 1,
    "eng-1-1": 1, "eng-1-2": 1,
    "sci-1-1": 1, "sci-1-2": 1,
    "evs-1-1": 1, "evs-1-2": 1,
    "math-3-1": 3, "math-3-2": 3, "math-3-3": 3, "math-5-1": 5,
    "eng-2-1": 3, "eng-3-1": 3,
    "sci-2-1": 3, "sci-3-1": 3,
    "evs-3-1": 3, "evs-1-3": 1,
  };

  const requiredClass = topicClassMap[quest.topicId] || 1;
  const learnerClass = learnerProfile.currentClass ? parseInt(learnerProfile.currentClass) : 1;

  if (learnerClass < requiredClass) return false;

  // Check completion condition
  switch (quest.completionCondition) {
    case "completeLesson":
      // Quest requires completing a lesson on the topic
      const completedLessons = learnerProfile.completedLessons || [];
      // Check if any lesson on this topic is completed
      const topicLessonsCompleted = (learnerProfile.completedTopics || []).includes(quest.topicId);
      return topicLessonsCompleted;

    case "activitiesCompleted":
      // Quest requires completing all activities in the topic
      const topicActivities = learnerProfile.topicProgress?.find(
        (tp: { topicId: string }) => tp.topicId === quest.topicId
      );
      if (!topicActivities) return false;
      return topicActivities.completedActivities >= topicActivities.totalActivities;

    case "scoreAbove":
      // Quest requires scoring above a threshold
      const assessmentPct = (learnerProfile.assessmentScore /
        (learnerProfile.assessmentTotal || 100)) * 100;
      return assessmentPct >= quest.conditionValue;

    case "streakDays":
      // Quest requires maintaining a streak
      return (learnerProfile.learningStreak || 0) >= quest.conditionValue;

    default:
      return true;
  }
}

/** Mark a quest as completed and award rewards */
export function completeQuest(
  quest: JuniorQuest,
  learnerProfile: LPType
): {
  updatedProfile: LPType & { completedQuests: string[]; earnedBadges: JuniorEarnedBadge[] };
  xpGained: number;
  coinsGained: number;
  badgeEarned?: JuniorBadgeType;
} {
  // Mark quest as completed
  const updatedCompletedQuests = [...(learnerProfile.completedQuests || []), quest.id];

  // Calculate rewards
  const xpGained = calculateXPReward("quest", "xpForQuestComplete");
  const coinsGained = calculateCoinReward("quest", "coinsForQuestComplete");

  // Handle reward badge
  let earnedBadge: JuniorBadgeType | undefined;
  if (quest.rewardBadge) {
    const alreadyEarned = (learnerProfile.earnedBadges || []).some(
      (b) => b.badgeType === quest.rewardBadge
    );
    if (!alreadyEarned) {
      earnedBadge = quest.rewardBadge as JuniorBadgeType;
    }
  }

  // Create updated profile type
  const updatedProfile: LPType & {
    completedQuests: string[];
    earnedBadges: JuniorEarnedBadge[];
  } = {
    ...learnerProfile,
    completedQuests: updatedCompletedQuests,
    earnedBadges: learnerProfile.earnedBadges || [],
  };

  // Add badge if earned
  if (earnedBadge && !updatedProfile.earnedBadges.some((b) => b.badgeType === earnedBadge)) {
    ;(updatedProfile.earnedBadges as JuniorEarnedBadge[]).push({
      id: `badge-${earnedBadge}-${Date.now()}`,
      badgeType: earnedBadge,
      earnedAt: new Date().toISOString(),
      subject: quest.subject,
    });
  }

  return {
    updatedProfile,
    xpGained,
    coinsGained,
    badgeEarned: earnedBadge,
  };
}

/** Get available quests for a learner */
export function getAvailableQuests(
  learnerProfile: LPType,
  allQuests: JuniorQuest[]
): JuniorQuest[] {
  const completedQuests = learnerProfile.completedQuests || [];

  return allQuests.filter((quest) => {
    // Already completed
    if (completedQuests.includes(quest.id)) return false;

    // Check availability based on class and progress
    const topicClassMap: Record<string, number> = {
      "math-1-1": 1, "math-1-2": 1, "math-1-3": 1,
      "eng-1-1": 1, "eng-1-2": 1,
      "sci-1-1": 1, "sci-1-2": 1,
      "evs-1-1": 1, "evs-1-2": 1,
      "math-3-1": 3, "math-3-2": 3, "math-3-3": 3, "math-5-1": 5,
      "eng-2-1": 3, "eng-3-1": 3,
      "sci-2-1": 3, "sci-3-1": 3,
      "evs-3-1": 3, "evs-1-3": 1,
    };

    const requiredClass = topicClassMap[quest.topicId] || 1;
    const learnerClass = learnerProfile.currentClass ? parseInt(learnerProfile.currentClass) : 1;

    if (learnerClass < requiredClass) return false;

    // Check completion condition
    const completedTopics = learnerProfile.completedTopics || [];

    switch (quest.completionCondition) {
      case "completeLesson":
        // Check if topic lessons are completed
        const topicLessonsDone = completedTopics.includes(quest.topicId);
        return topicLessonsDone;

      case "activitiesCompleted":
        const topicProgress = learnerProfile.topicProgress?.find(
          (tp: { topicId: string }) => tp.topicId === quest.topicId
        );
        if (!topicProgress) return false;
        return topicProgress.completedActivities >= topicProgress.totalActivities;

      case "scoreAbove":
        const assessmentPct = (learnerProfile.assessmentScore /
          (learnerProfile.assessmentTotal || 100)) * 100;
        return assessmentPct >= quest.conditionValue;

      case "streakDays":
        return (learnerProfile.learningStreak || 0) >= quest.conditionValue;

      default:
        return true;
    }
  });
}

/** Get quest progress percentage */
export function getQuestProgress(
  quest: JuniorQuest,
  learnerProfile: LPType
): number {
  const completedQuests = learnerProfile.completedQuests || [];
  const completedTopics = learnerProfile.completedTopics || [];

  switch (quest.completionCondition) {
    case "completeLesson":
      // Check if topic is completed
      return completedTopics.includes(quest.topicId) ? 100 : 0;

    case "activitiesCompleted":
      const topicProgress = learnerProfile.topicProgress?.find(
        (tp: { topicId: string }) => tp.topicId === quest.topicId
      );
      if (!topicProgress) return 0;
      return Math.round(
        (topicProgress.completedActivities / topicProgress.totalActivities) * 100
      );

    case "scoreAbove":
      const assessmentPct = (learnerProfile.assessmentScore /
        (learnerProfile.assessmentTotal || 100)) * 100;
      return Math.min(Math.round(assessmentPct), 100);

    case "streakDays":
      const streak = learnerProfile.learningStreak || 0;
      return Math.min(Math.round((streak / quest.conditionValue) * 100), 100);

    default:
      const completed = completedQuests.includes(quest.id);
      return completed ? 100 : 0;
  }
}