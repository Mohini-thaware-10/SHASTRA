"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/common/container";
import { Badge, Sparkles, Target, Flame, BookOpen, Brain, Calculator, Globe } from "lucide-react";
import type { LearnerProfile, Recommendation } from "@/types/dashboard";
import { getRecommendationsWithStatus, getSampleRecommendations } from "@/lib/dashboard/recommendations";

interface RecommendedQuestsProps {
  learnerProfile: LearnerProfile;
}

export function RecommendedQuests({
  learnerProfile,
}: RecommendedQuestsProps) {
  const reduceMotion = useReducedMotion();
  const { recommendations, hasAssessmentData } = getRecommendationsWithStatus(
    learnerProfile,
  );

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-[0.15em] mb-4">
            {hasAssessmentData
              ? "Recommended Quests"
              : "Sample Recommendations (No Assessment)"}
          </h2>

          {/* Assessment data indicator */}
          {!hasAssessmentData && (
            <div className="p-3 rounded-lg bg-[var(--universe-surface)] border border-coral/30 mb-3">
              <Sparkles className="h-3 w-3 text-coral" strokeWidth={1} />
              <span className="text-[0.625rem] text-coral">
                No assessment data available. Showing sample recommendations.
              </span>
            </div>
          )}

          {/* Recommendations list */}
          {recommendations.length === 0 ? (
            <div className="p-4 text-center text-ink-soft rounded-lg bg-[var(--universe-surface)]">
              {hasAssessmentData
                ? "No recommendations at this time"
                : "Complete an assessment to get personalized recommendations"}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recommendations.map((rec) => (
                <Reveal
                  key={rec.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                    delay: recommendations.indexOf(rec) * 0.08,
                  }}
                >
                  <div
                    className={cn(
                      "group rounded-lg border border-[var(--universe-border)] bg-[var(--universe-soft)] overflow-hidden hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-shadow duration-300",
                      reduceMotion ? "transition-none" : "motion-reduce: transition-none"
                    )}
                  >
                    {/* Subject badge */}
                    <Badge
                      tone={learnerProfile.currentUniverse as any}
                      className="p-2 mb-3"
                    >
                      {rec.subject}
                    </Badge>

                    {/* Quest details */}
                    <div className="p-3">
                      <h3 className="text-[0.75rem] font-medium text-ink mb-1">
                        {rec.title}
                      </h3>

                      <p className="text-[0.625rem] text-ink-soft line-clamp-2 mb-3">
                        {rec.topic}
                      </p>

                      {/* Difficulty tag */}
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[0.55rem] font-semibold",
                        rec.difficulty === "easy"
                          ? "bg-green-100 text-green-800"
                          : rec.difficulty === "medium"
                            ? "bg-violet-100 text-violet-800"
                            : "bg-coral-100 text-coral-800"
                      )}>
                        {rec.difficulty}
                      </span>

                      {/* Duration */}
                      <p className="text-[0.625rem] text-ink-soft mb-2">
                        {rec.estimatedDuration} min
                      </p>

                      {/* Reason */}
                      <p className="text-[0.625rem] text-ink-soft/80 text-sm line-clamp-2">
                        {rec.reason}
                      </p>

                      {/* Start button */}
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        onClick={() => {
                          window.alert(`Starting: ${rec.title} - ${rec.topic}`);
                        }}
                      >
                        <Play className="h-3.5 w-3.5 mr-1.5" strokeWidth={2} />
                        {rec.actionLabel}
                      </Button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Reveal>
    </section>
  );
}