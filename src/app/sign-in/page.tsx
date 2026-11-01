import { ArrowRight, Compass, GraduationCap, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { InfoPage } from "@/components/common/info-page";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Account access",
  description:
    "SHATRA account access and onboarding will open in the next phase of the platform.",
};

const accountTypes = [
  {
    title: "For students",
    description:
      "A personal learning universe, guided quests and a companion that grows with you.",
    icon: Compass,
    tone: "bg-violet-soft text-violet-strong",
  },
  {
    title: "For teachers",
    description:
      "A calm view of class progress, early knowledge-gap signals and thoughtful next steps.",
    icon: GraduationCap,
    tone: "bg-sky-soft text-[#287b9e]",
  },
];

export default function SignInPage() {
  return (
    <PageShell>
      <InfoPage
        eyebrow="Account access"
        title={
          <>
            Your universe is{" "}
            <span className="font-serif font-normal italic text-gradient-violet">
              almost ready.
            </span>
          </>
        }
        description="Student and teacher accounts open in the next phase of SHATRA. This preview is focused on the learning world itself — no sign-in or account creation just yet."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {accountTypes.map((account) => {
            const Icon = account.icon;

            return (
              <div
                key={account.title}
                className="rounded-xl border border-line bg-white/60 p-4"
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-[0.65rem] ${account.tone}`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <p className="mt-3 text-[0.78rem] font-semibold text-ink">
                  {account.title}
                </p>
                <p className="mt-1 text-[0.68rem] leading-5 text-ink-muted">
                  {account.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/70 px-2.5 py-1 text-[0.52rem] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  <Sparkles className="h-2.5 w-2.5 text-gold" strokeWidth={2} />
                  Coming next
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-line/80 pt-6 sm:flex-row">
          <p className="max-w-xs text-center text-[0.65rem] leading-5 text-ink-muted/70 sm:text-left">
            No account has been created and no personal details are being
            collected in this preview.
          </p>
          <Button
            href="/#universes"
            variant="primary"
            size="sm"
            icon={<ArrowRight className="h-3.5 w-3.5" strokeWidth={2.1} />}
            className="shrink-0"
          >
            Explore the universes
          </Button>
        </div>

        <p className="mt-5 text-center text-[0.62rem] text-ink-muted/60">
          Questions about access?{" "}
          <Link
            href="/contact"
            className="font-semibold text-violet-strong underline decoration-violet/25 underline-offset-2"
          >
            Contact SHATRA
          </Link>
        </p>
      </InfoPage>
    </PageShell>
  );
}
