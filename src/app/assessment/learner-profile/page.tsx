"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { UniversityTheme, universes, getUniverse } from "@/components/common/university-theme";
import type { UniverseId } from "@/types/theme";
import { mockQuestions } from "@/content/assessment";

interface AssessmentLearnerProfileProps {
  classLevel: string;
  score: number;
  total: number;
  timeTaken: string;
}

export function AssessmentLearnerProfilePage({
  classLevel,
  score,
  total,
  timeTaken,
}: AssessmentLearnerProfileProps) {
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

  // Subject performance analysis
  const subjectAccuracies: Record<string, number> = {};
  mockQuestions.forEach((q, i) => {
    const qClass = parseInt(q.classLevel || "4");
    if (qClass >= 6 && qClass <= 8) {
      subjectAccuracies.science = (subjectAccuracies.science || 0) + 1;
    }
    if (qClass >= 9 && qClass <= 10) {
      subjectAccuracies.science = (subjectAccuracies.science || 0) + 1;
    }
    if (qClass >= 11) {
      subjectAccuracies.mathematics = (subjectAccuracies.mathematics || 0) + 1;
    }
  });

  // Normalize subject accuracies
  Object.keys(subjectAccuracies).forEach((key) => {
    subjectAccuracies[key] = Math.round((subjectAccuracies[key] / mockQuestions.length) * 100);
  });

  // Strong/developing/needs practice classification
  const subjectClassification: Record<string, "strong" | "developing" | "needs-practice"> = {
    mathematics: percentage >= 80 ? "strong" : percentage >= 50 ? "developing" : "needs-practice",
    science: (subjectAccuracies.science || 60) >= 80 ? "strong" : (subjectAccuracies.science || 60) >= 50 ? "developing" : "needs-practice",
    english: percentage >= 80 ? "strong" : percentage >= 50 ? "developing" : "needs-practice",
  };

  // Strong subjects (80-100%)
  const strongSubjects: string[] = [];
  // Developing subjects (50-79%)
  const developingSubjects: string[] = [];
  // Needs practice (<50%)
  const needsPracticeSubjects: string[] = [];

  Object.entries(subjectClassification).forEach(([subject, classification]) => {
    switch (classification) {
      case "strong":
        strongSubjects.push(subject);
        break;
      case "developing":
        developingSubjects.push(subject);
        break;
      case "needs-practice":
        needsPracticeSubjects.push(subject);
        break;
    }
  });

  // Topic recommendations based on assessed performance
  const topicRecommendations = [
    ...(strongSubjects.length > 0 && strongSubjects.includes("mathematics")
      ? [{ topic: "Algebraic reasoning", action: "Advanced practice problems" }]
      : []),
    ...(developingSubjects.length > 0 && developingSubjects.includes("science")
      ? [{ topic: "Cell structure and functions", action: "Review and practice diagrams" }]
      : []),
    ...(needsPracticeSubjects.length > 0 && needsPracticeSubjects.includes("mathematics")
      ? [{ topic: "Fractions and decimals", action: "Fundamental practice exercises" }]
      : []),
  ];

  // Learning priorities
  const learningPriorities = [
    ...(strongSubjects.length > 0
      ? ["Maintain and extend strengths in strong subjects"]
      : []),
    ...(developingSubjects.length > 0
      ? ["Allocate weekly practice time for developing subjects"]
      : []),
    ...(needsPracticeSubjects.length > 0
      ? ["Focus on foundational concepts before advancing"]
      : []),
  ];

  const elapsedTime = elapsedMinutes > 0
    ? `${elapsedMinutes}:${elapsedSeconds.toString().padStart(2, "0")}`
    : `${elapsedSeconds}s`;

  return (
    <Container size="default">
      <SectionHeading
        eyebrow="Learner Profile"
        title="Your Learning Profile"
        description="Personalized insights based on your assessment performance"
      />

      <div className="pace-step">
        {/* Universe banner */}
        <UniversityTheme universe={universeId}>
          <div className="bg-[var(--universe-surface)] rounded-2xl p-6 mb-6 border border-[var(--universe-border)]">
            <h3 className="font-display text-[clamp(1.5rem,4vw,1.8rem)] font-semibold text-ink mb-2">
              {universe.name}
            </h3>
            <p className="text-sm text-text-soft/60">
              Assigned Universe: {universe.shortName}
            </p>
            <p className="text-xs text-text-soft/50">
              {universe.description}
            </p>
          </div>
        </UniversityTheme>

        {/* Score summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-md bg-[var(--universe-surface)] border border-[var(--universe-border)]">
            <p className="text-3xl font-bold text-ink">{percentage}%</p>
            <p className="text-xs text-text-soft/60">Accuracy</p>
          </div>
          <div className="p-4 rounded-md bg-[var(--universe-surface)] border border-[var(--universe-border)]">
            <p className="text-xl font-bold text-ink">{timeTaken}</p>
            <p className="text-xs text-text-soft/60">Time Taken</p>
          </div>
        </div>

        {/* Strong / Developing / Needs Practice breakdown */}
        <div className="grid grid-cols-3 gap-3 mb-6" style={{ maxWidth: "unset" }}>
          <div
            className={cn(
              "p-4 rounded-md text-center",
              percentage >= 80 ? "bg-primary/10 border-primary text-primary" : "",
              percentage >= 50 ? "bg-warning/10 border-warning text-warning" : "",
              percentage < 50 ? "bg-error/10 border-error text-error" : ""
            )}
          >
            <p className="text-2xl font-bold text-ink">{strongSubjects.length}</p>
            <p className="text-xs text-text-soft/60">Strong</p>
          </div>
          <div
            className={cn(
              "p-4 rounded-md text-center",
              developingSubjects.length > 0 ? "bg-primary/10 border-primary text-primary" : "bg-border-soft text-text",
              developingSubjects.length === 0 ? "opacity-50" : ""
            )}
          >
            <p className="text-2xl font-bold text-ink">{developingSubjects.length}</p>
            <p className="text-xs text-text-soft/60">Developing</p>
          </div>
          <div
            className={cn(
              "p-4 rounded-md text-center",
              needsPracticeSubjects.length > 0 ? "bg-error/10 border-error text-error" : "bg-border-soft text-text",
              needsPracticeSubjects.length === 0 ? "opacity-50" : ""
            )}
          >
            <p className="text-2xl font-bold text-ink">{needsPracticeSubjects.length}</p>
            <p className="text-xs text-text-soft/60">Needs Practice</p>
          </div>
        </div>

        {/* Strong subjects */}
        {strongSubjects.length > 0 && (
          <div className="bg-[var(--universe-surface)] rounded-2xl p-6 mb-6 border border-[var(--universe-border)]">
            <p className="text-sm text-text-soft/60 mb-3">Strong Subjects (80–100%)</p>
            <div className="grid grid-cols-2 gap-2" style={{ maxWidth: "unset" }}>
              {strongSubjects.map((subject) => (
                <span key={subject} className="px-2 py-1 rounded text-xs font-medium text-primary">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Developing subjects */}
        {developingSubjects.length > 0 && (
          <div className="bg-[var(--universe-surface)] rounded-2xl p-6 mb-6 border border-[var(--universe-border)]">
            <p className="text-sm text-text-soft/60 mb-3">Developing Subjects (50–79%)</p>
            <div className="grid grid-cols-2 gap-2" style={{ maxWidth: "unset" }}>
              {developingSubjects.map((subject) => (
                <span key={subject} className="px-2 py-1 rounded text-xs font-medium text-primary">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Needs practice subjects */}
        {needsPracticeSubjects.length > 0 && (
          <div className="bg-[var(--universe-surface)] rounded-2xl p-6 mb-6 border border-[var(--universe-border)]">
            <p className="text-sm text-text-soft/60 mb-3">Needs More Practice (below 50%)</p>
            <div className="grid grid-cols-2 gap-2" style={{ maxWidth: "unset" }}>
              {needsPracticeSubjects.map((subject) => (
                <span key={subject} className="px-2 py-1 rounded text-xs font-medium text-error">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Topic recommendations */}
        {topicRecommendations.length > 0 && (
          <div className="bg-[var(--universe-surface)] rounded-2xl p-6 mb-6 border border-[var(--universe-border)]">
            <p className="text-sm text-text-soft/60 mb-3">Recommended Topics</p>
            <ul className="space-y-2">
              {topicRecommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary/80">{rec.topic}: </span>
                  <span className="text-text-soft/70 text-sm">{rec.action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Learning priorities */}
        {learningPriorities.length > 0 && (
          <div className="bg-[var(--universe-surface)] rounded-2xl p-6 mb-6 border border-[var(--universe-border)]">
            <p className="text-sm text-text-soft/60 mb-3">Learning Priorities</p>
            <ul className="space-y-2">
              {learningPriorities.map((priority, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary/80">• </span>
                  <span className="text-text-soft/70 text-sm">{priority}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-8 pt-6 border-t border-border-soft flex gap-3">
          <Button
            variant="outline"
            onClick={() => window.location.href = "/assessment/results"}
          >
            View Results
          </Button>
          <Button
            variant="primary"
            onClick={() => window.location.href = "/"}
          >
            Continue to Learning Journey
          </Button>
        </div>
      </div>
    </Container>
  );
}