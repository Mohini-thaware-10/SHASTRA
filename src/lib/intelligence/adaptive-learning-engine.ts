import type {
  LearnerContext,
  AdaptiveRecommendation,
  KnowledgeGap,
  TopicMastery,
} from "@/types/intelligence/models";

/**
 * Adaptive Learning Engine — Deterministic prototype.
 * Generates suggested next actions based on learner context.
 * 
 * Rules are transparent and configurable — not black-box ML.
 */

/** Generates adaptive recommendations from learner context */
export function generateAdaptiveRecommendations(
  context: LearnerContext
): AdaptiveRecommendation[] {
  const recommendations: AdaptiveRecommendation[] = [];

  // 1. Knowledge gap-based recommendations
  const gaps = identifyKnowledgeGaps(context);
  for (const gap of gaps.slice(0, 3)) { // Limit to top 3
    recommendations.push(createRecommendationFromGap(gap));
  }

  // 2. Topic mastery-based recommendations
  const { topicMastery } = context;
  for (const [subject, mastery] of Object.entries(topicMastery)) {
    if (mastery === "developing" || mastery === "needs-more-practice") {
      recommendations.push({
        id: `rec-mastery-${subject}`,
        action: `Revise ${subject} concepts`,
        subject,
        topic: "Topic review",
        reason: `Current mastery status: ${mastery}`,
        evidence: [`Current topic mastery is ${mastery}`],
        suggestedTime: 20,
        priority: "medium",
        status: "pending"
      });
    }
  }

  // 3. Learning streak/activity-based recommendations
  const { learningPreferences } = context;
  if (learningPreferences) {
    if (learningPreferences.pacePreference === "self-paced") {
      recommendations.push({
        id: `rec-pace-1`,
        action: `Progress at your own pace`,
        subject: "General",
        topic: "Self-paced learning",
        reason: "Your preference is set to self-paced progression",
        evidence: `Pace preference: ${learningPreferences.pacePreference}`,
        suggestedTime: 15,
        priority: "low",
        status: "pending"
      });
    }
    if (learningPreferences.stylePreference === "interactive") {
      recommendations.push({
        id: `rec-style-1`,
        action: `Try interactive practice`,
        subject: "General",
        topic: "Interactive exercises",
        reason: "Your preference is for interactive learning",
        evidence: `Style preference: ${learningPreferences.stylePreference}`,
        suggestedTime: 25,
        priority: "medium",
        status: "pending"
      });
    }
  }

  // 3. Recent activity-based recommendations
  const { previousActivities } = context;
  if (previousActivities) {
    const recentQuizzes = previousActivities
      .filter((a) => a.type === "quiz-attempted")
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 2);

    for (const quiz of recentQuizzes) {
      const score = quiz.details ? extractScoreFromDetails(quiz.details) : null;
      if (score && score < 70) {
        recommendations.push({
          id: `rec-quiz-${quiz.id}`,
          action: `Reattempt quiz on ${quiz.topic || "recent topic"}`,
          subject: quiz.subject || "General",
          topic: quiz.topic || "Recent topic",
          reason: `Previous quiz score was ${score}% — targeted practice recommended`,
          evidence: [`Previous score: ${score}%`],
          suggestedTime: 20,
          priority: "high",
          status: "pending"
        });
      }
    }
  }

  // Deduplicate recommendations by ID
  const seen = new Set<string>();
  return recommendations.filter((r) => !seen.has(r.id) && !seen.add(r.id));
}

/** Extracts numeric score from activity details string */
function extractScoreFromDetails(details: string): number | null {
  const match = details.match(/score[=:]\s*(\d+(?:\.\d+)?)\s*%?/i);
  return match ? parseFloat(match[1]) : null;
}

/** Identifies knowledge gaps from learner context */
export function identifyKnowledgeGaps(
  context: LearnerContext
): KnowledgeGap[] {
  // This is imported from knowledge-gap-engine - re-export for convenience
  // In a real implementation, this would be the same function
  // For now, return empty as the engine is in a separate module
  return [];
}

/** Exported for module compatibility */
export { identifyKnowledgeGaps };