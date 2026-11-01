import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { InfoPage } from "@/components/common/info-page";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "The SHATRA terms of use will be published before student and teacher accounts open.",
};

const topics = [
  "How students, guardians and teachers may use SHATRA.",
  "The responsibilities that come with a learning account.",
  "How learning content and platform access are provided.",
  "Where to go with questions about the terms.",
];

export default function TermsPage() {
  return (
    <PageShell>
      <InfoPage
        eyebrow="Terms"
        title={
          <>
            Clear terms for a{" "}
            <span className="font-serif font-normal italic text-gradient-violet">
              thoughtful platform.
            </span>
          </>
        }
        description="This page is reserved for the SHATRA terms of use. The full terms will be published before accounts open, written to be understood by students, guardians and teachers alike."
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-muted/70">
            What the terms will cover
          </p>
          <span className="rounded-full border border-gold/20 bg-gold-soft px-2.5 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.12em] text-[#8e641b]">
            Placeholder
          </span>
        </div>

        <ul className="mt-4 space-y-3">
          {topics.map((topic, index) => (
            <li
              key={topic}
              className="flex items-start gap-3 border-b border-line/60 pb-3 last:border-0 last:pb-0"
            >
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sky-soft font-display text-[0.55rem] font-semibold text-[#287b9e]">
                {index + 1}
              </span>
              <p className="text-[0.73rem] leading-6 text-ink-soft">{topic}</p>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-xl border border-line bg-cream/50 p-4">
          <p className="text-[0.67rem] leading-6 text-ink-muted">
            No account terms are active in this preview. These placeholders will
            be replaced by the final terms before onboarding begins.
          </p>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="text-[0.65rem] font-semibold text-violet-strong underline decoration-violet/25 underline-offset-2"
          >
            Ask about the terms
          </Link>
          <Button
            href="/"
            variant="secondary"
            size="sm"
            icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.1} />}
          >
            Back to SHATRA
          </Button>
        </div>
      </InfoPage>
    </PageShell>
  );
}
