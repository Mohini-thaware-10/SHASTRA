/**
 * Auth Error Messages - user-facing, no internal details exposed.
 * All messages are localized-friendly and generic enough to avoid
 * leaking database structure or authentication configuration.
 */
export class AuthError {
  /** Invalid email or password combination */
  static invalidCredentials(): string {
    return "Invalid email or password. Please check your credentials and try again.";
  }

  /** Email not verified - user must verify before signing in */
  static emailNotVerified(): string {
    return "Your email address is not verified. Please check your inbox for the verification link.";
  }

  /** Account suspended - contact support */
  static accountSuspended(): string {
    return "Your account has been suspended. Please contact support for assistance.";
  }

  /** Password reset sent successfully - generic message */
  static passwordResetSent(): string {
    return "If an account with that email exists, a password reset link has been sent.";
  }

  /** Password reset failure - generic message */
  static passwordResetFailure(): string {
    return "Failed to send password reset link. Please try again later.";
  }

  /** Profile creation failure */
  static profileCreationFailure(): string {
    return "An error occurred while creating your profile. Please contact support.";
  }

  /** Institutional membership missing */
  static missingInstitutionalMembership(): string {
    return "Your account is not associated with an institution. Please complete onboarding.";
  }

  /** User does not have access to the requested resource */
  static unauthorizedAccess(): string {
    return "You don't have access to this resource. Please contact your administrator.";
  }

  /** Session expired - user needs to sign in again */
  static sessionExpired(): string {
    return "Your session has expired. Please sign in again.";
  }

  /** General network or server error */
  static serverError(): string {
    return "A network or server error occurred. Please try again later.";
  }

  /** Generic error fallback */
  static generic(): string {
    return "An unexpected error occurred. Please try again.";
  }
}

/** Map Supabase auth error codes to user-friendly messages */
export function mapSupabaseAuthError(error: { message: string; code?: string }): string {
  const msg = (error.message || "").toLowerCase();

  if (msg.includes("invalid") && msg.includes("password")) {
    return AuthError.invalidCredentials();
  }
  if (msg.includes("email not verified") || msg.includes("email_verify")) {
    return AuthError.emailNotVerified();
  }
  if (msg.includes("suspended")) {
    return AuthError.accountSuspended();
  }
  if (msg.includes("user not found") || msg.includes("no user")) {
    return AuthError.invalidCredentials();
  }
  if (msg.includes("timeout") || msg.includes("network")) {
    return AuthError.serverError();
  }
  if (msg.includes("rate limit")) {
    return AuthError.serverError();
  }

  // Default fallback
  return AuthError.generic();
}