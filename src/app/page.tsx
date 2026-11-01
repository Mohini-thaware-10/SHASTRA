import { PageShell } from "@/components/layout/page-shell";
import { CapabilitiesSection } from "@/components/landing/capabilities-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { StudentExperienceSection } from "@/components/landing/student-experience-section";
import { TeacherExperienceSection } from "@/components/landing/teacher-experience-section";
import { UniversesSection } from "@/components/landing/universes-section";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <UniversesSection />
      <HowItWorksSection />
      <CapabilitiesSection />
      <StudentExperienceSection />
      <TeacherExperienceSection />
      <FinalCtaSection />
    </PageShell>
  );
}
