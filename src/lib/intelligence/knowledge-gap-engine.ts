import type {
  LearnerContext,
  KnowledgeGap,
  KnowledgeGapEvidence,
  TopicMastery,
  TopicStatus,
  AcademicClass,
  Stream,
} from "@/types/intelligence/models";

/** 
 * Knowledge Gap Engine — Deterministic prototype.
 * Identifies topics needing additional practice based on learner evidence.
 * 
 * Rules are configurable thresholds — not AI/ML predictions.
 * Evidence is sourced from prototype assessment and activity data.
 */

/** Determines topic status based on mastery data */
function determineTopicStatus(
  mastery: TopicStatus | undefined,
  incorrectAnswers: number,
  totalAttempts: number,
  recentPracticeDays: number,
  assessmentPercentage: number | null
): TopicStatus {
  if (!mastery) return "insufficient-evidence";

  // If already marked as "strong", keep it
  if (mastery === "strong") return "strong";

  // Insufficient evidence check
  if (recentPracticeDays === 0 && incorrectAnswers === 0 && totalAttempts === 0) {
    return "insufficient-evidence";
  }

  // Calculate accuracy
  const accuracy = totalAttempts > 0 ? (incorrectAnswers / totalAttempts) * 100 : 0;
  const correctPercentage = 100 - accuracy;

  // Strong understanding: high accuracy + recent practice
  if (correctPercentage >= 80 && recentPracticeDays >= 3) {
    return "strong";
  }

  // Developing: moderate accuracy or some practice
  if (correctPercentage >= 50 && recentPracticeDays >= 1) {
    return "developing";
  }

  // Needs more practice: low accuracy or no recent practice
  if (correctPercentage < 50 || recentPracticeDays === 0) {
    return "needs-more-practice";
  }

  // Fallback
  return "insufficient-evidence";
}

/** Identifies knowledge gaps from learner context */
export function identifyKnowledgeGaps(
  context: LearnerContext
): KnowledgeGap[] {
  const gaps: KnowledgeGap[] = [];
  const { assessmentResults, topicMastery, previousActivities } = context;

  // 1. Assessment-based gaps
  if (assessmentResults && assessmentResults.percentage < 50) {
    const weakSubjects = Object.entries(assessmentResults.subjects).filter(
      ([, p]) => p < 60
    );
    for (const [subject, percentage] of weakSubjects) {
      gaps.push({
        id: `gap-assessment-${subject}`,
        subject,
        topic: "General Areas",
        evidence: [{
          type: "low-assessment",
          subject,
          topic: "General Areas",
          description: `Assessment score of ${percentage}% indicates areas needing revision`,
          severity: "high"
        }],
        recommendedAction: `Review ${subject} fundamentals and attempt guided practice`,
        priority: "high",
        status: "identified"
      });
    }
  }

  // 2. Topic mastery-based gaps
  for (const [subject, mastery] of Object.entries(topicMastery)) {
    if (mastery !== "strong") {
      const evidence: KnowledgeGapEvidence[] = [];
      
      // Check for incorrect answers in activities
      const relevantActivities = previousActivities.filter(
        (a) => a.subject === subject && a.type === "quiz-attempted"
      );
      const incorrectCount = relevantActivities.filter(
        (a) => a.details?.includes("incorrect") || a.details?.includes("wrong")
      ).length;

      if (incorrectCount > 0) {
        evidence.push({
          type: "incorrect-answer",
          subject,
          topic: "Quiz attempts",
          description: `${incorrectCount} incorrect answers in recent quiz attempts`,
          severity: incorrectCount >= 3 ? "high" : "medium"
        });
      }

      // Check for no recent practice
      const lastPractice = previousActivities
        .filter((a) => a.subject === subject && a.type === "lesson-completed")
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      const recentPracticeDays = lastPractice.length > 0 
        ? Math.floor((new Date().getTime() - new Date(lastPractice[0].timestamp).getTime()) / (1000 * 60 * 60 * 24))
        : 0;

      if (recentPracticeDays > 14) {
        evidence.push({
          type: "no-recent-practice",
          subject,
          topic: "Lesson practice",
          description: `No practice in over ${recentPracticeDays} days`,
          severity: "medium"
        });
      }

      if (evidence.length > 0) {
        gaps.push({
          id: `gap-mastery-${subject}`,
          subject,
          topic: "Topic areas",
          evidence,
          recommendedAction: `Review ${subject} concepts and attempt guided practice`,
          priority: evidence.some((e) => e.severity === "high") ? "high" : "medium",
          status: "identified"
        });
      }
    }
  }

  // 3. No-recent-practice gaps for topics with no activity
  const allSubjects = ["Mathematics", "Science", "Languages", "Social Studies", "Physics", "Chemistry", "Mathematics", "Accountancy", "Business Studies", "Economics", "History", "Political Science", "Literature"];
  for (const subject of allSubjects) {
    if (!topicMastery[subject]) {
      const existingGap = gaps.find((g) => g.subject === subject);
      if (!existingGap) {
        gaps.push({
          id: `gap-no-activity-${subject}`,
          subject,
          topic: "Topic exploration",
          evidence: [{
            type: "no-recent-practice",
            subject,
            topic: "Topic exploration",
            description: "No practice recorded for this topic",
            severity: "medium"
          }],
          recommendedAction: `Start with an introductory lesson on ${subject}`,
          priority: "low",
          status: "identified"
        });
      }
    }
  }

  return gaps;
}

/** Creates a configurable evidence-based knowledge gap */
export function createKnowledgeGap(
  context: LearnerContext,
  subject: string,
  topic: string,
  evidence: KnowledgeGapEvidence[],
  priority: "low" | "medium" | "high"
): KnowledgeGap {
  return {
    id: `gap-${context.studentId}-${subject}-${topic}`,
    subject,
    topic,
    evidence,
    recommendedAction: `Review ${subject} ${topic} concepts and attempt guided practice`,
    priority,
    status: "identified"
  };
}

/** Gets the topic status for display */
export function getTopicDisplayStatus(status: TopicStatus): {
  label: string;
  color: string;
  description: string;
} {
  const map: Record<TopicStatus, { label: string; color: string; description: string }> = {
    strong: { label: "Strong understanding", color: "#10b981", description: "Concepts mastered with confidence" },
    developing: { label: "Developing understanding", color: "#f59e0b", description: "Building confidence with guided practice" },
    "needs-more-practice": { label: "Needs more practice", color: "#ef4444", description: "Additional practice recommended" },
    "insufficient-evidence": { label: "Insufficient evidence", color: "#6b7280", description: "Not enough data to assess" }
  };
  return map[status] || map["insufficient-evidence"];
}

/** Gets priority label and color */
export function getPriorityDisplay(priority: "low" | "medium" | "high") {
  return {
    low: { label: "Low", color: "#10b981" },
    medium: { label: "Medium", color: "#f59e0b" },
    high: { label: "High", color: "#ef4444" }
  }[priority] || { label: "Low", color: "#10b981" };
}

/** Creates a deterministic recommendation from a knowledge gap */
export function createRecommendationFromGap(
  gap: KnowledgeGap
): AdaptiveRecommendation {
  return {
    id: `rec-${gap.id}`,
    action: gap.recommendedAction,
    subject: gap.subject,
    topic: gap.topic,
    reason: `Evidence: ${gap.evidence.map((e) => e.description).join(". ")}`,
    evidence: gap.evidence.map((e) => e.description),
    suggestedTime: priorityToMinutes(gap.priority),
    priority: gap.priority,
    status: gap.status
  };
}

function priorityToMinutes(priority: "low" | "medium" | "high"): number {
  return { low: 10, medium: 20, high: 30 }[priority] || 10;
}

/** Gets recommendations from learner context */
export function getRecommendationsFromContext(
  context: LearnerContext
): AdaptiveRecommendation[] {
  const gaps = identifyKnowledgeGaps(context);
  return gaps.map(createRecommendationFromGap);
}

/** Gets topic mastery display for a specific subject */
export function getSubjectTopicStatus(
  subject: string,
  mastery: TopicStatus | undefined
) {
  return mastery ? getTopicDisplayStatus(mastery) : {
    label: "No data",
    color: "#6b7280",
    description: "No mastery data recorded"
  };
}