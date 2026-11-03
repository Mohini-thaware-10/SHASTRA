"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/common/container";
import { Card, Palette, BookOpen, Microscope, Atom, Calculator, Globe, Globe2 } from "lucide-react";
import type { LearnerProfile } from "@/types/dashboard";
import { calculateSubjectProgress } from "@/lib/dashboard/calculations";
import { universeThemesConfig } from "@/config/dashboard";

interface SubjectOverviewProps {
  learnerProfile: LearnerProfile;
}

export function SubjectOverview({ learnerProfile }: SubjectOverviewProps) {
  const reduceMotion = useReducedMotion();
  const subjectCards = calculateSubjectProgress(learnerProfile);
  const theme = universeThemesConfig[learnerProfile.currentUniverse];

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-[0.15em] mb-4">
            Subject Overview
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subjectCards.map((card, index) => (
              <Reveal
                key={card.id}
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: index * 0.1,
                }}
              >
                <div
                  className={cn(
                    "group rounded-lg border border-[var(--universe-border)] bg-[var(--universe-soft)] overflow-hidden hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-shadow duration-300",
                    reduceMotion ? "transition-none" : "motion-reduce: transition-none"
                  )}
                >
                  {/* Subject name with tone-aware badge */}
                  <div className="p-3 border-b border-line/80">
                    <Badge
                      tone={theme.tone as any}
                      className="me-2"
                    >
                      {card.name}
                    </Badge>
                  </div>

                  <div className="p-3">
                    {/* Topics completed */}
                    <div className="flex items-center gap-2 text-[0.625rem] text-ink-soft mb-2">
                      <span>
                        <span className="mr-1">{card.topicsCompleted}</span>
                        /{card.totalTopics}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 rounded-full bg-[var(--universe-surface)] overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full bg-[var(--universe-accent)] transition-all duration-500",
                          card.masteryClassification === "mastering"
                            ? "bg-[var(--universe-accent-strong)]"
                            : card.masteryClassification === "developing"
                              ? "bg-[var(--universe-highlight)]"
                              : "bg-[var(--universe-accent)]"
                        )}
                        style={{ width: `${card.progressPercentage}%` }}
                      ></div>
                    </div>

                    {/* Mastery classification tag */}
                    <Badge
                      tone={theme.tone as any}
                      className="mt-2 text-[0.55rem] px-2 py-0.5 rounded"
                    >
                      {card.masteryClassification}
                    </Badge>

                    {/* Continue action */}
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2 w-full text-[var(--universe-accent)] hover:text-[var(--universe-accent-strong)] transition-colors"
                      onClick={() => {
                        // Navigate to subject learning
                        window.alert(`Starting ${card.name} learning`);
                      }}
                    >
                      Continue learning
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Empty state */}
          {subjectCards.length === 0 && (
            <div className="p-8 text-center text-ink-soft rounded-lg bg-[var(--universe-surface)]">
              <BookOpen className="h-10 w-10 mx-auto opacity-50" />
              <p className="mt-2">No subjects selected</p>
              <p className="mt-1">Add subjects in your learning preferences.</p>
            </div>
          )}
        </Container>
      </Reveal>
    </section>
  );
}