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

function getLessonConfig(lessonId: string) {
  const lessonLower = lessonId.toLowerCase();

  const lessonData: Record<string, { title: string; subject: string; classLevel: string; stepCount: number; steps: { id: string; title: string; type: string; content: string }[] }> = {
    "physics-11-1": {
      title: "Kinematics: Motion in a Straight Line",
      subject: "Physics",
      classLevel: "11",
      stepCount: 11,
      steps: [
        {
          id: "step-1",
          title: "Learning Objectives",
          type: "objectives",
          content: "Understand displacement, velocity and acceleration. Solve problems involving motion in a straight line with constant acceleration.",
        },
        {
          id: "step-2",
          title: "Concept Introduction",
          type: "concept",
          content: "An object's position can be described relative to a reference point. Velocity is the rate of change of position. Acceleration is the rate of change of velocity.",
        },
        {
          id: "step-3",
          title: "Detailed Explanation",
          type: "detailed-explanation",
          content: "The equations of motion for constant acceleration: v = u + at, s = ut + ½at², v² = u² + 2as. Where u is initial velocity, v is final velocity, a is acceleration, t is time, and s is displacement.",
        },
        {
          id: "step-4",
          title: "Important Definitions",
          type: "definitions",
          content: "Displacement: Change in position of an object. Velocity: Rate of change of displacement. Acceleration: Rate of change of velocity. Uniform motion: Equal displacements in equal intervals of time.",
        },
        {
          id: "step-5",
          title: "Formula Rendering",
          type: "formulae",
          content: "Key formulae: v = u + at • s = ut + ½at² • v² = u² + 2as • a = (v - u) / t",
        },
        {
          id: "step-6",
          title: "Worked Examples",
          type: "worked-example",
          content: "Example 1: A car accelerates from rest at 2 m/s² for 5 seconds. Final velocity = 0 + 2 × 5 = 10 m/s. Displacement = 0 × 5 + ½ × 2 × 5² = 25 m.",
        },
        {
          id: "step-7",
          title: "Guided Problem-Solving",
          type: "guided-problem-solving",
          content: "Try it yourself: A bus starts from rest and accelerates uniformly at 3 m/s². What is its velocity after 8 seconds? Use v = u + a t.",
        },
        {
          id: "step-8",
          title: "Independent Practice",
          type: "independent-practice",
          content: "Question: A car traveling at 20 m/s decelerates uniformly at 4 m/s². How long does it take to stop? How far does it travel during braking?",
        },
        {
          id: "step-9",
          title: "Exam-Oriented Questions",
          type: "exam-question",
          content: "Question: A train accelerates from 0 to 30 m/s in 15 seconds. What is its acceleration? How far does it travel in this time?",
        },
        {
          id: "step-10",
          title: "Knowledge Check",
          type: "knowledge-check",
          content: "Question: What is the acceleration of an object that uniformly accelerates from 5 m/s to 15 m/s in 2 seconds?",
        },
        {
          id: "step-11",
          title: "Lesson Completion",
          type: "completion",
          content: "Well done! You've completed the Kinematics lesson. Review the worked examples and try the practice problems again for mastery.",
        },
      ],
    },
    "chemistry-11-1": {
      title: "Some Basic Concepts of Chemistry",
      subject: "Chemistry",
      classLevel: "11",
      stepCount: 11,
      steps: [
        { id: "step-1", title: "Learning Objectives", type: "objectives", content: "Understand molecular theory, atomic structure and chemical bonding." },
        { id: "step-2", title: "Concept Introduction", type: "concept", content: "Matter is made of atoms. Atoms combine to form molecules through chemical bonds." },
        { id: "step-3", title: "Detailed Explanation", type: "detailed-explanation", content: "Chemical bonding includes ionic bonding (transfer of electrons), covalent bonding (sharing of electrons) and metallic bonding (delocalized electrons)." },
        { id: "step-4", title: "Important Definitions", type: "definitions", content: "Atom: smallest unit of element. Molecule: two or more atoms bonded together. Ionic bond: electrostatic attraction between ions. Covalent bond: shared electron pair." },
        { id: "step-5", title: "Formula Rendering", type: "formulae", content: "Molecular formula: H₂O • Empirical formula: HO • Avogadro's number: 6.022 × 10²³" },
        { id: "step-6", title: "Worked Examples", type: "worked-example", content: "Example: Calculate the number of molecules in 18 g of water. Molar mass of H₂O = 18 g/mol. Number of moles = 18/18 = 1 mol. Number of molecules = 1 × 6.022 × 10²³." },
        { id: "step-7", title: "Guided Problem-Solving", type: "guided-problem-solving", content: "Try it yourself: What is the empirical formula of a compound containing 40% carbon, 6.7% hydrogen and 53.3% oxygen by mass?" },
        { id: "step-8", title: "Independent Practice", type: "independent-practice", content: "Question: Calculate the molar mass of CO₂. Question: How many atoms are in 2 moles of oxygen?" },
        { id: "step-9", title: "Exam-Oriented Questions", type: "exam-question", content: "Question: What type of bond is formed between sodium and chlorine? Question: What is the molecular mass of H₂SO₄?" },
        { id: "step-10", title: "Knowledge Check", type: "knowledge-check", content: "Question: An atom with atomic number 11 has how many valence electrons?" },
        { id: "step-11", title: "Lesson Completion", type: "completion", content: "Well done! You've completed the Basic Concepts of Chemistry lesson. Review the molecular structures and bonding patterns." },
      ],
    },
    "maths-11-1": {
      title: "Sets and Functions",
      subject: "Mathematics",
      classLevel: "11",
      stepCount: 11,
      steps: [
        { id: "step-1", title: "Learning Objectives", type: "objectives", content: "Understand sets, relations and functions with their properties." },
        { id: "step-2", title: "Concept Introduction", type: "concept", content: "A set is a well-defined collection of distinct objects. A function maps each element of one set to exactly one element of another set." },
        { id: "step-3", title: "Detailed Explanation", type: "detailed-explanation", content: "Types of sets: finite, infinite, empty, equal, equivalent. Types of relations: reflexive, symmetric, transitive. Types of functions: one-one, onto, one-one onto." },
        { id: "step-4", title: "Important Definitions", type: "definitions", content: "Set: collection of distinct objects. Domain: set of all input values. Codomain: set of all possible output values. Range: actual output values. Function: each domain element has exactly one range element." },
        { id: "step-5", title: "Formula Rendering", type: "formulae", content: "f(x) = y • f: A → B • f(x) = x² • (A × B) = {(a, b) | a ∈ A, b ∈ B}" },
        { id: "step-6", title: "Worked Examples", type: "worked-example", content: "Example 1: If f(x) = 2x + 3 and x = 4, then f(4) = 2(4) + 3 = 11. Example 2: Find the domain of f(x) = 1/(x-2). Domain: all real numbers except x = 2." },
        { id: "step-7", title: "Guided Problem-Solving", type: "guided-problem-solving", content: "Try it yourself: If f(x) = x² - 5x + 6, find f(3) and f(2)." },
        { id: "step-8", title: "Independent Practice", type: "independent-practice", content: "Question: If f(x) = 3x - 7, find x when f(x) = 5. Question: Determine if the relation R = {(1,2), (2,3), (3,1)} is a function." },
        { id: "step-8", title: "Independent Practice", type: "independent-practice", content: "Question: If f(x) = 3x - 7, find x when f(x) = 5. Question: Determine if the relation R = {(1,2), (2,3), (3,1)} is a function." },
        { id: "step-9", title: "Exam-Oriented Questions", type: "exam-question", content: "Question: Find the range of f(x) = x² restricted to x ≥ 0. Question: If f and g are functions, find (f ∘ g)(x)." },
        { id: "step-10", title: "Knowledge Check", type: "knowledge-check", content: "Question: What is the difference between a relation and a function?" },
        { id: "step-11", title: "Lesson Completion", type: "completion", content: "Well done! You've completed the Sets and Functions lesson. Practice identifying domains and ranges of various functions." },
      ],
    },
  };

  const data = lessonData[lessonLower];
  if (!data) {
    return {
      title: "Lesson",
      subject: "General",
      classLevel: "11",
      stepCount: 5,
      steps: [],
    };
  }
  return data;
}

export default function AscendLessonPage() {
  const { lessonId } = useParams<{ lesson: string }>();
  const router = useRouter();

  if (!lessonId) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Lesson not specified</p>
      </div>
    );
  }

  const lesson = getLessonConfig(lessonId);
  const theme = useUniverseTheme("ascend");

  useEffect(() => {
    const classNum = 11;
    const stream = "science";
    const profile = getLearnerProfile(classNum, stream, "CBSE");
  }, [lessonId]);

  const totalSteps = lesson.stepCount;
  const currentStep = lesson.steps.find((s) => s.id === "step-1") || lesson.steps[0];
  const currentStepIndex = lesson.steps.indexOf(currentStep);
  const isLastStep = currentStepIndex >= totalSteps - 1;

  return (
    <div className="min-h-screen bg-[theme.background] text-[theme.textColor]">
      <Container className="max-w-[1600px] mx-auto p-4 md:p-6">
        {/* Lesson Header */}
        <div className="rounded-xl bg-[theme.soft] border border-[theme.border] p-6 md:p-8 mb-8">
          <BrandMark className="mb-4" />
          <h1 className="text-2xl font-display font-bold text-[theme.accent] tracking-wider">
            {lesson.title}
          </h1>
          <p className="text-[0.875rem] text-[theme.inkSmall] mt-1">
            {lesson.subject} • Class {lesson.classLevel}
          </p>
          <p className="text-[0.5rem] text-[theme.inkSmall]">
            Step {currentStepIndex + 1} of {totalSteps}
          </p>
        </div>

        {/* Lesson Progress */}
        <div className="rounded-lg bg-white border border-[theme.border] p-6 mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Lesson Progress
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((stepNum) => (
              <div
                key={stepNum}
                className={cn(
                  "rounded bg-[theme.soft] p-2 text-xs font-medium",
                  currentStepIndex + 1 === stepNum && "bg-[theme.accent] text-white"
                )}
              >
                {stepNum}
              </div>
            ))}
          </div>
          <progress
            className="w-48 h-2 rounded-full appearance-none bg-[theme.soft] border border-[theme.border] mt-3"
            value={((currentStepIndex + 1) / totalSteps) * 100}
            max={100}
          />
          <span className="text-[0.5rem] text-[theme.inkSmall] mt-1">
            {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}% complete
          </span>
        </div>

        {/* Current Step Content */}
        <div className="rounded-lg bg-white border border-[theme.border] p-8">
          <div>
            <h2 className="text-xl font-display font-bold mb-6">
              {currentStep.title}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: currentStep.content }} />
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-8 pt-8 border-t border-[theme.border]">
          <div className="flex justify-between">
            {currentStepIndex > 0 && (
              <button
                onClick={() => router.push(`/ascend/lessons/${lesson.steps[currentStepIndex - 2]?.id}`)}
                className="px-4 py-2 rounded bg-[theme.soft] border border-[theme.border] hover:bg-[theme.soft] transition-colors text-[0.5rem]"
              >
                Previous
              </button>
            )}
            {currentStepIndex < totalSteps - 1 && (
              <button
                onClick={() => router.push(`/ascend/lessons/${lesson.steps[currentStepIndex]?.id}`)}
                className="px-4 py-2 rounded bg-[theme.accent] text-white hover:bg-[theme.accentStrong] transition-colors text-[0.5rem] font-medium"
              >
                {currentStepIndex < totalSteps - 2 ? "Next" : "Complete"}
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}