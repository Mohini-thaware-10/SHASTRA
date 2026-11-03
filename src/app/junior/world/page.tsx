"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useReducedMotion } from "framer-motion";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getUniverseForClass } from "@/config/dashboard";

import { cn } from "@/lib/utils";
import { JuniorClass, JuniorActivityType, JuniorActivity, JuniorTopic, TopicProgress } from "@/types/dashboard";

/* Age-adaptive settings for Junior Classes */
const JUNIOR_CLASS_CONFIG: Record<JuniorClass, {
  fontScale: number;
  lineHeight: number;
  complexity: "simple" | "standard";
  minTargetTime: number;
  maxTargetTime: number;
  activityCount: number;
}> = {
  "1": { fontScale: 1.4, lineHeight: 1.8, complexity: "simple", minTargetTime: 5, maxTargetTime: 15, activityCount: 1 },
  "2": { fontScale: 1.3, lineHeight: 1.7, complexity: "simple", minTargetTime: 5, maxTargetTime: 15, activityCount: 1 },
  "3": { fontScale: 1.2, lineHeight: 1.6, complexity: "standard", minTargetTime: 8, maxTargetTime: 20, activityCount: 2 },
  "4": { fontScale: 1.15, lineHeight: 1.5, complexity: "standard", minTargetTime: 10, maxTargetTime: 25, activityCount: 2 },
  "5": { fontScale: 1.1, lineHeight: 1.5, complexity: "standard", minTargetTime: 10, maxTargetTime: 25, activityCount: 3 },
};

/* Subject island configuration for JUNIOR World Map */
const JUNIOR_SUBJECT_ISLANDS = [
  {
    id: "mathematics-island",
    name: "Mathematics Island",
    color: "#ff6b6b",
    label: "Math",
    description: "Numbers, shapes, and calculations",
    icon: "calculator",
    colorLight: "#ff8c8c",
    subject: "Mathematics",
    unlockClass: 1,
  },
  {
    id: "english-island",
    name: "English Island",
    color: "#4ecdc4",
    label: "English",
    description: "Letters, words, and stories",
    icon: "languages",
    colorLight: "#6fd5c5",
    subject: "Language",
    unlockClass: 1,
  },
  {
    id: "science-island",
    name: "Science Island",
    color: "#ffe66d",
    label: "Science",
    description: "Plants, animals, and environment",
    icon: "flask",
    colorLight: "#fffa6e",
    subject: "EVS",
    unlockClass: 1,
  },
  {
    id: "art-island",
    name: "Art Island",
    color: "#a855f7",
    label: "Art",
    description: "Creativity and colors",
    icon: "palette",
    colorLight: "#c9a0dc",
    subject: "Art",
    unlockClass: 3,
  },
];

/* World map theme colors (Junior) */
const WORLD_MAP_THEME = {
  background: "#fffaf4",
  soft: "#fff0e7",
  accent: "#e98757",
  ink: "#512917",
  inkSoft: "#77728a",
  border: "#f1cfbb",
};

export default function JuniorWorldMapPage() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showSubjectSelection, setShowSubjectSelection] = useState(false);
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const classNum = 3; // Default to class 3
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

  const classNum = learnerProfile.currentClass as JuniorClass;
  const classConfig = JUNIOR_CLASS_CONFIG[classNum];
  const theme = WORLD_MAP_THEME;
  const isUpperJunior = classNum >= 3;
  const unlockedIslands = JUNIOR_SUBJECT_ISLANDS.filter(
    island => classNum >= island.unlockClass
  );

  /* Get available topics for a subject */
  const getTopicsForSubject = (subject: string): JuniorTopic[] => {
    switch (subject) {
      case "Mathematics":
        return isUpperJunior
          ? [
              {
                id: "math-3-1",
                title: "Addition Adventure",
                description: "Learn addition with numbers up to 20 using visual objects",
                illustration: "addition",
                estimatedDurationMinutes: 15,
                color: "#ff6b6b",
                activityCount: 3,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
              {
                id: "math-3-2",
                title: "Subtraction Stories",
                description: "Learn subtraction taking away from numbers up to 20",
                illustration: "subtraction",
                estimatedDurationMinutes: 15,
                color: "#4ecdc4",
                activityCount: 3,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
              {
                id: "math-3-3",
                title: "Multiplication Basics",
                description: "Introduction to multiplication as repeated addition",
                illustration: "multiplication",
                estimatedDurationMinutes: 20,
                color: "#ffe66d",
                activityCount: 3,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
            ]
          : [
              {
                id: "math-1-1",
                title: "Number Friends",
                description: "Learn numbers 1-10 and their names",
                illustration: "number-line",
                estimatedDurationMinutes: 10,
                color: "#ff6b6b",
                activityCount: 1,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
              {
                id: "math-1-2",
                title: "Shape Seekers",
                description: "Identify basic shapes: circle, square, triangle",
                illustration: "shapes",
                estimatedDurationMinutes: 10,
                color: "#4ecdc4",
                activityCount: 1,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
            ];
      case "Language":
        return isUpperJunior
          ? [
              {
                id: "eng-2-1",
                title: "Sentence Builder",
                description: "Create simple sentences with subject-verb-object",
                illustration: "sentence-building",
                estimatedDurationMinutes: 15,
                color: "#ffe66d",
                activityCount: 3,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
              {
                id: "eng-3-1",
                title: "Grammar Games",
                description: "Learn about nouns, verbs, and adjectives",
                illustration: "grammar",
                estimatedDurationMinutes: 15,
                color: "#a855f7",
                activityCount: 3,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
            ]
          : [
              {
                id: "eng-1-1",
                title: "Letter Friends",
                description: "Learn alphabet letters and their sounds",
                illustration: "alphabet",
                estimatedDurationMinutes: 10,
                color: "#ff6b6b",
                activityCount: 1,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
              {
                id: "eng-1-2",
                title: "Word Building",
                description: "Build simple words with learned letters",
                illustration: "word-building",
                estimatedDurationMinutes: 10,
                color: "#4ecdc4",
                activityCount: 1,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
            ];
      case "EVS":
        return isUpperJunior
          ? [
              {
                id: "sci-2-1",
                title: "Human Body",
                description: "Learn about human body parts and their functions",
                illustration: "human-body",
                estimatedDurationMinutes: 15,
                color: "#a855f7",
                activityCount: 3,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
              {
                id: "sci-3-1",
                title: "States of Matter",
                description: "Solids, liquids, and gases around us",
                illustration: "states-of-matter",
                estimatedDurationMinutes: 20,
                color: "#a855f7",
                activityCount: 3,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
            ]
          : [
              {
                id: "sci-1-1",
                title: "Plant Parts",
                description: "Learn about roots, stems, leaves, and flowers",
                illustration: "plant-parts",
                estimatedDurationMinutes: 10,
                color: "#4ecdc4",
                activityCount: 1,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
              {
                id: "sci-1-2",
                title: "Animal Homes",
                description: "Where do different animals live?",
                illustration: "animal-homes",
                estimatedDurationMinutes: 10,
                color: "#ffe66d",
                activityCount: 1,
                activities: [],
                isLocked: false,
                unlockCondition: undefined,
              },
            ];
      case "Art":
        return [
          {
            id: "art-1-1",
            title: "Color Magic",
            description: "Explore colors and creativity",
            illustration: "color-magic",
            estimatedDurationMinutes: 15,
            color: "#a855f7",
            activityCount: 2,
            activities: [],
            isLocked: classNum < 3,
            unlockCondition: "Class 3 or above",
          },
        ];
      default:
        return [];
    }
  };

  /* Handle subject island click */
  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
    setShowSubjectSelection(false);
    router.push(`/junior/topics/${subject.toLowerCase().replace(/\s+/g, "-")}`);
  };

  /* Handle back to world map */
  const handleBackToWorld = () => {
    setSelectedSubject(null);
    setShowSubjectSelection(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Header with back button and profile */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/junior/world"
            className={cn(
              "flex items-center gap-2 text-[{theme.accent}] hover:text-[{theme.accentDark}] transition-colors",
              "text-sm font-medium"
            )}
          >
            ← Back to World Map
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-[{theme.inkSmall}] font-medium">
              {learnerProfile.fullName}
            </span>
            <span className="text-[{theme.inkSmall}]">
              • Class {learnerProfile.currentClass}
            </span>
          </div>
        </div>

        {/* Subject Selection Panel */}
        {selectedSubject && showSubjectSelection && (
          <div className="rounded-lg bg-white p-6 mb-6 border border-[{theme.border}]">
            <h3 className="text-[{theme.accent}] text-sm font-semibold uppercase tracked mb-3">
              {selectedSubject} Topics
            </h3>
            <p className="text-[{theme.inkSmall}] mb-4">
              Choose a topic to begin your learning adventure
            </p>
            <div className="grid grid-cols-2 gap-3">
              {["Mathematics", "Language", "EVS", "Art"].map(s => (
                <div
                  key={s}
                  className="rounded-lg bg-[{theme.soft}] p-3 border border-[{theme.border}] hover:bg-[{theme.accent}] hover:text-white transition-colors cursor-pointer"
                  onClick={() => handleBackToWorld()}
                >
                  ← Return to World Map
                </div>
              ))}
            </div>
          </div>
        )}

        {/* World Map Main Content */}
        <div className="space-y-8">
          {/* Junior Welcome Section */}
          <div className="rounded-2xl bg-[{theme.background}] border border-[{theme.border}] p-6 mb-8">
            <h2 className="text-[{theme.accent}] text-sm font-semibold uppercase tracked mb-3">
              SHATRA Junior
            </h2>
            <p className="text-[{theme.inkSmall}] mb-3">
              Welcome to your learning adventure, {learnerProfile.fullName}!
            </p>
            <p className="text-[{theme.inkSmall}]">
              Explore subject islands and complete activities to earn stars and coins
            </p>
          </div>

          {/* Subject Islands Grid */}
          <div>
            <h3 className="text-[{theme.accent}] text-sm font-semibold uppercase tracked mb-4">
              Subject Islands
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {unlockedIslands.map(island => (
                <div
                  key={island.id}
                  className={cn(
                    "rounded-2xl p-4 text-center cursor-pointer hover:shadow-lg hover:transition-shadow transition-all duration-300",
                    reduceMotion
                      ? ""
                      : "hover:bg-[{island.colorLight}] hover:text-white",
                    "border border-[{theme.border}]"
                  )}
                  onClick={() => handleSubjectClick(island.subject)}
                  style={{ background: "white" }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[{island.color}] flex items-center justify-center mb-2">
                    <span className="text-white font-medium">
                      {island.icon === "calculator" ? "🔢" : island.icon === "languages" ? "🅰" : island.icon === "flask" ? "🔬" : "🎨"}
                    </span>
                  </div>
                  <h4 className="text-[{classConfig.fontScale}] font-medium text-[{isUpperJunior ? theme.accent : theme.ink}] hover:text-[{isUpperJunior ? island.colorLight : theme.accent}] transition-colors">
                    {island.label}
                  </h4>
                  <p className="text-[{classConfig.fontScale}] text-[{theme.inkSmall}] mt-1">
                    {island.description}
                  </p>
                  {!isUpperJunior && island.unlockClass > classNum && (
                    <p className="text-xs text-[{theme.inkSoft}] mt-1">
                      Locked until Class {island.unlockClass}
                    </p>
                  )}
                </div>
              ))}
              {!isUpperJunior && unlockedIslands.length < 4 && (
                <div
                  key="locked"
                  className="rounded-2xl p-4 text-center cursor-default opacity-50"
                  style={{ background: "white" }}
                >
                  <p className="text-xs text-[{theme.inkSmall}]">More islands<br/>unlock at higher classes</p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Overview */}
          {isUpperJunior && (
            <div className="rounded-lg bg-white p-6 border border-[{theme.border}]">
              <h3 className="text-[{theme.accent}] text-sm font-semibold uppercase tracked mb-3">
                Progress Overview
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[["Mathematics", 65], ["Language", 45], ["EVS", 55], ["Art", 30]].map(([subject, progress]) => (
                  <div key={subject} className="rounded-lg bg-[{theme.soft}] p-3 border border-[{theme.border}]">
                    <span className="text-[0.625rem] text-[{theme.inkSmall}] mb-1">{subject}</span>
                    <div className="h-2 rounded-full bg-[{theme.background}] overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full bg-[{theme.accent}] transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-[0.55rem] text-[{theme.inkSmall}]">
                      {progress}% complete
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}