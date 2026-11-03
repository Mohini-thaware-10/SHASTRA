"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/common/container";
import { universeThemesConfig } from "@/config/dashboard";
import type { LearnerProfile } from "@/types/dashboard";
import { getDailyGoal, getProgressSvgParams } from "@/lib/dashboard/calculations";
import { getUniverseForClass } from "@/config/dashboard";

interface WelcomeSectionProps {
  learnerProfile: LearnerProfile;
  dailyGoal: ReturnType<typeof calculateDailyGoal>["progressPercentage"] extends number ? { progressPercentage: number; targetMinutes: number; completedMinutes: number; remainingMinutes: number; suggestedAction: string } : never;
  progressOffset: string;
  percentage: number;
  pathLength: number;
}

export function WelcomeSection({
  learnerProfile,
  dailyGoal,
  progressOffset,
  percentage,
  pathLength,
}: WelcomeSectionProps) {
  const reduceMotion = useReducedMotion();
  const themeConfig = universeThemesConfig[learnerProfile.currentUniverse];

  // Friendly greeting based on time of day
  const hour = new Date().getHours();
  let greeting: string;
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const name = learnerProfile.fullName;

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Personalised greeting */}
            <div className="flex-1">
              <h1 className={cn(
                "text-[2.25rem] font-display font-semibold leading-[1.1] tracking-[-0.04em] text-ink",
                reduceMotion ? "transition-none" : "motion-reduce: transition-none"
              )}>
                {greeting}, {name}!
              </h1>

              <p className={cn(
                "mt-2 text-[1.125rem] text-ink-soft",
                reduceMotion ? "transition-none" : "motion-reduce: transition-none"
              )}>
                Your next learning adventure is waiting.
              </p>
            </n>

            {/* Universe indicator badge */}
            <div className="flex items-center gap-2 rounded-full border border-[var(--universe-border)] bg-[var(--universe-soft)] px-4 py-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--universe-accent)]" />
              <span className="text-[0.75rem] font-medium text-[var(--universe-accent)]">
                {learnerProfile.currentUniverse.toUpperCase()} {learnerProfile.currentClass}
              </span>
            </div>
          </div>

          {/* Daily goal progress bar */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Progress ring */}
            <div className="relative">
              <svg
                className="w-full h-24 sm:h-32 rounded-full bg-[var(--universe-surface)] flex items-center justify-center"
                viewBox="0 0 100 100"
                style={{ strokeDasharray: pathLength, strokeDashoffset: progressOffset }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="var(--universe-accent)"
                  "stroke-width": "8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="var(--universe-accent-strong)"
                  "stroke-width": "8"
                  fill="none"
                  strokeDasharray: pathLength
                  strokeDashoffset: progressOffset
                />
              </svg>

              <div className="text-center mt-2">
                <p className="text-[0.75rem] text-ink-muted mb-1">
                  Daily Goal
                </p>
                <p className={cn(
                  "text-[1.5rem] font-semibold text-ink",
                  reduceMotion ? "transition-none" : "motion-reduce: transition-none"
                )}>
                  {dailyGoal.completedMinutes}/{dailyGoal.targetMinutes} min
                </p>
              </div>
            </div>

            {/* Goal details card */}
            <div className="p-4 rounded-lg bg-white/80 backdrop-blur-sm">
              <p className="text-[0.75rem] text-ink-soft mb-2">Goal</p>
              <p className={cn(
                "text-[1.25rem] font-semibold text-ink",
                reduceMotion ? "transition-none" : "motion-reduce: transition-none"
              )}>
                {dailyGoal.targetMinutes} min
              </p>
              <p className="text-[0.625rem] text-ink-soft mt-1">
                Target per day
              </p>
            </div>
          </div>

          {/* Progress percentage and suggestion */}
          <div className="mt-4 sm:mt-6 text-center">
            <Reveal
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: 0.2 }}
            >
              <span className={cn(
                "text-[0.875rem] font-medium",
                percentage >= 100 ? "text-green-600" : percentage >= 75 ? "text-violet-600" : percentage >= 50 ? "text-sky-600" : "text-coral-600"
              )}>
                {percentage}% complete
              </span>
            </Reveal>

            <p className="mt-2 text-[0.625rem] text-ink-soft">
              {dailyGoal.suggestedAction}
            </p>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}