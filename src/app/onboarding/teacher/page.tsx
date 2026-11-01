"use client";

import { useState } from "react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";

type OnboardingComplete = (data: {
  fullName: string;
  institution: string;
}) => void;

export default function OnboardingTeacherPage({ onComplete }: { onComplete: OnboardingComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    institution: "",
  });

  const handleNext = () => setStep((prev) => Math.min(4, prev + 1));
  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));
  const handleComplete = () => onComplete(formData);

  return (
    <Container size="default">
      <SectionHeading
        eyebrow="Teacher Onboarding"
        title="Teacher Onboarding"
        description="Set up your teacher account to access SHATRA's teacher tools."
      />
      <h2 className="text-2xl font-medium text-ink mb-4">
        Teacher Onboarding - Step {step}
      </h2>
      <p className="text-text-soft mb-4">
        This is a simplified teacher onboarding page.
      </p>
      <div className="pace-step">
        <p>Full Name: {formData.fullName}</p>
        <p>Institution: {formData.institution}</p>
      </div>
      <div className="mt-8">
        {step > 1 && (
          <button className="btn-outline" onClick={handleBack}>
            Back
          </button>
        )}
        {step < 4 && (
          <button className="btn-primary" onClick={handleNext}>
            Continue
          </button>
        )}
        {step === 4 && (
          <button className="btn-primary" onClick={handleComplete}>
            Complete
          </button>
        )}
      </div>
    </Container>
  );
}