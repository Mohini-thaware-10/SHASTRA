export interface LearnerProfile {
  fullName: string;
  currentClass: string;
  board: "CBSE" | "ICSE" | "State Board" | "IB" | "Other";
  currentUniverse: UniverseId;
  selectedSubjects: readonly string[];
  assessmentScore?: number;
  assessmentTotal?: number;
  learningStreak: number;
  highestStreak?: number;
  totalXP: number;
  currentLevel: number;
  coins: number;
}

export interface DailyGoal {
  targetMinutes: number;
  completedMinutes: number;
  remainingMinutes: number;
  progressPercentage: number;
  suggestedAction: string;
}

export interface LearningCard {
  id: string;
  subject: string;
  topic: string;
  lessonTitle: string;
  progressPercentage: number;
  estimatedDuration: number;
  lastActivity: string;
  continueLabel: string;
}

export interface SubjectCard {
  id: string;
  name: string;
  icon: string;
  topicsCompleted: number;
  totalTopics: number;
  progressPercentage: number;
  masteryClassification: "mastering" | "developing" | "building";
  continueLabel: string;
}

export interface LearningJourneyNode {
  id: string;
  title: string;
  subject: string;
  stage: "locked" | "unlocked" | "completed";
  isCurrent: boolean;
  isMilestone: boolean;
}

export interface GPProgress {
  totalXP: number;
  currentLevel: number;
  currentStreak: number;
  highestStreak?: number;
  coins: number;
  recentlyUnlocked: readonly string[];
}

export interface Recommendation {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedDuration: number;
  reason: string;
  actionLabel: string;
}

export interface ActivityEvent {
  id: string;
  type: "lesson" | "quest" | "achievement" | "revision";
  description: string;
  subject: string;
  timestamp: string;
  visualIndicator: string;
}

export interface AssessmentResult {
  score: number;
  total: number;
  percentage: number;
  subjectAccuracies: Record<string, number>;
  topicGaps: readonly string[];
}

export type UniverseId = "junior" | "nexus" | "ascend";

export type Stream = "science" | "commerce" | "arts" | "general";

/* Junior age range: Classes 1-2 (early) and 3-5 (middle)
 * Age-adaptive: Classes 1-2 have very simple UI, large controls, short activities
 * Classes 3-5 have more detailed UI, multi-step activities, increasing challenge
 */
export type JuniorClass = "1" | "2" | "3" | "4" | "5";
export type NexusClass = "6" | "7" | "8" | "9" | "10";

/* Activity types for junior interactive learning */
export type JuniorActivityType =
  | "multipleChoice"
  | "trueFalse"
  | "matchPairs"
  | "arrangeOrder"
  | "fillInBlanks"
  | "selectImage"
  | "multiSelect"
  | "numeric"
  | "shortAnswer"
  | "diagram";

/* Answer state for activities */
export type ActivityAnswerState = "unanswered" | "correct" | "incorrect" | "pending";

/* Answer option for MCQ/True-False activities */
export interface JuniorActivityOption {
  id: string;
  text: string;
  isCorrect: boolean;
  selected: boolean;
}

/* Response for a single activity question */
export interface JuniorActivityResponse {
  questionId: string;
  selectedOptionId: string | null;
  isCorrect: boolean | null;
  feedback: string;
}

/* Result of an activity completion */
export interface JuniorActivityResult {
  activityId: string;
  score: number; /* percentage correct */
  totalQuestions: number;
  correctAnswers: number;
  attemptedQuestions: number;
  timeSpentSeconds: number;
  allCorrect: boolean;
}

/* Topic within a subject for Junior */
export interface JuniorTopic {
  id: string;
  title: string;
  description: string;
  illustration: string; // SVG path or illustration component name
  estimatedDurationMinutes: number;
  color: string;
  activityCount: number;
  activities: JuniorActivity[];
  isLocked: boolean;
  unlockCondition?: string;
}

/* Individual activity within a topic */
export interface JuniorActivity {
  id: string;
  type: JuniorActivityType;
  title: string;
  description: string;
  question: string;
  options: JuniorActivityOption[];
  correctAnswerId: string;
  explanation: string;
  hint?: string;
  estimatedDurationMinutes: number;
}

/* Lesson step in a topic */
export interface JuniorLessonStep {
  id: string;
  title: string;
  content: string;
  illustration: string; // Illustration description or SVG
  isInteractive: boolean;
}

/* Complete lesson structure */
export interface JuniorLesson {
  id: string;
  title: string;
  subject: string;
  topicId: string;
  steps: JuniorLessonStep[];
  estimatedDurationMinutes: number;
}

/* Quest in the junior system */
export interface JuniorQuest {
  id: string;
  title: string;
  description: string;
  subject: string;
  topicId: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedDurationMinutes: number;
  rewardXP: number;
  rewardCoins: number;
  rewardBadge?: string;
  completionCondition: "completeLesson" | "scoreAbove" | "activitiesCompleted" | "streakDays";
  conditionValue: number;
  isCompleted: boolean;
  progress: number; /* 0-100 */
}

/* Badge types for achievements */
export type JuniorBadgeType =
  | "first_steps"
  | "topic_master"
  | "quest_complete"
  | "daily_streak"
  | "perfect_score"
  | "speed_demon"
  | "knowledge_seeker"
  | "class_champion";

/* Earned badge record */
export interface JuniorEarnedBadge {
  id: string;
  badgeType: JuniorBadgeType;
  earnedAt: string;
  subject: string;
}

/* Achievement record */
export interface JuniorAchievement {
  id: string;
  title: string;
  description: string;
  badgeType: JuniorBadgeType;
  condition: string;
  isEarned: boolean;
  earnedAt?: string;
}

/* Reward configuration */
export interface JuniorRewardConfig {
  xpForActivity: number;
  xpForQuestComplete: number;
  xpForLessonComplete: number;
  coinsForActivity: number;
  coinsForQuestComplete: number;
  coinsForLessonComplete: number;
  starsForActivity: number;
  starsForQuestComplete: number;
  starsForLessonComplete: number;
}

/* Progress tracking for a topic */
export interface TopicProgress {
  topicId: string;
  topicTitle: string;
  completedLessons: string[];
  completedActivities: string[];
  totalLessons: number;
  totalActivities: number;
  progressPercentage: number;
  state: "locked" | "available" | "inProgress" | "completed";
}

/* Junior learner-specific progress */
export interface JuniorLearnerProgress {
  currentClass: JuniorClass;
  currentTopic: string | null;
  completedTopics: string[];
  topicProgress: Record<string, TopicProgress>;
  totalXP: number;
  currentLevel: number;
  totalCoins: number;
  totalStars: number;
  learningStreak: number;
  highestStreak: number;
  completedQuests: string[];
  earnedBadges: JuniorEarnedBadge[];
}

export interface UniverseThemeConfig {
  id: UniverseId;
  name: string;
  tone: UniverseTone;
  accentColor: string;
  softColor: string;
  textColor: string;
  borderColor: string;
  cardBackground: string;
  progressionColor: string;
}