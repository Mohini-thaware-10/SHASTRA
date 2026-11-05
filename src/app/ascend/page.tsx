"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/common/container";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";

import { BrandMark } from "@/components/common/brand-mark";
import { getUniverse } from "@/config/themes";
import { useObservable } from "@/lib/observables";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getSubjectOverviewCards, getRecommendations, getRecentActivityEvents, getLearningJourneyNodes } from "@/lib/dashboard/mock-data";
import { GPProgress } from "@/types/dashboard";
import { getDailyGoal } from "@/lib/dashboard/calculations";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/dashboard/DailyGoalCard";

export default function AscendAcademyHome() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const classNum = 11;
    const stream = "science";
    const profile = getLearnerProfile(classNum, stream, "CBSE");
    setLearnerProfile(profile);
  }, []);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading ascend dashboard...</p>
      </div>
    );
  }

  const dailyGoal = getDailyGoal(learnerProfile);
  const subjectCards = getSubjectOverviewCards(learnerProfile);
  const recommendations = getRecommendations(learnerProfile);
  const recentEvents = getRecentActivityEvents(learnerProfile);
  const journeyNodes = getLearningJourneyNodes(learnerProfile);
  const gamification: GPProgress = {
    totalXP: learnerProfile.totalXP,
    currentLevel: learnerProfile.currentLevel,
    currentStreak: learnerProfile.learningStreak,
    highestStreak: learnerProfile.highestStreak || learnerProfile.learningStreak,
    coins: learnerProfile.coins,
    recentlyUnlocked: [],
  };

  const theme = getUniverse("ascend");

  return (
    <div className="min-h-screen bg-[theme.background] text-[theme.textColor]">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Academic Welcome */}
        <div className="rounded-xl bg-[theme.soft] border border-[theme.border] p-6 md:p-8 mb-8">
          <BrandMark className="mb-4" />
          <h1 className="text-2xl font-display font-bold text-[theme.accent] tracking-wider">
            {learnerProfile.fullName}
          </h1>
          <p className="text-[0.875rem] text-[theme.inkSmall] mt-1">
            Your academic journey continues
          </p>
          <p className="text-[0.55rem] text-[theme.inkSmall] uppercase tracked mb-2">
            Class {learnerProfile.currentClass} • {learnerProfile.stream.toUpperCase()} stream
          </p>
          <p className="text-[0.5rem] text-[theme.inkSmall]">
            Board: {learnerProfile.board} • Academic Year 2024–2025
          </p>
        </div>

        {/* Academic Overview */}
        <div className="rounded-lg bg-[theme.soft] border border-[theme.border] p-5 md:p-6 mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Academic Overview
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[0.55rem] text-[theme.inkSmall] uppercase tracked">Overall Progress</p>
              <progress
                className="w-24 h-2 rounded-full appearance-none bg-[theme.soft] border border-[theme.border]"
                value={subjectCards.length > 0 ? Math.round(subjectCards.reduce((acc, s) => acc + s.progressPercentage, 0) / subjectCards.length) : 0} || 0
                max={100}
              />
              <span className="text-[0.55rem] text-[theme.inkSmall] right-0">
                {subjectCards.length > 0 ? Math.round(subjectCards.reduce((acc, s) => acc + s.progressPercentage, 0) / subjectCards.length) : 0}% complete
              </span>
            </div>
            <div>
              <p className="text-[0.55rem] text-[theme.inkSmall] uppercase tracked">Study Streak</p>
              <p className="text-[0.875rem] font-medium text-[theme.accent]">
                {gamification.currentStreak} days
              </p>
            </div>
          </div>
        </div>

        {/* Stream Navigation */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {["Science", "Commerce", "Arts"].map((streamName) => (
            <div
              key={streamName}
              className="rounded-lg bg-white border border-[theme.border] p-4 hover:bg-[theme.soft] transition-colors">
                <h3 className="text-[0.55rem] text-[theme.inkSmall] uppercase tracked mb-2">
                  {streamName}
                </h3>
                <p className="text-[0.5rem] text-[theme.inkSmall]">
                  {learnerProfile.stream === streamName.toLowerCase() ? "Current stream" : "Select stream"}
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-[theme.accent] hover:text-[theme.accentStrong] transition-colors w-full"
                >
                  View Dashboard
                </Button>
              </div>
          ))}
        </div>

        {/* Subject Workspace */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {subjectCards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg bg-white border border-[theme.border] p-4 hover:bg-[theme.soft] transition-colors">
                <span className="text-[0.625rem] text-[theme.inkSmall] block mb-1">{card.name}</span>
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
          ))}
        </div>

        {/* Exam Preparation Centre */}
        <div className="rounded-lg bg-[theme.soft] border border-[theme.border] p-5 md:p-6 mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Exam Preparation Centre
          </h2>
          <p className="text-[0.55rem] text-[theme.inkSmall] mb-3">
            Upcoming assessments and revision priorities
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Physics", "Chemistry", "Mathematics", "Accountancy", "Business Studies", "Economics", "History"].map((subject) => (
              <div key={subject} className="p-2">
                <span className="text-[0.55rem] text-[theme.inkSmall] block mb-1">{subject}</span>
                <progress
                  className="w-24 h-2 rounded-full appearance-none bg-[theme.soft] border border-[theme.border]"
                  value={subjectCards.find((s) => s.name === subject)?.progressPercentage} || 0
                  max={100}
                />
                <span className="text-[0.55rem] text-[theme.inkSmall] right-0">
                  {subjectCards.find((s) => s.name === subject)?.progressPercentage}% complete
                </span>
              </div>
            ))}
          </div>
          <p className="text-[0.55rem] text-[theme.inkSmall] mt-3">
            No official examination schedule configured. Practice sessions available per subject.
          </p>
        </div>

        {/* Study Planner */}
        <div className="rounded-lg bg-[theme.soft] border border-[theme.border] p-5 md:p-6 mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Study Planner
          </h2>
          <p className="text-[0.55rem] text-[theme.inkSmall] mb-3">
            Weekly study plan based on learning progress
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Physics", "Chemistry", "Mathematics", "Accountancy", "Business Studies", "Economics"].map((subject) => (
              <div key={subject} className="p-2">
                <span className="text-[0.55rem] text-[theme.inkSmall] block mb-1">Study {subject}</span>
                <progress
                  className="w-24 h-2 rounded-full appearance-none bg-[theme.soft] border border-[theme.border]"
                  value={subjectCards.find((s) => s.name === subject)?.progressPercentage} || 0
                  max={100}
                />
                <span className="text-[0.55rem] text-[theme.inkSmall] right-0">
                  {subjectCards.find((s) => s.name === subject)?.progressPercentage}% complete
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Gap Analysis */}
        <div className="rounded-lg bg-[theme.soft] border border-[theme.border] p-5 md:p-6">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Knowledge Gap Analysis
          </h2>
          <p className="text-[0.55rem] text-[theme.inkSmall] mb-3">
            Based on assessment results, focus areas:
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-1">
                <span className="text-[0.5rem] text-[theme.inkSmall] block xs:block">• Topic {i + 1}</span>
              </div>
            ))}
          </div>
          <p className="text-[0.55rem] text-[theme.inkSmall] mt-2">
            Focus on weaker areas for improved understanding.
          </p>
        </div>

        {/* Achievements */}
        <div className="mt-8 grid grid-cols-4 gap-2">
          <div className="p-2 text-center">
            <span className="text-2xl text-[theme.accent]">🏆</span>
            <p className="text-[0.55rem] text-[theme.inkSmall]">Level {gamification.currentLevel}</p>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl text-[theme.accent]">💰</span>
            <p className="text-[0.55rem] text-[theme.inkSmall]">Coins: {gamification.coins}</p>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl text-[theme.accent]">🔥</span>
            <p className="text-[0.55rem] text-[theme.inkSmall]">Streak: {gamification.currentStreak}</p>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl text-[theme.accent]">📜</span>
            <p className="text-[0.55rem] text-[theme.inkSmall]">Recent: {gamification.recentlyUnlocked[0] || "Keep going!"}</p>
          </div>
        </div>

        {/* Journey Progression */}
        {journeyNodes.map((node) => (
          <div
            key={node.id}
            className="mt-6 p-4 rounded-lg bg-white border border-[theme.border]"
            style={{ borderColor: node.stage === "completed" ? theme.accent : theme.border }}
          >
            <h3 className="text-[0.55rem] text-[theme.inkSmall] uppercase tracked mb-2">
              {node.title}
            </h3>
            <p className="text-[0.5rem] text-[theme.inkSmall]">
              {node.subject} • {node.stage.toUpperCase()}
            </p>
          </div>
        ))}
      </Container>
    </div>
  );
}