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

export function AdminParentLinksPage() {
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

  // Mock parent-links data with relationship statuses
  const parentLinks = [
    { id: "pl-1", studentId: "st-1", studentName: "Aarav Singh", parentName: "Mr. Singh", relationship: "Father", status: "active", contactMethod: "Email", lastContact: "2024-05-10" },
    { id: "pl-2", studentId: "st-2", studentName: "Vihaan Patel", parentName: "Mrs. Patel", relationship: "Mother", status: "active", contactMethod: "SMS", lastContact: "2024-05-08" },
    { id: "pl-3", studentId: "st-3", studentName: "Ananya Sharma", parentName: "Mrs. Sharma", relationship: "Mother", status: "active", contactMethod: "Portal", lastContact: "2024-05-12" },
    { id: "pl-4", studentId: "st-4", studentName: "Kiara Singh", parentName: "Mrs. Singh", relationship: "Mother", status: "pending", contactMethod: "Email", lastContact: "2024-04-28" },
    { id: "pl-5", studentId: "st-5", studentName: "Aditya Kumar", parentName: "Mr. Kumar", relationship: "Father", status: "active", contactMethod: "Portal", lastContact: "2024-05-15" },
    { id: "pl-6", studentId: "st-6", studentName: "Sia Rawat", parentName: "Mrs. Rawat", relationship: "Mother", status: "active", contactMethod: "SMS", lastContact: "2024-05-14" },
  ];

  // Filters
  const [statusFilter, setStatusFilter] = useState<string | null>("all");
  const [relationshipFilter, setRelationshipFilter] = useState<string | null>("all");

  const filteredParentLinks = parentLinks.filter((link) => {
    const statusMatch = statusFilter === "all" ? true : link.status === statusFilter;
    const relationshipMatch = relationshipFilter === "all" ? true : link.relationship === relationshipFilter;
    return statusMatch && relationshipMatch;
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
          pathname="/admin/parent-links"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Parent-Links Oversight */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Parent-Links Oversight
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Institutional parent-teacher relationship management with relationship statuses.
                </br>
                Prototype data — not connected to live parent databases.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Parent Links</p>
                  <p className="font-medium">{parentLinks.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Relationships</p>
                  <p className="font-medium">{parentLinks.filter((l) => l.status === "active").length}</p>
                </div>
              </div>
            </section>

            {/* Parent-Links Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Parent-Teacher Relationships</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Student</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Parent</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Relationship</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Contact Method</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Last Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParentLinks.map((link) => (
                      <tr key={link.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2 font-medium">{link.studentName}</td>
                        <td className="border-border border-border px-4 py-2">{link.parentName}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn("px-1.5 py-0.5 rounded text-xs", "bg-primary/10 text-primary")}>
                            {link.relationship}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span
                            className={cn(
                              "px-2 py-1 rounded text-xs",
                              `bg-${link.status === "active" ? "success" : "warning"}/${20} text-${link.status === "active" ? "success" : "warning"}`
                            )}
                          >
                            {link.status}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{link.contactMethod}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{link.lastContact}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

            {/* Relationship Status Distribution */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Relationship Status Distribution</h3>
              <div className="grid grid-cols-3 gap-2">
                {["active", "pending"].map((status) => {
                  const count = filteredParentLinks.filter((l) => l.status === status).length;
                  if (count === 0) return null;
                  return (
                    <div key={status} className="p-3 rounded-border-border border-border">
                      <p className="text-xs font-medium text-{status === "active" ? "success" : "warning"} mb-1">{status}</p>
                      <p className="font-medium">{count}</p>
                    </div>
                  );
                })}
                <div className="p-3 rounded-border-border border-border bg-primary/10 border-primary">
                  <p className="text-xs text-primary mb-1">Total</p>
                  <p className="font-medium">{filteredParentLinks.length}</p>
                </div>
              </div>
            </section>

            {/* Parent-Links Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Parent-links oversight maintains relationship statuses for institutional communication</li>
                <li>All data is prototype-only and not connected to live parent databases</li>
                <li>Contact methods are prototype representations — actual contact through official channels</li>
                <li>Relationship statuses are managed by institution administrators</li>
                <li>Privacy is maintained — no public display of parent contact information</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}