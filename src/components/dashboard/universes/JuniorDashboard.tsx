"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/common/container";
import type { LearnerProfile } from "@/types/dashboard";
import {
  getDailyGoal,
  calculateDailyGoal,
} from "@/lib/dashboard/calculations";
import { getContinueLearningCards, getSubjectOverviewCards } from "@/lib/dashboard/mock-data";
import { universeThemesConfig } from "@/config/dashboard";

interface JuniorDashboardProps {
  learnerProfile: LearnerProfile;
}

export function JuniorDashboard({ learnerProfile }: JuniorDashboardProps) {
  const reduceMotion = useReducedMotion();
  const dailyGoal = calculateDailyGoal(learnerProfile);
  const theme = universeThemesConfig["junior"];
  const cards = getContinueLearningCards(learnerProfile);
  const subjectCards = getSubjectOverviewCards(learnerProfile);

  return (
    <section className="space-y-6">
      {/* Welcome adapted for Junior */}
      <div className="rounded-2xl bg-[var(--universe-surface)] border border-[var(--universe-border)] p-4">
        <h1 className="text-2xl font-display font-semibold text-[var(--universe-accent)]">
          Good morning, {learnerProfile.fullName}!
        </h1>
        <p className="text-ink-soft mt-1">
          Your next learning adventure is waiting
        </p>
      </div>

      {/* Daily goal with pastel styling */}
      <div className="rounded-lg bg-[var(--universe-soft)] border border-[var(--universe-accent)] p-3">
        <p className="text-[0.625rem] text-ink-soft mb-1">Daily Goal</p>
        <p className="text-[1.25rem] font-semibold text-[var(--universe-accent)]">
          {dailyGoal.targetMinutes} min
        </p>
        <p className="text-[0.625rem] text-ink-soft">
          Completed: {dailyGoal.completedMinutes} min
        </p>
      </div>

 {/* Learning cards - age-appropriate */}
      {cards.length > 0 && cards.some((c) => c.id !== "empty-card") ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cards.map((card) => {
            if (card.id === "empty-card") return null;
            return (
              <div
                key={card.id}
                className="rounded-lg bg-white p-3 hover:bg-[var(--universe-accent-soft)] transition-colors"
              >
                <span className="text-[0.625rem] text-ink-soft mb-1">{card.subject}</span>
                <h3 className="font-medium text-ink truncate mb-1">{card.lessonTitle}</h3>
                <p className="text-[0.55rem] text-ink-soft">
                  {card.topic} • {card.progressPercentage}% complete
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-[var(--universe-accent)] hover:text-[var(--universe-accent-strong)] transition-colors"
                  onClick={() => window.alert(`Continue: ${card.lessonTitle}`)}
                >
                  Continue
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 text-center text-ink-soft">
          Start your first lesson to begin.
        </div>
      )}

 {/* Subject overview */}
      {subjectCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjectCards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg bg-white p-3 hover:bg-[var(--universe-accent-soft)] transition-colors"
            >
              <span className="text-[0.625rem] text-ink-soft mb-1">{card.name}</span>
              <div className="h-2 rounded-full bg-[var(--universe-surface)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--universe-accent)] transition-all duration-500"
                  style={{ width: `${card.progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-[0.55rem] text-ink-soft mt-1">
                {card.topicsCompleted}/{card.totalTopics} topics
              </p>
              <Button
                variant="link"
                size="sm"
                className="mt-2 text-[var(--universe-accent)] hover:text-[var(--universe-accent-strong)] transition-colors w-full"
                onClick={() => window.alert(`Learn ${card.name}`)}
              >
                Continue
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-ink-soft">No subjects selected</div>
      )}
    </section>
  );
}