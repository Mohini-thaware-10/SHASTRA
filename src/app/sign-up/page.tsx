"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";

import { SignUpFormData } from "@/types/auth";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { PageShell } from "@/components/layout/page-shell";

export default function SignUpPage() {
  const [signUpData, setSignUpData] = useState<{ email?: string } | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const onSignUp = (data: SignUpFormData) => {
    setSignUpData(data);
    setSignUpError(null);
  };

  return (
    <PageShell>
      <SignUpForm
        onSubmit={(data) => onSignUp(data)}
      />
      {signUpError && (
        <p className="mt-4 text-sm text-red-600">{signUpError}</p>
      )}
      {signUpData && (
        <p className="mt-4 text-sm text-ink">
          Account created • {" "}
          <span className="font-medium">{signUpData.email}</span>
        </p>
      )}
    </PageShell>
  );
}