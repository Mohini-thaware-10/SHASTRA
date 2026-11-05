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

export function AdminGradingPage() {
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

  // Mock grading data
  const gradeCategories = [
    { id: "gc-1", name: "Formative Assessment", weight: 40, description: " ongoing assessment throughout the term", color: "primary" },
    { id: "gc-2", name: "Summative Assessment", weight: 60, description: "end-of-term examinations and projects", color: "success" },
    { id: "gc-3", name": "Class Participation", weight: 10, description: "student engagement and contribution in class", color: "info" },
  ];

  // Mock student grades
  const studentGrades = [
    { id: "gr-1", studentId: "st-1", studentName: "Aarav Singh", class: "8", subject: "Mathematics", universe: "nexus", formative: 85, summative: 78, participation: 90, overall: 81 },
    { id: "gr-2", studentId: "st-2", studentName: "Vihaan Patel", class: "8", subject: "Mathematics", universe: "nexus", formative: 72, summative: 65, participation: 75, overall: 70 },
    { id: "gr-3", studentId: "st-3", studentName: "Ananya Sharma", class: "10", subject: "Science", universe: "nexus", formative: 78, summative: 82, participation: 85, overall: 81 },
    { id: "gr-4", studentId: "st-4", studentName: "Kiara Singh", class: "5", subject: "EVS", universe: "junior", formative: 90, summative: 88, participation: 80, overall: 86 },
    { id: "gr-5", studentId: "st-5", studentName: "Aditya Kumar", class: "11", subject: "Physics", universe: "ascend", formative: 70, summative: 65, participation: 72, overall: 68 },
    { id: "gr-6", studentId: "st-6", studentName: "Sia Rawat", class: "5", subject: "EVS", universe: "junior", formative: 82, summative: 75, participation: 78, overall: 78 },
  ];

  // Filters
  const [universeFilter, setUniverseFilter] = useState<string | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);

  const filteredGrades = studentGrades.filter((grade) => {
    const universeMatch = !universeFilter || grade.universe === universeFilter;
    const subjectMatch = !subjectFilter || grade.subject === subjectFilter;
    return universeMatch && subjectMatch;
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
          pathname="/admin/grading"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Grading Management */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-4">
                Grading Management
                </br>
                {institution.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sample grading data for institutional academic assessment.
                </br>
                Prototype data — not connected to live grading systems.
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
                </select>
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  onChange={(e) => setSubjectFilter(e.target.value)}
                >
                  <option value="">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="EVS">EVS/Science</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
            </section>

            {/* Student Grades Table */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-lg mb-3">Student Grades Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Student</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Class</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Subject</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Universe</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Formative</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Summative</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Participation</th>
                      <th className="border-border border-border px-4 py-2 text-left text-xs font-medium text-muted-foreground">Overall</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGrades.map((grade) => (
                      <tr key={grade.id} className="border-border border-border hover:bg-primary/5 transition-colors">
                        <td className="border-border border-border px-4 py-2 font-medium">{grade.studentName}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">{grade.class}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2 font-medium">{grade.subject}</td>
                        <td className="border-border border-border px-4 py-2">
                          <span className={cn("px-1.5 py-0.5 rounded text-xs", "bg-primary/10 text-primary")}>
                            {grade.universe}
                          </span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-primary">{grade.formative}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-success">{grade.summative}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="text-info">{grade.participation}</span>
                        </td>
                        <td className="border-border border-border px-4 py-2">
                          <span className="font-medium text-success">{grade.overall}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Grading Statistics */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Grading Statistics</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-border-border border-border bg-primary/5 border-primary">
                  <p className="text-xs text-primary mb-1">Students Tracked</p>
                  <p className="font-medium">{filteredGrades.length}</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-success/5 border-success">
                  <p className="text-xs text-success mb-1">Average Overall</p>
                  <p className="font-medium text-success">79.4</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-info/5 border-info">
                  <p className="text-xs text-info mb-1">Average Formative</p>
                  <p className="font-medium text-info">79.7</p>
                </div>
                <div className="p-3 rounded-border-border border-border bg-warning/5 border-warning">
                  <p className="text-xs text-warning mb-1">Average Summative</p>
                  <p className="font-medium text-warning">73.8</p>
                </div>
              </div>
            </section>

            {/* Grading Notes */}
            <section className="mt-6 pt-6 border-t border-border">
              <h3 className="font-medium text-sm text-muted-foreground mb-3">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Grading data is prototype-only for institutional academic assessment demonstration</li>
                <li>All grade records are sample data and not connected to live grading systems</li>
                <li>Grade calculations are prototype representations and may not reflect actual assessment policies</li>
                <li>Weightages (Formative: 40%, Summative: 60%) are standard institutional guidelines</li>
                <li>All data is prototype-only and not connected to external databases</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}