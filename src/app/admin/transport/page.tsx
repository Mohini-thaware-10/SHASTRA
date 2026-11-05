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

export function AdminTransportPage() {
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

  // Mock transport data
  const transportRoutes = [
    { id: "tr-1", routeName: "Route 1", pickupPoint: "Gate A", dropPoint: "Sector 4", class: "1-5", universe: "junior", vehicle: "Bus", capacity: 40, status: "active" },
    { id: "tr-2", routeName: "Route 2", pickupPoint: "Gate B", dropPoint: "Sector 7", class: "6-10", universe: "nexus", vehicle: "Bus", capacity: 50, status: "active" },
    { id: "tr-3", routeName: "Route 3", pickupPoint: "Gate C", dropPoint: "Sector 3", class: "11-12", universe: "ascend", vehicle: "Van", capacity: 15, status: "active" },
    { id: "tr-4", routeName: "Route 4", pickupPoint: "Gate A", dropPoint: "Sector 5", class: "1-8", universe: "junior+nexus", vehicle: "Bus", capacity: 55, status: "active" },
    { id: "tr-5", routeName: "Route 5", pickupPoint: "Gate D", dropPoint: "Sector 8", class: "1-12", universe: "all", vehicle: "Bus", capacity: 60, status: "maintenance" },
  ];

  // Filters
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>("all");

  const filteredRoutes = transportRoutes.filter((route) => {
    const universeMatch = !universeFilter || route.universe === universeFilter;
    const statusMatch = statusFilter === "all" ? true : route.status === statusFilter;
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
          pathname="/admin/transport"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Transport Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Transport Management
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sample transport route data for institutional student conveyance.
                </br>
                Prototype data — not connected to live transport systems.
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
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </section>

            {/* Transport Routes Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Transport Routes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Route</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Pickup</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Drop</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Classes</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Universe</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Vehicle</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Capacity</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRoutes.map((route) => (
                      <tr key={route.id} className="border-border border-border hover:bg-primary/5 transition-colors">
        <td className="border-border border-border px-4 py-2 font-medium">{route.routeName}</td>
        <td className="border-border border-border px-4 py-2">
          <span className="text-xs text-muted-foreground">{route.pickupPoint}</span>
        </td>
        <td className="border-border border-border px-4 py-2">
          <span className="text-xs text-muted-foreground">{route.dropPoint}</span>
        </td>
        <td className="border-border border-border px-4 py-2">
          <span className="text-xs text-muted-foreground">{route.class}</span>
        </td>
        <td className="border-border border-border px-4 py-2">
          <span className={cn("px-1.5 py-0.5 rounded text-xs", "bg-primary/10 text-primary")}>
            {route.universe}
          </span>
        </td>
        <td className="border-border border-border px-4 py-2">
          <span className="text-xs text-muted-foreground">{route.vehicle}</span>
        </td>
        <td className="border-border border-border px-4 py-2">
          <span className="font-medium">{route.capacity}</span>
        </td>
        <td className="border-border border-border px-4 py-2">
          <span
            className={cn(
              "px-2 py-1 rounded text-xs",
              `bg-${route.status === "active" ? "success" : "warning"}/${20} text-${route.status === "active" ? "success" : "warning"}`
            )}
          >
            {route.status}
          </span>
        </td>
      </tr>
    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Transport Statistics */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Transport Statistics</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-border-border border-border bg-primary/5 border-primary">
                  <p className="text-xs text-primary mb-1">Total Routes</p>
                  <p className="font-medium">{transportRoutes.length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-success/5 border-success">
                  <p className="text-xs text-success mb-1">Active Routes</p>
                  <p className="font-medium">{filteredRoutes.filter((r) => r.status === "active").length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-warning/5 border-warning">
                  <p className="text-xs text-warning mb-1">Maintenance</p>
                  <p className="font-medium">{filteredRoutes.filter((r) => r.status === "maintenance").length}</p>
                </div>
              </div>
            </section>

            {/* Transport Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Transport route data is prototype-only for institutional conveyance demonstration</li>
                <li>All route records are sample data and not connected to live transport management systems</li>
                <li>Route status tracking is prototype-only — actual transport scheduling through official transport departments</li>
                <li>Vehicle capacities are illustrative and not tied to real vehicle specifications</li>
                <li>All data is prototype-only and not connected to external databases</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}