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

export function AdminInstitutionPage() {
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
          pathname="/admin/institution"
        />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">

            {/* Institution Profile */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Institution Profile
                </br>
                {institution.name}
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Institution Name
                    </label>
                  <input
                    type="text"
                    value={institution.name}
                    className="rounded border-border px-3 py-2 w-full"
                    readOnly
                    />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Academic Board
                    </label>
                  <select
                    className="rounded border-border px-3 py-2 w-full"
                    readOnly
                  >
                    <option value="CBSE">CBSE</option>
                    <option value="ICSE">ICSE</option>
                    <option value="State Board">State Board</option>
                    <option value="IB">IB</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Academic Year
                    </label>
                  <input
                    type="text"
                    value={institution.academicYear}
                    className="rounded border-border px-3 py-2 w-full"
                    readOnly
                    />
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Location
                    </label>
                  <input
                    type="text"
                    value={institution.location || "Not specified"}
                    className="rounded border-border px-3 py-2 w-full"
                    readOnly
                    />
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Contact Email
                    </label>
                  <input
                    type="text"
                    value={institution.contactEmail || "not specified"}
                    className="rounded border-border px-3 py-2 w-full"
                    readOnly
                    />
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    Institution data is prototype-only and not connected to a live database.
                    </br>
                    Changes are local to this session.
                  </p>
                </div>
              </form>
            </section>

            {/* Institution Description */}
            <section>
              <h2 className="font-medium text-sm text-muted-foreground mb-3">
                Institution Description
                </br>
                {institution.description || "No description provided"}
                </br>
                <small className="text-xs text-muted-foreground">
                  Prototype content — not connected to institutional records.
                  </small>
                </small>
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {institution.description || "Institution description not provided. This is prototype content for the SHATRA institutional management portal."}
                </br>
                <small className="text-xs text-muted-foreground">
                  Institution: {institution.name}
                  </br>
                  Academic Year: {institution.academicYear}
                  </br>
                  Board: {institution.board}
                  </br>
                  Total Students: {institution.totalStudents}
                  </br>
                  Active Teachers: {institution.activeTeachers}
                  </br>
                  Classrooms: {institution.classrooms}
                  </br>
                  Assessments: {institution.assessments}
                </small>
              </p>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}