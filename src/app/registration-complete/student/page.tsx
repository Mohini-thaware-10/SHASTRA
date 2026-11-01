import { PageShell } from "@/components/layout/page-shell";
import Link from "next/link";

export default function RegisterCompleteStudent() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold text-ink mb-4">
        Welcome to SHATRA!
      </h1>
      <p className="text-text-soft mb-6">
        Your onboarding is complete. You can now explore your personalized learning universe.
      </p>
      <Link href="/" className="btn-primary">
        Continue to SHATRA
      </Link>
    </PageShell>
  );
}