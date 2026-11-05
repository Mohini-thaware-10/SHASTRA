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

export default function TeacherSettingsPage() {
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
          pathname="/teacher/settings"
        />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Teacher Settings
            </h1>

            {/* Account Information */}
            <div className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-medium text-sm text-muted-foreground mb-3">
                Account Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Full Name</p>
                  <p className="font-medium">{teacher.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{teacher.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Institution</p>
                  <p className="font-medium">{teacher.institution}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Account Role</p>
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs",
                      "bg-accent-soft text-accent"
                    )}
                  >
                    Approved Teacher
                  </span>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <section className="mb-6">
              <h2 className="font-medium text-sm text-muted-foreground mb-3">
                Change Password
              </h2>
              <p className="text-sm text-muted-foreground">
                Password changes must be handled through the admin portal.
                Contact your school administrator to reset your password.
                </p>
              <button className="w-full text-primary hover-underline text-sm">
                Initiate Password Reset
              </button>
            </section>

            {/* Account Status */}
            <section>
              <h2 className="font-medium text-sm text-muted-foreground mb-3">
                Account Status
              </h2>
              <div className="p-3 rounded-xl bg-background/50 border-border border-border">
                <p className="text-sm font-medium">Status: Active</p>
                <p className="text-xs text-muted-foreground">
                  Your account is in good standing. No restrictions apply.
                  </br>
                  Last verified: {new Date().toLocaleDateString()}
                </p>
              </div>
            </section>

            {/* Logout */}
            <section className="mt-6 pt-6 border-t border-border">
              <button
                onClick={() => router.push("/sign-in")}
                className="w-full text-error text-sm"
              >
                Log Out
              </button>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}