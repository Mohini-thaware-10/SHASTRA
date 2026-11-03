"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/common/container";
import type { LearnerProfile } from "@/types/dashboard";
import { universeThemesConfig } from "@/config/dashboard";

interface AITutorEntryProps {
  learnerProfile: LearnerProfile;
}

function getSuggestedQuestions(universeId: string): string[] {
  const baseQuestions = [
    "How do I solve for x in this equation?",
    "What is the function of mitochondria in a cell?",
    "Can you explain the causes of World War I?",
    "How do I calculate compound interest?",
    "What are the states of matter?",
  ];

  // Return questions appropriate for the universe
  if (universeId === "junior") {
    return [
      "How do I add two numbers together?",
      "What do plants need to grow?",
      "Why is the sky blue?",
      "How do I count to 100?",
      "What colors make green?",
    ];
  } else if (universeId === "nexus") {
    return [
      "How do I solve for x?",
      "What is photosynthesis?",
      "Who wrote the Declaration of Independence?",
      "How do I balance chemical equations?",
      "What is the periodic table?",
    ];
  } else {
    // ascend
    return [
      "Can you help me with this calculus problem?",
      "Explain the law of conservation of energy.",
      "How do I analyze this financial statement?",
      "What is the structure of an atom?",
      "Can you help me with this economics concept?",
    ];
  }
}

export function AITutorEntry({ learnerProfile }: AITutorEntryProps) {
  const reduceMotion = useReducedMotion();
  const theme = universeThemesConfig[learnerProfile.currentUniverse];
  const suggestedQuestions = getSuggestedQuestions(learnerProfile.currentUniverse);

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-[0.15em] mb-4">
            SHATRA AI Tutor
          </h2>

          {/* Description */}
          <p className="text-[0.875rem] text-ink-soft mb-4">
            I'm SHATRA's AI tutor — here to help you with questions, explain concepts,
            and guide your learning. I'm here to support your learning journey.
          </p>

 {/* Suggested example questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {suggestedQuestions.map((question, index) => (
              <Reveal
                key={question}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.2,
                  delay: index * 0.05,
                }}
              >
                <div
                  className={cn(
                    "group rounded-lg border border-[var(--universe-border)] bg-[var(--universe-soft)] p-3 hover:bg-[var(--universe-surface)] transition-colors",
                    reduceMotion ? "transition-none" : "motion-reduce: transition-none"
                  )}
                >
                  <p className="text-[0.625rem] text-ink-soft line-clamp-1">
                    {question}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

 {/* Open Tutor button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            className="mt-4"
            onClick={() => {
              // Placeholder: open tutor modal or route
              window.alert("AI Tutor modal would open here");
            }}
          >
            Open Tutor
          </Button>
        </Container>
      </Reveal>
    </section>
  );
}