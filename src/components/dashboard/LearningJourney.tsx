"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/common/container";
import type { LearnerProfile } from "@/types/dashboard";
import { getLearningJourneyNodes } from "@/lib/dashboard/mock-data";
import { ProgressRing } from "@/components/dashboard/ContinueLearning";

interface LearningJourneyProps {
  learnerProfile: LearnerProfile;
}

export function LearningJourney({ learnerProfile }: LearningJourneyProps) {
  const reduceMotion = useReducedMotion();
  const journeyNodes = getLearningJourneyNodes(learnerProfile);

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-[0.15em] mb-4">
            Learning Journey
          </h2>

          <div className="space-y-2">
            {journeyNodes.map((node, index) => (
              <Reveal
                key={node.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.3,
                  delay: index * 0.08,
                }}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] transition-colors hover:bg-[var(--universe-soft)] hover:border-[var(--universe-accent)]",
                    reduceMotion ? "transition-none" : "motion-reduce: transition-none"
                  )}
                >
                  {/* Status indicator ring */}
                  <ProgressRing value={node.stage === "completed" ? 100 : node.stage === "unlocked" ? 50 : 0} />

                  {/* Node content */}
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "text-[0.625rem] font-medium uppercase tracking-[0.08em]",
                      node.stage === "locked"
                        ? "text-ink-muted"
                        : node.stage === "unlocked"
                          ? "text-[var(--universe-accent)]"
                          : "text-ink"
                    )}>
                      {node.title}
                    </span>
                  </div>

                  {/* Subject icon */}
                  <span className="text-[0.75rem]">
                    {node.subject === "Mathematics" && <Calculator className="h-3.5 w-3.5" />}
                    {node.subject === "Science" && <Microscope className="h-3.5 w-3.5" />}
                    {node.subject === "Language" && <BookOpen className="h-3.5 w-3.5" />}
                    {node.subject === "Art" && <Palette className="h-3.5 w-3.5" />}
                    {node.subject === "History" && <Globe className="h-3.5 w-3.5" />
                    {node.subject === "Mathematics" && <Calculator className="h-3.5 w-3.5" />}
                  </span>

                  {/* Stage badge */}
                  <Badge
                    tone={learnerProfile.currentUniverse as any}
                    className="ml-2 text-[0.55rem] px-1.5 py-0.5"
                  >
                    {node.stage}
                  </Badge>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA for locked content */}
          {journeyNodes.some((node) => node.stage === "locked") && (
            <p className="text-[0.625rem] text-ink-soft mt-2">
              Unlock more stages to continue your learning path.
            </p>
          )}
        </Container>
      </Reveal>
    </section>
  );
}