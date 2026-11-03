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
 * Mock Repository - provides typed mock data for development.
 * Used when Supabase is not available or during development.
 * Does NOT connect to any backend - purely in-memory.
 */
export class MockRepository implements IRepository {
  private profilesMap: Map<string, ProfileRow> = new Map();
  private studentProgressMap: Map<string, StudentProgressRow[]> = new Map();
  private learningActivitiesMap: Map<string, LearningActivityRow[]> = new Map();
  private subjectsSelectedMap: Map<string, SubjectsSelectedRow[]> = new Map();
  private assessmentResultsMap: Map<string, AssessmentResultRow | null> = new Map();
  private achievementsMap: Map<string, AchievementRow[]> = new Map();
  private userStreaksMap: Map<string, UserStreakRow | null> = new Map();

  constructor() {
    // Initialize with sample mock data matching Phase 05 profiles
    const sampleProfiles: ProfileRow[] = [
      {
        id: "student-1",
        full_name: "Diya Sharma",
        requested_role: "student",
        account_role: "student",
        account_status: "active",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-11-02T08:30:00Z",
        current_class: "3",
        current_universe: "junior",
        board: "CBSE",
        total_xp: 2450,
        current_level: 6,
        coins: 345,
        learning_streak: 12,
        highest_streak: 28,
      },
      {
        id: "student-2",
        full_name: "Aisha Khan",
        requested_role: "student",
        account_role: "student",
        account_status: "active",
        created_at: "2024-02-20T14:30:00Z",
        updated_at: "2024-11-01T16:45:00Z",
        current_class: "7",
        current_universe: "nexus",
        board: "CBSE",
        total_xp: 1890,
        current_level: 4,
        coins: 215,
        learning_streak: 5,
        highest_streak: 18,
      },
      {
        id: "student-3",
        full_name: "Emma Williams",
        requested_role: "student",
        account_role: "student",
        account_status: "active",
        created_at: "2024-01-10T09:00:00Z",
        updated_at: "2024-11-02T10:15:00Z",
        current_class: "11",
        current_universe: "ascend",
        board: "CBSE",
        stream: "science",
        total_xp: 8920,
        current_level: 15,
        coins: 950,
        learning_streak: 20,
        highest_streak: 45,
      },
    ];

    for (const profile of sampleProfiles) {
      this.profilesMap.set(profile.id, profile);
    }

    // Initialize student progress mock data
    const sampleProgress: StudentProgressRow[] = [
      { id: "sp-1", user_id: "student-1", subject: "Mathematics", topic: "Fractions", completed: true, started_at: "2024-01-15T10:00:00Z", completed_at: "2024-01-15T10:45:00Z", time_spent_minutes: 45, progress_percentage: 80, last_activity_at: "2024-11-02T08:30:00Z" },
      { id: "sp-2", user_id: "student-1", subject: "EVS", topic: "Food chains", completed: true, started_at: "2024-01-15T10:50:00Z", completed_at: "2024-01-15T11:10:00Z", time_spent_minutes: 20, progress_percentage: 75, last_activity_at: "2024-11-02T08:30:00Z" },
      { id: "sp-3", user_id: "student-2", subject: "Mathematics", topic: "Algebra", completed: false, started_at: "2024-02-20T14:30:00Z", completed_at: null, time_spent_minutes: 15, progress_percentage: 30, last_activity_at: "2024-11-01T16:45:00Z" },
      { id: "sp-4", user_id: "student-2", subject: "Science", topic: "Cells", completed: true, started_at: "2024-02-21T09:00:00Z", completed_at: "2024-02-21T09:50:00Z", time_spent_minutes: 50, progress_percentage: 90, last_activity_at: "2024-11-01T16:45:00Z" },
      { id: "sp-5", user_id: "student-3", subject: "Physics", topic: "Mechanics", completed: true, started_at: "2024-01-10T09:00:00Z", completed_at: "2024-01-10T10:00:00Z", time_spent_minutes: 60, progress_percentage: 85, last_activity_at: "2024-11-02T10:15:00Z" },
    ];

    for (const progress of sampleProgress) {
      const key = `${progress.user_id}:${progress.subject}`;
      if (!this.studentProgressMap.has(key)) {
        this.studentProgressMap.set(key, []);
      }
      this.studentProgressMap.get(key)!.push(progress);
    }
  }

  // Profile operations
  async getProfile(userId: string): Promise<ProfileRow | null> {
    return this.profilesMap.get(userId) || null;
  }

  async updateProfile(userId: string, data: Partial<ProfileUpdate>): Promise<ProfileRow | null> {
    const existing = this.profilesMap.get(userId);
    if (!existing) return null;

    const updated: ProfileRow = {
      ...existing,
      ...data,
      updated_at: new Date().toISOString(),
    };

    this.profilesMap.set(userId, updated);
    return updated;
  }

  async createProfile(userId: string, data: ProfileInsert): Promise<ProfileRow | null> {
    const newProfile: ProfileRow = {
      id: userId,
      full_name: data.full_name ?? null,
      requested_role: data.requested_role ?? null,
      account_role: data.account_role ?? "pending_teacher",
      account_status: data.account_status ?? "pending_verification",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      current_class: data.current_class ?? null,
      current_universe: data.current_universe ?? null,
      board: data.board ?? null,
      total_xp: data.total_xp ?? 0,
      current_level: data.current_level ?? 1,
      coins: data.coins ?? 0,
      learning_streak: data.learning_streak ?? 0,
      highest_streak: data.highest_streak ?? 0,
    };

    this.profilesMap.set(userId, newProfile);
    return newProfile;
  }

  // Student progress operations
  async getStudentProgress(userId: string, subject?: string): Promise<StudentProgressRow[]> {
    const allProgress: StudentProgressRow[] = [];

    for (const [key, progressList] of this.studentProgressMap) {
      const [pid] = key.split(":");
      if (pid === userId) {
        if (!subject || progressList.some(p => p.subject === subject)) {
          allProgress.push(...progressList);
        }
      }
    }

    return allProgress;
  }

  async upsertStudentProgress(userId: string, data: StudentProgressInsert): Promise<StudentProgressRow> {
    const key = `${userId}:${data.subject}`;
    let progressList = this.studentProgressMap.get(key) || [];

    const existing = progressList.find(p => p.topic === data.topic);
    const now = new Date().toISOString();

    if (existing) {
      const updated = {
        ...existing,
        completed: data.completed ?? existing.completed,
        completed_at: data.completed_at ?? existing.completed_at,
        time_spent_minutes: data.time_spent_minutes ?? existing.time_spent_minutes,
        progress_percentage: data.progress_percentage ?? existing.progress_percentage,
        last_activity_at: now,
      };
      progressList = progressList.map(p => p.topic === data.topic ? updated : p);
    } else {
      const newProgress: StudentProgressRow = {
        id: `sp-${Date.now()}`,
        user_id: userId,
        subject: data.subject,
        topic: data.topic,
        completed: data.completed ?? false,
        started_at: data.started_at ?? now,
        completed_at: data.completed_at ?? null,
        time_spent_minutes: data.time_spent_minutes ?? 0,
        progress_percentage: data.progress_percentage ?? 0,
        last_activity_at: now,
      };
      progressList = [...progressList, newProgress];
    }

    this.studentProgressMap.set(key, progressList);
    return progressList[progressList.length - 1];
  }

  async updateStudentProgressProgress(userId: string, subject: string, progress: number): Promise<StudentProgressRow> {
    const key = `${userId}:${subject}`;
    const progressList = this.studentProgressMap.get(key) || [];

    const existing = progressList.find(p => p.subject === subject);
    if (!existing) return {} as StudentProgressRow;

    const updated = {
      ...existing,
      progress_percentage: progress,
      last_activity_at: new Date().toISOString(),
    };

    const index = progressList.findIndex(p => p.subject === subject);
    if (index > -1) {
      progressList[index] = updated;
    }

    this.studentProgressMap.set(key, progressList);
    return updated;
  }

  // Learning activities operations
  async getLearningActivities(userId: string, filters?: {
    type?: string;
    subject?: string;
    universe?: string;
    completed?: boolean;
  }): Promise<LearningActivityRow[]> {
    const allActivities: LearningActivityRow[] = [];

    for (const activities of this.learningActivitiesMap.values()) {
      for (const activity of activities) {
        if (activity.user_id === userId) {
          let match = true;

          if (filters?.type && activity.type !== filters.type) match = false;
          if (filters?.subject && activity.subject !== filters.subject) match = false;
          if (filters?.universe && activity.universe !== filters.universe) match = false;
          if (filters?.completed !== undefined && activity.completed !== filters.completed) match = false;

          if (match) {
            allActivities.push(activity);
          }
        }
      }
    }

    // Sort by created_at descending
    return allActivities.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  async createLearningActivity(userId: string, data: LearningActivityInsert): Promise<LearningActivityRow> {
    const newActivity: LearningActivityRow = {
      id: `la-${Date.now()}`,
      user_id: userId,
      type: data.type,
      title: data.title,
      description: data.description ?? null,
      subject: data.subject,
      universe: data.universe,
      difficulty: data.difficulty ?? "medium",
      estimated_duration_minutes: data.estimated_duration_minutes,
      completed: data.completed ?? false,
      started_at: data.started_at ?? new Date().toISOString(),
      completed_at: data.completed_at ?? null,
      xp_earned: data.xp_earned ?? 0,
      created_at: new Date().toISOString(),
    };

    if (!this.learningActivitiesMap.has(userId)) {
      this.learningActivitiesMap.set(userId, []);
    }
    this.learningActivitiesMap.get(userId)!.push(newActivity);
    return newActivity;
  }

  // Subjects selected operations
  async getSelectedSubjects(userId: string): Promise<SubjectsSelectedRow[]> {
    const allSubjects: SubjectsSelectedRow[] = [];

    for (const [key, subjectsList] of this.subjectsSelectedMap) {
      const [pid] = key.split(":");
      if (pid === userId) {
        allSubjects.push(...subjectsList);
      }
    }

    return allSubjects;
  }

  async addSelectedSubject(userId: string, subject: string, universe: string): Promise<SubjectsSelectedRow> {
    const key = `${userId}:subjects`;
    let subjectsList = this.subjectsSelectedMap.get(key) || [];

    const existing = subjectsList.find(s => s.subject === subject);
    const now = new Date().toISOString();

    if (existing) {
      const updated = {
        ...existing,
        selected_at: existing.selected_at ?? now,
      };
      subjectsList = subjectsList.map(s => s.subject === subject ? updated : s);
    } else {
      const newSubject: SubjectsSelectedRow = {
        id: `ss-${Date.now()}`,
        user_id: userId,
        subject: subject,
        selected_at: now,
        universe: universe,
      };
      subjectsList = [...subjectsList, newSubject];
    }

    this.subjectsSelectedMap.set(key, subjectsList);
    return subjectsList[subjectsList.length - 1];
  }

  async removeSelectedSubject(userId: string, subject: string): Promise<void> {
    const key = `${userId}:subjects`;
    const subjectsList = this.subjectsSelectedMap.get(key) || [];

    const filtered = subjectsList.filter(s => s.subject !== subject);
    this.subjectsSelectedMap.set(key, filtered);
  }

  // Assessment results operations
  async getAssessmentResult(userId: string): Promise<AssessmentResultRow | null> {
    return this.assessmentResultsMap.get(userId) ?? null;
  }

  async upsertAssessmentResult(userId: string, data: AssessmentResultInsert): Promise<AssessmentResultRow> {
    const now = new Date().toISOString();
    const percentage = Math.round((data.score / data.total) * 100);

    const newResult: AssessmentResultRow = {
      id: `ar-${Date.now()}`,
      user_id: userId,
      score: data.score,
      total: data.total,
      percentage: percentage,
      subject_accuracies: data.subject_accuracies ?? "{}",
      topic_gaps: data.topic_gaps ?? "[]",
      taken_at: data.taken_at ?? now,
    };

    this.assessmentResultsMap.set(userId, newResult);
    return newResult;
  }

  // Achievements operations
  async getAchievements(userId: string): Promise<AchievementRow[]> {
    return this.achievementsMap.get(userId) || [];
  }

  async unlockAchievement(userId: string, title: string, description?: string, universe?: string): Promise<AchievementRow> {
    const key = `${userId}:achievements`;
    let achievementsList = this.achievementsMap.get(key) || [];

    const existing = achievementsList.find(a => a.title === title);
    const now = new Date().toISOString();

    if (existing) {
      const updated = {
        ...existing,
        unlocked_at: now,
      };
      achievementsList = achievementsList.map(a => a.title === title ? updated : a);
    } else {
      const newAchievement: AchievementRow = {
        id: `ach-${Date.now()}`,
        user_id: userId,
        title: title,
        description: description ?? null,
        badge_name: title.toLowerCase().replace(/\s+/g, "-"),
        unlocked_at: now,
        universe: universe ?? null,
      };
      achievementsList = [...achievementsList, newAchievement];
    }

    this.achievementsMap.set(key, achievementsList);
    return achievementsList[achievementsList.length - 1];
  }

  // User streaks operations
  async getUserStreak(userId: string): Promise<UserStreakRow | null> {
    return this.userStreaksMap.get(userId) ?? null;
  }

  async updateUserStreak(userId: string, currentStreak: number, highestStreak: number, lastActivityAt: string): Promise<UserStreakRow> {
    const key = `${userId}:streak`;
    const newStreak: UserStreakRow = {
      user_id: userId,
      current_streak: currentStreak,
      highest_streak: highestStreak,
      last_activity_at: lastActivityAt,
      updated_at: new Date().toISOString(),
    };

    this.userStreaksMap.set(key, newStreak);
    return newStreak;
  }
}