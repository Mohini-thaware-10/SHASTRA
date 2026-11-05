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

export function AdminTeacherPage() {
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

  // Mock teachers data
  const teachers = [
    { id: "tch-1", name: "Mrs. Sharma", subject: "Mathematics", class: "8", universe: "nexus", status: "active", assignedClassrooms: 3 },
    { id: "tch-2", name: "Mr. Patel", subject: "Science", class: "10", universe: "nexus", status: "active", assignedClassrooms: 2 },
    { id: "tch-3", name: "Mrs. Singh", subject: "Mathematics", class: "5", universe: "junior", status: "active", assignedClassrooms: 1 },
    { id: "tch-4", name: "Mr. Desai", subject: "Physics", class: "11", universe: "ascend", status: "active", assignedClassrooms: 1 },
    { id: "tch-5", name: "Ms. Kapoor", subject: "Chemistry", class: "10", universe: "nexus", status: "suspended", assignedClassrooms: 0 },
  ];

  // Filters
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredTeachers = teachers.filter((teacher) => {
    const universeMatch = !universeFilter || teacher.universe === universeFilter;
    const statusMatch = !statusFilter || teacher.status === statusFilter;
    return universeMatch && statusMatch;
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
          pathname="/admin/teacher"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Filters */}
            <section className="bg-white rounded-xl p-4 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">Filter Teachers</h3>
              <div className="grid grid-cols-2 gap-2">
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
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <select
                    className="rounded border-border px-2 py-1 w-full"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Teachers List */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border">
              <h3 className="font-semibold text-lg mb-3">Teacher Directory</h3>
              {filteredTeachers.length === 0 ? (
                <p className="text-center text-muted-foreground mb-4">
                  No teachers found with the current filters.
                  </br>
                  <a href="/admin/teacher?adminId=admin-1" className="text-primary hover-underline">
                    Clear filters
                    </a>
                  </p>
                ) : (
                <div className="grid grid-cols-2 gap-3">
                  {filteredTeachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="p-3 rounded-border-border border-border border-border"
                    >
                      <p className="font-medium text-sm">{teacher.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {teacher.subject} — {teacher.class}
                        </br>
                        Universe: {teacher.universe}
                        </br>
                        Status: {teacher.status}
                        </br>
                        Classrooms: {teacher.assignedClassrooms}
                      </p>
                    </div>
                  ))}
                )}
              </section>

            {/* Teacher Statistics */}
            {filteredTeachers.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">Teacher Statistics</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-border-border border-border bg-primary/10">
                    <p className="text-xs text-primary mb-1">Total Teachers</p>
                    <p className="font-medium">{filteredTeachers.length}</p>
                  </div>
                  <div className="p-2 rounded-border-border border-border bg-success/10">
                    <p className="text-xs text-success mb-1">Active</p>
                    <p className="font-medium">{filteredTeachers.filter((t) => t.status === "active").length}</p>
                  </div>
                  <div className="p-2 rounded-border-border border-border bg-info/10">
                    <p className="text-xs text-info mb-1">Suspended</p>
                    <p className="font-medium">{filteredTeachers.filter((t) => t.status === "suspended").length}</p>
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