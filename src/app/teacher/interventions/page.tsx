import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  InterventionRecommendation,
  getInterventionsForTeacher,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function InterventionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get teacherId from query param
  const teacherId = searchParams.get("teacherId") || "teacher-1";

  // Verify teacher access
  const teacher = useDataProvider().getTeacherById(teacherId);

  if (!teacher) {
    return (
      <div className="p-8 text-center">
        <h2>Access Denied</h2>
        <p>Invalid or pending teacher account.</p>
        <button
          onClick={() => router.push("/sign-in?role=teacher")}
          className="mt-4 btn-primary"
        >
          Sign In as Teacher
        </button>
      </div>
    );
  }

  // Get interventions for this teacher
  const interventions = getInterventionsForTeacher(teacherId);

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/interventions"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Intervention Centre
            </h1>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-xl p-3 shadow-sm border-border">
                <div className="font-medium text-sm mb-1">Open</div>
                <div className="text-3xl font-bold text-primary">{interventions.filter(
                  (i) => i.status === "open"
                ).length}</div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border-border">
                <div className="font-medium text-sm mb-1">In Progress</div>
                <div className="text-3xl font-bold text-success">
                  {interventions.filter((i) => i.status === "in-progress").length}
                  </div>
              </div>
              <div className="bg-white rounded-xl p-3 shadow-sm border-border">
                <div className="font-medium text-sm mb-1">Resolved</div>
                <div className="text-3xl font-bold text-info">
                  {interventions.filter(
                    (i) => i.status === "resolved"
                  ).length}
                  </div>
              </div>
            </div>

            {/* Intervention List */}
            <section className="bg-white rounded-xl shadow-sm border-border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Issue</TableHead>
                    <TableHead>Evidence</TableHead>
                    <TableHead>Suggested Action</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Record Intervention</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interventions.map((intervention) => (
                    <TableRow key={intervention.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Image
                            src="/avatars/student1.png"
                            alt={intervention.studentName}
                            width: 32
                            height: 32
                            className="rounded-full object-cover"
                          />
                          <span className="font-medium">{intervention.studentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm line-clamp-2">
                          {intervention.issue}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {intervention.evidence}
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs line-clamp-1">
                          {intervention.suggestedAction}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-xs",
                            intervention.priority === "high"
                              ? "bg-error-soft text-error"
                              : intervention.priority === "medium"
                                ? "bg-warning-soft text-warning"
                                : "bg-soft text-primary"
                          )}
                        >
                          {intervention.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-xs",
                            intervention.status === "open"
                              ? "bg-accent-soft text-accent"
                              : intervention.status === "in-progress"
                                ? "bg-success-soft text-success"
                                : "bg-info-soft text-info"
                          )}
                        >
                          {intervention.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          className="text-primary hover-underline text-xs"
                        >
                          Update
                        </button>
                        <button
                          className="text-secondary hover-underline text-xs ms-1"
                        >
                          Resolve
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* No interventions CTA */}
                  {interventions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="p-8 text-center text-muted-foreground">
                        No interventions identified.
                        </br>
                        <p className="mt-2">
                          All students are currently on track with their learning.
                        </p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </section>

            {/* Record New Intervention */}
            <section className="mt-6 pt-6 border-t border-border">
              <h2 className="font-semibold text-lg mb-4">
                Record New Intervention
                </br>
                <span className="text-xs text-muted-foreground">
                  Identify students needing academic support
                </span>
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Student
                  </label>
                  <select className="rounded border-border px-3 py-2 w-full">
                    <option value="">Select student</option>
                    <option value="student-1">Aarav Singh</option>
                    <option value="student-2">Vihaan Patel</option>
                    <option value="student-3">Ananya Sharma</option>
                    <option value="student-4">Kiara Singh</option>
                    <option value="student-5">Aditya Kumar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Identified Issue
                  </label>
                  <textarea
                    rows="3"
                    className="rounded border-border px-3 py-2 w-full"
                    placeholder="e.g. Repeated difficulty with linear equations"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Supporting Evidence
                  </label>
                  <textarea
                    rows="3"
                    className="rounded border-border px-3 py-2 w-full"
                    placeholder="e.g. Incorrect responses in 4 of the last 6 relevant questions"
                  ></textarea>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">
                      Priority
                      </label>
                    <select className="rounded border-border px-3 py-2">
                      <option value="high">High</option>
                      <option value="medium" selected>
                        Medium
                      </option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">
                      Status
                      </label>
                    <select className="rounded border-border px-3 py-2">
                      <option value="open" selected>
                        Open
                      </option>
                      <option value="in-progress">
                        In Progress
                      </option>
                      <option value="resolved">
                        Resolved
                      </option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary">
                  Record Intervention
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}

/* Table component styles - inline for prototype */
interface TableProps {
  children: React.ReactNode;
}

function Table({ children }: TableProps) {
  return (
    <div>
      <table className="w-full">
        {children}
      </table>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-background">
      <tr>{children}</tr>
    </thead>
  );
}

function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-border hover:bg-background/50 transition-colors">
      {children}
    </tr>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="p-3 text-left text-xs font-medium text-muted-foreground uppercase"
    >
      {children}
    </th>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="p-3">
      {children}
    </td>
  );
}

function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody>{children}</tbody>
  );
}