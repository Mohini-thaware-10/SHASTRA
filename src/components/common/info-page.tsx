import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container } from "@/components/common/container";
import { Reveal } from "@/components/common/reveal";
import { StarField } from "@/components/common/star-field";

interface InfoPageProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
}

export function InfoPage({ eyebrow, title, description, children }: InfoPageProps) {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgba(238,233,255,0.9),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(229,244,251,0.85),transparent_30%),radial-gradient(circle_at_55%_92%,rgba(251,240,214,0.55),transparent_32%)]"
      />
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_62%)]"
      />
      <StarField className="opacity-40" />

      <Container size="narrow" className="relative">
        <Reveal>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3.5 py-2 text-[0.68rem] font-semibold text-ink-muted backdrop-blur-sm transition-colors hover:border-violet/25 hover:text-ink"
          >
            <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to home
          </Link>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink-muted">
              <Sparkles className="h-3 w-3 text-violet" strokeWidth={2} />
              {eyebrow}
            </span>
            <h1 className="mt-5 text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.05em] text-ink sm:text-[3rem]">
              {title}
            </h1>
            <div className="mx-auto mt-5 max-w-xl text-[0.88rem] leading-7 text-ink-soft">
              {description}
            </div>
          </div>
        </Reveal>

        {children ? (
          <Reveal delay={0.14}>
            <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-[1.6rem] border border-line-strong bg-white/65 p-1.5 shadow-[0_30px_80px_-56px_rgba(30,24,58,0.45)] backdrop-blur-sm">
              <div className="rounded-[1.2rem] border border-line/70 bg-white/55 p-5 sm:p-8">
                {children}
              </div>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
