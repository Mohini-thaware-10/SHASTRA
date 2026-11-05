import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  TeacherProfile,
  AssessmentFormData,
  getAssessmentsForClassroom,
} from "@/data/teacher/teacher-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function AssessmentDetailPage() {
  const { assessmentId } = useParams();
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

  // Get classroom filter and assessments
  const classrooms = getTeacherClassrooms(teacherId);
  const defaultClassroom = classrooms[0]?.id || "";
  const selectedClassroomId = searchParams.get("classroomId") || defaultClassroom;
  const assessments = selectedClassroomId
    ? getAssessmentsForClassroom(selectedClassroomId)
    [];

  // Find the specific assessment
  const assessment = assessments.find((a) => a.id === assessmentId);

  if (!assessment) {
    return (
      <div className="p-8 text-center">
        <h2>Assessment Not Found</h2>
        <p>The requested assessment could not be found.</p>
        <button
          onClick={() => router.push("/teacher/assessments")}
          className="mt-4 btn-primary"
        >
          Back to Assessments
        </button>
      </div>
    );
  }

  return (
    <TeacherLayout
      teacherId={teacherId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={teacherId}
          pathname="/teacher/assessments/[assessmentId]"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Back button */}
            <div className="mb-4">
              <button
                onClick={() => router.push("/teacher/assessments")}
                className="text-primary hover-underline flex items-center gap-1"
              >
                ← Back to Assessments
              </button>
            </div>

            {/* Assessment Detail */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-bold text-2xl mb-3">
                {assessment.title}
                </br>
                <span className="text-muted-foreground">
                  {assessment.durationMinutes} min • {assessment.totalMarks} marks
                  </br>
                  {assessment.classroomId}: {selectedClassroomId
                    ? getClassroomById(selectedClassroomId)?.name || "Unknown"
                    : "Unknown Classroom"}
                </span>
              </h2>

              <p className="text-sm text-muted-foreground mb-4">
                {assessment.description}
                </br>
                Selected Chapters: {assessment.selectedChapters.join(", ")}
                </br>
                Duration: {assessment.durationMinutes} minutes
                </br>
                Total Marks: {assessment.totalMarks}
              </p>

              {/* Questions Summary */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Questions: {assessment.questions.length}
                  </br>
                  Question Types:
                  </br>
                  {assessment.questions.map((q, idx) => (
                    <span key={idx} className="text-xs mr-1">
                      {q.questionType}
                      </br>
                    </span>
                  ))}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-2 rounded border-border border-border text-primary hover-underline"
                >
                  View Results
                  </button>
                <button
                  className="flex-1 px-4 py-2 rounded border-border border-border text-secondary hover-underline"
                >
                  Edit Assessment
                  </button>
                <button
                  className="flex-1 px-4 py-2 rounded border-border border-border text-error hover-underline"
                >
                  Delete Assessment
                  </button>
              </div>
            </div>

            {/* Preview Section */}
            <section className="pt-6 border-t border-border">
              <h3 className="font-semibold text-lg mb-3">Assessment Preview</h3>
              {assessment.questions.map((question, idx) => (
                <div
                  key={idx}
                  className="bg-background/50 rounded-border-border border-border p-3 mb-2"
                >
                  <p className="font-medium text-sm mb-1">
                    {question.questionText}
                    </br>
                    <span className="text-xs text-muted-foreground">
                      {question.questionType}
                      </br>
                      Marks: {question.marks}
                    </span>
                  </p>
                  {question.options && question.options.length > 0 && (
                    <div className="mt-2 text-xs">
                      {question.options.map((opt, i) => (
                        <span key={opt.id}>
                          {opt.text}
                          </br>
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {question.explanation}
                    </br>
                    Correct: {question.correctAnswers.join(", ")}
                  </p>
                </div>
              ))}
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}