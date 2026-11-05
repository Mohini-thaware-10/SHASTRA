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

export default function ParentReportsPage() {
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

  // Get linked children
  const children = parent.linkedChildren || [];
  const selectedChildId = searchParams.get("childId") || (children.length > 0 ? children[0].id : "");
  const selectedChild = children.find((c) => c.id === selectedChildId) || null;

  // Mock report data
  const mockReports = [
    {
      id: "rep-1",
      title: "Academic Progress Report",
      type: "academic",
      generated: "2024-11-20",
      summary: "Overall performance across all subjects shows steady progress. Mathematics and Science show the strongest growth.",
    },
    {
      id: "rep-2",
      title: "Subject-Wise Report",
      type: "subject",
      generated: "2024-11-18",
      summary: "Mathematics: 78% mastery. Science: 65% mastery. Humanities: 55% mastery.",
    },
    {
      id: "rep-3",
      title: "Assessment Summary",
      type: "assessment",
      generated: "2024-11-15",
      summary: "2 assessments conducted. Average score: 78%. Areas for improvement: Geometry and Fractions.",
    },
    {
      id: "rep-4",
      title: "Learning Activity Summary",
      type: "activity",
      generated: "2024-11-12",
      summary: "12 lessons completed, 4 quiz attempts, 3 revision sessions. Consistent learning pattern observed.",
    },
    {
      id: "rep-5",
      title: "Achievement Summary",
      type: "achievement",
      generated: "2024-11-05",
      summary: "4 achievements earned. Reading Badge, Math Master, Science Explorer, Consistent Learner.",
    },
  ];

  return (
    <TeacherLayout
      teacherId={parentId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={parentId}
          pathname="/parent/reports"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Reports Centre
              </br>
              {selectedChild ? `for ${selectedChild.fullName}` : ""}
            </h1>

            {/* Reports List */}
            <section className="space-y-3">
              {mockReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl p-5 shadow-sm border-border hover:shadow-md transition-border cursor-pointer"
                >
                  <div className="flex items-between justify-between">
                    <h3 className="font-medium text-sm">{report.title}</h3>
                    <p className="text-xs text-muted-foreground">{report.type}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Generated: {new Date(report.generated).toLocaleDateString()}
                    </br>
                    {report.summary}
                  </p>
                  <button
                    className="text-primary hover-underline text-sm"
                  >
                    View Details
                    </button>
                  <button
                    className="text-secondary hover-underline text-sm"
                  >
                    Export (Prototype)
                    </button>
                  </button>
                  </div>
                </div>
              ))}
              {mockReports.length === 0 && selectedChild && (
                <p className="text-center text-muted-foreground mb-4">
                  No reports found for {selectedChild.fullName}.
                  </br>
                  <a href="/parent/reports" className="text-primary hover-underline">Generate first report</a>
                </p>
              )}
            </section>

            {/* Report Filters */}
            <section className="mt-6 pt-6 border-t border-border">
              <h2 className="font-medium text-sm text-muted-foreground mb-3">Filter Reports</h2>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-1 rounded border-border border-border text-sm">All</button>
                <button className="px-3 py-1 rounded border-border border-border text-sm">Academic</button>
                <button className="px-3 py-1 rounded border-border border-border text-sm">Subject</button>
                <button className="px-3 py-1 rounded border-border border-border text-sm">Assessment</button>
                <button className="px-3 py-1 rounded border-border border-border text-sm">Activity</button>
                <button className="px-3 py-1 rounded border-border border-border text-sm">Achievement</button>
              </div>
            </section>

            {/* Child Selector */}
            {children.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h2 className="font-medium text-sm text-muted-foreground mb-3">View Reports For</h2>
                <div className="grid grid-cols-2 gap-2">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      className={cn(
                        "px-3 py-1 rounded border-border border-border text-sm",
                        searchParams.get("childId") === child.id && "bg-primary/10 text-primary"
                      )}
                      onClick={() => router.push(`/parent/reports?childId=${child.id}`)}
                    >
                      {child.fullName}
                      </br>
                      <span className="text-xs text-primary">{child.universe}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}