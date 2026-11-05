"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/common/container";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { GPProgress } from "@/types/dashboard";
import { getUniverse } from "@/config/themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/dashboard/DailyGoalCard";

export default function AscendRevisionCentre() {
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
        <p>Loading revision centre...</p>
      </div>
    );
  }

  const theme = getUniverse("ascend");

  // Identify weak topics based on subject progress
  const subjectCards = getSubjectOverviewCards(learnerProfile);
  const weakTopics = subjectCards
    .filter((card) => card.masteryClassification === "building")
    .map((card) => card.name);

  return (
    <div className="min-h-screen bg-[theme.background] text-[theme.textColor]">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Revision Centre Header */}
        <div className="rounded-xl bg-[theme.soft] border border-[theme.border] p-6 md:p-8 mb-8">
          <h1 className="text-2xl font-display font-bold text-[theme.accent] tracking-wider">
            Revision Centre
          </h1>
          <p className="text-[0.875rem] text-[theme.inkSmall] mt-1">
            Review previously incorrect questions and weak topics
          </p>
          <p className="text-[0.5rem] text-[theme.inkSmall]">
            Class {learnerProfile.currentClass} • {learnerProfile.stream.toUpperCase()} stream
          </p>
        </div>

        {/* Weak Topics Section */}
        {weakTopics.length > 0 && (
          <div className="rounded-lg bg-white border border-[theme.border] p-6 mb-8">
            <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
              Weak Topics
            </h2>
            <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
              Focus on these areas based on your progress
            </p>
            <ul className="space-y-3">
              {weakTopics.map((subject) => (
                <li key={subject} className="p-3 rounded bg-[theme.soft] border border-[theme.border]">
                  <div className="flex items-between justify-between">
                    <span className="text-[0.5rem] text-[theme.inkSmall]">{subject}</span>
                    <span className="text-[0.5rem] text-[theme.accent]">Needs revision</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Previously Incorrect Questions */}
        <div className="rounded-lg bg-white border border-[theme.border] p-6 mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Previously Incorrect Questions
          </h2>
          <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
            Questions you got wrong in previous attempts
          </p>
          <ul className="space-y-3 max-h-[400px] overflow-y-auto">
            <li className="p-3 rounded bg-[theme.soft] border border-[theme.border]">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-[theme.accent] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                <div>
                  <span className="text-[0.5rem] font-medium">Math - Algebra problem</span>
                  <span className="text-[0.4rem] text-[theme.inkSmall] opacity-60">— Incorrect answer: selected 3, correct: 5</span>
                </div>
              </div>
            </li>
            <li className="p-3 rounded bg-[theme.soft] border border-[theme.border]">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-[theme.accent] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                <div>
                  <span className="text-[0.5rem] font-medium">Chemistry - Bonding question</span>
                  <span className="text-[0.4rem] text-[theme.inkSmall] opacity-60">— Incorrect answer</span>
                </div>
              </div>
            </li>
          </ul>
          <Button
            variant="link"
            size="sm"
            className="mt-4 w-full text-[theme.accent] hover:text-[theme.accentStrong] transition-colors"
          >
            Review All Incorrect Answers
          </Button>
        </div>

        {/* Bookmarked Concepts */}
        <div className="rounded-lg bg-white border border-[theme.border] p-6 mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Bookmarked Concepts
          </h2>
          <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
            Concepts you've bookmarked for later review
          </p>
          <ul className="space-y-3">
            <li className="p-3 rounded bg-[theme.soft] border border-[theme.border]">
              <div className="flex items-center justify-between">
                <span className="text-[0.5rem] text-[theme.inkSmall]">Law of Conservation of Energy</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-[theme.accent] text-[0.5rem]"
                >
                  Revise
                </Button>
              </div>
            </li>
            <li className="p-3 rounded bg-[theme.soft] border border-[theme.border]">
              <div className="flex items-center justify-between">
                <span className="text-[0.5rem] text-[theme.inkSmall]">Quadratic Formula</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-[theme.accent] text-[0.5rem]"
                >
                  Revise
                </Button>
              </div>
            </li>
          </ul>
        </div>

        {/* Revision Exercises */}
        <div className="rounded-lg bg-white border border-[theme.border] p-6">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Revision Exercises
          </h2>
          <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
            Quick revision exercises per subject
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-3 rounded bg-[theme.soft] border border-[theme.border] hover:bg-white transition-colors">
                <Button
                  variant="link"
                  size="sm"
                  className="text-[theme.accent] w-full text-[0.5rem]"
                >
                  Exercise {i + 1}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Subject-wise Revision Progress */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[...Array(6)].map((_, i) => {
            const subjects = ["Physics", "Chemistry", "Mathematics", "Biology", "Accountancy", "Business Studies"];
            const subject = subjects[i];
            const card = subjectCards.find((s) => s.name === subject);
            if (!card) return null;
            return (
              <div
                key={subject}
                className="p-2">
                <span className="text-[0.5rem] text-[theme.inkSmall] block mb-1">{subject}</span>
                <progress
                  className="w-32 h-2 rounded-full appearance-none bg-[theme.soft] border border-[theme.border]"
                  value={card.progressPercentage}
                  max={100}
                />
                <span className="text-[0.5rem] text-[theme.inkSmall] right-0">
                  {card.progressPercentage}% complete
                </span>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="rounded-lg bg-[theme.soft] border border-[theme.border] p-8 text-center mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-4">
            Keep Up Your Revision
          </h2>
          <p className="text-[0.5rem] text-[theme.inkSmall] mb-6">
            Regular revision helps strengthen memory and improve long-term retention of concepts.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
          >
            Start Revision Session
          </Button>
        </div>
      </Container>
    </div>
  );
}