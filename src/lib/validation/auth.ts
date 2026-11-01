import { SignInFormData, SignUpFormData, AccountRole } from '@/types/auth';

export type { SignInFormData, SignUpFormData };

export function validateSignIn(data: SignInFormData): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!data.email) errors.push('Email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Invalid email format');
  if (!data.password) errors.push('Password is required');
  return { ok: errors.length === 0, errors };
}

export function validateSignUp(data: SignUpFormData): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!data.fullName) errors.push('Full name is required');
  if (!data.email) errors.push('Email is required');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push('Invalid email format');
  if (!data.password) errors.push('Password is required');
  else if (data.password.length < 8) errors.push('Password must be at least 8 characters');
  if (data.password !== data.confirmPassword) errors.push('Passwords do not match');
  if (!data.termsAccepted) errors.push('You must accept the Terms and Privacy Policy');
  // role‑specific checks
  if (data.role === 'student') {
    if (!data.studentClass) errors.push('Please select your class (1‑12)');
    else if (!/^[1-9]$|^1[0-2]$/.test(data.studentClass)) errors.push('Class must be between 1 and 12');
  }
  if (data.role === 'teacher') {
    if (!data.teacherSchool) errors.push('School name is required for teacher accounts');
  }
  return { ok: errors.length === 0, errors };
}