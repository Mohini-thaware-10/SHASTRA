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

export default function ParentProfilePage() {
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
          pathname="/parent/profile"
        />
        <main className="p-6">
          <div className="max-w-xl mx-auto">
            {/* Profile Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/images/parent-avatar.svg"
                  alt={parent.fullName}
                  width: 60
                  height: 60
                  className="rounded-full object-cover"
                />
                <div>
                  <h2 className="font-bold text-xl">{parent.fullName}</h2>
                  <p className="text-muted-foreground">{parent.email}</p>
                  <p className="text-sm text-muted-foreground">Guardian</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Relationship</p>
                  <p className="font-medium">{parent.relationship}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Linked Children</p>
                  <p className="font-medium">
                    {parent.linkedChildren?.length || 0}
                    {parent.linkedChildren?.length > 0 ? ` of ${parent.linkedChildren.length}` : ""}
                  </p>
                </div>
              </div>

              {/* Account Information Section */}
              <section className="mb-6">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Account Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <p className="font-medium">{parent.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Member Since</p>
                    <p className="font-medium">{new Date().toLocaleDateString("en-US", { year: "numeric" })}</p>
                  </div>
                </div>
              </section>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 btn-outline">Edit Profile</button>
                <button className="flex-1 btn-primary">Save Changes</button>
              </div>
            </div>

            {/* Settings Section */}
            <section className="space-y-4">
              <h2 className="font-medium text-sm text-muted-foreground mb-3">Settings</h2>

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
                    <span>Assessment notifications</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded w-4 h-4 checked" />
                    <span>Progress updates</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded w-4 h-4" />
                    <span>Teacher announcements</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded w-4 h-4" />
                    <span>Weekly digest</span>
                  </label>
                </div>
              </div>

              {/* Language Preferences */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Language Preferences</p>
                <select className="rounded border-border px-3 py-2 w-full">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>

              {/* Privacy Preferences */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Privacy Preferences</p>
                <p className="text-xs text-muted-foreground">
                  Data is stored locally and not shared with third parties.
                  </br>
                  See our privacy notice for more information.
                </p>
              </div>

              {/* Help and Support */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Help and Support</p>
                <button className="text-primary hover-underline text-sm">
                  Contact Support
                  </button>
                <button className="text-primary hover-underline text-sm">
                  FAQ
                  </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}