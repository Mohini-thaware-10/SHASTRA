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

export default function ParentAssessmentsPage() {
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

  // Mock assessments
  const mockAssessments = [
    {
      id: "asm-1",
      title: "Quarterly Mathematics Assessment",
      subject: "Mathematics",
      date: "2024-11-15",
      duration: "60 min",
      totalMarks: 40,
      score: "32/40",
      performance: "80%",
      topics: ["Fractions", "Decimals", "Geometry"],
      areasForRevision: ["Geometry problems"],
    },
    {
      id: "asm-2",
      title: "Science Unit Test",
      subject: "Science",
      date: "2024-11-05",
      duration: "45 min",
      totalMarks: 25,
      score: "20/25",
      performance: "80%",
      topics: ["Cell Structure", "Photosynthesis"],
      areasForRevision: null,
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
          pathname="/parent/assessments"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Assessments
              </br>
              {selectedChild ? `for ${selectedChild.fullName}` : ""}
            </h1>

            {/* Assessment List */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">Assessment Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockAssessments.map((assessment) => {
                  // Only show assessments for selected child or all
                  const isForSelectedChild = !selectedChild || assessment.topics?.some((t) =>
                    selectedChild?.selectedSubjects?.includes(t)
                  );
                  if (!isForSelectedChild) return null;
                  return (
                    <div
                      key={assessment.id}
                      className="p-4 rounded-border-border border-border border-border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-between justify-between mb-2">
                        <h3 className="font-medium text-sm">{assessment.title}</h3>
                        <span className="text-xs text-muted-foreground">
                          {assessment.date}
                          </br>
                          {assessment.duration}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {assessment.topics?.join(", ")}
                        </br>
                        Score: {assessment.score}
                        </br>
                        Performance: {assessment.performance}
                      </p>
                      {assessment.areasForRevision && (
                        <p className="text-xs text-primary mt-1">
                          <span className="font-medium">Areas for revision:</span>
                          {assessment.areasForRevision.join(", ")}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* No assessments message */}
            {mockAssessments.length === 0 && selectedChild && (
              <div className="bg-white rounded-xl p-6 text-center text-muted-foreground">
                <p>No assessments found for {selectedChild.fullName}.</p>
                <p className="mt-2">Assessments will appear here as they are conducted.</p>
              </div>
            )}

            {/* Child Selector */}
            {children.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h2 className="font-medium text-sm text-muted-foreground mb-3">View Assessments For</h2>
                <div className="grid grid-cols-2 gap-2">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      className={cn(
                        "px-3 py-1 rounded border-border border-border text-sm",
                        searchParams.get("childId") === child.id && "bg-primary/10 text-primary"
                      )}
                      onClick={() => router.push(`/parent/assessments?childId=${child.id}`)}
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