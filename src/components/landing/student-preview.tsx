"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Compass,
  Flame,
  Home,
  Lock,
  Sparkles,
  Swords,
  Trophy,
  User,
} from "lucide-react";
import Link from "next/link";
import type { KeyboardEvent } from "react";
import { useId, useState } from "react";

import { BrandMark } from "@/components/common/brand-mark";
import { studentExperienceContent, toneStyles } from "@/content/landing";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type StudentTab = "quests" | "worlds" | "achievements";

const tabIds: readonly StudentTab[] = ["quests", "worlds", "achievements"];

const railItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Compass, label: "Worlds" },
  { icon: Swords, label: "Quests" },
  { icon: Trophy, label: "Awards" },
  { icon: User, label: "Profile" },
];

function ExplorerAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-11 w-11",
    lg: "h-16 w-16",
  };

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[linear-gradient(145deg,#e8e0ff,#b8e4f2)] shadow-[0_10px_24px_-16px_rgba(60,49,106,0.6)]",
        sizes[size],
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-full w-full" fill="none">
        <circle cx="32" cy="35" r="20" fill="#f6c9a6" />
        <path d="M13 36C13 20 21 13 32 13C43 13 51 20 51 36C46 29 40 26 32 26C24 26 18 29 13 36Z" fill="#2c245c" />
        <path d="M13 36C11 45 14 52 19 55C18 46 19 40 23 35Z" fill="#2c245c" />
        <path d="M51 36C53 45 50 52 45 55C46 46 45 40 41 35Z" fill="#2c245c" />
        <circle cx="25" cy="38" r="2.2" fill="#2c245c" />
        <circle cx="39" cy="38" r="2.2" fill="#2c245c" />
        <path d="M28 45C30 47 34 47 36 45" stroke="#b15c48" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18 58C21 52 26 49 32 49C38 49 43 52 46 58" fill="#6f5ce0" />
        <path d="M18 59C23 54 27 55 32 59C37 55 41 54 46 59" stroke="#f5c56f" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function ProgressBar({
  value,
  tone = "violet",
  className,
}: {
  value: number;
  tone?: "violet" | "mint" | "gold" | "sky" | "coral";
  className?: string;
}) {
  const toneClasses = {
    violet: "from-violet to-[#a092f3]",
    mint: "from-mint to-[#9ad9c6]",
    gold: "from-gold to-[#efcd83]",
    sky: "from-sky to-[#a5daed]",
    coral: "from-coral to-[#f5b08a]",
  };

  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-ink/[0.06]", className)}>
      <div
        className={cn("h-full rounded-full bg-gradient-to-r", toneClasses[tone])}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

function QuestPanel() {
  return (
    <div className="space-y-2.5">
      {studentExperienceContent.quests.map((quest) => {
        const Icon = getIcon(quest.icon);
        const tone = toneStyles[quest.tone];

        return (
          <div
            key={quest.id}
            className="group flex items-center gap-3 rounded-2xl border border-line/80 bg-white/75 p-3 transition-colors hover:bg-white sm:gap-4 sm:p-3.5"
          >
            <span
              className={cn(
                "grid h-10 w-10 shrink-0 place-items-center rounded-[0.9rem] border sm:h-11 sm:w-11",
                tone.soft,
                tone.text,
                tone.border,
              )}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-[0.8rem] font-semibold text-ink sm:text-[0.86rem]">
                  {quest.title}
                </p>
                <span className="hidden rounded-full bg-ink/[0.04] px-2 py-0.5 text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-ink-muted sm:inline">
                  {quest.subject}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2.5">
                <ProgressBar
                  value={quest.progress}
                  tone={quest.tone}
                  className="flex-1"
                />
                <span className="w-8 text-right text-[0.6rem] font-semibold text-ink-muted">
                  {quest.progress}%
                </span>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[0.62rem] font-bold text-violet-strong">+{quest.xp}</p>
              <p className="text-[0.48rem] font-semibold uppercase tracking-[0.1em] text-ink-muted/60">
                XP
              </p>
            </div>
            <ArrowRight className="hidden h-4 w-4 shrink-0 text-ink-muted/40 transition-transform group-hover:translate-x-0.5 sm:block" />
          </div>
        );
      })}

      <div className="flex items-center justify-between rounded-2xl border border-dashed border-violet/20 bg-violet-soft/40 px-3.5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-violet">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={1.9} />
          </span>
          <p className="text-[0.68rem] font-medium text-ink-muted">
            A new quest unlocks at your next milestone.
          </p>
        </div>
        <span className="hidden text-[0.58rem] font-semibold text-violet-strong sm:block">
          Coming up
        </span>
      </div>
    </div>
  );
}

function WorldsPanel() {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {studentExperienceContent.worlds.map((world) => {
        const Icon = getIcon(world.icon);
        const tone = toneStyles[world.tone];

        return (
          <div
            key={world.id}
            className="group rounded-2xl border border-line/80 bg-white/75 p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_40px_-34px_rgba(30,24,58,0.45)]"
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-[0.9rem] border",
                  tone.soft,
                  tone.text,
                  tone.border,
                )}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.78rem] font-semibold text-ink">
                  {world.name}
                </p>
                <p className="mt-0.5 text-[0.52rem] font-medium uppercase tracking-[0.12em] text-ink-muted/70">
                  {world.mastery}% mastery
                </p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-ink-muted/40 transition-transform group-hover:translate-x-0.5" />
            </div>
            <ProgressBar
              value={world.mastery}
              tone={world.tone === "blush" ? "coral" : world.tone}
              className="mt-3"
            />
          </div>
        );
      })}
    </div>
  );
}

function AchievementsPanel() {
  const unlocked = studentExperienceContent.achievements.filter(
    (achievement) => achievement.unlocked,
  ).length;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[0.65rem] font-medium text-ink-muted">
          {unlocked} of {studentExperienceContent.achievements.length} badges unlocked
        </p>
        <span className="text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-violet-strong">
          Keep exploring
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {studentExperienceContent.achievements.map((achievement) => {
          const Icon = getIcon(achievement.icon);
          const tone = toneStyles[achievement.tone];

          return (
            <div
              key={achievement.id}
              className={cn(
                "flex flex-col items-center rounded-2xl border p-3.5 text-center transition-colors",
                achievement.unlocked
                  ? "border-line/80 bg-white/75"
                  : "border-line/60 bg-ink/[0.015]",
              )}
            >
              <span
                className={cn(
                  "relative grid h-11 w-11 place-items-center rounded-full border",
                  achievement.unlocked
                    ? cn(tone.soft, tone.text, tone.border)
                    : "border-line bg-ink/[0.03] text-ink-muted/30",
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
                {!achievement.unlocked ? (
                  <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full border border-white bg-white text-ink-muted/50 shadow-sm">
                    <Lock className="h-2 w-2" strokeWidth={2.2} />
                  </span>
                ) : null}
              </span>
              <p
                className={cn(
                  "mt-2 text-[0.66rem] font-semibold",
                  achievement.unlocked ? "text-ink" : "text-ink-muted/50",
                )}
              >
                {achievement.title}
              </p>
              <p className="mt-0.5 text-[0.52rem] leading-4 text-ink-muted/60">
                {achievement.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function XpCard() {
  const { profile } = studentExperienceContent;
  const circumference = 2 * Math.PI * 42;
  const progress = 0.78;

  return (
    <div className="rounded-[1.4rem] border border-violet/12 bg-[linear-gradient(150deg,rgba(255,255,255,0.9),rgba(240,236,255,0.72))] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-violet-strong">
          Your momentum
        </p>
        <span className="rounded-full bg-white/80 px-2 py-0.5 text-[0.5rem] font-semibold text-violet-strong">
          {profile.rank}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-[94px] w-[94px] shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(111,92,224,0.12)" strokeWidth="9" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#xp-gradient)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: circumference * (1 - progress) }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <defs>
              <linearGradient id="xp-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#6f5ce0" />
                <stop offset="1" stopColor="#6eb8db" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-[1.05rem] font-semibold tracking-[-0.04em] text-ink">
              {profile.xp}
            </span>
            <span className="text-[0.45rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              total XP
            </span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="font-display text-[0.9rem] font-semibold text-ink">
            {profile.level}
          </p>
          <p className="text-[0.6rem] font-medium text-violet-strong">{profile.path}</p>
          <p className="mt-2 text-[0.58rem] leading-4 text-ink-muted">
            {profile.nextLevel}
          </p>
          <ProgressBar value={78} tone="violet" className="mt-2 max-w-[110px]" />
        </div>
      </div>
    </div>
  );
}

function StreakCard() {
  const { profile } = studentExperienceContent;

  return (
    <div className="rounded-[1.4rem] border border-gold/20 bg-[linear-gradient(150deg,rgba(255,255,255,0.9),rgba(251,240,214,0.7))] p-4">
      <div className="flex items-center justify-between">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-[#8e641b]">
          Learning streak
        </p>
        <Flame className="h-4 w-4 text-coral" strokeWidth={1.9} />
      </div>
      <div className="mt-2 flex items-baseline gap-1.5">
        <span className="font-display text-[1.7rem] font-semibold tracking-[-0.05em] text-ink">
          {profile.streak}
        </span>
        <span className="text-[0.62rem] font-semibold text-ink-muted">days</span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: 7 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "grid h-6 flex-1 place-items-center rounded-md text-[0.48rem] font-bold",
              index < 5
                ? "bg-gold/25 text-[#8e641b]"
                : "bg-white/60 text-ink-muted/45",
            )}
          >
            {["M", "T", "W", "T", "F", "S", "S"][index]}
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniAchievements() {
  const unlocked = studentExperienceContent.achievements
    .filter((achievement) => achievement.unlocked)
    .slice(0, 2);

  return (
    <div className="rounded-[1.4rem] border border-line/80 bg-white/60 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-ink-muted">
          Recent badges
        </p>
        <Trophy className="h-3.5 w-3.5 text-gold" strokeWidth={1.9} />
      </div>
      <div className="mt-3 space-y-2">
        {unlocked.map((achievement) => {
          const Icon = getIcon(achievement.icon);
          const tone = toneStyles[achievement.tone];

          return (
            <div key={achievement.id} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "grid h-8 w-8 place-items-center rounded-full border",
                  tone.soft,
                  tone.text,
                  tone.border,
                )}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[0.65rem] font-semibold text-ink">
                  {achievement.title}
                </p>
                <p className="truncate text-[0.5rem] text-ink-muted/65">
                  {achievement.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StudentPreview() {
  const [activeTab, setActiveTab] = useState<StudentTab>("quests");
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + tabIds.length) % tabIds.length;
    const nextTab = tabIds[nextIndex];
    setActiveTab(nextTab);

    const tablist = event.currentTarget.closest('[role="tablist"]');
    const tabs = tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  return (
    <div
      data-universe="nexus"
      className="relative overflow-hidden rounded-[2rem] border border-line-strong bg-[linear-gradient(150deg,#fffdfa_0%,#f5f2ff_42%,#ebf7fb_100%)] p-1.5 shadow-[0_50px_120px_-70px_rgba(30,24,58,0.6)] sm:p-2.5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-sky/20 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-[1.65rem] border border-white/90 bg-[#fcfbff]/90 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3 border-b border-line/80 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2.5">
            <BrandMark showWordmark={false} size="sm" />
            <div>
              <p className="font-display text-[0.62rem] font-semibold tracking-[0.18em] text-ink">
                SHATRA <span className="text-violet-strong">NEXUS</span>
              </p>
              <p className="text-[0.48rem] font-medium uppercase tracking-[0.15em] text-ink-muted/60">
                Explorer space
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden rounded-full border border-violet/15 bg-violet-soft px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-violet-strong sm:inline">
              Product preview
            </span>
            <span className="relative grid h-8 w-8 place-items-center rounded-full border border-line bg-white/80 text-ink-muted">
              <Bell className="h-3.5 w-3.5" strokeWidth={1.9} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-coral" />
            </span>
            <ExplorerAvatar size="sm" />
          </div>
        </div>

        <div className="grid lg:grid-cols-[62px_1fr]">
          <div
            aria-hidden="true"
            className="hidden flex-col items-center gap-2 border-r border-line/70 py-5 lg:flex"
          >
            {railItems.map((item) => {
              const Icon = item.icon;

              return (
                <span
                  key={item.label}
                  className={cn(
                    "relative grid h-9 w-9 place-items-center rounded-xl transition-colors",
                    item.active
                      ? "bg-plum text-white shadow-[0_10px_20px_-14px_rgba(36,30,61,0.7)]"
                      : "text-ink-muted/55",
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                  {item.active ? (
                    <span className="absolute -left-[11px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-violet" />
                  ) : null}
                </span>
              );
            })}
          </div>

          <div className="min-w-0 p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <ExplorerAvatar size="lg" />
                <div>
                  <p className="text-[0.55rem] font-semibold uppercase tracking-[0.17em] text-ink-muted/65">
                    Wednesday · Day 14
                  </p>
                  <h3 className="mt-0.5 font-display text-[1.12rem] font-semibold tracking-[-0.035em] text-ink sm:text-[1.28rem]">
                    {studentExperienceContent.profile.greeting}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full bg-violet-soft px-2 py-0.5 text-[0.52rem] font-semibold text-violet-strong">
                      {studentExperienceContent.profile.level}
                    </span>
                    <span className="rounded-full bg-sky-soft px-2 py-0.5 text-[0.52rem] font-semibold text-[#287b9e]">
                      {studentExperienceContent.profile.path}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-line/80 bg-white/65 px-3 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                <p className="text-[0.6rem] font-medium text-ink-muted">
                  Companion ready
                </p>
              </div>
            </div>

            <div
              role="tablist"
              aria-label="Student experience preview"
              className="no-scrollbar mt-5 flex gap-1 overflow-x-auto rounded-full border border-line/80 bg-white/55 p-1"
            >
              {studentExperienceContent.tabs.map((tab, index) => {
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`${baseId}-panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(tab.id as StudentTab)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={cn(
                      "relative shrink-0 rounded-full px-3.5 py-1.5 text-[0.64rem] font-semibold transition-colors sm:px-4",
                      isActive ? "text-white" : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="student-preview-tab"
                        className="absolute inset-0 rounded-full bg-plum shadow-[0_10px_20px_-14px_rgba(36,30,61,0.8)]"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 32 }
                        }
                      />
                    ) : null}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid gap-3 xl:grid-cols-[1.45fr_0.8fr]">
              <div
                role="tabpanel"
                id={`${baseId}-panel-${activeTab}`}
                aria-labelledby={`${baseId}-tab-${activeTab}`}
                tabIndex={0}
                className="min-w-0"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {activeTab === "quests" ? <QuestPanel /> : null}
                    {activeTab === "worlds" ? <WorldsPanel /> : null}
                    {activeTab === "achievements" ? <AchievementsPanel /> : null}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="space-y-3">
                <XpCard />
                <StreakCard />
                <div className="hidden xl:block">
                  <MiniAchievements />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
              <p className="text-[0.56rem] font-medium text-ink-muted/65">
                A preview of the student universe. No real account data is shown.
              </p>
              <Link
                href="/sign-in"
                className="group inline-flex items-center gap-1.5 rounded-full bg-plum px-3.5 py-1.5 text-[0.58rem] font-semibold text-white transition-colors hover:bg-plum-deep"
              >
                Explore the experience
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
