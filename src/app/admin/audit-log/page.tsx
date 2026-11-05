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

export function AdminAuditLogPage() {
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

  // Mock audit log data with prototype events
  const auditEvents = [
    { id: "ae-1", timestamp: "2024-05-15 10:30", user: "admin-1", action: "Classroom created", details: "Science Class 8 created", resource: "Classroom", resourceId: "cl-1" },
    { id: "ae-2", timestamp: "2024-05-15 10:15", user: "admin-1", action: "Teacher assigned", details: "Mrs. Sharma assigned to Class 8 Science", resource: "Teacher", resourceId: "tch-1" },
    { id: "ae-3", timestamp: "2024-05-15 09:45", user: "admin-1", action: "Enrolment approved", details: "Aarav Singh enrolment approved", resource: "Enrolment", resourceId: "en-1" },
    { id: "ae-4", timestamp: "2024-05-15 09:30", user: "admin-1", action: "Subject allocated", details: "Mathematics allocated to Class 5", resource: "Subject", resourceId: "sub-1" },
    { id: "ae-5", timestamp: "2024-05-15 09:15", user: "admin-1", action: "Assessment conducted", details: "Quarterly Mathematics Assessment conducted", resource: "Assessment", resourceId: "as-1" },
    { id: "ae-6", timestamp: "2024-05-15 08:45", user: "admin-1", action: "Student enrolled", details: "Vihaan Patel enrolment submitted", resource: "Enrolment", resourceId: "en-2" },
  ];

  // Filters
  const [resourceFilter, setResourceFilter] = useState<string | null>("all");
  const [actionFilter, setActionFilter] = useState<string | null>("all");

  const filteredEvents = auditEvents.filter((event) => {
    const resourceMatch = resourceFilter === "all" ? true : event.resource === resourceFilter;
    const actionMatch = actionFilter === "all" ? true : event.action.includes(actionFilter || "");
    return resourceMatch && actionMatch;
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
          pathname="/admin/audit-log"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Audit Log Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Audit Log
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Institutional activity tracking with prototype events.
                </br>
                All events are logged for administrative review and compliance.
                </br>
                Prototype data — not connected to live audit systems.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Events</p>
                  <p className="font-medium">{auditEvents.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date Range</p>
                  <p className="font-medium">Last 30 days</p>
                </div>
              </div>
            </section>

            {/* Audit Events Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Administrative Activity Timeline</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Timestamp</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">User</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Action</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Details</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Resource</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Resource ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="font-medium text-primary">{event.user}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2 font-medium text-primary">{event.action}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{event.details}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{event.resource}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{event.resourceId}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Event Distribution */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Activity Distribution</h3>
              <div className="grid grid-cols-3 gap-2">
                {["Classroom", "Teacher", "Enrolment", "Subject", "Assessment"].map((resource) => {
                  const count = filteredEvents.filter((e) => e.resource === resource).length;
                  if (count === 0) return null;
                  return (
                    <div key={resource} className="p-3 rounded-border-border border-border">
                      <p className="text-xs font-medium text-primary mb-1">{resource}</p>
                      <p className="font-medium">{count}</p>
                    </div>
                  );
                })}
                <div className="p-3 rounded-border-border border-border bg-primary/10 border-primary">
                  <p className="text-xs text-primary mb-1">Total</p>
                  <p className="font-medium">{filteredEvents.length}</p>
                </div>
              </div>
            </section>

            {/* Audit Log Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Audit log tracks institutional administrative activities for compliance and review</li>
                <li>All events are prototype-only and not connected to live audit systems</li>
                <li>Events are logged in real-time for administrative oversight</li>
                <li>Sensitive administrative actions are tracked for accountability</li>
                <li>Audit data retention policy applies — events older than 90 days are archived</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}