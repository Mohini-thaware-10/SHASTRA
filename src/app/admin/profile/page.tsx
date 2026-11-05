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

export function AdminProfilePage() {
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
          pathname="/admin/profile"
        />
        <main className="p-6">
          <div className="max-w-2xl mx-auto">

            {/* Administrator Profile */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-6">
                Administrator Profile
                </br>
                {institution.name}
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Full Name</label>
                  <input
                    type="text"
                    className="rounded border-border px-3 py-2 w-full bg-background"
                    readOnly
                    />
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Email</label>
                  <input
                    type="email"
                    className="rounded border-border px-3 py-2 w-full bg-background"
                    readOnly
                    />
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Role</label>
                  <select
                    className="rounded border-border px-3 py-2 w-full bg-background"
                    readOnly
                  >
                    <option value="super-admin">Super Administrator</option>
                    <option value="institute-admin">Institute Administrator</option>
                  </select>
                  </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Login Status</label>
                  <select
                    className="rounded border-border px-3 py-2 w-full bg-background"
                    readOnly
                  >
                    <option value="active">Active</option>
                    <option value="last-seen">Last seen: {new Date().toLocaleTimeString()}</option>
                  </select>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">
                    Profile data is prototype-only and not connected to a live user database.
                    </br>
                    Changes are local to this session.
                  </p>
                  <button
                    onClick={() => router.push("/admin/settings?adminId=admin-1")}
                    className="mt-3 btn-primary w-auto"
                  >
                    View Settings
                    </button>
                  </button>
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}