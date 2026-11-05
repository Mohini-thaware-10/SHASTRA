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

function getSubjectConfig(subject: string) {
  const subjectLower = subject.toLowerCase();

  const physicsData = {
    name: "Physics",
    stream: "science",
    description: "Matter, energy, and the fundamental forces of nature",
  };
  const chemistryData = {
    name: "Chemistry",
    stream: "science",
    description: "Composition, structure, properties of substances and their transformations",
  };
  const mathematicsData = {
    name: "Mathematics",
    stream: "science",
    description: "Numbers, quantities, shapes, and abstract structures",
  };
  const biologyData = {
    name: "Biology",
    stream: "science",
    description: "Living organisms and life processes",
  };
  const accountancyData = {
    name: "Accountancy",
    stream: "commerce",
    description: "Financial recording, reporting and analysis for businesses",
  };
  const businessStudiesData = {
    name: "Business Studies",
    stream: "commerce",
    description: "Business organization, management and entrepreneurial principles",
  };
  const economicsData = {
    name: "Economics",
    stream: "commerce",
    description: "Production, distribution, and consumption of goods and services",
  };
  const historyData = {
    name: "History",
    stream: "arts",
    description: "Past events and societies, particularly focused on Indian and world history",
  };
  const politicalScienceData = {
    name: "Political Science",
    stream: "arts",
    description: "Political systems, governance and international relations",
  };
  const literatureData = {
    name: "Literature",
    stream: "arts",
    description: "Literary works, analysis and literary criticism",
  };
  const geographyData = {
    name: "Geography",
    stream: "arts",
    description: "Earth's landscapes, environments and the people who inhabit them",
  };
  const sociologyData = {
    name: "Sociology",
    stream: "arts",
    description: "Human social relationships, institutions and society",
  };
  const psychologyData = {
    name: "Psychology",
    stream: "arts",
    description: "Human behaviour, mind and mental processes",
  };

  const data =
    subjectLower === "physics"
      ? physicsData
      : subjectLower === "chemistry"
        ? chemistryData
        : subjectLower === "mathematics"
          ? mathematicsData
          : subjectLower === "biology"
            ? biologyData
            : subjectLower === "accountancy"
              ? accountancyData
              : subjectLower === "business_studies"
                ? businessStudiesData
                : subjectLower === "economics"
                  ? economicsData
                  : subjectLower === "history"
                    ? historyData
                    : subjectLower === "political_science"
                      ? politicalScienceData
                      : subjectLower === "literature"
                        ? literatureData
                        : subjectLower === "geography"
                          ? geographyData
                          : subjectLower === "sociology"
                            ? sociologyData
                            : subjectLower === "psychology"
                              ? psychologyData
                              : { name: subject, stream: "general", description: "Academic subject exploration" };

  return data;
}

export default function SubjectExplorerPage() {
  const { subject } = useParams<{ subject: string }>();
  const router = useRouter();

  // Determine class and stream from route or default
  const defaultClass = 11;
  const defaultStream = "science";

  useEffect(() => {
    const classNum = defaultClass;
    const stream = defaultStream;
    const profile = getLearnerProfile(classNum, stream, "CBSE");
  }, [subject]);

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Subject not specified</p>
      </div>
    );
  }

  const subjectConfig = getSubjectConfig(subject);
  const theme = useUniverseTheme("ascend");

  // Determine if subject is available for the detected stream
  const isStreamCompatible = (
    subjectConfig.stream === "science"
      ? ["physics", "chemistry", "mathematics", "biology"].includes(subject.toLowerCase())
      : subjectConfig.stream === "commerce"
        ? ["accountancy", "business_studies", "economics"].includes(subject.toLowerCase())
        : subjectConfig.stream === "arts"
          ? ["history", "political_science", "literature", "geography", "sociology", "psychology", "economics"].includes(
              subject.toLowerCase()
            )
          : true
  );

  useEffect(() => {
    const classNum = 11;
    const stream = "science";
    const profile = getLearnerProfile(classNum, stream, "CBSE");
  }, [subject]);

  return (
    <div className="min-h-screen bg-background text-ink">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Subject Header */}
        <div className="rounded-xl bg-[color:var(--soft)] border border-[color:var(--border)] p-6 md:p-8 mb-8">
          <BrandMark className="mb-4" />
          <h1 className="text-2xl font-display font-bold text-[color:var(--accent)] tracking-wider">
            {subjectConfig.name}
          </h1>
          <p className="text-[0.875rem] text-[color:var(--inkSmall)] mt-1">
            {subjectConfig.description}
          </p>
          <p className="text-[0.5rem] text-[color:var(--inkSmall)]">
            Class {defaultClass} • {subjectConfig.stream.toUpperCase()} stream
          </p>
        </div>

        {/* Curriculum Overview */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="rounded-lg bg-white border border-[color:var(--border)] p-6">
            <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
              Curriculum Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[0.5rem] text-[color:var(--inkSmall)] uppercase tracked">Academic Class</p>
                <p className="text-[0.75rem] font-medium">Class {defaultClass}</p>
              </div>
              <div>
                <p className="text-[0.5rem] text-[color:var(--inkSmall)] uppercase tracked">Stream</p>
                <p className="text-[0.75rem] font-medium">{subjectConfig.stream.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-[0.5rem] text-[color:var(--inkSmall)] uppercase tracked">Board</p>
                <p className="text-[0.75rem] font-medium">CBSE</p>
              </div>
              <div>
                <p className="text-[0.5rem] text-[color:var(--inkSmall)] uppercase tracked">Academic Year</p>
                <p className="text-[0.75rem] font-medium">2024–2025</p>
              </div>
            </div>
          </div>

          {/* Units and Chapters for the subject */}
          <div className="rounded-lg bg-white border border-[color:var(--border)] p-6">
            <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
              Units & Chapters
            </h2>
            <p className="text-[0.5rem] text-[color:var(--inkSmall)]">
              Organised by Academic board → Class → Stream → Subject → Unit → Chapter → Topic → Lesson
            </p>
            <ul className="space-y-2 text-[0.5rem] text-[color:var(--inkSmall)]">
              <li className="flex items-start">
                <svg className="w-4 h-4 text-[color:var(--accent)] flex-sr-none flex-sr-only shrink-0 mr-2 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                Physics Fundamentals (Unit 1)
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-[color:var(--accent)] flex-sr-none flex-sr-only shrink-0 mr-2 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                Motion and Forces (Unit 2)
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-[color:var(--accent)] flex-sr-none flex-sr-only shrink-0 mr-2 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                Energy and Waves (Unit 3)
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 text-[color:var(--accent)] flex-sr-none flex-sr-only shrink-0 mr-2 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12hM12 5lM19 12lM5 12" />
                </svg>
                Modern Physics (Unit 4)
              </li>
            </ul>
          </div>
        </div>

        {/* Topic Progress */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <div className="rounded-lg bg-white border border-[color:var(--border)] p-6">
            <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
              Topic Progress
            </h2>
            <p className="text-[0.5rem] text-[color:var(--inkSmall)] mb-4">
              Track your understanding across key topics
            </p>
            <div className="space-y-3">
              {[...Array(5)].map((topic, i) => (
                <div key={topic} className="p-3 bg-[color:var(--soft)] rounded-lg border border-[color:var(--border)]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[0.5rem] text-[color:var(--inkSmall)]">{["Kinematics", "Laws of Motion", "Work, Energy and Power", "Systems of Particles and Rotational Motion", "Gravitation"][i]}</span>
                    <span className="text-[0.5rem] text-[color:var(--accent)]">{Math.round(40 + i * 12)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[color:var(--soft)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[color:var(--accent)] transition-all duration-500"
                      style={{ width: `${Math.round(40 + i * 12)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Topics */}
          <div className="rounded-lg bg-white border border-[color:var(--border)] p-6">
            <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
              Recommended Topics
            </h2>
            <p className="text-[0.5rem] text-[color:var(--inkSmall)] mb-4">
              Based on your progress and assessment results
            </p>
            <ul className="space-y-2">
              <li className="p-2 rounded bg-[color:var(--soft)] mb-2">
                <span className="text-[0.5rem] font-medium">{subjectConfig.name} — Advanced Mechanics</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-[color:var(--accent)] w-full text-[0.5rem]"
                >
                  Start
                </Button>
              </li>
              <li className="p-2 rounded bg-[color:var(--soft)] mb-2">
                <span className="text-[0.5rem] font-medium">{subjectConfig.name} — Electrostatics</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-[color:var(--accent)] w-full text-[0.5rem]"
                >
                  Start
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Assessment Preparation */}
        <div className="rounded-lg bg-[color:var(--soft)] border border-[color:var(--border)] p-6 mb-8">
          <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
            Assessment Preparation
          </h2>
          <p className="text-[0.5rem] text-[color:var(--inkSmall)] mb-4">
            Practice questions for {subjectConfig.name}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Button
                variant="link"
                size="sm"
                className="text-[color:var(--accent)] w-full text-[0.5rem]"
                onClick={() => router.push("/ascend/lessons/physics-11-1")}
              >
                Chapter Quiz — {subjectConfig.name}
              </Button>
            </div>
            <div>
              <Button
                variant="link"
                size="sm"
                className="text-[color:var(--accent)] w-full text-[0.5rem]"
                onClick={() => router.push("/ascend/lessons/calculus-11-1")}
              >
                Topic Test
              </Button>
            </div>
          </div>
        </div>

        {/* Revision Activities */}
        <div className="rounded-lg bg-white border border-[color:var(--border)] p-6">
          <h2 className="text-[0.625rem] text-[color:var(--inkSmall)] uppercase tracked mb-3">
            Revision Activities
          </h2>
          <p className="text-[0.5rem] text-[color:var(--inkSmall)] mb-4">
            Quick revision exercises for {subjectConfig.name}
          </p>
          <ul className="space-y-3">
            <li className="p-3 rounded bg-[color:var(--soft)] border border-[color:var(--border)]">
              <div className="flex items-center justify-between">
                <span className="text-[0.5rem] text-[color:var(--inkSmall)]">Fill in the blanks</span>
                <span className="text-[0.5rem] text-[color:var(--accent)]">12 questions</span>
              </div>
            </li>
            <li className="p-3 rounded bg-[color:var(--soft)] border border-[color:var(--border)]">
              <div className="flex items-center justify-between">
                <span className="text-[0.5rem] text-[color:var(--inkSmall)]">Multiple choice</span>
                <span className="text-[0.5rem] text-[color:var(--accent)]">15 questions</span>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}