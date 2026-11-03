import type {
  LearnerProfile,
  DailyGoal,
  LearningCard,
  SubjectCard,
  LearningJourneyNode,
  GPProgress,
  Recommendation,
  ActivityEvent,
  AssessmentResult,
  UniverseId,
  Stream,
} from "@/types/dashboard";
import type { UniverseId as UId } from "@/types/theme";
import { getUniverseForClass, getUniverseTheme, type UniverseId } from "@/config/dashboard";
import { universeThemes } from "@/config/themes";

/**
 * Mock learner profiles for different classes.
 * Class determines the universe automatically.
 * Board and other details are configurable per student.
 */

/** SHATRA Junior - Class 3 mock learner */
export const juniorLearner3: LearnerProfile = {
  fullName: "Diya Sharma",
  currentClass: "3",
  board: "CBSE",
  currentUniverse: "junior",
  selectedSubjects: ["Mathematics", "EVS", "Language", "Art"],
  assessmentScore: 85,
  assessmentTotal: 100,
  learningStreak: 12,
  highestStreak: 28,
  totalXP: 2450,
  currentLevel: 6,
  coins: 345,
};

/** SHATRA Junior - Class 5 mock learner */
export const juniorLearner5: LearnerProfile = {
  fullName: "Rohit Patel",
  currentClass: "5",
  board: "ICSE",
  currentUniverse: "junior",
  selectedSubjects: ["Mathematics", "EVS", "Language", "Art"],
  assessmentScore: 92,
  assessmentTotal: 100,
  learningStreak: 8,
  highestStreak: 22,
  totalXP: 3120,
  currentLevel: 8,
  coins: 420,
};

/** SHATRA Nexus - Class 7 mock learner */
export const nexusLearner7: LearnerProfile = {
  fullName: "Aisha Khan",
  currentClass: "7",
  board: "CBSE",
  currentUniverse: "nexus",
  selectedSubjects: ["Mathematics", "Science", "Languages", "Social Studies"],
  assessmentScore: 73,
  assessmentTotal: 100,
  learningStreak: 5,
  highestStreak: 18,
  totalXP: 1890,
  currentLevel: 4,
  coins: 215,
};

/** SHATRA Nexus - Class 10 mock learner */
export const nexusLearner10: LearnerProfile = {
  fullName: "Carlos Rodriguez",
  currentClass: "10",
  board: "CBSE",
  currentUniverse: "nexus",
  selectedSubjects: ["Mathematics", "Science", "Languages", "Social Studies"],
  assessmentScore: 68,
  assessmentTotal: 100,
  learningStreak: 3,
  highestStreak: 15,
  totalXP: 2850,
  currentLevel: 7,
  coins: 380,
};

export const nexusLearner6: LearnerProfile = {
  fullName: "Saara Malik",
  currentClass: "6",
  board: "CBSE",
  currentUniverse: "nexus",
  selectedSubjects: ["Mathematics", "Science", "Languages", "Social Studies"],
  assessmentScore: 82,
  assessmentTotal: 100,
  learningStreak: 7,
  highestStreak: 20,
  totalXP: 1560,
  currentLevel: 3,
  coins: 250,
};

export const nexusLearner8: LearnerProfile = {
  fullName: "Jayden O'Connor",
  currentClass: "8",
  board: "CBSE",
  currentUniverse: "nexus",
  selectedSubjects: ["Mathematics", "Science", "Languages", "Social Studies"],
  assessmentScore: 71,
  assessmentTotal: 100,
  learningStreak: 5,
  highestStreak: 18,
  totalXP: 2240,
  currentLevel: 4,
  coins: 310,
};

export const nexusLearner9: LearnerProfile = {
  fullName: "Ava Chen",
  currentClass: "9",
  board: "CBSE",
  currentUniverse: "nexus",
  selectedSubjects: ["Mathematics", "Science", "Languages", "Social Studies"],
  assessmentScore: 65,
  assessmentTotal: 100,
  learningStreak: 4,
  highestStreak: 15,
  totalXP: 1980,
  currentLevel: 5,
  coins: 280,
};

/** SHATRA Ascend - Class 11 Science mock learner */
export const ascendScience11: LearnerProfile = {
  fullName: "Emma Williams",
  currentClass: "11",
  board: "CBSE",
  currentUniverse: "ascend",
  selectedSubjects: ["Physics", "Chemistry", "Mathematics"],
  stream: "science" as Stream,
  assessmentScore: 88,
  assessmentTotal: 100,
  learningStreak: 20,
  highestStreak: 45,
  totalXP: 8920,
  currentLevel: 15,
  coins: 950,
};

/** SHATRA Ascend - Class 11 Commerce mock learner */
export const ascendCommerce11: LearnerProfile = {
  fullName: "Marcus Chen",
  currentClass: "11",
  board: "CBSE",
  currentUniverse: "ascend",
  selectedSubjects: ["Accountancy", "Business Studies", "Economics"],
  stream: "commerce" as Stream,
  assessmentScore: 76,
  assessmentTotal: 100,
  learningStreak: 14,
  highestStreak: 38,
  totalXP: 6240,
  currentLevel: 12,
  coins: 720,
};

/** SHATRA Ascend - Class 12 Science mock learner */
export const ascendScience12: LearnerProfile = {
  fullName: "Sophie Martin",
  currentClass: "12",
  board: "CBSE",
  currentUniverse: "ascend",
  selectedSubjects: ["Physics", "Chemistry", "Mathematics"],
  stream: "science" as Stream,
  assessmentScore: 91,
  assessmentTotal: 100,
  learningStreak: 25,
  highestStreak: 52,
  totalXP: 12340,
  currentLevel: 18,
  coins: 1340,
};

/** SHATRA Ascend - Class 12 Commerce mock learner */
export const ascendCommerce12: LearnerProfile = {
  fullName: "Liam O'Connor",
  currentClass: "12",
  board: "CBSE",
  currentUniverse: "ascend",
  selectedSubjects: ["Accountancy", "Business Studies", "Economics"],
  stream: "commerce" as Stream,
  assessmentScore: 82,
  assessmentTotal: 100,
  learningStreak: 18,
  highestStreak: 48,
  totalXP: 9860,
  currentLevel: 16,
  coins: 1120,
};

/** SHATRA Ascend - Class 12 Arts mock learner */
export const ascendArts12: LearnerProfile = {
  fullName: "Natalia Kowalska",
  currentClass: "12",
  board: "State Board",
  currentUniverse: "ascend",
  selectedSubjects: ["History", "Political Science", "Literature"],
  stream: "arts" as Stream,
  assessmentScore: 79,
  assessmentTotal: 100,
  learningStreak: 10,
  highestStreak: 25,
  totalXP: 5670,
  currentLevel: 10,
  coins: 580,
};

/**
 * Get a learner profile by class and optional stream.
 * This is the mock-data adapter that separates mock data from backend integration.
 */
export function getLearnerProfile(
  classNum: number,
  stream?: Stream,
  board: "CBSE" | "ICSE" | "State Board" | "IB" | "Other" = "CBSE"
): LearnerProfile {
  // Determine universe from class
  const universe = getUniverseForClass(classNum);

  // Select the appropriate mock profile based on class and stream
  switch (true) {
    case classNum >= 1 && classNum <= 5:
      // Junior universe - all classes 1-5
      if (classNum === 3) return juniorLearner3;
      if (classNum === 5) return juniorLearner5;
      // Default junior profile for any class 1-5
      return {
        fullName: "Student " + classNum,
        currentClass: classNum.toString(),
        board,
        currentUniverse: "junior",
        selectedSubjects: ["Mathematics", "EVS", "Language", "Art"],
        learningStreak: 5,
        highestStreak: 15,
        totalXP: 1000 + classNum * 100,
        currentLevel: Math.ceil(classNum / 2) + 1,
        coins: 50 + classNum * 20,
      };

    case classNum >= 6 && classNum <= 10:
      // Nexus universe
if (classNum === 6) return nexusLearner6;
  if (classNum === 7) return nexusLearner7;
  if (classNum === 8) return nexusLearner8;
  if (classNum === 9) return nexusLearner9;
  if (classNum === 10) return nexusLearner10;
  return {
        fullName: "Student " + classNum,
        currentClass: classNum.toString(),
        board,
        currentUniverse: "nexus",
        selectedSubjects: ["Mathematics", "Science", "Languages", "Social Studies"],
        learningStreak: 3,
        highestStreak: 12,
        totalXP: 1500 + classNum * 150,
        currentLevel: Math.ceil(classNum / 2) - 1,
        coins: 80 + classNum * 15,
      };

    case classNum >= 11 && classNum <= 12:
      // Ascend universe
      if (stream === "science") {
        if (classNum === 11) return ascendScience11;
        if (classNum === 12) return ascendScience12;
      }
      if (stream === "commerce") {
        if (classNum === 11) return ascendCommerce11;
        if (classNum === 12) return ascendCommerce12;
      }
      if (stream === "arts") {
        if (classNum === 12) return ascendArts12;
      }
      // Default ascend profile
      return {
        fullName: "Student " + classNum,
        currentClass: classNum.toString(),
        board,
        currentUniverse: "ascend",
        selectedSubjects: ["Physics", "Chemistry", "Mathematics"],
        stream: "general" as Stream,
        learningStreak: 7,
        highestStreak: 20,
        totalXP: 5000,
        currentLevel: 10,
        coins: 600,
      };

    default:
      return {
        fullName: "Student",
        currentClass: "6",
        board,
        currentUniverse: "nexus",
        selectedSubjects: ["Mathematics", "Science", "Languages", "Social Studies"],
        learningStreak: 5,
        highestStreak: 15,
        totalXP: 2000,
        currentLevel: 5,
        coins: 250,
      };
  }
}

/**
 * Mock daily goal data - calculated per learner
 */
export function getDailyGoal(learner: LearnerProfile): DailyGoal {
  // Derived calculation: base target on level and universe
  let targetMinutes: number;

  switch (learner.currentUniverse) {
    case "junior":
      targetMinutes = 20 + learner.currentLevel;
      break;
    case "nexus":
      targetMinutes = 30 + learner.currentLevel * 2;
      break;
    case "ascend":
      targetMinutes = 45 + learner.currentLevel;
      break;
    default:
      targetMinutes = 30;
  }

  // Completed time is simulated - some progress based on streak and level
  const baseCompleted = Math.min(
    (learner.learningStreak % 7) * 3 + learner.currentLevel * 2,
    targetMinutes - 1
  );

  const completedMinutes = Math.max(0, baseCompleted);
  const remainingMinutes = Math.max(0, targetMinutes - completedMinutes);
  const progressPercentage = Math.round((completedMinutes / targetMinutes) * 100);

  // Suggested next action based on progress
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
    completedMinutes,
    remainingMinutes,
    progressPercentage,
    suggestedAction,
  };
}

/**
 * Mock learning cards - generated per universe and learner level
 */
export function getContinueLearningCards(
  learner: LearnerProfile
): LearningCard[] {
  const universe = learner.currentUniverse;
  const subjects = learner.selectedSubjects;
  const cards: LearningCard[] = [];

  // Generate 3-4 cards based on universe and selected subjects
  const now = new Date();
  const lastActivity =
    formatTime(now.getHours()) + ":" + formatTime(now.getMinutes());

  // Base cards per universe
  let baseCards: { subject: string; topic: string; lessonTitle: string }[];

  switch (universe) {
    case "junior":
      baseCards = [
        { subject: "Mathematics", topic: "Addition", lessonTitle: "Number Friends" },
        { subject: "EVS", topic: "Plants", lessonTitle: "Green World" },
        { subject: "Language", topic: "Letters", lessonTitle: "ABC Adventures" },
        { subject: "Art", topic: "Colors", lessonTitle: "Color Magic" },
      ];
      break;
    case "nexus":
      baseCards = [
        { subject: "Mathematics", topic: "Algebra", lessonTitle: "Variable Quest" },
        { subject: "Science", topic: "Cells", lessonTitle: "Micro World" },
        { subject: "Languages", topic: "Grammar", lessonTitle: "Sentence Build" },
        { subject: "Social Studies", topic: "History", lessonTitle: "Time Travel" },
      ];
      break;
    case "ascend":
      baseCards = [
        { subject: "Mathematics", topic: "Calculus", lessonTitle: "Derivatives" },
        { subject: "Physics", topic: "Mechanics", lessonTitle: "Motion Laws" },
        { subject: "Chemistry", topic: "Bonding", lessonTitle: "Molecular Quest" },
        { subject: "Biology", topic: "Cells", lessonTitle: "Life Structure" },
      ];
      break;
    default:
      baseCards = [
        { subject: "Mathematics", topic: "Algebra", lessonTitle: "Variable Quest" },
      ];
  }

  // Map base cards to LearningCard, filtering to selected subjects only
  const selectedBaseCards = baseCards.filter((card) =>
    subjects.includes(card.subject)
  );

  // If no selected subjects match, show first available
  const cardsToUse = selectedBaseCards.length > 0 ? selectedBaseCards : baseCards;

  cardsToUse.forEach((card, index) => {
    // Progress based on level and universe
    const progressPercentage = Math.round(
      (55 + index * 15 + learner.currentLevel * 5) % 100
    );

    const estimatedDuration = universe === "junior"
      ? 15 + index * 5
      : universe === "nexus"
        ? 25 + index * 10
        : 45 + index * 15;

    cards.push({
      id: `card-${universe}-${index}`,
      subject: card.subject,
      topic: card.topic,
      lessonTitle: card.lessonTitle,
      progressPercentage,
      estimatedDuration,
      lastActivity,
      continueLabel: `Continue ${card.lessonTitle}`,
    });
  });

  // If no cards generated, show empty state message
  if (cards.length === 0) {
    cards.push({
      id: "empty-card",
      subject: "No activity",
      topic: "Start your first lesson",
      lessonTitle: "Begin Learning",
      progressPercentage: 0,
      estimatedDuration: 0,
      lastActivity: "Never",
      continueLabel: "Start Learning",
    });
  }

  return cards;
}

/**
 * Mock subject overview cards
 */
export function getSubjectOverviewCards(
  learner: LearnerProfile
): SubjectCard[] {
  const universe = learner.currentUniverse;
  const subjects = learner.selectedSubjects;
  const theme = universeThemesConfig[universe];

  // Subject progress data mapped per universe
  const subjectProgressData: Record<string, { completed: number; total: number }> = {
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

  const cards: SubjectCard[] = [];

  subjects.forEach((subject, index) => {
    const data = subjectProgressData[subject] || { completed: 5, total: 10 };
    const progressPercentage = Math.round((data.completed / data.total) * 100);

    // Mastery classification
    let masteryClassification: "mastering" | "developing" | "building";
    if (progressPercentage >= 80) {
      masteryClassification = "mastering";
    } else if (progressPercentage >= 50) {
      masteryClassification = "developing";
    } else {
      masteryClassification = "building";
    }

    cards.push({
      id: `subject-${universe}-${index}`,
      name: subject,
      icon: getSubjectIcon(subject, universe),
      topicsCompleted: data.completed,
      totalTopics: data.total,
      progressPercentage,
      masteryClassification,
      continueLabel: `Learn ${subject}`,
    });
  });

  // If no subjects, add empty state
  if (cards.length === 0) {
    cards.push({
      id: "empty-subjects",
      name: "No subjects selected",
      icon: "book",
      topicsCompleted: 0,
      totalTopics: 0,
      progressPercentage: 0,
      masteryClassification: "building",
      continueLabel: "Select Subjects",
    });
  }

  return cards;
}

/**
 * Get subject icon based on subject and universe
 */
function getSubjectIcon(subject: string, universe: UniverseId): string {
  const subjectLower = subject.toLowerCase();

  // Icons that work across all universes
  const iconMap: Record<string, string> = {
    mathematics: "calculator",
    science: "flask",
    physics: "flask",
    chemistry: "flask",
    biology: "atom",
    economics: "palette",
    accountancy: "calculator",
    business_studies: "globe2",
    history: "scroll-text",
    political_science: "scroll-text",
    literature: "book",
    languages: "languages",
    english: "languages",
    evs: "sprout",
    art: "palette",
  };

  return iconMap[subjectLower] || "book";
}

/**
 * Mock learning journey nodes - universe-specific
 */
export function getLearningJourneyNodes(
  learner: LearnerProfile
): LearningJourneyNode[] {
  const universe = learner.currentUniverse;
  const classNum = parseInt(learner.currentClass);

  // Generate journey nodes based on universe and class
  const nodes: LearningJourneyNode[] = [];

  switch (universe) {
    case "junior":
      // Friendly illustrated learning paths for Classes 1-5
      nodes.push(
        { id: "world-1", title: "Wonder Garden", subject: "Mathematics", stage: classNum >= 3 ? "unlocked" : "locked", isCurrent: classNum === 3, isMilestone: true },
        { id: "world-2", title: "Colour Kingdom", subject: "EVS", stage: classNum >= 4 ? "unlocked" : "locked", isCurrent: classNum === 4, isMilestone: true },
        { id: "world-3", title: "Story Garden", subject: "Language", stage: "unlocked", isCurrent: false, isMilestone: false },
        { id: "world-4", title: "Art Quest", subject: "Art", stage: classNum >= 5 ? "completed" : "locked", isCurrent: false, isMilestone: true },
        { id: "world-5", title: "Number Adventures", subject: "Mathematics", stage: "locked", isCurrent: false, isMilestone: false }
      );
      break;

    case "nexus":
      // Adventure-style progression map for Classes 6-10
      nodes.push(
        { id: "path-1", title: "Realm of Numbers", subject: "Mathematics", stage: classNum >= 7 ? "unlocked" : "locked", isCurrent: classNum === 7, isMilestone: true },
        { id: "path-2", title: "Science Quest", subject: "Science", stage: classNum >= 8 ? "unlocked" : "locked", isCurrent: classNum === 8, isMilestone: true },
        { id: "path-3", title: "Language Lab", subject: "Languages", stage: "unlocked", isCurrent: false, isMilestone: false },
        { id: "path-4", title: "History Realm", subject: "Social Studies", stage: classNum >= 9 ? "unlocked" : "locked", isCurrent: false, isMilestone: true },
        { id: "path-5", title: "Final Challenge", subject: "All", stage: classNum >= 10 ? "completed" : "locked", isCurrent: false, isMilestone: true }
      );
      break;

    case "ascend":
      // Structured academy progression for Classes 11-12
      if (learner.stream === "science") {
        nodes.push(
          { id: "academy-1", title: "Physics Module", subject: "Physics", stage: classNum >= 11 ? "unlocked" : "locked", isCurrent: classNum === 11, isMilestone: true },
          { id: "academy-2", title: "Chemistry Lab", subject: "Chemistry", stage: classNum >= 11 ? "unlocked" : "locked", isCurrent: classNum === 11, isMilestone: true },
          { id: "academy-3", title: "Math Academy", subject: "Mathematics", stage: "unlocked", isCurrent: false, isMilestone: true },
          { id: "academy-4", title: "Biology Path", subject: "Biology", stage: classNum >= 12 ? "completed" : "locked", isCurrent: false, isMilestone: true },
          { id: "academy-5", title: "Exam Prep", subject: "All", stage: "locked", isCurrent: false, isMilestone: true }
        );
      } else if (learner.stream === "commerce") {
        nodes.push(
          { id: "academy-1", title: "Accountancy", subject: "Accountancy", stage: classNum >= 11 ? "unlocked" : "locked", isCurrent: classNum === 11, isMilestone: true },
          { id: "academy-2", title: "Business Studies", subject: "Business Studies", stage: classNum >= 11 ? "unlocked" : "locked", isCurrent: classNum === 11, isMilestone: true },
          { id: "academy-3", title: "Economics Path", subject: "Economics", stage: "unlocked", isCurrent: false, isMilestone: true },
          { id: "academy-4", title: "Financial Review", subject: "All", stage: classNum >= 12 ? "completed" : "locked", isCurrent: false, isMilestone: true },
          { id: "academy-5", title: "Exam Prep", subject: "All", stage: "locked", isCurrent: false, isMilestone: true }
        );
      } else {
        // Arts stream
        nodes.push(
          { id: "academy-1", title: "Humanities", subject: "Humanities", stage: classNum >= 11 ? "unlocked" : "locked", isCurrent: classNum === 11, isMilestone: true },
          { id: "academy-2", title: "History Path", subject: "History", stage: classNum >= 12 ? "completed" : "locked", isCurrent: false, isMilestone: true },
          { id: "academy-3", title: "Literature", subject: "Literature", stage: "unlocked", isCurrent: false, isMilestone: true },
          { id: "academy-4", title: "Review & Revision", subject: "All", stage: "locked", isCurrent: false, isMilestone: true },
          { id: "academy-5", title: "Exam Prep", subject: "All", stage: "locked", isCurrent: false, isMilestone: true }
        );
      }
      break;
  }

  // If no nodes generated, add placeholder
  if (nodes.length === 0) {
    nodes.push(
      { id: "placeholder", title: "Start Learning", subject: "General", stage: "locked", isCurrent: true, isMilestone: false }
    );
  }

  return nodes;
}

/**
 * Mock gamification summary
 */
export function getGamificationSummary(
  learner: LearnerProfile
): GPProgress {
  const { totalXP, currentLevel, coins, learningStreak, highestStreak } = learner;

  // Recently unlocked badges based on achievements
  const recentlyUnlocked: readonly string[] = [];

  if (learner.assessmentScore && learner.assessmentScore >= 80) {
    recentlyUnlocked.push("First Assessment");
  }
  if (learner.learningStreak >= 7) {
    recentlyUnlocked.push("Week Warrior");
  }
  if (learner.currentLevel >= 10) {
    recentlyUnlocked.push("Level 10 Reached");
  }
  if (coins >= 500) {
    recentlyUnlocked.push("Wealth Builder");
  }

  return {
    totalXP,
    currentLevel,
    currentStreak: learningStreak,
    highestStreak: highestStreak || learningStreak,
    coins,
    recentlyUnlocked: recentlyUnlocked.length > 0 ? recentlyUnlocked : ["Keep going!"],
  };
}

/**
 * Mock recommendations based on learner data
 */
export function getRecommendations(
  learner: LearnerProfile
): Recommendation[] {
  const { currentUniverse, selectedSubjects, assessmentScore, learningStreak } = learner;
  const recommendations: Recommendation[] = [];

  // Base recommendations on weak topics and selected subjects
  let weakTopics: { subject: string; topic: string; difficulty: "easy" | "medium" | "hard" }[] = [];

  // If we have assessment data, use it
  if (assessmentScore !== undefined) {
    // Generate recommendations based on score bands
    if (assessmentScore < 50) {
      weakTopics = [
        { subject: "Mathematics", topic: "Fractions", difficulty: "easy" },
        { subject: "Science", topic: "Cell Structure", difficulty: "medium" },
      ];
    } else if (assessmentScore < 70) {
      weakTopics = [
        { subject: "Mathematics", topic: "Algebra", difficulty: "medium" },
        { subject: "Science", topic: "Force and Pressure", difficulty: "medium" },
      ];
    } else if (assessmentScore < 85) {
      weakTopics = [
        { subject: "Science", topic: "Waves", difficulty: "hard" },
        { subject: "Mathematics", topic: "Calculus basics", difficulty: "medium" },
      ];
    }
    // If score >= 85, show maintenance recommendations
    if (assessmentScore >= 85) {
      weakTopics = [
        { subject: selectedSubjects[0] || "Mathematics", topic: "Advanced topics", difficulty: "hard" },
      ];
    }
  } else {
    // No assessment data - show sample recommendations
    weakTopics = [
      { subject: "Mathematics", topic: "Algebra", difficulty: "medium" },
      { subject: "Science", topic: "Physics", difficulty: "medium" },
    ];
  }

  // Generate recommendation cards from weak topics
  weakTopics.slice(0, 3).forEach((topic, index) => {
    const durationMap: Record<string, number> = {
      mathematics: 20,
      science: 25,
      languages: 15,
      "social studies": 20,
      physics: 30,
      chemistry: 25,
      biology: 20,
      accountancy: 20,
      "business studies": 25,
      economics: 20,
      fractions: 15,
      algebra: 20,
      "cell structure": 20,
      "force and pressure": 25,
      waves: 30,
      "calculus basics": 30,
      "advanced topics": 35,
    };

    const duration = durationMap[topic.subject] || 20;

    recommendations.push({
      id: `rec-${currentUniverse}-${index}`,
      title: `Master ${topic.topic}`,
      subject: topic.subject,
      topic: topic.topic,
      difficulty: topic.difficulty,
      estimatedDuration: duration,
      reason: `Focus on ${topic.topic} to strengthen ${topic.subject} skills`,
      actionLabel: `Start ${topic.topic}`,
    });
  });

  // If no recommendations generated, add sample
  if (recommendations.length === 0) {
    recommendations.push({
      id: "rec-sample-1",
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      topic: "Algebra",
      difficulty: "medium",
      estimatedDuration: 20,
      reason: "Build strong foundational skills",
      actionLabel: "Start Algebra",
    });
    recommendations.push({
      id: "rec-sample-2",
      title: "Cell Structure",
      subject: "Science",
      topic: "Cell Structure",
      difficulty: "medium",
      estimatedDuration: 25,
      reason: "Review core cellular concepts",
      actionLabel: "Start Cell Structure",
    });
  }

  return recommendations;
}

/**
 * Junior subject icons - used across junior activities and topics
 */
function getJuniorSubjectIcon(subject: string): string {
  const subjectLower = subject.toLowerCase();
  const iconMap: Record<string, string> = {
    mathematics: "calculator",
    evs: "sprout",
    science: "flask",
    language: "languages",
    english: "languages",
    hindi: "languages",
    art: "palette",
  };
  return iconMap[subjectLower] || "book";
}

/**
 * Junior mock topics with activities per subject
 * Classes 1-2: Very simple, 1 activity per topic, short duration
 * Classes 3-5: 2-3 activities per topic, longer duration, more complex
 */

/* Mathematics topics for Junior Class 1-2 (very simple, 1 activity) */
const juniorMathPrimaryTopics: JuniorTopic[] = [
  {
    id: "math-1-1",
    title: "Number Friends",
    description: "Learn numbers 1-10 and their names",
    illustration: "number-line",
    estimatedDurationMinutes: 10,
    color: "#ff6b6b",
    activityCount: 1,
    activities: [
      {
        id: "math-act-1-1-1",
        type: "multipleChoice",
        title: "Which number comes after 5?",
        question: "Which number comes after 5?",
        options: [
          { id: "a", text: "3", isCorrect: false, selected: false },
          { id: "b", text: "6", isCorrect: true, selected: false },
          { id: "c", text: "4", isCorrect: false, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "6 comes after 5 when we count",
        hint: "Count: 1, 2, 3, 4, 5, 6",
        estimatedDurationMinutes: 8,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "math-1-2",
    title: "Shape Seekers",
    description: "Identify basic shapes: circle, square, triangle",
    illustration: "shapes",
    estimatedDurationMinutes: 10,
    color: "#4ecdc4",
    activityCount: 1,
    activities: [
      {
        id: "math-act-1-2-1",
        type: "selectImage",
        title: "Find the circle",
        question: "Which is the circle?",
        options: [
          { id: "a", text: "□", isCorrect: false, selected: false },
          { id: "b", text: "●", isCorrect: true, selected: false },
          { id: "c", text: "△", isCorrect: false, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "A circle is round with no corners",
        hint: "Look for the round shape",
        estimatedDurationMinutes: 8,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "math-1-3",
    title: "Counting Fun",
    description: "Count objects and match with numbers",
    illustration: "counting",
    estimatedDurationMinutes: 10,
    color: "#ffe66d",
    activityCount: 1,
    activities: [
      {
        id: "math-act-1-3-1",
        type: "fillInBlanks",
        title: "How many apples?",
        question: "How many apples are there?",
        options: [],
        correctAnswerId: "",
        explanation: "There are 4 apples in the basket",
        hint: "Count each apple: 1, 2, 3, 4",
        estimatedDurationMinutes: 8,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
];

/* Mathematics topics for Junior Class 3-5 (more detailed, 2-3 activities) */
const juniorMathUpperTopics: JuniorTopic[] = [
  {
    id: "math-3-1",
    title: "Addition Adventure",
    description: "Learn addition with numbers up to 20 using visual objects",
    illustration: "addition",
    estimatedDurationMinutes: 15,
    color: "#ff6b6b",
    activityCount: 3,
    activities: [
      {
        id: "math-act-3-1-1",
        type: "multipleChoice",
        title: "What is 3 + 2?",
        question: "What is 3 + 2?",
        options: [
          { id: "a", text: "4", isCorrect: false, selected: false },
          { id: "b", text: "5", isCorrect: true, selected: false },
          { id: "c", text: "6", isCorrect: false, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "3 + 2 = 5",
        hint: "Count on fingers: 3, 4, 5",
        estimatedDurationMinutes: 10,
      },
      {
        id: "math-act-3-1-2",
        type: "trueFalse",
        title: "Is this true? 2 + 3 = 6",
        question: "Is this true? 2 + 3 = 6",
        options: [
          { id: "a", text: "True", isCorrect: false, selected: false },
          { id: "b", text: "False", isCorrect: true, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "2 + 3 equals 5, not 6",
        hint: "Count 2 objects, then add 3 more",
        estimatedDurationMinutes: 10,
      },
      {
        id: "math-act-3-1-3",
        type: "arrangeOrder",
        title: "Arrange the addition",
        question: "Arrange these to make the correct addition: 2 + 4",
        questionImage: "",
        options: [
          { id: "a", text: "2 + 4", isCorrect: true, selected: false },
          { id: "b", text: "4 + 2", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "2 + 4 and 4 + 2 both equal 6 (commutative property)",
        hint: "The order doesn't change the sum",
        estimatedDurationMinutes: 12,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "math-3-2",
    title: "Subtraction Stories",
    description: "Learn subtraction taking away from numbers up to 20",
    illustration: "subtraction",
    estimatedDurationMinutes: 15,
    color: "#4ecdc4",
    activityCount: 3,
    activities: [
      {
        id: "math-act-3-2-1",
        type: "multipleChoice",
        title: "What is 7 - 3?",
        question: "What is 7 - 3?",
        options: [
          { id: "a", text: "4", isCorrect: true, selected: false },
          { id: "b", text: "5", isCorrect: false, selected: false },
          { id: "c", text: "3", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "7 - 3 = 4",
        hint: "Start with 7, take away 3",
        estimatedDurationMinutes: 10,
      },
      {
        id: "math-act-3-2-2",
        type: "fillInBlanks",
        title: "Fill in the blank: 5 - 2 = ___",
        question: "Fill in the blank: 5 - 2 = ___",
        options: [],
        correctAnswerId: "3",
        explanation: "5 - 2 = 3",
        hint: "Start with 5 objects, remove 2, 3 remain",
        estimatedDurationMinutes: 10,
      },
      {
        id: "math-act-3-2-3",
        type: "multipleChoice",
        title: "Subtraction word problem",
        question: "Sarah has 8 candies. She gives 3 to her friend. How many does she have left?",
        options: [
          { id: "a", text: "2", isCorrect: false, selected: false },
          { id: "b", text: "3", isCorrect: false, selected: false },
          { id: "c", text: "5", isCorrect: true, selected: false },
        ],
        correctAnswerId: "c",
        explanation: "8 - 3 = 5",
        hint: "Start with 8, remove 3",
        estimatedDurationMinutes: 10,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "math-4-1",
    title: "Multiplication Basics",
    description: "Introduction to multiplication as repeated addition",
    illustration: "multiplication",
    estimatedDurationMinutes: 20,
    color: "#ffe66d",
    activityCount: 3,
    activities: [
      {
        id: "math-act-4-1-1",
        type: "multipleChoice",
        title: "What is 2 × 3?",
        question: "What is 2 × 3?",
        options: [
          { id: "a", text: "4", isCorrect: false, selected: false },
          { id: "b", text: "5", isCorrect: false, selected: false },
          { id: "c", text: "6", isCorrect: true, selected: false },
        ],
        correctAnswerId: "c",
        explanation: "2 × 3 = 6 (2 groups of 3)",
        hint: "Count 3 objects twice: 3, 6",
        estimatedDurationMinutes: 12,
      },
      {
        id: "math-act-4-1-2",
        type: "trueFalse",
        title: "Is this true? 3 × 2 = 6",
        question: "Is this true? 3 × 2 = 6",
        options: [
          { id: "a", text: "True", isCorrect: true, selected: false },
          { id: "b", text: "False", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "3 × 2 = 6",
        hint: "Count 2 objects three times",
        estimatedDurationMinutes: 10,
      },
      {
        id: "math-act-4-1-3",
        type: "arrangeOrder",
        title: "Match repeated addition",
        question: "Which shows 3 × 2?",
        options: [
          { id: "a", text: "2 + 2 + 2", isCorrect: true, selected: false },
          { id: "b", text: "2 + 2", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "3 × 2 means 3 groups of 2, which is 2 + 2 + 2",
        hint: "Repeated addition: 2 + 2 + 2 = 6",
        estimatedDurationMinutes: 12,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "math-5-1",
    title: "Fraction Friends",
    description: "Understanding halves and quarters through shapes",
    illustration: "fractions",
    estimatedDurationMinutes: 20,
    color: "#a855f7",
    activityCount: 3,
    activities: [
      {
        id: "math-act-5-1-1",
        type: "multipleChoice",
        title: "What is half of this shape?",
        question: "What is half of this shape?",
        options: [
          { id: "a", text: "One piece", isCorrect: true, selected: false },
          { id: "b", text: "Two pieces", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "Half means 2 equal parts",
        hint: "Split the shape into 2 equal pieces",
        estimatedDurationMinutes: 12,
      },
      {
        id: "math-act-5-1-2",
        type: "fillInBlanks",
        title: "Fill in: 1/4 of 4 = ___",
        question: "Fill in the blank: 1/4 of 4 = ___",
        options: [],
        correctAnswerId: "1",
        explanation: "1/4 of 4 = 1",
        hint: "Divide 4 into 4 equal parts, each part is 1",
        estimatedDurationMinutes: 12,
      },
      {
        id: "math-act-5-1-3",
        type: "selectImage",
        title: "Which shows a quarter?",
        question: "Which shape shows a quarter shaded?",
        options: [
          { id: "a", text: "●", isCorrect: false, selected: false },
          { id: "b", text: "▪▪▪▪", isCorrect: true, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "A quarter is 1 out of 4 equal parts",
        hint: "Look for 1 shaded part out of 4 total",
        estimatedDurationMinutes: 12,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
];

/* English topics for Junior */
const juniorEnglishTopics: JuniorTopic[] = [
  {
    id: "eng-1-1",
    title: "Letter Friends",
    description: "Learn alphabet letters and their sounds",
    illustration: "alphabet",
    estimatedDurationMinutes: 10,
    color: "#ff6b6b",
    activityCount: 1,
    activities: [
      {
        id: "eng-act-1-1-1",
        type: "multipleChoice",
        title: "Which letter makes the /b/ sound?",
        question: "Which letter makes the /b/ sound?",
        options: [
          { id: "a", text: "A", isCorrect: false, selected: false },
          { id: "b", text: "B", isCorrect: true, selected: false },
          { id: "c", text: "C", isCorrect: false, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "B makes the /b/ sound",
        hint: "B says /b/ /b/ ball",
        estimatedDurationMinutes: 8,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "eng-1-2",
    title: "Word Building",
    description: "Build simple words with learned letters",
    illustration: "word-building",
    estimatedDurationMinutes: 10,
    color: "#4ecdc4",
    activityCount: 1,
    activities: [
      {
        id: "eng-act-1-2-1",
        type: "fillInBlanks",
        title: "Complete the word: __at",
        question: "Complete the word: __at",
        options: [],
        correctAnswerId: "c",
        explanation: "The word is 'cat'",
        hint: "C makes /k/ sound, a makes /æ/ sound, t makes /t/ sound",
        estimatedDurationMinutes: 8,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "eng-2-1",
    title: "Sentence Builder",
    description: "Create simple sentences with subject-verb-object",
    illustration: "sentence-building",
    estimatedDurationMinutes: 15,
    color: "#ffe66d",
    activityCount: 3,
    activities: [
      {
        id: "eng-act-2-1-1",
        type: "multipleChoice",
        title: "Choose the correct sentence: I play home.",
        question: "Choose the correct sentence: I play home.",
        options: [
          { id: "a", text: "I play home.", isCorrect: false, selected: false },
          { id: "b", text: "I play at home.", isCorrect: true, selected: false },
          { id: "c", text: "Home play I.", isCorrect: false, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "The correct word order is 'I play at home.'",
        hint: "Remember: Subject + Verb + Place",
        estimatedDurationMinutes: 10,
      },
      {
        id: "eng-act-2-1-2",
        type: "arrangeOrder",
        title: "Arrange words to make a sentence: cat / the / sat on",
        question: "Arrange words to make a sentence: cat / the / sat on",
        options: [
          { id: "a", text: "the cat sat on", isCorrect: true, selected: false },
          { id: "b", text: "on sat the cat", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "Correct order: 'The cat sat on (the mat)'",
        hint: "The comes before cat, sat comes after cat",
        estimatedDurationMinutes: 12,
      },
      {
        id: "eng-act-2-1-3",
        type: "trueFalse",
        title: "Is this a sentence? The dog.",
        question: "Is this a sentence? 'The dog.'",
        options: [
          { id: "a", text: "True", isCorrect: false, selected: false },
          { id: "b", text: "False", isCorrect: true, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "A sentence needs a subject and a verb. 'The dog' has a subject but no verb.",
        hint: "Does 'The dog' action? No - needs a verb like 'runs'",
        estimatedDurationMinutes: 10,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "eng-3-1",
    title: "Grammar Games",
    description: "Learn about nouns, verbs, and adjectives",
    illustration: "grammar",
    estimatedDurationMinutes: 15,
    color: "#a855f7",
    activityCount: 3,
    activities: [
      {
        id: "eng-act-3-1-1",
        type: "multipleChoice",
        title: "Which is a noun? 'The quick brown fox'",
        question: "Which is a noun? 'The quick brown fox'",
        options: [
          { id: "a", text: "quick", isCorrect: false, selected: false },
          { id: "b", text: "brown", isCorrect: false, selected: false },
          { id: "c", text: "fox", isCorrect: true, selected: false },
        ],
        correctAnswerId: "c",
        explanation: "A noun is a person, place, or thing. Fox is a thing.",
        hint: "Look around - what do you see?",
        estimatedDurationMinutes: 10,
      },
      {
        id: "eng-act-3-1-2",
        type: "trueFalse",
        title: "Is 'run' a noun? True or False?",
        question: "Is 'run' a noun? True or False?",
        options: [
          { id: "a", text: "True", isCorrect: false, selected: false },
          { id: "b", text: "False", isCorrect: true, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "'Run' is a verb, not a noun.",
        hint: "Verbs show action. Run is what you do.",
        estimatedDurationMinutes: 10,
      },
      {
        id: "eng-act-3-1-3",
        type: "matchPairs",
        title: "Match the word with its category",
        question: "Match 'apple' with its category",
        options: [
          { id: "a", text: "apple → Food", isCorrect: true, selected: false },
          { id: "b", text: "apple → Toy", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "An apple is food, something we eat.",
        hint: "We eat apples, not play with them as toys",
        estimatedDurationMinutes: 12,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
];

/* Science topics for Junior */
const juniorScienceTopics: JuniorTopic[] = [
  {
    id: "sci-1-1",
    title: "Plant Parts",
    description: "Learn about roots, stems, leaves, and flowers",
    illustration: "plant-parts",
    estimatedDurationMinutes: 10,
    color: "#4ecdc4",
    activityCount: 1,
    activities: [
      {
        id: "sci-act-1-1-1",
        type: "multipleChoice",
        title: "What do roots do?",
        question: "What do roots do?",
        options: [
          { id: "a", text: "Make the plant tall", isCorrect: false, selected: false },
          { id: "b", text: "Soak up water from soil", isCorrect: true, selected: false },
          { id: "c", text: "Make flowers bloom", isCorrect: false, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "Roots soak up water and nutrients from the soil",
        hint: "Roots are under the ground, they drink water",
        estimatedDurationMinutes: 8,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "sci-1-2",
    title: "Animal Homes",
    description: "Where do different animals live?",
    illustration: "animal-homes",
    estimatedDurationMinutes: 10,
    color: "#ffe66d",
    activityCount: 1,
    activities: [
      {
        id: "sci-act-1-2-1",
        type: "selectImage",
        title: "Where does a bird live?",
        question: "Where does a bird live?",
        options: [
          { id: "a", text: "Den", isCorrect: false, selected: false },
          { id: "b", text: "Nest", isCorrect: true, selected: false },
          { id: "c", text: "Shell", isCorrect: false, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "Birds live in nests, usually in trees or high places",
        hint: "Look up in trees for bird nests",
        estimatedDurationMinutes: 8,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "sci-2-1",
    description: "Learn about human body parts and their functions",
    illustration: "human-body",
    estimatedDurationMinutes: 15,
    color: "#a855f7",
    activityCount: 3,
    activities: [
      {
        id: "sci-act-2-1-1",
        type: "multipleChoice",
        title: "What do eyes help us do?",
        question: "What do eyes help us do?",
        options: [
          { id: "a", text: "See", isCorrect: true, selected: false },
          { id: "b", text: "Hear", isCorrect: false, selected: false },
          { id: "c", text: "Taste", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "Eyes help us see the world around us",
        hint: "Close your eyes and try to find your shoe!",
        estimatedDurationMinutes: 10,
      },
      {
        id: "sci-act-2-1-2",
        type: "trueFalse",
        title: "Is heart a body part? True or False?",
        question: "Is heart a body part? True or False?",
        options: [
          { id: "a", text: "True", isCorrect: true, selected: false },
          { id: "b", text: "False", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "The heart is a vital organ that pumps blood",
        hint: "Your heart beats fast when you run",
        estimatedDurationMinutes: 10,
      },
      {
        id: "sci-act-2-1-3",
        type: "fillInBlanks",
        title: "Fill in: We use ______ to walk.",
        question: "Fill in: We use ______ to walk.",
        options: [],
        correctAnswerId: "feet",
        explanation: "We use our feet and legs to walk",
        hint: "Look at your feet - they help you move around",
        estimatedDurationMinutes: 10,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "sci-3-1",
    title: "States of Matter",
    description: "Solids, liquids, and gases around us",
    illustration: "states-of-matter",
    estimatedDurationMinutes: 20,
    color: "#a855f7",
    activityCount: 3,
    activities: [
      {
        id: "sci-act-3-1-1",
        type: "multipleChoice",
        title: "Which is a solid? Ice, water, or air?",
        question: "Which is a solid? Ice, water, or air?",
        options: [
          { id: "a", text: "Ice", isCorrect: true, selected: false },
          { id: "b", text: "Water", isCorrect: false, selected: false },
          { id: "c", text: "Air", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "Ice has a fixed shape, it's a solid",
        hint: "Solids keep their shape, like a rock or ice cube",
        estimatedDurationMinutes: 12,
      },
      {
        id: "sci-act-3-1-2",
        type: "fillInBlanks",
        title: "Fill in: Water becomes ______ when frozen.",
        question: "Fill in: Water becomes ______ when frozen.",
        options: [],
        correctAnswerId: "ice",
        explanation: "Water becomes ice when frozen",
        hint: "Ice is what water turns into in the freezer",
        estimatedDurationMinutes: 12,
      },
      {
        id: "sci-act-3-1-3",
        type: "selectImage",
        title: "Which is a gas? Balloon or stone?",
        question: "Which is a gas? Balloon or stone?",
        options: [
          { id: "a", text: "Balloon (air inside)", isCorrect: true, selected: false },
          { id: "b", text: "Stone", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "Air inside a balloon is a gas, it fills the space",
        hint: "Gas fills all the available space",
        estimatedDurationMinutes: 12,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
];

/* Environmental Studies topics for Junior */
const juniorEVSTopics: JuniorTopic[] = [
  {
    id: "evs-1-1",
    title: "My Family",
    description: "Learn about family members and their roles",
    illustration: "family",
    estimatedDurationMinutes: 10,
    color: "#ff6b6b",
    activityCount: 1,
    activities: [
      {
        id: "evs-act-1-1-1",
        type: "multipleChoice",
        title: "Who cooks food in your family?",
        question: "Who cooks food in your family?",
        options: [
          { id: "a", text: "Teacher", isCorrect: false, selected: false },
          { id: "b", text: "Mother/Father", isCorrect: true, selected: false },
          { id: "c", text: "Friend", isCorrect: false, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "Parents/guardians typically cook food for the family",
        hint: "Think about who makes dinner at home",
        estimatedDurationMinutes: 8,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "evs-1-2",
    title: "Nature Around Us",
    description: "Trees, plants, and seasons",
    illustration: "nature",
    estimatedDurationMinutes: 10,
    color: "#4ecdc4",
    activityCount: 1,
    activities: [
      {
        id: "evs-act-1-2-1",
        type: "trueFalse",
        title: "Do trees give us oxygen? True or False?",
        question: "Do trees give us oxygen? True or False?",
        options: [
          { id: "a", text: "True", isCorrect: true, selected: false },
          { id: "b", text: "False", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "Trees produce oxygen through photosynthesis",
        hint: "Trees breathe in carbon dioxide and give us oxygen",
        estimatedDurationMinutes: 8,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "evs-2-1",
    title: "Water We Use",
    description: "Sources of water and uses of water",
    illustration: "water-cycle",
    estimatedDurationMinutes: 15,
    color: "#ffe66d",
    activityCount: 3,
    activities: [
      {
        id: "evs-act-2-1-1",
        type: "multipleChoice",
        title: "Where does tap water come from?",
        question: "Where does tap water come from?",
        options: [
          { id: "a", text: "Rain only", isCorrect: false, selected: false },
          { id: "b", text: "Water treatment plant", isCorrect: true, selected: false },
          { id: "c", text: "Bottles only", isCorrect: false, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "Tap water comes from treatment plants after being sourced from rivers/lakes",
        hint: "Water is collected from nature and cleaned at plants",
        estimatedDurationMinutes: 10,
      },
      {
        id: "evs-act-2-1-2",
        type: "fillInBlanks",
        title: "Fill in: We use water for ______ and bathing.",
        question: "Fill in: We use water for ______ and bathing.",
        options: [],
        correctAnswerId: "cooking",
        explanation: "We use water for cooking and bathing",
        hint: "Water is used for many daily activities",
        estimatedDurationMinutes: 10,
      },
      {
        id: "evs-act-2-1-3",
        type: "matchPairs",
        title: "Match the water source",
        question: "Match the water source with its type",
        options: [
          { id: "a", text: "Rain → From sky", isCorrect: true, selected: false },
          { id: "b", text: "Tap → From treatment plant", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "Rain comes from the sky, tap water comes from treatment plants",
        hint: "Look up when it rains!",
        estimatedDurationMinutes: 12,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
  {
    id: "evs-3-1",
    title: "Food We Eat",
    description: "Different food groups and balanced diet",
    illustration: "food-groups",
    estimatedDurationMinutes: 20,
    color: "#a855f7",
    activityCount: 3,
    activities: [
      {
        id: "evs-act-3-1-1",
        type: "multipleChoice",
        title: "Which food gives energy? Rice, soap, or stone?",
        question: "Which food gives energy? Rice, soap, or stone?",
        options: [
          { id: "a", text: "Rice", isCorrect: true, selected: false },
          { id: "b", text: "Soap", isCorrect: false, selected: false },
          { id: "c", text: "Stone", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "Rice provides carbohydrates for energy",
        hint: "Think about what foods we eat to have energy to play",
        estimatedDurationMinutes: 12,
      },
      {
        id: "evs-act-3-1-2",
        type: "trueFalse",
        title: "Is chocolate a everyday food? True or False?",
        question: "Is chocolate a everyday food? True or False?",
        options: [
          { id: "a", text: "True", isCorrect: false, selected: false },
          { id: "b", text: "False", isCorrect: true, selected: false },
        ],
        correctAnswerId: "b",
        explanation: "Chocolate is a treat, best enjoyed occasionally, not every day",
        hint: "Everyday foods help us grow strong and healthy",
        estimatedDurationMinutes: 10,
      },
      {
        id: "evs-act-3-1-3",
        type: "matchPairs",
        title: "Match food to its group",
        question: "Match 'Apple' with its food group",
        options: [
          { id: "a", text: "Apple → Fruits", isCorrect: true, selected: false },
          { id: "b", text: "Apple → Grains", isCorrect: false, selected: false },
        ],
        correctAnswerId: "a",
        explanation: "An apple is a fruit, one of the main food groups",
        hint: "Fruits grow on trees or on plants, they have seeds or skins we eat",
        estimatedDurationMinutes: 12,
      },
    ],
    isLocked: false,
    unlockCondition: undefined,
  },
];

/* Mock learner profiles for Junior classes 1-5 */
export const juniorLearner1: LearnerProfile = {
  fullName: "Aanya Singh",
  currentClass: "1",
  board: "CBSE",
  currentUniverse: "junior",
  selectedSubjects: ["Mathematics", "EVS", "Language", "Art"],
  assessmentScore: 88,
  assessmentTotal: 100,
  learningStreak: 3,
  highestStreak: 10,
  totalXP: 450,
  currentLevel: 2,
  coins: 120,
};

export const juniorLearner2: LearnerProfile = {
  fullName: "Vihaan Patel",
  currentClass: "2",
  board: "CBSE",
  currentUniverse: "junior",
  selectedSubjects: ["Mathematics", "EVS", "Language", "Art"],
  assessmentScore: 91,
  assessmentTotal: 100,
  learningStreak: 7,
  highestStreak: 14,
  totalXP: 780,
  currentLevel: 3,
  coins: 180,
};

export const juniorLearner3: LearnerProfile = {
  fullName: "Diya Sharma",
  currentClass: "3",
  board: "CBSE",
  currentUniverse: "junior",
  selectedSubjects: ["Mathematics", "EVS", "Language", "Art"],
  assessmentScore: 85,
  assessmentTotal: 100,
  learningStreak: 12,
  highestStreak: 28,
  totalXP: 2450,
  currentLevel: 6,
  coins: 345,
};

export const juniorLearner4: LearnerProfile = {
  fullName: "Sneha Reddy",
  currentClass: "4",
  board: "ICSE",
  currentUniverse: "junior",
  selectedSubjects: ["Mathematics", "EVS", "Language", "Art"],
  assessmentScore: 78,
  assessmentTotal: 100,
  learningStreak: 5,
  highestStreak: 22,
  totalXP: 1890,
  currentLevel: 5,
  coins: 290,
};

export const juniorLearner5: LearnerProfile = {
  fullName: "Rohit Patel",
  currentClass: "5",
  board: "ICSE",
  currentUniverse: "junior",
  selectedSubjects: ["Mathematics", "EVS", "Language", "Art"],
  assessmentScore: 92,
  assessmentTotal: 100,
  learningStreak: 8,
  highestStreak: 22,
  totalXP: 3120,
  currentLevel: 8,
  coins: 420,
};

/* Junior subject overview cards */
export function getJuniorSubjectOverviewCards(
  learner: LearnerProfile
): SubjectCard[] {
  const universe = learner.currentUniverse;
  const classNum = parseInt(learner.currentClass);
  const subjects = learner.selectedSubjects;
  const theme = universeThemesConfig[universe];

  // Junior-specific subject progress data
  const subjectProgressData: Record<string, { completed: number; total: number }> = {
    // Mathematics progress based on class
    Mathematics: classNum >= 3
      ? { completed: 18, total: 25 }
      : { completed: 12, total: 15 },
    // EVS/EVS progress
    EVS: classNum >= 3
      ? { completed: 15, total: 20 }
      : { completed: 8, total: 10 },
    // Language/English progress
    Language: classNum >= 3
      ? { completed: 18, total: 22 }
      : { completed: 15, total: 20 },
    // Art progress
    Art: { completed: 10, total: 12 },
  };

  const cards: SubjectCard[] = [];

  subjects.forEach((subject, index) => {
    const data = subjectProgressData[subject] || { completed: 5, total: 10 };
    const progressPercentage = Math.round((data.completed / data.total) * 100);

    // Mastery classification
    let masteryClassification: "mastering" | "developing" | "building";
    if (progressPercentage >= 80) {
      masteryClassification = "mastering";
    } else if (progressPercentage >= 50) {
      masteryClassification = "developing";
    } else {
      masteryClassification = "building";
    }

    // Age-adaptive continue label
    const continueLabel = classNum <= 2
      ? "Play & Learn"
      : `Learn ${subject}`;

    cards.push({
      id: `subject-${universe}-${index}`,
      name: subject,
      icon: getJuniorSubjectIcon(subject),
      topicsCompleted: data.completed,
      totalTopics: data.total,
      progressPercentage,
      masteryClassification,
      continueLabel,
    });
  });

  // If no subjects, add empty state
  if (cards.length === 0) {
    cards.push({
      id: "empty-subjects",
      name: "No subjects selected",
      icon: "book",
      topicsCompleted: 0,
      totalTopics: 0,
      progressPercentage: 0,
      masteryClassification: "building",
      continueLabel: "Select Subjects",
    });
  }

  return cards;
}

/* Junior learning journey nodes - age adaptive */
export function getJuniorLearningJourneyNodes(
  learner: LearnerProfile
): LearningJourneyNode[] {
  const universe = learner.currentUniverse;
  const classNum = parseInt(learner.currentClass);

  // Friendly illustrated learning paths for Classes 1-5
  // Classes 1-2: Simpler paths, fewer milestones
  // Classes 3-5: More paths, increasing challenge
  const isUpperJunior = classNum >= 3;

  const nodes: LearningJourneyNode[] = [
    {
      id: "world-1",
      title: "Wonder Garden",
      subject: "Mathematics",
      stage: isUpperJunior ? "unlocked" : "locked",
      isCurrent: classNum === 3,
      isMilestone: true,
    },
    {
      id: "world-2",
      title: "Colour Kingdom",
      subject: "EVS",
      stage: isUpperJunior ? "unlocked" : "locked",
      isCurrent: classNum === 4,
      isMilestone: true,
    },
    {
      id: "world-3",
      title: "Story Garden",
      subject: "Language",
      stage: "unlocked",
      isCurrent: classNum === 3 || classNum === 5,
      isMilestone: false,
    },
    {
      id: "world-4",
      title: "Art Quest",
      subject: "Art",
      stage: isUpperJunior ? (classNum >= 5 ? "completed" : "unlocked") : "locked",
      isCurrent: classNum === 5,
      isMilestone: true,
    },
    {
      id: "world-5",
      title: "Number Adventures",
      subject: "Mathematics",
      stage: isUpperJunior ? "locked" : "locked",
      isCurrent: false,
      isMilestone: false,
    },
    // Upper junior additional worlds
    ...(isUpperJunior
      ? [
          {
            id: "world-6",
            title: "Measuring Land",
            subject: "Mathematics",
            stage: "locked",
            isCurrent: false,
            isMilestone: false,
          },
          {
            id: "world-7",
            title: "Word World",
            subject: "Language",
            stage: "locked",
            isCurrent: false,
            isMilestone: false,
          },
        ]
      : []),
  ];

  // If no nodes generated, add placeholder
  if (nodes.length === 0) {
    nodes.push(
      { id: "placeholder", title: "Start Learning", subject: "General", stage: "locked", isCurrent: true, isMilestone: false }
    );
  }

  return nodes;
}

/* Junior reward configuration - age appropriate */
export const juniorRewardConfig: JuniorRewardConfig = {
  xpForActivity: classNum => classNum <= 2 ? 10 : 15,
  xpForQuestComplete: classNum => classNum <= 2 ? 50 : 75,
  xpForLessonComplete: classNum => classNum <= 2 ? 25 : 40,
  coinsForActivity: classNum => classNum <= 2 ? 5 : 8,
  coinsForQuestComplete: classNum => classNum <= 2 ? 20 : 35,
  coinsForLessonComplete: classNum => classNum <= 2 ? 15 : 25,
  starsForActivity: classNum => classNum <= 2 ? 1 : 2,
  starsForQuestComplete: classNum => classNum <= 2 ? 3 : 5,
  starsForLessonComplete: classNum => classNum <= 2 ? 2 : 4,
};

/* Junior badges configuration */
export const juniorBadges: JuniorAchievement[] = [
  {
    id: "badge-first-steps",
    title: "First Steps",
    description: "Complete your first lesson",
    badgeType: "first_steps",
    condition: "complete 1 lesson",
    isEarned: false,
  },
  {
    id: "badge-topic-master",
    title: "Topic Master",
    description: "Complete all activities in a topic",
    badgeType: "topic_master",
    condition: "complete all activities in 1 topic",
    isEarned: false,
  },
  {
    id: "badge-quest-complete",
    title: "Quest Complete",
    description: "Complete your first quest",
    badgeType: "quest_complete",
    condition: "complete 1 quest",
    isEarned: false,
  },
  {
    id: "badge-daily-streak",
    title: "Daily Streak",
    description: "Maintain a 3-day learning streak",
    badgeType: "daily_streak",
    condition: "maintain 3-day learning streak",
    isEarned: false,
  },
  {
    id: "badge-perfect-score",
    title: "Perfect Score",
    description: "Get 100% in an activity",
    badgeType: "perfect_score",
    condition: "score 100% in any activity",
    isEarned: false,
  },
  {
    id: "badge-speed-demon",
    title: "Speed Demon",
    description: "Complete an activity in under 5 minutes",
    badgeType: "speed_demon",
    condition: "complete activity in under 5 minutes",
    isEarned: false,
  },
  {
    id: "badge-knowledge-seeker",
    title: "Knowledge Seeker",
    description: "Complete 5 different topics",
    badgeType: "knowledge_seeker",
    condition: "complete 5 different topics",
    isEarned: false,
  },
  {
    id: "badge-class-champion",
    title: "Class Champion",
    description: "Complete all topics in Mathematics",
    badgeType: "class_champion",
    condition: "complete all Mathematics topics",
    isEarned: false,
  },
];

/* Junior quests configuration */
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

/* Mock quests for Junior learners */
export const juniorQuests: JuniorQuest[] = [
  {
    id: "quest-1-1",
    title: "Number Explorer",
    description: "Complete the Addition Adventure topic",
    subject: "Mathematics",
    topicId: "math-1-1",
    difficulty: "easy",
    estimatedDurationMinutes: 20,
    rewardXP: 50,
    rewardCoins: 20,
    rewardBadge: "first_steps",
    completionCondition: "completeLesson",
    conditionValue: 1,
    isCompleted: false,
    progress: 0,
  },
  {
    id: "quest-1-2",
    title: "Shape Detective",
    description: "Complete the Shape Seekers topic",
    subject: "Mathematics",
    topicId: "math-1-2",
    difficulty: "easy",
    estimatedDurationMinutes: 15,
    rewardXP: 40,
    rewardCoins: 15,
    rewardBadge: "first_steps",
    completionCondition: "completeLesson",
    conditionValue: 1,
    isCompleted: false,
    progress: 0,
  },
  {
    id: "quest-2-1",
    title: "Word Builder",
    description: "Complete the Letter Friends topic",
    subject: "Language",
    topicId: "eng-1-1",
    difficulty: "easy",
    estimatedDurationMinutes: 15,
    rewardXP: 45,
    rewardCoins: 18,
    rewardBadge: "first_steps",
    completionCondition: "completeLesson",
    conditionValue: 1,
    isCompleted: false,
    progress: 0,
  },
  {
    id: "quest-2-2",
    title: "Plant Friend",
    description: "Complete the Plant Parts topic",
    subject: "EVS",
    topicId: "sci-1-1",
    difficulty: "easy",
    estimatedDurationMinutes: 15,
    rewardXP: 45,
    rewardCoins: 18,
    rewardBadge: "knowledge_seeker",
    completionCondition: "completeLesson",
    conditionValue: 1,
    isCompleted: false,
    progress: 0,
  },
  {
    id: "quest-3-1",
    title: "Addition Master",
    description: "Complete all activities in Addition Adventure",
    subject: "Mathematics",
    topicId: "math-3-1",
    difficulty: "medium",
    estimatedDurationMinutes: 45,
    rewardXP: 100,
    rewardCoins: 50,
    rewardBadge: "topic_master",
    completionCondition: "activitiesCompleted",
    conditionValue: 3,
    isCompleted: false,
    progress: 0,
  },
  {
    id: "quest-3-2",
    title: "Sentence Master",
    description: "Complete all activities in Sentence Builder",
    subject: "Language",
    topicId: "eng-2-1",
    difficulty: "medium",
    estimatedDurationMinutes: 45,
    rewardXP: 100,
    rewardCoins: 50,
    rewardBadge: "topic_master",
    completionCondition: "activitiesCompleted",
    conditionValue: 3,
    isCompleted: false,
    progress: 0,
  },
  {
    id: "quest-4-1",
    title: "Science Explorer",
    description: "Complete the Human Body topic",
    subject: "Science",
    topicId: "sci-2-1",
    difficulty: "medium",
    estimatedDurationMinutes: 30,
    rewardXP: 80,
    rewardCoins: 40,
    rewardBadge: "knowledge_seeker",
    completionCondition: "completeLesson",
    conditionValue: 1,
    isCompleted: false,
    progress: 0,
  },
  {
    id: "quest-5-1",
    title: "Family Helper",
    description: "Complete the My Family topic and tell family members' roles",
    subject: "EVS",
    topicId: "evs-1-1",
    difficulty: "hard",
    estimatedDurationMinutes: 30,
    rewardXP: 120,
    rewardCoins: 60,
    rewardBadge: "class_champion",
    completionCondition: "activitiesCompleted",
    conditionValue: 1,
    isCompleted: false,
    progress: 0,
  },
  {
    id: "quest-5-2",
    title: "Perfect Score",
    description: "Score 100% in any activity",
    subject: "Mathematics",
    topicId: "math-1-1",
    difficulty: "hard",
    estimatedDurationMinutes: 10,
    rewardXP: 200,
    rewardCoins: 100,
    rewardBadge: "perfect_score",
    completionCondition: "scoreAbove",
    conditionValue: 100,
    isCompleted: false,
    progress: 0,
  },
];

/* Recent activity events for Junior */
export function getJuniorRecentActivityEvents(learner: LearnerProfile): ActivityEvent[] {
  const universe = learner.currentUniverse;
  const classNum = parseInt(learner.currentClass);
  const now = new Date();

  const events: ActivityEvent[] = [];

  // Base events per class level for junior
  let baseEvents: { type: ActivityEvent["type"]; description: string; subject: string }[];

  if (classNum <= 2) {
    // Classes 1-2: Simpler events
    baseEvents = [
      { type: "lesson", description: "Completed number lesson", subject: "Mathematics" },
      { type: "achievement", description: "Earned first badge", subject: "Art" },
      { type: "lesson", description: "Finished shapes quiz", subject: "EVS" },
    ];
  } else {
    // Classes 3-5: More detailed events
    baseEvents = [
      { type: "lesson", description: "Completed addition lesson", subject: "Mathematics" },
      { type: "achievement", description: "Earned topic master badge", subject: "Mathematics" },
      { type: "lesson", description: "Finished sentence builder", subject: "Language" },
      { type: "revision", description: "Reviewed number patterns", subject: "Mathematics" },
    ];
  }

  // Create chronological events (last 5, most recent first)
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();

  baseEvents.slice(0, 5).forEach((event, index) => {
    const eventMinute = (nowMinute - (index * 15 + index * 10) + 60) % 60;
    const eventHour = (nowHour - Math.floor((index * 15 + index * 10) / 60) + 24) % 24;

    const timestamp = `${formatTime(eventHour)}:${formatTime(eventMinute)}`;

    events.push({
      id: `event-${universe}-${index}`,
      type: event.type,
      description: event.description,
      subject: event.subject,
      timestamp,
      visualIndicator: getVisualIndicator(event.type, universe),
    });
  });

  // If no events, add empty state
  if (events.length === 0) {
    events.push({
      id: "activity-empty",
      type: "lesson",
      description: "No recent activity",
      subject: "—",
      timestamp: "Just now",
      visualIndicator: "book-open",
    });
  }

  return events;
}

/* Mock assessment result for junior */
export function getJuniorMockAssessmentResult(
  learner: LearnerProfile
): AssessmentResult {
  const { assessmentScore, assessmentTotal, currentUniverse, selectedSubjects } = learner;
  const total = assessmentTotal ?? 100;
  const score = assessmentScore ?? Math.floor(Math.random() * 100);
  const percentage = Math.round((score / total) * 100);

  // Subject accuracies based on performance
  const subjectAccuracies: Record<string, number> = {};
  selectedSubjects.forEach((subject) => {
    const baseAcc = Math.max(50, percentage - Math.random() * 20);
    subjectAccuracies[subject] = Math.round(baseAcc);
  });

  // Topic gaps - weaker areas
  const topicGaps: readonly string[] = [];
  if (percentage < 70) {
    topicGaps.push("Basic addition and subtraction");
    topicGaps.push("Letter recognition");
  }
  if (percentage < 50) {
    topicGaps.push("Reading simple sentences");
    topicGaps.push("Basic shapes");
  }

  return {
    score,
    total,
    percentage,
    subjectAccuracies,
    topicGaps,
  };
}

/* Export all junior-specific functions and types for convenience */
export {
  juniorLearner1,
  juniorLearner2,
  juniorLearner3,
  juniorLearner4,
  juniorLearner5,
  getJuniorSubjectOverviewCards,
  getJuniorLearningJourneyNodes,
  juniorRewardConfig,
  juniorBadges,
  getJuniorRecentActivityEvents,
  getJuniorMockAssessmentResult,
  getJuniorSubjectIcon,
};

/* Export all junior-specific functions and types for convenience */
export {
  juniorLearner1,
  juniorLearner2,
  juniorLearner3,
  juniorLearner4,
  juniorLearner5,
  getJuniorSubjectOverviewCards,
  getJuniorLearningJourneyNodes,
  juniorRewardConfig,
  juniorBadges,
  getJuniorRecentActivityEvents,
  getJuniorMockAssessmentResult,
  getJuniorSubjectIcon,
  juniorQuests,
  getJuniorQuests,
};

/* Get quests for a learner - filters by completed/uncompleted */
export function getJuniorQuests(
  learner: LearnerProfile
): JuniorQuest[] {
  const classNum = parseInt(learner.currentClass);
  const completedQuests = learner.completedQuests || [];
  const allQuests = juniorQuests;

  // Return only uncompleted quests, plus completed ones at the end
  const uncompleted = allQuests.filter(q => !q.isCompleted);
  const completed = allQuests.filter(q => q.isCompleted);

  // Update progress based on learner's completed topics
  const updatedUncompleted = uncompleted.map(quest => {
    const topic = getTopicsForSubjectAndClass(quest.subject, classNum).find(
      t => t.id === quest.topicId
    );
    if (!topic) return quest;

    const isTopicCompleted =
      (learner.completedTopics || []).includes(quest.topicId) ||
      topic.progressState === "completed";

    const activitiesCompleted =
      topic && topic.activityCount > 0
        ? (learner.completedTopics || []).filter(
            (t: string) => t.startsWith(quest.topicId + "-") ||
              (topic.id + "-").includes(t)
          ).length
        : 0;

    const newProgress = Math.min(
      (activitiesCompleted / topic.activityCount) * 100,
      100
    );

    return {
      ...quest,
      progress: newProgress,
      isCompleted:
        quest.completionCondition === "activitiesCompleted"
          ? activitiesCompleted >= quest.conditionValue
          : quest.isCompleted,
    };
  });

  // Keep completed quests as-is
  const updatedCompleted = completed.map(quest => ({
    ...quest,
    isCompleted: true,
    progress: 100,
  }));

  return [...updatedUncompleted, ...updatedCompleted];
}

/* Junior subject icon helper */
function getJuniorSubjectIcon(subject: string): string {
  const subjectLower = subject.toLowerCase();
  const iconMap: Record<string, string> = {
    mathematics: "calculator",
    evs: "sprout",
    science: "flask",
    language: "languages",
    english: "languages",
    hindi: "languages",
    art: "palette",
  };
  return iconMap[subjectLower] || "book";
}
  const universe = learner.currentUniverse;
  const classNum = parseInt(learner.currentClass);
  const now = new Date();

  // Generate chronological events based on universe and class
  const events: ActivityEvent[] = [];

  // Base events per universe
  let baseEvents: { type: ActivityEvent["type"]; description: string; subject: string }[];

  switch (universe) {
    case "junior":
      baseEvents = [
        { type: "lesson", description: "Completed addition lesson", subject: "Mathematics" },
        { type: "achievement", description: "Earned first badge", subject: "Art" },
        { type: "lesson", description: "Finished plants quiz", subject: "EVS" },
        { type: "revision", description: "Reviewed number patterns", subject: "Mathematics" },
      ];
      break;
    case "nexus":
      baseEvents = [
        { type: "quest", description: "Completed mission: Variable Quest", subject: "Mathematics" },
        { type: "achievement", description: "Earned: Quest Complete badge", subject: "Science" },
        { type: "lesson", description: "Finished cell structure topic", subject: "Science" },
        { type: "revision", description: "Reviewed algebra concepts", subject: "Mathematics" },
      ];
      break;
    case "ascend":
      baseEvents = [
        { type: "lesson", description: "Completed calculus module", subject: "Mathematics" },
        { type: "achievement", description: "Earned: Advanced Practice badge", subject: "Physics" },
        { type: "revision", description: "Reviewed thermodynamics", subject: "Chemistry" },
        { type: "quest", description: "Started: Exam Prep quest", subject: "Mathematics" },
      ];
      break;
    default:
      baseEvents = [
        { type: "lesson", description: "Completed lesson", subject: "Mathematics" },
      ];
  }

  // Create chronological events (last 5, most recent first)
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();

  baseEvents.slice(0, 5).forEach((event, index) => {
    // Stamp events going back in time
    const eventMinute = (nowMinute - (index * 15 + index * 10) + 60) % 60;
    const eventHour = (nowHour - Math.floor((index * 15 + index * 10) / 60) + 24) % 24;

    const timestamp = `${formatTime(eventHour)}:${formatTime(eventMinute)}`;

    events.push({
      id: `event-${universe}-${index}`,
      type: event.type,
      description: event.description,
      subject: event.subject,
      timestamp,
      visualIndicator: getVisualIndicator(event.type, universe),
    });
  });

  // If no events, add empty state
  if (events.length === 0) {
    events.push({
      id: "activity-empty",
      type: "lesson",
      description: "No recent activity",
      subject: "—",
      timestamp: "Just now",
      visualIndicator: "book-open",
    });
  }

/**
 * Get visual indicator for activity event type and universe
 */
function getVisualIndicator(
  type: ActivityEvent["type"],
  universe: UniverseId
): string {
  const indicatorMap: Record<UniverseId, Record<ActivityEvent["type"], string>> = {
    junior: {
      lesson: "sprout",
      achievement: "trophy",
      lesson: "star",
      revision: "clock",
    },
    nexus: {
      quest: "wand-sparkles",
      achievement: "trophy",
      lesson: "atom",
      revision: "clock",
    },
    ascend: {
      lesson: "calculator",
      achievement: "trophy",
      revision: "calendar",
      quest: "target",
    },
  };

  return (
    (indicatorMap[universe]?.[type] || "book") +
    " " +
    (type === "achievement" ? "fill" : "")
  );
}

/**
 * Mock assessment result
 */
export function getMockAssessmentResult(
  learner: LearnerProfile
): AssessmentResult {
  const { assessmentScore, assessmentTotal, currentUniverse, selectedSubjects } = learner;
  const total = assessmentTotal ?? 100;
  const score = assessmentScore ?? Math.floor(Math.random() * 100);
  const percentage = Math.round((score / total) * 100);

  // Subject accuracies based on performance
  const subjectAccuracies: Record<string, number> = {};
  selectedSubjects.forEach((subject) => {
    // Base accuracy on overall percentage with some variation
    const baseAcc = Math.max(50, percentage - Math.random() * 20);
    subjectAccuracies[subject] = Math.round(baseAcc);
  });

  // Topic gaps - weaker areas
  const topicGaps: readonly string[] = [];
  if (percentage < 70) {
    topicGaps.push("Fractions and decimals");
    topicGaps.push("Basic algebra");
  }
  if (percentage < 50) {
    topicGaps.push("Advanced geometry");
    topicGaps.push("Scientific method");
  }

  return {
    score,
    total,
    percentage,
    subjectAccuracies,
    topicGaps,
  };
}

/**
 * Helper to format time with leading zero
 */
function formatTime(value: number): string {
  return value < 10 ? `0${value}` : `${value}`;
}

// Export all mock data and functions for convenience
export type {
  LearnerProfile,
  DailyGoal,
  LearningCard,
  SubjectCard,
  LearningJourneyNode,
  GPProgress,
  Recommendation,
  ActivityEvent,
  AssessmentResult,
};

export {
  juniorLearner3,
  juniorLearner5,
  nexusLearner7,
  nexusLearner10,
  ascendScience11,
  ascendCommerce11,
  ascendScience12,
  ascendCommerce12,
  ascendArts12,
  getLearnerProfile,
  getDailyGoal,
  getContinueLearningCards,
  getSubjectOverviewCards,
  getLearningJourneyNodes,
  getGamificationSummary,
  getRecommendations,
  getRecentActivityEvents,
  getMockAssessmentResult,
};