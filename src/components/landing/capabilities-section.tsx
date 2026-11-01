import { Container } from "@/components/common/container";
import { IconBubble } from "@/components/common/icon-bubble";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { capabilities, capabilitiesSectionContent } from "@/content/landing";
import { cn } from "@/lib/utils";
import type { UniverseTone } from "@/types/theme";

import { CapabilityVisual } from "./capability-visuals";

const layoutById: Record<string, string> = {
  personalised: "md:col-span-2 lg:col-span-7 lg:row-span-2",
  companion: "lg:col-span-5",
  vernacular: "lg:col-span-5",
  quests: "lg:col-span-4",
  assessments: "lg:col-span-4",
  progress: "lg:col-span-4",
  insights: "lg:col-span-6",
  "early-support": "md:col-span-2 lg:col-span-6",
};

const cardTones: Record<UniverseTone, string> = {
  coral: "border-coral/15 bg-[linear-gradient(150deg,#fffdfb_0%,#fff1e8_100%)]",
  violet: "border-violet/15 bg-[linear-gradient(150deg,#fffdfb_0%,#f2edff_100%)]",
  sky: "border-sky/20 bg-[linear-gradient(150deg,#fbfeff_0%,#e8f5fa_100%)]",
  gold: "border-gold/20 bg-[linear-gradient(150deg,#fffdf8_0%,#fcf2dc_100%)]",
  mint: "border-mint/20 bg-[linear-gradient(150deg,#fbfffd_0%,#e8f7f1_100%)]",
  blush: "border-blush/20 bg-[linear-gradient(150deg,#fffbfc_0%,#fdeef2_100%)]",
};

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,rgba(245,239,227,0.55)_14%,rgba(245,239,227,0.55)_86%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[42%] top-[8%] -z-10 h-[380px] w-[380px] rounded-full bg-gold-soft/40 blur-3xl"
      />

      <Container size="wide">
        <SectionHeading
          align="center"
          eyebrow={capabilitiesSectionContent.eyebrow}
          title={
            <>
              The intelligence behind{" "}
              <span className="font-serif font-normal italic text-gradient-violet">
                the adventure.
              </span>
            </>
          }
          description={capabilitiesSectionContent.description}
        />

        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:mt-16 lg:grid-cols-12 lg:gap-4">
          {capabilities.map((capability, index) => {
            const isLead = capability.id === "personalised";

            return (
              <Reveal
                key={capability.id}
                delay={0.04 + index * 0.035}
                distance={16}
                className={cn("h-full", layoutById[capability.id])}
              >
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border p-5 shadow-[0_18px_50px_-46px_rgba(30,24,58,0.35)] transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-[0_26px_70px_-48px_rgba(30,24,58,0.4)] sm:p-6",
                    cardTones[capability.tone],
                    isLead && "min-h-[460px] p-6 sm:p-8",
                  )}
                >
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <IconBubble
                      name={capability.icon}
                      tone={capability.tone}
                      size={isLead ? "lg" : "md"}
                      className="bg-white/70"
                    />
                    <span className="pt-1 text-[0.54rem] font-semibold uppercase tracking-[0.17em] text-ink-muted/45">
                      0{index + 1}
                    </span>
                  </div>

                  <div className={cn("relative z-10 mt-5", isLead && "max-w-xl")}>
                    <h3
                      className={cn(
                        "font-display font-semibold tracking-[-0.035em] text-ink",
                        isLead
                          ? "text-[1.65rem] leading-[1.08] sm:text-[2rem]"
                          : "text-[1.05rem] leading-tight sm:text-[1.12rem]",
                      )}
                    >
                      {capability.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-ink-muted",
                        isLead
                          ? "max-w-lg text-[0.9rem] leading-6 sm:text-[0.95rem] sm:leading-7"
                          : "text-[0.78rem] leading-6",
                      )}
                    >
                      {capability.description}
                    </p>
                  </div>

                  {isLead ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {["Your pace", "Your strengths", "Your interests"].map(
                        (label) => (
                          <span
                            key={label}
                            className="inline-flex items-center gap-1.5 rounded-full border border-violet/15 bg-white/60 px-2.5 py-1 text-[0.63rem] font-semibold text-violet-strong"
                          >
                            <span className="h-1 w-1 rounded-full bg-violet" />
                            {label}
                          </span>
                        ),
                      )}
                    </div>
                  ) : null}

                  <div className={cn("relative z-10", isLead ? "mt-auto pt-7" : "mt-auto pt-4")}>
                    <CapabilityVisual id={capability.id} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
