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

export function AdminAssessmentsPage() {
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

  // Mock assessments data with institutional oversight
  const assessments = [
    { id: "as-1", title: "Quarterly Mathematics Assessment", subject: "Mathematics", class: "8", universe: "nexus", term: "Quarter 1", totalStudents: 120, assessmentsConducted: 120, avgScore: 78.5 },
    { id: "as-2", title: "Half-Yearly Science Examination", subject: "Science", class: "10", universe: "nexus", term: "Half-Yearly", totalStudents: 115, assessmentsConducted: 112, avgScore: 74.2 },
    { id: "as-3", title: "Annual Physics Examination", subject: "Physics", class: "11", universe: "ascend", term: "Annual", totalStudents: 35, assessmentsConducted: 34, avgScore: 71.8 },
    { id: "as-4", title: "Final Chemistry Examination", subject: "Chemistry", class: "12", universe: "ascend", term: "Final", totalStudents: 30, assessmentsConducted: 29, avgScore: 69.4 },
    { id: "as-5", title: "Quarterly English Assessment", subject: "English", class: "7", universe: "junior", term: "Quarter 1", totalStudents: 30, assessmentsConducted: 28, avgScore: 82.1 },
    { id: "as-6", title: "Half-Yearly History Examination", subject: "History", class: "9", universe: "nexus", term: "Half-Yearly", totalStudents: 40, assessmentsConducted: 38, avgScore: 76.3 },
  ];

  // Filters
  const [statusFilter, setStatusFilter] = useState<string | null>("all");
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);

  const filteredAssessments = assessments.filter((assessment) => {
    const statusMatch = statusFilter === "all" ? true : assessment.universe === statusFilter;
    const universeMatch = !universeFilter || assessment.universe === universeFilter;
    return statusMatch && universeMatch;
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
          pathname="/admin/assessments"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Assessment Oversight Summary */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Institutional Assessment Oversight
                </br>
                {institution.name}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Assessments</p>
                  <p className="font-medium">{assessments.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Students Assessed</p>
                  <p className="font-medium">{filteredAssessments.reduce((sum, a) => sum + a.totalStudents, 0)}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Across JUNIOR, NEXUS, and ASCEND universes with institutional oversight.
                </br>
                {assessments.filter((a) => a.universe === "junior").length} JUNIOR assessments
                </br>
                {assessments.filter((a) => a.universe === "nexus").length} NEXUS assessments
                </br>
                {assessments.filter((a) => a.universe === "ascend").length} ASCEND assessments
              </p>
            </section>

            {/* Assessments List */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Institutional Assessment Oversight</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Assessment</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Subject</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Class</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Universe</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Term</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Students</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Avg Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAssessments.map((assessment) => (
                      <tr key={assessment.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2 font-medium">{assessment.title}</td>
                        <td className="border-border border-border px-4 py-2">{assessment.subject}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{assessment.class}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn("px-1.5 py-0.5 rounded text-xs", "bg-primary/10 text-primary")}>
                            {assessment.universe}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{assessment.term}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="font-medium">{assessment.totalStudents}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-primary">{assessment.avgScore}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Assessment Statistics */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Assessment Analytics</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-border-border border-border bg-primary/5 border-primary">
                  <p className="text-xs text-primary mb-1">Average Institutional Score</p>
                  <p className="font-medium text-2xl">74.5</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-success/5 border-success">
                  <p className="text-xs text-success mb-1">Highest Performing</p>
                  <p className="font-medium text-success">English (Q1)</p>
                  <p className="text-success">82.1</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-info/5 border-info">
                  <p className="text-xs text-info mb-1">Lowest Performing</p>
                  <p className="font-medium text-info">Chemistry (Final)</p>
                  <p className="text-info">69.4</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-warning/5 border-warning">
                  <p className="text-xs text-warning mb-1">Assessments Pending Review</p>
                  <p className="font-medium text-warning">3</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}