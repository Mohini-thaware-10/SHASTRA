/* Junior Progress Module
 * Centralized student progress state management
 * Derives progress and reward summaries from learning events
 * Handles invalid or missing local data safely
 */

import type {
  JuniorClass,
  JuniorTopic,
  JuniorActivity,
  JuniorLesson,
  JuniorQuest,
  JuniorBadgeType,
  JuniorEarnedBadge,
  JuniorAchievement,
  TopicProgress,
  JuniorActivityResult,
  ActivityResult,
  ActivityAnswerState,
  LessonStepType,
  LessonStep,
  JuniorLesson as LessonType,
  JUNIOR_REWARD_CONFIG,
  calculateXPReward,
  calculateCoinReward,
} from "@/lib/junior/curriculum";
import type { LearnerProfile } from "@/types/dashboard";

/** Progress state for a topic */
export type TopicState = "locked" | "available" | "inProgress" | "completed";

/** Progress state for a lesson */
export type LessonState = "not-started" | "inProgress" | "completed";

/** Student progress summary */
export interface JuniorProgressSummary {
  totalXP: number;
  currentLevel: number;
  coins: number;
  learningStreak: number;
  highestStreak: number;
  lessonsCompleted: number;
  topicsCompleted: number;
  activitiesCompleted: number;
  questsCompleted: number;
  xpTowardsNextLevel: number;
  xpNeededForNextLevel: number;
}

/** Topic progress record */
export interface TopicProgressRecord {
  topicId: string;
  topicTitle: string;
  state: TopicState;
  completedActivities: number;
  totalActivities: number;
  progressPercentage: number;
}

/** Lesson progress record */
export interface LessonProgressRecord {
  lessonId: string;
  lessonTitle: string;
  state: LessonState;
  completedSteps: number;
  totalSteps: number;
}

/** Quest progress record */
export interface QuestProgressRecord {
  questId: string;
  questTitle: string;
  subject: string;
  topicId: string;
  difficulty: "easy" | "medium" | "hard";
  state: "available" | "inProgress" | "completed";
  progressPercentage: number;
  estimatedDurationMinutes: number;
}

/** Activity interaction state */
export interface ActivityInteractionState {
  questionId: string;
  selectedOptionId: string | null;
  answerState: ActivityAnswerState;
  feedback: string;
  isSubmitted: boolean;
}

/** Daily goal progress */
export interface DailyGoalProgress {
  targetMinutes: number;
  completedMinutes: number;
  remainingMinutes: number;
  progressPercentage: number;
  suggestedAction: string;
}

/** Create initial progress state for a learner */
export function createInitialProgress(
  classNum: JuniorClass,
  learnerProfile: Partial<LearnerProfile> = {}
): JuniorProgressSummary {
  const isUpperJunior = classNum >= 3;

  return {
    totalXP: learnerProfile.totalXP ?? 0,
    currentLevel: learnerProfile.currentLevel ?? 1,
    coins: learnerProfile.coins ?? 0,
    learningStreak: learnerProfile.learningStreak ?? 0,
    highestStreak: learnerProfile.highestStreak ?? 0,
    lessonsCompleted: learnerProfile.lessonsCompleted ?? 0,
    topicsCompleted: learnerProfile.completedTopics?.length ?? 0,
    activitiesCompleted: learnerProfile.activitiesCompleted ?? 0,
    questsCompleted: (learnerProfile.completedQuests?.length ?? 0),
    xpTowardsNextLevel: learnerProfile.totalXP ?? 0,
    xpNeededForNextLevel: calculateXPForLevel(classNum),
  };
}

/** Calculate XP needed for next level */
export function calculateXPForLevel(classNum: JuniorClass): number {
  const isUpperJunior = classNum >= 3;
  // XP required increases with class level
  const baseXP = isUpperJunior ? 100 : 50;
  // Add bonus based on class number
  return baseXP + classNum * 10;
}

/** Calculate progress toward next level */
export function calculateProgressToNextLevel(
  currentXP: number,
  xpNeededForLevel: number
): { progressPercentage: number; xpTowardsNextLevel: number; xpNeededForNextLevel: number } {
  const progressPercentage = Math.min(Math.round((currentXP % xpNeededForLevel) / xpNeededForLevel * 100), 100);
  const xpTowardsNextLevel = currentXP % xpNeededForLevel;
  const xpNeededForNextLevel = xpNeededForLevel;
  return { progressPercentage, xpTowardsNextLevel, xpNeededForNextLevel };
}

/** Update progress after activity completion */
export function updateProgressAfterActivity(
  currentProgress: JuniorProgressSummary,
  learnerProfile: Partial<LearnerProfile>
): JuniorProgressSummary {
  const newXP = (currentProgress.totalXP || 0) + calculateXPReward("activity", "xpForActivity");
  const newCoins = (currentProgress.coins || 0) + calculateCoinReward("activity", "coinsForActivity");

  return {
    totalXP: newXP,
    currentLevel: currentProgress.currentLevel,
    coins: newCoins,
    learningStreak: learnerProfile.learningStreak ?? currentProgress.learningStreak,
    highestStreak: Math.max(
      currentProgress.highestStreak ?? 0,
      (learnerProfile.learningStreak ?? currentProgress.learningStreak) || 0
    ),
    lessonsCompleted:
      learnerProfile.lessonsCompleted !== undefined
        ? learnerProfile.lessonsCompleted
        : (currentProgress.lessonsCompleted || 0) + 1,
    topicsCompleted:
      learnerProfile.completedTopics?.length > 0
        ? learnerProfile.completedTopics.length
        : (currentProgress.topicsCompleted || 0) + 1,
    activitiesCompleted:
      learnerProfile.activitiesCompleted !== undefined
        ? learnerProfile.activitiesCompleted
        : (currentProgress.activitiesCompleted || 0) + 1,
    questsCompleted: currentProgress.questsCompleted,
    xpTowardsNextLevel: newXP,
    xpNeededForNextLevel: calculateXPForLevel(
      learnerProfile.currentClass ? parseInt(learnerProfile.currentClass) : 1
    ),
  };
}

/** Update progress after lesson completion */
export function updateProgressAfterLessonComplete(
  currentProgress: JuniorProgressSummary,
  learnerProfile: Partial<LearnerProfile>
): JuniorProgressSummary {
  const newXP = (currentProgress.totalXP || 0) + calculateXPReward("lesson", "xpForLessonComplete");
  const newCoins = (currentProgress.coins || 0) + calculateCoinReward("lesson", "coinsForLessonComplete");

  return {
    totalXP: newXP,
    currentLevel: currentProgress.currentLevel,
    coins: newCoins,
    learningStreak: learnerProfile.learningStreak ?? currentProgress.learningStreak,
    highestStreak: Math.max(
      currentProgress.highestStreak ?? 0,
      (learnerProfile.learningStreak ?? currentProgress.learningStreak) || 0
    ),
    lessonsCompleted:
      learnerProfile.lessonsCompleted !== undefined
        ? learnerProfile.lessonsCompleted
        : (currentProgress.lessonsCompleted || 0) + 1,
    topicsCompleted: currentProgress.topicsCompleted,
    activitiesCompleted: currentProgress.activitiesCompleted,
    questsCompleted: currentProgress.questsCompleted,
    xpTowardsNextLevel: newXP,
    xpNeededForNextLevel: calculateXPForLevel(
      learnerProfile.currentClass ? parseInt(learnerProfile.currentClass) : 1
    ),
  };
}

/** Update progress after quest completion */
export function updateProgressAfterQuestComplete(
  currentProgress: JuniorProgressSummary,
  quest: JuniorQuest,
  learnerProfile: Partial<LearnerProfile>
): JuniorProgressSummary {
  const newXP = (currentProgress.totalXP || 0) + calculateXPReward("quest", "xpForQuestComplete");
  const newCoins = (currentProgress.coins || 0) + calculateCoinReward("quest", "coinsForQuestComplete");

  // Add earned badge if quest has reward badge
  const earnedBadges = learnerProfile.earnedBadges || [];
  if (quest.rewardBadge) {
    const badgeExists = earnedBadges.some((b) => b.badgeType === quest.rewardBadge);
    if (!badgeExists) {
      earnedBadges.push({
        id: `badge-${quest.rewardBadge}-${Date.now()}`,
        badgeType: quest.rewardBadge,
        earnedAt: new Date().toISOString(),
        subject: quest.subject,
      });
    }
  }

  return {
    totalXP: newXP,
    currentLevel: currentProgress.currentLevel,
    coins: newCoins,
    learningStreak: learnerProfile.learningStreak ?? currentProgress.learningStreak,
    highestStreak: Math.max(
      currentProgress.highestStreak ?? 0,
      (learnerProfile.learningStreak ?? currentProgress.learningStreak) || 0
    ),
    lessonsCompleted: currentProgress.lessonsCompleted,
    topicsCompleted: currentProgress.topicsCompleted,
    activitiesCompleted: currentProgress.activitiesCompleted,
    questsCompleted: (currentProgress.questsCompleted || 0) + 1,
    xpTowardsNextLevel: newXP,
    xpNeededForNextLevel: calculateXPForLevel(
      learnerProfile.currentClass ? parseInt(learnerProfile.currentClass) : 1
    ),
  };
}

/** Get daily goal progress based on learner profile */
export function getDailyGoalProgress(
  learnerProfile: Partial<LearnerProfile>,
  classNum: JuniorClass
): DailyGoalProgress {
  const targetMinutes = 20 + classNum * 5; // 25 for class 1, 30 for class 2, etc.
  const completedMinutes = (learnerProfile.learningStreak ?? 0) % 7 * 3 + (learnerProfile.currentLevel ?? 1) * 2;
  const completedMinutesClamped = Math.max(0, Math.min(completedMinutes, targetMinutes - 1));
  const remainingMinutes = Math.max(0, targetMinutes - completedMinutesClamped);
  const progressPercentage = Math.round((completedMinutesClamped / targetMinutes) * 100);

  // Suggested action based on progress
  let suggestedAction: string;
  if (progressPercentage >= 100) {
    suggestedAction = "Goal achieved! Start a new session.";
  } else if (progressPercentage >= 75) {
    suggestedAction = "Almost there! Finish strong.";
  } else if (progressPercentage >= 50) {
    suggestedAction = "Keep going - take a short break.";
  } else {
    suggestedAction = "Start your daily learning session.";
  }

  return {
    targetMinutes,
    completedMinutes: completedMinutesClamped,
    remainingMinutes,
    progressPercentage,
    suggestedAction,
  };
}

/** Get recommended quests based on learner progress */
export function getRecommendedQuests(
  learnerProfile: Partial<LearnerProfile>,
  allQuests: readonly JuniorQuest[]
): JuniorQuest[] {
  const classNum = learnerProfile.currentClass ? parseInt(learnerProfile.currentClass) : 1;
  const completedTopicIds = new Set(learnerProfile.completedTopics || []);
  const completedQuestIds = new Set(learnerProfile.completedQuests || []);

  // Filter quests that are available and relevant to learner's class
  const relevantQuests = allQuests.filter((quest) => {
    // Check if quest is not already completed
    if (completedQuestIds.has(quest.id)) return false;

    // Check topic unlock requirement
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
    if (classNum < requiredClass) return false;

    // Check if topic is completed (for quests that require topic completion)
    if (quest.completionCondition === "activitiesCompleted" || quest.completionCondition === "completeLesson") {
      return completedTopicIds.has(quest.topicId);
    }

    return true;
  });

  // Sort by difficulty (prefer easier quests first for lower classes, medium for upper)
  const difficultyPriority: Record<string, number> = { easy: 1, medium: 2, hard: 3 };
  return relevantQuests.sort((a, b) => (difficultyPriority[a.difficulty] || 1) - (difficultyPriority[b.difficulty] || 1));
}

/** Get topic state for a given topic */
export function getTopicState(
  topicId: string,
  completedTopics: string[],
  completedLessons: string[],
  completedQuests: string[]
): TopicState {
  if (completedLessons.includes(topicId)) return "completed";
  if (completedTopics.includes(topicId)) return "available";
  return "locked";
}

/** Get lesson state */
export function getLessonState(
  lessonId: string,
  completedLessons: string[]
): LessonState {
  if (completedLessons.includes(lessonId)) return "completed";
  return "not-started";
}

/** Check if a badge can be attempted */
export function canAttemptBadge(
  badgeType: JuniorBadgeType,
  learnerProfile: Partial<LearnerProfile>
): { canAttempt: boolean; progress: number; requirement: string } {
  const completedTopics = learnerProfile.completedTopics || [];
  const completedQuests = learnerProfile.completedQuests || [];
  const learningStreak = learnerProfile.learningStreak || 0;
  const assessmentScore = learnerProfile.assessmentScore;

  switch (badgeType) {
    case "first_steps":
      return {
        canAttempt: !completedTopics.length > 0 ? false : true,
        progress: completedTopics.length > 0 ? 100 : 0,
        requirement: "Complete your first lesson",
      };

    case "topic_master":
      const totalTopics = completedTopics.length + (learnerProfile.currentClass ? 3 : 0);
      const progress = totalTopics > 0 ? Math.round((completedTopics.length / totalTopics) * 100) : 0;
      return {
        canAttempt: progress < 100,
        progress,
        requirement: "Complete all activities in a topic",
      };

    case "quest_complete":
      const totalQuests = 7; // defined in mock data
      const progress = totalQuests > 0 ? Math.round((completedQuests.length / totalQuests) * 100) : 0;
      return {
        canAttempt: progress < 100,
        progress,
        requirement: "Complete your first quest",
      };

    case "daily_streak":
      const currentStreak = learningStreak;
      const progress = currentStreak >= 3 ? 100 : currentStreak;
      return {
        canAttempt: currentStreak < 7, // Can still attempt up to 7 days
        progress: Math.min(progress, 100),
        requirement: `Maintain a ${currentStreak >= 3 ? "3-day" : "learning"} streak`,
      };

    case "perfect_score":
      const total = learnerProfile.assessmentTotal || 100;
      const score = learnerProfile.assessmentScore || 0;
      const progress = total > 0 ? Math.round((score / total) * 100) : 0;
      return {
        canAttempt: progress < 100,
        progress,
        requirement: "Score 100% in any activity",
      };

    case "speed_demon":
      return {
        canAttempt: true,
        progress: 50,
        requirement: "Complete an activity in under 5 minutes",
      };

    case "knowledge_seeker":
      const uniqueTopics = new Set(completedTopics).size;
      const totalKnowledgeTopics = 5;
      const progress = totalKnowledgeTopics > 0 ? Math.round((uniqueTopics / totalKnowledgeTopics) * 100) : 0;
      return {
        canAttempt: progress < 100,
        progress,
        requirement: "Complete 5 different topics",
      };

    case "class_champion":
      const mathTopics = completedTopics.filter((t: string) => t.startsWith("math-"));
      const mathTotal = learnerProfile.currentClass ? (parseInt(learnerProfile.currentClass) >= 3 ? 5 : 3) : 3;
      const progress = mathTopics.length >= mathTotal ? 100 : mathTopics.length;
      return {
        canAttempt: progress < mathTotal,
        progress: Math.min(progress, 100),
        requirement: `Complete all Mathematics topics (${mathTotal} total)`,
      };

    default:
      return { canAttempt: false, progress: 0, requirement: "Unknown badge" };
  }
}