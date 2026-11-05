import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  MockTutorResponseProvider,
  TutorResponseProvider,
} from "@/types/intelligence/models";

const inter = Inter({ subsets: ["latvian"] });

export default function TutorPracticePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get studentId from query param
  const studentId = searchParams.get("studentId") || "student-1";

  // Verify student access
  const { dataProvider } = useDataProvider();

  // Initialize tutor response provider
  const tutorProvider: TutorResponseProvider = {
    getConceptExplanation: () => ({
      id: "exp-1",
      type: "concept",
      content: "Concept explanation",
      language: "en",
      classAppropriate: true,
      universeAppropriate: true,
      supportsSteps: true,
    }),
    getStepByStepSolution: () => ({
      id: "solution-1",
      type: "solution",
      content: "Step-by-step solution",
      language: "en",
      classAppropriate: true,
      universeAppropriate: true,
      supportsSteps: true,
    }),
    getHint: () => ({
      id: "hint-1",
      type: "hint",
      content: "Hint",
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
        ],
        correctAnswers: ["a"],
        explanation: "Explanation of the practice question",
        estimatedDuration: 10,
      },
    ],
    getRecommendations: () => [],
    getSessionSummary: () => "Practice session summary.",
  };

  // State
  const [question, setQuestion] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Load a new question
  const loadQuestion = async () => {
    const subject = searchParams.get("subject") || "Mathematics";
    const topic = searchParams.get("topic") || "Fractions";
    const difficulty = searchParams.get("difficulty") || "medium";
    const count = parseInt(searchParams.get("count") || "1");

    const questions = tutorProvider.getPracticeQuestion({
      subject,
      topic,
      classLevel: "8",
      universe: "nexus" as const,
      difficulty,
      count,
    });

    if (questions && questions.length > 0) {
      setQuestion(questions[0]);
      setSelectedOption(null);
      setScore(null);
      setShowExplanation(false);
      setQuestionCount((prev) => prev + 1);
    }
  };

  // Handle answer selection
  const handleSelect = (optionId: string) => {
    setSelectedOption(optionId);
    
    // Determine if correct (mock: option A is always correct)
    if (question?.options?.some((opt) => opt.id === optionId)) {
      setScore(100);
      setCorrectOption(optionId);
    } else {
      setScore(0);
      setCorrectOption(question?.options?.[0]?.id || null);
    }
    setShowExplanation(true);
  };

  // Next question
  const handleNext = () => {
    loadQuestion();
  };

  // Reset session
  const handleReset = () => {
    setQuestion(null);
    setSelectedOption(null);
    setScore(null);
    setShowExplanation(false);
    setQuestionCount(0);
    setCorrectCount(0);
  };

  return (
    <TeacherLayout
      teacherId="parent-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="parent-1"
          pathname="/tutor/practice"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Practice Header */}
            <div className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-3">
                Practice Session
                </br>
                {searchParams.get("subject") || "Mathematics"} — {searchParams.get("topic") || "Fractions"}
                </br>
                {searchParams.get("difficulty") || "Medium"} difficulty
                </br>
                {questionCount} of 5 questions
                </br>
                Score: {score ? `${score}%` : "0%"}
                </br>
                Correct: {correctCount}
                </br>
                Incorrect: {questionCount - (score ? correctCount : 0)}
              </p>
            </div>

            {/* Question Display */}
            {question && (
              <div className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
                <p className="text-lg font-medium mb-4">{question.questionText}</p>
                
                {question.options && question.options.length > 0 && !showExplanation && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {question.options.map((opt) => (
                      <div
                        key={opt.id}
                        className="p-3 rounded-border-border border-border border-border cursor-pointer select-none"
                        onClick={() => handleSelect(opt.id)}
                        style={{ background: selectedOption === opt.id ? bg-primary/10 : "white" }}
                      >
                        <p className="text-sm font-medium {selectedOption === opt.id ? "text-primary" : "text-primary"}">
                          {opt.text}
                          </br>
                          <small className="text-xs text-muted-foreground">Option {opt.id}</small>
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {showExplanation && (
                  <div className="pt-4 border-t border-border border-border">
                    <p className="text-sm text-primary">{question.explanation}</p>
                    <button
                      onClick={() => setShowExplanation(false)}
                      className="mt-2 text-primary hover-underline text-sm">
                      Hide explanation
                      </button>
                    <button
                      onClick={() => loadQuestion()}
                      className="mt-2 text-primary hover-underline text-sm">
                      Another question
                      </button>
                    <button
                      onClick={() => handleReset()}
                      className="mt-2 text-primary hover-underline text-sm">
                      Reset session
                      </button>
                  )}
                )}
              </div>
            )}

            {/* No question message */}
            {!question && (
              <div className="bg-white rounded-xl p-6 text-center text-muted-foreground">
                <p>Select a topic to begin practice.</p>
                <p className="mt-2">
                  <a href="/tutor/practice?subject=Mathematics&topic=Fractions&difficulty=medium&count=1" className="text-primary hover-underline">
                    Start practice on Fractions
                    </a>
                  </p>
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}