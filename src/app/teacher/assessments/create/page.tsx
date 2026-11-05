import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  TeacherProfile,
  AssessmentFormData,
  getTeacherClassrooms,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function AssessmentCreationPage() {
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

  // Get teacher's classrooms
  const classrooms = getTeacherClassrooms(teacherId);

  // Form state
  const [formData, setFormData] = useState<AssessmentFormData>({
    title: "",
    description: "",
    classroomId: classrooms[0]?.id || "",
    subject: "Physics",
    durationMinutes: 60,
    totalMarks: 80,
    selectedChapters: [],
    questions: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In prototype, just log the form data and navigate back
    console.log("Assessment created:", formData);
    router.push("/teacher/assessments");
  };

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/assessments/create"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Create Assessment
            </h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Classroom Selection */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Select Classroom
                  </label>
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  value={formData.classroomId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      classroomId: e.target.value,
                    })
                  }
                >
                  <option value="">-- Select --</option>
                  {classrooms.map((classroom) => (
                    <option
                      key={classroom.id}
                      value={classroom.id}
                    >
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Select Subject
                  </label>
                <select
                  className="rounded border-border px-3 py-2 w-full"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      subject: e.target.value,
                    })
                  }
                >
                  <option value="">-- Select --</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Accountancy">Accountancy</option>
                  <option value="Business Studies">Business Studies</option>
                  <option value="Economics">Economics</option>
                  <option value="History">History</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Literature">Literature</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Duration (minutes)
                  </label>
                <input
                  type="number"
                  className="rounded border-border px-3 py-2 w-full"
                  value={formData.durationMinutes}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      durationMinutes: Number(e.target.value),
                    })
                  }
                  placeholder="e.g. 60"
                  required
                />
              </div>

              {/* Total Marks */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Total Marks
                  </label>
                <input
                  type="number"
                  className="rounded border-border px-3 py-2 w-full"
                  value={formData.totalMarks}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalMarks: Number(e.target.value),
                    })
                  }
                  placeholder="e.g. 80"
                  required
                  />
                </div>

              {/* Selected Chapters */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Selected Chapters
                  </label>
                <textarea
                  rows="3"
                  className="rounded border-border px-3 py-2 w-full"
                  placeholder="e.g. Mechanics, Thermodynamics, Electrostatics"
                  value={formData.selectedChapters.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      selectedChapters: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter((s) => s.length > 0),
                    })
                  }
                  required
                ></textarea>
              </div>

              {/* Questions Addendum */}
              <div>
                <label className="block text-sm text-muted-foreground mb-1">
                  Questions (prototype: 2 sample questions)
                  </label>
                <p className="text-xs text-muted-foreground">
                  In prototype mode, 2 sample questions are included.
                </p>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {/* Question 1 */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Question 1:
                      </p>
                    <textarea
                      rows="2"
                      className="rounded border-border px-2 py-1 w-full text-xs"
                      placeholder="e.g. Derivation of equations of motion"
                    ></textarea>
                  </div>
                  {/* Question 2 */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">
                      Question 2:
                      </p>
                    <textarea
                      rows="2"
                      className="rounded border-border px-2 py-1 w-full text-xs"
                      placeholder="e.g. State Kirchhoff's laws"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full btn-primary">
                Create Assessment
                </button>
              </button>
            </form>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}