import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { InfoPage } from "@/components/common/info-page";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "The SHATRA privacy policy will be published before student and teacher accounts open.",
};

const topics = [
  "What information a SHATRA account will collect.",
  "How learning activity supports personalisation and progress.",
  "The choices and controls available to students, guardians and teachers.",
  "How to reach the right team with a privacy question.",
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <InfoPage
        eyebrow="Privacy"
        title={
          <>
            Privacy, <span className="font-serif font-normal italic text-gradient-violet">in plain language.</span>
          </>
        }
        description="This page is reserved for the SHATRA privacy policy. The full policy will be published before accounts open, with clear explanations rather than legal fog."
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-muted/70">
            What the policy will cover
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
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet-soft font-display text-[0.55rem] font-semibold text-violet-strong">
                {index + 1}
              </span>
              <p className="text-[0.73rem] leading-6 text-ink-soft">{topic}</p>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-xl border border-line bg-cream/50 p-4">
          <p className="text-[0.67rem] leading-6 text-ink-muted">
            This preview does not create accounts or collect student data. When
            the full policy is ready, it will replace this page.
          </p>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="text-[0.65rem] font-semibold text-violet-strong underline decoration-violet/25 underline-offset-2"
          >
            Ask a privacy question
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
