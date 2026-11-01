"use client";

import { useState } from "react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";

type OnboardingComplete = (data: {
  fullName: string;
  currentClass: string;
}) => void;

export default function OnboardingStudentPage({ onComplete }: { onComplete: OnboardingComplete }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    currentClass: "6",
  });

  const handleNext = () => setStep((prev) => Math.min(6, prev + 1));
  const handleBack = () => setStep((prev) => Math.max(1, prev - 1));
  const handleComplete = () => onComplete(formData);

  return (
    <Container size="default">
      <SectionHeading
        eyebrow="Student Onboarding"
        title="Student Onboarding"
        description="Tell us about yourself so we can create a learning experience tailored to your needs."
      />
      <h2 className="text-2xl font-medium text-ink mb-4">
        Student Onboarding - Step {step}
      </h2>
      <p className="text-text-soft mb-4">
        This is a simplified onboarding page.
      </p>
      <div className="pace-step">
        <p>Full Name: {formData.fullName}</p>
        <p>Current Class: {formData.currentClass}</p>
      </div>
      <div className="mt-8">
        {step > 1 && (
          <button className="btn-outline" onClick={handleBack}>
            Back
          </button>
        )}
        {step < 6 && (
          <button className="btn-primary" onClick={handleNext}>
            Continue
          </button>
        )}
        {step === 6 && (
          <button className="btn-primary" onClick={handleComplete}>
            Complete
          </button>
        )}
      </div>
    </Container>
  );
}