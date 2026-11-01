import { InfoPage } from "@/components/common/info-page";
import { PageShell } from "@/components/layout/page-shell";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Forgot password",
  description: "SHATRA password recovery",
};

export default function ForgotPasswordPage() {
  return (
    <PageShell>
      <AuthLayout showBrand={false}>
        <InfoPage
          eyebrow="Forgot password"
          title="SHATRA"
          description="Enter the email address associated with your account. We'll send you instructions to reset your password."
          className="max-w-md mx-auto"
        >
          <form className="mt-6 space-y-4" aria-labelledby="forgot-title">
            <h2 id="forgot-title" className="text-xl font-semibold text-ink mb-4">
              Password recovery
            </h2>
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-ink/70">
                Email address
              </label>
              <input
                type="email"
                className="relative w-full rounded-md border px-3 py-2.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
                placeholder="you@email.com"
                aria-describedby="forgot-email-help"
              />
              <p id="forgot-email-help" className="text-xs text-ink-muted/60">
                We'll send a password reset link if an account exists with this email.
              </p>
            </div>
            <Button type="submit" className="w-full">
              Send reset instructions
            </Button>
            <p className="mt-4 text-sm text-ink-muted/70">
              <Link href="/sign-in" className="font-medium underline underline-offset-2 text-violet-strong hover:text-violet/90">
                Back to sign‑in
              </Link>
            </p>
          </form>
        </InfoPage>
      </AuthLayout>
    </PageShell>
  );
}