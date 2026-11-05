import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  TeacherProfile,
  getTeacherById,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function TeacherProfilePage() {
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

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/profile"
        />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">
            {/* Profile Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/avatars/teacher1.png"
                  alt={teacher.fullName}
                  width: 80
                  height: 80
                  className="rounded-full object-cover"
                />
                <div>
                  <h2 className="font-bold text-xl">{teacher.fullName}</h2>
                  <p className="text-muted-foreground">
                    {teacher.email}
                    </br>
                    {teacher.institution}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Teaching Subjects</p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.teachingSubjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded text-xs border-border border-border bg-accent-soft text-accent"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assigned Classes</p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.assignedClasses.map((cls, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded text-xs border-border border-border bg-soft text-primary"
                      >
                        {cls}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 btn-outline">
                  Edit Profile
                  </button>
                <button className="flex-1 btn-primary">
                  Save Changes
                  </button>
              </div>
            </div>

            {/* Settings Section */}
            <section className="space-y-4">
              <h2 className="font-semibold text-lg mb-3">Settings</h2>

              {/* Display Preferences */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Display Preferences</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" className="rounded w-4 h-4" />
                    <span>Light Mode</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" className="rounded w-4 h-4" />
                    <span>Dark Mode</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" className="rounded w-4 h-4" />
                    <span>Auto Mode</span>
                  </label>
                </div>
              </div>

              {/* Notification Preferences */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Notification Preferences</p>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded w-4 h-4" checked />
                    <span>Assessment Submitted</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded w-4 h-4 checked" />
                    <span>Assignment Due</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded w-4 h-4" />
                    <span>Student Review</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded w-4 h-4" />
                    <span>Classroom Completed</span>
                  </label>
                </div>
              </div>

              {/* Language Preferences */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Language Preferences</p>
                <select className="rounded border-border px-3 py-2 w-full">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="bn">Bangla</option>
                  <option value="ta">Tamil</option>
                </select>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}