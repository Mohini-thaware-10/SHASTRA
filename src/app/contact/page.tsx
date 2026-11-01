import { ArrowRight, Compass, MessageCircle, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { InfoPage } from "@/components/common/info-page";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "SHATRA contact details will be published before student and teacher accounts open.",
};

const contactTopics = [
  {
    title: "Students & guardians",
    description: "Questions about the learning experience, universes or access.",
    icon: Compass,
  },
  {
    title: "Teachers & schools",
    description: "Conversations about classroom insight and educator access.",
    icon: Users,
  },
  {
    title: "Platform questions",
    description: "Privacy, terms or anything else about how SHATRA works.",
    icon: MessageCircle,
  },
];

export default function ContactPage() {
  return (
    <PageShell>
      <InfoPage
        eyebrow="Contact"
        title={
          <>
            A conversation{" "}
            <span className="font-serif font-normal italic text-gradient-violet">
              worth having.
            </span>
          </>
        }
        description="SHATRA is still taking shape. Official contact details will be published before accounts open, so this preview does not include a contact form or an unmonitored inbox."
      >
        <div className="space-y-2.5">
          {contactTopics.map((topic) => {
            const Icon = topic.icon;

            return (
              <div
                key={topic.title}
                className="flex items-start gap-3 rounded-xl border border-line/70 bg-white/55 p-3.5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.6rem] bg-violet-soft text-violet-strong">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.9} />
                </span>
                <div>
                  <p className="text-[0.72rem] font-semibold text-ink">
                    {topic.title}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] leading-5 text-ink-muted">
                    {topic.description}
                  </p>
                </div>
                <span className="ml-auto shrink-0 text-[0.48rem] font-semibold uppercase tracking-[0.1em] text-ink-muted/45">
                  Soon
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-xl border border-gold/20 bg-gold-soft/60 p-4">
          <p className="text-[0.67rem] leading-6 text-ink-muted">
            Until launch channels are live, explore the platform preview and see
            how the three SHATRA universes are designed to work.
          </p>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-line/80 pt-5 sm:flex-row">
          <Link
            href="/#universes"
            className="text-[0.65rem] font-semibold text-violet-strong underline decoration-violet/25 underline-offset-2"
          >
            Explore the universes
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
