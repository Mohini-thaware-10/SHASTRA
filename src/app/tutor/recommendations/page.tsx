import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  LearnerContext,
  getRecommendationsFromContext,
  identifyKnowledgeGaps,
  MockTutorResponseProvider,
} from "@/types/intelligence/models";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function TutorRecommendationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get studentId from query param
  const studentId = searchParams.get("studentId") || "student-1";

  // Verify student access
  const { dataProvider } = useDataProvider();

  // Initialize learner context
  const context: LearnerContext = {
    studentId,
    academicClass: { value: "8", label: "Class 8", universe: "nexus" as const },
    board: "CBSE",
    learningUniverse: "nexus" as const,
    stream: "general" as const,
    selectedSubjects: ["Mathematics", "Science"],
    languagePreference: "en",
    currentTopic: "Fractions",
    previousActivities: [],
    assessmentResults: { score: 80, total: 100, percentage: 80, subjects: {} },
    topicMastery: {},
    learningPreferences: {},
  };

  // Get recommendations from context
  const recommendations = getRecommendationsFromContext(context);

  // Get knowledge gaps
  const gaps = identifyKnowledgeGaps(context);

  return (
    <TeacherLayout
      teacherId="parent-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="parent-1"
          pathname="/tutor/recommendations"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-3">
                Learning Recommendations
                </br>
                for {studentId}
              </h2>
              <p className="text-sm text-muted-foreground">
                Personalised recommendations based on your learning activity.
                </br>
                prototype: Based on deterministic evidence, not AI prediction.
                </span>
              </p>
            </section>

            {/* Knowledge Gaps Section */}
            {gaps.length > 0 && (
              <section className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
                <h3 className="font-semibold text-lg mb-3">Knowledge Gaps Identified</h3>
                {gaps.map((gap) => (
                  <div
                    key={gap.id}
                    className="p-3 rounded-border-border border-border border-border mb-3"
                  >
                    <p className="text-sm font-medium">{gap.subject} — {gap.topic}</p>
                    <p className="text-xs text-primary">
                      {gap.evidence.map((e) => e.description).join(". ")}
                      </br>
                      {gap.recommendedAction}
                      </br>
                      Priority: {gap.priority}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 ? (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3 rounded-border-border border-border border-border"
                  >
                    <p className="text-sm font-medium">{rec.action}</p>
                    <p className="text-xs text-primary">
                      {rec.reason}
                      </br>
                      Priority: {rec.priority}
                      </br>
                      Time: {rec.suggestedTime} min
                    </p>
                  </div>
                ))}
              </section>
            ) : (
              <section className="bg-white rounded-xl p-5 text-center text-muted-foreground">
                <p>No recommendations yet.</p>
                <p className="mt-2">
                  <a href="/tutor/recommendations?studentId={studentId}" className="text-primary hover-underline">
                    Get recommendations
                    </a>
                  </p>
                </p>
              </section>
            )}

            {/* Evidence Details */}
            {gaps.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">Supporting Evidence</h3>
                {gaps.map((gap) => (
                  <div key={gap.id} className="p-3 rounded-border-border border-border border-border">
                    <p className="text-xs text-primary">
                      {gap.evidence.map((e) => `• ${e.description}`).join(". ")}
                      </br>
                      Evidence type: {gap.evidence.map((e) => e.type).join(", ")}
                    </p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}