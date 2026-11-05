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

export function AdminReportsPage() {
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

  // Mock reports data
  const reportCategories = [
    { id: "rc-1", name: "Academic Reports", count: 47, description: "Student academic performance across all subjects", icon: "bar-chart-2" },
    { id: "rc-2", name: "Subject Reports", count: 23, description: "Subject-wise performance and curriculum coverage", icon: "printer" },
    { id: "rc-3", name: "Assessment Reports", count: 15, description: "Assessment results and question analysis", icon: "clipboard" },
    { id: "rc-4", name: "Activity Reports", count: 38, description: "Student activity and engagement tracking", icon: "calendar" },
    { id: "rc-5", name: "Achievement Reports", count: 12, description: "Student achievements and milestones", icon: "trophy" },
    { id: "rc-6", name: "Teacher Reports", count: 8, description: "Teacher performance and classroom metrics", icon: "users" },
  ];

  // Report Type Filters
  const [reportType, setReportType] = useState<string | null>("all");

  const filteredCategories = reportCategories.filter((category) => {
    const typeMatch = reportType === "all" ? true : category.name.toLowerCase().includes(reportType);
    return typeMatch;
  });

  return (
    <TeacherLayout
      teacherId="admin-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="admin-1"
          pathname="/admin/reports"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Reports Centre Header */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Reports Centre
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive institutional reporting with multiple categories.
                </br>
                Prototype data — not connected to live reporting systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  className="rounded border-border px-3 py-2 sm:flex-1"
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="all">All Report Types</option>
                  {reportCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button className="btn-primary sm:px-4 py-2">
                  Generate Report
                  </button>
              </div>
            </section>

            {/* Reports Categories List */}
            <section className="grid grid-cols-2 gap-3">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl p-5 shadow-sm border-border border-border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-lg">{category.name}</h3>
                    <span className="text-xs text-muted-foreground">{category.count} reports</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                    </br>
                    <small className="text-xs">
                      Generated: {new Date().toLocaleDateString()}
                      </small>
                    </p>
                  </div>
                  <button className="w-full text-primary hover-underline text-sm mt-2">
                    View Details
                    </button>
                </div>
              ))}
              {reportCategories.length === 0 && (
                <p className="col-span-2 text-center text-muted-foreground mb-4">
                  No report categories found.
                  </br>
                  <a href="#" className="text-primary hover-underline">
                    Set up report categories
                    </a>
                  </p>
                )}
              )}
            </section>

            {/* Report Generation Summary */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Report Generation</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium">Academic Reports</p>
                  <p>Student academic performance across all subjects — {reportCategories[0]?.count || 0} available</p>
                </div>
                <div>
                  <p className="font-medium">Subject Reports</p>
                  <p>Subject-wise performance and curriculum coverage — {reportCategories[1]?.count || 0} available</p>
                </div>
                <div>
                  <p className="font-medium">Assessment Reports</p>
                  <p>Assessment results and question analysis — {reportCategories[2]?.count || 0} available</p>
                </div>
                <div>
                  <p className="font-medium">Activity Reports</p>
                  <p>Student activity and engagement tracking — {reportCategories[3]?.count || 0} available</p>
                </div>
                <div>
                  <p className="font-medium">Achievement Reports</p>
                  <p>Student achievements and milestones — {reportCategories[4]?.count || 0} available</p>
                </div>
                <div>
                  <p className="font-medium">Teacher Reports</p>
                  <p>Teacher performance and classroom metrics — {reportCategories[5]?.count || 0} available</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}