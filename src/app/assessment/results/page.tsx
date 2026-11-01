"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockQuestions } from "@/content/assessment";
import { UniversityTheme, universes, getUniverse } from "@/components/common/university-theme";
import type { UniverseId } from "@/types/theme";

interface AssessmentResultsProps {
  classLevel: string;
  score: number;
  total: number;
  timeTaken: string;
}

export function AssessmentResultsPage({
  classLevel,
  score,
  total,
  timeTaken,
}: AssessmentResultsProps) {
  const percentage = Math.round((score / total) * 100);
  const elapsedMinutes = parseInt(timeTaken.split(":")[0]) || 0;
  const elapsedSeconds = parseInt(timeTaken.split(":")[1]) || 0;

  // Determine universe
  const universeId = classLevel
    ? classLevel.startsWith("1") || classLevel.startsWith("2") || classLevel.startsWith("3") || classLevel.startsWith("4") || classLevel.startsWith("5")
      ? "junior"
      : classLevel.startsWith("6") || classLevel.startsWith("7") || classLevel.startsWith("8") || classLevel.startsWith("9") || classLevel.startsWith("10")
        ? "nexus"
        : "ascend"
    : "nexus";
  const universe = getUniverse(universeId);

  // Subject performance analysis (mock based on assessed questions)
  const subjectPerformance = {
    mathematics: Math.round((score / total) * 100),
    science: Math.round(((score / total) * 100) * 0.9),
    english: Math.round(((score / total) * 100) * 0.8),
  };

  // Topic-wise analysis
  const topicAnalysis = [
    { topic: "Fundamentals", accuracy: Math.max(0, percentage - 15), total: 10 },
    { topic: "Applications", accuracy: Math.max(0, percentage - 30), total: 8 },
    { topic: "Advanced", accuracy: Math.max(0, percentage - 50), total: 7 },
  ];

  // Difficulty-wise performance
  const difficultyPerformance = [
    { level: "Easy", accuracy: Math.round(percentage * 1.1), count: Math.floor(total * 0.4) },
    { level: "Medium", accuracy: Math.round(percentage * 0.9), count: Math.floor(total * 0.35) },
    { level: "Hard", accuracy: Math.round(percentage * 0.7), count: Math.floor(total * 0.25) },
  ];

  const classifyStrength = (percentage: number) => {
    if (percentage >= 80) return "Strong understanding";
    if (percentage >= 50) return "Developing understanding";
    return "Needs more practice";
  };

  const strengthClass = classifyStrength(percentage);

  return (
    <Container size="default">
      <SectionHeading
        eyebrow="Assessment Complete"
        title="Results"
        description="Here's how you performed in the assessment"
      />

      <div className="pace-step">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-6 rounded-2xl bg-[var(--universe-surface)] border border-[var(--universe-border)]">
            <p className="text-3xl font-bold text-ink">{percentage}%</p>
            <p className="text-sm text-text-soft/60 mt-1">Accuracy</p>
            <p className="text-xs text-text-soft/50 mt-1">of {score}/{total}</p>
          </div>
          <div className="p-6 rounded-2xl bg-[var(--universe-surface)] border border-[var(--universe-border)]">
            <p className="text-2xl font-bold text-ink">{timeTaken}</p>
            <p className="text-sm text-text-soft/60 mt-1">Time Taken</p>
          </div>
        </div>

        {/* Strength classification */}
        <div className="bg-[var(--universe-surface)] rounded-2xl p-6 mb-6 border border-[var(--universe-border)]">
          <p className="text-sm text-text-soft/60 mb-3">Strength Classification</p>
          <p className="font-display text-[clamp(1.2rem,3vw,1.5rem)] font-semibold text-ink">
            {strengthClass}
          </p>
          <UniversityTheme universe={universeId}>
            <p className="text-xs text-text-soft/60 mt-2">
              {universeId === "junior"
                ? "Keep exploring and learning!"
                : universeId === "nexus"
                ? "Good progress! Your learning journey is just beginning."
                : "Excellent foundation for advanced studies."}
            </p>
          </UniversityTheme>
        </div>

        {/* Subject performance breakdown */}
        <div>
          <p className="text-sm text-text-soft/60 mb-4">Subject-wise Performance</p>
          <div className="grid grid-cols-3 gap-3" style={{ maxWidth: "unset" }}>
            {Object.entries(subjectPerformance).map(([subject, acc]) => (
              <div key={subject} className="p-3 rounded-md bg-[var(--universe-surface)] border border-[var(--universe-border)]">
                <p className="text-xs text-text-soft/60 mb-1">{subject.charAt(0).toUpperCase() + subject.slice(1)}</p>
                <div className="h-2 rounded-full bg-border-soft overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-width"
                    style={{ width: `${acc}%` }}
                  ></div>
                </div>
                <p className="text-xs text-text-soft/60 text-right">{acc}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Topic analysis */}
        <div className="mt-6 pt-6 border-t border-border-soft">
          <p className="text-sm text-text-soft/60 mb-4">Topic Analysis</p>
          <div className="grid grid-cols-3 gap-3" style={{ maxWidth: "unset" }}>
            {topicAnalysis.map((topic) => (
              <div key={topic.topic} className="p-3 rounded-md bg-[var(--universe-surface)] border border-[var(--universe-border)]">
                <p className="text-xs text-text-soft/60 mb-1">{topic.topic}</p>
                <div className="h-2 rounded-full bg-border-soft overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-width"
                    style={{ width: `${topic.accuracy}%` }}
                  ></div>
                </div>
                <p className="text-xs text-text-soft/60 text-right">{topic.accuracy}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty analysis */}
        <div className="mt-6 pt-6 border-t border-border-soft">
          <p className="text-sm text-text-soft/60 mb-4">Difficulty-wise Performance</p>
          <div className="grid grid-cols-3 gap-3" style={{ maxWidth: "unset" }}>
            {difficultyPerformance.map((diff) => (
              <div key={diff.level} className="p-3 rounded-md bg-[var(--universe-surface)] border border-[var(--universe-border)]">
                <p className="text-xs text-text-soft/60 mb-1">{diff.level}</p>
                <div className="h-2 rounded-full bg-border-soft overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-width"
                    style={{ width: `${diff.accuracy}%` }}
                  ></div>
                </div>
                <p className="text-xs text-text-soft/60 text-right">{diff.accuracy}%</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 pt-8 border-t border-border-soft">
          <p className="text-sm text-text-soft/60 mb-4">Personalized Recommendations</p>
          <ul className="space-y-3">
            {percentage >= 80 && (
              <li>
                <p className="font-medium text-ink">Strengths confirmed:</p>
                <p className="text-text-soft/70">Continue advancing in your strong subjects</p>
              </li>
            )}
            {percentage < 80 && percentage >= 50 && (
              <li>
                <p className="font-medium text-ink">Areas to focus:</p>
                <p className="text-text-soft/70">Review topics with accuracy below 80%</p>
              </li>
            )}
            {percentage < 50 && (
              <li>
                <p className="font-medium text-ink">Priority areas:</p>
                <p className="text-text-soft/70">Focus on foundational concepts first</p>
              </li>
            )}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="mt-8 pt-6 border-t border-border-soft flex gap-3">
          <Button
            variant="outline"
            onClick={() => window.location.href = "/assessment/learner-profile"}
          >
            View Learner Profile
          </Button>
          <Button
            variant="primary"
            onClick={() => window.location.href = "/"}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </Container>
  );
}