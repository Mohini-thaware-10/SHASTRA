"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { validateSignUp, type SignUpFormData } from "@/lib/validation/auth";
import { Container } from "@/components/common/container";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";

import { ArrowRight } from "lucide-react";

/* ==========================================================================
   Illustration Panel — left side of split-screen
   ========================================================================== */

function IllustrationPanel() {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden bg-gradient-to-b from-cream to-cream",
        "min-h-screen md:min-h-[calc(100vh_-_4rem)]"
      )}
    >
      {/* Decorative top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-96 md:h-[600px] bg-violet-soft opacity-20 blur-[80px] rounded-full -translate-y-1/2 transform md:-translate-y-1/2"
      />
      
      {/* SHATRA branding on left */}
      <div className="absolute top-6 left-6 md:left-10 text-ink">
        <span className="text-4xl md:text-5xl font-bold tracking-tight">
          SHATRA
        </span>
        <p className="mt-1 text-violet-strong text-sm md:text-base">
          Learn Beyond Limits
        </p>
      </div>

      {/* Main visual: magical educational fantasy scene */}
      <div
        className="relative flex-1 md:flex flex-col-reward md:row items-start md:items-center justify-center px-4 md:px-0 py-8 md:py-12"
      >
        {/* Floating island group - SVG illustration */}
        <div className="relative w-full md:w-[520px] md:h-[480px] md:mr-8 select-none">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full rounded-[20px] overflow-hidden md:rounded-[30px]"
          >
            <defs>
              {/* Sky gradient */}
              <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop stop-color="#81a1c1" offset="0%" />
                <stop stop-color="#e1e8f0" offset="100%" />
              </linearGradient>
              
              {/* Sun/moon glow */}
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop stop-color="#f5dabd" offset="0%" />
                <stop stop-color="#f5dabd" offset="0%" stopOpacity="0.3" />
                <stop stop-color="#f5dabd" offset="100%" stopOpacity="0" />
              </radialGradient>
              
              {/* Star glows */}
              <radialGradient id="starGlow" cx="50%" cy="50%" r="30%">
                <stop stop-color="#f5dabd" offset="0%" />
                <stop stop-color="#f5dabd" offset="30%" stopOpacity="0.5" />
                <stop stop-color="#ffffff" offset="60%" stopOpacity="0.2" />
                <stop stop-color="#ffffff" offset="100%" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Sky background */}
            <rect width="400" height="300" fill="url(#skyGradient)" />
            
            {/* Large glowing sun */}
            <circle cx="340" cy="80" r="40" fill="url(#glow)" />
            <circle cx="340" cy="80" r="18" fill="none" stroke="#5946a8" stroke-width="1" />
            
            {/* Floating islands */}
            <g className="select-none">
              <path
                d="M100 150 Q50 100, 20 150 Q80 200, 100 150 Q150 250, 200 200 Q250 280, 300 250 Q350 220, 380 200 Q390 180, 350 150 Q300 120, 250 150 Q200 180, 100 150"
                fill="#fff0e7"
                opacity="0.9"
              />
              <path
                d="M280 80 Q320 40, 360 80 Q380 100, 360 140 Q340 180, 280 140 Q260 120, 280 80"
                fill="#fbf9ff"
                opacity="0.95"
              />
              <path
                d="M180 220 Q220 260, 260 240 Q300 280, 340 260 Q360 240, 380 220 Q360 200, 320 220 Q280 220, 180 220"
                fill="#e4f4fb"
                opacity="0.9"
              />
            </g>
            
            {/* Clouds */}
            <g fill="#fff0e7" opacity="0.8">
              <circle cx="60" cy="60" r="18" />
              <circle cx="140" cy="40" r="14" />
              <circle cx="260" cy="50" r="20" />
              <circle cx="340" cy="45" r="16" />
              <circle cx="100" cy="120" r="22" />
              <circle cx="220" cy="130" r="16" />
              <circle cx="300" cy="110" r="18" />
            </g>
            
            {/* Stars */}
            <g fill="#ffffff" opacity="0.7">
              <circle cx="50" cy="50" r="1.5" />
              <circle cx="120" cy="30" r="1" />
              <circle cx="180" cy="70" r="2" />
              <circle cx="250" cy="40" r="1" />
              <circle cx="300" cy="80" r="2" />
              <circle cx="350" cy="60" r="1.5" />
              <circle cx="20" cy="90" r="1" />
              <circle cx="90" cy="150" r="2" />
              <circle cx="160" cy="180" r="1" />
              <circle cx="280" cy="160" r="2" />
              <circle cx="340" cy="140" r="1.5" />
            </g>
            
            {/* Magical sparkles / dust */}
            <g fill="#f5dabd" opacity="0.4">
              <circle cx="80" cy="90" r="1" />
              <circle cx="150" cy="60" r="1.5" />
              <circle cx="230" cy="95" r="1" />
              <circle cx="320" cy="55" r="1" />
              <circle cx="380" cy="100" r="2" />
            </g>
            
            {/* Floating student characters */}
            <g fill="#1c1930" opacity="0.9">
              {/* Student with book - left side */}
              <path
                d="M80 180 Q100 160, 130 180 Q150 200, 170 180 Q190 160, 210 180"
                stroke="#5946a8"
                strokeWidth="2"
                fill="#fff0e7"
              />
              <circle cx="130" cy="185" r="3" />
              <path d="M170 170 Q200 150, 230 170" stroke="#5946a8" strokeWidth="2" fill="none" />
              <ellipse cx="165" cy="175" rx="4" ry="2" fill="#5946a8" />
              
              {/* Student with book - right side */}
              <path
                d="M300 180 Q280 160, 250 180 Q230 200, 210 180 Q190 160, 170 180"
                stroke="#5946a8"
                strokeWidth="2"
                fill="#fff0e7"
                transform="translate(200, 0)"
              />
              <circle cx="250" cy="185" r="3" />
              <path d="M230 170 Q200 150, 170 170" stroke="#5946a8" strokeWidth="2" fill="none" transform="translate(200, 0)" />
              <ellipse cx="235" cy="175" rx="4" ry="2" fill="#5946a8" transform="translate(200, 0)" />
            </g>
          </svg>
        </div>
        
        {/* Educational elements floating in the air */}
        <div className="absolute top-10 right-6 md:right-10 select-none">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-violet-soft/50">
            <path d="M12 1L3 5v6a2 2 0 002 2h3a2 2 0 002-2v-6L12 1zm0 4L7 8a2 2 0 012 2h6a2 2 0 012-2v-6L12 1zm0 11L7 14a2 2 0 012 2h6a2 2 0 012-2v-6L12 1zm-5-5a2 2 0 100 4 2 2 0 000-4zm5 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-violet-soft/50 mt-3">
            <path d="M12 1L3 5v6a2 2 0 002 2h3a2 2 0 002-2v-6L12 1zm0 4L7 8a2 2 0 012 2h6a2 2 0 012-2v-6L12 1zm0 11L7 14a2 2 0 012 2h6a2 2 0 012-2v-6L12 1zm-5-5a2 2 0 100 4 2 2 0 000-4zm5 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-violet-soft/50 mt-3">
            <path d="M12 1L3 5v6a2 2 0 002 2h3a2 2 0 002-2v-6L12 1zm0 4L7 8a2 2 0 012 2h6a2 2 0 012-2v-6L12 1zm-5-5a2 2 0 100 4 2 2 0 000-4zm5 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        
        {/* Bottom visual highlights */}
        <div className="absolute bottom-6 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="flex items-start gap-2 px-3 py-2 rounded-md border-border-soft bg-white/60 backdrop-blur-sm min-w-[200px]">
            <svg className="h-4 w-4 text-violet-strong/60 mt-0.5" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6a2 2 0 002 2h3a2 2 0 002-2v-6L12 1zm0 4L7 8a2 2 0 012 2h6a2 2 0 012-2v-6L12 1zm0 11L7 14a2 2 0 012 2h6a2 2 0 012-2v-6L12 1" />
            </svg>
            <div>
              <p className="text-[0.625rem] font-medium text-violet-strong uppercase tracking-wider">
                Personalised Learning
              </p>
              <p className="text-[0.55rem] text-ink-soft/70">Tailored paths for every student</p>
            </div>
          </div>
          <div className="flex items-start gap-2 px-3 py-2 rounded-md border-border-soft bg-white/60 backdrop-blur-sm min-w-[200px]">
            <svg className="h-4 w-4 text-violet-strong/60 mt-0.5" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6a2 2 0 002 2h3a2 2 0 002-2v-6L12 1zm0 4L7 8a2 2 0 012 2h6a2 2 0 012-2v-6L12 1" />
            </svg>
            <div>
              <p className="text-[0.625rem] font-medium text-violet-strong uppercase tracking-wider">
                Interactive Quests
              </p>
              <p className="text-[0.55rem] text-ink-soft/70">Missions & challenges</p>
            </div>
          </div>
          <div className="flex items-start gap-2 px-3 py-2 rounded-md border-border-soft bg-white/60 backdrop-blur-sm min-w-[200px]">
            <svg className="h-4 w-4 text-violet-strong/60 mt-0.5" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6a2 2 0 002 2h3a2 2 0 002-2v-6L12 1zm0 4L7 8a2 2 0 012 2h6a2 2 0 012-2v-6L12 1" />
            </svg>
            <div>
              <p className="text-[0.625rem] font-medium text-violet-strong uppercase tracking-wider">
                Learning Progress
              </p>
              <p className="text-[0.55rem] text-ink-soft/70">Track your growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Registration Card — right side of split-screen
   ========================================================================== */

function RegistrationCard() {
  return (
    <div className="relative flex flex-col items-center justify-center p-4 md:p-6 flex-shrink-0 w-full max-w-[460px] growth-0">
      {/* Cream card background */}
      <div className="relative w-full bg-cream rounded-2xl border border-border-soft shadow-lg shadow-black/5">
        
        {/* Card header: SHATRA wordmark */}
        <div className="px-6 py-4 md:py-6 text-center">
          <BrandMark size="lg" showWordmark="true" tone="dark" className="mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
            Create Your Account
          </h1>
          <p className="mt-2 text-ink-soft text-sm">
            Join SHATRA and start your personalised learning journey.
          </p>
        </div>
        
        {/* Divider "or" */}
        <div className="flex items-center justify-center px-6 py-3">
          <span className="text-ink-soft text-xs uppercase tracking-wider opacity-60">
            —
          </span>
          <span className="inline-block w-px h-4 bg-border-soft md:w-px md:h-6"></span>
          <span className="text-ink-soft text-xs uppercase tracking-wider opacity-60">—</span>
        </div>
        
        {/* Role selector at top of form */}
        <div className="px-6 py-3 md:px-6 md:py-4 flex flex-col md:flex-row gap-3 md:gap-0 justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 px-3 py-1.5 text-sm font-medium transition-colors rounded-md border-border-soft text-ink hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
              "data-state='selected' && bg-cream border-violet-strong text-violet-strong"
            )}
            onClick={() => setRole('student')}
            aria-pressed={role === 'student'}
            aria-label="Select student account"
          >
            Student
            <GraduationCap className="ml-1 h-4 w-4" strokeWidth={1.8} />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 px-3 py-1.5 text-sm font-medium transition-colors rounded-md border-border-soft text-ink hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
              "data-state='selected' && bg-cream border-teacher-soft text-teacher"
            )}
            onClick={() => setRole('teacher')}
            aria-pressed={role === 'teacher'}
            aria-label="Select teacher account"
          >
            Teacher
            <User className="ml-1 h-4 w-4" strokeWidth={1.8} />
          </Button>
        </div>
        
        {/* Form fields */}
        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 space-y-4"
          aria-labelledby="signup-title"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-[0.625rem] font-medium text-ink mb-1">
              Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={cn(
                  "w-full rounded-md border px-3 py-3.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors",
                  reducingMotion ? "transition-none" : ""
                )}
                disabled={submitting}
                placeholder="Jane Doe"
                required
              />
              <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted/60 cursor-pointer hover:text-ink focus:focus-visible:outline-none" onClick={() => setShowPassword(!showPassword)} aria-label="Show password" />
              <EyeOff className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted/60 cursor-pointer hover:text-ink focus:focus-visible:outline-none hidden" onClick={() => setShowPassword(!showPassword)} aria-label="Hide password" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted/60 hover:text-ink focus:focus-visible:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {error && error.includes("fullName") && (
              <p className="text-[0.55rem] text-red-600 mt-1">{error.split(",")[0]}"></p>
            )}
          </div>
          
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-[0.625rem] font-medium text-ink mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "w-full rounded-md border px-3 py-3.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors",
                reducingMotion ? "transition-none" : ""
              )}
              disabled={submitting}
              placeholder="you@email.com"
              required
            />
            {error && error.includes("email") && (
              <p className="text-[0.55rem] text-red-600 mt-1">{error.split(",")[1]}</p>
            )}
          </div>
          
          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-[0.625rem] font-medium text-ink mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  "w-full rounded-md border px-3 py-3.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors",
                  reducingMotion ? "transition-none" : ""
                )}
                disabled={submitting}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted/60 hover:text-ink focus:focus-visible:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {error && error.includes("password") && (
              <p className="text-[0.55rem] text-red-600 mt-1">{error.split(",")[2]}</p>
            )}
          </div>
          
          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-[0.625rem] font-medium text-ink mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={cn(
                  "w-full rounded-md border px-3 py-3.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors",
                  reducingMotion ? "transition-none" : ""
                )}
                disabled={submitting}
                placeholder="••••••••"
                required
              />
            </div>
            {error && error.includes("confirmPassword") && (
              <p className="text-[0.55rem] text-red-600 mt-1">Passwords do not match</p>
            )}
          </div>
          
          {/* Terms and conditions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="rounded border border-line bg-transparent hover:bg-violet-soft py-1.5 cursor-pointer"
                disabled={submitting}
              />
              <span className="text-[0.625rem] text-ink">
                I accept the <a href="/terms" className="underline underline-offset-2 text-violet-strong">Terms of Service</a> and <a href="/privacy" className="underline underline-offset-2 text-violet-strong">Privacy Policy</a>
              </span>
            </div>
            {error && error.includes("termsAccepted") && (
              <p className="text-[0.55rem] text-red-600 mt-1">You must accept the Terms and Privacy Policy</p>
            )}
          </div>
          
          {/* Role-specific fields (compact) */}
          {role === 'student' && (
            <div className="space-y-2">
              <label className="block text-[0.625rem] font-medium text-ink mb-1">
                Class (1‑12)
              </label>
              <select
                value={studentClass ?? ""}
                onChange={(e) => setStudentClass(e.target.value || undefined)}
                className="w-full rounded-md border px-3 py-2.5 text-sm placeholder-stone-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500"
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
                <p className="text-[0.55rem] text-red-600 mt-1">Please select your class (1‑12)</p>
              )}
            </div>
          )}
          
          {role === 'teacher' && (
            <div className="space-y-2">
              <label className="block text-[0.625rem] font-medium text-ink mb-1">
                School name
              </label>
              <input
                value={teacherSchool ?? ""}
                onChange={(e) => setTeacherSchool(e.target.value || undefined)}
                className="w-full rounded-md border px-3 py-3 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
                disabled={submitting}
                placeholder="e.g. Lincoln Elementary"
                aria-describedby="school-help-text"
                required
              />
              {error && error.includes("teacherSchool") && (
                <p className="text-[0.55rem] text-red-600 mt-1">School name is required for teacher accounts</p>
              )}
            </div>
          )}
        </form>
        
        {/* Action buttons */}
        <div className="px-6 py-4 md:px-6 md:py-4 border-t border-border-soft">
          {/* Primary Sign Up button */}
          <Button
            type="submit"
            disabled={submitting}
            className={cn(
              "w-full rounded-md py-2.5 px-3 text-sm font-medium text-ink font-medium transition-colors bg-violet-strong hover:bg-violet-strong/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed",
              "motion-reduce: transition-none"
            )}
          >
            {submitting ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin h-4 w-4 mr-2"></span>
                Creating account…
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
          
          {/* Divider "or" */}
          <div className="flex items-center justify-center gap-2 mt-3 text-[0.55rem] text-ink-soft/60">
            <span>or</span>
          </div>
          
          {/* Google continue */}
          <Button
            type="button"
            variant="outline-light"
            size="sm"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors rounded-md border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-sm text-ink-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="stroke-2"
            >
              <path d="M22.54 2.73a5.94 5.94 0 0 1-.75 1.53 5.995 5.995 0 0 1-1.53 .75H12a5.99 5.99 0 0 0-5.99 5.99 5.94 5.94 0 0 0 1.53 3.88 5.996 5.996 0 0 1 .75 1.53h7.59a3.94 3.94 0 0 1 1.06 3.01 3.939 3.939 0 0 0 2.93-.16 3.94 3.94 0 0 0 1.06-3.01h7.41a5.95 5.95 0 0 1 1.09 4.96 3.968 3.968 0 0 1-.81 1.37 3.938 3.938 0 0 0 1.09-.08 3.953 3.953 0 0 0-3.71-2.79 5.962 5.962 0 0 1-1.85-.61 3.948 3.948 0 0 0-1.65-1.06 3.953 3.953 0 0 0-3.83-.26 3.944 3.944 0 0 0-1.02-2.87 3.946 3.946 0 0 0-.78-2.15 3.953 3.953 0 0 0-2.58-.06 3.945 3.945 0 0 0-2.26 1.39 5.956 5.956 0 0 1-3.57-.35 5.992 5.992 0 0 1-4.28-1.37 5.948 5.948 0 0 1-1.39-3.16 5.994 5.994 0 0 1-.64-3.62 5.937 5.937 0 0 1-.34-2.05 3.952 3.952 0 0 0-2.16-1.28 3.946 3.946 0 0 0-1.07-.55 3.956 3.956 0 0 0-1.36-1.08 3.944 3.944 0 0 0-2.28-.66 3.95 3.95 0 0 0-3.09-1.37 3.948 3.948 0 0 0-2.05-.37 3.946 3.946 0 0 0-1.89-1.65 3.942 3.942 0 0 0-1.62-1.76 3.931 3.931 0 0 0-1.16-.55 3.945 3.945 0 0 0-.91-1.47 3.947 3.947 0 0 0-.54-1.88 3.95 3.95 0 0 0-1.53-1.37 3.95 3.95 0 0 0-1.15-.32 3.95 3.95 0 0 0-.55-.15 3.951 3.951 0 0 0-.32 1.06 3.948 3.948 0 0 0 .15 2.59 3.946 3.946 0 0 0 .93 2.93a3.95 3.95 0 0 0 2.36 1.06 3.942 3.942 0 0 1 .96.82 3.941 3.941 0 0 1 .53 1.96 3.943 3.943 0 0 1 .23 2.26z"/>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 7.477 2 12s4.477 10 10 10zm-6.42-4.38a4 4 0 1 1-5.66 5.66 4 4 0 0 1 5.66-5.66z"/>
            </svg>
            Continue with Google
          </Button>
        </div>
        
        {/* Already have account link */}
        <p className="px-6 py-3 text-center text-[0.55rem] text-ink-soft/60">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium underline underline-offset-2 text-violet-strong hover:text-violet/90"
          >
            Sign in
          </Link>
          {" instead."}
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   Main SignUpForm Component
   ========================================================================== */

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
  const router = useRouter();

  const reduceMotion = useReducedMotion();

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
    <div className="min-h-screen bg-background">
      {/* Split screen layout: desktop 1200px+ */}
      <div className="relative flex min-h-screen">
        {/* LEFT SIDE: Illustration panel (50% on desktop) */}
        <div className="relative flex-1 md:flex md:w-1/2 md:min-h-[calc(100vh_-_4rem)] bg-gradient-to-b from-cream to-cream">
          <IllustrationPanel />
        </div>
        
        {/* RIGHT SIDE: Registration card (max 460px) */}
        <div className="relative md:flex-none w-full max-w-[460px] md:w-full flex justify-center items-center">
          <RegistrationCard />
        </div>
      </div>
      
      {/* Mobile full-width layout: below 768px */}
      <div className="hidden md:block"></div>
      <div className="md:hidden">
        {/* Mobile: compact brand header + full-width card */}
        <div className="relative py-12 px-4 text-center">
          <BrandMark size="md" showWordmark="true" tone="dark" className="mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-ink tracking-tight">
            Create Your Account
          </h1>
          <p className="mt-2 text-ink-soft text-sm">
            Join SHATRA and start your personalised learning journey.
          </p>
        </div>
        
        {/* Full-width registration card on mobile */}
        <div className="relative w-full max-w-full bg-cream rounded-2xl border border-border-soft shadow-lg shadow-black/5 px-4 py-6 md:px-6 md:py-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-labelledby="signup-mobile-title"
          >
            <h2 id="signup-mobile-title" className="text-2xl font-semibold text-ink tracking-tight mb-4">
              Create Your Account
            </h2>
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName-mobile" className="block text-[0.625rem] font-medium text-ink mb-1">
                Full Name
              </label>
              <input
                id="fullName-mobile"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-md border px-3 py-3.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
                disabled={submitting}
                placeholder="Jane Doe"
                required
              />
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email-mobile" className="block text-[0.625rem] font-medium text-ink mb-1">
                Email Address
              </label>
              <input
                id="email-mobile"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border px-3 py-3.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
                disabled={submitting}
                placeholder="you@email.com"
                required
              />
            </div>
            
            {/* Password */}
            <div className="relative">
              <input
                id="password-mobile"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border px-3 py-3.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
                disabled={submitting}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted/60 hover:text-ink focus:focus-visible:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            
            {/* Confirm Password */}
            <div className="relative">
              <input
                id="confirmPassword-mobile"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-md border px-3 py-3.5 text-sm placeholder-text-ink/40 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
                disabled={submitting}
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && error.includes("confirmPassword") && (
              <p className="text-[0.55rem] text-red-600 mt-1">Passwords do not match</p>
            )}
            
            {/* Terms */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="rounded border border-line bg-transparent hover:bg-violet-soft py-1.5 cursor-pointer"
                disabled={submitting}
              />
              <span className="text-sm text-ink">
                I accept the <a href="/terms" className="underline underline-offset-2 text-violet-strong">Terms of Service</a> and <a href="/privacy" className="underline underline-offset-2 text-violet-strong">Privacy Policy</a>
              </span>
            </div>
            {error && error.includes("termsAccepted") && (
              <p className="text-[0.55rem] text-red-600 mt-1">You must accept the Terms and Privacy Policy</p>
            )}
            
            {/* Action button */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full rounded-md py-2.5 px-3 text-sm font-medium text-ink font-medium transition-colors bg-violet-strong hover:bg-violet-strong/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin h-4 w-4 mr-2"></span>
                  Creating account…
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
            
            {/* Divider */}
            <div className="flex items-center justify-center gap-2 mt-3 text-[0.55rem] text-ink-soft/60">
              <span>or</span>
            </div>
            
            {/* Sign in link */}
            <p className="mt-4 text-center text-[0.55rem] text-ink-soft/60">
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
        </div>
      </div>
    </div>
  );
}