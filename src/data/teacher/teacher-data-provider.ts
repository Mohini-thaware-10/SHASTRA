import type {
  TeacherProfile,
  ClassroomInfo,
  StudentSummary,
  AssessmentFormData,
  AssignmentFormData,
  InterventionRecommendation,
  ReportData,
  Notification,
  TeacherDashboardOverview,
} from "@/types/teacher";

/** Mock teacher profiles covering different subjects and classes */
export const mockTeacherProfiles: TeacherProfile[] = [
  {
    id: "teacher-1",
    fullName: "Mrs. Anita Sharma",
    email: "anita.sharma@shastra.edu",
    institution: "Springfields Public School",
    teachingSubjects: ["Physics", "Chemistry"],
    assignedClasses: ["11", "12"],
    currentAcademicYear: "2024-2025",
    accountRole: "approved",
    accountStatus: "active",
    avatar: "/avatars/teacher1.png",
  },
  {
    id: "teacher-2",
    fullName: "Mr. Rajesh Patel",
    email: "rajesh.patel@shastra.edu",
    institution: "Springfields Public School",
    teachingSubjects: ["Accountancy", "Business Studies"],
    assignedClasses: ["11", "12"],
    currentAcademicYear: "2024-2025",
    accountRole: "approved",
    accountStatus: "active",
    avatar: "/avatars/teacher2.png",
  },
  {
    id: "teacher-3",
    fullName: "Ms. Priya Singh",
    email: "priya.singh@shastra.edu",
    institution: "Springfields Public School",
    teachingSubjects: ["History", "Political Science"],
    assignedClasses: ["11", "12"],
    currentAcademicYear: "2024-2025",
    accountRole: "approved",
    accountStatus: "active",
    avatar: "/avatars/teacher3.png",
  },
  {
    id: "teacher-4",
    fullName: "Mrs. Kavya Reddy",
    email: "kavya.reddy@shastra.edu",
    institution: "Delhi International School",
    teachingSubjects: ["Mathematics", "Biology"],
    assignedClasses: ["11", "12"],
    currentAcademicYear: "2024-2025",
    accountRole: "approved",
    accountStatus: "active",
    avatar: "/avatars/teacher4.png",
  },
];

/** Mock classrooms assigned to teachers */
export const mockClassrooms: ClassroomInfo[] = [
  {
    id: "class-11-science",
    name: "Class 11 Science A",
    academicClass: "11",
    section: "A",
    subject: "Physics",
    academicYear: "2024-2025",
    studentCount: 42,
    assignedTeacher: "teacher-1",
    progressPercentage: 78,
  },
  {
    id: "class-11-commerce",
    name: "Class 11 Commerce A",
    academicClass: "11",
    section: "A",
    subject: "Accountancy",
    academicYear: "2024-2025",
    studentCount: 35,
    assignedTeacher: "teacher-2",
    progressPercentage: 65,
  },
  {
    id: "class-12-science",
    name: "Class 12 Science A",
    academicClass: "12",
    section: "A",
    subject: "Chemistry",
    academicYear: "2024-2025",
    studentCount: 38,
    assignedTeacher: "teacher-1",
    progressPercentage: 82,
  },
  {
    id: "class-12-commerce",
    name: "Class 12 Commerce A",
    academicClass: "12",
    section: "A",
    subject: "Business Studies",
    academicYear: "2024-2025",
    studentCount: 30,
    assignedTeacher: "teacher-2",
    progressPercentage: 71,
  },
  {
    id: "class-12-arts",
    name: "Class 12 Arts A",
    academicClass: "12",
    section: "A",
    subject: "History",
    academicYear: "2024-2025",
    studentCount: 28,
    assignedTeacher: "teacher-3",
    progressPercentage: 55,
  },
];

/** Mock students per classroom */
export const mockStudents: Record<string, StudentSummary[]> = {
  "class-11-science": [
    {
      id: "student-1",
      fullName: "Aarav Singh",
      currentClass: "11",
      avatar: "/avatars/student1.png",
      learningProgress: 85,
      recentAssessmentScore: 76,
      attentionStatus: "on-track",
    },
    {
      id: "student-2",
      fullName: "Vihaan Patel",
      currentClass: "11",
      avatar: "/avatars/student2.png",
      learningProgress: 62,
      recentAssessmentScore: 45,
      attentionStatus: "requires-review",
    },
    {
      id: "student-3",
      fullName: "Ananya Sharma",
      currentClass: "11",
      avatar: "/avatars/student3.png",
      learningProgress: 71,
      recentAssessmentScore: 68,
      attentionStatus: "on-track",
    },
    {
      id: "student-4",
      fullName: "Kiara Singh",
      currentClass: "11",
      avatar: "/avatars/student4.png",
      learningProgress: 48,
      recentAssessmentScore: 35,
      attentionStatus: "requires-review",
    },
    {
      id: "student-5",
      fullName: "Aditya Kumar",
      currentClass: "11",
      avatar: "/avatars/student5.png",
      learningProgress: 92,
      recentAssessmentScore: 89,
      attentionStatus: "on-track",
    },
  ],
  "class-11-commerce": [
    {
      id: "student-6",
      fullName: "Sneha Roy",
      currentClass: "11",
      avatar: "/avatars/student6.png",
      learningProgress: 73,
      recentAssessmentScore: 65,
      attentionStatus: "on-track",
    },
    {
      id: "student-7",
      fullName: "Arjun Mehta",
      currentClass: "11",
      avatar: "/avatars/student7.png",
      learningProgress: 58,
      recentAssessmentScore: 42,
      attentionStatus: "needs-practice",
    },
    {
      id: "student-8",
      fullName: "Riya Singh",
      currentClass: "11",
      avatar: "/avatars/student8.png",
      learningProgress: 88,
      recentAssessmentScore: 81,
      attentionStatus: "on-track",
    },
  ],
  "class-12-science": [
    {
      id: "student-9",
      fullName: "Pooja Menon",
      currentClass: "12",
      avatar: "/avatars/student9.png",
      learningProgress: 91,
      recentAssessmentScore: 85,
      attentionStatus: "on-track",
    },
    {
      id: "student-10",
      fullName: "Rohit Joshi",
      currentClass: "12",
      avatar: "/avatars/student10.png",
      learningProgress: 67,
      recentAssessmentScore: 52,
      attentionStatus: "requires-review",
    },
    {
      id: "student-11",
      fullName: "Simran Arora",
      currentClass: "12",
      avatar: "/avatars/student11.png",
      learningProgress: 79,
      recentAssessmentScore: 74,
      attentionStatus: "on-track",
    },
  ],
  "class-12-commerce": [
    {
      id: "student-12",
      fullName: "Manish Kohli",
      currentClass: "12",
      avatar: "/avatars/student12.png",
      learningProgress: 61,
      recentAssessmentScore: 55,
      attentionStatus: "needs-practice",
    },
    {
      id: "student-13",
      fullName: "Kavya Sharma",
      currentClass: "12",
      avatar: "/avatars/student13.png",
      learningProgress: 75,
      recentAssessmentScore: 68,
      attentionStatus: "on-track",
    },
    {
      id: "student-14",
      fullName: "Abhishek Singh",
      currentClass: "12",
      avatar: "/avatars/student14.png",
      learningProgress: 53,
      recentAssessmentScore: 41,
      attentionStatus: "requires-review",
    },
  ],
  "class-12-arts": [
    {
      id: "student-15",
      fullName: "Aditi Rao",
      currentClass: "12",
      avatar: "/avatars/student15.png",
      learningProgress: 82,
      recentAssessmentScore: 71,
      attentionStatus: "on-track",
    },
    {
      id: "student-16",
      fullName: "Vikram Singh",
      currentClass: "12",
      avatar: "/avatars/student16.png",
      learningProgress: 45,
      recentAssessmentScore: 38,
      attentionStatus: "requires-review",
    },
  ],
};

/** Get classroom info by ID */
export function getClassroomById(classroomId: string): ClassroomInfo | undefined {
  return mockClassrooms.find((c) => c.id === classroomId);
}

/** Get students for a classroom */
export function getStudentsForClassroom(classroomId: string): StudentSummary[] {
  return mockStudents[classroomId] || [];
}

/** Get teacher by ID */
export function getTeacherById(teacherId: string): TeacherProfile | undefined {
  return mockTeacherProfiles.find((t) => t.id === teacherId);
}

/** Get teacher's classrooms */
export function getTeacherClassrooms(teacherId: string): ClassroomInfo[] {
  return mockClassrooms.filter((c) => c.assignedTeacher === teacherId);
}

/** Get dashboard overview for a teacher */
export function getTeacherDashboardOverview(teacherId: string): TeacherDashboardOverview {
  const teacherClassrooms = getTeacherClassrooms(teacherId);
  const allStudents = teacherClassrooms.flatMap(getStudentsForClassroom);
  const totalAssignedStudents = allStudents.length;
  const activeClassrooms = teacherClassrooms.length;
  const assessmentsCreated = 5; // prototype count
  const assignmentsPendingReview = 3; // prototype count
  const studentsRequiringAttention = allStudents.filter(
    (s) => s.attentionStatus !== "on-track"
  ).length;

  return {
    totalAssignedStudents,
    activeClassrooms,
    assessmentsCreated,
    assignmentsPendingReview,
    studentsRequiringAttention,
  };
}

/** Get interventions for a teacher */
export function getInterventionsForTeacher(teacherId: string): InterventionRecommendation[] {
  const teacherClassrooms = getTeacherClassrooms(teacherId);
  const allStudents = teacherClassrooms.flatMap(getStudentsForClassroom);

  const interventions: InterventionRecommendation[] = [];

  // Generate interventions based on student data
  allStudents.forEach((student, index) => {
    if (student.attentionStatus === "requires-review") {
      interventions.push({
        id: `intervention-${index}`,
        studentId: student.id,
        studentName: student.fullName,
        issue: "Repeated difficulty with assigned topics",
        evidence: `Learning progress at ${student.learningProgress}%, recent assessment score ${student.recentAssessmentScore || 0}%`,
        suggestedAction: "Review prerequisite concepts and assign guided practice",
        priority: "high",
        status: index % 3 === 0 ? "open" : index % 3 === 1 ? "in-progress" : "resolved",
        createdAt: new Date(Date.now() - index * 86400000).toISOString(),
        updatedAt: index % 3 === 0 ? undefined : new Date(Date.now() - index * 43200000).toISOString(),
      });
    }
    if (student.learningProgress < 50) {
      interventions.push({
        id: `intervention-${allStudents.length + index}`,
        studentId: student.id,
        studentName: student.fullName,
        issue: "Low performance in configured assessments",
        evidence: `Learning progress at ${student.learningProgress}%, assessment scores below passing threshold`,
        suggestedAction: "Assign remedial exercises and schedule parent-teacher meeting",
        priority: "medium",
        status: "open",
        createdAt: new Date(Date.now() - index * 86400000).toISOString(),
        updatedAt: undefined,
      });
    }
    if (student.attentionStatus === "no-activity") {
      interventions.push({
        id: `intervention-${allStudents.length * 2 + index}`,
        studentId: student.id,
        studentName: student.fullName,
        issue: "No recent learning activity",
        evidence: "Student has not accessed learning platform in over 2 weeks",
        suggestedAction: "Initiate parent contact and motivate student to resume learning",
        priority: "low",
        status: "open",
        createdAt: new Date(Date.now() - index * 86400000).toISOString(),
        updatedAt: undefined,
      });
    }
  });

  // Sort by priority (high first), then by creation date (newest first)
  return interventions.sort((a, b) => {
    const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/** Get notifications for a teacher */
export function getNotificationsForTeacher(teacherId: string): Notification[] {
  return [
    {
      id: "notif-1",
      type: "assignment_due",
      title: "Assignment Due Tomorrow",
      message: "Class 11 Science A physics assignment due tomorrow",
      read: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "notif-2",
      type: "student_review",
      title: "Student Requires Review",
      message: "Ananya Sharma needs academic review",
      read: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "notif-3",
      type: "assessment_submitted",
      title: "Assessment Submitted",
      message: "Class 12 Science A chemistry assessment submitted",
      read: false,
      createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
  ];
}

/** Get assessments (prototype data) */
export function getAssessmentsForClassroom(classroomId: string): readonly AssessmentFormData[] {
  // Prototype assessments - returns mock data
  return [
    {
      id: "assess-1",
      title: "Quarterly Physics Exam",
      description: "End-of-term physics assessment for Class 11 Science",
      classroomId: "class-11-science",
      subject: "Physics",
      durationMinutes: 60,
      totalMarks: 80,
      selectedChapters: ["Mechanics", "Thermodynamics", "Electrostatics"],
      questions: [
        {
          id: "q1",
          questionText: "Derivation of equations of motion",
          questionType: "short_answer",
          correctAnswers: ["v = u + at", "s = ut + 1/2at²", "v² = u² + 2as"],
          explanation: "Derived from basic kinematic equations",
          marks: 8,
        },
        {
          id: "q2",
          questionText: "State and explain Kirchhoff's laws",
          questionType: "long_answer",
          correctAnswers: ["KCL: sum of currents at junction = 0", "KVL: sum of voltages around loop = 0"],
          explanation: "Fundamental laws for circuit analysis",
          marks: 10,
        },
      ],
    },
    {
      id: "assess-2",
      title: "Business Studies Unit Test",
      description: "Accountancy and Business Studies assessment for Class 11 Commerce",
      classroomId: "class-11-commerce",
      subject: "Accountancy",
      durationMinutes: 45,
      totalMarks: 40,
      selectedChapters: ["Financial Statements", "Company Accounts"],
      questions: [
        {
          id: "q3",
          questionText: "Prepare a balance sheet",
          questionType: "long_answer",
          correctAnswers: ["Assets = Liabilities + Owner's Equity"],
          explanation: "Balance sheet fundamental equation",
          marks: 12,
        },
      ],
    },
  ];
}

/** Get assignments (prototype data) */
export function getAssignmentsForClassroom(classroomId: string): readonly AssignmentFormData[] {
  return [
    {
      id: "assign-1",
      title: "Physics Numerical Problems",
      description: "Solve 10 numerical problems from Mechanics chapter",
      classroomId: "class-11-science",
      subject: "Physics",
      dueDate: "2024-12-20",
      instructions: "Show all steps and formulae used",
      attachedContent: "Mechanics chapter - Newton's Laws",
    },
    {
      id: "assign-2",
      title: "Accountancy Practice",
      description: "Prepare journal entries for given transactions",
      classroomId: "class-11-commerce",
      subject: "Accountancy",
      dueDate: "2024-12-15",
      instructions: "Follow double-entry system",
      attachedContent: "Chapter 3 - Journal",
    },
  ];
}

/** Get lesson planner data */
export function getLessonPlannerData(): readonly {
  weeklyView: readonly WeeklyLessonPlan[];
  upcomingLessons: readonly UpcomingLesson[];
} {
  return {
    weeklyView: [
      {
        id: "plan-1",
        weekStarting: "2024-12-02",
        subject: "Physics",
        class: "11",
        chapter: "Mechanics",
        learningObjectives: ["Understand motion in a straight line", "Derive equations of motion", "Solve numerical problems"],
        lessonDuration: "5 sessions",
        teachingResources: ["Whiteboard", "Projector", "Numerical workbook"],
        activityPlanning: ["Law of inertia experiment", "Numerical problem-solving session", "Revision quiz"],
        completionStatus: 80,
      },
      {
        id: "plan-2",
        weekStarting: "2024-12-02",
        subject: "Chemistry",
        class: "11",
        chapter: "Chemical Bonding",
        learningObjectives: ["Understand ionic and covalent bonding", "Write chemical formulae", "Predict bonding types"],
        lessonDuration: "4 sessions",
        teachingResources: ["Molecular model set", "Diagrams", "Interactive simulation"],
        activityPlanning: ["Bond type classification", "Formula writing practice", "Simulation lab"],
        completionStatus: 65,
      },
    ],
    upcomingLessons: [
      {
        id: "up-1",
        subject: "Physics",
        class: "11",
        chapter: "Waves",
        title: "Wave Properties and Equations",
        scheduledDate: "2024-12-05",
      },
      {
        id: "up-2",
        subject: "Chemistry",
        class: "11",
        chapter: "Thermodynamics",
        title: "Enthalpy and Entropy",
        scheduledDate: "2024-12-07",
      },
    ],
  };
}

/** Get intervention centre data */
export function getInterventionCentreData(): readonly InterventionRecommendation[] {
  return [
    {
      id: "int-1",
      studentId: "student-2",
      studentName: "Vihaan Patel",
      issue: "Repeated difficulty with assigned topics",
      evidence: "Learning progress at 62%, recent assessment score 45%",
      suggestedAction: "Review prerequisite concepts and assign guided practice",
      priority: "high",
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: undefined,
    },
    {
      id: "int-2",
      studentId: "student-7",
      studentName: "Arjun Mehta",
      issue: "Low performance in configured assessments",
      evidence: "Learning progress at 58%, assessment scores below passing threshold",
      suggestedAction: "Assign remedial exercises and schedule parent-teacher meeting",
      priority: "medium",
      status: "in-progress",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: "int-3",
      studentId: "student-16",
      studentName: "Vikram Singh",
      issue: "No recent learning activity",
      evidence: "Student has not accessed learning platform in over 2 weeks",
      suggestedAction: "Initiate parent contact and motivate student to resume learning",
      priority: "low",
      status: "open",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: undefined,
    },
  ];
}

/** Get reports (prototype data) */
export function getReportsData(): readonly ReportData[] {
  return [
    {
      id: "report-1",
      title: "Class 11 Science A - Performance Report",
      type: "classroom",
      filteredBy: "class",
      preview: "Overall performance analysis for Class 11 Science A, Physics subject",
      generatedAt: new Date().toISOString(),
    },
    {
      id: "report-2",
      title: "Student Progress Report - Aarav Singh",
      type: "student",
      filteredBy: "class",
      preview: "Individual progress tracking for Aarav Singh, Class 11 Science",
      generatedAt: new Date().toISOString(),
    },
  ];
}