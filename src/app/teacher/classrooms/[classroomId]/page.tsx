import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  ClassroomInfo,
  getClassroomById,
  getStudentsForClassroom,
  TeacherProfile,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function ClassroomDetailPage() {
  const { classroomId } = useParams();
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

  // Get classroom info
  const classroom = getClassroomById(classroomId);

  if (!classroom) {
    return (
      <div className="p-8 text-center">
        <h2>Classroom Not Found</h2>
        <p>The requested classroom could not be found.</p>
        <button
          onClick={() => router.push("/teacher/classrooms")}
          className="mt-4 btn-primary"
        >
          Back to Classrooms
        </button>
      </div>
    );
  }

  // Get students for this classroom
  const students = getStudentsForClassroom(classroomId);

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-screen">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/classrooms/[classroomId]"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <div className="mb-4">
              <button
                onClick={() => router.push("/teacher/classrooms")}
                className="text-primary hover-underline flex items-center gap-1"
              >
                ← Back to Classrooms
              </button>
            </div>

            {/* Classroom Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h1 className="font-bold text-2xl mb-1">
                {classroom.name}
              </h1>
              <p className="text-muted-foreground">
                {classroom.academicClass} {classroom.section} • {classroom.subject}
                </br>
                {classroom.academicYear}
                </br>
                {classroom.studentCount} students • Progress: {classroom.progressPercentage}%
                </br>
                Assigned Teacher: {teacher.fullName}
              </p>
            </div>

            {/* Students List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-xl p-4 shadow-sm border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={student.avatar}
                      alt={student.fullName}
                      width: 40
                      height: 40
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-sm">{student.fullName}</h4>
                      <p className="text-xs text-muted-foreground">Class {student.currentClass}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-accent-soft rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full rounded-md"
                        style={{ width: `${student.learningProgress}%` }}
                        bgAccent="accent"
                      /></div>
                    </div>
                    <span className="text-sm font-medium">
                      {student.learningProgress}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Attention: {student.attentionStatus}
                    </br>
                    Last Assessment: {student.recentAssessmentScore || 0}%
                    </br>
                    View Profile
                  </p>
                  <button
                    onClick={() => {
                      // Navigate to student profile
                      router.push(
                        `/teacher/students/${student.id}`
                      );
                    }}
                    className="mt-2 text-primary hover-underline text-xs block"
                  >
                    View Profile
                  </button>
                </div>
              ))}
              {/* No students CTA */}
              {students.length === 0 && (
                <div className="col-span-full py-8 text-center text-muted-foreground">
                  No students in this classroom
                  </br>
                  <button className="mt-2 btn-secondary">
                    Add Students
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}