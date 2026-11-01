"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockQuestions } from "@/content/assessment";
import { UniversityTheme, universes, getUniverse } from "@/components/common/university-theme";
import type { UniverseId } from "@/types/theme";

interface AssessmentIntroProps {
  studentName?: string;
  classLevel?: string;
}

export function AssessmentIntroPage({ studentName, classLevel }: AssessmentIntroProps) {
  // Determine universe from class level
  const universeId: UniverseId = classLevel
    ? classLevel.startsWith("1") || classLevel.startsWith("2") || classLevel.startsWith("3") || classLevel.startsWith("4") || classLevel.startsWith("5")
      ? "junior"
      : classLevel.startsWith("6") || classLevel.startsWith("7") || classLevel.startsWith("8") || classLevel.startsWith("9") || classLevel.startsWith("10")
        ? "nexus"
        : "ascend"
    : "nexus";

  const universe = getUniverse(universeId);

  const questionCount = mockQuestions.length;
  const estimatedDuration = Math.ceil(mockQuestions.length * 0.75); // ~45 seconds per question

  const handleStartAssessment = () => {
    // Navigate to subject selection or directly to assessment
    window.location.href = "/assessment/subjects";
  };

  return (
    <Container size="default">
      <SectionHeading
        eyebrow="Diagnostic Assessment"
        title="Knowledge Assessment"
        description="Let's understand your current knowledge level"
      />

      <div className="min-h-[500px] flex flex-col items-center justify-center pb-12">
        <div className="text-center space-y-8">
          {/* Student info banner */}
          <div className="bg-[var(--universe-surface)] border border-[var(--universe-border)] rounded-2xl p-6 mb-8 max-w-md w-full">
            <h2 className="font-display text-[clamp(1.5rem,4vw,1.8rem)] font-semibold text-ink mb-2">
              {studentName ? `Welcome, ${studentName}` : "Welcome"}
            </h2>
            <p className="text-text-soft/text-lg">
              {classLevel ? `Class ${classLevel}` : "Select your class"}
            </p>
            <UniversityTheme universe={universeId}>
              <p className="text-sm text-text-soft/60">
                {universe.shortName} Universe
              </p>
            </UniversityTheme>
          </div>

          {/* Assessment overview */}
          <div className="bg-[var(--universe-surface)] rounded-2xl p-6 max-w-md w-full border border-[var(--universe-border)]">
            <h3 className="font-medium text-ink mb-4">
              Assessment Overview
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-ink/80 mb-2">Assigned Universe:</p>
                <p className="font-medium">{universe.shortName}</p>
              </div>
              <p className="text-ink/80 mb-2">Questions:</p>
              <p className="font-medium">{questionCount}</p>
              <p className="text-ink/80 mb-2">Estimated Duration:</p>
              <p className="font-medium">{estimatedDuration} minutes</p>
            </div>
          </div>

          {/* Purpose text */}
          <div className="bg-[var(--universe-surface--light)] rounded-xl p-6 text-center max-w-md w-full mt-8">
            <p className="text-text-soft/70 mb-4">
              This short assessment helps us understand your current knowledge level in
              selected subjects. Your responses will identify areas of strength and topics
              requiring additional practice, allowing SHATRA to create a personalized
              learning journey tailored to your needs.
            </p>
            <button
              onClick={handleStartAssessment}
              className="btn-primary mt-6 w-full"
            >
              Start Assessment
            </button>
          </div>

          {/* Age-appropriate messaging */}
          <UniversityTheme universe={universeId}>
            <p className="text-xs text-text-soft/60 mt-4">
              {universeId === "junior"
                ? "Don't worry—this is just to help us learn how you learn best!"
                : universeId === "nexus"
                ? "Think of this as a mission to discover your learning strengths!"
                : "This assessment will help us chart your academic path forward."}
            </p>
          </UniversityTheme>
        </div>
      </div>
    </Container>
  );
}