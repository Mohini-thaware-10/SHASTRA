import { ArrowRight, Compass, Sparkles } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { StarField } from "@/components/common/star-field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getIcon } from "@/lib/icons";
import { heroContent } from "@/content/landing";

import { HeroUniverse } from "./hero-universe";

export function HeroSection() {
  return (
    <section
      id="top"
      className="grain-overlay relative overflow-hidden pb-16 pt-9 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-[18%] top-[-18%] h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(238,233,255,0.92)_0%,rgba(238,233,255,0.42)_48%,transparent_72%)] blur-2xl" />
        <div className="absolute -right-[12%] top-[6%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(229,244,251,0.9)_0%,rgba(229,244,251,0.38)_48%,transparent_72%)] blur-2xl" />
        <div className="absolute bottom-[-22%] left-[30%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(251,240,214,0.7)_0%,transparent_68%)] blur-2xl" />
        <div className="dot-grid absolute inset-0 opacity-[0.42] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_72%)]" />
        <StarField />
      </div>

      <Container
        size="wide"
        className="relative grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-4"
      >
        <div className="relative z-10 max-w-[650px]">
          <Reveal>
            <Badge
              tone="neutral"
              icon={<Sparkles className="h-3 w-3 text-violet" strokeWidth={2} />}
              className="border-line-strong bg-white/75 py-1.5 pl-2.5 text-ink-soft shadow-[0_10px_30px_-24px_rgba(30,24,58,0.5)]"
            >
              {heroContent.eyebrow}
            </Badge>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 font-display text-[clamp(2.9rem,6.6vw,5.35rem)] font-semibold leading-[0.97] tracking-[-0.06em] text-ink">
              <span className="block">{heroContent.titleLead}</span>
              <span className="block">
                Your{" "}
                <em className="font-serif font-normal italic tracking-[-0.035em] text-gradient-violet">
                  Journey.
                </em>
              </span>
              <span className="relative inline-block">
                {heroContent.titleTail}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 12"
                  className="absolute -bottom-2 left-0 h-2.5 w-[78%] text-gold/70"
                  fill="none"
                >
                  <path
                    d="M3 8.5C59 2.5 144 2 217 5.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-7 max-w-[560px] text-[1rem] leading-7 text-ink-soft sm:text-[1.075rem] sm:leading-8">
              {heroContent.description}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href={heroContent.primaryCta.href}
                size="lg"
                icon={<ArrowRight className="h-4 w-4" strokeWidth={2.1} />}
                className="w-full sm:w-auto"
              >
                {heroContent.primaryCta.label}
              </Button>
              <Button
                href={heroContent.secondaryCta.href}
                variant="secondary"
                size="lg"
                icon={<Compass className="h-4 w-4 text-violet" strokeWidth={1.9} />}
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                {heroContent.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-line/80 pt-6">
              {heroContent.proof.map((item) => {
                const Icon = getIcon(item.icon);

                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 text-[0.78rem] font-medium text-ink-muted"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line bg-white/70 text-violet-strong">
                      <Icon className="h-3 w-3" strokeWidth={2} />
                    </span>
                    {item.label}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} distance={16} className="relative">
          <HeroUniverse />
        </Reveal>
      </Container>
    </section>
  );
}
