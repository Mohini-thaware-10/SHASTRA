import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  ClassroomInfo,
  getClassroomById,
  getStudentsForClassroom,
  getTeacherClassrooms,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function ClassroomsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get teacherId from query param or default
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

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-screen">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/classrooms"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-6">
              My Classrooms
            </h1>
            {classrooms.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border-border">
                <p className="text-muted-foreground mb-4">
                  You don't have any classrooms assigned yet.
                </p>
                <button className="btn-secondary">
                  Add First Classroom
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classrooms.map((classroom) => (
                  <div
                    key={classroom.id}
                    className="bg-white rounded-xl p-5 shadow-sm border-border hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-sm">
                        {classroom.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {classroom.academicClass} {classroom.section}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {classroom.studentCount} students
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {classroom.subject} • Progress: {classroom.progressPercentage}%
                    </br>
                    {classroom.academicYear}
                    </p>
                    <button
                      onClick={() => {
                        router.push(
                          `/teacher/classrooms/${classroom.id}`
                        );
                      }}
                      className="text-primary hover-underline text-sm mt-3 block"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              )}
            </div>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}