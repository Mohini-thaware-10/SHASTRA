/* Junior Curriculum Structure
 * Centralized curriculum data for SHATRA JUNIOR (Classes 1-5)
 * Structure is class-specific with age-appropriate content
 * All data is deterministic mock data for frontend demonstration
 */

// Class configuration
export type JuniorClass = "1" | "2" | "3" | "4" | "5";

// Universe mapping
export type UniverseId = "junior" | "nexus" | "ascend";

// Age range per class
export const JUNIOR_CLASS_AGE: Record<JuniorClass, { minAge: number; maxAge: number }> = {
  "1": { minAge: 6, maxAge: 7 },
  "2": { minAge: 7, maxAge: 8 },
  "3": { minAge: 8, maxAge: 9 },
  "4": { minAge: 9, maxAge: 10 },
  "5": { minAge: 10, maxAge: 11 },
};

// Subject color identities per universe theme
export const JUNIOR_SUBJECT_COLORS = {
  mathematics: "#ff6b6b",
  english: "#4ecdc4",
  science: "#ffe66d",
  evs: "#a855f7",
  art: "#a855f7",
};

// Subject display names
export const JUNIOR_SUBJECT_DISPLAY = {
  mathematics: "Mathematics",
  english: "English",
  science: "Science",
  evs: "Environmental Studies",
  art: "Art",
};

// ============================================================
// CURRICULUM: Class-specific topic sequences
// ============================================================

/** Lower Junior (Classes 1-2) curriculum structure */
export const JUNIOR_LOWER_CURRICULUM = {
  mathematics: [
    { id: "math-1-1", title: "Number Friends", "description": "Learn numbers 1-10 and their names", "activityCount": 1 },
    { id: "math-1-2", title: "Shape Seekers", "description": "Identify basic shapes: circle, square, triangle", "activityCount": 1 },
    { id: "math-1-3", title: "Counting Fun", "description": "Count objects and match with numbers", "activityCount": 1 },
  ],
  english: [
    { id: "eng-1-1", title: "Letter Friends", "description": "Learn alphabet letters and their sounds", "activityCount": 1 },
    { id: "eng-1-2", title: "Word Building", "description": "Build simple words with learned letters", "activityCount": 1 },
  ],
  science: [
    { id: "sci-1-1", title: "Plant Parts", "description": "Learn about roots, stems, leaves, and flowers", "activityCount": 1 },
    { id: "sci-1-2", title: "Animal Homes", "description": "Where do different animals live?", "activityCount": 1 },
  ],
  evs: [
    { id: "evs-1-1", title: "My Family", "description": "Learn about family members and their roles", "activityCount": 1 },
    { id: "evs-1-2", title: "Nature Around Us", "description": "Trees, plants, and seasons", "activityCount": 1 },
  ],
  art: [
    { id: "art-1-1", title: "Color Magic", "description": "Explore colors and creativity", "activityCount": 2 },
  ],
};

/** Upper Junior (Classes 3-5) curriculum structure */
export const JUNIOR_UPPER_CURRICULUM = {
  mathematics: [
    { id: "math-3-1", title: "Addition Adventure", "description": "Learn addition with numbers up to 20 using visual objects", "activityCount": 3 },
    { id: "math-3-2", title: "Subtraction Stories", "description": "Learn subtraction taking away from numbers up to 20", "activityCount": 3 },
    { id: "math-3-3", title: "Multiplication Basics", "description": "Introduction to multiplication as repeated addition", "activityCount": 3 },
    { id: "math-4-1", title: "Multiplication Basics", "description": "Introduction to multiplication as repeated addition", "activityCount": 3 },
    { id: "math-5-1", title: "Fraction Friends", "description": "Understanding halves and quarters through shapes", "activityCount": 3 },
  ],
  english: [
    { id: "eng-2-1", title: "Sentence Builder", "description": "Create simple sentences with subject-verb-object", "activityCount": 3 },
    { id: "eng-3-1", title: "Grammar Games", "description": "Learn about nouns, verbs, and adjectives", "activityCount": 3 },
  ],
  science: [
    { id: "sci-2-1", title: "Human Body", "description": "Learn about human body parts and their functions", "activityCount": 3 },
    { id: "sci-3-1", title: "States of Matter", "description": "Solids, liquids, and gases around us", "activityCount": 3 },
  ],
  evs: [
    { id: "evs-3-1", title: "Food We Eat", "description": "Different food groups and balanced diet", "activityCount": 3 },
  ],
  art: [
    { id: "art-1-1", title: "Color Magic", "description": "Explore colors and creativity", "activityCount": 2 },
  ],
};

/** Get curriculum for a specific class */
export function getJuniorCurriculum(
  classNum: JuniorClass,
  subject: keyof typeof JUNIOR_LOWER_CURRICULUM
): readonly { id: string; title: string; description: string; activityCount: number }[] {
  const isUpperJunior = classNum >= 3;
  return isUpperJunior
    ? JUNIOR_UPPER_CURRICULUM[subject]
    : JUNIOR_LOWER_CURRICULUM[subject];
}

/** Get all subjects for a class */
export function getJuniorSubjectsForClass(classNum: JuniorClass): readonly string[] {
  const isUpperJunior = classNum >= 3;
  const lowerSubjects = ["mathematics", "english", "science", "evs", "art"];
  const upperSubjects = ["mathematics", "english", "science", "evs"];
  return isUpperJunior ? upperSubjects : lowerSubjects;
}

// ============================================================
// LESSONS: Structured lesson data
// ============================================================

/** Lesson step types */
export type LessonStepType = "introduction" | "concept" | "example" | "guided-practice" | "knowledge-check" | "completion";

export interface LessonStep {
  id: string;
  type: LessonStepType;
  title: string;
  content: string;
  illustration?: string;
  isInteractive: boolean;
}

/** Complete lesson structure */
export interface JuniorLesson {
  id: string;
  title: string;
  subject: string;
  topicId: string;
  classRange: JuniorClass[]; // Classes this lesson is appropriate for
  steps: LessonStep[];
  estimatedDurationMinutes: number;
  learningObjective: string;
}

/** Get lessons for a topic and class */
export function getLessonsForTopic(
  topicId: string,
  classNum: JuniorClass
): JuniorLesson[] {
  // Generate lessons based on topic and class level
  const isUpperJunior = classNum >= 3;

  // Define lessons per topic for different class ranges
  const topicLessons: Record<string, { steps: LessonStep[]; duration: number; objective: string }[]> = {
    // Lower Junior Mathematics
    "math-1-1": {
      steps: [
        { id: "ls-1-1-1", type: "introduction", title: "Welcome to Number Friends", content: "Today we'll learn about numbers 1-10", isInteractive: false },
        { id: "ls-1-1-2", type: "concept", title: "Numbers 1-10", content: "Count together: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10", isInteractive: false },
        { id: "ls-1-1-3", type: "example", title: "Counting Objects", content: "Look at 5 apples: 1, 2, 3, 4, 5", isInteractive: true },
        { id: "ls-1-1-4", type: "guided-practice", title: "Count Together", content: "Let's count 6 stars together!", isInteractive: true },
        { id: "ls-1-1-5", type: "knowledge-check", title: "Quick Quiz", content: "How many fingers do you have on one hand?", isInteractive: true },
      ],
      duration: 20,
      objective: "Learn to recognize and name numbers 1-10",
    },
    "math-1-2": {
      steps: [
        { id: "ls-1-2-1", type: "introduction", title: "Shape Seekers", content: "Today we'll learn about shapes", isInteractive: false },
        { id: "ls-1-2-2", type: "concept", title: "Basic Shapes", content: "A circle is round with no corners. A square has 4 equal sides.", isInteractive: false },
        { id: "ls-1-2-3", type: "example", title: "Find the Circle", content: "Which of these is a circle?", isInteractive: true },
        { id: "ls-1-2-4", type: "guided-practice", title: "Find Shapes", content: "Can you find a square in the room?", isInteractive: true },
        { id: "ls-1-2-5", type: "knowledge-check", title: "Shape Quiz", content: "Is this a triangle? Yes or No?", isInteractive: true },
      ],
      duration: 15,
      objective: "Identify and name basic 2D shapes",
    },
    // Upper Junior Mathematics
    "math-3-1": {
      steps: [
        { id: "ls-3-1-1", type: "introduction", title: "Addition Adventure", content: "Today we'll learn about addition", isInteractive: false },
        { id: "ls-3-1-2", type: "concept", title: "What is Addition?", content: "Addition means putting together two groups", isInteractive: false },
        { id: "ls-3-1-3", type: "example", title: "3 + 2", content: "3 objects + 2 objects = 5 objects total", isInteractive: true },
        { id: "ls-3-1-4", type: "guided-practice", title: "Add Together", content: "Let's add 2 + 3 together", isInteractive: true },
        { id: "ls-3-1-5", type: "knowledge-check", title: "Addition Quiz", content: "What is 2 + 3?", isInteractive: true },
      ],
      duration: 25,
      objective: "Understand addition as combining groups",
    },
    // English lessons
    "eng-1-1": {
      steps: [
        { id: "ls-1-1-1", type: "introduction", title: "Letter Friends", content: "Today we'll learn about alphabet letters", isInteractive: false },
        { id: "ls-1-1-2", type: "concept", title: "Letter Sounds", content: "Each letter makes a special sound", isInteractive: false },
        { id: "ls-1-1-3", type: "example", title: "The /b/ Sound", content: "B makes the /b/ sound as in ball", isInteractive: true },
        { id: "ls-1-1-4", type: "guided-practice", title: "Letter Sound Hunt", content: "Can you find things that start with /b/?", isInteractive: true },
        { id: "ls-1-1-5", type: "knowledge-check", title: "Letter Quiz", content: "What sound does letter A make?", isInteractive: true },
      ],
      duration: 20,
      objective: "Learn letter names and sounds",
    },
    // Default/placeholder for any topic
    default: {
      steps: [
        { id: "ls-intro-1", type: "introduction", title: "Lesson Introduction", content: "Welcome to this lesson!", isInteractive: false },
        { id: "ls-concept-1", type: "concept", title: "Key Concept", content: "Learn the main idea", isInteractive: false },
        { id: "ls-example-1", type: "example", title: "Example", content: "See an example of the concept", isInteractive: true },
        { id: "ls-practice-1", type: "guided-practice", title: "Guided Practice", content: "Try it with help", isInteractive: true },
        { id: "ls-check-1", type: "knowledge-check", title: "Knowledge Check", content: "Answer a question", isInteractive: true },
      ],
      duration: 20,
      objective: "Complete this lesson",
    },
  };

  const topicData = topicLessons[topicId];
  if (topicData) {
    return topicData.steps.map((step, i) => ({
      id: step.id,
      type: step.type,
      title: step.title,
      content: step.content,
      isInteractive: step.isInteractive,
      illustration: undefined,
    }));
  }

  // Fallback
  return [
    {
      id: "ls-1",
      type: "introduction",
      title: "Lesson",
      content: "Learning something new",
      isInteractive: false,
    },
  ];
}

/** Get learning objective for a lesson */
export function getLessonLearningObjective(lesson: JuniorLesson): string {
  return lesson.learningObjective;
}

// ============================================================
// ACTIVITY QUESTION DATA
// ============================================================

/** Question difficulty levels */
export type ActivityDifficulty = "easy" | "medium" | "hard";

/** Answer state */
export type ActivityAnswerState = "unanswered" | "correct" | "incorrect" | "pending";

/** Activity result */
export interface ActivityResult {
  activityId: string;
  score: number; // percentage 0-100
  correctAnswers: number;
  attemptedQuestions: number;
  allCorrect: boolean;
  timeSpentSeconds: number;
}

/** Reward configuration (centralized) */
export const JUNIOR_REWARD_CONFIG: {
  xpForActivity: number;
  xpForQuestComplete: number;
  xpForLessonComplete: number;
  coinsForActivity: number;
  coinsForQuestComplete: number;
  coinsForLessonComplete: number;
  starsForActivity: number;
  starsForQuestComplete: number;
  starsForLessonComplete: number;
} = {
  xpForActivity: 10,
  xpForQuestComplete: 50,
  xpForLessonComplete: 30,
  coinsForActivity: 5,
  coinsForQuestComplete: 25,
  coinsForLessonComplete: 15,
  starsForActivity: 1,
  starsForQuestComplete: 5,
  starsForLessonComplete: 3,
};

/** Calculate XP reward */
export function calculateXPReward(
  eventType: "activity" | "quest" | "lesson",
  configKey: keyof typeof JUNIOR_REWARD_CONFIG
): number {
  return JUNIOR_REWARD_CONFIG[configKey];
}

/** Calculate coin reward */
export function calculateCoinReward(
  eventType: "activity" | "quest" | "lesson",
  configKey: keyof typeof JUNIOR_REWARD_CONFIG
): number {
  return JUNIOR_REWARD_CONFIG[configKey];
}