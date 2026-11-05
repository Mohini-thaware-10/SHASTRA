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

export default function LearningActivityPage() {
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

  // Mock activity events
  const mockActivities = [
    { id: "act-1", type: "lesson", title: "Fractions Module", subject: "Mathematics", date: "2024-12-01", status: "completed", duration: "45 min" },
    { id: "act-2", type: "quiz", title: "Science Quiz", subject: "Science", date: "2024-11-28", status: "completed", score: "85%" },
    { id: "act-3", type: "lesson", title: "Plant Cells", subject: "Science", date: "2024-11-25", status: "completed", duration: "30 min" },
    { id: "act-4", type: "quiz", title: "Math Quiz", subject: "Mathematics", date: "2024-11-20", status: "attempted", score: "72%" },
    { id: "act-5", type: "revision", title: "Chapter Review", subject: "Humanities", date: "2024-11-18", status: "completed" },
    { id: "act-6", type: "achievement", title: "Reading Badge", subject: "English", date: "2024-11-15", status: "earned" },
  ];

  // Filter activities by child and date
  const filteredActivities = selectedChild
    ? mockActivities.filter((a) => a.type !== "achievement" || selectedChild.achievements?.includes(a.id))
    : mockActivities;

  // Date filter
  const dateFilter = searchParams.get("dateFilter") || "all";

  return (
    <TeacherLayout
      teacherId={parentId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={parentId}
          pathname="/parent/learning-activity"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Learning Activity Timeline
              </br>
              {selectedChild ? `for ${selectedChild.fullName}` : "across all children"}
            </h1>

            {/* Date Filter */}
            <div className="bg-white rounded-xl p-4 shadow-sm border-border mb-6">
              <div className="flex gap-2">
                <button
                  className={cn(
                    "px-3 py-1 rounded border-border border-border text-sm",
                    searchParams.get("dateFilter") === "all" && "bg-primary/10 text-primary"
                  )}
                  data-filter="all"
                >
                  All
                  </button>
                <button
                  className="px-3 py-1 rounded border-border border-border text-sm"
                  data-filter="week"
                >
                  This Week
                  </button>
                <button
                  className="px-3 py-1 rounded border-border border-border text-sm"
                  data-filter="month"
                >
                  This Month
                  </button>
              </div>
            </div>

            {/* Activities List */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border space-y-3">
              {filteredActivities.length === 0 ? (
                <p className="text-center text-muted-foreground mb-4">
                  No activities found.
                  </br>
                  {selectedChild ? `for ${selectedChild.fullName}` : ""}
                  </br>
                  <a href="/parent/learning-activity?childId={selectedChild?.id}" className="text-primary hover-underline">View activities for child</a>
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-4 rounded-border-border border-border border-border flex items-start gap-3"
                    >
                      <div className="w-10 h-10 rounded-md flex-shrink-0 bg-primary/10 flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-primary"
                          fill="currentColor"
                        >
                          {activity.type === "lesson"
                            ? `<path d="M12 3l1.6 10.6L20.6 10.6l-3.4 20.6L12 21 5 10.6l-3.4-10.6L12 3zM12 5.6L8.6 2H15.4zM12 10.4l3.4 5.8L15.6 18.6l-3.4-3.4L12 13.6l3.4-5.8L12 10.4z"/>
                            : activity.type === "quiz"
                              ? `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10h-2l-2-8H14V2z"/>
                              : activity.type === "revision"
                                ? `<path d="M12 3l6 6-6 6-6-6z"/>
                                : `<path d="M12 5v14M18 2l-5 5-5-5H6l5 5V2h5zM6 2v6h12V2H6zm3 4h-2v2h2V6zM6 12h12v2H6V12z"/>`
                        }
                        />
                      </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.subject}</p>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <span>{activity.date}</span>
                        </br>
                        <span>{activity.duration}</span>
                      </div>
                    </div>
                  ))}
                  {/* No activities CTA */}
                  {mockActivities.length === 0 && (
                    <div className="col-span-2 p-6 text-center text-muted-foreground">
                      No activities recorded.
                      </br>
                      <a href="/parent/learning-activity" className="text-primary hover-underline">Record first activity</a>
                    </div>
                  )}
                </div>
              </section>

              {/* Activity Filters */}
              <section className="mt-6 pt-6 border-t border-border">
                <h2 className="font-medium text-sm text-muted-foreground mb-3">Filter Activities</h2>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-1 rounded border-border border-border text-sm">All</button>
                  <button className="px-3 py-1 rounded border-border border-border text-sm">Lessons</button>
                  <button className="px-3 py-1 rounded border-border border-border text-sm">Quizzes</button>
                  <button className="px-3 py-1 rounded border-border border-border text-sm">Revision</button>
                  <button className="px-3 py-1 rounded border-border border-border text-sm">Achievements</button>
                </div>
              </section>
            </section>

            {/* Child Switcher */}
            {children.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h2 className="font-medium text-sm text-muted-foreground mb-3">View Activities For</h2>
                <div className="grid grid-cols-2 gap-2">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      className={cn(
                        "px-3 py-1 rounded border-border border-border text-sm",
                        searchParams.get("childId") === child.id && "bg-primary/10 text-primary"
                      )}
                      onClick={() => router.push(`/parent/learning-activity?childId=${child.id}&dateFilter=all`)
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