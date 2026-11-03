"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/common/container";
import type { LearnerProfile } from "@/types/dashboard";
import {
  calculateDailyGoal,
  getContinueLearningCards,
  getSubjectOverviewCards,
} from "@/lib/dashboard/mock-data";
import { universeThemesConfig } from "@/config/dashboard";

interface NexusDashboardProps {
  learnerProfile: LearnerProfile;
}

export function NexusDashboard({ learnerProfile }: NexusDashboardProps) {
  const reduceMotion = useReducedMotion();
  const dailyGoal = calculateDailyGoal(learnerProfile);
  const theme = universeThemesConfig["nexus"];
  const cards = getContinueLearningCards(learnerProfile);
  const subjectCards = getSubjectOverviewCards(learnerProfile);

  return (
    <section className="space-y-6">
      {/* Universe-indicated welcome */}
      <div className="rounded-xl bg-[var(--universe-surface)] border border-[var(--universe-border)] p-4">
        <h1 className="text-xl font-display font-semibold text-[var(--universe-accent)]">
          {learnerProfile.fullName}! welcome to {learnerProfile.currentUniverse.toUpperCase()}
        </h1>
        <p className="text-ink-soft mt-1">
          Your adventure awaits
        </p>
      </div>

      {/* Daily goal with neon styling */}
      <div className="rounded-lg bg-[var(--universe-soft)] border border-[var(--universe-accent)] p-3">
        <p className="text-[0.625rem] text-ink-soft mb-1">Daily Quest</p>
        <p className="text-[1.25rem] font-semibold text-[var(--universe-accent)]">
          {dailyGoal.targetMinutes} min
        </p>
        <p className="text-[0.625rem] text-ink-soft">
          Completed: {dailyGoal.completedMinutes} min • Remaining: {dailyGoal.remainingMinutes} min
        </p>
      </div>

 {/* Learning cards - adventure style */}
      {cards.length > 0 && cards.some((c) => c.id !== "empty-card") ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cards.map((card) => {
            if (card.id === "empty-card") return null;
            return (
              <div
                key={card.id}
                className="rounded-lg bg-white p-3 border border-violet-soft hover:bg-violet-soft/20 transition-colors"
              >
                <span className="text-[0.625rem] text-violet-soft mb-1">{card.subject}</span>
                <h3 className="font-medium text-ink hover:text-violet-strong transition-colors truncate mb-1">
                  {card.lessonTitle}
                </h3>
                <p className="text-[0.55rem] text-violet-soft/80">
                  {card.topic} • {card.progressPercentage}% complete
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-violet-strong hover:text-violet-strong/90 transition-colors"
                  onClick={() => window.alert(`Start quest: ${card.lessonTitle}`)}
                >
                  Continue
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 text-center text-violet-soft">
          Start your first quest to begin.
        </div>
      )}

 {/* Subject overview */}
      {subjectCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjectCards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg bg-white p-3 border border-violet-soft hover:bg-violet-soft/20 transition-colors"
            >
              <Badge
                tone="violet"
                className="me-2 mb-2"
              >
                {card.name}
              </Badge>
              <div className="h-2 rounded-full bg-violet-soft overflow-hidden">
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
                onClick={() => window.alert(`Learn ${card.name}`)}
              >
                Continue learning
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-violet-soft">No subjects selected</div>
      )}
    </section>
  );
}