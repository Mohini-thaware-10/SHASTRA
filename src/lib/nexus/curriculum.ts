/* NEXUS Curriculum Structure
 * Centralized curriculum data for SHATRA NEXUS (Classes 6-10)
 * Class-specific with age-appropriate difficulty progression
 * All data is deterministic mock data for frontend demonstration
 */

// NEXUS class type
export type NexusClass = "6" | "7" | "8" | "9" | "10";

// Age range per NEXUS class
export const NEXUS_CLASS_AGE: Record<NexusClass, { minAge: number; maxAge: number }> = {
  "6": { minAge: 11, maxAge: 12 },
  "7": { minAge: 12, maxAge: 13 },
  "8": { minAge: 13, maxAge: 14 },
  "9": { minAge: 14, maxAge: 15 },
  "10": { minAge: 15, maxAge: 16 },
};

// NEXUS subject display names
export const NEXUS_SUBJECT_DISPLAY = {
  mathematics: "Mathematics Realm",
  science: "Science Laboratory",
  language: "Language Library",
  social_studies: "Social Studies Archive",
};

// NEXUS theme colors
export const NEXUS_SUBJECT_COLORS = {
  mathematics: "#6c5ce7",
  science: "#00d8b6",
  language: "#a855f7",
  social_studies: "#f472b6",
};

// ============================================================
// CURRICULUM: Class-specific topic sequences
// ============================================================

/** Lower NEXUS (Classes 6-7) curriculum structure */
export const NEXUS_LOWER_CURRICULUM = {
  mathematics: [
    { id: "num-6-1", title: "Number Systems", description: "Integers, rational numbers, and real number properties", activityCount: 3 },
    { id: "num-6-2", title: "Integers", description: "Operations with positive and negative whole numbers", activityCount: 3 },
    { id: "num-6-3", title: "Fractions and Decimals", description: "Operations with fractions and decimal conversions", activityCount: 3 },
    { id: "alg-6-1", title: "Algebra", description: "Variables, expressions, and simple equations", activityCount: 3 },
    { id: "geo-6-1", title: "Geometry", description: "Angles, lines, triangles, and quadrilaterals", activityCount: 3 },
    { id: "stat-6-1", title: "Statistics", description: "Mean, median, mode, and data representation", activityCount: 2 },
    { id: "prob-6-1", title: "Probability", description: "Basic probability theory and experimental probability", activityCount: 2 },
  ],
  science: [
    { id: "matter-6-1", title: "Matter", description: "Atoms, molecules, states of matter and chemical bonds", activityCount: 3 },
    { id: "organisms-6-1", title: "Living Organisms", description: "Cell structure, classification, and life processes", activityCount: 3 },
    { id: "force-6-1", title: "Force and Motion", description: "Newton's laws, velocity, acceleration and friction", activityCount: 3 },
    { id: "energy-6-1", title: "Energy", description: "Kinetic, potential, thermal and chemical energy forms", activityCount: 3 },
    { id: "light-6-1", title: "Light", description: "Reflection, refraction, lenses and the electromagnetic spectrum", activityCount: 2 },
    { id: "electricity-6-1", title: "Electricity", description: "Electric circuits, current, voltage, resistance and power", activityCount: 3 },
  ],
  language: [
    { id: "grammar-6-1", title: "Grammar", description: "Parts of speech, sentence structure and grammatical rules", activityCount: 3 },
    { id: "vocab-6-1", title: "Vocabulary", description: "Academic vocabulary, context clues and word families", activityCount: 3 },
    { id: "comprehension-6-1", title: "Reading Comprehension", description: "Informational texts, inference and analysis", activityCount: 3 },
    { id: "writing-6-1", title: "Writing", description: "Expository, persuasive and narrative writing styles", activityCount: 3 },
  ],
  social_studies: [
    { id: "history-6-1", title: "History", description: "Ancient civilizations, major events and historical analysis", activityCount: 3 },
    { id: "geography-6-1", title: "Geography", description: "Maps, regions, climate and human-environment interaction", activityCount: 3 },
    { id: "civics-6-1", title: "Civics", description: "Government structure, citizens' rights and responsibilities", activityCount: 2 },
    { id: "economics-6-1", title: "Economics", description: "Basic economic principles, resources and trade", activityCount: 2 },
  ],
};

/** Upper NEXUS (Classes 8-10) curriculum structure */
export const NEXUS_UPPER_CURRICULUM = {
  mathematics: [
    { id: "geo-8-1", title: "Geometry", description: "Angles, lines, triangles, quadrilaterals and circle theorems", activityCount: 4 },
    { id: "alg-8-1", title: "Algebra", description: "Linear equations, quadratic equations and functions", activityCount: 4 },
    { id: "geo-8-2", title: "Mensuration", description: "Area, perimeter, volume and surface area calculations", activityCount: 3 },
    { id: "stat-8-1", title: "Statistics", description: "Probability distributions, data analysis and interpretation", activityCount: 3 },
    { id: "prob-8-1", title: "Probability", description: "Compound probability, permutations and combinations", activityCount: 3 },
    { id: "num-10-1", title: "Number Systems", description: "Irrational numbers, real number system and advanced operations", activityCount: 3 },
    { id: "alg-10-1", title: "Advanced Algebra", description: "Polynomials, factoring, rational expressions and functions", activityCount: 4 },
  ],
  science: [
    { id: "matter-8-1", title: "Matter", description: "Atomic structure, chemical bonding and stoichiometry", activityCount: 4 },
    { id: "organisms-8-1", title: "Living Organisms", description: "Cell division, genetics and evolutionary theory", activityCount: 4 },
    { id: "force-8-1", title: "Force and Motion", description: "Advanced Newton's laws, circular motion and momentum", activityCount: 3 },
    { id: "energy-8-1", title: "Energy", description: "Work, power, energy conservation and thermodynamics", activityCount: 3 },
    { id: "light-8-1", title: "Light", description: "Wave optics, interference, diffraction and modern physics", activityCount: 3 },
    { id: "electricity-8-1", title: "Electricity", description: "Advanced circuits, magnetic fields and electromagnetic induction", activityCount: 3 },
    { id: "human-10-1", title: "Human Body", description: "Systems biology, homeostasis and physiological processes", activityCount: 4 },
    { id: "environment-10-1", title: "Environment", description: "Ecosystems, biodiversity and human impact on the environment", activityCount: 3 },
  ],
  language: [
    { id: "grammar-8-1", title: "Grammar", description: "Advanced grammatical structures, syntax and semantics", activityCount: 3 },
    { id: "vocab-8-1", title: "Vocabulary", description: "Academic and literary vocabulary, connotation and denotation", activityCount: 3 },
    { id: "comprehension-8-1", title: "Reading Comprehension", description: "Complex texts, critical analysis and synthesis", activityCount: 3 },
    { id: "writing-8-1", title: "Writing", description: "Rhetorical strategies, argumentation and research writing", activityCount: 3 },
  ],
  social_studies: [
    { id: "history-10-1", title: "History", description: "Modern history, world wars, Cold War and contemporary global issues", activityCount: 4 },
    { id: "geography-10-1", title: "Geography", description: "Population dynamics, urbanization, globalization and geopolitics", activityCount: 3 },
    { id: "civics-10-1", title: "Civics", description: "Constitutional law, civil rights and international relations", activityCount: 3 },
    { id: "economics-10-1", title: "Economics", description: "Macroeconomics, fiscal and monetary policy, global trade", activityCount: 3 },
  ],
};

/** Get curriculum for a specific NEXUS class and subject */
export function getNexusCurriculum(
  classNum: NexusClass,
  subject: keyof typeof NEXUS_LOWER_CURRICULUM
): readonly { id: string; title: string; description: string; activityCount: number }[] {
  const isUpperNexus = classNum >= 8;
  return isUpperNexus
    ? NEXUS_UPPER_CURRICULUM[subject]
    : NEXUS_LOWER_CURRICULUM[subject];
}

/** Get all subjects for a NEXUS class */
export function getNexusSubjectsForClass(classNum: NexusClass): readonly string[] {
  const isUpperNexus = classNum >= 8;
  return ["mathematics", "science", "language", "social_studies"];
}

/** Get NEXUS subject color */
export function getNexusSubjectColor(subject: string): string {
  return NEXUS_SUBJECT_COLORS[subject] || "#64748b";
}

/** Get NEXUS subject display name */
export function getNexusSubjectDisplay(subject: string): string {
  return NEXUS_SUBJECT_DISPLAY[subject] || subject;
}

// ============================================================
// LESSONS: Structured lesson data for NEXUS
// ============================================================

/** Lesson step types for NEXUS */
export type NexusLessonStepType =
  | "concept"
  | "detailed-explanation"
  | "real-world-application"
  | "worked-example"
  | "guided-problem-solving"
  | "independent-practice"
  | "knowledge-check"
  | "completion";

export interface NexusLessonStep {
  id: string;
  type: NexusLessonStepType;
  title: string;
  content: string;
  illustration?: string;
  isInteractive: boolean;
}

/** Complete NEXUS lesson structure */
export interface NexusLesson {
  id: string;
  title: string;
  subject: string;
  topicId: string;
  classRange: NexusClass[];
  steps: NexusLessonStep[];
  estimatedDurationMinutes: number;
  learningObjective: string;
  difficulty: "easy" | "medium" | "hard";
}

/** Get lessons for a NEXUS topic and class */
export function getLessonsForNexusTopic(
  topicId: string,
  classNum: NexusClass
): NexusLesson[] {
  const isUpperNexus = classNum >= 8;

  // Define lessons per topic for different class ranges
  const topicLessons: Record<string, { steps: NexusLessonStep[]; duration: number; objective: string; difficulty: "easy" | "medium" | "hard" }> = {
    "num-6-1": {
      steps: [
        { id: "ns-6-1-1", type: "concept", title: "Number Systems", content: "Learn about the different sets of numbers that make up the real number system", isInteractive: false },
        { id: "ns-6-1-2", type: "detailed-explanation", title: "Sets of Numbers", content: "Natural numbers, whole numbers, integers, rational numbers and irrational numbers each have distinct properties", isInteractive: false },
        { id: "ns-6-1-3", type: "real-world-application", title: "Real-World Application", content: "Understanding number systems helps in financial calculations, computer science and scientific measurements", isInteractive: true },
        { id: "ns-6-1-4", type: "worked-example", title: "Example: Classifying Numbers", content: "Classify: √16, -3, 0.75, π as rational or irrational", isInteractive: true },
        { id: "ns-6-1-5", type: "guided-problem-solving", title: "Guided Problem: Classify √7", content: "Step 1: Is 7 a perfect square? Step 2: Is √7 rational or irrational? Step 3: Final answer", isInteractive: true },
        { id: "ns-6-1-6", type: "independent-practice", title: "Independent Practice", content: "Classify the following: √2, 0.333..., -5, 22/7", isInteractive: true },
        { id: "ns-6-1-7", type: "knowledge-check", title: "Knowledge Check", content: "Which of the following is irrational: 0.121212..., √9, 22/7?", isInteractive: true },
      ],
      duration: 40,
      objective: "Understand the real number system and classify numbers",
      difficulty: "easy",
    },
    "num-6-2": {
      steps: [
        { id: "i-6-1-1", type: "concept", title: "Integers", content: "Integers include positive whole numbers, negative whole numbers and zero", isInteractive: false },
        { id: "i-6-1-2", type: "detailed-explanation", title: "Operations with Integers", content: "Addition and subtraction follow rules based on sign combination; multiplication and division follow sign rules", isInteractive: false },
        { id: "i-6-1-3", type: "real-world-application", title: "Real-World Application", content: "Temperature changes, financial credits/debits and elevation levels all use integers", isInteractive: true },
        { id: "i-6-1-4", type: "worked-example", title: "Example: -3 + 7", content: "Start at -3, move 7 units right → result is 4", isInteractive: true },
        { id: "i-6-1-5", type: "guided-problem-solving", title: "Guided Problem: 8 + (-5)", content: "Step 1: Start at 8, move 5 units left → Step 2: Result is 3", isInteractive: true },
        { id: "i-6-1-6", type: "independent-practice", title: "Independent Practice", content: "Solve: -4 + 6, 3 + (-7), -5 + (-5)", isInteractive: true },
        { id: "i-6-1-7", type: "knowledge-check", title: "Knowledge Check", content: "What is the rule for adding two integers with different signs?", isInteractive: true },
      ],
      duration: 35,
      objective: "Master operations with positive and negative integers",
      difficulty: "easy",
    },
    "alg-8-1": {
      steps: [
        { id: "al-8-1-1", type: "concept", title: "Linear Equations", content: "An equation that makes a straight line when graphed; ax + b = c", isInteractive: false },
        { id: "al-8-1-2", type: "detailed-explanation", title: "Solving Linear Equations", content: "Use inverse operations to isolate the variable; maintain balance on both sides", isInteractive: false },
        { id: "al-8-1-3", type: "real-world-application", title: "Real-World Application", content: "Linear equations model constant-rate problems, budgeting and motion at constant speed", isInteractive: true },
        { id: "al-8-1-4", type: "worked-example", title: "Example: 3x + 5 = 20", content: "Subtract 5: 3x = 15; Divide by 3: x = 5", isInteractive: true },
        { id: "al-8-1-5", type: "guided-problem-solving", title: "Guided Problem: 2x - 7 = 9", content: "Step 1: Add 7: 2x = 16; Step 2: Divide by 2: x = 8", isInteractive: true },
        { id: "al-8-1-6", type: "independent-practice", title: "Independent Practice", content: "Solve: 4x + 3 = 19, 3x - 5 = 10, -2x + 4 = 14", isInteractive: true },
        { id: "al-8-1-7", type: "knowledge-check", title: "Knowledge Check", content: "What is the first step in solving 3x + 5 = 20?", isInteractive: true },
      ],
      duration: 45,
      objective: "Solve linear equations in one variable",
      difficulty: "medium",
    },
    "matter-6-1": {
      steps: [
        { id: "matt-6-1-1", type: "concept", title: "Matter", content: "Learn about atoms, molecules and the states of matter", isInteractive: false },
        { id: "matt-6-1-2", type: "detailed-explanation", title: "Atomic Structure", content: "Atoms consist of protons, neutrons and electrons; the nucleus is positively charged", isInteractive: false },
        { id: "matt-6-1-3", type: "real-world-application", title: "Real-World Application", content: "Understanding matter helps in chemistry, materials science and pharmaceutical research", isInteractive: true },
        { id: "matt-6-1-4", type: "worked-example", title: "Example: Identify the state: H₂O at room temperature is liquid", content: "", isInteractive: true },
        { id: "matt-6-1-5", type: "guided-problem-solving", title: "Guided Problem: Classify CO₂", content: "Step 1: Is CO₂ a gas at room temperature? Step 2: Yes → It's a gaseous matter", isInteractive: true },
        { id: "matt-6-1-6", type: "independent-practice", title: "Independent Practice", content: "Classify: O₂, H₂O (liquid), NaCl (solid), dry ice", isInteractive: true },
        { id: "matt-6-1-7", type: "knowledge-check", title: "Knowledge Check", content: "Which subatomic particle has a negative charge?", isInteractive: true },
      ],
      duration: 40,
      objective: "Understand the classification of matter and atomic structure",
      difficulty: "easy",
    },
    "force-6-1": {
      steps: [
        { id: "force-6-1-1", type: "concept", title: "Force and Motion", content: "Learn about Newton's laws and how forces affect motion", isInteractive: false },
        { id: "force-6-1-2", type: "detailed-explanation", title: "Newton's First Law", content: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by a net force", isInteractive: false },
        { id: "force-6-1-3", type: "real-world-application", title: "Real-World Application", content: "Car brakes, seatbelts and sports all rely on understanding force and motion", isInteractive: true },
        { id: "force-6-1-4", type: "worked-example", title: "Example: Calculate net force: F₁ = 5N right, F₂ = 3N left → net force = 2N right", content: "", isInteractive: true },
        { id: "force-6-1-5", type: "guided-problem-solving", title: "Guided Problem: What is the acceleration?", content: "Step 1: Use F = ma; Step 2: a = F/m; Step 3: With F = 2N and m = 1kg, a = 2 m/s²", isInteractive: true },
        { id: "force-6-1-6", type: "independent-practice", title: "Independent Practice", content: "Calculate: F = 10N, m = 2kg → a = ?; F = 5N, m = 5kg → a = ?", isInteractive: true },
        { id: "force-6-1-7", type: "knowledge-check", title: "Knowledge Check", content: "What does Newton's First Law describe?", isInteractive: true },
      ],
      duration: 35,
      objective: "Understand Newton's laws and how forces affect motion",
      difficulty: "easy",
    },
    "stat-6-1": {
      steps: [
        { id: "stat-6-1-1", type: "concept", title: "Statistics", content: "Learn about mean, median, mode and data representation", isInteractive: false },
        { id: "stat-6-1-2", type: "detailed-explanation", title: "Mean, Median, Mode", content: "Mean is the average; median is the middle value; mode is the most frequent value", isInteractive: false },
        { id: "stat-6-1-3", type: "real-world-application", title: "Real-World Application", content: "Understanding statistics helps in research, business analysis and sports analytics", isInteractive: true },
        { id: "stat-6-1-4", type: "worked-example", title: "Example: Find the mean of {2, 4, 6, 8}", content: "Sum = 20, Count = 4, Mean = 20/4 = 5", isInteractive: true },
        { id: "stat-6-1-5", type: "guided-problem-solving", title: "Guided Problem: Find the median of {3, 7, 9}", content: "Step 1: Order the values: 3, 7, 9; Step 2: The middle value is 7", isInteractive: true },
        { id: "stat-6-1-6", type: "independent-practice", title: "Independent Practice", content: "Find the median of {5, 1, 9} and the mode of {2, 2, 3, 4}", isInteractive: true },
        { id: "stat-6-1-7", type: "knowledge-check", title: "Knowledge Check", content: "What is the difference between mean and median?", isInteractive: true },
      ],
      duration: 30,
      objective: "Understand mean, median and mode for data analysis",
      difficulty: "easy",
    },
    "prob-6-1": {
      steps: [
        { id: "prob-6-1-1", type: "concept", title: "Probability", content: "Learn about basic probability theory and experimental probability", isInteractive: false },
        { id: "prob-6-1-2", type: "detailed-explanation", title: "Theoretical vs Experimental Probability", content: "Theoretical probability is based on possible outcomes; experimental probability is based on actual results", isInteractive: false },
        { id: "prob-6-1-3", type: "real-world-application", title: "Real-World Application", content: "Understanding probability helps in risk assessment, games of chance and scientific experiments", isInteractive: true },
        { id: "prob-6-1-4", type: "worked-example", title: "Example: Probability of rolling a 6 on a fair die", content: "1 favorable outcome / 6 possible outcomes = 1/6", isInteractive: true },
        { id: "prob-6-1-5", type: "guided-problem-solving", title: "Guided Problem: Probability of heads in 3 coin flips", content: "Step 1: Total outcomes = 2³ = 8; Step 2: Favorable outcomes for exactly 2 heads = 3 (HHT, HTH, THH)", isInteractive: true },
        { id: "prob-6-1-6", type: "independent-practice", title: "Independent Practice", content: "Calculate: Probability of getting exactly 2 heads in 4 coin flips", isInteractive: true },
        { id: "prob-6-1-7", type: "knowledge-check", title: "Knowledge Check", content: "What is the probability of a single coin flip landing on heads?", isInteractive: true },
      ],
      duration: 30,
      objective: "Understand basic probability theory and experimental probability",
      difficulty: "easy",
    },
    "alg-10-1": {
      steps: [
        { id: "al-10-1-1", type: "concept", title: "Advanced Algebra", content: "Polynomials, factoring, rational expressions and functions", isInteractive: false },
        { id: "al-10-1-2", type: "detailed-explanation", title: "Polynomial Operations", content: "Addition, subtraction, multiplication and division of polynomial expressions", isInteractive: false },
        { id: "al-10-1-3", type: "real-world-application", title: "Real-World Application", content: "Advanced algebra models projectile motion, optimization and economic modeling", isInteractive: true },
        { id: "al-10-1-4", type: "worked-example", title: "Example: Factor x² - 5x + 6", content: "Find two numbers that multiply to 6 and add to -5: (x - 2)(x - 3)", isInteractive: true },
        { id: "al-10-1-5", type: "guided-problem-solving", title: "Guided Problem: Factor x² + 3x - 10", content: "Step 1: Find two numbers that multiply to -10 and add to 3: 5 and -2; Step 2: (x + 5)(x - 2)", isInteractive: true },
        { id: "al-10-1-6", type: "independent-practice", title: "Independent Practice", content: "Factor: x² - 4, x² + 7x + 12, x² - 9x + 18", isInteractive: true },
        { id: "al-10-1-7", type: "knowledge-check", title: "Knowledge Check", content: "What is the factored form of x² - 9?", isInteractive: true },
      ],
      duration: 50,
      objective: "Master polynomial operations and factoring techniques",
      difficulty: "hard",
    },
    "human-10-1": {
      steps: [
        { id: "hum-10-1-1", type: "concept", title: "Human Body", content: "Learn about organ systems and their functions", isInteractive: false },
        { id: "hum-10-1-2", type: "detailed-explanation", title: "Circulatory System", content: "Heart, blood vessels and blood transport nutrients and oxygen throughout the body", isInteractive: false },
        { id: "hum-10-1-3", type: "real-world-application", title: "Real-World Application", content: "Understanding health, exercise and lifestyle impacts on cardiovascular function", isInteractive: true },
        { id: "hum-10-1-4", type: "worked-example", title: "Example: Calculate resting heart rate given beats per minute", content: "Rate = total beats / minutes; normal range 60-100 bpm", isInteractive: true },
        { id: "hum-10-1-5", type: "guided-problem-solving", title: "Guided Problem: Blood flow through the heart", content: "Step 1: Deoxygenated blood enters right atrium; Step 2: Flows to right ventricle; Step 3: Pulmonary circulation", isInteractive: true },
        { id: "hum-10-1-6", type: "independent-practice", title: "Independent Practice", content: "Describe the pathway of blood through the pulmonary and systemic circuits", isInteractive: true },
        { id: "hum-10-1-7", type: "knowledge-check", title: "Knowledge Check", content: "Which chamber of the heart pumps blood to the rest of the body?", isInteractive: true },
      ],
      duration: 45,
      objective: "Understand the human body's organ systems and their functions",
      difficulty: "medium",
    },
    "environment-10-1": {
      steps: [
        { id: "env-10-1-1", type: "concept", title: "Environment", content: "Learn about ecosystems, biodiversity and human impact", isInteractive: false },
        { id: "env-10-1-2", type: "detailed-explanation", title: "Ecosystem Balance", content: "Food webs, energy flow and nutrient cycling maintain ecosystem stability", isInteractive: false },
        { id: "env-10-1-3", type: "real-world-application", title: "Real-World Application", content: "Understanding human impact helps in conservation and sustainable living practices", isInteractive: true },
        { id: "env-10-1-4", type: "worked-example", title: "Example: Calculate carbon footprint given travel distance", content: "Footprint = distance × emission factor; compare transport modes", isInteractive: true },
        { id: "env-10-1-5", type: "guided-problem-solving", title: "Guided Problem: Reduce plastic waste", content: "Step 1: Identify single-use plastics; Step 2: Find alternatives; Step 3: Implement reduction plan", isInteractive: true },
        { id: "env-10-1-6", type: "independent-practice", title: "Independent Practice", content: "Create a personal sustainability pledge with 3 specific actions", isInteractive: true },
        { id: "env-10-1-7", type: "knowledge-check", title: "Knowledge Check", content: "What is biodiversity and why is it important?", isInteractive: true },
      ],
      duration: 40,
      objective: "Understand ecosystems, biodiversity and human impact on the environment",
      difficulty: "medium",
    },
    default: {
      steps: [
        { id: "ls-1", type: "concept", title: "Concept", content: "Learn the key concept", isInteractive: false },
        { id: "ls-2", type: "example", title: "Example", content: "See an example of the concept", isInteractive: true },
      ],
      duration: 30,
      objective: "Complete this lesson",
      difficulty: "medium",
    },
  };

  const topicData = topicLessons[topicId];
  if (topicData) {
    return {
      id: topicData.steps[0]?.id || "ls-1",
      type: topicData.steps[0]?.type || "concept",
      title: topicData.steps[0]?.title || "Lesson",
      content: topicData.steps[0]?.content || "Learn the key concept",
      isInteractive: topicData.steps[0]?.isInteractive !== undefined ? topicData.steps[0].isInteractive : false,
    };
  }

  // Absolute fallback
  return {
    id: "ls-1",
    type: "concept",
    title: "Lesson",
    content: "Learn the key concept",
    isInteractive: false,
  };
}

/** Get learning objective for a NEXUS lesson */
export function getNexusLessonLearningObjective(lesson: NexusLesson): string {
  return lesson.learningObjective;
}

/** Get difficulty color string */
export function getDifficultyColor(difficulty: "easy" | "medium" | "hard"): string {
  switch (difficulty) {
    case "easy": return "#10b981";
    case "medium": return "#f59e0b";
    case "hard": return "#ef4444";
  }
  return "#64748b";
}

/* ============================================================
 * ADAPTIVE DIFFICULTY PROTOTYPE
 * ============================================================ */

/** Difficulty adjustment recommendations */
export type DifficultyAdjustment = "decrease" | "keep" | "increase";

/** Assess current performance and recommend difficulty adjustment */
export function assessDifficulty(
  recentAccuracy: number,
  attemptCount: number,
  topicPerformance: {
    correct: number;
    total: number;
    trend: "improving" | "stable" | "declining";
  },
  incorrectPatterns: Array<{
    type: "calculation" | "concept" | "misread" | "careless";
    frequency: "rare" | "occasional" | "frequent";
  }>
): DifficultyAdjustment {
  let score = 0;

  // Recent accuracy contribution (0-40 points)
  score += Math.min(recentAccuracy, 40);

  // Attempt count contribution (0-20 points)
  // More attempts on struggling topics suggest keeping or decreasing difficulty
  if (attemptCount >= 10) score -= 10;
  else if (attemptCount >= 5) score -= 5;

  // Topic performance trend contribution (-20 to +20 points)
  if (topicPerformance.trend === "improving") score += 20;
  else if (topicPerformance.trend === "declining") score -= 20;

  // Incorrect pattern contribution (-10 to +10 points)
  const frequentPatternCount = incorrectPatterns.filter(
    (p) => p.frequency === "frequent"
  ).length;
  score -= frequentPatternCount * 5;

  // Determine adjustment
  if (score >= 30) return "increase";
  if (score <= -30) return "decrease";
  return "keep";
}

/** Get difficulty color label for display */
export function getDifficultyColorLabel(difficulty: "easy" | "medium" | "hard"): string {
  switch (difficulty) {
    case "easy": return "Green";
    case "medium": return "Amber";
    case "hard": return "Red";
  }
  return "Gray";
}

/** Initialize adaptive difficulty state for a NEXUS topic */
export function initializeAdaptiveState(
  classNum: NexusClass,
  subject: string,
  topicId: string
) {
  return {
    recentAccuracy: 0.75,
    attemptCount: 0,
    topicPerformance: {
      correct: 0,
      total: 0,
      trend: "stable",
    },
    incorrectPatterns: [],
    lastUpdated: new Date().toISOString(),
  };
}

/** Update adaptive state based on performance */
export function updateAdaptiveState(
  currentState: ReturnType<typeof initializeAdaptiveState>,
  correct: boolean,
  mistakeType?: "calculation" | "concept" | "misread" | "careless"
) {
  const updatedAccuracy =
    (currentState.recentAccuracy * 0.8 + (correct ? 1 : 0) * 0.2);

  const updatedAttemptCount = currentState.attemptCount + 1;
  const updatedCorrect = currentState.topicPerformance.correct + (correct ? 1 : 0);
  const updatedTotal = currentState.topicPerformance.total + 1;
  const newAccuracy = updatedCorrect / updatedTotal;

  // Determine trend
  let trend: "improving" | "stable" | "declining" = "stable";
  if (newAccuracy > currentState.recentAccuracy * 0.95 && correct) {
    trend = "improving";
  } else if (newAccuracy < currentState.recentAccuracy * 0.95) {
    trend = "declining";
  }

  // Update incorrect patterns
  let updatedPatterns = [...currentState.incorrectPatterns];
  if (!correct && mistakeType) {
    const existingIndex = updatedPatterns.findIndex(
      (p) => p.type === mistakeType
    );
    if (existingIndex >= 0) {
      updatedPatterns[existingIndex].frequency =
        updateFrequencyLabel(updatedPatterns[existingIndex].frequency);
    } else {
      updatedPatterns.push({
        type: mistakeType,
        frequency: "rare",
      });
    }
  }

  return {
    recentAccuracy: updatedAccuracy,
    attemptCount: updatedAttemptCount,
    topicPerformance: {
      correct: updatedCorrect,
      total: updatedTotal,
      trend,
    },
    incorrectPatterns: updatedPatterns,
    lastUpdated: new Date().toISOString(),
  };
}

/** Update frequency label */
function updateFrequencyLabel(current: "rare" | "occasional" | "frequent"): "rare" | "occasional" | "frequent" {
  const order: ("rare" | "occasional" | "frequent")[] = ["rare", "occasional", "frequent"];
  const currentIndex = order.indexOf(current);
  if (currentIndex >= 0 && currentIndex < order.length - 1) {
    return order[currentIndex + 1];
  }
  return current;
}

/** Get recommended difficulty based on adaptive state */
export function getRecommendedDifficulty(
  adaptiveState: ReturnType<typeof initializeAdaptiveState>
): "easy" | "medium" | "hard" {
  const accuracyThreshold = 0.8;
  const highAttemptThreshold = 8;

  if (
    adaptiveState.recentAccuracy >= accuracyThreshold &&
    adaptiveState.attemptCount < highAttemptThreshold
  ) {
    return "hard";
  }
  if (adaptiveState.recentAccuracy >= 0.6 && adaptiveState.attemptCount < highAttemptThreshold) {
    return "medium";
  }
  return "easy";
}