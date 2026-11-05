export type TeacherRole = 'pending' | 'approved' | 'administrator';

export interface TeacherProfile {
  id: string;
  fullName: string;
  email: string;
  institution: string;
  teachingSubjects: readonly string[];
  assignedClasses: readonly string[];
  currentAcademicYear: string;
  accountRole: TeacherRole;
  accountStatus: 'active' | 'pending_verification' | 'suspended';
  avatar?: string;
}

export interface ClassroomInfo {
  id: string;
  name: string;
  academicClass: string;
  section: string;
  subject: string;
  academicYear: string;
  studentCount: number;
  assignedTeacher: string;
  progressPercentage: number;
}

export interface StudentSummary {
  id: string;
  fullName: string;
  currentClass: string;
  avatar: string;
  learningProgress: number;
  recentAssessmentScore?: number;
  attentionStatus: 'on-track' | 'needs-practice' | 'requires-review' | 'no-activity';
}

export interface AssessmentQuestion {
  id: string;
  questionText: string;
  questionType: 'multiple_choice' | 'multiple_select' | 'true_false' | 'fill_blank' | 'numerical' | 'short_answer' | 'long_answer' | 'match_pairs' | 'case_study';
  correctAnswers: readonly string[];
  explanation: string;
  marks: number;
  options?: readonly { id: string; text: string; selected?: boolean }[];
}

export interface AssessmentFormData {
  title: string;
  description: string;
  classroomId: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  selectedChapters: readonly string[];
  questions: AssessmentQuestion[];
}

export interface AssignmentFormData {
  title: string;
  description: string;
  classroomId: string;
  subject: string;
  dueDate: string;
  instructions: string;
  attachedContent: string;
}

export interface InterventionRecommendation {
  id: string;
  studentId: string;
  studentName: string;
  issue: string;
  evidence: string;
  suggestedAction: string;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt?: string;
}

export interface ReportData {
  id: string;
  title: string;
  type: 'classroom' | 'student' | 'subject' | 'assessment' | 'assignment' | 'intervention';
  filteredBy: 'class' | 'subject' | 'date-range';
  preview: string;
  generatedAt: string;
}

export interface Notification {
  id: string;
  type: 'assessment_submitted' | 'assignment_due' | 'student_review' | 'classroom_completed';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface TeacherDashboardOverview {
  totalAssignedStudents: number;
  activeClassrooms: number;
  assessmentsCreated: number;
  assignmentsPendingReview: number;
  studentsRequiringAttention: number;
}