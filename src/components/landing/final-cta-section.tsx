import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { StarField } from "@/components/common/star-field";
import { Button } from "@/components/ui/button";
import { universes } from "@/config/themes";
import { finalCtaContent } from "@/content/landing";

const universeDots: Record<string, string> = {
  junior: "bg-coral",
  nexus: "bg-violet",
  ascend: "bg-sky",
};

export function FinalCtaSection() {
  return (
    <section id="start" className="relative py-16 sm:py-20 lg:py-24">
      <Container size="wide">
        <div className="grain-overlay relative overflow-hidden rounded-[1.8rem] bg-[linear-gradient(138deg,#1f1938_0%,#2b214c_48%,#3d2b69_100%)] px-6 py-14 shadow-[0_48px_120px_-64px_rgba(30,24,58,0.8)] sm:rounded-[2.2rem] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[14%] -top-[38%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(120,103,232,0.5)_0%,rgba(120,103,232,0.14)_44%,transparent_70%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[46%] -left-[10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(211,160,65,0.22)_0%,transparent_68%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 hidden h-[420px] w-[420px] rounded-full border border-white/[0.08] lg:block"
          >
            <div className="absolute inset-12 rounded-full border border-dashed border-white/[0.09]" />
            <div className="absolute inset-28 rounded-full border border-white/[0.07]" />
            <span className="absolute left-[18%] top-[12%] h-2 w-2 rounded-full bg-gold shadow-[0_0_18px_rgba(211,160,65,0.8)]" />
            <span className="absolute bottom-[22%] right-[6%] h-1.5 w-1.5 rounded-full bg-sky" />
          </div>
          <div
            aria-hidden="true"
            className="dot-grid-light pointer-events-none absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_68%)]"
          />
          <StarField tone="light" className="opacity-60" />

          <div className="relative mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/65 backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-gold" strokeWidth={2} />
                {finalCtaContent.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-6 text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.055em] text-white sm:text-[3.25rem] lg:text-[4rem]">
                {finalCtaContent.titleLead}{" "}
                <span className="font-serif font-normal italic tracking-[-0.03em] text-gradient-plum">
                  {finalCtaContent.titleAccent}
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-7 text-white/60 sm:text-base">
                {finalCtaContent.description}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={finalCtaContent.cta.href}
                  variant="light"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" strokeWidth={2.1} />}
                  className="w-full sm:w-auto"
                >
                  {finalCtaContent.cta.label}
                </Button>
                <Button
                  href={finalCtaContent.secondary.href}
                  variant="outline-light"
                  size="lg"
                  icon={<ArrowUpRight className="h-4 w-4" strokeWidth={1.9} />}
                  className="w-full sm:w-auto"
                >
                  {finalCtaContent.secondary.label}
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <p className="mt-6 text-[0.65rem] font-medium tracking-[0.04em] text-white/40">
                {finalCtaContent.note}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3}>
            <div className="relative mt-12 grid gap-2 border-t border-white/10 pt-6 sm:grid-cols-3 lg:mt-14">
              {universes.map((universe) => (
                <div
                  key={universe.id}
                  className="flex items-center justify-center gap-2.5 rounded-xl py-2 text-left sm:justify-start sm:px-4"
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${universeDots[universe.id]}`}
                  />
                  <span className="text-[0.68rem] font-semibold text-white/75">
                    {universe.name}
                  </span>
                  <span className="text-[0.6rem] text-white/35">
                    {universe.ageGroup}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
