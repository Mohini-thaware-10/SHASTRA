"use client";

import { useState, useEffect, useParams } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getLessonsForTopic } from "@/lib/junior/curriculum";
import type { JuniorLesson } from "@/lib/junior/curriculum";
import type { LearnerProfile } from "@/types/dashboard";

import { cn } from "@/lib/utils";

export default function JuniorLessonPlayerPage() {
  const { lessonId } = useParams<{ lesson: string }>();
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [lessonData, setLessonData] = useState<JuniorLesson | null>(null);
  const router = useRouter();

  useEffect(() => {
    const classNum = 3;
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    if (lessonId) {
      const lessons = getLessonsForTopic("math-1-1", classNum);
      if (lessons[0]) {
        setLessonData(lessons[0]);
        setCurrentStep(0);
      }
    }
  }, [lessonId]);

  if (!learnerProfile || !lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading lesson...</p>
      </div>
    );
  }

  const profile = learnerProfile;
  const classNum = profile.currentClass as "1" | "2" | "3" | "4" | "5";
  const totalSteps = lessonData.steps.length;
  const currentStepData = lessonData.steps[currentStep];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 rounded-xl bg-white p-4 border border-gray-200">
          <div className="flex items-center gap-3">
            <Link
              href="/junior/world"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Back to World Map
            </Link>
            <span className="text-sm text-gray-600">
              Lesson {currentStep + 1} of {totalSteps}
            </span>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="rounded-xl bg-white p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">
            {lessonData.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {lessonData.learningObjective}
          </p>

          {/* Steps navigation */}
          <div className="grid grid-cols-3 gap-2 mb-8">
            {lessonData.steps.map((step, i) => (
              <div
                key={step.id}
                className={cn(
                  "rounded bg-gray-100 p-2 text-xs font-medium",
                  i === currentStep && "bg-blue-600 text-white"
                )}
                onClick={() => setCurrentStep(i)}
              >
                {step.title}
              </div>
            ))}
          </div>

          {/* Current step content */}
          <div>
            {currentStepData.type === "introduction" && (
              <p className="text-gray-700 mb-6">
                Welcome to the lesson! In this lesson, we'll explore the key concepts
                together. Take your time to read through the introduction and understand
                the main ideas.
              </p>
            )}

            {currentStepData.type === "concept" && (
              <p className="text-gray-700 mb-6">
                Key Concept: Addition means putting together two groups to find the total.
              </p>
            )}

            {currentStepData.type === "example" && (
              <p className="text-gray-700 mb-6">
                Example: 2 + 3 = 5. Two groups of objects combined with three more gives us five total.
              </p>
            )}

            {currentStepData.type === "guided-practice" && (
              <p className="text-gray-700 mb-6">
                Guided Practice: Let's try together: What is 2 + 3?
              </p>
            )}

            {currentStepData.type === "knowledge-check" && (
              <p className="text-gray-700 mb-6">
                Knowledge Check: Question - What is 2 + 3?
              </p>
            )}

            {currentStepData.type === "completion" && (
              <div className="text-center py-8">
                <h3 className="text-xl font-bold mb-4">
                  Lesson Complete!
                </h3>
                <p className="text-gray-600 mb-4">
                  You have successfully completed the lesson "{lessonData.title}".
                </p>
                <button
                  onClick={() => router.push("/junior/world")}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12hM12 5lM19 12lM5 12" />
                  </svg>
                  Continue Learning
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
              >
                Previous
              </button>
            )}
            {currentStep < totalSteps - 1 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
              >
                Next {currentStep < totalSteps - 2 ? "→" : "Complete"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}