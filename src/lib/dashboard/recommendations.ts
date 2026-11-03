import type {
  LearnerProfile,
  Recommendation,
} from "@/types/dashboard";
import { getUniverseForClass } from "@/config/dashboard";

/**
 * Generate recommendations based on learner data.
 * Grounded in available mock learner data - no fake AI engine.
 */
export function generateRecommendations(
  learner: LearnerProfile
): Recommendation[] {
  const { currentUniverse, selectedSubjects, assessmentScore, learningStreak } = learner;
  const recommendations: Recommendation[] = [];

  // If we have assessment data, use it for grounded recommendations
  if (assessmentScore !== undefined && assessmentScore > 0) {
    // Recommendations based on score bands
    if (assessmentScore < 50) {
      // Weak performance - focus on fundamentals
      recommendations.push({
        id: "rec-weak-1",
        title: "Strengthen Fundamentals",
        subject: selectedSubjects[0] || "Mathematics",
        topic: "Basic Operations",
        difficulty: "easy",
        estimatedDuration: 20,
        reason: "Assessment shows area needs reinforcement",
        actionLabel: "Start Review",
      });
      recommendations.push({
        id: "rec-weak-2",
        title: "Science Review",
        subject: "Science",
        topic: "Cell Structure",
        difficulty: "medium",
        estimatedDuration: 25,
        reason: "Assessment identifies growth area",
        actionLabel: "Start Review",
      });
    } else if (assessmentScore < 70) {
      // Developing performance
      recommendations.push({
        id: "rec-dev-1",
        title: "Algebra Practice",
        subject: "Mathematics",
        topic: "Algebraic Expressions",
        difficulty: "medium",
        estimatedDuration: 20,
        reason: "Assessment shows developing proficiency",
        actionLabel: "Start Practice",
      });
      recommendations.push({
        id: "rec-dev-2",
        title: "Science Concepts",
        subject: "Science",
        topic: "Force and Pressure",
        difficulty: "medium",
        estimatedDuration: 25,
        reason: "Build core scientific understanding",
        actionLabel: "Start Practice",
      });
    } else if (assessmentScore < 85) {
      // Strong performance - extension opportunities
      recommendations.push({
        id: "rec-strong-1",
        title: "Advanced Calculus",
        subject: "Mathematics",
        topic: "Derivatives",
        difficulty: "hard",
        estimatedDuration: 30,
        reason: "Assessment shows strong potential",
        actionLabel: "Start Advanced",
      });
    } else {
      // Excellent performance - maintenance and mastery
      recommendations.push({
        id: "rec-exc-1",
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
    // No assessment data - clearly labelled sample recommendations
    recommendations.push({
      id: "rec-sample-1",
      title: "Sample: Algebra Fundamentals",
      subject: "Mathematics",
      topic: "Algebra",
      difficulty: "medium",
      estimatedDuration: 20,
      reason: "Sample recommendation (no assessment data available)",
      actionLabel: "Start Sample",
    });
    recommendations.push({
      id: "rec-sample-2",
      title: "Sample: Cell Structure",
      subject: "Science",
      topic: "Cell Structure",
      difficulty: "medium",
      estimatedDuration: 25,
      reason: "Sample recommendation (no assessment data available)",
      actionLabel: "Start Sample",
    });
  }

  // If no recommendations generated (edge case), add a default
  if (recommendations.length === 0) {
    recommendations.push({
      id: "rec-default",
      title: "Start Learning",
      subject: selectedSubjects[0] || "Mathematics",
      topic: "Basic Concepts",
      difficulty: "easy",
      estimatedDuration: 15,
      reason: "Begin your learning journey",
      actionLabel: "Start Learning",
    });
  }

  return recommendations;
}

/**
 * Get recommendations with assessment data availability flag.
 */
export function getRecommendationsWithStatus(
  learner: LearnerProfile
) {
  const recommendations = generateRecommendations(learner);
  const hasAssessmentData =
    learner.assessmentScore !== undefined && learner.assessmentScore > 0;

  return { recommendations, hasAssessmentData };
}

/**
 * Get sample recommendations when no assessment data is available.
 * These are clearly labelled as samples, not real data.
 */
export function getSampleRecommendations(): Recommendation[] {
  return [
    {
      id: "sample-1",
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      topic: "Algebra",
      difficulty: "medium",
      estimatedDuration: 20,
      reason: "Sample recommendation",
      actionLabel: "Start Sample",
    },
    {
      id: "sample-2",
      title: "Cell Structure",
      subject: "Science",
      topic: "Cell Structure",
      difficulty: "medium",
      estimatedDuration: 25,
      reason: "Sample recommendation",
      actionLabel: "Start Sample",
    },
  ];
}