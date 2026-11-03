"use client";

import { useState, useEffect, useParams } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getLessonsForNexusTopic, NexusLessonStep, NexusLessonStepType, getDifficultyColor, getNexusSubjectColor, getNexusSubjectDisplay } from "@/lib/nexus/curriculum";
import type { NexusClass, NexusLessonStepType as LessonStepType } from "@/types/dashboard";
import type { LearnerProfile } from "@/types/dashboard";

import { cn } from "@/lib/utils";

export default function NexusLessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { subject, topicId } = useParams<{ subject: string; topicId: string }>();
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [lessonSteps, setLessonSteps] = useState<NexusLessonStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);
  const [xpEarned, setXPEarned] = useState<number>(0);
  const [coinEarned, setCoinEarned] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const classNum = 7;
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    const fetchedSteps = getLessonsForNexusTopic(topicId, classNum as NexusClass);
    setLessonSteps(fetchedSteps);

    // If specific lessonId requested, find it; otherwise start from beginning
    if (lessonId) {
      const foundIndex = fetchedSteps.findIndex((s) => s.id === lessonId);
      if (foundIndex >= 0) {
        setCurrentStepIndex(foundIndex);
      }
    }
  }, [lessonId, topicId]);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading student profile...</p>
      </div>
    );
  }

  const profile = learnerProfile;
  const classNum = profile.currentClass as NexusClass;
  const color = getNexusSubjectColor(subject || "mathematics");
  const displayName = getNexusSubjectDisplay(subject || "mathematics");

  // Get current step
  const currentStep = lessonSteps[currentStepIndex];
  const isLastStep = currentStepIndex >= lessonSteps.length - 1;

  // Calculate progress
  const progress = ((currentStepIndex + 1) / lessonSteps.length) * 100;

  // Handle next step navigation
  const handleNext = () => {
    if (currentStepIndex < lessonSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setShowAnswer(false);
      setUserAnswer("");
      setScore(null);
    } else {
      // Completion - award rewards and navigate
      setXPEarned(50);
      setCoinEarned(25);
      setTimeout(() => {
        router.push("/nexus/achievements");
      }, 1500);
    }
  };

  // Handle answer submission for knowledge-check
  const handleAnswerSubmit = () => {
    if (!currentStep || currentStep.type !== "knowledge-check") {
      return;
    }

    // Deterministic validation based on step content
    let isCorrect = false;
    let correctAnswer = "";

    switch (currentStep.id) {
      case "ns-6-1-7":
        isCorrect = userAnswer.trim() === "0.121212..." || userAnswer.trim() === "0.\u2011121212\u201d";
        correctAnswer = "0.121212... (recurring decimal, therefore rational)";
        break;
      case "i-6-1-7":
        isCorrect = userAnswer.trim() === "rule for adding integers with different signs" || userAnswer.trim().toLowerCase().includes("different signs");
        correctAnswer = "Keep the sign of the larger absolute value and subtract the smaller";
        break;
      case "al-8-1-7":
        isCorrect = userAnswer.trim() === "subtract 5 from both sides" || userAnswer.trim().toLowerCase().includes("subtract 5");
        correctAnswer = "Subtract 5: 3x = 15";
        break;
      case "matt-6-1-7":
        isCorrect = userAnswer.trim() === "electron" || userAnswer.trim().toLowerCase() === "negative charge";
        correctAnswer = "The electron has a negative charge";
        break;
      case "force-6-1-7":
        isCorrect = userAnswer.trim().toLowerCase().includes("newton's first law") || userAnswer.trim().toLowerCase().includes("first law");
        correctAnswer = "Newton's First Law describes inertia";
        break;
      case "stat-6-1-7":
        isCorrect = userAnswer.trim().toLowerCase().includes("mean and median") || userAnswer.trim().toLowerCase().includes("difference between");
        correctAnswer = "Mean is the average; median is the middle value";
        break;
      case "prob-6-1-7":
        isCorrect = userAnswer.trim() === "1/6" || userAnswer.trim() === "one-sixth";
        correctAnswer = "1 favorable outcome out of 6 possible outcomes";
        break;
      default:
        isCorrect = false;
        correctAnswer = "Keep practicing";
    }

    setScore(isCorrect ? 1 : 0);
    setShowAnswer(true);

    if (isCorrect) {
      setXPEarned(10);
      setCoinEarned(5);
    } else {
      setXPEarned(0);
      setCoinEarned(0);
    }
  };

  // Handle answer input change
  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value);
  };

  if (!currentStep) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto p-4 md:p-6">
          <p className="text-2xl font-bold text-[theme.accent]">
            Lesson not found
          </p>
          <Link
            href="/nexus/topics/{topicId}"
            className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors"
          >
            ← Back to Topic
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 rounded-2xl bg-white p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              href="/nexus/world"
              className="text-[theme.accent] hover:text-[theme.accentDark] transition-colors text-sm font-medium"
            >
              ← Back to Academy Hub
            </Link>
            <span className="text-sm text-gray-600">
              {profile.fullName} • Class {profile.currentClass}
            </span>
          </div>
        </div>

 {/* Lesson Header */}
        <div className="mb-6 rounded-2xl bg-white p-6 border border-gray-200" style={{ borderColor: color }}>
          <h2 className="text-xl font-bold mb-2" style={{ color }}>
            {currentStep.title}
          </h2>
          <p className="text-gray-600">
            {currentStep.content}
          </p>
          {currentStep.illustration && (
            <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500 text-sm italic">
                {currentStep.illustration}
              </p>
            </div>
          )}
        </div>

 {/* Progress Bar */}
        <div className="mb-6 rounded-full bg-gray-200 h-2.5 overflow-x-hidden">
          <div
            className="bg-[theme.accent] h-full rounded-w-full transition-width"
            style={{ width: `${progress}%` }}
          />
          <p className="text-xs text-gray-500 absolute left-2 top-0.5">
            {Math.round(progress)}% complete
          </p>
        </div>

 {/* Lesson Content */}
        <div>
          {currentStep.type === "concept" ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Concept</h3>
              <p className="text-gray-600 mb-6 line-clamp-4">
                {currentStep.content}
              </p>
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-600 text-sm">
                  Read the concept above and click "Next" when you're ready to continue.
                </p>
              </div>
              <Link
                href="/nexus/lessons/{lessonSteps[currentStepIndex + 1]?.id}"
                className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors font-medium"
                onClick={(e) => e.preventDefault()}
              >
                Continue →
              </Link>
            </div>
          ) : currentStep.type === "detailed-explanation" ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Detailed Explanation</h3>
              <p className="text-gray-600 mb-6 line-clamp-4">
                {currentStep.content}
              </p>
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-600 text-sm">
                  Review the detailed explanation. Key points have been highlighted above.
                </p>
              </div>
              <Link
                href="/nexus/lessons/{lessonSteps[currentStepIndex + 1]?.id}"
                className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors font-medium"
                onClick={(e) => e.preventDefault()}
              >
                Continue →
              </Link>
            </div>
          ) : currentStep.type === "real-world-application" ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Real-World Application</h3>
              <p className="text-gray-600 mb-6 line-clamp-4">
                {currentStep.content}
              </p>
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-600 text-sm">
                  Think about how this concept applies to real situations you encounter.
                </p>
              </div>
              <Link
                href="/nexus/lessons/{lessonSteps[currentStepIndex + 1]?.id}"
                className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors font-medium"
                onClick={(e) => e.preventDefault()}
              >
                Continue →
              </Link>
            </div>
          ) : currentStep.type === "worked-example" ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Worked Example</h3>
              <p className="text-gray-600 mb-6 line-clamp-4">
                {currentStep.content}
              </p>
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-600 text-sm">
                  Study the step-by-step solution above. Cover the solution and try to solve it on your own first.
                </p>
              </div>
              <Link
                href="/nexus/lessons/{lessonSteps[currentStepIndex + 1]?.id}"
                className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors font-medium"
                onClick={(e) => e.preventDefault()}
              >
                Continue →
              </Link>
            </div>
          ) : currentStep.type === "guided-problem-solving" ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Guided Problem-Solving</h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {currentStep.content}
              </p>
              {showAnswer ? (
                <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-600 text-sm">
                    {correctAnswer || "Review the solution above"} {score === 1 ? "(correct!)" : ""}
                  </p>
                </div>
              ) : null}
              <Link
                href="/nexus/lessons/{lessonSteps[currentStepIndex + 1]?.id}"
                className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors font-medium"
                onClick={(e) => e.preventDefault()}
              >
                Next step →
              </Link>
            </div>
          ) : currentStep.type === "independent-practice" ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Independent Practice</h3>
              <p className="text-gray-600 mb-6">
                {currentStep.content}
              </p>
              {currentStep.type === "independent-practice" && (
                <div className="space-y-4">
                  {score !== null && (
                    <div className={`p-3 rounded-xl ${score === 1 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                      {score === 1 ? (
                        <p className="text-green-600 text-sm">
                          {correctAnswer || "Great job! Your answer is correct."}
                        </p>
                      ) : (
                        <p className="text-red-600 text-sm">
                          {correctAnswer || "Keep trying! Review the worked example and try again."}
                        </p>
                      )}
                    </div>
                  )}
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={handleAnswerChange}
                    placeholder="Your answer"
                    className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent] mb-3"
                  />
                  <button
                    onClick={handleAnswerSubmit}
                    className="mt-2 text-[theme.accent] hover:text-[theme.accentDark] transition-colors px-4 py-2 rounded-md"
                  >
                    Submit Answer
                  </button>
                </div>
              )}
              {showAnswer && score === 1 && (
                <Link
                  href="/nexus/lessons/{lessonSteps[currentStepIndex + 1]?.id}"
                  className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors font-medium"
                  onClick={(e) => e.preventDefault()}
                >
                  Next →
                </Link>
              )}
            </div>
          ) : currentStep.type === "knowledge-check" ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Knowledge Check</h3>
              <p className="text-gray-600 mb-6">
                {currentStep.content}
              </p>
              {showAnswer ? (
                <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-200">
                  <p className="text-gray-600 text-sm">
                    {correctAnswer || "The correct answer is shown above."} {score === 1 ? "(correct!)" : ""}
                  </p>
                </div>
              ) : null}
              <input
                type="text"
                value={userAnswer}
                onChange={handleAnswerChange}
                placeholder="Your answer"
                className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent] mb-3"
              />
              <button
                onClick={handleAnswerSubmit}
                className="mt-2 text-[theme.accent] hover:text-[theme.accentDark] transition-colors px-4 py-2 rounded-md"
              >
                Submit Answer
              </button>
            </div>
          ) : currentStep.type === "completion" ? (
            <div>
              <h3 className="text-lg font-medium mb-4">Lesson Complete!</h3>
              <p className="text-gray-600 mb-6">
                Well done! You've completed all lesson stages.
              </p>
              <div className="p-4 bg-gradient-to-r from-[theme.accent] to-[theme.accentDark] rounded-xl text-white text-center">
                <p className="text-lg">+{xpEarned} XP +{coinEarned} Coins</p>
                <p className="text-sm opacity-90">Rewards added to your profile</p>
              </div>
              <Link
                href="/nexus/achievements"
                className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors font-medium"
              >
                View Achievements →
              </Link>
            </div>
          ) : (
            <p>Lesson stage loading...</p>
          )}
        </div>

 {/* Navigation Controls */}
        {isLastStep ? null : (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={handleNext}
              className="w-full px-6 py-3 text-[theme.accent] hover:text-[theme.accentDark] transition-colors font-medium rounded-md"
            >
              {currentStepIndex === lessonSteps.length - 2 ? "Finish" : "Next"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}