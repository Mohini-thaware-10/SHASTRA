import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  LearnerContext,
  MockTutorResponseProvider,
} from "@/types/intelligence/models";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function TutorHistoryPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get studentId from query param
  const studentId = searchParams.get("studentId") || "student-1";

  // Verify student access
  const { dataProvider } = useDataProvider();

  // Mock tutor session history
  const mockSessions = [
    {
      id: "sess-1",
      title: "Fractions Introduction",
      topic: "Fractions",
      subject: "Mathematics",
      date: "2024-11-20",
      universe: "nexus",
      classLevel: "8",
      status: "completed",
      keyOutcome: "Understood numerators and denominators",
    },
    {
      id: "sess-2",
      title: "Algebra Basics",
      topic: "Algebra",
      subject: "Mathematics",
      date: "2024-11-22",
      universe: "nexus",
      classLevel: "8",
      status: "completed",
      keyOutcome: "Solved basic linear equations",
    },
    {
      id: "sess-3",
      title: "Science Quiz Review",
      topic: "Cell Structure",
      subject: "Science",
      date: "2024-11-18",
      universe: "nexus",
      classLevel: "8",
      status: "completed",
      keyOutcome: "Identified plant cell components",
    },
  ];

  return (
    <TeacherLayout
      teacherId="parent-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="parent-1"
          pathname="/tutor/history"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-3">
                Tutor Session History
                </br>
                for {studentId}
              </h2>
              <p className="text-sm text-muted-foreground">
                View your previous tutor sessions and outcomes.
                </br>
                prototype: Local prototype history only.
                </span>
              </p>
            </section>

            {/* Sessions List */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border">
              {mockSessions.length === 0 ? (
                <p className="text-center text-muted-foreground mb-4">
                  No tutor sessions found.
                  </br>
                  <a href="/tutor/history?studentId={studentId}" className="text-primary hover-underline">
                    Start first session
                    </a>
                  </p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mockSessions.map((session) => (
                    <div
                      key={session.id}
                      className="p-3 rounded-border-border border-border border-border hover:bg-primary/10 transition-colors"
                    >
                      <div className="flex items-between justify-between">
                        <div>
                          <p className="font-medium text-sm">{session.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {session.date}
                            </br>
                            {session.universe} — Class {session.classLevel}
                          </p>
                        </div>
                        <span className="text-primary text-sm">
                          {session.status}
                          </br>
                          {session.keyOutcome}
                        </span>
                      </div>
                    </div>
                  ))}
                )}
              </section>

            {/* Session Details */}
            {Object.keys(mockSessions).length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">Session Details</h3>
                {mockSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 rounded-border-border border-border border-border mb-3">
                    <p className="font-medium text-sm">{session.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Topic: {session.topic}
                      </br>
                      Subject: {session.subject}
                      </br>
                      Universe: {session.universe}
                      </br>
                      Class: Class {session.classLevel}
                      </br>
                      Status: {session.status}
                      </br>
                      Key Outcome: {session.keyOutcome}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* Action Buttons */}
            <section className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-1 rounded border-border border-border text-sm">
                  Resume session
                  </button>
                <button className="px-3 py-1 rounded border-border border-border text-sm">
                  Delete history
                  </button>
                <button className="px-3 py-1 rounded border-border border-border text-sm">
                  Export history
                  </button>
                <button className="px-3 py-1 rounded border-border border-border text-sm">
                  Print history
                  </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}