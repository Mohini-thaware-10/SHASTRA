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

export default function ParentAchievementsPage() {
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

  // Mock achievements
  const mockAchievements = [
    {
      id: "ach-1",
      title: "Reading Badge",
      description: "Completed 50 reading lessons",
      icon: "book",
      date: "2024-11-15",
      category: "Literacy",
      xpEarned: 50,
    },
    {
      id: "ach-2",
      title: "Math Master",
      description: "Mastered multiplication tables up to 12",
      icon: "calculator",
      date: "2024-10-20",
      category: "Mathematics",
      xpEarned: 75,
    },
    {
      id: "ach-3",
      title: "Science Explorer",
      description: "Completed 10 science lessons",
      icon: "flask",
      date: "2024-10-10",
      category: "Science",
      xpEarned: 50,
    },
    {
      id: "ach-4",
      title: "Consistent Learner",
      description: "90-day learning streak",
      icon: "star",
      date: "2024-11-01",
      category: "Progress",
      xpEarned: 100,
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
          pathname="/parent/achievements"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Achievements
              </br>
              {selectedChild ? `for ${selectedChild.fullName}` : ""}
            </h1>

            {/* Achievement Gallery */}
            <section className="grid grid-cols-2 gap-4">
              {mockAchievements.map((achievement) => {
                // Only show achievements for selected child
                const isForSelectedChild = !selectedChild || selectedChild.achievements?.includes(achievement.id);
                if (!isForSelectedChild) return null;
                return (
                  <div
                    key={achievement.id}
                    className="p-4 rounded-border-border border-border border-border text-center"
                  >
                    <div className="w-12 h-12 rounded-md mx-auto mb-3 bg-primary/10 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 text-primary"
                        fill="currentColor"
                      >
                        {achievement.icon === "book"
                          ? `<path d="M12 3l1.6 10.6L20.6 10.6l-3.4 20.6L12 21 5 10.6l-3.4-10.6L12 3zM12 5.6L8.6 2H15.4z"/>
                          : achievement.icon === "calculator"
                            ? `<path d="M12 3l1.6 10.6L20.6 10.6l-3.4 20.6L12 21 5 10.6l-3.4-10.6L12 3z"/>
                            : `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10h-2l-2-8H14V2z"/>`
                      }
                      />
                    </svg>
                    </div>
                    <h3 className="text-sm font-medium mb-1">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {achievement.description}
                      </br>
                      {achievement.date}
                      </br>
                      XP: {achievement.xpEarned}
                    </p>
                  </div>
                );
              })}
              {mockAchievements.length === 0 && selectedChild && (
                <div className="col-span-2 p-4 text-center text-muted-foreground">
                  No achievements found.
                  </br>
                  <a href="/parent/achievements" className="text-primary hover-underline">View all achievements</a>
                </div>
              )}
            </section>

            {/* Achievement Summary */}
            {selectedChild && children.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h2 className="font-medium text-sm text-muted-foreground mb-3">Achievement Summary</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-border-border border-border bg-primary/10">
                    <p className="text-xs text-primary mb-1">Literacy</p>
                    <p className="font-medium">{mockAchievements.filter((a) => a.category === "Literacy").length}</p>
                  </div>
                  <div className="p-2 rounded-border-border border-border bg-success/10">
                    <p className="text-xs text-success mb-1">Mathematics</p>
                    <p className="font-medium">{mockAchievements.filter((a) => a.category === "Mathematics").length}</p>
                  </div>
                  <div className="p-2 rounded-border-border border-border bg-science/10">
                    <p className="text-xs text-science mb-1">Science</p>
                    <p className="font-medium">{mockAchievements.filter((a) => a.category === "Science").length}</p>
                  </div>
                  <div className="p-2 rounded-border-border border-border bg-info/10">
                    <p className="text-xs text-info mb-1">Progress</p>
                    <p className="font-medium">{mockAchievements.filter((a) => a.category === "Progress").length}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Child Selector */}
            {children.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h2 className="font-medium text-sm text-muted-foreground mb-3">View Achievements For</h2>
                <div className="grid grid-cols-2 gap-2">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      className={cn(
                        "px-3 py-1 rounded border-border border-border text-sm",
                        searchParams.get("childId") === child.id && "bg-primary/10 text-primary"
                      )}
                      onClick={() => router.push(`/parent/achievements?childId=${child.id}`)}
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