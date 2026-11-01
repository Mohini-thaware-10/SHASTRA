import { InfoPage } from "@/components/common/info-page";
import { PageShell } from "@/components/layout/page-shell";
import { AuthLayout } from "@/components/auth/AuthLayout";

export const metadata: Metadata = {
  title: "Verify email",
  description: "SHATRA email verification status",
};

export default function VerifyEmailPage() {
  return (
    <PageShell>
      <AuthLayout showBrand={false}>
        <InfoPage
          eyebrow="Verify email"
          title="SHATRA"
          description="Your email address needs to be verified. A verification link has been sent to your inbox."
          className="max-w-md mx-auto"
        >
          <div className="mt-8 text-center">
            <svg
              className="mx-auto mb-4 w-16 h-16 text-violet-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 6L9 17l-5-5L2 6"/>
            </svg>
            <h3 className="text-xl font-semibold text-ink mb-2">Check your inbox</h3>
            <p className="text-ink-muted/70 mb-6">
              We've sent a verification email to <span className="font-medium">student@shatra.example</span>. Please open the email and click the verification link.
            </p>
            <Button variant="outline" className="mt-4">
              Resend verification link
            </Button>
            <p className="mt-4 text-sm text-ink-muted/70">
              <Link href="/sign-in" className="font-medium underline underline-offset-2 text-violet-strong hover:text-violet/90">
                Sign in
              </Link>
              {" instead."}
            </p>
          </div>
        </InfoPage>
      </AuthLayout>
    </PageShell>
  );
}