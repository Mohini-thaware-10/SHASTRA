import {
  ArrowRight,
  ArrowUpRight,
  Check,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { Badge } from "@/components/ui/badge";
import { teacherExperienceContent, toneStyles } from "@/content/landing";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

function TeacherPanel() {
  const { panel } = teacherExperienceContent;

  return (
    <div className="relative overflow-hidden rounded-[1.9rem] border border-line-strong bg-white/70 p-1.5 shadow-[0_42px_110px_-72px_rgba(30,24,58,0.6)] backdrop-blur-sm sm:p-2.5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky/15 blur-3xl"
      />
      <div className="relative overflow-hidden rounded-[1.45rem] border border-line/80 bg-[#fbfdff]">
        <div className="flex items-center justify-between gap-3 border-b border-line/80 bg-white/60 px-4 py-3.5 sm:px-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-[0.7rem] bg-[#e8f4f8] text-[#287b9e]">
              <GraduationCap className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-[0.68rem] font-semibold text-ink">{panel.className}</p>
              <p className="text-[0.48rem] font-medium uppercase tracking-[0.14em] text-ink-muted/60">
                {panel.period}
              </p>
            </div>
          </div>
          <Badge tone="neutral" className="border-line bg-white text-[0.5rem]">
            {panel.label}
          </Badge>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {panel.metrics.map((metric) => {
              const tone = toneStyles[metric.tone];

              return (
                <div
                  key={metric.label}
                  className="rounded-xl border border-line/70 bg-white/75 p-2.5 sm:p-3"
                >
                  <p className="text-[0.46rem] font-semibold uppercase leading-4 tracking-[0.12em] text-ink-muted/70 sm:text-[0.5rem]">
                    {metric.label}
                  </p>
                  <p className="mt-1 font-display text-[1.15rem] font-semibold tracking-[-0.04em] text-ink sm:text-[1.3rem]">
                    {metric.value}
                  </p>
                  <p className="mt-0.5 hidden text-[0.5rem] leading-4 text-ink-muted/65 sm:block">
                    {metric.helper}
                  </p>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink/[0.05]">
                    <div
                      className={cn("h-full rounded-full", tone.solid)}
                      style={{ width: `${metric.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-line/70 bg-white/60 p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.13em] text-ink-muted">
                Knowledge gaps
              </p>
              <span className="text-[0.5rem] font-medium text-ink-muted/60">
                Early signals
              </span>
            </div>
            <div className="mt-3 space-y-3">
              {panel.gaps.map((gap) => {
                const tone = toneStyles[gap.tone];

                return (
                  <div key={gap.topic}>
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[0.64rem] font-medium text-ink-soft">
                        {gap.topic}
                      </p>
                      <p className="text-[0.5rem] font-medium text-ink-muted/70">
                        {gap.students} students · {gap.value}% mastery
                      </p>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-ink/[0.05]">
                      <div
                        className={cn("h-full rounded-full", tone.solid)}
                        style={{ width: `${gap.value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-violet/15 bg-[linear-gradient(145deg,rgba(240,236,255,0.6),rgba(255,255,255,0.7))] p-3.5">
            <div className="flex items-start gap-2.5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-violet-strong shadow-sm">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.9} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.64rem] font-semibold text-ink">
                  {panel.intervention.title}
                </p>
                <p className="mt-1 text-[0.58rem] leading-4 text-ink-muted">
                  {panel.intervention.description}
                </p>
                <Link
                  href="/sign-in"
                  className="group mt-2 inline-flex items-center gap-1 text-[0.55rem] font-semibold text-violet-strong"
                >
                  {panel.intervention.action}
                  <ArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-line/70 pt-3">
            <div className="flex items-center gap-1.5 text-[0.5rem] font-medium text-ink-muted/65">
              <ShieldCheck className="h-3 w-3 text-mint" strokeWidth={1.9} />
              Teacher judgement stays at the centre.
            </div>
            <span className="inline-flex items-center gap-1 text-[0.48rem] font-semibold uppercase tracking-[0.1em] text-ink-muted/50">
              <Check className="h-2.5 w-2.5 text-mint" strokeWidth={2.4} />
              Insight, not automation
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeacherExperienceSection() {
  return (
    <section id="teachers" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,rgba(245,239,227,0.58)_16%,rgba(245,239,227,0.58)_84%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[10%] -z-10 h-[460px] w-[460px] rounded-full bg-sky-soft/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[4%] left-[-8%] -z-10 h-[360px] w-[360px] rounded-full bg-violet-soft/60 blur-3xl"
      />

      <Container size="wide">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow={teacherExperienceContent.eyebrow}
              title={
                <>
                  See the whole class.{" "}
                  <span className="font-serif font-normal italic text-gradient-violet">
                    Reach every learner.
                  </span>
                </>
              }
              description={teacherExperienceContent.description}
            />

            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-1">
                {teacherExperienceContent.bullets.map((bullet, index) => {
                  const Icon = getIcon(bullet.icon);

                  return (
                    <li
                      key={bullet.title}
                      className={cn(
                        "group flex items-start gap-3.5 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/45",
                        index === 0 && "bg-white/35",
                      )}
                    >
                      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-[0.65rem] border border-line bg-white/75 text-[#287b9e]">
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                      </span>
                      <div>
                        <p className="text-[0.78rem] font-semibold text-ink">
                          {bullet.title}
                        </p>
                        <p className="mt-0.5 text-[0.72rem] leading-5 text-ink-muted">
                          {bullet.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-white/50 p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mint-soft text-[#2e7f69]">
                  <ShieldCheck className="h-4 w-4" strokeWidth={1.9} />
                </span>
                <div>
                  <p className="text-[0.7rem] font-semibold text-ink">
                    Built to support teachers, not replace them.
                  </p>
                  <p className="mt-1 text-[0.66rem] leading-5 text-ink-muted">
                    Every insight is a prompt for professional judgement, never an
                    automatic decision.
                  </p>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink-muted/40" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} distance={18}>
            <TeacherPanel />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
