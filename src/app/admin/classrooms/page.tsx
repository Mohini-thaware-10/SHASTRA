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

export function AdminClassroomsPage() {
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

  // Mock classrooms data
  const classrooms = [
    { id: "cl-1", name: "Class 7 Science", level: "7", section: "A", universe: "nexus", teacher: "Mrs. Sharma", students: 42, status: "active" },
    { id: "cl-2", name: "Class 10 Mathematics", level: "10", section: "A", universe: "nexus", teacher: "Mr. Patel", students: 38, status: "active" },
    { id: "cl-3", name: "Class 11 Physics", level: "11", section: "A", universe: "ascend", teacher: "Mrs. Sharma", students: 35, status: "active" },
    { id: "cl-4", name: "Class 5 Mathematics", level: "5", section: "A", universe: "junior", teacher: "Ms. Singh", students: 30, status: "active" },
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
          pathname="/admin/classrooms"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Create Classroom Form */}
            <section className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">Create Classroom</h2>
              <form className="space-y-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Class Level
                    </label>
                  <select className="rounded border-border px-3 py-2 w-full">
                    <option value="">Select level</option>
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
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Section
                    </label>
                  <input
                    type="text"
                    className="rounded border-border px-3 py-2 w-full"
                    placeholder="e.g. A"
                    required
                    />
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Academic Year
                    </label>
                  <select className="rounded border-border px-3 py-2 w-full">
                    <option value="">Select academic year</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2023-2024">2023-2024</option>
                  </select>
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Learning Universe
                    </label>
                  <select className="rounded border-border px-3 py-2 w-full">
                    <option value="">Select universe</option>
                    <option value="junior">JUNIOR (Classes 1-5)</option>
                    <option value="nexus">NEXUS (Classes 6-10)</option>
                    <option value="ascend">ASCEND (Classes 11-12)</option>
                  </select>
                  </div>
                <button type="submit" className="w-full btn-primary">
                  Create Classroom
                  </button>
              </form>
            </section>

            {/* Classrooms List */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {classrooms.map((classroom) => (
                <div
                  key={classroom.id}
                  className="bg-white rounded-xl p-4 shadow-sm border-border hover:shadow-md transition-border"
                >
                  <div className="flex items-between justify-between">
                    <div>
                      <p className="font-medium text-sm">{classroom.name}</p>
                      <p className="text-xs text-muted-foreground">Level {classroom.level} — {classroom.universe}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Students: {classroom.students}</p>
                      <p className="text-xs text-muted-foreground">Teacher: {classroom.teacher}</p>
                    </div>
                  </div>
                  <div>
                    <button className="text-primary hover-underline text-xs">View Details</button>
                    <button className="text-secondary hover-underline text-xs">Edit</button>
                  </div>
                </div>
              ))}
              {classrooms.length === 0 && (
                <p className="col-span-3 text-center text-muted-foreground mb-4">
                  No classrooms found.
                  </br>
                  <a href="#" className="text-primary hover-underline">Create first classroom</a>
                  </p>
                )}
              )}
            </section>

            {/* Classroom Statistics */}
            {classrooms.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">Classroom Distribution</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-border-border border-border bg-primary/10">
                    <p className="text-xs text-primary mb-1">JUNIOR</p>
                    <p className="font-medium">{classrooms.filter((c) => c.universe === "junior").length}</p>
                  </div>
                  <div className="p-2 rounded-border-border border-border bg-success/10">
                    <p className="text-xs text-success mb-1">NEXUS</p>
                    <p className="font-medium">{classrooms.filter((c) => c.universe === "nexus").length}</p>
                  </div>
                  <div className="p-2 rounded-border-border border-border bg-info/10">
                    <p className="text-xs text-info mb-1">ASCEND</p>
                    <p className="font-medium">{classrooms.filter((c) => c.universe === "ascend").length}</p>
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