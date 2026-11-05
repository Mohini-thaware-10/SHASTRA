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

export function AdminConductPage() {
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

  // Mock conduct data
  const conductRecords = [
    { id: "cd-1", studentId: "st-1", studentName: "Aarav Singh", class: "8", universe: "nexus", incidences: 0, lastIncident: "None", status: "Good Standing" },
    { id: "cd-2", studentId: "st-2", studentName: "Vihaan Patel", class: "8", universe: "nexus", incidences: 2, lastIncident: "2024-05-10 - Talking in class", status: "Warning" },
    { id: "cd-3", studentId: "st-3", studentName: "Ananya Sharma", class: "10", universe: "nexus", incidences: 1, lastIncident: "2024-05-05 - Late submission", status: "Good Standing" },
    { id: "cd-4", studentId: "st-4", studentName: "Kiara Singh", class: "5", universe: "junior", incidences: 0, lastIncident: "None", status: "Good Standing" },
    { id: "cd-5", studentId: "st-5", studentName: "Aditya Kumar", class: "11", universe: "ascend", incidences: 3, lastIncident: "2024-04-28 - Disruptive behavior", status: "Needs Improvement" },
    { id: "cd-6", studentId: "st-6", studentName: "Sia Rawat", class: "5", universe: "junior", incidences: 1, lastIncident: "2024-05-12 - Uniform violation", status: "Good Standing" },
  ];

  // Filters
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>("all");

  const filteredRecords = conductRecords.filter((record) => {
    const universeMatch = !universeFilter || record.universe === universeFilter;
    const statusMatch = statusFilter === "all" ? true : record.status === statusFilter;
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
          pathname="/admin/conduct"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Student Conduct Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Student Conduct Management
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sample student conduct records for institutional behavior tracking.
                </br>
                Prototype data — not connected to live conduct systems.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setUniverseFilter(e.target.value)}
                >
                  <option value="">All Universes</option>
                  <option value="junior">JUNIOR</option>
                  <option value="nexus">NEXUS</option>
                  <option value="ascend">ASCEND</option>
                </select>
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Good Standing">Good Standing</option>
                  <option value="Warning">Warning</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                </select>
              </div>
            </section>

            {/* Conduct Records Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Conduct Records</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Student</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Class</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Universe</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Incidences</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Last Incident</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2 font-medium">{record.studentName}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{record.class}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn("px-1.5 py-0.5 rounded text-xs", "bg-primary/10 text-primary")}>
                            {record.universe}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="font-medium text-primary">{record.incidences}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{record.lastIncident}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span
                            className={cn(
                              "px-2 py-1 rounded text-xs",
                              `bg-${record.status === "Good Standing" ? "success" : record.status === "Warning" ? "warning" : "error"}/${20} text-${record.status === "Good Standing" ? "success" : record.status === "Warning" ? "warning" : "error"}`
                            )}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Conduct Statistics */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Conduct Statistics</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-border-border border-border bg-primary/5 border-primary">
                  <p className="text-xs text-primary mb-1">Students Tracked</p>
                  <p className="font-medium">{filteredRecords.length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-success/5 border-success">
                  <p className="text-xs text-success mb-1">Good Standing</p>
                  <p className="font-medium">{filteredRecords.filter((r) => r.status === "Good Standing").length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-warning/5 border-warning">
                  <p className="text-xs text-warning mb-1">Needs Attention</p>
                  <p className="font-medium">{filteredRecords.filter((r) => r.status !== "Good Standing").length}</p>
                </div>
              </div>
            </section>

            {/* Conduct Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Conduct records data is prototype-only for institutional behavior tracking demonstration</li>
                <li>All conduct records are sample data and not connected to live conduct management systems</li>
                <li>Incidence tracking is prototype-only — actual behavior management through official pastoral care channels</li>
                <li>Status classifications are institutional guidelines and may vary by school policy</li>
                <li>All data is prototype-only and not connected to external databases</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}