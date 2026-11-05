"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BrandMark } from "@/components/common/brand-mark";
import { Container } from "@/components/common/container";
import { useObservable } from "@/lib/observables";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { mockQuestions } from "@/content/assessment";
import { GPProgress } from "@/types/dashboard";
import { useUniverseTheme } from "@/config/themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/dashboard/DailyGoalCard";

export default function AscendExamPreparation() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const router = useRouter();

  useEffect(() => {
    const classNum = 11;
    const stream = "science";
    const profile = getLearnerProfile(classNum, stream, "CBSE");
    setLearnerProfile(profile);
  }, []);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading exam preparation centre...</p>
      </div>
    );
  }

  const theme = useUniverseTheme("ascend");

  // Select questions relevant to the student's stream and class
  const streamQuestions = mockQuestions.filter(
    (q) =>
      q.classLevel === learnerProfile.currentClass &&
      (q.subject === "Physics" ||
        q.subject === "Chemistry" ||
        q.subject === "Mathematics" ||
        q.subject === "Biology" ||
        q.subject === "Accountancy" ||
        q.subject === "Business Studies" ||
        q.subject === "Economics")
  );

  const [examState, setExamState] = useState({
    questions: streamQuestions.slice(0, 10),
    currentQuestionIndex: 0,
    answers: {},
    markedForReview: new Set(),
    timeRemaining: 600, // 10 minutes in seconds
    isActive: false,
    startedAt: null,
    completed: false,
    results: null,
  });

  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Start exam
  const startExam = useCallback(() => {
    setExamState({
      ...examState,
      isActive: true,
      startedAt: new Date(),
      timeRemaining: 600,
    });
    setTimerInterval(
      setTimeout(() => {
        completeExam(false);
      }, 600000) // 10 minutes
    );
  }, [examState]);

  // Complete exam
  const completeExam = useCallback((finalSubmit: boolean) => {
    if (timerInterval) {
      clearTimeout(timerInterval);
      setTimerInterval(null);
    }

    const answeredCount = Object.keys(examState.answers).length;
    const correctCount = Object.keys(examState.answers).reduce(
      (count, qId) => {
        const question = streamQuestions.find((q) => q.id === qId);
        if (question && examState.answers[qId] === question.correctAnswerId) {
          return count + 1;
        }
        return count;
      },
      0
    );

    const percentage = streamQuestions.length > 0 ? Math.round((correctCount / streamQuestions.length) * 100) : 0;

    setExamState({
      ...examState,
      isActive: false,
      completed: true,
      results: {
        totalQuestions: streamQuestions.length,
        correctAnswers: correctCount,
        percentage,
        timeTaken: examState.timeRemaining,
      },
    });
  }, [examState]);

  // Navigate to next question
  const nextQuestion = useCallback(() => {
    if (examState.currentQuestionIndex < examState.questions.length - 1) {
      setExamState({
        ...examState,
        currentQuestionIndex: examState.currentQuestionIndex + 1,
      });
    }
  }, [examState]);

  // Navigate to previous question
  const prevQuestion = useCallback(() => {
    if (examState.currentQuestionIndex > 0) {
      setExamState({
        ...examState,
        currentQuestionIndex: examState.currentQuestionIndex - 1,
      });
    }
  }, [examState]);

  // Toggle mark for review
  const toggleMarkForReview = useCallback((questionId: string) => {
    setExamState({
      ...examState,
      markedForReview: examState.markedForReview.has(questionId)
        ? new Set(examState.markedForReview.delete(questionId))
        : new Set([questionId]),
      });
  }, [examState]);

  // Submit answer for a question
  const submitAnswer = useCallback((questionId: string, answerId: string) => {
    setExamState({
      ...examState,
      answers: {
        ...examState.answers,
        [questionId]: answerId,
      },
      markedForReview: examState.markedForReview.delete(questionId),
    });
  }, [examState]);

  // Get current question
  const currentQuestion = streamQuestions[examState.currentQuestionIndex];
  const isMarked = examState.markedForReview.has(currentQuestion?.id || "");

  // Format time
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }, []);

  // Calculate remaining time percentage
  const timePercentage = examState.timeRemaining > 0 ? Math.round((examState.timeRemaining / 600) * 100) : 0;

  return (
    <div className="min-h-screen bg-[theme.background] text-[theme.textColor]">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Exam Header */}
        <div className="rounded-xl bg-[theme.soft] border border-[theme.border] p-6 md:p-8 mb-8">
          <BrandMark className="mb-4" />
          <h1 className="text-2xl font-display font-bold text-[theme.accent] tracking-wider">
            Exam Preparation Centre
          </h1>
          <p className="text-[0.875rem] text-[theme.inkSmall] mt-1">
            Configurable timed practice for {learnerProfile.currentClass} {learnerProfile.stream} stream
          </p>
          <p className="text-[0.5rem] text-[theme.inkSmall]">
            Board: {learnerProfile.board} • Select a subject to begin
          </p>
        </div>

        {/* Exam Interface */}
        {!examState.isActive && (
          <div className="mb-8">
            <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
              Start Timed Examination
            </h2>
            <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
              Select the number of questions and duration for your practice session
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div>
                <Label className="block text-[0.5rem] text-[theme.inkSmall] uppercase tracked mb-1">
                  Questions
                </Label>
                <select
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent]"
                >
                  <option value="10">10 questions</option>
                  <option value="20">20 questions</option>
                  <option value="30">30 questions</option>
                </select>
              </div>
              <div>
                <Label className="block text-[0.5rem] text-[theme.inkSmall] uppercase tracked mb-1">
                  Duration (minutes)
                </Label>
                <select
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent]"
                >
                  <option value="10">10 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={startExam}
              className="w-full"
            >
              Start Examination
            </Button>
          </div>
        )}

        {examState.isActive && currentQuestion && (
          <div className="rounded-lg bg-white border border-[theme.border] p-6 md:p-8 mb-8">
            {/* Timer and Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[0.5rem] text-[theme.inkSmall]">
                  Question {examState.currentQuestionIndex + 1} of {examState.questions.length}
                </span>
                <span className="text-[0.625rem] font-medium text-[theme.accent]">
                  {formatTime(examState.timeRemaining)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-[theme.soft] overflow-hidden">
                <div
                  className={`h-full rounded-full ${timePercentage < 30 ? "bg-red-500" : timePercentage < 60 ? "bg-yellow-500" : "bg-green-500"} transition-colors`}
                  style={{ width: `${timePercentage}%` }}
                />
              </div>
              <span className="text-[0.5rem] text-[theme.inkSmall]">
                {timePercentage}% time remaining
              </span>
            </div>

            {/* Question View */}
            <div className="mb-8">
              {currentQuestion && (
                <div className="space-y-4">
                  <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
                    {currentQuestion.questionText}
                  </p>

                  {/* Question-specific rendering based on type */}
                  {currentQuestion.questionType === "multiple-choice" && (
                    <div>
                      {currentQuestion.options.map((option) => (
                        <Label
                          key={option.id}
                          className={`flex items-center px-4 py-2 rounded ${
                            examState.answers[currentQuestion.id] === option.id
                              ? "bg-[theme.accent] text-white"
                              : isMarked
                                ? "bg-[theme.soft] border border-[theme.accent]"
                                : "bg-white border border-[theme.border]"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={option.id}
                            checked={examState.answers[currentQuestion.id] === option.id}
                            onChange={() => submitAnswer(currentQuestion.id, option.id)}
                            className="hidden"
                          />
                          <span className="text-[0.5rem] text-[theme.inkSmall]">
                            {option.text}
                          </span>
                        </Label>
                      ))}
                    </div>
                  )}

                  {currentQuestion.questionType === "true-false" && (
                    <div className="grid grid-cols-2 gap-4">
                      <Label
                        className={`flex items-center px-4 py-2 rounded ${
                          examState.answers[currentQuestion.id] === "true"
                            ? "bg-[theme.accent] text-white"
                            : isMarked
                              ? "bg-[theme.soft] border border-[theme.accent]"
                              : "bg-white border border-[theme.border]"
                        }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value="true"
                            checked={examState.answers[currentQuestion.id] === "true"}
                            onChange={() => submitAnswer(currentQuestion.id, "true")}
                            className="hidden"
                          />
                          <span>True</span>
                        </Label>
                        <Label
                          className={`flex items-center px-4 py-2 rounded ${
                            examState.answers[currentQuestion.id] === "false"
                              ? "bg-[theme.accent] text-white"
                              : isMarked
                                ? "bg-[theme.soft] border border-[theme.accent]"
                                : "bg-white border border-[theme.border]"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value="false"
                            checked={examState.answers[currentQuestion.id] === "false"}
                            onChange={() => submitAnswer(currentQuestion.id, "false")}
                            className="hidden"
                          />
                          <span>False</span>
                        </Label>
                    </div>
                  )}

                  {currentQuestion.questionType === "fill-in-the-blank" && (
                    <div className="mb-4">
                      <label className="text-[0.5rem] text-[theme.inkSmall] mb-2">
                        Answer
                      </label>
                      <input
                        type="text"
                        value={examState.answers[currentQuestion.id] || ""}
                        onChange={(e) =>
                          submitAnswer(currentQuestion.id, e.target.value)
                        }
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent]"
                        placeholder="Your answer"
                      />
                    </div>
                  )}

                  {currentQuestion.questionType === "short-answer" && (
                    <div className="mb-4">
                      <label className="text-[0.5rem] text-[theme.inkSmall] mb-2">
                        Answer
                      </label>
<textarea
                        value={examState.answers[currentQuestion.id] || ""}
                        onChange={(e) =>
                          submitAnswer(currentQuestion.id, e.target.value)
                        }
                        className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent] h-20 resize-none"
                        placeholder="Your answer"
                      >
                      </textarea>
                    </div>
                  )}

                  {currentQuestion.questionType === "multiple-select" && (
                    <div>
                      {currentQuestion.options.map((option) => (
                        <Label
                          key={option.id}
                          className={`flex items-center px-4 py-2 rounded ${
                            examState.answers[currentQuestion.id]?.includes(option.id)
                              ? "bg-[theme.accent] text-white"
                              : isMarked
                                ? "bg-[theme.soft] border border-[theme.accent]"
                                : "bg-white border border-[theme.border]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            name={`question-${currentQuestion.id}`}
                            value={option.id}
                            checked={examState.answers[currentQuestion.id]?.includes(option.id)}
                            onChange={() => {
                              const existing = examState.answers[currentQuestion.id] || [];
                              const isSelected = existing.includes(option.id);
                              const newSelection = isSelected
                                ? existing.filter((id) => id !== option.id)
                                : [...existing, option.id];
                              submitAnswer(currentQuestion.id, newSelection);
                            }}
                            className="hidden"
                          />
                          <span className="text-[0.5rem] text-[theme.inkSmall]">
                            {option.text}
                          </span>
                        </Label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between pt-6 border-t border-[theme.border]">
              {/* Previous button */}
              {examState.currentQuestionIndex > 0 && (
                <button
                  onClick={prevQuestion}
                  className="px-4 py-2 rounded bg-[theme.soft] border border-[theme.border] hover:bg-[theme.soft] transition-colors text-[0.5rem]"
                  disabled={!examState.isActive}
                >
                  Previous
                </button>
              )}

              {/* Next/Submit button */}
              {examState.currentQuestionIndex < examState.questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="px-4 py-2 rounded bg-[theme.accent] text-white hover:bg-[theme.accentStrong] transition-colors text-[0.5rem] font-medium"
                  disabled={!examState.isActive}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => completeExam(true)}
                  className="px-4 py-2 rounded bg-[theme.accent] text-white hover:bg-[theme.accentStrong] transition-colors text-[0.5rem] font-medium"
                  disabled={!examState.isActive}
                >
                  Submit Examination
                </button>
              )}
            </div>
          </div>
        )}

        {/* Results Summary */}
        {examState.completed && examState.results && (
          <div className="rounded-lg bg-[theme.soft] border border-[theme.border] p-6 md:p-8 mb-8">
            <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-4">
              Examination Results
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked">Score</p>
                <p className="text-2xl font-bold text-[theme.accent]">
                  {examState.results.correctAnswers} / {examState.results.totalQuestions}
                </p>
                <p className="text-[0.5rem] text-[theme.inkSmall]">
                  {examState.results.percentage}%</p>
              </div>
              <div>
                <p className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked">Time Taken</p>
                <p className="text-2xl font-bold text-[theme.accent]">
                  {formatTime(examState.results.timeTaken)}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked">Accuracy</p>
              <progress
                className="w-48 h-2 rounded-full appearance-none bg-[theme.soft] border border-[theme.border]"
                value={examState.results.percentage}
                max={100}
              />
              <span className="text-[0.5rem] text-[theme.inkSmall] right-0">
                {examState.results.percentage}% accurate
              </span>
            </div>
            <Button
              variant="link"
              size="sm"
              className="mt-4 w-full text-[theme.accent] hover:text-[theme.accentStrong] transition-colors"
              onClick={() => router.push("/ascend/exam-preparation")}
            >
              Take Another Test
            </Button>
            <Button
              variant="link"
              size="sm"
              className="mt-2 w-full text-[theme.accent] hover:text-[theme.accentStrong] transition-colors"
              onClick={() => router.push("/ascend/progress")}
            >
              View Progress
            </Button>
          </div>
        )}

        {/* Revision Recommendations */}
        <div className="rounded-lg bg-[theme.soft] border border-[theme.border] p-6 md:p-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Revision Recommendations
          </h2>
          <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
            Based on your performance, focus on these areas:
          </p>
          <ul className="space-y-3">
            <li className="p-3 rounded bg-white border border-[theme.border]">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-[theme.accent] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                <div>
                  <span className="text-[0.5rem] font-medium">Kinematics problems</span>
                  <span className="text-[0.4rem] text-[theme.inkSmall] opacity-60">— Practice equations of motion</span>
                </div>
              </div>
            </li>
            <li className="p-3 rounded bg-white border border-[theme.border]">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-[theme.accent] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                <div>
                  <span className="text-[0.5rem] font-medium">Chemical bonding</span>
                  <span className="text-[0.4rem] text-[theme.inkSmall] opacity-60">— Review ionic and covalent</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}