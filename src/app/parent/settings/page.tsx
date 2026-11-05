import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  ParentProfile,
  getParentById,
} from "@/data/parent/parent-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function ParentSettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get parentId from query param
  const parentId = searchParams.get("parentId") || "parent-1";

  // Verify parent access
  const parent = useDataProvider().getParentById(parentId);

  if (!parent) {
    return (
      <div className="p-8 text-center">
        <h2>Access Denied</h2>
        <p>Invalid or pending parent account.</p>
        <button
          onClick={() => router.push("/sign-in?role=parent")}
          className="mt-4 btn-primary"
        >
          Sign In as Parent
        </button>
      </div>
    );
  }

  return (
    <TeacherLayout
      teacherId={parentId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={parentId}
          pathname="/parent/settings"
        />
        <main className="p-6">
          <div className="max-w-xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Settings
              </br>
              Parent Portal
            </h1>

            {/* Account Section */}
            <section className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-medium text-sm text-muted-foreground mb-3">Account Information</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Parent Name</p>
                  <p className="font-medium">{parent.fullName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{parent.email}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Relationship</p>
                  <p className="font-medium">{parent.relationship}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                  <p className="font-medium">{new Date().toLocaleDateString("en-US", { year: "numeric" })}</p>
                </div>
              </div>
            </section>

            {/* Password Section */}
            <section>
              <h2 className="font-medium text-sm text-muted-foreground mb-3">
                Password
                </small>
              </h2>
              <p className="text-sm text-muted-foreground">
                Password changes must be handled through the admin portal.
                Contact your school administrator to reset your password.
                </p>
              <button className="w-full text-primary hover-underline text-sm">
                Initiate Password Reset
                </button>
            </section>

            {/* Linked Children Section */}
            <section>
              <h2 className="font-medium text-sm text-muted-foreground mb-3">
                Linked Children
                </small>
              </h2>
              <p className="text-sm text-muted-foreground">
                {parent.linkedChildren?.length || 0} child(ren) currently linked
                </br>
                {parent.linkedChildren?.length > 0 ? `See children details above` : `Link a child to get started`}
                </p>
              </p>
            </section>

            {/* Export Data Section */}
            <section className="mt-6 pt-6 border-t border-border">
              <h2 className="font-medium text-sm text-muted-foreground mb-3">
                Data Export
                </small>
              </h2>
              <p className="text-sm text-muted-foreground">
                Export child progress and achievement data.
                </br>
                Download format: JSON (prototype)
                </p>
              <button className="w-full btn-outline text-sm">
                Export Data
                </button>
              </button>
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