import { InfoPage } from "@/components/common/info-page";
import { PageShell } from "@/components/layout/page-shell";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthRoleSelector } from "@/components/auth/AuthRoleSelector";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Sign up",
  description: "SHATRA account registration",
};

export default function SignUpPage() {
  const [signUpData, setSignUpData] = useState<SignUpFormData | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const onSignUp = (data: SignUpFormData) => {
    setSignUpData(data);
    setSignUpError(null);
  };

  const onSignUpError = (errors: string[]) => {
    setSignUpError(errors.join(", "));
  };

  return (
    <PageShell>
      <AuthLayout showBrand={true}>
        <SignUpForm
          onSuccess={onSignUp}
          onError={onSignUpError}
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
      </AuthLayout>
    </PageShell>
  );
}