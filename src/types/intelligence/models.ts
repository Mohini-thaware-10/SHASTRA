export type UniverseId = "junior" | "nexus" | "ascend";

export type Stream = "science" | "commerce" | "arts" | "general";

export interface AcademicClass {
  value: string;
  label: string;
  universe: UniverseId;
  ageRange: "6-11" | "11-16" | "16-18";
}

export interface LearnerContext {
  studentId: string;
  academicClass: AcademicClass;
  board: "CBSE" | "ICSE" | "State Board" | "IB" | "Other";
  learningUniverse: UniverseId;
  stream: Stream;
  selectedSubjects: readonly string[];
  languagePreference: string;
  currentTopic: string | null;
  previousActivities: readonly LearningEvent[];
  assessmentResults: AssessmentSummary | null;
  topicMastery: TopicMastery;
  learningPreferences: LearningPreferences;
}

export interface LearningPreferences {
  difficultyPreference: "easy" | "medium" | "hard";
  stylePreference: "reading" | "visual" | "interactive" | "mixed";
  pacePreference: "self-paced" | "guided" | "accelerated";
}

export interface TopicMastery {
  [subject: string]: TopicStatus;
}

export type TopicStatus = 
  | "strong"
  | "developing" 
  | "needs-more-practice"
  | "insufficient-evidence";

export interface AssessmentSummary {
  score: number;
  total: number;
  percentage: number;
  subjects: Record<string, number>;
  date: string;
}

export interface KnowledgeGapEvidence {
  type: "incorrect-answer" | "repeated-attempts" | "low-assessment" | "incomplete-lesson" | "no-recent-practice" | "previous-success";
  subject: string;
  topic: string;
  description: string;
  severity: "low" | "medium" | "high";
}

export interface KnowledgeGap {
  id: string;
  subject: string;
  topic: string;
  evidence: KnowledgeGapEvidence[];
  recommendedAction: string;
  priority: "low" | "medium" | "high";
  status: "identified" | "in-progress" | "resolved";
}

export interface AdaptiveRecommendation {
  id: string;
  action: string;
  subject: string;
  topic: string;
  reason: string;
  evidence: string[];
  suggestedTime: number; // minutes
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
}

export interface TutorMessage {
  id: string;
  type: "concept" | "solution" | "hint" | "practice" | "summary" | "recommendation";
  content: string;
  language: string;
  classAppropriate: boolean;
  universeAppropriate: boolean;
  supportsSteps: boolean;
}

export interface TutorSession {
  id: string;
  studentId: string;
  startedAt: string;
  lastInteraction: string;
  status: "active" | "paused" | "completed";
  topic: string;
  subject: string;
  universe: UniverseId;
  classLevel: string;
  messages: readonly TutorMessage[];
  summary: string | null;
}

export interface PracticeQuestion {
  id: string;
  subject: string;
  topic: string;
  questionType: "mcq" | "true-false" | "fill-blanks" | "short-answer" | "numerical" | "match-pairs";
  questionText: string;
  options?: readonly { id: string; text: string }[];
  correctAnswers: readonly string[];
  explanation: string;
  hints?: readonly string[];
  estimatedDuration: number;
}

export interface PracticeAttempt {
  id: string;
  questionId: string;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  submittedAt: string;
  timeSpentSeconds: number;
  feedback: string | null;
}

export interface LearningEvent {
  id: string;
  type: "lesson-started" | "lesson-completed" | "quiz-attempted" | "answer-submitted" | "hint-requested" | "topic-revised" | "tutor-interaction" | "quest-completed" | "assessment-completed";
  studentId: string;
  timestamp: string;
  topic?: string;
  subject?: string;
  details?: string;
}

export interface TutorResponseProvider {
  getConceptExplanation: (topic: string, classLevel: string, universe: UniverseId) => Promise<TutorMessage | null>;
  getStepByStepSolution: (problem: string, classLevel: string, universe: UniverseId) => Promise<TutorMessage | null>;
  getHint: (questionId: string, classLevel: string, universe: UniverseId) => Promise<TutorMessage | null>;
  getPracticeQuestion: (params: {subject: string; topic: string; classLevel: string; universe: UniverseId; difficulty: string; count: number}) => Promise<PracticeQuestion[] | null>;
  getRecommendations: (context: LearnerContext) => Promise<AdaptiveRecommendation[] | null>;
  getSessionSummary: (sessionId: string) => Promise<string | null>;
}

export interface MockTutorResponseProvider implements TutorResponseProvider {
  getConceptExplanation: (topic: string, classLevel: string, universe: UniverseId) => TutorMessage;
  getStepByStepSolution: (problem: string, classLevel: string, universe: UniverseId) => TutorMessage;
  getHint: (questionId: string, classLevel: string, universe: UniverseId) => TutorMessage;
  getPracticeQuestion: (params: {subject: string; topic: string; classLevel: string; universe: UniverseId; difficulty: string; count: number}) => PracticeQuestion[];
  getRecommendations: (context: LearnerContext) => AdaptiveRecommendation[];
  getSessionSummary: (sessionId: string) => string;
}