import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  TeacherDashboardOverview,
  getTeacherDashboardOverview,
} from "@/data/teacher/teacher-data-provider";
import {
  ClassroomInfo,
  getClassroomById,
  getTeacherClassrooms,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";

const inter = Inter({ subsets: ["latvian"] });

export default function TeacherDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get teacherId from query param or default
  const teacherId = searchParams.get("teacherId") || "teacher-1";

  // Verify teacher access
  const teacher = useDataProvider()
    .getTeacherById(teacherId);

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

  // Get dashboard overview
  const overview = getTeacherDashboardOverview(teacherId);

  // Get teacher's classrooms
  const classrooms = getTeacherClassrooms(teacherId);

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-screen">
        {/* Welcome Section */}
        <section className="p-6 border-b border-border bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-bold text-2xl">
                Welcome, {teacher.fullName.split(" ")[0]}
              </h1>
              <span className="text-sm text-muted-foreground">
                {teacher.currentAcademicYear}
              </span>
            </div>
            <p className="text-muted-foreground">
              Professional workspace • {teacher.teachingSubjects.join(", ")} • 
              {teacher.assignedClasses.length} assigned classes
            </p>
          </div>
        </section>

        {/* Academic Overview -->
        <section className="p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-semibold text-lg mb-4">Academic Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Students Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-border">
                <div className="text-3xl font-bold">{overview.totalAssignedStudents}</div>
                <div className="text-sm text-muted-foreground mt-1">Total Assigned Students</div>
              </div>
              {/* Active Classrooms Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-border">
                <div className="text-3xl font-bold">{overview.activeClassrooms}</div>
                <div className="text-sm text-muted-foreground mt-1">Active Classrooms</div>
              </div>
              {/* Assessments Created Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-border">
                <div className="text-3xl font-bold">{overview.assessmentsCreated}</div>
                <div className="text-sm text-muted-foreground mt-1">Assessments Created</div>
              </div>
              {/* Assignments Pending Review Card */}
              <div className="bg-white rounded-xl p-5 shadow-sm border-border">
                <div className="text-3xl font-bold">{overview.assignmentsPendingReview}</div>
                <div className="text-sm text-muted-foreground mt-1">Assignments Pending Review</div>
              </div>
            </div>
          </div>
        </section>
        {/* Students Requiring Attention Card */}
        <section className="p-6 bg-white rounded-xl shadow-sm border-border mt-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">
              Students Requiring Attention
            </h2>
            <span className="text-sm text-error-foreground">
              {overview.studentsRequiringAttention}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Students with low progress, repeated incorrect answers, or no recent activity
          </p>
        </section>
        {/* Classroom Overview -->
        <section className="p-6 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-semibold text-lg mb-4">Classrooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classrooms.map((classroom) => (
                <div
                  key={classroom.id}
                  className="bg-white rounded-xl p-5 shadow-sm border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-sm">
                        {classroom.name} ({classroom.academicClass} {classroom.section})
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {classroom.subject} • {classroom.studentCount} students
                      </p>
                    </div>
                    <div className="text-sm">
                      <div className="text-xs text-muted-foreground">Progress</div>
                      <div className="w-20 h-1.5 bg-accent-soft rounded-full overflow-hidden mt-1">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            "bg-accent",
                            `width-${classroom.progressPercentage}%`
                          )}
                        /></div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      // Navigate to classroom detail
                      // In a full implementation, this would use router.push
                      window.location.href = `/teacher/classrooms/${classroom.id}`;
                    }}
                    className="text-primary hover-underline text-sm mt-2 block"
                  >
                    View Classroom Details
                  </button>
                </div>
              ))}
              {/* Add Classroom CTA */}
              <div className="bg-white rounded-xl p-5 text-center border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  No classrooms assigned yet
                </p>
                <button
                  className="mt-2 btn-secondary"
                >
                  Add Classroom
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </TeacherLayout>
  );
}