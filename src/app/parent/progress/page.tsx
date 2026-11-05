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

export default function ParentProgressPage() {
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

  return (
    <TeacherLayout
      teacherId={parentId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={parentId}
          pathname="/parent/progress"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Child Selector */}
            {children.length > 0 ? (
              <div className="bg-white rounded-xl p-4 shadow-sm border-border mb-6">
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">
                  Select Child
                </h3>
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) =>
                    router.push(`/parent/progress?childId=${e.target.value}`)
                  }
                >
                  <option value="">All Children</option>
                  {children.map((child) => (
                    <option
                      key={child.id}
                      value={child.id}
                      selected={child.id === selectedChildId}
                    >
                      {child.fullName} — {child.universe}
                      </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-muted-foreground">
                No children linked. Link a child to view progress.
                </br>
                <a href="/parent/children" className="text-primary hover-underline">
                  Link Child
                  </a>
              </p>
            )}

            {/* Overview Section */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Learning Overview
                {selectedChild ? ` — {selectedChild.fullName}` : ""}
                </h2>
                {selectedChild ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Lessons Completed</p>
                      <p className="font-medium text-2xl">{selectedChild.lessonsCompleted}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Topics Mastered</p>
                      <p className="font-medium text-2xl">{selectedChild.topicsMastered}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Assessment Score</p>
                      <p className="font-medium text-2xl">{selectedChild.assessmentScore}%</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Lessons Completed</p>
                      <p className="font-medium">—</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Topics Mastered</p>
                      <p className="font-medium">—</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Assessment Score</p>
                      <p className="font-medium">—</p>
                    </div>
                  </div>
                )}

                <div className="col-span-2 pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Data based on {selectedChild ? selectedChild.currentClass : "no selected child"}.
                    </br>
                    Prototype estimates — not scientifically validated.
                  </p>
                </div>
              </section>

              {/* Learning Trends */}
              <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
                <h2 className="font-semibold text-lg mb-4">Learning Trends</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Weekly progress tracking
                  </br>
                  {selectedChild ? `for ${selectedChild.fullName}` : ""}
                </p>
                {/* Simple trend visualization */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-border-border border-border">
                    <p className="text-xs text-muted-foreground">This Week</p>
                    <div className="h-4 bg-background/50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full rounded-md bg-success" style={{ width: "70%" }} /></div>
                    </div>
                  </div>
                  <div className="p-3 rounded-border-border border-border">
                    <p className="text-xs text-muted-foreground">Last Week</p>
                    <div className="h-4 bg-background/50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full rounded-md bg-success" style={{ width: "55%" }} /></div>
                    </div>
                  </div>
                  <div className="p-3 rounded-border-border border-border">
                    <p className="text-xs text-muted-foreground">2 Weeks Ago</p>
                    <div className="h-4 bg-background/50 rounded-full overflow-hidden">
                      <div className="h-full rounded-full rounded-md bg-success" style={{ width: "40%" }} /></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Concept-Level Progress */}
              <section className="bg-white rounded-xl p-6 shadow-sm border-border">
                <h2 className="font-semibold text-lg mb-4">Concept-Level Progress</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Three categories: Strong understanding, Developing understanding, Needs more practice
                  </br>
                  {selectedChild ? `for ${selectedChild.fullName}` : ""}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {/* Strong */}
                  <div className="p-3 rounded-border-border border-border text-center">
                    <p className="text-success font-medium">Strong</p>
                    <p className="text-2xl font-bold text-success">70%</p>
                    <p className="text-xs text-success">Understanding</p>
                  </div>
                  {/* Developing */}
                  <div className="p-3 rounded-border-border border-border text-center">
                    <p className="text-primary font-medium">Developing</p>
                    <p className="text-2xl font-bold text-primary">45%</p>
                    <p className="text-xs text-primary">Understanding</p>
                  </div>
                  {/* Needs Practice */}
                  <div className="p-3 rounded-border-border border-border text-center">
                    <p className="text-error font-medium">Needs More Practice</p>
                    <p className="text-2xl font-bold text-error">25%</p>
                    <p className="text-xs text-error">Understanding</p>
                  </div>
                </div>
              </section>

              {/* Recommendations */}
              <section className="mt-6 pt-6 border-t border-border">
                <h2 className="font-medium text-sm text-muted-foreground mb-3">Learning Recommendations</h2>
                {selectedChild ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Practise fractions</span> — {selectedChild.recommendations?.[0] || "review current chapter"}
                      </br>
                      <small className="text-xs">{selectedChild.recommendations?.[1] || "2 hours ago"}</small>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Review science chapter</span>
                      </br>
                      <small className="text-xs">{selectedChild.recommendations?.[1] || "Yesterday"}</small>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Attempt practice quiz</span>
                      </br>
                      <small className="text-xs">{selectedChild.recommendations?.[2] || "This week"}</small>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Select a child above to see personalized recommendations.
                  </p>
                )}
              </section>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}