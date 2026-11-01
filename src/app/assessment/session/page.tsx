"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockQuestions } from "@/content/assessment";
import QuestionCard from "@/app/assessment/questions/question-card";
import { universes, getUniverse } from "@/config/themes";
import type { UniverseId } from "@/types/theme";

interface AssessmentSessionProps {
  classLevel: string;
  selectedSubjects: string[];
}

export function AssessmentSessionPage({
  classLevel,
  selectedSubjects,
}: AssessmentSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedForReview, setMarkedForReview] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState("easy" as "easy" | "medium" | "hard");
  const startTime = useRef(Date.now());

  const totalQuestions = mockQuestions.length;
  const handleNext = () => {
    // Check if current question is answered
    const currentQuestion = mockQuestions[currentQuestionIndex];
    const isAnswered =
      currentQuestion.questionType === "multiple-choice"
        ? currentQuestion.correctAnswerId != null
        : currentQuestion.questionType === "multiple-select"
        ? Array.isArray(currentQuestion.correctAnswerIds)
          ? currentQuestion.correctAnswerIds.length > 0
          : false
        : currentQuestion.questionType === "true-false"
        ? currentQuestion.correctAnswer === "true"
        : currentQuestion.correctAnswer != null;

    if (!isAnswered) {
      window.alert("Please answer the current question first");
      return;
    }

    // Deterministic difficulty adaptation simulation
    const correct = checkAnswer(currentQuestionIndex);
    setDifficultyLevel((prev) => {
      if (correct) {
        if (prev === "medium" || prev === "hard") return "hard";
        return "medium";
      } else {
        if (prev === "easy" || prev === "medium") return "easy";
        return "medium";
      }
    });

    setCurrentQuestionIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
  };

  const handleBack = () => {
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  const checkAnswer = (index: number): boolean => {
    const question = mockQuestions[index];
    // Simple deterministic check based on question index
    return index % 3 !== 0;
  };

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev >= 59) {
          setMinutes((prev) => prev + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const elapsedTime = minutes > 0
    ? `${minutes}:${seconds.toString().padStart(2, "0")}`
    : `${seconds}s`;

  const universeId = classLevel
    ? classLevel.startsWith("1") || classLevel.startsWith("2") || classLevel.startsWith("3") || classLevel.startsWith("4") || classLevel.startsWith("5")
      ? "junior"
      : classLevel.startsWith("6") || classLevel.startsWith("7") || classLevel.startsWith("8") || classLevel.startsWith("9") || classLevel.startsWith("10")
        ? "nexus"
        : "ascend"
    : "nexus";
  const universe = getUniverse(universeId);

  return (
    <Container size="default">
      <SectionHeading
        eyebrow="Assessment in Progress"
        title="Assessment Session"
        description="Answer questions to help us understand your knowledge level"
      />

      <div className="pace-step">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </p>
            <p className="font-medium text-ink">
              Difficulty: {difficultyLevel}
            </p>
          </div>
          <Badge
            tone={markedForReview ? "accent" : "neutral"}
            className="py-1 px-2 text-xs font-medium"
            >Marked for Review{" "}
            {markedForReview && <span className="ml-1">↑</span>}
          </Badge>
        </div>

        <div className="mt-2 text-right">
          <span className="text-sm text-muted-foreground">Elapsed: </span>
          <span className="font-medium text-ink">{elapsedTime}</span>
        </div>
      </div>

      <QuestionCard
        question={mockQuestions[currentQuestionIndex]}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        onSelect={(optionId) => {}}
        onNext={handleNext}
        onBack={handleBack}
        isMarkedForReview={markedForReview}
        setMarkedForReview={setMarkedForReview}
        isAnswered={currentQuestionIndex > 0}
        setAnswered={(val) => {}}
      />
    </Container>
  );
}