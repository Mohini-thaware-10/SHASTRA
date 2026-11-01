import { Sparkles } from "lucide-react";

import { Container } from "@/components/common/container";
import { IconBubble } from "@/components/common/icon-bubble";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { howItWorksContent, journeySteps } from "@/content/landing";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(238,233,255,0.72),transparent_30%),radial-gradient(circle_at_8%_80%,rgba(229,244,251,0.6),transparent_28%)]"
      />

      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={howItWorksContent.eyebrow}
            title={
              <>
                Four steps. One{" "}
                <span className="font-serif font-normal italic text-gradient-violet">
                  personal
                </span>{" "}
                journey.
              </>
            }
            description={howItWorksContent.description}
          />

          <Reveal delay={0.12} className="hidden shrink-0 lg:block">
            <div className="relative flex items-center gap-3 rounded-2xl border border-line bg-white/55 p-3 pr-4 backdrop-blur-sm">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-soft text-violet-strong">
                <Sparkles className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <p className="max-w-[190px] text-[0.7rem] leading-5 text-ink-muted">
                The path is never fixed. It responds to every choice.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <div
            aria-hidden="true"
            className="absolute bottom-[12%] left-[29px] top-[8%] w-px bg-[linear-gradient(180deg,transparent,rgba(120,103,232,0.3)_12%,rgba(110,184,219,0.32)_54%,rgba(211,160,65,0.26)_88%,transparent)] lg:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[34px] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(120,103,232,0.28)_10%,rgba(110,184,219,0.3)_46%,rgba(233,135,87,0.28)_76%,rgba(211,160,65,0.3)_90%,transparent)] lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[30px] hidden justify-between lg:flex"
          >
            {journeySteps.map((step) => (
              <span
                key={step.id}
                className="h-[9px] w-[9px] rounded-full border border-white bg-violet/50 shadow-[0_0_0_4px_rgba(238,233,255,0.9)]"
              />
            ))}
          </div>

          <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {journeySteps.map((step, index) => (
              <li key={step.id} className="relative">
                <Reveal delay={0.06 + index * 0.07} distance={16}>
                  <div className="group relative flex gap-4 lg:block">
                    <div className="relative z-10 shrink-0">
                      <IconBubble
                        name={step.icon}
                        tone={step.tone}
                        size="lg"
                        className="bg-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-26px_rgba(30,24,58,0.45)]"
                      />
                      <span className="absolute -right-2.5 -top-2.5 grid h-7 w-7 place-items-center rounded-full border border-line bg-background font-display text-[0.58rem] font-semibold text-ink-muted shadow-sm">
                        {step.number}
                      </span>
                    </div>

                    <div className="min-w-0 pt-0.5 lg:mt-7 lg:pt-0">
                      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-muted/70">
                        Step {step.number}
                      </span>
                      <h3 className="mt-2 font-display text-[1.08rem] font-semibold tracking-[-0.03em] text-ink sm:text-[1.15rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-[290px] text-[0.82rem] leading-6 text-ink-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.18} className="mt-12">
          <div className="relative overflow-hidden rounded-[1.4rem] border border-line bg-white/45 px-5 py-4 sm:px-6">
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet via-sky to-gold"
            />
            <p className="pl-3 text-center text-[0.78rem] font-medium text-ink-muted sm:text-left">
              <span className="font-semibold text-ink">One learner profile.</span>{" "}
              Three age-based universes. A journey that keeps its thread from Class 1
              to Class 12.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
