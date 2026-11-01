import { ArrowUp, Sparkles } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/common/brand-mark";
import { Container } from "@/components/common/container";
import { brand } from "@/config/brand";
import { footerColumns } from "@/config/navigation";

const universeChips = [
  { label: "Junior", className: "bg-coral" },
  { label: "Nexus", className: "bg-violet" },
  { label: "Ascend", className: "bg-sky" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-cream/55">
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 opacity-[0.22] [mask-image:linear-gradient(to_bottom,black,transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[8%] bottom-[-30%] h-[360px] w-[360px] rounded-full bg-violet-soft/50 blur-3xl"
      />

      <Container size="wide" className="relative py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.85fr_0.85fr_0.75fr] lg:gap-8">
          <div>
            <Link
              href="/#top"
              aria-label="SHATRA home"
              className="inline-flex rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-strong"
            >
              <BrandMark size="lg" />
            </Link>

            <p className="mt-5 max-w-xs text-[0.78rem] leading-6 text-ink-muted">
              {brand.shortDescription}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
              {universeChips.map((universe) => (
                <span
                  key={universe.label}
                  className="inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink-muted/75"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${universe.className}`} />
                  {universe.label}
                </span>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/50 px-3 py-1.5 text-[0.6rem] font-semibold text-ink-muted">
              <Sparkles className="h-3 w-3 text-gold" strokeWidth={2} />
              Learn Beyond Limits.
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-ink-muted/70">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-[0.76rem] font-medium text-ink-soft transition-colors hover:text-violet-strong"
                    >
                      <span className="h-px w-0 bg-violet-strong transition-all duration-300 group-hover:w-2.5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-line/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1.5">
            <p className="text-[0.65rem] text-ink-muted/75">
              © {brand.year} {brand.name}. All rights reserved.
            </p>
            <p className="text-[0.58rem] text-ink-muted/50">
              Product previews are illustrative. Built for Class 1–12.
            </p>
          </div>

          <Link
            href="/#top"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white/50 px-3.5 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-violet/25 hover:text-ink"
          >
            Back to top
            <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
