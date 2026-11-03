import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/common/brand-mark";
import { Container } from "@/components/common/container";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getContinueLearningCards, getSubjectOverviewCards, getRecommendations, getRecentActivityEvents } from "@/lib/dashboard/mock-data";
import { universeThemesConfig } from "@/config/dashboard";
import { getVisualIndicator } from "@/lib/dashboard/mock-data";
import { GPProgress } from "@/types/dashboard";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/dashboard/DailyGoalCard";
import { getDailyGoal } from "@/lib/dashboard/calculations";

/* Nexus Universe Theme Configuration */
const nexusThemes = {
  soft: "#f0ecff",
  accent: "#6f5ce0",
  accentStrong: "#5542c5",
  ink: "#2c245c",
  inkSoft: "#77728a",
  border: "#ddd4ff",
  background: "#fbf9ff",
};

export default function NexusHomePage() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  // In a full implementation, this would read from auth/profile state
  // For now, use class 7 as default nexus profile
  const defaultClass = 7;
  const profile = getLearnerProfile(defaultClass, undefined, "CBSE");
  setLearnerProfile(profile);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading nexus dashboard...</p>
      </div>
    );
  }

  const dailyGoal = getDailyGoal(learnerProfile);
  const subjectCards = getSubjectOverviewCards(learnerProfile);
  const continueCards = getContinueLearningCards(learnerProfile);
  const recommendations = getRecommendations(learnerProfile);
  const recentEvents = getRecentActivityEvents(learnerProfile);
  const gamification: GPProgress = {
    totalXP: learnerProfile.totalXP,
    currentLevel: learnerProfile.currentLevel,
    currentStreak: learnerProfile.learningStreak,
    highestStreak: learnerProfile.highestStreak || learnerProfile.learningStreak,
    coins: learnerProfile.coins,
    recentlyUnlocked: [],
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Welcome and Profile */}
        <div className="rounded-xl bg-[{nexusThemes.background}] border border-[{nexusThemes.border}] p-6 md:p-8 mb-8">
          <h1 className="text-2xl font-display font-bold text-[{nexusThemes.accent}] tracking-wide">
            {learnerProfile.fullName}! welcome to {learnerProfile.currentUniverse.toUpperCase()}
          </h1>
          <p className="text-[{nexusThemes.inkSmall}] mt-1">
            Your adventure awaits
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <p className="text-[0.625rem] text-[{nexusThemes.inkSmall}] uppercase tracked">{learnerProfile.currentClass}</p>
              <p className="text-[0.875rem] font-medium text-[{nexusThemes.ink}]">{learnerProfile.learningStreak} day streak</p>
            </div>
            <div>
              <p className="text-[0.625rem] text-[{nexusThemes.inkSmall}] uppercase tracked">XP</p>
              <p className="text-[0.875rem] font-medium text-[{nexusThemes.ink}]">{learnerProfile.currentLevel}</p>
            </div>
          </div>
        </div>

        {/* Mission Control */}
        <div className="rounded-lg bg-[{nexusThemes.soft}] border border-[{nexusThemes.border}] p-4 md:p-5 mb-8">
          <h2 className="text-[{nexusThemes.accent}] text-sm font-semibold uppercase tracked mb-3">
            Mission Control
          </h2>
          {continueCards.length > 0 ? (
            <div>
              <h3 className="text-[0.75rem] text-[{nexusThemes.inkSmall}] uppercase mb-2">
                Current Quest
              </h3>
              <p className="text-[0.875rem] font-medium text-[{nexusThemes.ink}] mb-1">
                {continueCards[0]?.lessonTitle || "Variable Quest"}
              </p>
              <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}/80] mb-2">
                {continueCards[0]?.topic} • {continueCards[0]?.progressPercentage}% complete
              </p>
              <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}/80]">
                {continueCards[0]?.suggestedAction || "Keep going!"}
              </p>
              <Button
                variant="primary"
                size="sm"
                className="w-full text-[{nexusThemes.accent}] hover:bg-[{nexusThemes.accent}]/90 transition-colors"
              >
                Continue Mission
              </Button>
            </div>
          ) : (
            <p className="text-[{nexusThemes.inkSmall}]">Start your first quest to begin.</p>
          )}
        </div>

        {/* Exploration Map */}
        <div className="mb-8">
          <h2 className="text-[{nexusThemes.accent}] text-sm font-semibold uppercase tracked mb-3">
            Exploration Map
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Mathematics Territory */}
            <div className="rounded-lg bg-white p-3 border border-[{nexusThemes.border}] hover:bg-[{nexusThemes.soft}] transition-colors">
              <span className="text-[0.625rem] text-[{nexusThemes.inkSmall}] block mb-1">Mathematics</span>
              <p className="text-[0.75rem] text-[{nexusThemes.ink}]">
                {subjectCards.find((s) => s.name === "Mathematics")?.progressPercentage}% complete
              </p>
              <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}/60]">
                {subjectCards.find((s) => s.name === "Mathematics")?.topicsCompleted}/{subjectCards.find((s) => s.name === "Mathematics")?.totalTopics} topics
              </p>
            </div>
            {/* Science Territory */}
            <div className="rounded-lg bg-white p-3 border border-[{nexusThemes.border}] hover:bg-[{nexusThemes.soft}] transition-colors">
              <span className="text-[0.625rem] text-[{nexusThemes.inkSmall}] block mb-1">Science</span>
              <p className="text-[0.75rem] text-[{nexusThemes.ink}]">
                {subjectCards.find((s) => s.name === "Science")?.progressPercentage}% complete
              </p>
              <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}/60]">
                {subjectCards.find((s) => s.name === "Science")?.topicsCompleted}/{subjectCards.find((s) => s.name === "Science")?.totalTopics} topics
              </p>
            </div>
          </div>
          {/* Additional territories */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {["Languages", "Social Studies"].map((subject, i) => (
              <div
                key={subject}
                className="rounded-lg bg-white p-3 border border-[{nexusThemes.border}] hover:bg-[{nexusThemes.soft}] transition-colors"
              >
                <span className="text-[0.625rem] text-[{nexusThemes.inkSmall}] block mb-1">{subject}</span>
                <p className="text-[0.75rem] text-[{nexusThemes.ink}]">
                  {subjectCards.find((s) => s.name === subject)?.progressPercentage}% complete
                </p>
                <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}/60]">
                  {subjectCards.find((s) => s.name === subject)?.topicsCompleted}/{subjectCards.find((s) => s.name === subject)?.totalTopics} topics
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Exploration */}
        <div>
          <h2 className="text-[{nexusThemes.accent}] text-sm font-semibold uppercase tracked mb-3">
            Subject Exploration
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subjectCards.map((card) => (
              <div
                key={card.id}
                className="rounded-lg bg-white p-3 border border-[{nexusThemes.border}] hover:bg-[{nexusThemes.soft}] transition-colors">
                <Badge tone="violet" className="me-2 mb-2" size="sm">
                  {card.name}
                </Badge>
                <div className="h-2 rounded-full bg-violet-soft overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-violet-strong transition-all duration-500"
                    style={{ width: `${card.progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-[0.55rem] text-violet-soft/80 mt-1">
                  {card.topicsCompleted}/{card.totalTopics} topics
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-violet-strong hover:text-violet-strong/90 transition-colors w-full"
                >
                  Explore
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Missions */}
        <div className="mt-8">
          <h2 className="text-[{nexusThemes.accent}] text-sm font-semibold uppercase tracked mb-3">
            Recommended Missions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {recommendations.slice(0, 4).map((rec) => (
              <div
                key={rec.id}
                className="rounded-lg bg-white p-3 border border-[{nexusThemes.border}] hover:bg-[{nexusThemes.soft}] transition-colors">
                <span className="text-[0.625rem] text-[{nexusThemes.inkSmall}] block mb-1">{rec.subject}</span>
                <h3 className="text-[0.75rem] text-[{nexusThemes.ink}] mb-1">{rec.title}</h3>
                <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}/80]">
                  {rec.topic} • {rec.estimatedDuration} min
                </p>
                <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}/80]">{rec.reason}</p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-violet-strong hover:text-violet-strong/90 transition-colors w-full"
                >
                  Start
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Revision Centre */}
        <div className="mt-8 rounded-lg bg-[{nexusThemes.soft}] border border-[{nexusThemes.border}] p-6">
          <h2 className="text-[{nexusThemes.accent}] text-sm font-semibold uppercase tracked mb-3">
            Revision Centre
          </h2>
          <p className="text-[{nexusThemes.inkSmall}] mb-3">
            Topics needing revision: {Math.max(0, 5 - subjectCards.filter((s) => s.progressPercentage > 70).length)}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["Mathematics", "Science", "Languages"].map((subject) => (
              <div key={subject} className="p-2">
                <span className="text-[0.55rem] text-[{nexusThemes.inkSmall}] block mb-1">{subject}</span>
                <progress
                  className="w-24 h-2 rounded-full appearance-none bg-[{nexusThemes.soft}] border border-[{nexusThemes.border}]"
                  value={subjectCards.find((s) => s.name === subject)?.progressPercentage} || 0
                  max={100}
                />
                <span className="text-[0.55rem] text-[{nexusThemes.inkSmall}] right-0">
                  {subjectCards.find((s) => s.name === subject)?.progressPercentage}% complete
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8 grid grid-cols-4 gap-2">
          <div className="p-2 text-center">
            <span className="text-2xl text-[{nexusThemes.accent}]">🏆</span>
            <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}]">Level {gamification.currentLevel}</p>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl text-[{nexusThemes.accent}]">💰</span>
            <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}]">Coins: {gamification.coins}</p>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl text-[{nexusThemes.accent}]">🔥</span>
            <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}]">Streak: {gamification.currentStreak}</p>
          </div>
          <div className="p-2 text-center">
            <span className="text-2xl text-[{nexusThemes.accent}]">🏅</span>
            <p className="text-[0.55rem] text-[{nexusThemes.inkSmall}]">Recently: {gamification.recentlyUnlocked[0] || "Keep going!"}</p>
          </div>
        </div>
      </Container>
    </div>
  );
}