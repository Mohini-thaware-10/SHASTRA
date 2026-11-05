"use client";

import { useState, useEffect, useParams } from "react";
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

function getTopicConfig(topic: string) {
  const topicLower = topic.toLowerCase();

  const topicData: Record<string, { name: string; subject: string; classLevel: string; description: string }> = {
    "physics-11-1": {
      name: "Kinematics",
      subject: "Physics",
      classLevel: "11",
      description: "Motion in a straight line, velocity, acceleration and projectile motion",
    },
    "physics-11-2": {
      name: "Laws of Motion",
      subject: "Physics",
      classLevel: "11",
      description: "Newton's laws of motion, friction, circular motion",
    },
    "physics-11-3": {
      name: "Work, Energy and Power",
      subject: "Physics",
      classLevel: "11",
      description: "Work-energy theorem, conservation of energy, power",
    },
    "chemistry-11-1": {
      name: "Some Basic Concepts of Chemistry",
      subject: "Chemistry",
      classLevel: "11",
      description: "Molecular theory, atomic structure, chemical bonding",
    },
    "chemistry-11-2": {
      name: "Structure of Atom",
      subject: "Chemistry",
      classLevel: "11",
      description: "Electronic configuration, quantum numbers, periodic trends",
    },
    "maths-11-1": {
      name: "Sets and Functions",
      subject: "Mathematics",
      classLevel: "11",
      description: "Sets, relations, functions and their graphs",
    },
    "maths-11-2": {
      name: "Trigonometric Functions",
      subject: "Mathematics",
      classLevel: "11",
      description: "Trigonometric identities, equations and applications",
    },
    "bio-11-1": {
      name: "Cell Structure and Function",
      subject: "Biology",
      classLevel: "11",
      description: "Cell organelles, plant and animal tissues, cell division",
    },
    "bio-11-2": {
      name: "Plant Physiology",
      subject: "Biology",
      classLevel: "11",
      description: "Photosynthesis, respiration, plant growth and development",
    },
    "account-11-1": {
      name: "Financial Statements",
      subject: "Accountancy",
      classLevel: "11",
      description: "Balance sheet, income statement, cash flow statement",
    },
    "bus-11-1": {
      name: "Principles of Management",
      subject: "Business Studies",
      classLevel: "11",
      description: "Fayol's principles, planning, organizing, staffing",
    },
    "eco-11-1": {
      name: "Supply and Demand",
      subject: "Economics",
      classLevel: "11",
      description: "Law of demand, law of supply, market equilibrium",
    },
    "history-12-1": {
      name: "Thematic Overview: Early Societies",
      subject: "History",
      classLevel: "12",
      description: "Early human societies, agriculture and civilizations",
    },
    "history-12-2": {
      name: "Thematic Overview: Empires",
      subject: "History",
      classLevel: "12",
      description: "Rise and fall of empires, administration and culture",
    },
    "pol-12-1": {
      name: "Political Ideologies",
      subject: "Political Science",
      classLevel: "12",
      description: "Liberalism, conservatism, socialism, feminism",
    },
    "lit-12-1": {
      name: "Literary Genres",
      subject: "Literature",
      classLevel: "12",
      description: "Poetry, prose, drama and their characteristic features",
    },
    "geog-12-1": {
      name: "Population and Settlement",
      subject: "Geography",
      classLevel: "12",
      description: "Population distribution, settlement types, urbanization",
    },
    "phy-12-1": {
      name: "Electrostatics",
      subject: "Physics",
      classLevel: "12",
      description: "Electric charge, Coulomb's law, electric field and potential",
    },
    "chem-12-1": {
      name: "Thermodynamics",
      subject: "Chemistry",
      classLevel: "12",
      description: "Enthalpy, entropy, Gibbs free energy, thermodynamic equilibrium",
    },
    "math-12-1": {
      name: "Relations and Functions",
      subject: "Mathematics",
      classLevel: "12",
      description: "Types of relations, functions, invertible functions",
    },
    "math-12-2": {
      name: "Calculus",
      subject: "Mathematics",
      classLevel: "12",
      description: "Limits, continuity, differentiation and applications",
    },
    "eco-12-1": {
      name: "National Income",
      subject: "Economics",
      classLevel: "12",
      description: "GDP, GNP, fiscal and monetary policy",
    },
    "acc-12-1": {
      name: "Company Accounts",
      subject: "Accountancy",
      classLevel: "12",
      description: "Final accounts, adjustments, financial statement analysis",
    },
    "bus-12-2": {
      name: "Marketing",
      subject: "Business Studies",
      classLevel: "12",
      description: "Marketing mix, consumer behaviour, market research",
    },
  };

  const data = topicData[topicLower];
  if (!data) {
    return {
      name: topic,
      subject: "General",
      classLevel: "11",
      description: "Topic information",
    };
  }
  return data;
}

export default function AscendTopicsPage() {
  const { topic } = useParams<{ topic: string }>();
  const router = useRouter();

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Topic not specified</p>
      </div>
    );
  }

  const topicConfig = getTopicConfig(topic);
  const theme = useUniverseTheme("ascend");

  useEffect(() => {
    const classNum = 11;
    const stream = "science";
    const profile = getLearnerProfile(classNum, stream, "CBSE");
  }, [topic]);

  return (
    <div className="min-h-screen bg-background text-ink">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Topic Header */}
        <div className="rounded-xl bg-[color:var(--soft)] border border-[color:var(--border)] p-6 md:p-8 mb-8">
          <BrandMark className="mb-4" />
          <h1 className="text-2xl font-display font-bold text-[color:var(--accent)] tracking-wider">
            {topicConfig.name}
          </h1>
          <p className="text-[0.875rem] text-[color:var(--inkSmall)] mt-1">
            {topicConfig.description}
          </p>
          <p className="text-[0.5rem] text-[color:var(--inkSmall)]">
            {topicConfig.subject} • Class {topicConfig.classLevel}
          </p>
        </div>

        {/* Lesson Cards for the Topic */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="rounded-lg bg-white border border-[color:var(--border)] p-6">
            <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
              Lesson Cards
            </h2>
            <p className="text-[0.5rem] text-[color:var(--inkSmall)] mb-4">
              Available lessons for {topicConfig.name}
            </p>
            <ul className="space-y-3 max-h-[400px] overflow-y-auto">
              <li className="p-3 rounded bg-[color:var(--soft)] border border-[color:var(--border)]">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-[color:var(--accent)] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12hM12 5lM19 12lM5 12" />
                  </svg>
                  <div>
                    <span className="text-[0.5rem] font-medium">Lesson 1: Introduction</span>
                    <span className="text-[0.4rem] text-[color:var(--inkSmall)] opacity-60">— {topicConfig.subject}</span>
                  </div>
                </div>
              </li>
              <li className="p-3 rounded bg-[color:var(--soft)] border border-[color:var(--border)]">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-[color:var(--accent)] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12hM12 5lM19 12lM5 12" />
                  </svg>
                  <div>
                    <span className="text-[0.5rem] font-medium">Lesson 2: Concepts</span>
                    <span className="text-[0.4rem] text-[color:var(--inkSmall)] opacity-60">— {topicConfig.subject}</span>
                  </div>
                </div>
              </li>
              <li className="p-3 rounded bg-[color:var(--soft)] border border-[color:var(--border)]">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-[color:var(--accent)] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12hM12 5lM19 12lM5 12" />
                  </svg>
                  <div>
                    <span className="text-[0.5rem] font-medium">Lesson 3: Examples</span>
                    <span className="text-[0.4rem] text-[color:var(--inkSmall)] opacity-60">— {topicConfig.subject}</span>
                  </div>
                </div>
              </li>
              <li className="p-3 rounded bg-[color:var(--soft)] border border-[color:var(--border)]">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-[color:var(--accent)] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12hM12 5lM19 12lM5 12" />
                  </svg>
                  <div>
                    <span className="text-[0.5rem] font-medium">Lesson 4: Practice</span>
                    <span className="text-[0.4rem] text-[color:var(--inkSmall)] opacity-60">— {topicConfig.subject}</span>
                  </div>
                </div>
              </li>
              <li className="p-3 rounded bg-[color:var(--soft)] border border-[color:var(--border)]">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-[color:var(--accent)] flex-sr-none flex-sr-only shrink-0 mr-3 opacity-60 top-0.5 -translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12hM12 5lM19 12lM5 12" />
                  </svg>
                  <div>
                    <span className="text-[0.5rem] font-medium">Lesson 5: Assessment</span>
                    <span className="text-[0.4rem] text-[color:var(--inkSmall)] opacity-60">— {topicConfig.subject}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Topic Progress Details */}
          <div className="rounded-lg bg-white border border-[color:var(--border)] p-6">
            <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
              Topic Progress Details
            </h2>
            <p className="text-[0.5rem] text-[color:var(--inkSmall)] mb-4">
              Mastery overview for {topicConfig.name}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[0.5rem] text-[color:var(--inkSmall)] uppercase tracked">Completion</p>
                <progress className="w-32 h-2 rounded-full appearance-none bg-[color:var(--soft)] border border-[color:var(--border)]" value={60} max={100} />
                <span className="text-[0.5rem] text-[color:var(--inkSmall)] right-0">60% complete</span>
              </div>
              <div>
                <p className="text-[0.5rem] text-[color:var(--inkSmall)] uppercase tracked">Accuracy</p>
                <progress className="w-32 h-2 rounded-full appearance-none bg-[color:var(--soft)] border border-[color:var(--border)]" value={75} max={100} />
                <span className="text-[0.5rem] text-[color:var(--inkSmall)] right-0">75% accurate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Subjects */}
        <div className="rounded-lg bg-[color:var(--soft)] border border-[color:var(--border)] p-6 mb-8">
          <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
            Related Subjects
          </h2>
          <p className="text-[0.5rem] text-[color:var(--inkSmall)] mb-4">
            Subjects that complement {topicConfig.name}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((i) => (
              <div key={i} className="p-3 rounded bg-white border border-[color:var(--border)] hover:bg-[color:var(--soft)] transition-colors">
                <Button
                  variant="link"
                  size="sm"
                  className="text-[color:var(--accent)] w-full text-[0.5rem]"
                >
                  {topicConfig.subject} Related
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Practice */}
        <div className="rounded-lg bg-[color:var(--soft)] border border-[color:var(--border)] p-6">
          <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
            Assessment Practice
          </h2>
          <p className="text-[0.5rem] text-[color:var(--inkSmall)] mb-4">
            Practice questions for {topicConfig.name}
          </p>
          <div className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-[color:var(--accent)] hover:text-[color:var(--accentStrong)] transition-colors"
            >
              Start Practice Quiz
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-[color:var(--accent)] hover:text-[color:var(--accentStrong)] transition-colors"
            >
              View Sample Questions
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}