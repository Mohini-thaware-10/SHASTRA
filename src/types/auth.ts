export type AccountRole = 'student' | 'teacher';

export interface SignInFormData {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignUpFormData {
  role: AccountRole;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  // role‑specific
  studentClass?: string; // '1'..'12'
  schoolName?: string;
  teacherSchool?: string;
  teachingExperience?: string;
}