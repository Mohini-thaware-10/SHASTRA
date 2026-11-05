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

export default function AdminDashboard() {
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

  return (
    <TeacherLayout
      teacherId="admin-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="admin-1"
          pathname="/admin"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Institution Summary */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Institution Overview
                </br>
                {institution.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Institution Name</p>
                  <p className="font-medium">{institution.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Academic Board</p>
                  <p className="font-medium">{institution.board}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Academic Year</p>
                  <p className="font-medium">{institution.academicYear}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-sm",
                      "bg-success/20 text-success"
                    )}
                  >
                    Active
                  </span>
                </div>
              </div>
            </section>

            {/* Institutional Metrics */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">Institutional Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                  <p className="font-medium text-2xl">{institution.totalStudents}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Teachers</p>
                  <p className="font-medium text-2xl">{institution.activeTeachers}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Classrooms</p>
                  <p className="font-medium text-2xl">{institution.classrooms}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assessments</p>
                  <p className="font-medium text-2xl">{institution.assessments}</p>
                </div>
              </div>
            </section>

            {/* Academic Overview */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">Academic Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">JUNIOR (Classes 1-5)</p>
                  <p className="font-medium">{institution.juniorStudents} students</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">NEXUS (Classes 6-10)</p>
                  <p className="font-medium text-2xl">{institution.nexusStudents} students</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">ASCEND (Classes 11-12)</p>
                  <p className="font-medium text-2xl">{institution.ascendStudents} students</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subjects</p>
                  <p className="font-medium text-2xl">{institution.subjects}</p>
                </div>
              </div>
            </section>

            {/* Administrative Action Centre */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">Administrative Action Centre</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="w-full px-4 py-3 rounded-border-border border-border border-border text-primary hover-underline">
                  Create Classroom
                  </button>
                <button className="w-full px-4 py-3 rounded-border-border border-border text-secondary hover-underline">
                  Review Enrolments
                  </button>
                <button className="w-full px-4 py-3 rounded-border-border border-border text-secondary hover-underline">
                  Add Teacher
                  </button>
                <button className="w-full px-4 py-3 rounded-border-border border-border text-secondary hover-underline">
                  Assign Subjects
                  </button>
              </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border">
              <h2 className="font-semibold text-lg mb-3">Recent Institutional Activity</h2>
              <div className="space-y-3">
                <div className="p-3 rounded-border-border border-border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">New Classroom</span> — Science Class 8 created
                    </br>
                    <small className="text-xs">2 hours ago</small>
                  </p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Teacher Assigned</span> — Mrs. Sharma to Class 8 Science
                    </br>
                    <small className="text-xs">Yesterday</small>
                  </p>
                </div>
                <div className="p-3 rounded-border-border border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Assessment Conducted</span> — Quarterly Mathematics Assessment
                    </br>
                    <small className="text-xs">3 days ago</small>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}