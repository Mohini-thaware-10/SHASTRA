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

interface AscendDashboardProps {
  learnerProfile: LearnerProfile;
}

export function AscendDashboard({ learnerProfile }: AscendDashboardProps) {
  const reduceMotion = useReducedMotion();
  const dailyGoal = calculateDailyGoal(learnerProfile);
  const theme = universeThemesConfig["ascend"];
  const cards = getContinueLearningCards(learnerProfile);
  const subjectCards = getSubjectOverviewCards(learnerProfile);

  return (
    <section className="space-y-6">
      {/* Stream-aware welcome */}
      <div className="rounded-xl bg-[var(--universe-surface)] border border-[var(--universe-border)] p-4">
        <h1 className="text-xl font-display font-semibold text-[var(--universe-accent)]">
          {learnerProfile.fullName}
        </h1>
        {learnerProfile.stream && learnerProfile.stream !== "general" ? (
          <p className="text-ink-soft mt-1">
            {learnerProfile.stream.toUpperCase()} stream • {learnerProfile.currentUniverse.toUpperCase()}
          </p>
        ) : (
          <p className="text-ink-soft mt-1">
            {learnerProfile.currentUniverse.toUpperCase()}
          </p>
        )}
      </div>

      {/* Daily goal with academic styling */}
      <div className="rounded-lg bg-[var(--universe-soft)] border border-[var(--universe-accent)] p-3">
        <p className="text-[0.625rem] text-ink-soft mb-1">Daily Study</p>
        <p className="text-[1.25rem] font-semibold text-[var(--universe-accent)]">
          {dailyGoal.targetMinutes} min
        </p>
        <p className="text-[0.625rem] text-ink-soft">
          {dailyGoal.completedMinutes} min completed • {dailyGoal.remainingMinutes} min remaining
        </p>
      </div>

 {/* Learning cards - academic focus */}
      {cards.length > 0 && cards.some((c) => c.id !== "empty-card") ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {cards.map((card) => {
            if (card.id === "empty-card") return null;
            return (
              <div
                key={card.id}
                className="rounded-lg bg-white p-3 border border-sky-soft hover:bg-sky-soft/20 transition-colors"
              >
                <span className="text-[0.625rem] text-ink-soft mb-1">{card.subject}</span>
                <h3 className="font-medium text-ink truncate mb-1">
                  {card.lessonTitle}
                </h3>
                <p className="text-[0.55rem] text-ink-soft">
                  {card.topic} • {card.progressPercentage}% complete
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-2 text-[var(--universe-accent)] hover:text-[var(--universe-accent-strong)] transition-colors"
                  onClick={() => window.alert(`Study: ${card.lessonTitle}`)}
                >
                  Continue
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 text-center text-ink-soft">No learning activity</div>
      )}

 {/* Subject overview */}
      {subjectCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subjectCards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg bg-white p-3 border border-sky-soft hover:bg-sky-soft/20 transition-colors"
            >
              <span className="text-[0.625rem] text-ink-soft mb-1">{card.name}</span>
              <div className="h-2 rounded-full bg-sky-soft overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-strong transition-all duration-500"
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
                onClick={() => window.alert(`Study ${card.name}`)}
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