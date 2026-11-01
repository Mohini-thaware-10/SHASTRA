"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";

import { SignInFormData } from "@/types/auth";
import { SignInForm } from "@/components/auth/SignInForm";
import { PageShell } from "@/components/layout/page-shell";

export default function SignInPage() {
  const [signInData, setSignInData] = useState<{ email?: string } | null>(null);
  const [signInError, setSignInError] = useState<string | null>(null);

  const onSignIn = (data: SignInFormData) => {
    setSignInData(data);
    setSignInError(null);
  };

  return (
    <PageShell>
      <SignInForm
        onSubmit={(data) => onSignIn(data)}
      />
      {signInError && (
        <p className="mt-4 text-sm text-red-600">{signInError}</p>
      )}
      {signInData && (
        <p className="mt-4 text-sm text-ink">
          Signed in as • {" "}
          <span className="font-medium">{signInData.email}</span>
        </p>
      )}
    </PageShell>
  );
}