"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  question: {
    id: string;
    questionText: string;
    questionType:
      | "multiple-choice"
      | "multiple-select"
      | "true-false"
      | "fill-in-the-blank"
      | "short-answer";
    difficulty: "easy" | "medium" | "hard";
    options?: { id: string; text: string }[];
    correctAnswer?: string | string[];
    acceptedAnswers?: string[];
    marks: number;
  };
  questionNumber: number;
  totalQuestions: number;
  onSelect: (optionId?: string) => void;
  onNext: () => void;
  onBack: () => void;
  isMarkedForReview: boolean;
  setMarkedForReview: (value: boolean) => void;
  isAnswered: boolean;
  setAnswered: (value: boolean) => void;
}

function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onSelect,
  onNext,
  onBack,
  isMarkedForReview,
  setMarkedForReview,
  isAnswered,
  setAnswered,
}: QuestionCardProps) {
  const difficultyLabels: Record<
    "easy" | "medium" | "hard",
    { label: string; className: string }
  > = {
    easy: { label: "Easy", className: "bg-green-100 text-green-800" },
    medium: { label: "Medium", className: "bg-yellow-100 text-yellow-800" },
    hard: { label: "Hard", className: "bg-red-100 text-red-800" },
  };

  const difficulty = difficultyLabels[question.difficulty];
  const isMultipleChoice =
    question.questionType === "multiple-choice";
  const isMultipleSelect =
    question.questionType === "multiple-select";
  const isTrueFalse = question.questionType === "true-false";

  return (
    <div className="pace-step">
      <div className="space-y-4">
        {/* Question header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Q{questionNumber} of {totalQuestions}
            </span>
            {isMarkedForReview && (
              <Badge tone="accent" className="py-1 px-2 text-xs font-medium">
                Marked for Review
              </Badge>
            )}
          </div>

          <Badge
            tone={isAnswered ? "accent" : "neutral"}
            className="py-1 px-2 text-xs font-medium"
          >
            {isAnswered ? "Answered" : "Unanswered"}
          </Badge>
        </div>

        {/* Question text and difficulty */}
        <div>
          <p className="font-medium text-ink">{question.questionText}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className={`text-xs font-medium ${difficulty.className}`}>
              {difficulty.label}
            </span>
          </div>
        </div>

        {/* Answer interface */}
        {isTrueFalse && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              type="button"
              className="flex-1 rounded-md border px-4 py-3 text-sm font-medium transition-colors bg-border-soft text-text hover:bg-primary/5"
              onClick={() => onSelect("true")}
            >
              True
            </button>
            <button
              type="button"
              className="flex-1 rounded-md border px-4 py-3 text-sm font-medium transition-colors bg-border-soft text-text hover:bg-primary/5"
              onClick={() => onSelect("false")}
            >
              False
            </button>
          </div>
        )}

        {isMultipleChoice && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {question.options!.map((option) => (
              <button
                key={option.id}
                type="button"
                className="rounded-md border px-4 py-3 text-sm font-medium transition-colors bg-border-soft text-text hover:bg-primary/5"
                onClick={() => onSelect(option.id)}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}

        {isMultipleSelect && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {question.options!.map((option) => (
              <div
                key={option.id}
                className="flex items-start rounded-md border px-3 py-2.5 text-sm font-medium transition-colors bg-border-soft text-text hover:bg-primary/5"
                onClick={() => onSelect(option.id)}
              >
                <input
                  type="checkbox"
checked={isAnswered
                    ? Array.isArray(question.correctAnswer as string | string[])
                      ? (question.correctAnswer as string[]).includes(option.id)
                      : question.correctAnswer === option.id
                    : false}
                  onChange={() => onSelect(option.id)}
                  className="rounded border-primary square"
                />
                <span className="ml-2 flex-1">{option.text}</span>
              </div>
            ))}
          </div>
        )}

        {question.questionType === "fill-in-the-blank" && (
          <div className="mt-4 p-3 rounded-md border border-border-soft">
            <label className="block text-sm text-text-soft mb-2">Answer</label>
            <input
              type="text"
              value=""
              onChange={(e: any) => onSelect(e.target.value)}
              className="w-full rounded-md border border-border-soft px-3 py-2 focus:border-primary focus:outline-none"
              placeholder="Type your answer"
              readOnly
            />
            <p className="text-xs text-text-soft/60 mt-1">
              <small>
                Accepted:{" "}
                {question.acceptedAnswers?.join(", ") || "exact match"}
              </small>
            </p>
          </div>
        )}

        {question.questionType === "short-answer" && (
          <div className="mt-4 p-3 rounded-md border border-border-soft">
            <label className="block text-sm text-text-soft mb-2">Answer</label>
            <input
              type="text"
              value=""
              onChange={(e: any) => onSelect(e.target.value)}
              className="w-full rounded-md border border-border-soft px-3 py-2 focus:border-primary focus:outline-none"
              placeholder="Type your answer"
              readOnly
            />
            <p className="text-xs text-text-soft/60 mt-1">
              <small>
                {question.acceptedAnswers?.length
                  ? `Accepted: ${question.acceptedAnswers.join(", ")}`
                  : "Exact match required"}
              </small>
            </p>
          </div>
        )}
      </div>

      {/* Navigation controls */}
      <div className="mt-6 pt-4 border-t border-border-soft">
        <div className="flex justify-between">
          {questionNumber > 1 && (
            <button
              onClick={onBack}
              className="btn-outline"
              disabled={isAnswered}
              title="Previous question"
            >
              Previous
            </button>
          )}
          {questionNumber < totalQuestions && (
            <button
              onClick={onNext}
              className="btn-primary"
              disabled={!isAnswered}
              title="Next question"
            >
              Next
            </button>
          )}
          {questionNumber === totalQuestions && (
            <button
              onClick={() => onNext()}
              className="btn-primary"
              title="Submit assessment"
            >
              Submit
            </button>
          )}
        </div>

        {isMarkedForReview && (
          <button
            onClick={() => setMarkedForReview(!isMarkedForReview)}
            className="text-xs text-primary/60 hover:text-primary mt-2"
            title="Remove from review"
          >
            Remove from Review
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionCard;