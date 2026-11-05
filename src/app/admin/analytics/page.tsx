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

export function AdminAnalyticsPage() {
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

  // Mock cohort-level analytics data
  const cohortData = [
    { id: "co-1", name: "Class 8 Cohort", universe: "nexus", totalStudents: 120, avgScore: 74.5, passRate: 85, highestScore: 96 },
    { id: "co-2", name: "Class 10 Cohort", universe: "nexus", totalStudents: 115, avgScore: 72.3, passRate: 82, highestScore: 94 },
    { id: "co-3", name: "Class 5 Cohort", universe: "junior", totalStudents: 65, avgScore: 81.2, passRate: 92, highestScore: 98 },
    { id: "co-4", name: "Class 7 Cohort", universe: "junior", totalStudents: 58, avgScore: 79.8, passRate: 88, highestScore: 95 },
    { id: "co-5", name: "Class 11 Cohort", universe: "ascend", totalStudents: 35, avgScore: 71.8, passRate: 78, highestScore: 92 },
    { id: "co-6", name: "Class 12 Cohort", universe: "ascend", totalStudents: 30, avgScore: 69.4, passRate: 74, highestScore: 88 },
  ];

  // Filters
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);

  const filteredCohortData = cohortData.filter((cohort) => {
    const universeMatch = !universeFilter || cohort.universe === universeFilter;
    return universeMatch;
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
          pathname="/admin/analytics"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Cohort Analytics Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Cohort-Level Analytics
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sample data — cohort-level trends and academic performance across
                {filteredCohortData.length} tracked cohorts.
                </br>
                Universes: {filteredCohortData.length > 0 ? filteredCohortData.map((c) => c.universe).join(", ") : "N/A"}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average Cohort Score</p>
                  <p className="font-medium text-3xl">{filteredCohortData.length > 0 ? (filteredCohortData.reduce((sum, c) => sum + c.avgScore, 0) / filteredCohortData.length).toFixed(1) : "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Overall Pass Rate</p>
                  <p className="font-medium text-3xl">{filteredCohortData.length > 0 ? ((filteredCohortData.reduce((sum, c) => sum + c.passRate, 0) / filteredCohortData.length) * 10).toFixed(1) : "N/A"}%</p>
                </div>
              </div>
            </section>

            {/* Cohort Performance Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Cohort Performance Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Cohort</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Universe</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Students</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Avg Score</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Pass Rate</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Highest Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCohortData.map((cohort) => (
                      <tr key={cohort.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2 font-medium">{cohort.name}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn("px-1.5 py-0.5 rounded text-xs", "bg-primary/10 text-primary")}>
                            {cohort.universe}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">{cohort.totalStudents}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="font-medium">{cohort.avgScore}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-success">{cohort.passRate}%</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-primary">{cohort.highestScore}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Universe Distribution */}
            {filteredCohortData.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">Performance by Universe</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["junior", "nexus", "ascend"].map((universe) => {
                    const universeCohorts = filteredCohortData.filter((c) => c.universe === universe);
                    if (universeCohorts.length === 0) return null;
                    const avgScore = (universeCohorts.reduce((sum, c) => sum + c.avgScore, 0) / universeCohorts.length).toFixed(1);
                    const avgPassRate = (universeCohorts.reduce((sum, c) => sum + c.passRate, 0) / universeCohorts.length).toFixed(1);
                    return (
                      <div key={universe} className="p-3 rounded-border-border border-border">
                        <p className="text-xs font-medium text-primary mb-1">{universe.toUpperCase()}</p>
                        <p className="text-sm font-medium">{avgScore}</p>
                        <p className="text-xs text-success">{avgPassRate}% pass rate</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Analytics Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>All cohort analytics are based on prototype/sample data for demonstration purposes</li>
                <li>Data reflects institutional assessment records and is not connected to external databases</li>
                <li>Performance metrics are calculated from assessment scores and pass/fail determinations</li>
                <li>Individual student privacy is maintained — no personally identifiable data is displayed</li>
                <li>Report any data discrepancies to the system administrator</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}