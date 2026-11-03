"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/common/reveal";
import { Container } from "@/components/common/container";
import { Badge, Shield, Star, Flame, Trophy, Users, Zap, Clock } from "lucide-react";
import type { LearnerProfile } from "@/types/dashboard";
import { calculateGamificationSummary, formatXP, formatDuration } from "@/lib/dashboard/calculations";
import { universeThemesConfig } from "@/config/dashboard";

interface GamificationSummaryProps {
  learnerProfile: LearnerProfile;
}

export function GamificationSummary({ learnerProfile }: GamificationSummaryProps) {
  const reduceMotion = useReducedMotion();
  const gamification = calculateGamificationSummary(learnerProfile);
  const theme = universeThemesConfig[learnerProfile.currentUniverse];

  const { totalXP, currentLevel, currentStreak, highestStreak, coins } = gamification;

  return (
    <section className="mb-8">
      <Reveal
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
      >
        <Container>
          <h2 className="text-sm font-semibold text-ink-soft uppercase tracking-[0.15em] mb-4">
            My Progress
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Total XP */}
            <div className="group rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <XpBadge xp={totalXP} />
              <p className="text-[0.625rem] text-ink-soft mt-1">Total XP</p>
            </div>

            {/* Current Level */}
            <div className="group rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <LevelBadge level={currentLevel} />
              <p className="text-[0.625rem] text-ink-soft mt-1">Level</p>
            </div>

            {/* Coins */}
            <div className="group rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <CoinBadge coins={coins} />
              <p className="text-[0.625rem] text-ink-soft mt-1">Coins</p>
            </div>

            {/* Streak */}
            <div className="group rounded-lg bg-[var(--universe-surface)] border border-[var(--universe-border)] p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-shadow duration-300">
              <StreakBadge
                currentStreak={currentStreak}
                highestStreak={highestStreak}
              />
              <p className="text-[0.625rem] text-ink-soft mt-1">Streak</p>
            </div>
          </div>

          {/* Streak details below */}
          <div className="mt-4 pt-4 border-t border-border-soft">
            <Reveal
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row gap-2 sm:items-end justify-between">
                <p className="text-[0.625rem] text-ink-soft">
                  {currentStreak} day{currentStreak !== 1 ? "s" : ""} learning streak
                </p>
                {highestStreak > currentStreak && (
                  <p className="text-[0.625rem] text-ink-soft">
                    Highest: {highestStreak} day{highestStreak !== 1 ? "s" : ""}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </Reveal>
    </section>
  );
}

/* Badge components for gamification summary */

function XpBadge({ xp }: { xp: number }) {
  return (
    <div className="flex items-center gap-2">
      <Star className="h-5 w-5 text-[var(--universe-accent)]" />
      <span className="text-[1.125rem] font-semibold text-ink">
        {formatXP(xp)}
      </span>
    </div>
  );
}

function LevelBadge({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-2">
      <Shield className="h-5 w-5 text-[var(--universe-accent)]" />
      <span className="text-[1.125rem] font-semibold text-ink">{level}</span>
    </div>
  );
}

function CoinBadge({ coins }: { coins: number }) {
  return (
    <div className="flex items-center gap-2">
      <Zap className="h-5 w-5 text-gold" />
      <span className="text-[1.125rem] font-semibold text-ink">{coins}</span>
    </div>
  );
}

function StreakBadge({ currentStreak, highestStreak }: { currentStreak: number; highestStreak?: number }) {
  return (
    <div className="flex items-center gap-2">
      <Clock className="h-5 w-5 text-[var(--universe-accent)]" />
      <span className="text-[1.125rem] font-semibold text-ink">
        {currentStreak}
      </span>
      <span className="text-[0.625rem] text-ink-soft/ml-1">•</span>
      <span className="text-[0.625rem] text-ink-soft">
        {highestStreak > currentStreak ? highestStreak : "—"}
      </span>
    </div>
  );
}