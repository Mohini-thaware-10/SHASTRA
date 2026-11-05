import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  StudentSummary,
  getStudentsForClassroom,
  getClassroomById,
  getTeacherClassrooms,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function StudentProfilePage() {
  const { studentId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get teacherId from query param
  const teacherId = searchParams.get("teacherId") || "teacher-1";

  // Verify teacher access
  const teacher = useDataProvider().getTeacherById(teacherId);

  if (!teacher) {
    return (
      <div className="p-8 text-center">
        <h2>Access Denied</h2>
        <p>Invalid or pending teacher account.</p>
        <button
          onClick={() => router.push("/sign-in?role=teacher")}
          className="mt-4 btn-primary"
        >
          Sign In as Teacher
        </button>
      </div>
    );
  }

  // Get teacher's classrooms and find the classroom for this student
  const classrooms = getTeacherClassrooms(teacherId);
  let classroomId = "";
  let studentName = studentId;
  let studentCurrentClass = "11";
  let studentProgress = 0;
  let studentAssessmentScore = 0;
  let studentAttentionStatus = "on-track";

  // Find the student in each classroom
  for (const cls of classrooms) {
    const students = getStudentsForClassroom(cls.id);
    const foundStudent = students.find((s) => s.id === studentId);
    if (foundStudent) {
      classroomId = cls.id;
      studentName = foundStudent.fullName;
      studentCurrentClass = foundStudent.currentClass;
      studentProgress = foundStudent.learningProgress;
      studentAssessmentScore = foundStudent.recentAssessmentScore || 0;
      studentAttentionStatus = foundStudent.attentionStatus;
      break;
    }
  }

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/students/[studentId]"
        />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">
            {/* Back button */}
            <div className="mb-4">
              <button
                onClick={() => router.push("/teacher/students")}
                className="text-primary hover-underline flex items-center gap-1"
              >
                ← Back to Students
              </button>
            </div>

            {/* Student Profile Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-1">
                {studentName}'s Profile
                </br>
                <span className="text-muted-foreground">Class {studentCurrentClass}</span>
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Learning Progress</p>
                  <div className="w-40 h-4 bg-accent-soft rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full rounded-md"
                      style={{ width: `${studentProgress}%` }}
                    /></div>
                  </div>
                  <p className="text-xs font-medium">{studentProgress}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Recent Assessment</p>
                  <p className="font-medium">{studentAssessmentScore}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                <div>
                  <p>Attention Status</p>
                  <span
                    className={cn(
                      "px-2 py-1 rounded",
                      studentAttentionStatus === "on-track"
                        ? "bg-accent-soft text-accent"
                        : studentAttentionStatus === "requires-review"
                          ? "bg-warning-soft text-warning"
                          : studentAttentionStatus === "needs-practice"
                            ? "bg-soft text-primary"
                            : "bg-soft text-muted-foreground"
                    )}
                  >
                    {studentAttentionStatus}
                  </span>
                </div>
                <div>
                  <p>Last Activity</p>
                  <span>2 days ago</span>
                </div>
              </div>

              {/* Enrolled Subjects */}
              <p className="text-sm text-muted-foreground mb-3">
                Enrolled Subjects:
                </br>
                {teacher.teachingSubjects.slice(0, 3).map((subject) => (
                  <span key={subject} className="px-2 py-1 rounded text-xs border-border border-border bg-accent-soft text-accent">
                    {subject}
                  </span>
                ))}
              </p>

              {/* Teacher Observations */}
              <p className="mt-4 pt-3 border-t border-border">
                <strong>Teacher Observations:</strong>
                </br>
                "Student shows strong understanding of core concepts but requires
                additional practice with advanced topics. Recommend guided practice
                and regular check-ins."
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-border">
              <button className="flex-1 btn-outline mr-2">
                Record Intervention
                </button>
              <button className="flex-1 btn-primary">
                Update Progress
                </button>
            </div>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}