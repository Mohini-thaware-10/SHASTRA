import type {
  IRepository,
  ProfileRow,
  ProfileInsert,
  ProfileUpdate,
  StudentProgressRow,
  StudentProgressInsert,
  LearningActivityRow,
  LearningActivityInsert,
  SubjectsSelectedRow,
  SubjectsSelectedInsert,
  AssessmentResultRow,
  AssessmentResultInsert,
  AchievementRow,
  AchievementInsert,
  UserStreakRow,
} from "./repository";

/**
 * Data Provider Interface - defines the contract that both
 * MockDataProvider and SupabaseDataProvider must implement.
 * 
 * Application code depends on this interface, not on concrete implementations.
 * Switching providers requires no component changes.
 */
export interface IDataProvider {
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
}

/**
 * MockDataProvider - provides typed mock data for development.
 * 
 * Properties:
 - Pure in-memory, no network calls
 - Data persists within the same session
 - Types match the Supabase schema exactly
 - Used when Supabase credentials are unavailable or in development mode
 */
export class MockDataProvider implements IDataProvider {
  private readonly repo = new (await import("./mock-repository")).MockRepository;

  constructor() {
    this.repo = new (await import("./mock-repository").MockRepository);
  }

  // Profile operations
  async getProfile(userId: string): Promise<ProfileRow | null> {
    return this.repo.getProfile(userId);
  }

  async updateProfile(userId: string, data: Partial<ProfileUpdate>): Promise<ProfileRow | null> {
    return this.repo.updateProfile(userId, data);
  }

  async createProfile(userId: string, data: ProfileInsert): Promise<ProfileRow | null> {
    return this.repo.createProfile(userId, data);
  }

  // Student progress operations
  async getStudentProgress(userId: string, subject?: string): Promise<StudentProgressRow[]> {
    return this.repo.getStudentProgress(userId, subject);
  }

  async upsertStudentProgress(userId: string, data: StudentProgressInsert): Promise<StudentProgressRow> {
    return this.repo.upsertStudentProgress(userId, data);
  }

  async updateStudentProgressProgress(userId: string, subject: string, progress: number): Promise<StudentProgressRow> {
    return this.repo.updateStudentProgressProgress(userId, subject, progress);
  }

  // Learning activities operations
  async getLearningActivities(userId: string, filters?: {
    type?: string;
    subject?: string;
    universe?: string;
    completed?: boolean;
  }): Promise<LearningActivityRow[]> {
    return this.repo.getLearningActivities(userId, filters);
  }

  async createLearningActivity(userId: string, data: LearningActivityInsert): Promise<LearningActivityRow> {
    return this.repo.createLearningActivity(userId, data);
  }

  // Subjects selected operations
  async getSelectedSubjects(userId: string): Promise<SubjectsSelectedRow[]> {
    return this.repo.getSelectedSubjects(userId);
  }

  async addSelectedSubject(userId: string, subject: string, universe: string): Promise<SubjectsSelectedRow> {
    return this.repo.addSelectedSubject(userId, subject, universe);
  }

  async removeSelectedSubject(userId: string, subject: string): Promise<void> {
    return this.repo.removeSelectedSubject(userId, subject);
  }

  // Assessment results operations
  async getAssessmentResult(userId: string): Promise<AssessmentResultRow | null> {
    return this.repo.getAssessmentResult(userId);
  }

  async upsertAssessmentResult(userId: string, data: AssessmentResultInsert): Promise<AssessmentResultRow> {
    return this.repo.upsertAssessmentResult(userId, data);
  }

  // Achievements operations
  async getAchievements(userId: string): Promise<AchievementRow[]> {
    return this.repo.getAchievements(userId);
  }

  async unlockAchievement(userId: string, title: string, description?: string, universe?: string): Promise<AchievementRow> {
    return this.repo.unlockAchievement(userId, title, description, universe);
  }

  // User streaks operations
  async getUserStreak(userId: string): Promise<UserStreakRow | null> {
    return this.repo.getUserStreak(userId);
  }

  async updateUserStreak(userId: string, currentStreak: number, highestStreak: number, lastActivityAt: string): Promise<UserStreakRow> {
    return this.repo.updateUserStreak(userId, currentStreak, highestStreak, lastActivityAt);
  }
}

/**
 * SupabaseDataProvider - uses Supabase browser client for real backend operations.
 * 
 * Properties:
 - Connects to actual Supabase project
 - All queries go through supabaseBrowser
 - Requires valid NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 - Returns real database data with proper RLS enforcement
 * 
 * Throws error if Supabase credentials are misconfigured.
 */
export class SupabaseDataProvider implements IDataProvider {
  private readonly repo = new (await import("./supabase-repository").SupabaseRepository);

  constructor() {
    this.repo = new (await import("./supabase-repository").SupabaseRepository);
  }

  // Profile operations
  async getProfile(userId: string): Promise<ProfileRow | null> {
    return this.repo.getProfile(userId);
  }

  async updateProfile(userId: string, data: Partial<ProfileUpdate>): Promise<ProfileRow | null> {
    return this.repo.updateProfile(userId, data);
  }

  async createProfile(userId: string, data: ProfileInsert): Promise<ProfileRow | null> {
    return this.repo.createProfile(userId, data);
  }

  // Student progress operations
  async getStudentProgress(userId: string, subject?: string): Promise<StudentProgressRow[]> {
    return this.repo.getStudentProgress(userId, subject);
  }

  async upsertStudentProgress(userId: string, data: StudentProgressInsert): Promise<StudentProgressRow> {
    return this.repo.upsertStudentProgress(userId, data);
  }

  async updateStudentProgressProgress(userId: string, subject: string, progress: number): Promise<StudentProgressRow> {
    return this.repo.updateStudentProgressProgress(userId, subject, progress);
  }

  // Learning activities operations
  async getLearningActivities(userId: string, filters?: {
    type?: string;
    subject?: string;
    universe?: string;
    completed?: boolean;
  }): Promise<LearningActivityRow[]> {
    return this.repo.getLearningActivities(userId, filters);
  }

  async createLearningActivity(userId: string, data: LearningActivityInsert): Promise<LearningActivityRow> {
    return this.repo.createLearningActivity(userId, data);
  }

  // Subjects selected operations
  async getSelectedSubjects(userId: string): Promise<SubjectsSelectedRow[]> {
    return this.repo.getSelectedSubjects(userId);
  }

  async addSelectedSubject(userId: string, subject: string, universe: string): Promise<SubjectsSelectedRow> {
    return this.repo.addSelectedSubject(userId, subject, universe);
  }

  async removeSelectedSubject(userId: string, subject: string): Promise<void> {
    return this.repo.removeSelectedSubject(userId, subject);
  }

  // Assessment results operations
  async getAssessmentResult(userId: string): Promise<AssessmentResultRow | null> {
    return this.repo.getAssessmentResult(userId);
  }

  async upsertAssessmentResult(userId: string, data: AssessmentResultInsert): Promise<AssessmentResultRow> {
    return this.repo.upsertAssessmentResult(userId, data);
  }

  // Achievements operations
  async getAchievements(userId: string): Promise<AchievementRow[]> {
    return this.repo.getAchievements(userId);
  }

  async unlockAchievement(userId: string, title: string, description?: string, universe?: string): Promise<AchievementRow> {
    return this.repo.unlockAchievement(userId, title, description, universe);
  }

  // User streaks operations
  async getUserStreak(userId: string): Promise<UserStreakRow | null> {
    return this.repo.getUserStreak(userId);
  }

  async updateUserStreak(userId: string, currentStreak: number, highestStreak: number, lastActivityAt: string): Promise<UserStreakRow> {
    return this.repo.updateUserStreak(userId, currentStreak, highestStreak, lastActivityAt);
  }
}

/**
 * DataProvider Factory - creates the appropriate provider based on environment.
 * 
 * Rules:
 - If Supabase credentials are properly configured (not placeholder values), use SupabaseDataProvider
 - If Supabase credentials are placeholders or missing, fall back to MockDataProvider
 - Never silently fallback in production without logging
 - The application can explicitly override this choice
 */
export function createDataProvider(override?: "mock" | "supabase"): IDataProvider {
  // If explicit override is provided, use it
  if (override === "mock" || override === "supabase") {
    if (override === "mock") {
      return new MockDataProvider();
    }
    return new SupabaseDataProvider();
  }

  // Check if Supabase credentials are configured
  const url = typeof window !== "undefined" ? window.location.origin : "";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If credentials look like placeholders, use mock
  if (
    !supabaseUrl ||
    supabaseUrl.includes("your-supabase-anon-key-here") ||
    supabaseUrl.includes("localhost") && !url.includes("localhost")
  ) {
    console.info("[DataProvider] Using MockDataProvider - Supabase credentials not configured");
    return new MockDataProvider();
  }

  // Use Supabase with real credentials
  try {
    const provider = new SupabaseDataProvider();
    // Test connection by trying to get a profile (will fail gracefully if no user signed in)
    // We don't await this - just verify the provider is instantiable
    return provider;
  } catch (error) {
    console.warn("[DataProvider] Supabase initialization failed, falling back to MockDataProvider:", error);
    return new MockDataProvider();
  }
}

/**
 * Provider Context Hook - allows dashboard components to use the data provider
 * without knowing which implementation is active.
 * 
 * Usage:
 * const { data, loading, error } = useDataProvider(userId, "getProfile");
 */
export function useDataProvider(userId: string, operation: keyof IDataProvider) {
  const provider = createDataProvider();
  return provider[operation](userId) as Promise<any>;
}