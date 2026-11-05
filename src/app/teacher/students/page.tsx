import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  StudentSummary,
  getStudentsForClassroom,
  getClassroomById,
  getTeacherClassrooms,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function StudentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get teacherId from query param
  const teacherId = searchParams.get("teacherId") || "teacher-1";

  // Verify teacher access
  const teacher = useDataProvider().getTeacherById(teacherId);

  if (!teacher) {
    return (
      <div className="p-8 text-center">
        <h2>Access Denied</h2>
        <p>Invalid or pending teacher account.</p>
        <button
          onClick={() => router.push("/sign-in?role=teacher")}
          className="mt-4 btn-primary"
        >
          Sign In as Teacher
        </button>
      </div>
    );
  }

  // Get teacher's classrooms for filter
  const classrooms = getTeacherClassrooms(teacherId);

  // Default to first classroom if no filter selected
  const defaultClassroom = classrooms[0]?.id || "";
  const selectedClassroomId = searchParams.get("classroomId") || defaultClassroom;

  // Get students for selected classroom
  const students = selectedClassroomId
    ? getStudentsForClassroom(selectedClassroomId)
    : [];

  const classroomName = selectedClassroomId
    ? getClassroomById(selectedClassroomId)?.name || "All Classes"
    : "All Classes";

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-screen">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/students"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Student Management
            </h1>

            {/* Classroom Filter */}
            <div className="bg-white rounded-xl p-4 shadow-sm border-border mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="text-sm text-muted-foreground mb-1 sm:mb-0 sm:pr-2">
                  Classroom:
                </label>
                <select
                  className="flex-1 rounded border-border px-3 py-2"
                  onChange={(e) =>
                    router.push(
                      `/teacher/students?classroomId=${e.target.value}`
                    )
                  }
                >
                  <option value="">All Classrooms</option>
                  {classrooms.map((classroom) => (
                    <option
                      key={classroom.id}
                      value={classroom.id}
                      selected={classroom.id === selectedClassroomId}
                    >
                      {classroom.name}
                    </option>
                  ))}
                </select>

                {/* Add Student CTA */}
                <button
                  className="btn-secondary sm:ml-auto"
                >
                  Add Student
                </button>
              </div>
            </div>

            {/* Students List Table */}
            <div className="bg-white rounded-xl overflow-x-auto shadow-sm border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Recent Assessment</TableHead>
                    <TableHead>Attention Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Image
                            src={student.avatar}
                            alt={student.fullName}
                            width: 32
                            height: 32
                            className="rounded-full object-cover"
                          />
                          <span className="font-medium">{student.fullName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{student.currentClass}</TableCell>
                      <TableCell>
                        <div className="w-24 h-1.5 bg-accent-soft rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full rounded-md"
                            style={{ width: `${student.learningProgress}%` }}
                          /></div>
                        </div>
                        <span className="text-xs">{student.learningProgress}%</span>
                      </TableCell>
                      <TableCell>{student.recentAssessmentScore || 0}%</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded text-xs",
                            student.attentionStatus === "on-track"
                              ? "bg-accent-soft text-accent"
                              : student.attentionStatus === "requires-review"
                                ? "bg-warning-soft text-warning"
                                : student.attentionStatus === "needs-practice"
                                  ? "bg-soft text-primary"
                                  : "bg-soft text-muted-foreground"
                          )}
                        >
                          {student.attentionStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <ViewStudentProfile student={student} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* No students CTA */}
                  {students.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-8 text-center text-muted-foreground">
                        No students found.
                        </br>
                        Select a classroom or add students to view the list.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Classroom Statistics Summary */}
            {classrooms.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                {classrooms.map((classroom) => {
                  const classStudents = getStudentsForClassroom(classroom.id);
                  return (
                    <div key={classroom.id} className="bg-white rounded-xl p-4 shadow-sm border-border">
                      <h4 className="font-medium text-sm mb-2">
                        {classroom.name}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <span>Total:</span>
                        <span className="font-bold">{classStudents.length}</span>
                        <span>On Track:</span>
                        <span>
                          {classStudents.filter(
                            (s) => s.attentionStatus === "on-track"
                          ).length}
                        </span>
                        <span>Needs Practice:</span>
                        <span>
                          {classStudents.filter(
                            (s) => s.attentionStatus === "needs-practice"
                          ).length}
                        </span>
                        <span>Requires Review:</span>
                        <span>
                          {classStudents.filter(
                            (s) => s.attentionStatus === "requires-review"
                          ).length}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}

/* Table component styles - inline for prototype */
interface TableProps {
  children: React.ReactNode;
}

function Table({ children }: TableProps) {
  return (
    <div>
      <table className="w-full">
        {children}
      </table>
    </div>
  );
}

function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-background">
      <tr>{children}</tr>
    </thead>
  );
}

function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-border hover:bg-background/50 transition-colors">
      {children}
    </tr>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="p-3 text-left text-xs font-medium text-muted-foreground uppercase"
    >
      {children}
    </th>
  );
}

function TableCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="p-3">
      {children}
    </td>
  );
}

function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody>{children}</tbody>
  );
}

/* View Student Profile inline component */
interface ViewStudentProfileProps {
  student: StudentSummary;
}
function ViewStudentProfile({ student }: ViewStudentProfileProps) {
  return (
    <div>
      <button
        className="text-primary hover-underline text-xs block"
      >
        View
      </button>
    </button>
  );
}