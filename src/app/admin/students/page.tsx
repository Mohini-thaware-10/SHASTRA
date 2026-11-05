import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  InstitutionData,
  getInstitutionData,
} from "@/data/admin/institution-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export function AdminStudentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get administrator ID from query param
  const adminId = searchParams.get("adminId") || "admin-1";

  // Verify administrator access
  const institution = useDataProvider().getInstitutionData(adminId);

  if (!institution) {
    return (
      <div className="p-8 text-center">
        <h2>Access Denied</h2>
        <p>Invalid or pending administrator account.</p>
        <button
          onClick={() => router.push("/sign-in?role=admin")}
          className="mt-4 btn-primary"
        >
          Sign In as Administrator
        </button>
      </div>
    );
  }

  // Mock students data
  const students = [
    { id: "st-1", name: "Aarav Singh", class: "8", section: "A", universe: "nexus", enrolled: true, guardianLinked: true },
    { id: "st-2", name: "Vihaan Patel", class: "8", section: "B", universe: "nexus", enrolled: true, guardianLinked: false },
    { id: "st-3", name: "Ananya Sharma", class: "10", section: "A", universe: "nexus", enrolled: true, guardianLinked: true },
    { id: "st-4", name: "Kiara Singh", class: "7", section: "A", universe: "junior", enrolled: true, guardianLinked: true },
    { id: "st-5", name: "Aditya Kumar", class: "11", section: "A", universe: "ascend", enrolled: true, guardianLinked: false },
    { id: "st-6", name: "Sia Rawat", class: "5", section: "A", universe: "junior", enrolled: false, guardianLinked: false },
  ];

  // Filters
  const [classFilter, setClassFilter] = useState<string | null>(null);
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);
  const [enrolledFilter, setEnrolledFilter] = useState<string | null>("all");

  const filteredStudents = students.filter((student) => {
    const classMatch = !classFilter || student.class === classFilter;
    const universeMatch = !universeFilter || student.universe === universeFilter;
    const enrolledMatch = enrolledFilter === "all" ? true : enrolledFilter === "enrolled" ? student.enrolled : !student.enrolled;
    return classMatch && universeMatch && enrolledMatch;
  });

  return (
    <TeacherLayout
      teacherId="admin-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="admin-1"
          pathname="/admin/students"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Filters */}
            <section className="bg-white rounded-xl p-4 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">Filter Students</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Class</p>
                  <select
                    className="rounded border-border px-2 py-1 w-full"
                    onChange={(e) => setClassFilter(e.target.value)}
                  >
                    <option value="">All Classes</option>
                    {["7", "8", "9", "10", "11", "12", "5"].map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Universe</p>
                  <select
                    className="rounded border-border px-2 py-1 w-full"
                    onChange={(e) => setUniverseFilter(e.target.value)}
                  >
                    <option value="">All Universes</option>
                    <option value="junior">JUNIOR</option>
                    <option value="nexus">NEXUS</option>
                    <option value="ascend">ASCEND</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Enrolment Status</p>
                  <select
                    className="rounded border-border px-2 py-1 w-full"
                    onChange={(e) => setEnrolledFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="enrolled">Enrolled</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Students List */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border">
              <h3 className="font-semibold text-lg mb-3">Student Directory</h3>
              {filteredStudents.length === 0 ? (
                <p className="text-center text-muted-foreground mb-4">
                  No students found with the current filters.
                  </br>
                  <a href="/admin/students?adminId=admin-1" className="text-primary hover-underline">
                    Clear filters
                    </a>
                  </p>
                ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="p-3 rounded-border-border border-border border-border"
                    >
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Class {student.class} — {student.universe}
                        </br>
                        Enrolled: {student.enrolled ? "Yes" : "No"}
                        </br>
                        Guardian: {student.guardianLinked ? "Linked" : "Not Linked"}
                      </p>
                    </div>
                  ))}
                )}
              </section>

            {/* Student Statistics */}
            {filteredStudents.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">Student Statistics</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-border-border border-border bg-primary/10">
                    <p className="text-xs text-primary mb-1">Total Students</p>
                    <p className="font-medium">{filteredStudents.length}</p>
                  </div>
                  <div className="p-2 rounded-border-border border-border bg-success/10">
                    <p className="text-xs text-success mb-1">Enrolled</p>
                    <p className="font-medium">{filteredStudents.filter((s) => s.enrolled).length}</p>
                  </div>
                  <div className="p-2 rounded-border-border border-border bg-info/10">
                    <p className="text-xs text-info mb-1">Not Enrolled</p>
                    <p className="font-medium">{filteredStudents.filter((s) => !s.enrolled).length}</p>
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}