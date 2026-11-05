import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  TeacherProfile,
  getLessonPlannerData,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function LessonPlannerPage() {
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

  // Get lesson planner data
  const lessonData = getLessonPlannerData();

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/lesson-planner"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Lesson Planner
            </h1>

            {/* Weekly Lesson Planner */}
            <section className="bg-white rounded-xl shadow-sm border-border p-6 mb-6">
              <h2 className="font-semibold text-lg mb-4">Weekly Lesson Planner</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessonData.weeklyView.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-4 rounded-border-border border-border border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm">
                        {plan.subject} - {plan.chapter}
                        </br>
                        {plan.class} {plan.academicYear || ""}
                      </span>
                      <span className="text-xs text-success">
                        {plan.completionStatus}%
                        Complete
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      <strong>Learning Objectives:</strong> {plan.learningObjectives[0]}
                      </br>
                      <strong>Duration:</strong> {plan.lessonDuration}
                      </br>
                      <strong>Resources:</strong> {plan.teachingResources[0]}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <strong>Activity Planning:</strong> {plan.activityPlanning[0]}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Lessons */}
            <section className="bg-white rounded-xl shadow-sm border-border p-6">
              <h2 className="font-semibold text-lg mb-4">Upcoming Lessons</h2>
              <div className="grid grid-cols-2 gap-3">
                {lessonData.upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="p-3 rounded-border-border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">
                        {lesson.subject} - {lesson.chapter}
                        </br>
                        {lesson.title}
                      </span>
                      <span className="text-xs text-primary">
                        {new Date(lesson.scheduledDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Planner Views */}
            <section className="mt-6 pt-6 border-t border-border">
              <h2 className="font-semibold text-lg mb-4">Planner Views</h2>
              <div className="grid grid-cols-3 gap-2">
                <button
                  className={cn(
                    "px-4 py-2 rounded border-border border-border bg-primary/10 text-primary",
                    "active"
                  )}
                  >Daily</button>
                <button
                  className="px-4 py-2 rounded border-border border-border"
                  >Weekly</button>
                <button
                  className="px-4 py-2 rounded border-border border-border"
                  >Monthly</button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Switch between daily, weekly, and monthly views of lesson plans.
              </p>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}