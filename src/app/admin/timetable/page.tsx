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

export function AdminTimetablePage() {
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

  // Mock timetable data
  const timetableSlots = [
    { id: "tt-1", day: "Monday", period: "1", class: "Class 8", subject: "Mathematics", teacher: "Mrs. Sharma", classroom: "Room 8A", universe: "nexus" },
    { id: "tt-2", day: "Monday", period: "2", class: "Class 8", subject: "Science", teacher: "Mr. Patel", classroom: "Lab 8", universe: "nexus" },
    { id: "tt-3", day: "Monday", period: "3", class: "Class 5", subject: "EVS", teacher: "Ms. Singh", classroom: "Room 5A", universe: "junior" },
    { id: "tt-4", day: "Monday", period: "4", class: "Class 11", subject: "Physics", teacher: "Mr. Desai", classroom: "Lab 11", universe: "ascend" },
    { id: "tt-5", day: "Monday", period: "5", class: "Class 10", subject: "Mathematics", teacher: "Mr. Patel", classroom: "Room 10A", universe: "nexus" },
    { id: "tt-6", day: "Tuesday", period: "1", class: "Class 8", subject: "English", teacher: "Ms. Kapoor", classroom: "Room 8A", universe: "nexus" },
    { id: "tt-7", day: "Tuesday", period: "2", class: "Class 5", subject: "Mathematics", teacher: "Mrs. Sharma", classroom: "Room 5A", universe: "junior" },
    { id: "tt-8", day: "Tuesday", period: "3", class: "Class 11", subject: "Chemistry", teacher: "Mrs. Singh", classroom: "Lab 11", universe: "ascend" },
    { id: "tt-9", day: "Tuesday", period: "4", class: "Class 10", subject: "Science", teacher: "Mr. Patel", classroom: "Lab 10", universe: "nexus" },
    { id: "tt-10", day: "Tuesday", period: "5", class: "Class 5", subject: "EVS", teacher: "Ms. Singh", classroom: "Room 5A", universe: "junior" },
  ];

  // Filters
  const [dayFilter, setDayFilter] = useState<string | null>("all");
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);

  const filteredSlots = timetableSlots.filter((slot) => {
    const dayMatch = dayFilter === "all" ? true : slot.day === dayFilter;
    const universeMatch = !universeFilter || slot.universe === universeFilter;
    return dayMatch && universeMatch;
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
          pathname="/admin/timetable"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Timetable Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Timetable Management
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sample timetable data for institutional planning.
                </br>
                Prototype data — not connected to live timetable systems.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setDayFilter(e.target.value)}
                >
                  <option value="all">All Days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setUniverseFilter(e.target.value)}
                >
                  <option value="">All Universes</option>
                  <option value="junior">JUNIOR</option>
                  <option value="nexus">NEXUS</option>
                  <option value="ascend">ASCEND</option>
                </select>
              </div>
            </section>

            {/* Timetable Slots Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Weekly Timetable Slots</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Day</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Period</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Class</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Subject</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Teacher</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Classroom</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Universe</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSlots.map((slot) => (
                      <tr key={slot.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2">
                          <span className="font-medium text-primary">{slot.day}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-primary">P{slot.period}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{slot.class}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2 font-medium">{slot.subject}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{slot.teacher}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{slot.classroom}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn("px-1.5 py-0.5 rounded text-xs", "bg-primary/10 text-primary")}>
                            {slot.universe}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Timetable Statistics */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Timetable Statistics</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-border-border border-border bg-primary/5 border-primary">
                  <p className="text-xs text-primary mb-1">Total Slots</p>
                  <p className="font-medium">{timetableSlots.length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-success/5 border-success">
                  <p className="text-xs text-success mb-1">Active Slots</p>
                  <p className="font-medium">{timetableSlots.length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-info/5 border-info">
                  <p className="text-xs text-info mb-1">Universes Covered</p>
                  <p className="font-medium">3 (JUNIOR, NEXUS, ASCEND)</p>
                </div>
              </div>
            </section>

            {/* Timetable Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Timetable data is prototype-only for institutional planning demonstration</li>
                <li>All slots are sample data and not connected to live scheduling systems</li>
                <li>Timetable management is available to authorized administrators only</li>
                <li>Period assignments and teacher allocations are prototype representations</li>
                <li>Room assignments are illustrative and not tied to physical infrastructure</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}