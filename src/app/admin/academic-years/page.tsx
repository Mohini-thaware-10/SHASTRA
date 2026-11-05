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

export function AdminAcademicYearsPage() {
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

  // Mock academic years data
  const academicYears = [
    { id: "ay-1", year: "2023-2024", current: true, startDate: "2023-04-01", endDate: "2024-03-31", status: "active" },
    { id: "ay-2", year: "2022-2023", current: false, startDate: "2022-04-01", endDate: "2023-03-31", status: "archived" },
    { id: "ay-3", year: "2021-2022", current: false, startDate: "2021-04-01", endDate: "2022-03-31", status: "archived" },
  ];

  return (
    <TeacherLayout
      teacherId="admin-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="admin-1"
          pathname="/admin/academic-years"
        />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">

            {/* Academic Year Form */}
            <section className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">Academic Year Management</h2>
              <form className="space-y-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Academic Year
                    </label>
                  <input
                    type="text"
                    className="rounded border-border px-3 py-2 w-full"
                    placeholder="e.g. 2024-2025"
                    required
                    />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Start Date
                    </label>
                  <input
                    type="date"
                    className="rounded border-border px-3 py-2 w-full"
                    required
                    />
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    End Date
                    </label>
                  <input
                    type="date"
                    className="rounded border-border px-3 py-2 w-full"
                    required
                    />
                  </div>
                <button type="submit" className="w-full btn-primary">
                  Create Academic Year
                  </button>
              </form>
            </section>

            {/* Academic Year List */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {academicYears.map((year) => (
                <div
                  key={year.id}
                  className="p-3 rounded-border-border border-border border-border hover:bg-primary/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{year.year}</p>
                      <p className="text-xs text-muted-foreground">
                        {year.startDate.split("-")[2]}-{year.endDate.split("-")[2]}
                        </br>
                        Status: {year.status}
                        </br>
                        Current: {year.current ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <button className="text-primary hover-underline text-sm">
                        Edit
                        </button>
                      <button className="text-secondary hover-underline text-sm">
                        Archive
                        </button>
                    </div>
                  </div>
                </div>
              ))}
              {academicYears.length === 0 && (
                <p className="text-center text-muted-foreground mb-4">
                  No academic years found.
                  </br>
                  <a href="#" className="text-primary hover-underline">
                    Create first academic year
                    </a>
                  </p>
                )}
              )}
            </section>

            {/* Current Academic Year Indicator */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">
                Current Academic Year
                </small>
              </h2>
              {academicYears.filter((y) => y.current).length > 0 ? (
                <div className="p-3 rounded-border-border border-border bg-success/10 border-success">
                  <p className="font-medium text-success">Current Academic Year: {academicYears.filter((y) => y.current)[0].year}</p>
                  <p className="text-xs text-success">Start: {academicYears.filter((y) => y.current)[0].startDate}</p>
                  <p className="text-xs text-success">End: {academicYears.filter((y) => y.current)[0].endDate}</p>
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No current academic year selected.
                  </br>
                  <a href="#" className="text-primary hover-underline">Set current academic year</a>
                  </p>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}