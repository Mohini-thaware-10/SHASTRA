import { PageShell } from "@/components/layout/page-shell";
import Link from "next/link";

export default function RegisterCompleteTeacher() {
  return (
    <PageShell>
      <h1 className="text-3xl font-bold text-ink mb-4">
        Registration Received
      </h1>
      <p className="text-text-soft mb-6">
        Your teacher registration has been submitted successfully. It will be reviewed by the administration team.
      </p>
      <Link href="/" className="btn-primary">
        Continue to Teacher Interface
      </Link>
    </PageShell>
  );
}