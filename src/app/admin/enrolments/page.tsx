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

export function AdminEnrolmentsPage() {
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

  // Mock enrolment data
  const enrolments = [
    { id: "en-1", studentId: "st-1", studentName: "Aarav Singh", classroom: "Class 8 Science", universe: "nexus", status: "approved", enrolledAt: "2024-04-15", guardian: "Mr. Singh" },
    { id: "en-2", studentId: "st-2", studentName: "Vihaan Patel", classroom: "Class 8 Section B", universe: "nexus", status: "submitted", enrolledAt: "2024-04-20", guardian: "Mr. Patel" },
    { id: "en-3", studentId: "st-3", studentName: "Ananya Sharma", classroom: "Class 10 Section A", universe: "nexus", status: "approved", enrolledAt: "2023-04-10", guardian: "Mrs. Sharma" },
    { id: "en-4", studentId: "st-4", studentName: "Kiara Singh", classroom: "Class 5 Section A", universe: "junior", status: "approved", enrolledAt: "2024-04-05", guardian: "Mrs. Singh" },
    { id: "en-5", studentId: "st-5", studentName: "Aditya Kumar", classroom: "Class 11 Physics", universe: "ascend", status: "under review", enrolledAt: "2024-03-25", guardian: "Mr. Kumar" },
    { id: "en-6", studentId: "st-6", studentName: "Sia Rawat", classroom: "Class 5 Section A", universe: "junior", status: "pending", enrolledAt: "2024-05-01", guardian: "Mrs. Rawat" },
  ];

  // Filters
  const [statusFilter, setStatusFilter] = useState<string | null>("all");
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);

  const filteredEnrolments = enrolments.filter((enrolment) => {
    const statusMatch = statusFilter === "all" ? true : enrolment.status === statusFilter;
    const universeMatch = !universeFilter || enrolment.universe === universeFilter;
    return statusMatch && universeMatch;
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
          pathname="/admin/enrolments"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Filters */}
            <section className="bg-white rounded-xl p-4 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">Filter Enrolments</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <select
                    className="rounded border-border px-2 py-1 w-full"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="submitted">Submitted</option>
                    <option value="under review">Under Review</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
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
              </div>
            </section>

            {/* Enrolments List */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border">
              <h3 className="font-semibold text-lg mb-3">Enrolment Review Workflow</h3>
              {filteredEnrolments.length === 0 ? (
                <p className="text-center text-muted-foreground mb-4">
                  No enrolments found with the current filters.
                  </br>
                  <a href="/admin/enrolments?adminId=admin-1" className="text-primary hover-underline">
                    Clear filters
                    </a>
                  </p>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredEnrolments.map((enrolment) => (
                    <div
                      key={enrolment.id}
                      className="p-3 rounded-border-border border-border border-border"
                    >
                      <p className="font-medium text-sm">{enrolment.studentName}</p>
                      <p className="text-xs text-muted-foreground">
                        {enrolment.classroom}
                        </br>
                        Universe: {enrolment.universe}
                        </br>
                        Enrolled: {enrolment.enrolledAt}
                        </br>
                        Guardian: {enrolment.guardian}
                      </p>
                      <div className="mt-2">
                        <span
                          className={cn(
                            "px-2 py-1 rounded text-xs",
                            `bg-${enrolment.status === "approved" ? "success" : enrolment.status === "rejected" ? "error" : "warning"}/${20} text-${enrolment.status === "approved" ? "success" : enrolment.status === "rejected" ? "error" : "warning"}`
                          )}
                        >
                          {enrolment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                })}
              </section>

            {/* Enrolment Decision Flow Summary */}
            {filteredEnrolments.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">Enrolment Decision Flow</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-border-border border-border bg-primary/5 border-primary">
                    <p className="text-xs text-primary mb-1">Draft</p>
                    <p className="font-medium">Initial submission, no decisions made</p>
                  </div>
                  <div className="p-3 rounded-border-border border-border bg-success/5 border-success">
                    <p className="text-xs text-success mb-1">Submitted</p>
                    <p className="font-medium">Awaiting administrator review</p>
                  </div>
                  <div className="p-3 rounded-border-border border-border bg-warning/5 border-warning">
                    <p className="text-xs text-warning mb-1">Under Review</p>
                    <p className="font-medium">Administrator reviewing application</p>
                  </div>
                  <div className="p-3 rounded-border-border border-border bg-info/5 border-info">
                    <p className="text-xs text-info mb-1">Approved</p>
                    <p className="font-medium">Student officially enrolled</p>
                  </div>
                  <div className="p-3 rounded-border-border border-border bg-error/5 border-error">
                    <p className="text-xs text-error mb-1">Rejected</p>
                    <p className="font-medium">Application not accepted</p>
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