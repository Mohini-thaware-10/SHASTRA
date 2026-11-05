import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  LearnerContext,
  MockTutorResponseProvider,
} from "@/types/intelligence/models";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function TutorTopicsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get studentId from query param
  const studentId = searchParams.get("studentId") || "student-1";

  // Verify student access
  const { dataProvider } = useDataProvider();

  // State for filters
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Mock topics data
  const mockTopics = [
    { id: "t-1", subject: "Mathematics", class: "8", topic: "Fractions", status: "mastered", prerequisite: null },
    { id: "t-2", subject: "Mathematics", class: "8", topic: "Decimals", status: "developing", prerequisite: "Fractions" },
    { id: "t-3", subject: "Mathematics", class: "8", topic: "Algebra", status: "needs-more-practice", prerequisite: "Decimals" },
    { id: "t-4", subject: "Science", class: "8", topic: "Cell Structure", status: "strong", prerequisite: null },
    { id: "t-5", subject: "Science", class: "8", topic: "Photosynthesis", status: "developing", prerequisite: "Cell Structure" },
    { id: "t-6", subject: "Mathematics", class: "7", topic: "Geometry", status: "mastered", prerequisite: null },
    { id: "t-7", subject: "Mathematics", class: "7", topic: "Angles", status: "developing", prerequisite: "Geometry" },
  ];

  // Filter topics
  const filteredTopics = mockTopics.filter((topic) => {
    const subjectMatch = !selectedSubject || topic.subject === selectedSubject;
    const classMatch = !selectedClass || topic.class === selectedClass;
    const searchMatch = !searchQuery || topic.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return subjectMatch && classMatch && searchMatch;
  });

  // Set selected topic when clicked
  useEffect(() => {
    if (selectedTopic) {
      const topic = mockTopics.find((t) => t.id === selectedTopic);
      if (topic) {
        setSelectedSubject(topic.subject);
        setSelectedClass(topic.class);
      }
    }
  }, [selectedTopic]);

  return (
    <TeacherLayout
      teacherId="parent-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="parent-1"
          pathname="/tutor/topics"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Filters */}
            <section className="bg-white rounded-xl p-4 shadow-sm border-border mb-6">
              <h3 className="font-semibold text-sm text-muted-foreground mb-3">Filter Topics</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Subject</p>
                  <select
                    className="rounded border-border px-2 py-1 w-full"
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Class</p>
                  <select
                    className="rounded border-border px-2 py-1 w-full"
                    onChange={(e) => setSelectedClass(e.target.value)}
                  >
                    <option value="">All Classes</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-1">Search</p>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded border-border px-2 py-1 w-full"
                  placeholder="Search topics..."
                />
              </div>
            </section>

            {/* Topics List */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border">
              <h3 className="font-semibold text-lg mb-3">Topic Explorer</h3>
              {filteredTopics.length === 0 ? (
                <p className="text-center text-muted-foreground mb-4">
                  No topics found with the current filters.
                  </br>
                  <a href="/tutor/topics" className="text-primary hover-underline">Clear filters</a>
                  </br>
                  <a href="/tutor/topics?studentId={studentId}" className="text-primary hover-underline">
                    Show all topics
                    </a>
                  </p>
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="p-3 rounded-border-border border-border border-border cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => setSelectedTopic(topic.id)}
                    >
                      <div className="flex items-between justify-between">
                        <div>
                          <p className="font-medium text-sm">{topic.topic}</p>
                          <p className="text-xs text-muted-foreground">{topic.subject} — Class {topic.class}</p>
                        </div>
                        <span className="text-xs font-medium">
                          {topic.status}
                          </br>
                          {topic.prerequisite && `Prerequisite: ${topic.prerequisite}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Topic Details */}
              {selectedTopic && (
                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="font-semibold text-lg mb-3">Topic Details</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Topic: {selectedTopic}
                    </br>
                    Subject: {selectedSubject || "All"}
                    </br>
                    Class: {selectedClass || "All"}
                  </p>
                  <p className="text-sm text-primary mb-2">
                    {mockTopics.find((t) => t.id === selectedTopic)?.status || "unknown"}
                    status.
                    </br>
                    {mockTopics.find((t) => t.id === selectedTopic)?.prerequisite && `Prerequisite: ${mockTopics.find((t) => t.id === selectedTopic)?.prerequisite}`}
                    </br>
                  </p>
                  <p className="text-sm text-primary">
                    {mockTopics.find((t) => t.id === selectedTopic)?.status === "mastered"
                      ? "This topic has been mastered."
                      : mockTopics.find((t) => t.id === selectedTopic)?.status === "developing"
                        ? "This topic requires continued practice."
                        : "This topic needs more practice."
                      }
                    </p>
                  </p>
                  <button
                    onClick={() => setSelectedTopic(null)}
                    className="mt-2 text-primary hover-underline text-sm">
                    Close
                    </button>
                  </button>
                </div>
              )}
            </section>

            {/* Prerequisite Topics */}
            {selectedTopic && (
              <section className="mt-6 pt-6 border-t border-border">
                <h3 className="font-medium text-sm text-muted-foreground mb-3">Prerequisite Topics</h3>
                {mockTopics
                  .filter((t) => t.prerequisite === selectedTopic)
                  .map((topic) => (
                    <div
                      key={topic.id}
                      className="p-2 rounded-border-border border-border border-border mb-2">
                        <p className="text-sm text-primary">
                          <strong>{topic.topic}</strong> — Class {topic.class} — {topic.subject}
                          </br>
                          {topic.status === "mastered"
                            ? "Already mastered — can proceed."
                            : topic.status === "developing"
                              ? "In progress — continue practice."
                              : "Needs more practice — review recommended."
                          }
                        </p>
                      </div>
                    ))}
                  )}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}