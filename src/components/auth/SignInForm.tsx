"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { validateSignIn, type SignInFormData } from "@/lib/validation/auth";

export function SignInForm({ onSubmit }: { onSubmit: (data: SignInFormData) => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const data: SignInFormData = { email, password, remember: false };
    const validation = validateSignIn(data);
    if (!validation.ok) {
      setError(validation.errors.join(", "));
      return;
    }
    setSubmitting(true);
    // Call onSubmit if provided, otherwise do nothing
    onSubmit?.(data);
    setTimeout(() => {
      setSubmitting(false);
      setError(null);
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-labelledby="signin-title"
    >
      <h2 id="signin-title" className="text-2xl font-semibold text-ink">
        Sign in to SHATRA
      </h2>

      {/* Email */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-ink/70">
          Email address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="relative w-full rounded-md border px-3 py-2.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
          disabled={submitting}
          placeholder="you@email.com"
          aria-describedby="email-help-text"
        />
        {error && error.includes("email") && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
        <p id="email-help-text" className="text-xs text-ink-muted/60">
          We will never share your email.
        </p>
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-ink/70">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="relative w-full rounded-md border px-3 py-2.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
            disabled={submitting}
            aria-describedby="password-help-text"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted/60 hover:text-ink focus:focus-visible:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff /> as React.ReactNode : <Eye /> as React.ReactNode}
          </button>
        </div>
        {error && error.includes("password") && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
        <p id="password-help-text" className="text-xs text-ink-muted/60">
          Minimum 8 characters.
        </p>
      </div>

      {/* Remember me */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="remember"
          checked={false}
          className="rounded border border-line bg-transparent hover:bg-violet-soft py-1 cursor-pointer"
          disabled={submitting}
        />
        <span className="text-sm text-ink-muted/60">Remember me</span>
      </div>

      {/* Forgot password link */}
      <div className="text-right">
        <Link
          href="/forgot-password"
          className="text-sm font-medium underline underline-offset-2 text-violet-strong hover:text-violet/90"
        >
          Forgot password?
        </Link>
      </div>

      {/* Sign in button */}
      <Button
        type="submit"
        disabled={submitting}
        className="w-full"
      >
        {submitting ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin h-4 w-4 mr-2"></span>
            Submitting…
          </span>
        ) : (
          "Sign in"
        )}
      </Button>

      {/* Google placeholder */}
      <div className="mt-4 flex items-center gap-2 text-sm text-ink-muted/70">
        <span>Or continue with</span>
        <Button
          variant="outline-light"
          size="sm"
          aria-label="Google sign-in (placeholder)"
          className="p-0 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="stroke-2"
          >
            <path d="M22.54 2.73a5.94 5.94 0 0 1-.75 1.53 5.995 5.995 0 0 1-1.53 .75H12a5.99 5.99 0 0 0-5.99 5.99 5.94 5.94 0 0 0 1.53 3.88 5.996 5.996 0 0 1 .75 1.53h7.59a3.94 3.94 0 0 1 1.06 3.01 3.939 3.939 0 0 0 2.93-.16 3.94 3.94 0 0 0 1.06-3.01h7.41a5.95 5.95 0 0 1 1.09 4.96 3.968 3.968 0 0 1-.81 1.37 3.946 3.946 0 0 1 1.68 1.1 3.938 3.938 0 0 0 1.09-.08 3.95 3.95 0 0 0 3.71-2.79 5.962 5.962 0 0 1-1.85-.61 3.948 3.948 0 0 0-1.65-1.06 3.953 3.953 0 0 0-3.83-.26 3.944 3.944 0 0 0-1.02-2.87 3.946 3.946 0 0 0-.78-2.15 3.953 3.953 0 0 0-2.58-.06 3.945 3.945 0 0 0-2.26 1.39 5.956 5.956 0 0 1-3.57-.35 5.992 5.992 0 0 1-4.28-1.37 5.948 5.948 0 0 1-1.39-3.16 5.994 5.994 0 0 1-.64-3.62 5.937 5.937 0 0 1-.34-2.05 3.952 3.952 0 0 0-2.16-1.28 3.946 3.946 0 0 0-1.07-.55 3.956 3.956 0 0 0-1.36-1.08 3.944 3.944 0 0 0-2.28-.66 3.95 3.95 0 0 0-3.09-1.37 3.948 3.948 0 0 0-2.05-.37 3.946 3.946 0 0 0-1.89-1.65 3.942 3.942 0 0 0-1.62-1.76 3.931 3.931 0 0 0-1.16-.55 3.945 3.945 0 0 0-.91-1.47 3.947 3.947 0 0 0-.54-1.88 3.95 3.95 0 0 0-1.53-1.37 3.95 3.95 0 0 0-1.15-.32 3.95 3.95 0 0 0-.55-.15 3.951 3.951 0 0 0-.32 1.06 3.948 3.948 0 0 0 .15 2.59 3.946 3.946 0 0 0 .93 2.93a3.95 3.95 0 0 0 2.36 1.06 3.942 3.942 0 0 1 .96.82 3.941 3.941 0 0 1 .53 1.96 3.943 3.943 0 0 1 .23 2.26z"/>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 7.477 2 12s4.477 10 10 10zm-6.42-4.38a4 4 0 1 1-5.66 5.66 4 4 0 0 1 5.66-5.66z"/>
          </svg>
        </Button>
      </div>

      {/* Create account link */}
      <p className="mt-5 text-sm text-ink-muted/70">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium underline underline-offset-2 text-violet-strong hover:text-violet/90"
        >
          Sign up
        </Link>
        {" for SHATRA."}
      </p>
    </form>
  );
}