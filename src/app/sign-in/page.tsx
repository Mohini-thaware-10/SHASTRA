import { InfoPage } from "@/components/common/info-page";
import { PageShell } from "@/components/layout/page-shell";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthRoleSelector } from "@/components/auth/AuthRoleSelector";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "SHATRA account sign‑in",
};

export default function SignInPage() {
  const [signInData, setSignInData] = useState<SignInFormData | null>(null);
  const [signInError, setSignInError] = useState<string | null>(null);

  const onSignIn = (data: SignInFormData) => {
    setSignInData(data);
    // simulate login; in a real app this would call an API
    setSignInError(null);
  };

  const onSignInError = (errors: string[]) => {
    setSignInError(errors.join(", "));
  };

  return (
    <PageShell>
      <AuthLayout showBrand={true}>
        <SignInForm
          onSuccess={onSignIn}
          onError={onSignInError}
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
      </AuthLayout>
    </PageShell>
  );
}