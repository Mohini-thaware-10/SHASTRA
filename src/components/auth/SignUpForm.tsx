"use client";

import { useState } from "react";
import { Eye, EyeOff, GraduationCap, User, School, Calendar } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { validateSignUp, type SignUpFormData } from "@/lib/validation/auth";

export function SignUpForm({ onSubmit }: { onSubmit: (data: SignUpFormData) => void }) {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [studentClass, setStudentClass] = useState<string | undefined>(undefined);
  const [teacherSchool, setTeacherSchool] = useState<string | undefined>(undefined);

  const handleSubmit = () => {
    const data: SignUpFormData = {
      role,
      fullName,
      email,
      password,
      confirmPassword,
      termsAccepted,
      studentClass: role === "student" ? studentClass : undefined,
      teacherSchool: role === "teacher" ? teacherSchool : undefined,
    };
    const validation = validateSignUp(data);
    if (!validation.ok) {
      setError(validation.errors.join(", "));
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmit?.(data);
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-labelledby="signup-title"
    >
      <h2 id="signup-title" className="text-2xl font-semibold text-ink">
        Create your SHATRA account
      </h2>

      {/* Role selector */}
      <div className="mb-4">
        <p className="text-sm text-ink-muted/60 mb-2">Account type</p>
        <div className="flex gap-2">
          <button
            type="button"
            className={cn(
              "flex-1 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors outline-none outline-2 outline-offset-2",
              role === "student"
                ? "border-student bg-student-soft text-student"
                : "border-teacher bg-teacher-soft text-teacher",
            )}
            onClick={() => setRole("student")}
            aria-pressed={role === "student"}
            aria-label="Select student account"
          >
            Student
          </button>
          <button
            type="button"
            className={cn(
              "flex-1 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors outline-none outline-2 outline-offset-2",
              role === "teacher"
                ? "border-teacher bg-teacher-soft text-teacher"
                : "border-student bg-student-soft text-student",
            )}
            onClick={() => setRole("teacher")}
            aria-pressed={role === "teacher"}
            aria-label="Select teacher account"
          >
            Teacher
          </button>
        </div>
      </div>

      {/* Full name */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-ink/70">Full name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="relative w-full rounded-md border px-3 py-2.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
          disabled={submitting}
          placeholder="Jane Doe"
          aria-describedby="name-help-text"
        />
        {error && error.includes("fullName") && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
        <p id="name-help-text" className="text-xs text-ink-muted/60">
          This name will appear on your profile.
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-ink/70">Email address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="relative w-full rounded-md border px-3 py-2.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
          disabled={submitting}
          placeholder="you@email.com"
          aria-describedby="email-help-text-2"
        />
        {error && error.includes("email") && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
        <p id="email-help-text-2" className="text-xs text-ink-muted/60">
          We will never share your email.
        </p>
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-ink/70">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="relative w-full rounded-md border px-3 py-2.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
            disabled={submitting}
            aria-describedby="password-help-text-2"
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
        <p id="password-help-text-2" className="text-xs text-ink-muted/60">
          Minimum 8 characters.
        </p>
      </div>

      {/* Confirm password */}
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-ink/70">Confirm password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="relative w-full rounded-md border px-3 py-2.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
            disabled={submitting}
            aria-describedby="confirm-help-text"
          />
        </div>
        {error && error.includes("confirmPassword") && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
        <p id="confirm-help-text" className="text-xs text-ink-muted/60">
          Passwords must match.
        </p>
      </div>

      {/* Terms */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
          className="rounded border border-line bg-transparent hover:bg-violet-soft py-1 cursor-pointer"
          disabled={submitting}
        />
        <span className="text-sm text-ink-muted/60">
          I accept the <a href="/terms" className="underline underline-offset-2 text-violet-strong">Terms of Service</a> and <a href="/privacy" className="underline underline-offset-2 text-violet-strong">Privacy Policy</a>
        </span>
      </div>

      {/* Role‑specific fields */}
      {role === 'student' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-ink/70 mb-1">Class (1‑12)</label>
          <select
            value={studentClass ?? ""}
            onChange={(e) => setStudentClass(e.target.value || undefined)}
            className="rounded-md border px-3 py-2 text-sm placeholder-stone-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 w-full"
          >
            <option value="">Select class</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          {error && error.includes("studentClass") && (
            <p className="mt-1 text-xs text-red-600">{error}</p>
          )}
        </div>
      )}

      {role === 'teacher' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-ink/70 mb-1">School name</label>
          <input
            value={teacherSchool ?? ""}
            onChange={(e) => setTeacherSchool(e.target.value || undefined)}
            className="relative w-full rounded-md border px-3 py-2.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
            disabled={submitting}
            placeholder="e.g. Lincoln Elementary"
            aria-describedby="school-help-text"
          />
          {error && error.includes("teacherSchool") && (
            <p className="mt-1 text-xs text-red-600">{error}</p>
          )}
          <p id="school-help-text" className="text-xs text-ink-muted/60">
            Optional – shown on your teacher profile.
          </p>
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={submitting}
        className="w-full"
      >
        {submitting ? (
          <span className="flex items-center justify-center">
            <span className="animate-spin h-4 w-4 mr-2"></span>
            Creating account…
          </span>
        ) : (
          "Create account"
        )}
      </Button>

      {/* Already have account link */}
      <p className="mt-5 text-sm text-ink-muted/70">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium underline underline-offset-2 text-violet-strong hover:text-violet/90"
        >
          Sign in
        </Link>
        {" instead."}
      </p>
    </form>
  );
}