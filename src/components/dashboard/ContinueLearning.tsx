"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/common/container";
import { Card, Play, Plus } from "lucide-react";
import type { LearnerProfile } from "@/types/dashboard";
import { getContinueLearningCards } from "@/lib/dashboard/mock-data";

interface ContinueLearningProps {
  learnerProfile: LearnerProfile;
}

export function ContinueLearning({ learnerProfile }: ContinueLearningProps) {
  const reduceMotion = useReducedMotion();
  const cards = getContinueLearningCards(learnerProfile);

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-[0.15em] mb-4">
            Continue Learning
          </h2>

          {cards.length === 0 || (cards.length === 1 && cards[0].id === "empty-card") ? (
            // Empty state
            <div className="p-8 text-center text-ink-soft rounded-lg bg-[var(--universe-surface)]">
              <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" strokeWidth={2} />
              <p>No learning activity yet.</p>
              <p className="mt-2">Start your first lesson to begin.</p>
            </div>
          ) : (
            // Learning cards grid
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cards.map((card) => {
                // Skip the empty card
                if (card.id === "empty-card") return null;

                const durationText =
                  card.estimatedDuration <= 15
                    ? "Short"
                    : card.estimatedDuration <= 30
                      ? "Medium"
                      : "Long";

                return (
                  <Reveal
                    key={card.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.4,
                      delay: card.id.endsWith("-0") ? 0 : 0.1,
                    }}
                  >
                    <div
                      className={cn(
                        "group rounded-lg border border-[var(--universe-border)] bg-[var(--universe-soft)] overflow-hidden hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-shadow duration-300",
                        reduceMotion ? "transition-none" : "motion-reduce: transition-none"
                      )}
                    >
                      {/* Subject badge color */}
                      <Badge
                        tone={theme.tone as any}
                        className="mb-2"
                      >
                        {card.subject}
                      </Badge>

                      <div className="p-3">
                        <h3 className="text-[0.75rem] font-medium text-ink truncate mb-1">
                          {card.lessonTitle}
                        </h3>

                        <p className="text-[0.625rem] text-ink-soft line-clamp-2 mb-2">
                          {card.topic}
                        </p>

                        <div className="flex items-center gap-2 text-[0.625rem] text-ink-soft">
                          <ProgressRing value={card.progressPercentage} />
                          <span>{card.progressPercentage}%</span>
                        </div>

                        <p className="text-[0.625rem] text-ink-soft mt-1">
                          {durationText} • {card.estimatedDuration} min
                        </p>
                      </div>

                      {/* Continue button */}
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        onClick={() => {
                          // Simulate continuing lesson
                          window.alert(`Starting: ${card.lessonTitle}`);
                        }}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1.5" strokeWidth={2} />
                        Continue
                      </Button>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </Reveal>
    </section>
  );
}

/**
 * Progress ring SVG component for daily goal and learning cards
 */
function ProgressRing({ value }: { value: number }) {
  const pathLength = 100;
  const offset = `${(100 - value) / 100 * pathLength}px`;

  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 100 100"
      style={{ strokeDasharray: pathLength, strokeDashoffset: offset }}
    >
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke="currentColor"
        "stroke-width": "4"
        fill="none"
      />
    </svg>
  );
}