import type { Database, SupabaseClient } from "@supabase/supabase-js";

type Tables<DB extends Database = Database> = Database["public"]["Tables"];
type TableName<DB extends Database = Database> = keyof Tables;

type ProfileRow = Tables["profiles"]["Row"];
type ProfileInsert = Tables["profiles"]["Insert"];
type ProfileUpdate = Tables["profiles"]["Update"];

type StudentProgressRow = Tables["student_progress"]["Row"];
type StudentProgressInsert = Tables["student_progress"]["Insert"];
type StudentProgressUpdate = Tables["student_progress"]["Update"];

type LearningActivityRow = Tables["learning_activities"]["Row"];
type LearningActivityInsert = Tables["learning_activities"]["Insert"];
type LearningActivityUpdate = Tables["learning_activities"]["Update"];

type SubjectsSelectedRow = Tables["subjects_selected"]["Row"];
type SubjectsSelectedInsert = Tables["subjects_selected"]["Insert"];
type SubjectsSelectedUpdate = Tables["subjects_selected"]["Update"];

type AssessmentResultRow = Tables["assessment_results"]["Row"];
type AssessmentResultInsert = Tables["assessment_results"]["Insert"];
type AssessmentResultUpdate = Tables["assessment_results"]["Update"];

type AchievementRow = Tables["achievements"]["Row"];
type AchievementInsert = Tables["achievements"]["Insert"];
type AchievementUpdate = Tables["achievements"]["Update"];

type UserStreakRow = Tables["user_streaks"]["Row"];
type UserStreakInsert = Tables["user_streaks"]["Insert"];
type UserStreakUpdate = Tables["user_streaks"]["Update"];

type InstitutionRow = Tables["institutions"]["Row"];
type InstitutionInsert = Tables["institutions"]["Insert"];
type InstitutionUpdate = Tables["institutions"]["Update"];

type InstitutionUserRow = Tables["institution_users"]["Row"];
type InstitutionUserInsert = Tables["institution_users"]["Insert"];
type InstitutionUserUpdate = Tables["institution_users"]["Update"];

export type {
  ProfileRow,
  ProfileInsert,
  ProfileUpdate,
  StudentProgressRow,
  StudentProgressInsert,
  StudentProgressUpdate,
  LearningActivityRow,
  LearningActivityInsert,
  LearningActivityUpdate,
  SubjectsSelectedRow,
  SubjectsSelectedInsert,
  SubjectsSelectedUpdate,
  AssessmentResultRow,
  AssessmentResultInsert,
  AssessmentResultUpdate,
  AchievementRow,
  AchievementInsert,
  AchievementUpdate,
  UserStreakRow,
  UserStreakInsert,
  UserStreakUpdate,
  InstitutionRow,
  InstitutionInsert,
  InstitutionUpdate,
  InstitutionUserRow,
  InstitutionUserInsert,
  InstitutionUserUpdate,
};

/**
 * Repository Interface - defines data access contracts.
 * Implementations: MockRepository, SupabaseRepository.
 */
export interface IRepository {
  // Profile operations
  getProfile(userId: string): Promise<ProfileRow | null>;
  updateProfile(userId: string, data: Partial<ProfileUpdate>): Promise<ProfileRow | null>;
  createProfile(userId: string, data: ProfileInsert): Promise<ProfileRow | null>;

  // Student progress operations
  getStudentProgress(userId: string, subject?: string): Promise<StudentProgressRow[]>;
  upsertStudentProgress(userId: string, data: StudentProgressInsert): Promise<StudentProgressRow>;
  updateStudentProgressProgress(userId: string, subject: string, progress: number): Promise<StudentProgressRow>;

  // Learning activities operations
  getLearningActivities(userId: string, filters?: {
    type?: string;
    subject?: string;
    universe?: string;
    completed?: boolean;
  }): Promise<LearningActivityRow[]>;
  createLearningActivity(userId: string, data: LearningActivityInsert): Promise<LearningActivityRow>;
  updateLearningActivity(id: string, data: LearningActivityUpdate): Promise<LearningActivityRow>;

  // Subjects selected operations
  getSelectedSubjects(userId: string): Promise<SubjectsSelectedRow[]>;
  addSelectedSubject(userId: string, subject: string, universe: string): Promise<SubjectsSelectedRow>;
  removeSelectedSubject(userId: string, subject: string): Promise<void>;

  // Assessment results operations
  getAssessmentResult(userId: string): Promise<AssessmentResultRow | null>;
  upsertAssessmentResult(userId: string, data: AssessmentResultInsert): Promise<AssessmentResultRow>;

  // Achievements operations
  getAchievements(userId: string): Promise<AchievementRow[]>;
  unlockAchievement(userId: string, title: string, description?: string, universe?: string): Promise<AchievementRow>;

  // User streaks operations
  getUserStreak(userId: string): Promise<UserStreakRow | null>;
  updateUserStreak(userId: string, currentStreak: number, highestStreak: number, lastActivityAt: string): Promise<UserStreakRow>;

  // Institution operations
  getInstitution(institutionId: string): Promise<InstitutionRow | null>;
  listInstitutionUsers(institutionId: string, role?: string): Promise<InstitutionUserRow[]>;
  assignUserToInstitution(userId: string, institutionId: string, role: string): Promise<InstitutionUserRow>;
}