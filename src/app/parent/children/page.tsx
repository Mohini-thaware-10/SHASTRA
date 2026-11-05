import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  ParentProfile,
  getParentById,
  LinkedStudent,
} from "@/data/parent/parent-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function ChildrenPage() {
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

  // Handle child selection
  const selectedChildId = searchParams.get("childId") || (children.length > 0 ? children[0].id : null);
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
          pathname="/parent/children"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              My Children
              </br>
              <span className="text-muted-foreground">Manage linked learners</span>
            </h1>

            {/* Add Child Section */}
            <section className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">Link a Child</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Prototype linking flow — no real account creation
                </br>
                {parent.linkedChildren?.length > 0 ? `You have ${parent.linkedChildren.length} child(ren) linked.` : "No children currently linked."}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Student Name</label>
                  <input
                    type="text"
                    className="rounded border-border px-3 py-2 w-full"
                    placeholder="Enter student name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Academic Class</label>
                  <select className="rounded border-border px-3 py-2 w-full">
                    <option value="">Select class</option>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Learning Universe</label>
                  <select className="rounded border-border px-3 py-2 w-full">
                    <option value="">Select universe</option>
                    <option value="JUNIOR">JUNIOR (Classes 1-5)</option>
                    <option value="NEXUS">NEXUS (Classes 6-10)</option>
                    <option value="ASCEND">ASCEND (Classes 11-12)</option>
                  </select>
                </div>
              </div>
              <button className="mt-3 w-full btn-primary">
                Link Child (Prototype)
                </button>
              <p className="mt-2 text-xs text-muted-foreground">
                Linking is prototype-only. No real account is created.
                </br>
                You will need to complete account setup through the official SHATRA portal.
              </p>
            </section>

            {/* Linked Children List */}
            <section className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">Linked Children</h2>
              {children.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  No children linked. Use the form above to link a child.
                  </br>
                  <button className="mt-2 btn-primary">Link First Child</button>
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {children.map((child) => (
                    <div
                      key={child.id}
                      className="p-4 rounded-xl border-border border-border hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() =>
                        router.push(`/parent/children?childId=${child.id}`)
                      }
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Image
                          src={child.avatar}
                          alt={child.fullName}
                          width: 40
                          height: 40
                          className="rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{child.fullName}</p>
                          <p className="text-xs text-muted-foreground">
                            Class {child.academicClass} — {child.universe}
                            </br>
                            {child.progress}% progress
                          </p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-primary">View details</span>
                        </br>
                        <span className="text-muted-foreground">Progress: {child.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Child Management Stats */}
            {children.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {children.map((child) => (
                  <div key={child.id} className="bg-background/50 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-1">Child</p>
                    <p className="font-medium">{child.fullName}</p>
                    <p className="text-sm">
                      {child.progress}% • {child.universe}
                      </br>
                      Class {child.academicClass}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}