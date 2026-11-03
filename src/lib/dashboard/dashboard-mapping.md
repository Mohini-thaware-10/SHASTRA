# Phase 06: Dashboard-to-Database Mapping Document

This document maps every Phase 05 dashboard metric, card, chart, table, and activity section to its required backend data source. For each item, the required database entity, fields, query/filter conditions, authorization requirements, loading state, empty state, and error state are documented.

## Mapping Overview

| Dashboard Component | Required Entity | Key Fields | Authorization | Loading | Empty State | Error State |
|---|---|---|---|---|---|---|
| WelcomeSection | profiles (current user) | full_name, current_universe, current_class | authenticated (own profile) | spinner | "No profile found" | error boundary |
| DailyGoalCard | user_streaks + profiles | learning_streak, current_level, total_xp | authenticated (own profile) | spinner | "Start your first session" | toast error |
| ContinueLearning | learning_activities | type, title, subject, universe, difficulty, xp_earned | authenticated (own activities) | skeleton cards | "No learning activity yet" | toast error |
| SubjectOverview | subjects_selected + student_progress | subject, topicsCompleted/totalTopics, progress_percentage | authenticated (own subjects/progress) | skeleton cards | "No subjects selected" | toast error |
| LearningJourney | student_progress + assessment_results | subject, progress_percentage, percentage | authenticated (own progress) | skeleton nodes | "Start Learning" | toast error |
| GamificationSummary | profiles + user_streaks | total_xp, current_level, coins, current_streak, highest_streak | authenticated (own profile/streak) | skeleton badges | "No data yet" | toast error |
| RecommendedQuests | assessment_results + learning_activities | score, percentage, subject, topic, difficulty, xp_earned | authenticated (own assessment) | skeleton cards | "Complete assessment for recommendations" | toast error |
| RevisionCentre | learning_activities | type, title, subject, description, timestamp, xp_earned | authenticated (own activities) | skeleton events | "Start a revision session" | toast error |
| UpcomingAssessments | assessment_results | score, total, percentage, subject_accuracies, topic_gaps | authenticated (own assessment) | skeleton card | "No upcoming assessments" | toast error |
| RecentActivity | learning_activities | type, title, subject, description, started_at, xp_earned | authenticated (own activities) | skeleton timeline | "No recent activity" | toast error |
| AITutorEntry | N/A (placeholder only) | N/A | N/A | spinner | "AI Tutor placeholder" | N/A |

## Entity Mappings Detail

### 1. WelcomeSection
- **Entity**: `profiles`
- **Required Fields**: `full_name`, `current_universe`, `current_class`
- **Query**: `SELECT * FROM profiles WHERE id = auth.uid()`
- **Authorization**: RLS policy: "Users can read own profile" (auth.uid() = id)
- **Loading State**: Spinner overlay while fetching profile
- **Empty State**: "Welcome, Student!" (fallback if no profile exists)
- **Error State**: Toast "Failed to load profile. Please try again."

### 2. DailyGoalCard
- **Entity**: `profiles` (total_xp, current_level, learning_streak), `user_streaks` (current_streak, highest_streak)
- **Required Fields**: `total_xp`, `current_level`, `coins`, `learning_streak`, `highest_streak`
- **Query**: 
  - `SELECT * FROM profiles WHERE id = auth.uid()`
  - `SELECT * FROM user_streaks WHERE user_id = auth.uid()`
- **Authorization**: RLS: authenticated own profile/streak
- **Calculations**:
  - Daily target: derived from level + universe (see calculations.ts)
  - Completed minutes: `(streak % 7) * 3 + level * 2`
  - Remaining: `target - completed`
- **Loading State**: Spinner over progress ring
- **Empty State**: "Goal achieved! Start a new session." (when progress >= 100%)
- **Error State**: Toast "Failed to load goal data."

### 3. ContinueLearning
- **Entity**: `learning_activities`
- **Required Fields**: `type`, `title`, `subject`, `universe`, `difficulty`, `estimated_duration_minutes`, `xp_earned`, `completed`
- **Query**: 
  - `SELECT * FROM learning_activities WHERE user_id = auth.uid() ORDER BY created_at DESC LIMIT 4`
  - Filter: `completed = false` for unlockable, `completed = true` for history
- **Authorization**: RLS: authenticated own activities
- **Filters**:
  - Active: `completed = false`
  - Completed: `completed = true`
- **Loading State**: Skeleton cards grid
- **Empty State**: "No learning activity yet. Start your first lesson to begin."
- **Error State**: Toast "Failed to load learning activities."

### 4. SubjectOverview
- **Entity**: `subjects_selected` + `student_progress`
- **Required Fields**: 
  - `subjects_selected.subject`, `subjects_selected.universe`
  - `student_progress.subject`, `student_progress.progress_percentage`, `student_progress.completed`, `student_progress.time_spent_minutes`
- **Query**: 
  - `SELECT * FROM subjects_selected WHERE user_id = auth.uid()`
  - `SELECT * FROM student_progress WHERE user_id = auth.uid()` (optionally filtered by subject)
- **Authorization**: RLS: authenticated own selected subjects + progress
- **Mastery Classification**:
  - `mastering`: progress >= 80%
  - `developing`: progress >= 50%
  - `building`: progress < 50%
- **Loading State**: Skeleton cards grid
- **Empty State**: "No subjects selected. Add subjects in your learning preferences."
- **Error State**: Toast "Failed to load subject data."

### 5. LearningJourney
- **Entity**: `student_progress` + `assessment_results`
- **Required Fields**: 
  - `student_progress.subject`, `student_progress.progress_percentage`, `student_progress.completed`
  - `assessment_results.percentage`, `assessment_results.topic_gaps`
- **Query**: 
  - `SELECT * FROM student_progress WHERE user_id = auth.uid() ORDER BY subject`
  - `SELECT * FROM assessment_results WHERE user_id = auth.uid() ORDER BY taken_at DESC LIMIT 1`
- **Authorization**: RLS: authenticated own progress + assessment
- **Unlock Conditions** (deterministic, class-based):
  - Junior: class >= threshold for each stage
  - Nexus: class >= threshold for each stage
  - Ascend: stream-aware, class >= threshold for each stage
- **Loading State**: Skeleton nodes
- **Empty State**: "Start Learning" placeholder node
- **Error State**: Toast "Failed to load learning journey."

### 6. GamificationSummary
- **Entity**: `profiles` (total_xp, current_level, coins) + `user_streaks` (current_streak, highest_streak)
- **Required Fields**: 
  - `profiles.total_xp`, `profiles.current_level`, `profiles.coins`
  - `user_streaks.current_streak`, `user_streaks.highest_streak`
- **Query**: 
  - `SELECT total_xp, current_level, coins FROM profiles WHERE id = auth.uid()`
  - `SELECT current_streak, highest_streak FROM user_streaks WHERE user_id = auth.uid()`
- **Authorization**: RLS: authenticated own profile + streak
- **Calculations**:
  - XP to level: `floor(sqrt(total_xp / 100)) + 1`
  - Coins: `level * 10 + learning_streak` (derived)
  - Streak status: `current >= 7 ? "On a roll!" : current >= 3 ? "Good start!" : "Keep going"`
- **Loading State**: Skeleton badges
- **Empty State**: "No data yet. Complete your first activity."
- **Error State**: Toast "Failed to load progress data."

### 7. RecommendedQuests
- **Entity**: `assessment_results` + `learning_activities`
- **Required Fields**: 
  - `assessment_results.score`, `assessment_results.percentage`, `assessment_results.topic_gaps` (JSON)
  - `learning_activities.type`, `learning_activities.title`, `learning_activities.subject`, `learning_activities.topic`, `learning_activities.difficulty`, `learning_activities.xp_earned`
- **Query**: 
  - `SELECT * FROM assessment_results WHERE user_id = auth.uid() ORDER BY taken_at DESC LIMIT 1`
  - `SELECT * FROM learning_activities WHERE user_id = auth.uid() AND completed = false ORDER BY created_at DESC LIMIT 3`
- **Authorization**: RLS: authenticated own assessment + unlocked activities
- **Recommendation Logic**:
  - If `percentage < 50`: fundamentals in weak subjects
  - If `percentage < 70`: algebra practice + science concepts
  - If `percentage < 85`: advanced calculus + extension opportunities
  - If `percentage >= 85`: maintain excellence + advanced topics
- **Has Assessment Data Flag**: 
  - `true`: recommendations grounded in actual performance
  - `false`: clearly labelled "Sample recommendations (no assessment data available)"
- **Loading State**: Skeleton cards grid
- **Empty State**: 
  - If no assessment: "Complete an assessment to get personalized recommendations"
  - If no unlocked activities: "All activities complete! Keep up the good work."
- **Error State**: Toast "Failed to load recommendations."

### 8. RevisionCentre
- **Entity**: `learning_activities`
- **Required Fields**: 
  - `type`, `title`, `subject`, `description`, `started_at`, `xp_earned`, `completed`
- **Query**: 
  - `SELECT * FROM learning_activities WHERE user_id = auth.uid() ORDER BY started_at DESC LIMIT 5`
  - Optionally filter by `type` for summary stats
- **Authorization**: RLS: authenticated own activities
- **Summary Stats** (derived from activities):
  - Sessions count: `COUNT(*)`
  - Topics count: `COUNT(DISTINCT subject)`
  - Days streak: derived from `last_activity_at` sequence
  - Mastery %: `AVG(progress_percentage)` where completed = true
- **Loading State**: Skeleton events list + summary cards
- **Empty State**: "Start a revision session to build your history."
- **Error State**: Toast "Failed to load revision history."

### 9. UpcomingAssessments
- **Entity**: `assessment_results`
- **Required Fields**: 
  - `score`, `total`, `percentage`, `subject_accuracies` (JSON), `topic_gaps` (JSON), `taken_at`
- **Query**: 
  - `SELECT * FROM assessment_results WHERE user_id = auth.uid() ORDER BY taken_at DESC LIMIT 1`
- **Authorization**: RLS: authenticated own assessment
- **Display**: 
  - Current score/percentage
  - Subject accuracies as tags
  - Topic gaps list
- **Empty State**: "No upcoming assessments. Complete a diagnostic assessment to see results here."
- **Error State**: Toast "Failed to load assessment results."

### 10. RecentActivity
- **Entity**: `learning_activities`
- **Required Fields**: 
  - `type`, `title`, `subject`, `description`, `started_at`, `xp_earned`, `completed`
- **Query**: 
  - `SELECT * FROM learning_activities WHERE user_id = auth.uid() ORDER BY started_at DESC LIMIT 5`
- **Authorization**: RLS: authenticated own activities
- **Event Format**: 
  - `{type}: {description} in {subject} • {timestamp}`
  - Visual indicator based on type + universe
- **Loading State**: Skeleton timeline entries
- **Empty State**: "No recent activity. Start your first lesson."
- **Error State**: Toast "Failed to load recent activity."

### 11. AITutorEntry
- **Entity**: N/A (frontend placeholder only)
- **Required Data**: None
- **Authorization**: N/A
- **Loading State**: Spinner during initial render
- **Empty State**: "SHATRA AI Tutor - placeholder. Connect backend for full functionality."
- **Error State**: N/A (UI placeholder only, no backend call)

## Authorization Summary

All dashboard components follow the same authorization pattern:

1. **Identify current user**: `auth.uid()` from Supabase Auth context
2. **Query own data**: `SELECT ... FROM <table> WHERE id = auth.uid() OR user_id = auth.uid()`
3. **RLS enforcement**: Supabase Row Level Security automatically filters by:
   - `profiles`: `auth.uid() = id` (own profile only)
   - `student_progress`: `user_id = auth.uid` (own progress only)
   - `learning_activities`: `user_id = auth.uid` (own activities only)
   - `subjects_selected`: `user_id = auth.uid` (own subjects only)
   - `assessment_results`: `user_id = auth.uid` (own assessments only)
   - `achievements`: `user_id = auth.uid` (own achievements only)
   - `user_streaks`: `user_id = auth.uid` (own streak only)

4. **Never**: 
   - Use service-role key in frontend
   - Bypass RLS policies
   - Query other users' data
   - Store secrets in client code

## Loading & Error State Patterns

### Common Loading State
- All data fetches show skeleton placeholders while loading
- Spinner overlay for individual card/section
- Disabled state on action buttons
- Global toast: "Loading data..."

### Common Error State
- Toast notification with error message
- "Failed to load data. Please try again."
- "Connectivity issue. Check your connection and try again."
- Fallback to mock data (development only)
- Error boundary prevents app crash

### Empty State Patterns
- Per-component specific messages (see table above)
- Never show "No data available" generically
- Always provide actionable next step
- Maintain visual consistency with universe theme

## Migration Path from Mock to Real Data

### Phase 05 (Current)
- All components use `MockDataProvider`
- Mock data structures match expected backend schemas
- Components work without network calls
- TypeScript types validated against mock data

### Phase 06 (Target)
1. Replace `useDataProvider()` calls with direct repository calls
2. Switch from `MockDataProvider` to `SupabaseDataProvider` when Supabase credentials are verified
3. No component code changes needed - same interface implemented by both providers
4. Run TypeScript/Eslint/build to verify compatibility
5. Gradually migrate dashboard pages one at a time

### Rollback Plan
- If Supabase queries fail, fallback to `MockDataProvider` automatically
- Provider switch is transparent to components
- All error states gracefully degrade to mock data
- RLS policies prevent data leakage between users

## Security Checklist

- [ ] Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code
- [ ] Never expose `SUPABASE_SECRET_KEY` in frontend code
- [ ] All queries use anon key via `supabaseBrowser` (RLS enforced)
- [ ] RLS policies verified for each table
- [ ] Auth flow: sign up → profile creation → email verification → protected routes
- [ ] Institution-level data isolation (future: `institutions` + `institution_users` tables)
- [ ] No hardcoded user IDs or bypass conditions
- [ ] Error messages don't leak database details
- [ ] HTTPS enforced for all Supabase connections
- [ ] CSP headers configured for supabase.js CDN