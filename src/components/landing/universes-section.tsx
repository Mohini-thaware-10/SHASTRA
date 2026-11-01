"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { universesSectionContent } from "@/content/landing";
import { defaultUniverseId, universes } from "@/config/themes";
import { cn } from "@/lib/utils";
import type { UniverseId } from "@/types/theme";

import { UniverseArtwork } from "./universe-artwork";

export function UniversesSection() {
  const [activeId, setActiveId] = useState<UniverseId>(defaultUniverseId);
  const reduceMotion = useReducedMotion();
  const active = universes.find((universe) => universe.id === activeId) ?? universes[1];

  return (
    <section id="universes" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,rgba(245,239,227,0.72)_18%,rgba(245,239,227,0.72)_82%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10%] top-[22%] -z-10 h-[420px] w-[420px] rounded-full bg-violet-soft/60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-8%] top-[54%] -z-10 h-[360px] w-[360px] rounded-full bg-sky-soft/70 blur-3xl"
      />

      <Container size="wide">
        <SectionHeading
          eyebrow={universesSectionContent.eyebrow}
          title={
            <>
              A learning world that{" "}
              <span className="font-serif font-normal italic text-gradient-violet">
                grows with you.
              </span>
            </>
          }
          description={universesSectionContent.description}
        />

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-6">
          <Reveal className="relative min-w-0" distance={18}>
            <div
              data-universe={active.id}
              className="relative flex h-full min-h-[560px] w-full flex-col overflow-hidden rounded-[2rem] border border-[var(--universe-border)] bg-[var(--universe-surface)] shadow-[0_36px_100px_-64px_rgba(30,24,58,0.55)] sm:min-h-[600px]"
            >
              <div className="universe-gradient absolute inset-0" />
              <div className="relative h-[290px] shrink-0 overflow-hidden sm:h-[330px] lg:h-[340px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active.id}
                    className="absolute inset-0"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 1.015 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <UniverseArtwork universe={active.id} />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--universe-surface)] to-transparent" />
                <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2 sm:left-6 sm:top-6">
                  <Badge tone="neutral" className="border-white/70 bg-white/75 backdrop-blur-md">
                    {universesSectionContent.previewLabel}
                  </Badge>
                  <Badge
                    tone={active.tone}
                    dot
                    className="border-white/40 bg-white/65 backdrop-blur-md"
                  >
                    {active.ageGroup}
                  </Badge>
                </div>
              </div>

              <div className="relative flex flex-1 flex-col justify-between p-6 pt-4 sm:p-8 sm:pt-5">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--universe-accent)]">
                    {active.ageLabel} · {active.atmosphere}
                  </p>
                  <h3 className="mt-3 font-display text-[1.75rem] font-semibold tracking-[-0.04em] text-[var(--universe-ink)] sm:text-[2rem]">
                    {active.name}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--universe-ink)]/70 sm:text-[0.95rem] sm:leading-7">
                    {active.longDescription}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {active.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--universe-border)] bg-white/55 px-2.5 py-1 text-[0.68rem] font-semibold text-[var(--universe-ink)]/80"
                      >
                        <Check
                          className="h-3 w-3 text-[var(--universe-accent)]"
                          strokeWidth={2.4}
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
                  <Button
                    href="#experience"
                    variant="secondary"
                    size="md"
                    icon={<ArrowRight className="h-4 w-4" strokeWidth={2} />}
                    className="border-[var(--universe-border)] bg-white/70 hover:bg-white"
                  >
                    {universesSectionContent.exploreLabel}
                  </Button>
                  <div className="flex items-center gap-1.5">
                    {active.subjects.slice(0, 4).map((subject) => (
                      <span
                        key={subject}
                        className="rounded-full border border-[var(--universe-border)] bg-white/45 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[var(--universe-ink)]/55"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex min-w-0 flex-col gap-3">
            <Reveal delay={0.08}>
              <div className="flex items-center justify-between px-1 pb-1">
                <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  <MousePointerClick className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Select a universe
                </span>
                <span className="font-display text-[0.65rem] tracking-[0.18em] text-ink-muted/60">
                  0{universes.findIndex((universe) => universe.id === activeId) + 1} / 03
                </span>
              </div>
            </Reveal>

            {universes.map((universe, index) => {
              const isActive = universe.id === activeId;

              return (
                <Reveal key={universe.id} delay={0.1 + index * 0.05} distance={14}>
                  <button
                    type="button"
                    data-universe={universe.id}
                    aria-pressed={isActive}
                    onClick={() => setActiveId(universe.id)}
                    className={cn(
                      "group relative flex w-full items-stretch gap-4 overflow-hidden rounded-[1.5rem] border p-3 text-left transition-all duration-300 sm:p-4",
                      isActive
                        ? "border-[var(--universe-border)] bg-[var(--universe-surface)] shadow-[0_22px_60px_-44px_rgba(30,24,58,0.45)]"
                        : "border-line bg-white/45 hover:border-[var(--universe-border)] hover:bg-white/80",
                    )}
                  >
                    <div
                      className={cn(
                        "relative aspect-[4/3] w-[104px] shrink-0 self-center overflow-hidden rounded-[1.05rem] border border-[var(--universe-border)] universe-gradient transition-transform duration-500 sm:w-[120px]",
                        isActive ? "scale-100" : "group-hover:scale-[1.02]",
                      )}
                    >
                      <UniverseArtwork universe={universe.id} compact />
                      {isActive ? (
                        <span className="absolute inset-0 rounded-[1.05rem] ring-2 ring-inset ring-[var(--universe-accent)]/35" />
                      ) : null}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[0.59rem] font-semibold uppercase tracking-[0.17em] text-[var(--universe-accent)]">
                          {universe.ageGroup}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[var(--universe-accent)]/45" />
                        <span className="text-[0.59rem] font-medium uppercase tracking-[0.13em] text-ink-muted/70">
                          {universe.atmosphere.split(" · ")[0]}
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-[1rem] font-semibold tracking-[-0.025em] text-[var(--universe-ink)] sm:text-[1.1rem]">
                        {universe.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[0.73rem] leading-5 text-ink-muted sm:text-xs sm:leading-[1.2rem]">
                        {universe.description}
                      </p>
                      <span
                        className={cn(
                          "mt-2 inline-flex items-center gap-1 text-[0.66rem] font-semibold transition-colors",
                          isActive
                            ? "text-[var(--universe-accent)]"
                            : "text-ink-muted group-hover:text-[var(--universe-accent)]",
                        )}
                      >
                        {isActive ? "Now previewing" : "Explore this world"}
                        <ArrowUpRight
                          className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </span>
                    </div>
                  </button>
                </Reveal>
              );
            })}

            <Reveal delay={0.3}>
              <div className="mt-1 flex items-center gap-3 rounded-[1.35rem] border border-dashed border-line-strong bg-white/30 px-4 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-soft text-[#8e641b]">
                  <Check className="h-4 w-4" strokeWidth={2.2} />
                </span>
                <p className="text-[0.72rem] leading-5 text-ink-muted">
                  Every universe shares one continuous learner profile — so progress
                  follows students as they grow.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-8 flex justify-center">
          <Link
            href="#how-it-works"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-ink-soft transition-colors hover:text-violet-strong"
          >
            See how the journey works
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
