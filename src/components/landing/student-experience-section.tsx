import { Compass, Sparkles, Trophy } from "lucide-react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { studentExperienceContent } from "@/content/landing";

import { StudentPreview } from "./student-preview";

const experiencePills = [
  { label: "Personal avatar", icon: Sparkles },
  { label: "Daily quests", icon: Compass },
  { label: "XP & achievements", icon: Trophy },
];

export function StudentExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_32%,rgba(238,233,255,0.9),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(229,244,251,0.85),transparent_30%),radial-gradient(circle_at_66%_88%,rgba(251,240,214,0.6),transparent_32%)]"
      />
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_66%)]"
      />
      <div
        aria-hidden="true"
        className="animate-shatra-drift pointer-events-none absolute right-[6%] top-[16%] -z-10 h-36 w-36 rounded-full border border-dashed border-violet/20"
      />

      <Container size="wide">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={studentExperienceContent.eyebrow}
            title={
              <>
                Learning that feels like it{" "}
                <span className="font-serif font-normal italic text-gradient-violet">
                  belongs to you.
                </span>
              </>
            }
            description={studentExperienceContent.description}
          />

          <Reveal delay={0.12} className="hidden shrink-0 lg:block">
            <div className="flex max-w-[290px] flex-wrap gap-2">
              {experiencePills.map((pill) => {
                const Icon = pill.icon;

                return (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/65 px-3 py-1.5 text-[0.65rem] font-semibold text-ink-muted backdrop-blur-sm"
                  >
                    <Icon className="h-3 w-3 text-violet" strokeWidth={2} />
                    {pill.label}
                  </span>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} distance={18} className="mt-10 sm:mt-12">
          <StudentPreview />
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-center text-[0.68rem] leading-5 text-ink-muted/65">
            Designed to make effort visible, progress feel earned and every next
            step feel within reach.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
