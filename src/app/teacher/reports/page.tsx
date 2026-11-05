import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  ReportData,
  getReportsData,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function ReportsPage() {
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

  // Get reports data
  const reports = getReportsData();

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/reports"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Reports and Exports
            </h1>

            {/* Reports List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl p-5 shadow-sm border-border hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h3 className="font-medium text-sm mb-2">
                    {report.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {report.type} report • {report.filteredBy}
                    </br>
                    Generated: {new Date(report.generatedAt).toLocaleDateString()}
                  </p>
                  <p className="text-muted-foreground line-clamp-2">
                    {report.preview}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="flex-1 text-primary hover-underline text-xs"
                    >
                      Preview
                    </button>
                    <button
                      className="flex-1 text-secondary hover-underline text-xs"
                    >
                      Export
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Report Filters */}
            <section className="mt-6 pt-6 border-t border-border">
              <h2 className="font-semibold text-lg mb-4">Filter Reports</h2>
              <form className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Academic Class
                    </label>
                    <select className="rounded border-border px-3 py-2 w-full">
                      <option value="">All Classes</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">
                      Subject
                      </label>
                      <select className="rounded border-border px-3 py-2 w-full">
                        <option value="">All Subjects</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Biology">Biology</option>
                        <option value="Accountancy">Accountancy</option>
                        <option value="Business Studies">Business Studies</option>
                        <option value="Economics">Economics</option>
                        <option value="History">History</option>
                        <option value="Political Science">Political Science</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">
                      Date Range
                      </label>
                      <select className="rounded border-border px-3 py-2 w-full">
                        <option value="">All Time</option>
                        <option value="month">Last Month</option>
                        <option value="quarter">Last Quarter</option>
                        <option value="year">Last Year</option>
                      </select>
                    </div>
                </div>
                <div>
                  <button type="submit" className="btn-primary span-full">
                    Apply Filters
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}