import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  ParentProfile,
  getParentDashboardData,
} from "@/data/parent/parent-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function ParentDashboard() {
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

  // Get child data
  const children = parent.children || [];
  const selectedChildId = searchParams.get("childId") || (children.length > 0 ? children[0].id : "");
  const selectedChild = children.find((c) => c.id === selectedChildId) || children[0] || null;

  return (
    <TeacherLayout
      teacherId={parentId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={parentId}
          pathname="/parent"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Welcome, {parent.fullName}
              </br>
              <span className="text-muted-foreground">Parent Portal</span>
            </h1>

            {/* Child Selector */}
            <div className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">
                My Children
                </br>
                <span className="text-xs text-muted-foreground">
                  Select a child to view their learning progress
                </span>
              </h2>
              {children.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No children linked. Use the linking flow to add children.
                  </br>
                  <button className="mt-2 btn-secondary">Link Child</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {children.map((child) => (
                    <div
                      key={child.id}
                      className="p-4 rounded-xl border-border border-border hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() =>
                        router.push(`/parent/children?childId=${child.id}`)
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={child.avatar}
                          alt={child.fullName}
                          width: 50
                          height: 50
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{child.fullName}</p>
                          <p className="text-xs text-muted-foreground">
                            Class {child.academicClass}
                            </br>
                            {child.universe}
                            </br>
                            {child.progress}% progress
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Child CTA */}
              {children.length < 3 && (
                <button
                  className="mt-3 w-full btn-outline"
                  onClick={() => router.push("/parent/children/add")}
                >
                  Add Another Child
                  </button>
              )}
            </div>

            {/* Child Overview Section */}
            {selectedChild && (
              <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
                <h2 className="font-semibold text-lg mb-3">
                  {selectedChild.fullName}'s Overview
                  </br>
                  <span className="text-muted-foreground">Class {selectedChild.academicClass} {selectedChild.universe}</span>
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Class</p>
                    <p className="font-medium">{selectedChild.academicClass}</p>
                    <p className="text-sm text-muted-foreground">Academic Board: {selectedChild.board}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Learning Universe</p>
                    <p className="font-medium">{selectedChild.universe}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Current Progress</p>
                  <div className="w-32 h-4 bg-background/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full rounded-md"
                      style={{ width: `${selectedChild.progress}%` }}
                    /></div>
                  </div>
                  <p className="text-xs font-medium">{selectedChild.progress}% mastery</p>
                </div>
              </section>
            )}

            {/* Learning Summary */}
            {!selectedChild && children.length > 0 ? (
              <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
                <h2 className="font-semibold text-lg mb-4">Learning Summary</h2>
                <p className="text-muted-foreground">
                  Select a child above to view their learning summary.
                  </br>
                  Overall across linked children: monitoring active.
              </p>
              </div>
            ) : selectedChild && (
              <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
                <h2 className="font-semibold text-lg mb-4">Learning Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Lessons Completed</p>
                    <p className="font-medium">42</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Topics Mastered</p>
                    <p className="font-medium">28</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Days</p>
                    <p className="font-medium">15</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Assessment Score</p>
                    <p className="font-medium">78%</p>
                  </div>
                </div>
              </section>
            )}

            {/* Weekly Activity */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-4">Weekly Learning Activity</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Activity timeline for the past 7 days
                </br>
                {selectedChild ? `for ${selectedChild.fullName}` : "across all children"}
              </p>
              <div className="h-24 bg-background/50 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full rounded-md"
                  style={{ width: "60%" }}
                /></div>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-2">
                6 lessons completed • 2 quiz attempts • 1 revision session
              </p>
            </section>

            {/* Subject Progress */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-4">Subject Progress</h2>
              <div className="grid grid-cols-2 gap-3">
                {/* Subject cards - using mock data */}
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Mathematics</p>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full rounded-md bg-primary" style={{ width: "75%" }} /></div>
                  </div>
                  <p className="text-xs">75% mastery</p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-xs text-muted-foreground mb-1">English</p>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full rounded-md bg-primary" style={{ width: "65%" }} /></div>
                  </div>
                  <p className="text-xs">65% mastery</p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Science</p>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full rounded-md bg-primary" style={{ width: "60%" }} /></div>
                  </div>
                  <p className="text-xs">60% mastery</p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-xs text-muted-foreground mb-1">Humanities</p>
                  <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className="h-full rounded-full rounded-md bg-primary" style={{ width: "55%" }} /></div>
                  </div>
                  <p className="text-xs">55% mastery</p>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border">
              <h2 className="font-semibold text-lg mb-4">Recent Learning Activity</h2>
              <div className="space-y-3">
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Math</span> — Lesson completed
                    </br>
                    2 hours ago
                  </p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Quiz</span> — Science quiz attempted
                    </br>
                    Yesterday
                  </p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Achievement</span> — Reading badge earned
                    </br>
                    3 days ago
                  </p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Revision</span> — Chapter review session
                    </br>
                    5 days ago
                  </p>
                </div>
              </div>
            </section>

            {/* Upcoming Activities */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border">
              <h2 className="font-semibold text-lg mb-4">Upcoming Activities</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-sm text-primary">Upcoming Assessment</p>
                  <p className="text-xs text-muted-foreground">Mathematics Test — Friday</p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-sm text-primary">Revision Session</p>
                  <p className="text-xs text-muted-foreground">Science Chapter 3 — Monday</p>
                </div>
              </div>
              <p className="text-sm text-center text-muted-foreground mt-2">No more upcoming activities this week</p>
            </section>

            {/* Parent Action Centre */}
            <section className="mt-6 pt-6 border-t border-border">
              <h2 className="font-semibold text-lg mb-3">Parent Action Centre</h2>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Suggested Action</p>
                  <p className="font-medium">Encourage revision of difficult math topics</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Celebrate</p>
                  <p className="font-medium">Recent quiz improvement — 78%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contact Teacher</p>
                  <p className="font-medium">Schedule parent-teacher meeting</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Learning Goal</p>
                  <p className="font-medium">Master fractions by end of term</p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}