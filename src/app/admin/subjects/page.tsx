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

export function AdminSubjectsPage() {
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

  // Mock subjects data with curriculum allocation
  const subjects = [
    { id: "sub-1", name: "Mathematics", code: "MATH", universe: "junior", classes: ["1", "2", "3", "4", "5"], allocatedClassrooms: 5, totalSections: 5, status: "active" },
    { id: "sub-2", name: "Science", code: "SCI", universe: "nexus", classes: ["6", "7", "8", "9", "10"], allocatedClassrooms: 6, totalSections: 6, status: "active" },
    { id: "sub-3", name: "Physics", code: "PHYS", universe: "ascend", classes: ["11", "12"], allocatedClassrooms: 2, totalSections: 2, status: "active" },
    { id: "sub-4", name: "Chemistry", code: "CHEM", universe: "ascend", classes: ["11", "12"], allocatedClassrooms: 2, totalSections: 2, status: "active" },
    { id: "sub-5", name: "Biology", code: "BIO", universe: "ascend", classes: ["11", "12"], allocatedClassrooms: 2, totalSections: 2, status: "active" },
    { id: "sub-6", name: "English", code: "ENG", universe: "all", classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], allocatedClassrooms: 12, totalSections: 12, status: "active" },
    { id: "sub-7", name: "History", code: "HIST", universe: "all", classes: ["6", "7", "8", "9", "10", "11", "12"], allocatedClassrooms: 7, totalSections: 7, status: "active" },
    { id: "sub-8", name: "Geography", code: "GEOG", universe: "all", classes: ["6", "7", "8", "9", "10", "11", "12"], allocatedClassrooms: 7, totalSections: 7, status: "active" },
    { id: "sub-9", name: "Computer Science", code: "CS", universe: "nexus", classes: ["6", "7", "8", "9", "10"], allocatedClassrooms: 5, totalSections: 5, status: "active" },
  ];

  return (
    <TeacherLayout
      teacherId="admin-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="admin-1"
          pathname="/admin/subjects"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Subject Allocation Summary */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Subject Allocation Overview
                </br>
                {institution.name}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Subjects</p>
                  <p className="font-medium">{subjects.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Subjects</p>
                  <p className="font-medium">{subjects.filter((s) => s.status === "active").length}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Distribution across JUNIOR, NEXUS, and ASCEND universes.
                </br>
                {subjects.filter((s) => s.universe === "junior").length} JUNIOR subjects
                </br>
                {subjects.filter((s) => s.universe === "nexus").length} NEXUS subjects
                </br>
                {subjects.filter((s) => s.universe === "ascend").length} ASCEND subjects
                </br>
                {subjects.filter((s) => s.universe === "all").length} cross-universe subjects
              </p>
            </section>

            {/* Subject Management Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Subject List</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Subject</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Code</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Universes</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Classes</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Sections</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr key={subject.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2 font-medium">{subject.name}</td>
                        <td className="border-border border-border px-4 py-2 text-code">{subject.code}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn(
                            "px-1.5 py-0.5 rounded text-xs",
                            "bg-primary/10 text-primary"
                          )}>
                            {subject.universe}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          {subject.classes.map((cls) => `${cls}`).join(", ")}
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          {subject.totalSections}
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span
                            className={cn(
                              "px-2 py-1 rounded text-xs",
                              "bg-success/20 text-success"
                            )}
                          >
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Add New Subject */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-semibold text-lg mb-3">Add New Subject</h3>
              <form className="space-y-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Subject Name</label>
                  <input type="text" className="rounded border-border px-3 py-2 w-full" required />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Subject Code</label>
                  <input type="text" className="rounded border-border px-3 py-2 w-full" placeholder="e.g. MATH" required />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Universe</label>
                  <select className="rounded border-border px-3 py-2 w-full">
                    <option value="">Select universe</option>
                    <option value="junior">JUNIOR (Classes 1-5)</option>
                    <option value="nexus">NEXUS (Classes 6-10)</option>
                    <option value="ascend">ASCEND (Classes 11-12)</option>
                    <option value="all">All Universes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Classes</label>
                  <select className="rounded border-border px-3 py-2 w-full" multiple>
                    <option value="1">Class 1</option>
                    <option value="2">Class 2</option>
                    <option value="3">Class 3</option>
                    <option value="4">Class 4</option>
                    <option value="5">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                </div>
                <button type="submit" className="w-full btn-primary">
                  Add Subject
                  </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}

