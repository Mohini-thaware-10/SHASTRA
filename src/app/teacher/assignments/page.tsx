import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  TeacherProfile,
  AssignmentFormData,
  getAssignmentsForClassroom,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function AssignmentsPage() {
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

  // Get classroom filter
  const classrooms = getTeacherClassrooms(teacherId);
  const defaultClassroom = classrooms[0]?.id || "";
  const selectedClassroomId = searchParams.get("classroomId") || defaultClassroom;

  // Get assignments for selected classroom
  const assignments = selectedClassroomId
    ? getAssignmentsForClassroom(selectedClassroomId)
    : [];

  const classroomName = selectedClassroomId
    ? getClassroomById(selectedClassroomId)?.name || "All Classrooms"
    : "All Classrooms";

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-screen">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/assignments"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Assignment Management
            </h1>

            {/* Classroom Filter */}
            <div className="bg-white rounded-xl p-4 shadow-sm border-border mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <label className="text-sm text-muted-foreground mb-1 sm:mb-0">
                  Classroom:
                </label>
                <select
                  className="flex-1 rounded border-border px-3 py-2"
                  onChange={(e) =>
                    router.push(
                      `/teacher/assignments?classroomId=${e.target.value}`
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

                <button className="btn-secondary sm:ml-auto">
                  Create Assignment
                </button>
              </div>
            </div>

            {/* Assignments List */}
            {assignments.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border-border">
                <p className="text-muted-foreground mb-4">
                  No assignments found. Create your first assignment.
                  </br>
                  <button className="mt-2 btn-primary">
                    Create First Assignment
                  </button>
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="bg-white rounded-xl p-4 shadow-sm border-border hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-medium text-sm mb-2">
                      {assignment.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {assignment.description}
                      </br>
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="text-primary hover-underline text-xs"
                      >
                        Review Submissions
                      </button>
                      <button
                        className="text-secondary hover-underline text-xs"
                      >
                        Mark Reviewed
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Create New Assignment Form */}
            <section className="mt-6 pt-6 border-t border-border">
              <h2 className="font-semibold text-lg mb-4">Create New Assignment</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    className="rounded border-border px-3 py-2 w-full"
                    placeholder="e.g. Physics Numerical Problems"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    className="rounded border-border px-3 py-2 w-full"
                    placeholder="e.g. Solve 10 numerical problems from Mechanics chapter"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">
                      Select Classroom
                    </label>
                    <select className="rounded border-border px-3 py-2 w-full">
                      <option value="">-- Select --</option>
                      {classrooms.map((classroom) => (
                        <option key={classroom.id} value={classroom.id}>
                          {classroom.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">
                      Subject
                    </label>
                    <select className="rounded border-border px-3 py-2 w-full">
                      <option value="">-- Select --</option>
                      <option value="Physics">Physics</option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Biology">Biology</option>
                      <option value="Accountancy">Accountancy</option>
                      <option value="Business Studies">Business Studies</option>
                      <option value="Economics">Economics</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="rounded border-border px-3 py-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">
                    Instructions
                  </label>
                  <textarea
                    rows="3"
                    className="rounded border-border px-3 py-2 w-full"
                    placeholder="e.g. Show all steps and formulae used"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary">
                  Create Assignment
                </button>
              </form>
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}