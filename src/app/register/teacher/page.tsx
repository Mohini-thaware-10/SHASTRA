import { PageShell } from "@/components/layout/page-shell";
import { HeroSection } from "@/components/landing/hero-section";
import { UniversesSection } from "@/components/landing/universes-section";

export default function RegisterTeacher() {
  return (
    <PageShell>
      <HeroSection />
      <UniversesSection />
      <div className="min-h-screen flex items-center justify-center pb-24">
        <div className="text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,1.8rem)] font-semibold text-ink mb-4">
            Register as Teacher
          </h2>
          <p className="text-text-soft text-lg max-w-md mx-auto mb-8">
            Set up your teacher account to access SHATRA&apos;s teacher tools and insights.
          </p>
          <div className="space-y-4">
            <a
              href="/onboarding/teacher"
              className="btn-primary w-full md:w-auto"
            >
              Start Teacher Onboarding
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
};