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
  getTopicDisplayStatus,
  getPriorityDisplay,
  MockTutorResponseProvider,
  TutorResponseProvider,
} from "@/types/intelligence/models";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function TutorDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get studentId from query param or default
  const studentId = searchParams.get("studentId") || "student-1";

  // Verify student access
  const { dataProvider } = useDataProvider();
  const context: LearnerContext = {
    studentId,
    academicClass: { value: "8", label: "Class 8", universe: "nexus" as const },
    board: "CBSE",
    learningUniverse: "nexus" as const,
    stream: "general" as Stream,
    selectedSubjects: ["Mathematics", "Science"],
    languagePreference: "en",
    currentTopic: "Fractions",
    previousActivities: [],
    assessmentResults: { score: 80, total: 100, percentage: 80, subjects: {} },
    topicMastery: {},
    learningPreferences: {},
  };

  const tutorProvider: TutorResponseProvider = {
    getConceptExplanation: (topic, classLevel, universe) => ({
      id: `exp-${topic}`,
      type: "concept",
      content: `Concept explanation for ${topic} at ${classLevel} level in ${universe} universe`,
      language: "en",
      classAppropriate: true,
      universeAppropriate: true,
      supportsSteps: true,
    }),
    getStepByStepSolution: (problem, classLevel, universe) => ({
      id: `solution-${problem}`,
      type: "solution",
      content: `Step-by-step solution for ${problem}`,
      language: "en",
      classAppropriate: true,
      universeAppropriate: true,
      supportsSteps: true,
    }),
    getHint: (questionId, classLevel, universe) => ({
      id: `hint-${questionId}`,
      type: "hint",
      content: `Hint for question ${questionId}`,
      language: "en",
      classAppropriate: true,
      universeAppropriate: true,
      supportsSteps: false,
    }),
    getPracticeQuestion: (params) => [
      {
        id: `q-${Math.random().toString(36).slice(2, 9)}`,
        subject: params.subject,
        topic: params.topic,
        questionType: "mcq" as const,
        questionText: `Practice question on ${params.topic}`,
        options: [
          { id: "a", text: "Option A", selected: false },
          { id: "b", text: "Option B", selected: false },
          { id: "c", text: "Option C", selected: false },
          { id: "d", text: "Option D", selected: false },
        ],
        correctAnswers: ["a"],
        explanation: "Explanation of the practice question",
        estimatedDuration: 10,
      },
    ],
    getRecommendations: (context) => getRecommendationsFromContext(context),
    getSessionSummary: () => "Session summary: concepts covered and practice completed.",
  };

  // Get recommendations from context
  const recommendations = getRecommendationsFromContext(context);

  // Get knowledge gaps
  const gaps = identifyKnowledgeGaps(context);

  // Get topic display status
  const topicStatus = getTopicDisplayStatus("developing");

  // Get priority display
  const priorityDisplay = getPriorityDisplay("medium");

  return (
    <TeacherLayout
      teacherId="parent-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="parent-1"
          pathname="/tutor"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Welcome Section */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-3">
                Welcome to your Tutor
                </br>
                <span className="text-muted-foreground">
                  Class {context.academicClass.label} — {context.learningUniverse}
                  </br>
                  Language: {context.languagePreference}
                  </br>
                  Universe: {context.learningUniverse}
                </span>
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Your personal learning companion. I'm here to help you understand concepts,
                practice problems, and revise what you've learned.
                </br>
                <span className="text-xs text-error">
                  prototype: Not connected to a live AI model.
                  </span>
                </span>
              </p>
            </section>

            {/* Suggested Learning Actions */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Suggested Learning Actions</h3>
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3 rounded-border-border border-border border-border text-center"
                    >
                      <p className="text-sm font-medium">{rec.action}</p>
                      <p className="text-xs text-primary">{rec.priority} priority</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground mb-4">
                  No recommendations yet.
                  </br>
                  <a href="/tutor/recommendations?studentId={studentId}" className="text-primary hover-underline">
                    Get recommendations
                    </a>
                  </span>
                </p>
              )}

              {/* Knowledge Gaps */}
              {gaps.length > 0 && (
                <div className="mt-4 p-3 rounded-border-border border-border bg-error/10 border-error">
                  <p className="text-xs text-error font-medium mb-1">Knowledge Gaps Identified</p>
                  {gaps.map((gap) => (
                    <p key={gap.id} className="text-xs text-error line-clamp-1">
                      {gap.evidence.map((e) => e.description).join(". ")}
                      </br>
                      {gap.recommendedAction}
                      </br>
                      Priority: {gap.priority}
                    </p>
                  ))}
                </div>
              )}
            </section>

            {/* Quick Actions */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2 rounded border-border border-border text-primary hover-underline">
                  Explain a concept
                  </button>
                <button className="px-4 py-2 rounded border-border border-border text-primary hover-underline">
                  Solve a question
                  </button>
                <button className="px-4 py-2 rounded border-border border-border text-primary hover-underline">
                  Give me a hint
                  </button>
                <button className="px-4 py-2 rounded border-border border-border text-primary hover-underline">
                  Generate practice
                  </button>
                <button className="px-4 py-2 rounded border-border border-border text-primary hover-underline">
                  Summarise a chapter
                  </button>
                <button className="px-4 py-2 rounded border-border border-border text-primary hover-underline">
                  Help me revise
                  </button>
              </div>
            </section>

            {/* Recommended Topics */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Recommended Topics</h3>
              {recommendations.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {recommendations.slice(0, 4).map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3 rounded-border-border border-border border-border"
                    >
                      <p className="text-sm font-medium">{rec.subject} — {rec.topic}</p>
                      <p className="text-xs text-primary">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No recommendations yet.
                  </br>
                  <a href="/tutor/recommendations?studentId={studentId}" className="text-primary hover-underline">
                    Get recommendations
                    </a>
                  </span>
                </p>
              )}
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}