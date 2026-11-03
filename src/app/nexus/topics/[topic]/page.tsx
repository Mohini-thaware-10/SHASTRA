"use client";

import { useState, useEffect, useParams } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getNexusCurriculum, getNexusSubjectsForClass, getNexusSubjectColor, getNexusSubjectDisplay } from "@/lib/nexus/curriculum";
import type { NexusClass } from "@/types/dashboard";
import type { LearnerProfile } from "@/types/dashboard";

import { cn } from "@/lib/utils";

export default function NexusTopicPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const { subject } = useParams<{ subject: string }>();
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [topic, setTopic] = useState<any | null>(null);
  const [lessons, setLessons] = useState<NexusLessonStep[]>([]);
  const router = useRouter();

  useEffect(() => {
    const classNum = 7;
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    const fetchedTopic = getNexusCurriculum(classNum as NexusClass, (subject || "mathematics") as keyof typeof import("@/lib/nexus/curriculum").NEXUS_LOWER_CURRICULUM);
    setTopic(fetchedTopic.find((t: any) => t.id === topicId) || fetchedTopic[0] || null);

    if (fetchedTopic) {
      const lessons = getLessonsForNexusTopic(topicId, classNum as NexusClass);
      setLessons(lessons);
    }
  }, [topicId, subject]);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading student profile...</p>
      </div>
    );
  }

  const profile = learnerProfile;
  const classNum = profile.currentClass as NexusClass;
  const subjectKey = subject || "mathematics";

  if (!topic) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto p-4 md:p-6">
          <p className="text-2xl font-bold text-[theme.accent]">
            Topic not found
          </p>
          <Link
            href="/nexus/world"
            className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors"
          >
            ← Back to Subjects
          </Link>
        </div>
      </div>
    );
  }

  const color = getNexusSubjectColor(subjectKey);
  const displayName = getNexusSubjectDisplay(subjectKey);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 rounded-2xl bg-white p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              href="/nexus/world"
              className="text-[theme.accent] hover:text-[theme.accentDark] transition-colors text-sm font-medium"
            >
              ← Back to Subjects
            </Link>
            <span className="text-sm text-gray-600">
              {profile.fullName} • Class {profile.currentClass}
            </span>
          </div>
        </div>

        {/* Topic Header */}
        <div className="mb-6 rounded-2xl bg-white p-6 border border-gray-200" style={{ borderColor: color }}>
          <h2 className="text-xl font-bold mb-2" style={{ color }}>
            {topic.title}
          </h2>
          <p className="text-gray-600">
            {topic.description}
          </p>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="rounded-xl bg-gray-50 p-4 border border-gray-200 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => router.push(`/nexus/lessons/${lesson.id}`)}
            >
              <h3 className="font-medium text-[theme.accent] mb-1">
                {lesson.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {lesson.content}
              </p>
              <p className="text-gray-500 text-xs">
                {lesson.type.replace(/-/g, " ")}
              </p>
            </div>
          ))}
        </div>

 {/* Progress */}
        {lessons.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-600 text-sm">
              {lessons.length} lesson stages available
            </p>
            <p className="text-gray-500 text-xs">
              Start with the concept stage and progress through all stages
            </p>
          </div>
        )}

 {/* Navigation */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Select a lesson stage to begin learning.
          </p>
        </div>
      </div>
    </div>
  );
}