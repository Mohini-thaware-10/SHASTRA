"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/common/container";
import type { LearnerProfile } from "@/types/dashboard";
import { getRecentActivityEvents } from "@/lib/dashboard/mock-data";

interface RevisionCentreProps {
  learnerProfile: LearnerProfile;
}

export function RevisionCentre({ learnerProfile }: RevisionCentreProps) {
  const reduceMotion = useReducedMotion();
  const events = getRecentActivityEvents(learnerProfile);

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-[0.15em] mb-4">
            Revision Centre
          </h2>

          {/* Summary stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <div className="group rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <Clock className="h-4 w-4 text-[var(--universe-accent)]" />
              <p className="text-[0.625rem] text-ink-soft mt-1">Sessions</p>
              <p className="text-ink mb-0">5</p>
            </div>

            <div className="group rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <Target className="h-4 w-4 text-[var(--universe-accent)]" />
              <p className="text-[0.625rem] text-ink-soft mt-1">Topics</p>
              <p className="text-ink mb-0">12</p>
            </div>

            <div className="group rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <Calendar className="h-4 w-4 text-[var(--universe-accent)]" />
              <p className="text-[0.625rem] text-ink-soft mt-1">Days</p>
              <p className="text-ink mb-0">7</p>
            </div>

            <div className="group rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <Badge
                tone={learnerProfile.currentUniverse as any}
                className="h-4 w-4"
              />
              <p className="text-[0.625rem] text-ink-soft mt-1">Mastery</p>
              <p className="text-ink mb-0">67%</p>
            </div>
          </div>

 {/* Activity timeline */}
          <div className="space-y-3">
            {events.map((event) => (
              <Reveal
                key={event.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                transition={{ duration: reduceMotion ? 0 : 0.3, delay: events.indexOf(event) * 0.05 }}
              >
                <div
                  className={cn(
                    "flex items-start gap-3 px-3 py-2 rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] transition-colors hover:bg-[var(--universe-soft)]",
                    reduceMotion ? "transition-none" : "motion-reduce: transition-none"
                  )}
                >
                  {/* Visual indicator */}
                  <span className="w-3 h-3 rounded-full flex-shrink-0">
                    {event.visualIndicator === "sprout"
                      ? <svg
                          className="h-3 w-3 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 3l5 5-1.4 1.4L12 12l-5 5L3 9l8.6-8.6L12 3z" />
                        </svg>
                      : event.visualIndicator === "trophy"
                        ? <svg
                            className="h-3 w-3 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 3l5 5-1.4 1.4L12 12l-5 5L3 9l8.6-8.6L12 3zM12 4.1C8.37 4.1 5.3 7.1 5.3 11s3.07 6.9 6.7 7.5L12 20l5.3-2.6c3.63-1.8 6.7-4.8 6.7-8.7s-3.07-6.9-6.7-7.5L12 4.1z" />
                          </svg>
                        : event.visualIndicator === "calendar"
                          ? <svg
                              className="h-3 w-3 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                            </rect>
                          </svg>
                          : event.visualIndicator === "calculator"
                            ? <svg
                                className="h-3 w-3 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="9" y1="9" x2="15" y2="9" />
                              </rect>
                            </svg>
                            : event.visualIndicator === "book-open"
                              ? <svg
                                  className="h-3 w-3 fill-current"
                                  viewBox="0 0 24 24"
                                >
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                  <line x1="16" y1="2" x2="16" y2="6" />
                                  <line x1="8" y1="2" x2="8" y2="6" />
                                  <line x1="9" y1="9" x2="15" y2="9" />
                                </rect>
                                <line x1="9" y1="20" x2="15" y2="20" />
                                <line x1="12" y1="15" x2="12" y2="20" />
                                <line x1="6" y1="15" x2="6" y2="20" />
                                <line x1="18" y1="15" x2="18" y2="20" />
                                <line x1="6" y1="10" x2="18" y1="10" />
                                <line x1="6" y1="14" x2="18" y1="14" />
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <path d="M3 3v18h18V3H3zm1 17.9l6.6-3.3 1.4 5.5H5.1l1.4-5.5L3 3.9z" />
                                <path d="M12 9v6m0-6v6" />
                              </svg>
                              : "—"
                    </span>
                  </span>

                  {/* Event content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.625rem] text-ink-soft truncate mb-1">
                      {event.description}
                    </p>
                    <p className="text-[0.55rem] text-ink-soft/70">
                      {event.subject} • {event.timestamp}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA */}
          {events.length < 3 && (
            <p className="text-[0.625rem] text-ink-soft mt-2">
              Start a revision session to build your history.
            </p>
          )}
        </Container>
      </Reveal>
    </section>
  );
}