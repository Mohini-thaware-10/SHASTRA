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
import { supabaseBrowser } from "@/lib/supabase/browser-client";

/**
 * Supabase Repository - uses the browser Supabase client for data operations.
 * Runs entirely on the client side using supabaseBrowser.
 * All operations go through Supabase SQL queries.
 */
export class SupabaseRepository implements IRepository {
  private readonly DB = "public";

  // Profile operations
  async getProfile(userId: string): Promise<ProfileRow | null> {
    const { data, error } = await supabaseBrowser
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Supabase getProfile error:", error);
      return null;
    }
    return data as ProfileRow;
  }

  async updateProfile(userId: string, data: Partial<ProfileUpdate>): Promise<ProfileRow | null> {
    const { data, error } = await supabaseBrowser
      .from("profiles")
      .update(data)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Supabase updateProfile error:", error);
      return null;
    }
    return data as ProfileRow;
  }

  async createProfile(userId: string, data: ProfileInsert): Promise<ProfileRow | null> {
    const { data, error } = await supabaseBrowser
      .from("profiles")
      .insert({ id: userId, ...data })
      .select()
      .single();

    if (error) {
      console.error("Supabase createProfile error:", error);
      return null;
    }
    return data as ProfileRow;
  }

  // Student progress operations
  async getStudentProgress(userId: string, subject?: string): Promise<StudentProgressRow[]> {
    let query = supabaseBrowser.from("student_progress").select("*").eq("user_id", userId);

    if (subject) {
      query = query.eq("subject", subject);
    }

    const { data, error } = await query.order("last_activity_at", { ascending: false });

    if (error) {
      console.error("Supabase getStudentProgress error:", error);
      return [];
    }
    return data as StudentProgressRow[];
  }

  async upsertStudentProgress(userId: string, data: StudentProgressInsert): Promise<StudentProgressRow> {
    const now = new Date().toISOString();
    const { data: inserted, error } = await supabaseBrowser
      .from("student_progress")
      .upsert({
        ...data,
        started_at: data.started_at ?? now,
        last_activity_at: now,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase upsertStudentProgress error:", error);
      return {} as StudentProgressRow;
    }
    return inserted as StudentProgressRow;
  }

  async updateStudentProgressProgress(userId: string, subject: string, progress: number): Promise<StudentProgressRow> {
    const now = new Date().toISOString();
    const { data, error } = await supabaseBrowser
      .from("student_progress")
      .update({ progress_percentage: progress, last_activity_at: now })
      .eq("user_id", userId)
      .eq("subject", subject)
      .select()
      .single();

    if (error) {
      console.error("Supabase updateStudentProgressProgress error:", error);
      return {} as StudentProgressRow;
    }
    return data as StudentProgressRow;
  }

  // Learning activities operations
  async getLearningActivities(userId: string, filters?: {
    type?: string;
    subject?: string;
    universe?: string;
    completed?: boolean;
  }): Promise<LearningActivityRow[]> {
    let query = supabaseBrowser.from("learning_activities").select("*").eq("user_id", userId);

    if (filters?.type) {
      query = query.eq("type", filters.type);
    }
    if (filters?.subject) {
      query = query.eq("subject", filters.subject);
    }
    if (filters?.universe) {
      query = query.eq("universe", filters.universe);
    }
    if (filters?.completed !== undefined) {
      query = query.eq("completed", filters.completed);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase getLearningActivities error:", error);
      return [];
    }
    return data as LearningActivityRow[];
  }

  async createLearningActivity(userId: string, data: LearningActivityInsert): Promise<LearningActivityRow> {
    const { data: inserted, error } = await supabaseBrowser
      .from("learning_activities")
      .insert({
        user_id: userId,
        type: data.type,
        title: data.title,
        description: data.description,
        subject: data.subject,
        universe: data.universe,
        difficulty: data.difficulty,
        estimated_duration_minutes: data.estimated_duration_minutes,
        completed: data.completed,
        xp_earned: data.xp_earned,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase createLearningActivity error:", error);
      return {} as LearningActivityRow;
    }
    return inserted as LearningActivityRow;
  }

  // Subjects selected operations
  async getSelectedSubjects(userId: string): Promise<SubjectsSelectedRow[]> {
    const { data, error } = await supabaseBrowser
      .from("subjects_selected")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase getSelectedSubjects error:", error);
      return [];
    }
    return data as SubjectsSelectedRow[];
  }

  async addSelectedSubject(userId: string, subject: string, universe: string): Promise<SubjectsSelectedRow> {
    const { data, error } = await supabaseBrowser
      .from("subjects_selected")
      .insert({ user_id: userId, subject, universe, selected_at: new Date().toISOString() })
      .select()
      .single();

    if (error) {
      console.error("Supabase addSelectedSubject error:", error);
      return {} as SubjectsSelectedRow;
    }
    return data as SubjectsSelectedRow;
  }

  async removeSelectedSubject(userId: string, subject: string): Promise<void> {
    const { error } = await supabaseBrowser
      .from("subjects_selected")
      .delete()
      .eq("user_id", userId)
      .eq("subject", subject);

    if (error) {
      console.error("Supabase removeSelectedSubject error:", error);
    }
  }

  // Assessment results operations
  async getAssessmentResult(userId: string): Promise<AssessmentResultRow | null> {
    const { data, error } = await supabaseBrowser
      .from("assessment_results")
      .select("*")
      .eq("user_id", userId)
      .order("taken_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error("Supabase getAssessmentResult error:", error);
      return null;
    }
    return data as AssessmentResultRow;
  }

  async upsertAssessmentResult(userId: string, data: AssessmentResultInsert): Promise<AssessmentResultRow> {
    const percentage = Math.round((data.score / data.total) * 100);
    const now = new Date().toISOString();

    const { data: inserted, error } = await supabaseBrowser
      .from("assessment_results")
      .upsert({
        user_id: userId,
        score: data.score,
        total: data.total,
        percentage,
        subject_accuracies: data.subject_accuracies ?? "{}",
        topic_gaps: data.topic_gaps ?? "[]",
        taken_at: data.taken_at ?? now,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase upsertAssessmentResult error:", error);
      return {} as AssessmentResultRow;
    }
    return inserted as AssessmentResultRow;
  }

  // Achievements operations
  async getAchievements(userId: string): Promise<AchievementRow[]> {
    const { data, error } = await supabaseBrowser
      .from("achievements")
      .select("*")
      .eq("user_id", userId)
      .order("unlocked_at", { ascending: false });

    if (error) {
      console.error("Supabase getAchievements error:", error);
      return [];
    }
    return data as AchievementRow[];
  }

  async unlockAchievement(userId: string, title: string, description?: string, universe?: string): Promise<AchievementRow> {
    const { data, error } = await supabaseBrowser
      .from("achievements")
      .upsert({
        user_id: userId,
        title,
        description,
        badge_name: title.toLowerCase().replace(/\s+/g, "-"),
        universe,
        unlocked_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase unlockAchievement error:", error);
      return {} as AchievementRow;
    }
    return data as AchievementRow;
  }

  // User streaks operations
  async getUserStreak(userId: string): Promise<UserStreakRow | null> {
    const { data, error } = await supabaseBrowser
      .from("user_streaks")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Supabase getUserStreak error:", error);
      return null;
    }
    return data as UserStreakRow;
  }

  async updateUserStreak(userId: string, currentStreak: number, highestStreak: number, lastActivityAt: string): Promise<UserStreakRow> {
    const { data, error } = await supabaseBrowser
      .from("user_streaks")
      .upsert({
        user_id: userId,
        current_streak: currentStreak,
        highest_streak: highestStreak,
        last_activity_at: lastActivityAt,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase updateUserStreak error:", error);
      return {} as UserStreakRow;
    }
    return data as UserStreakRow;
  }
}