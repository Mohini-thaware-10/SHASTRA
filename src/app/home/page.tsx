"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import Link from "next/link";

import { BrandMark } from "@/components/common/brand-mark";
import { Container } from "@/components/common/container";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getUniverseForClass } from "@/config/dashboard";

import { cn } from "@/lib/utils";

/* University mapping: class → universe */
const CLASS_TO_UNIVERSITY = {
  1: "junior",
  2: "junior",
  3: "junior",
  4: "junior",
  5: "junior",
  6: "nexus",
  7: "nexus",
  8: "nexus",
  9: "nexus",
  10: "nexus",
  11: "ascend",
  12: "ascend",
};

/* Age-based typography adaptation */
const AGE_TYPOGRAPHY = {
  junior: { fontScale: 1.2, lineHeight: 1.6, complexity: "simple" },
  nexus: { fontScale: 1, lineHeight: 1.5, complexity: "standard" },
  ascend: { fontScale: 0.95, lineHeight: 1.4, complexity: "advanced" },
};

/* University-specific colour themes */
const UNIVERSE_THEMES = {
  junior: {
    name: "SHATRA Junior",
    accent: "#e98757",
    soft: "#fff0e7",
    background: "#fffaf4",
    ink: "#512917",
    inkSoft: "#77728a",
    border: "#f1cfbb",
    cardBg: "#fffaf4",
  },
  nexus: {
    name: "SHATRA Nexus",
    accent: "#6f5ce0",
    soft: "#f0ecff",
    background: "#fbf9ff",
    ink: "#2c245c",
    inkSoft: "#77728a",
    border: "#ddd4ff",
    cardBg: "#fbf9ff",
  },
  ascend: {
    name: "SHATRA Ascend",
    accent: "#277d99",
    soft: "#edf6fa",
    background: "#f9fbfc",
    ink: "#17324a",
    inkSoft: "#77728a",
    border: "#cfe3ed",
    cardBg: "#f9fbfc",
  },
};

/* Welcome messages per universe */
const WELCOME_MESSAGES = {
  junior: "Ready for another learning adventure?",
  nexus: "Your next mission is waiting",
  ascend: "Your academic journey continues",
};

export default function HomePage() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Read student profile from mock data based on class
    // Class determines universe automatically
    const classNum = 7; // Default to class 7 (Nexus)
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);
  }, []);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading student profile...</p>
      </div>
    );
  }

  const universe = CLASS_TO_UNIVERSITY[learnerProfile.currentClass as keyof typeof CLASS_TO_UNIVERSITY] || "junior";
  const theme = UNIVERSE_THEMES[universe];
  const welcomeMsg = WELCOME_MESSAGES[universe];
  const typography = AGE_TYPOGRAPHY[universe];

  return (
    <div className="min-h-screen bg-background">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <BrandMark size="lg" className="mb-4" />
          <h1 className="text-3xl font-display font-bold text-[{theme.accent}] tracking-tight">
            {learnerProfile.fullName}
          </h1>
          <p className="text-[{theme.inkSmall}] mt-2">
            {welcomeMsg}
          </p>
          <p className="text-[{theme.inkSmall}] uppercase tracked mb-2">
            Class {learnerProfile.currentClass} • {learnerProfile.board}
          </p>
        </div>

        {/* Universe-specific content */}
        <div className="space-y-8">
          {/* University-specific hero */}
          <div className="rounded-2xl bg-[{theme.background}] border border-[{theme.border}] p-6 mb-6">
            <h2 className="text-[{theme.accent}] text-sm font-semibold uppercase tracked mb-3">
              {theme.name}
            </h2>
            <p className="text-[{theme.inkSmall}]">
              {welcomeMsg}
            </p>
          </div>

          {/* Junior: Adventure World / Nexus: Mission Control / Ascend: Academic Overview */}
          <div className="rounded-lg bg-white p-6 mb-6">
            <h3 className="text-[0.625rem] text-[{theme.inkSmall}] uppercase tracked mb-2">
              {universe === "junior"
                ? "Adventure World"
                : universe === "nexus"
                  ? "Mission Control"
                  : "Academic Overview"
                }
            </h3>
            <p className="text-[{theme.inkSmall}] mb-3">
              {universe === "junior"
                ? "Explore colourful subject worlds and complete daily quests"
                : universe === "nexus"
                  ? "Track current quests and explore subject territories"
                  : "Review academic progress and study priorities"}
            </p>
          </div>

          {/* Subject cards */}
          <div>
            <h3 className="text-[{theme.accent}] text-sm font-semibold uppercase tracked mb-3">
              Selected Subjects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                "Mathematics",
                "Science",
                "English",
                "Social Studies",
              ].map((subject) => {
                const cardData = subjectCards.find((s) => s.name === subject);
                if (!cardData) return null;
                return (
                  <div
                    key={subject}
                    className="rounded-lg bg-white p-3 border border-[{theme.border}] hover:bg-[{theme.soft}] transition-colors">
                      <span className="text-[0.625rem] text-[{theme.inkSmall}] mb-1">{subject}</span>
                      <div className="h-2 rounded-full bg-[{theme.soft}] overflow-hidden mb-2">
                        <div
                          className="h-full rounded-full bg-[{theme.accent}] transition-all duration-500"
                          style={{ width: `${cardData.progressPercentage}%` }}
                        ></div>
                      </div>
                      <p className="text-[0.55rem] text-[{theme.inkSmall}] mb-1">
                        {cardData.topicsCompleted}/{cardData.totalTopics} topics
                      </p>
                      <Button
                        variant="link"
                        size="sm"
                        className="mt-2 text-[{theme.accent}] hover:text-[{theme.accentStrong}] transition-colors w-full"
                      >
                        Continue
                      </Button>
                    </div>
                );
              })}
            </div>
          </div>

          {/* Daily Quests / Study Plan */}
          <div>
            <h3 className="text-[{theme.accent}] text-sm font-semibold uppercase tracked mb-3">
              {universe === "junior"
                ? "Daily Quests"
                : universe === "nexus"
                  ? "Recommended Missions"
                  : "Study Planner"
                }
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {["Learn something new", "Solve a challenge", "Revise a previous topic"].map((type, index) => (
                <div
                  key={type}
                  className="rounded-lg bg-white p-3 border border-[{theme.border}] transition-colors">
                    <span className="text-[0.625rem] text-[{theme.inkSmall}] mb-1">{type}</span>
                    <h3 className="font-medium text-[{theme.ink}] mb-1">
                      {type}
                    </h3>
                    <p className="text-[0.55rem] text-[{theme.inkSmall}]">
                      15 min • {type}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Rewards */}
          <div>
            <h3 className="text-[{theme.accent}] text-sm font-semibold uppercase tracked mb-3">
              Rewards
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2 text-center">
                <span className="text-2xl text-[{theme.accent}]">⭐</span>
                <p className="text-[0.55rem] text-[{theme.inkSmall}]">Streak</p>
              </div>
              <div className="p-2 text-center">
                <span className="text-2xl text-[{theme.accent}]">💰</span>
                <p className="text-[0.55rem] text-[{theme.inkSmall}]">Coins: {learnerProfile.coins}</p>
              </div>
              <div className="p-2 text-center">
                <span className="text-2xl text-[{theme.accent}]">🎮</span>
                <p className="text-[0.55rem] text-[{theme.inkSmall}]">XP: {learnerProfile.currentLevel}</p>
              </div>
              <div className="p-2 text-center">
                <span className="text-2xl text-[{theme.accent}]">🏅</span>
                <p className="text-[0.55rem] text-[{theme.inkSmall}]">Level {learnerProfile.currentLevel}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}