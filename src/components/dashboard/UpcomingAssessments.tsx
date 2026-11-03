"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/common/container";
import type { LearnerProfile } from "@/types/dashboard";
import { getMockAssessmentResult } from "@/lib/dashboard/mock-data";

interface UpcomingAssessmentsProps {
  learnerProfile: LearnerProfile;
}

export function UpcomingAssessments({
  learnerProfile,
}: UpcomingAssessmentsProps) {
  const reduceMotion = useReducedMotion();
  const assessmentResult = getMockAssessmentResult(learnerProfile);

  const { score, total, percentage, subjectAccuracies } = assessmentResult;

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-[0.15em] mb-4">
            Upcoming Assessments
          </h2>

          {/* Assessment result card */}
          <div className="group rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] p-4 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[1.25rem] font-semibold text-ink">
                {percentage}%
              </span>
              <span className="text-[0.625rem] text-ink-soft">
                of {total} questions
              </span>
            </div>

            <p className="text-[0.625rem] text-ink-soft mb-2">
              Last assessment
            </p>

            <div className="flex gap-2">
              {Object.entries(subjectAccuracies)
                .slice(0, 3)
                .map(([subject, accuracy]) => (
                  <span
                    key={subject}
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded text-[0.55rem] font-semibold",
                      accuracy >= 80
                        ? "bg-green-100 text-green-800"
                        : accuracy >= 50
                          ? "bg-violet-100 text-violet-800"
                          : "bg-coral-100 text-coral-800"
                    )}
                  >
                    {subject}: {accuracy}%
                  </span>
                ))}
            </div>
          </div>

          {/* No assessments empty state */}
          {percentage === 0 && (
            <div className="p-6 text-center text-ink-soft rounded-lg bg-[var(--universe-surface)]">
              <Calendar className="h-6 w-6 mx-auto opacity-50" />
              <p className="mt-2">No upcoming assessments</p>
              <p className="mt-1">Complete a diagnostic assessment to see results here.</p>
            </div>
          )}

 {/* Action button */}
          <div className="mt-4 pt-4 border-t border-border-soft">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => {
                window.alert("Navigating to assessment review page");
              }}
            >
              Review Assessment
            </Button>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}