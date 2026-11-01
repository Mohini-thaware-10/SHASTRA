import { ArrowRight, Compass } from "lucide-react";

import { InfoPage } from "@/components/common/info-page";
import { PageShell } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageShell>
      <InfoPage
        eyebrow="404 · Path not found"
        title={
          <>
            This path hasn&apos;t been{" "}
            <span className="font-serif font-normal italic text-gradient-violet">
              charted yet.
            </span>
          </>
        }
        description="The page you were looking for may have moved, or it may still be part of a universe we are building. Let's get you back to familiar ground."
      >
        <div className="flex flex-col items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-white/65 text-violet">
            <Compass className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <p className="max-w-sm text-center text-[0.7rem] leading-6 text-ink-muted">
            Head back to the SHATRA home page or explore the three learning
            universes.
          </p>
          <div className="flex flex-col items-center gap-2.5 sm:flex-row">
            <Button
              href="/"
              variant="primary"
              size="md"
              icon={<ArrowRight className="h-4 w-4" strokeWidth={2.1} />}
            >
              Back to home
            </Button>
            <Button href="/#universes" variant="secondary" size="md">
              Explore universes
            </Button>
          </div>
        </div>
      </InfoPage>
    </PageShell>
  );
}
