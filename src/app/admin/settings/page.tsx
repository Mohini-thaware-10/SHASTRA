import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  InstitutionData,
  getInstitutionData,
} from "@/data/admin/institution-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export function AdminSettingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get administrator ID from query param
  const adminId = searchParams.get("adminId") || "admin-1";

  // Verify administrator access
  const institution = useDataProvider().getInstitutionData(adminId);

  if (!institution) {
    return (
      <div className="p-8 text-center">
        <h2>Access Denied</h2>
        <p>Invalid or pending administrator account.</p>
        <button
          onClick={() => router.push("/sign-in?role=admin")}
          className="mt-4 btn-primary"
        >
          Sign In as Administrator
        </button>
      </div>
    );
  }

  // Mock admin settings
  const settings = {
    institution: {
      name: institution.name,
      board: institution.board,
      academicYear: institution.academicYear,
    },
    notifications: {
      emailNotifications: true,
      assessmentAlerts: true,
      enrolmentUpdates: true,
      securityAlerts: true,
    },
    display: {
      theme: "default",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24-hour",
      language: "en",
    },
    privacy: {
      showStudentNames: true,
      shareAggregatedData: true,
      allowExport: true,
    },
  };

  return (
    <TeacherLayout
      teacherId="admin-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="admin-1"
          pathname="/admin/settings"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Admin Profile Section */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Administrator Profile
                </br>
                {settings.institution.name}
              </h2>

              {/* Institution Settings */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Institution Name
                    </label>
                  <input
                    type="text"
                    value={settings.institution.name}
                    className="rounded border-border px-3 py-2 w-full bg-background"
                    readOnly
                    />
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Academic Board
                    </label>
                  <select
                    className="rounded border-border px-3 py-2 w-full bg-background"
                    readOnly
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="IB">IB</option>
                  </select>
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Academic Year
                    </label>
                  <input
                    type="text"
                    value={settings.institution.academicYear}
                    className="rounded border-border px-3 py-2 w-full bg-background"
                    readOnly
                    />
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-3">Notification Preferences</label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        className="rounded border-border px-2"
                        readOnly
                        />
                      <span className="ml-2 text-sm">Email notifications</span>
                      </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.assessmentAlerts}
                        className="rounded border-border px-2"
                        readOnly
                        />
                      <span className="ml-2 text-sm">Assessment alerts</span>
                      </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.enrolmentUpdates}
                        className="rounded border-border px-2"
                        readOnly
                        />
                      <span className="ml-2 text-sm">Enrolment updates</span>
                      </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.securityAlerts}
                        className="rounded border-border px-2"
                        readOnly
                        />
                      <span className="ml-2 text-sm">Security alerts</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Display Preferences */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-3">Display Preferences</label>
                  <div className="grid grid-cols-2 gap-3 space-y-3">
                    <select className="rounded border-border px-3 py-2 w-full bg-background">
                      <option value="default">Default theme</option>
                      <option value="dark">Dark mode</option>
                      <option value="light">Light mode</option>
                    </select>
                    <select className="rounded border-border px-3 py-2 w-full bg-background">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                    </select>
                    <select className="rounded border-border px-3 py-2 w-full bg-background">
                      <option value="24-hour">24-hour</option>
                      <option value="12-hour">12-hour</option>
                    </select>
                    <select className="rounded border-border px-3 py-2 w-full bg-background">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="ta">Tamil</option>
                    </select>
                  </div>
                </div>

                {/* Privacy Settings */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-3">Privacy Settings</label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.showStudentNames}
                        className="rounded border-border px-2"
                        readOnly
                        />
                      <span className="ml-2 text-sm">Show student names in reports</span>
                      </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.shareAggregatedData}
                        className="rounded border-border px-2"
                        readOnly
                        />
                      <span className="ml-2 text-sm">Share aggregated data</span>
                      </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.privacy.allowExport}
                        className="rounded border-border px-2"
                        readOnly
                        />
                      <span className="ml-2 text-sm">Allow data export</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Changes */}
              <div className="mt-6 pt-6 border-t border-border">
                <button className="w-full btn-primary">
                  Save Changes
                  </button>
                <p className="text-sm text-muted-foreground mt-2">
                  Changes are prototype-only and not saved to live systems.
                  </br>
                  <small className="ml-1">Prototype: Local session only</small>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}