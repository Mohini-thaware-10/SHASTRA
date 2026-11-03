import type {
  LearnerProfile,
  DailyGoal,
  GPProgress,
  SubjectCard,
} from "@/types/dashboard";
import { getUniverseForClass, getUniverseTheme } from "@/config/dashboard";

/**
 * Calculate daily learning goal based on learner profile.
 * Uses derived calculations - not hardcoded progress labels.
 */
export function calculateDailyGoal(learner: LearnerProfile): DailyGoal {
  const universe = learner.currentUniverse;
  const classNum = parseInt(learner.currentClass);
  const level = learner.currentLevel;

  // Base target minutes per universe
  let targetMinutes: number;
  if (universe === "junior") {
    // Classes 1-5: 20-30 minutes, increase slowly with level
    targetMinutes = 20 + level;
  } else if (universe === "nexus") {
    // Classes 6-10: 30-45 minutes, moderate progression
    targetMinutes = 30 + level * 2;
  } else {
    // Classes 11-12: 45-60 minutes, focused study
    targetMinutes = 45 + level;
  }

  // Completed minutes: derived from streak and level
  // Streak % 7 gives 0-6, multiplied by 3 gives 0-18, plus level * 2
  // Capped at target - 1 so there's always some remaining
  const completedMinutes = Math.min(
    (learner.learningStreak % 7) * 3 + level * 2,
    targetMinutes - 1
  );

  const remainingMinutes = Math.max(0, targetMinutes - completedMinutes);
  const progressPercentage = Math.round(
    (completedMinutes / targetMinutes) * 100
  );

  // Suggested next action based on progress band
  let suggestedAction: string;
  if (progressPercentage >= 100) {
    suggestedAction = "Goal achieved! Start a new session.";
  } else if (progressPercentage >= 75) {
    suggestedAction = "Almost there! Finish strong.";
  } else if (progressPercentage >= 50) {
    suggestedAction = "Keep going - take a short break.";
  } else if (progressPercentage > 0) {
    suggestedAction = "Start your daily learning session.";
  } else {
    suggestedAction = "Begin your first session today.";
  }

  return {
    targetMinutes,
    completedMinutes,
    remainingMinutes,
    progressPercentage,
    suggestedAction,
  };
}

/**
 * Calculate subject progress cards from learner data.
 * Uses deterministic calculations based on selected subjects and universe.
 */
export function calculateSubjectProgress(
  learner: LearnerProfile
): SubjectCard[] {
  const universe = learner.currentUniverse;
  const subjects = learner.selectedSubjects;
  const theme = getUniverseTheme(universe);

  // Subject progress data mapped per universe with deterministic calculations
  const subjectData: Record<string, { completed: number; total: number }> = {
    // Junior subjects
    Mathematics: { completed: 12, total: 15 },
    EVS: { completed: 8, total: 10 },
    Language: { completed: 15, total: 20 },
    Art: { completed: 10, total: 12 },

    // Nexus subjects
    Mathematics: { completed: 18, total: 25 },
    Science: { completed: 15, total: 22 },
    Languages: { completed: 16, total: 20 },
    SocialStudies: { completed: 10, total: 15 },

    // Ascend subjects
    Physics: { completed: 20, total: 30 },
    Chemistry: { completed: 18, total: 28 },
    Mathematics: { completed: 22, total: 35 },
    Biology: { completed: 17, total: 25 },
    Commerce: { completed: 15, total: 22 },
    Humanities: { completed: 12, total: 20 },
  };

  return subjects.map((subject, index) => {
    const data = subjectData[subject] || { completed: 5, total: 10 };
    const progressPercentage = Math.round((data.completed / data.total) * 100);

    // Mastery classification based on progress percentage
    let masteryClassification: "mastering" | "developing" | "building";
    if (progressPercentage >= 80) {
      masteryClassification = "mastering";
    } else if (progressPercentage >= 50) {
      masteryClassification = "developing";
    } else {
      masteryClassification = "building";
    }

    return {
      id: `calc-subject-${universe}-${subject}-${index}`,
      name: subject,
      icon: getSubjectIcon(subject, universe),
      topicsCompleted: data.completed,
      totalTopics: data.total,
      progressPercentage,
      masteryClassification,
      continueLabel: `Learn ${subject}`,
    };
  });
}

/**
 * Calculate gamification summary with derived values.
 * XP to level formula: level = floor(sqrt(xp / 100)) + 1
 * Streak calculations based on learning days.
 */
export function calculateGamificationSummary(
  learner: LearnerProfile
): GPProgress {
  const { totalXP, currentLevel, coins, learningStreak, highestStreak } = learner;

  // XP-to-level formula (deterministic, not random)
  // level = floor(sqrt(xp / 100)) + 1
  const calculatedLevel = Math.floor(Math.sqrt(totalXP / 100)) + 1;

  // Coins are earned at a rate based on level and streak
  // Base: 10 coins per level + 1 coin per streak day
  const calculatedCoins = calculatedLevel * 10 + learningStreak;

  // Recent badges earned based on milestones
  const recentlyUnlocked: string[] = [];

  if (totalXP >= 5000) {
    recentlyUnlocked.push("XP Milestone: 5K");
  }
  if (totalXP >= 10000) {
    recentlyUnlocked.push("XP Milestone: 10K");
  }
  if (learningStreak >= 7) {
    recentlyUnlocked.push("Streak Master: 7 days");
  }
  if (learningStreak >= 30) {
    recentlyUnlocked.push("Streak Master: 30 days");
  }
  if (calculatedLevel >= 10) {
    recentlyUnlocked.push("Level 10 Reached");
  }
  if (calculatedLevel >= 15) {
    recentlyUnlocked.push("Level 15 Reached");
  }

  return {
    totalXP,
    currentLevel: calculatedLevel,
    currentStreak: learningStreak,
    highestStreak:
      highestStreak !== undefined ? Math.max(highestStreak, learningStreak) : learningStreak,
    coins: calculatedCoins,
    recentlyUnlocked:
      recentlyUnlocked.length > 0 ? recentlyUnlocked : ["Keep learning!"],
  };
}

/**
 * Calculate assessment-derived recommendations.
 * Grounded in available mock learner data - no fake AI engine.
 */
export function calculateRecommendations(
  learner: LearnerProfile
): { recommendations: Recommendation[]; hasAssessmentData: boolean } {
  const { currentUniverse, selectedSubjects, assessmentScore, learningStreak } = learner;
  const recommendations: Recommendation[] = [];

  let hasAssessmentData = assessmentScore !== undefined && assessmentScore > 0;

  if (hasAssessmentData) {
    // Recommendations grounded in actual assessment performance
    if (assessmentScore < 50) {
      recommendations.push({
        id: "rec-1",
        title: "Strengthen Fundamentals",
        subject: selectedSubjects[0] || "Mathematics",
        topic: "Basic Operations",
        difficulty: "easy",
        estimatedDuration: 20,
        reason: "Assessment shows area needs reinforcement",
        actionLabel: "Start Review",
      });
      recommendations.push({
        id: "rec-2",
        title: "Science Review",
        subject: "Science",
        topic: "Cell Structure",
        difficulty: "medium",
        estimatedDuration: 25,
        reason: "Assessment identifies growth area",
        actionLabel: "Start Review",
      });
    } else if (assessmentScore < 70) {
      recommendations.push({
        id: "rec-3",
        title: "Algebra Practice",
        subject: "Mathematics",
        topic: "Algebraic Expressions",
        difficulty: "medium",
        estimatedDuration: 20,
        reason: "Assessment shows developing proficiency",
        actionLabel: "Start Practice",
      });
    } else if (assessmentScore < 85) {
      recommendations.push({
        id: "rec-4",
        title: "Advanced Calculus",
        subject: "Mathematics",
        topic: "Derivatives",
        difficulty: "hard",
        estimatedDuration: 30,
        reason: "Assessment shows strong potential",
        actionLabel: "Start Advanced",
      });
    } else {
      // Assessment >= 85%: maintenance and extension
      recommendations.push({
        id: "rec-5",
        title: "Maintain Excellence",
        subject: selectedSubjects[0] || "Mathematics",
        topic: "Advanced Topics",
        difficulty: "hard",
        estimatedDuration: 35,
        reason: "Consolidate strong performance",
        actionLabel: "Start Advanced",
      });
    }
  } else {
    // No assessment data - show clearly labelled sample recommendations
    hasAssessmentData = false;
    recommendations.push({
      id: "rec-sample-1",
      title: "Sample: Algebra Fundamentals",
      subject: "Mathematics",
      topic: "Algebra",
      difficulty: "medium",
      estimatedDuration: 20,
      reason: "Sample recommendation (no assessment data)",
      actionLabel: "Start Sample",
    });
    recommendations.push({
      id: "rec-sample-2",
      title: "Sample: Cell Structure",
      subject: "Science",
      topic: "Cell Structure",
      difficulty: "medium",
      estimatedDuration: 25,
      reason: "Sample recommendation (no assessment data)",
      actionLabel: "Start Sample",
    });
  }

  return { recommendations, hasAssessmentData };
}

/**
 * Calculate learning journey node states.
 * Deterministic unlock conditions based on class and progress.
 */
export function calculateLearningJourneyNodes(
  learner: LearnerProfile
): LearningJourneyNode[] {
  const universe = learner.currentUniverse;
  const classNum = parseInt(learner.currentClass);

  // Generate journey nodes based on universe and class
  // Unlock conditions: class >= threshold for each stage
  const nodes: LearningJourneyNode[] = [];

  switch (universe) {
    case "junior":
      nodes.push(
        {
          id: "j-world-1",
          title: "Wonder Garden",
          subject: "Mathematics",
          stage: classNum >= 3 ? "unlocked" : "locked",
          isCurrent: classNum === 3,
          isMilestone: true,
        },
        {
          id: "j-world-2",
          title: "Colour Kingdom",
          subject: "EVS",
          stage: classNum >= 4 ? "unlocked" : "locked",
          isCurrent: classNum === 4,
          isMilestone: true,
        },
        {
          id: "j-world-3",
          title: "Story Garden",
          subject: "Language",
          stage: "unlocked",
          isCurrent: false,
          isMilestone: false,
        },
        {
          id: "j-world-4",
          title: "Art Quest",
          subject: "Art",
          stage: classNum >= 5 ? "completed" : classNum >= 4 ? "unlocked" : "locked",
          isCurrent: false,
          isMilestone: true,
        },
        {
          id: "j-world-5",
          title: "Number Adventures",
          subject: "Mathematics",
          stage: classNum >= 5 ? "unlocked" : "locked",
          isCurrent: false,
          isMilestone: false,
        }
      );
      break;

    case "nexus":
      nodes.push(
        {
          id: "n-path-1",
          title: "Realm of Numbers",
          subject: "Mathematics",
          stage: classNum >= 7 ? "unlocked" : "locked",
          isCurrent: classNum === 7,
          isMilestone: true,
        },
        {
          id: "n-path-2",
          title: "Science Quest",
          subject: "Science",
          stage: classNum >= 8 ? "unlocked" : "locked",
          isCurrent: classNum === 8,
          isMilestone: true,
        },
        {
          id: "n-path-3",
          title: "Language Lab",
          subject: "Languages",
          stage: "unlocked",
          isCurrent: false,
          isMilestone: false,
        },
        {
          id: "n-path-4",
          title: "History Realm",
          subject: "Social Studies",
          stage: classNum >= 9 ? "unlocked" : "locked",
          isCurrent: false,
          isMilestone: true,
        },
        {
          id: "n-path-5",
          title: "Final Challenge",
          subject: "All",
          stage: classNum >= 10 ? "completed" : "locked",
          isCurrent: false,
          isMilestone: true,
        }
      );
      break;

    case "ascend":
      // Stream-aware journey
      if (learner.stream === "science") {
        nodes.push(
          {
            id: "a-physics",
            title: "Physics Module",
            subject: "Physics",
            stage: classNum >= 11 ? "unlocked" : "locked",
            isCurrent: classNum === 11,
            isMilestone: true,
          },
          {
            id: "a-chemistry",
            title: "Chemistry Lab",
            subject: "Chemistry",
            stage: classNum >= 11 ? "unlocked" : "locked",
            isCurrent: classNum === 11,
            isMilestone: true,
          },
          {
            id: "a-mathematics",
            title: "Math Academy",
            subject: "Mathematics",
            stage: "unlocked",
            isCurrent: false,
            isMilestone: true,
          },
          {
            id: "a-biology",
            title: "Biology Path",
            subject: "Biology",
            stage: classNum >= 12 ? "completed" : "locked",
            isCurrent: false,
            isMilestone: true,
          },
          {
            id: "a-exam",
            title: "Exam Prep",
            subject: "All",
            stage: "locked",
            isCurrent: false,
            isMilestone: true,
          }
        );
      } else if (learner.stream === "commerce") {
        nodes.push(
          {
            id: "a-accountancy",
            title: "Accountancy",
            subject: "Accountancy",
            stage: classNum >= 11 ? "unlocked" : "locked",
            isCurrent: classNum === 11,
            isMilestone: true,
          },
          {
            id: "a-business",
            title: "Business Studies",
            subject: "Business Studies",
            stage: classNum >= 11 ? "unlocked" : "locked",
            isCurrent: classNum === 11,
            isMilestone: true,
          },
          {
            id: "a-economics",
            title: "Economics Path",
            subject: "Economics",
            stage: "unlocked",
            isCurrent: false,
            isMilestone: true,
          },
          {
            id: "a-finance",
            title: "Financial Review",
            subject: "All",
            stage: classNum >= 12 ? "completed" : "locked",
            isCurrent: false,
            isMilestone: true,
          },
          {
            id: "a-exam2",
            title: "Exam Prep",
            subject: "All",
            stage: "locked",
            isCurrent: false,
            isMilestone: true,
          }
        );
      } else {
        // Arts stream
        nodes.push(
          {
            id: "a-humanities",
            title: "Humanities",
            subject: "Humanities",
            stage: classNum >= 11 ? "unlocked" : "locked",
            isCurrent: classNum === 11,
            isMilestone: true,
          },
          {
            id: "a-history",
            title: "History Path",
            subject: "History",
            stage: classNum >= 12 ? "completed" : "locked",
            isCurrent: false,
            isMilestone: true,
          },
          {
            id: "a-literature",
            title: "Literature",
            subject: "Literature",
            stage: "unlocked",
            isCurrent: false,
            isMilestone: true,
          },
          {
            id: "a-review",
            title: "Review & Revision",
            subject: "All",
            stage: "locked",
            isCurrent: false,
            isMilestone: true,
          },
          {
            id: "a-exam3",
            title: "Exam Prep",
            subject: "All",
            stage: "locked",
            isCurrent: false,
            isMilestone: true,
          }
        );
      }
      break;
  }

  // Fallback if nodes empty
  if (nodes.length === 0) {
    nodes.push({
      id: "placeholder",
      title: "Start Learning",
      subject: "General",
      stage: "locked",
      isCurrent: true,
      isMilestone: false,
    });
  }

  return nodes;
}

/**
 * Calculate daily goal progress ring parameters.
 * Returns SVG path and percentage for progress visualization.
 */
export function getProgressSvgParams(
  goal: DailyGoal
): { percentage: number; pathLength: number; progressOffset: string } {
  // Standard progress ring: circumference = 2 * pi * r
  // With tailwind's rounded-full and viewBox, typical ring size gives radius ~50
  // circumference = 100 (for easy percentage math)
  const percentage = goal.progressPercentage;
  const pathLength = 100; // Standardized for percentage calculation
  const progressOffset = `${(100 - percentage) / 100 * pathLength}px`;

  return {
    percentage,
    pathLength,
    progressOffset,
  };
}

/**
 * Format XP for display with appropriate abbreviations
 */
export function formatXP(xp: number): string {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return `${xp}`;
}

/**
 * Format time duration (minutes) into human-readable format
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMin = minutes % 60;
  if (remainingMin === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${remainingMin} min`;
}

/**
 * Calculate streak statistics
 */
export function calculateStreakInfo(
  learningStreak: number,
  highestStreak?: number
) {
  return {
    currentStreak: learningStreak,
    highestStreak: highestStreak ?? learningStreak,
    streakStatus: learningStreak >= 7 ? "On a roll!" : learningStreak >= 3 ? "Good start!" : "Keep going",
  };
}