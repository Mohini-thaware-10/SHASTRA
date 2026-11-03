"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/common/container";
import { Clipboard, Calendar, Sparkles } from "lucide-react";
import type { LearnerProfile } from "@/types/dashboard";
import { calculateDailyGoal } from "@/lib/dashboard/calculations";
import { getUniverseTheme } from "@/config/dashboard";

interface DailyGoalCardProps {
  learnerProfile: LearnerProfile;
}

export function DailyGoalCard({ learnerProfile }: DailyGoalCardProps) {
  const reduceMotion = useReducedMotion();
  const dailyGoal = calculateDailyGoal(learnerProfile);
  const theme = getUniverseTheme(learnerProfile.currentUniverse);

  const { progressOffset, pathLength } = getProgressSvgParams(dailyGoal);

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-[0.15em] mb-4">
            Daily Learning Goal
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Progress ring */}
            <div className="relative flex-1">
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
                  stroke="var(--universe-accent)"
                  "stroke-width": "8"
                  fill="none"
                  strokeDasharray: pathLength
                  strokeDashoffset: progressOffset
                />
              </svg>

              <div className="text-center mt-2">
                <p className="text-[0.625rem] text-ink-muted mb-1">
                  Progress
                </p>
                <p className={cn(
                  "text-[2rem] font-semibold text-ink",
                  reduceMotion ? "transition-none" : "motion-reduce: transition-none"
                )}>
                  {dailyGoal.completedMinutes} min
                </p>
                <p className="text-[0.625rem] text-ink-soft">
                  of {dailyGoal.targetMinutes} min
                </p>
              </div>
            </div>

            {/* Goal summary card */}
            <div className="sm:w-64 p-4 rounded-lg bg-white/80 backdrop-blur-sm flex-flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-[var(--universe-accent)]" />
                <span className="text-[0.625rem] text-ink-soft">Target</span>
              </div>
              <p className={cn(
                "text-[1.25rem] font-semibold text-ink",
                reduceMotion ? "transition-none" : "motion-reduce: transition-none"
              )}>
                {dailyGoal.targetMinutes} min
              </p>
              <p className="text-[0.625rem] text-ink-soft mt-1">Daily target</p>
            </div>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}