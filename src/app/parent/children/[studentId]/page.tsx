import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  ParentProfile,
  LinkedStudent,
  getParentById,
} from "@/data/parent/parent-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function ChildDetailPage() {
  const { studentId } = useParams();
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

  // Find the selected child
  const children = parent.linkedChildren || [];
  const selectedChild = children.find((c) => c.id === studentId) || children[0] || null;

  if (!selectedChild) {
    return (
      <div className="p-8 text-center">
        <h2>Child Not Found</h2>
        <p>The selected child could not be found in your linked accounts.</p>
        <button
          onClick={() => router.push("/parent/children")}
          className="mt-4 btn-primary"
        >
          Back to Children
          </button>
        <button
          onClick={() => router.push(`/parent/children?parentId=${parentId}`)}
          className="mt-2 btn-secondary"
        >
          Manage Children
          </button>
      </div>
    );
  }

  return (
    <TeacherLayout
      teacherId={parentId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={parentId}
          pathname="/parent/children/[studentId]"
        />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">
            {/* Back button */}
            <div className="mb-4">
              <button
                onClick={() => router.push("/parent/children")}
                className="text-primary hover-underline flex items-center gap-1"
              >
                ← Back to Children
              </button>
            </div>

            {/* Child Profile Header */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={selectedChild.avatar}
                  alt={selectedChild.fullName}
                  width: 80
                  height: 80
                  className="rounded-full object-cover"
                />
                <div>
                  <h2 className="font-bold text-xl">{selectedChild.fullName}</h2>
                  <p className="text-muted-foreground">
                    {selectedChild.currentClass} • {selectedChild.universe}
                    </br>
                    {selectedChild.board}
                  </p>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="w-24 h-24 rounded-full bg-background/50 flex items-center justify-center mb-4">
                <div className="w-1/2 h-1/2 rounded-full bg-primary"></div>
                <span className="text-xs font-medium text-primary">{selectedChild.progress}%</span>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Lessons</p>
                  <p className="font-medium">{selectedChild.lessonsCompleted}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Topics</p>
                  <p className="font-medium">{selectedChild.topicsMastered}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Quizzes</p>
                  <p className="font-medium">{selectedChild.quizAttempts}</p>
                </div>
              </div>
            </div>

            {/* Enrolled Subjects */}
            <section className="mb-6">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Enrolled Subjects</p>
              <div className="grid grid-cols-2 gap-2">
                {selectedChild.selectedSubjects?.map((subject, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded text-xs border-border border-background bg-primary/10 text-primary"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </section>

            {/* Learning Recommendations */}
            <section className="mb-6">
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Learning Recommendations</h3>
              <p className="text-sm text-muted-foreground">
                Based on your child's progress, we recommend:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">
                  <span className="font-medium">Practise fractions</span> — {selectedChild.difficulties?.[0] || "review current chapter"}
                  </br>
                  <small className="text-xs">{selectedChild.difficulties?.[1] || "2 hours ago"}</small>
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium">Review science chapter</span>
                  </br>
                  <small className="text-xs">{selectedChild.difficulties?.[2] || "Yesterday"}</small>
                </li>
                <li className="text-muted-foreground">
                  <span className="font-medium">Attempt practice quiz</span>
                  </br>
                  <small className="text-xs">{selectedChild.difficulties?.[3] || "This week"}</small>
                </li>
              </ul>
            </section>

            {/* Activity Timeline */}
            <section>
              <h3 className="font-medium text-sm text-muted-foreground mb-2">Recent Activity Timeline</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-border-border border-border border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Lesson</span> — Fractions module completed
                    </br>
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Quiz</span> — Science quiz attempted
                    </br>
                    {new Date(Date.now() - 86400000).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Achievement</span> — Reading badge earned
                    </br>
                    {new Date(Date.now() - 172800000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}