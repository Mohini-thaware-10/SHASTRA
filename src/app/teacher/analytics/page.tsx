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
import { ClassroomInfo, getTeacherClassrooms } from "@/data/teacher/teacher-data-provider";
import StudentCard from "@/components/common/StudentCard";

const inter = Inter({ subsets: ["latvian"] });

export default function TeacherAnalytics() {
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

  // Get teacher's classrooms
  const classrooms = getTeacherClassrooms(teacherId);

  // Overview data
  const overview = getTeacherDashboardOverview(teacherId);

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-screen">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/analytics"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Analytics Overview -->
            <section className="p-6 mb-6 bg-white rounded-xl shadow-sm border-border">
              <h2 className="font-semibold text-lg mb-4">Learning Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border-border">
                  <div className="text-3xl font-bold text-primary">{overview.totalAssignedStudents}</div>
                  <div className="text-sm text-muted-foreground mt-1">Total Students</div>
                </div>
                <div className="p-4 rounded-xl border-border">
                  <div className="text-3xl font-bold text-success">{overview.activeClassrooms}</div>
                  <div className="text-sm text-muted-foreground mt-1">Active Classrooms</div>
                </div>
                <div className="p-4 rounded-xl border-border">
                  <div className="text-3xl font-bold text-info">{overview.assessmentsCreated}</div>
                  <div className="text-sm text-muted-foreground mt-1">Assessments</div>
                </div>
              </div>
            </section>

            {/* Subject Analytics -->
            <section className="p-6 bg-white rounded-xl shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-4">Subject Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Physics Card */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Physics</h4>
                  <div className="h-4 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "78%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground">78% mastery</div>
                </div>
                {/* Chemistry Card */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Chemistry</h4>
                  <div className="h-4 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "65%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground">65% mastery</div>
                </div>
                {/* Biology Card */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Biology</h4>
                  <div className="h-4 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "55%" }} />
                  </div>
                  <div className="text-xs text-muted-foreground">55% mastery</div>
                </div>
              </div>
            </section>

            {/* Topic Mastery -->
            <section className="p-6 bg-white rounded-xl shadow-sm border-border">
              <h2 className="font-semibold text-lg mb-4">Topic Mastery</h2>
              <p className="text-muted-foreground mb-4">
                Topic-wise accuracy based on recent assessment outcomes
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Topic card 1 */}
                <div className="p-3 rounded-border-border border-border">
                  <div className="flex justify-between mb-1">
                    <span>Linear Equations</span>
                    <span className="text-primary">85%</span>
                  </div>
                  <div className="h-2 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                {/* Topic card 2 */}
                <div className="p-3 rounded-border-border border-border">
                  <div className="flex justify-between mb-1">
                    <span>Quadratic Equations</span>
                    <span className="text-success">72%</span>
                  </div>
                  <div className="h-2 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "72%" }} />
                  </div>
                </div>
                {/* Topic card 3 */}
                <div className="p-3 rounded-border-border border-border">
                  <div className="flex justify-between mb-1">
                    <span>Trigonometry</span>
                    <span className="text-warning">61%</span>
                  </div>
                  <div className="h-2 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "61%" }} />
                  </div>
                </div>
                {/* Topic card 4 */}
                <div className="p-3 rounded-border-border border-border">
                  <div className="flex justify-between mb-1">
                    <span>Calculus Basics</span>
                    <span className="text-primary">79%</span>
                  </div>
                  <div className="h-2 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "79%" }} />
                  </div>
                </div>
              </div>
            </section>

            {/* Student Comparison -->
            <section className="p-6 bg-white rounded-xl shadow-sm border-border">
              <h2 className="font-semibold text-lg mb-4">Student Comparison</h2>
              <p className="text-muted-foreground mb-4">
                Private teacher-facing insights (not public rankings)
              </p>
              <div className="grid grid-cols-3 gap-3">
                {/* Student comparison card 1 */}
                <div className="p-3 rounded-border-border border-border">
                  <div className="flex justify-between mb-1">
                    <span>Aarav Singh</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                {/* Student comparison card 2 */}
                <div className="p-3 rounded-border-border border-border">
                  <div className="flex justify-between mb-1">
                    <span>Vihaan Patel</span>
                    <span>45%</span>
                  </div>
                  <div className="h-2 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>
                {/* Student comparison card 3 */}
                <div className="p-3 rounded-border-border border-border">
                  <div className="flex justify-between mb-1">
                    <span>Ananya Sharma</span>
                    <span>71%</span>
                  </div>
                  <div className="h-2 bg-accent-soft rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full" style={{ width: "71%" }} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}