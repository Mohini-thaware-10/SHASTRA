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

export function AdminFacilitiesPage() {
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

  // Mock facilities data
  const facilities = [
    { id: "fac-1", name: "Science Laboratory", type: "Lab", class: "11-12", universe: "ascend", capacity: 30, status: "active", lastMaintenance: "2024-05-01" },
    { id: "fac-2", name: "Mathematics Laboratory", type: "Lab", class: "6-10", universe: "nexus", capacity: 40, status: "active", lastMaintenance: "2024-04-15" },
    { id: "fac-3", name: "Junior Activity Room", type: "Room", class: "1-5", universe: "junior", capacity: 35, status: "active", lastMaintenance: "2024-05-10" },
    { id: "fac-4", name: "Computer Lab", type: "Lab", class: "6-10", universe: "nexus", capacity: 35, status: "active", lastMaintenance: "2024-04-20" },
    { id: "fac-5", name: "Audio-Visual Room", type: "Room", class: "1-12", universe: "all", capacity: 50, status: "active", lastMaintenance: "2024-05-12" },
    { id: "fac-6", name: "Sports Complex", type: "Facility", class: "1-12", universe: "all", capacity: 200, status: "active", lastMaintenance: "2024-04-25" },
    { id: "fac-7", name: "Library", type: "Room", class: "1-12", universe: "all", capacity: 40, status: "active", lastMaintenance: "2024-05-14" },
    { id: "fac-8", name: "Art Studio", type: "Room", class: "1-12", universe: "all", capacity: 25, status: "maintenance", lastMaintenance: "2024-03-20" },
  ];

  // Filters
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>("all");

  const filteredFacilities = facilities.filter((facility) => {
    const universeMatch = !universeFilter || facility.universe === universeFilter;
    const statusMatch = statusFilter === "all" ? true : facility.status === statusFilter;
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
          pathname="/admin/facilities"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Facilities Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Facilities Management
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sample facilities data for institutional asset management.
                </br>
                Prototype data — not connected to live facilities systems.
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
                  <option value="all">All</option>
                </select>
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
              </div>
            </section>

            {/* Facilities Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Facilities Inventory</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Facility</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Type</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Classes</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Universe</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Capacity</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Last Maintenance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFacilities.map((facility) => (
                      <tr key={facility.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2 font-medium">{facility.name}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{facility.type}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{facility.class}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn("px-1.5 py-0.5 rounded text-xs", "bg-primary/10 text-primary")}>
                            {facility.universe}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="font-medium">{facility.capacity}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span
                            className={cn(
                              "px-2 py-1 rounded text-xs",
                              `bg-${facility.status === "active" ? "success" : "warning"}/${20} text-${facility.status === "active" ? "success" : "warning"}`
                            )}
                          >
                            {facility.status}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{facility.lastMaintenance}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Facilities Statistics */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Facilities Statistics</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-border-border border-border bg-primary/5 border-primary">
                  <p className="text-xs text-primary mb-1">Total Facilities</p>
                  <p className="font-medium">{facilities.length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-success/5 border-success">
                  <p className="text-xs text-success mb-1">Active</p>
                  <p className="font-medium">{filteredFacilities.filter((f) => f.status === "active").length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-warning/5 border-warning">
                  <p className="text-xs text-warning mb-1">Maintenance</p>
                  <p className="font-medium">{filteredFacilities.filter((f) => f.status === "maintenance").length}</p>
                </div>
              </div>
            </section>

            {/* Facilities Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Facilities data is prototype-only for institutional asset management demonstration</li>
                <li>All facility records are sample data and not connected to live facilities management systems</li>
                <li>Status tracking is prototype-only — actual maintenance scheduling through official channels</li>
                <li>Capacity figures are illustrative and not tied to real measurements</li>
                <li>All data is prototype-only and not connected to external databases</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}