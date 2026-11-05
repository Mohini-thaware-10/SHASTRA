"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BrandMark } from "@/components/common/brand-mark";
import { Container } from "@/components/common/container";
import { getUniverse } from "@/config/themes";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getSubjectOverviewCards } from "@/lib/dashboard/mock-data";
import { GPProgress } from "@/types/dashboard";

export default function AscendCommerceDashboard() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const router = useRouter();

  useEffect(() => {
    const classNum = 11;
    const stream = "commerce";
    const profile = getLearnerProfile(classNum, stream, "CBSE");
    setLearnerProfile(profile);
  }, []);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading commerce dashboard...</p>
      </div>
    );
  }

  const theme = getUniverse("ascend");
  const subjectCards = getSubjectOverviewCards(learnerProfile);

  // Commerce-specific subjects: Accountancy, Business Studies, Economics
  const commerceSubjects = ["Accountancy", "Business Studies", "Economics"];

  return (
    <div className="min-h-screen bg-[theme.background] text-[theme.textColor]">
      <Container className="max-w-[1600px] mx-auto p-4 md:p-6">
        {/* Commerce-specific header */}
        <div className="rounded-xl bg-[theme.soft] border border-[theme.border] p-6 md:p-8 mb-8">
          <BrandMark className="mb-4" />
          <h1 className="text-2xl font-display font-bold text-[theme.accent] tracking-wider">
            Commerce Stream
          </h1>
          <p className="text-[0.875rem] text-[theme.inkSmall] mt-1">
            Marcus Chen • Class {learnerProfile.currentClass} • Commerce stream
          </p>
          <p className="text-[0.5rem] text-[theme.inkSmall]">
            Board: {learnerProfile.board} • Academic Year 2024–2025
          </p>
        </div>

        {/* Subject Progress Cards - Commerce */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-8">
          {commerceSubjects.map((subject) => {
            const card = subjectCards.find((s) => s.name === subject);
            if (!card) return null;
            return (
              <div
                key={subject}
                className="rounded-lg bg-white border border-[theme.border] p-4 hover:bg-[theme.soft] transition-colors">
                <span className="text-[0.625rem] text-[theme.inkSmall] block mb-1">{subject}</span>
                <div className="h-2 rounded-full bg-[theme.soft] overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-[theme.accent] transition-all duration-500"
                    style={{ width: `${card.progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-[0.55rem] text-[theme.inkSmall] mb-1">
                  {card.topicsCompleted}/{card.totalTopics} topics
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-[theme.accent] hover:text-[theme.accentStrong] transition-colors w-full"
                >
                  Continue
                </Button>
              </div>
            );
          })}
        </div>

        {/* Commerce-specific learning areas */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <h3 className="text-[0.55rem] text-[theme.inkSmall] uppercase tracked mb-3">Accounting Problems</h3>
            <p className="text-[0.5rem] text-[theme.inkSmall]">
              Journal entries, ledger practice and financial calculations.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-[theme.accent] hover:text-[theme.accentStrong] transition-colors"
            >
              Solve Accounting Problem
            </Button>
          </div>
          <div>
            <h3 className="text-[0.55rem] text-[theme.inkSmall] uppercase tracked mb-3">Business Case Studies</h3>
            <p className="text-[0.5rem] text-[theme.inkSmall]">
              Real-world business scenario analysis and decision-making.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-[theme.accent] hover:text-[theme.accentStrong] transition-colors"
            >
              View Case Study
            </Button>
          </div>
        </div>

        {/* Subject-specific progress */}
        <div className="mb-8">
          <h3 className="text-[0.55rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Subject Progress
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {commerceSubjects.map((subject) => {
              const card = subjectCards.find((s) => s.name === subject);
              if (!card) return null;
              return (
                <div key={subject} className="p-2">
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
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {["Accountancy", "Business Studies", "Economics"].map((subject) => (
            <div key={subject} className="p-3 bg-[theme.soft] rounded-lg border border-[theme.border]">
              <Button
                variant="link"
                size="sm"
                className="text-[theme.accent] w-full"
              >
                {subject} Activities
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}