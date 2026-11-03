"use client";

import { useState, useEffect, useParams } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getNexusCurriculum, getNexusSubjectsForClass } from "@/lib/nexus/curriculum";
import type { NexusClass } from "@/types/dashboard";
import type { LearnerProfile } from "@/types/dashboard";

import { cn } from "@/lib/utils";

export default function NexusSubjectsPage() {
  const { subject } = useParams<{ subject: string }>();
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [topics, setTopics] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const classNum = 7;
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    const subjectKey = subject || "mathematics";
    const fetchedTopics = getNexusCurriculum(classNum as NexusClass, subjectKey as keyof typeof import("@/lib/nexus/curriculum").NEXUS_LOWER_CURRICULUM);
    setTopics(fetchedTopics);
  }, [subject]);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading student profile...</p>
      </div>
    );
  }

  const profile = learnerProfile;
  const classNum = profile.currentClass as NexusClass;

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
              ← Back to Academy Hub
            </Link>
            <span className="text-sm text-gray-600">
              {profile.fullName} • Class {profile.currentClass}
            </span>
          </div>
        </div>

        {/* Subject Header */}
        <div className="mb-6 rounded-2xl bg-white p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-2">
            {subject === "mathematics"
              ? "Mathematics Realm"
              : subject === "science"
                ? "Science Laboratory"
                : subject === "language"
                  ? "Language Library"
                  : "Social Studies Archive"}
          </h2>
          <p className="text-gray-600">
            {subject === "mathematics"
              ? "Numbers, equations, and proof"
              : subject === "science"
                ? "Experiment, discover, understand"
                : subject === "language"
                  ? "Grammar, vocabulary, composition"
                  : "History, geography, civics"}
          </p>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {topics.map((t, index) => (
            <div
              key={t.id}
              className="rounded-2xl bg-white p-4 border border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/nexus/topics/${t.id}`)}
            >
              <h3 className="font-medium text-[theme.accent] mb-1">
                {t.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {t.description}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {t.activityCount} activities
              </p>
            </div>
          ))}
        </div>

 {/* Progress */}
        {topics.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-600 text-sm">
              {topics.length} topics available for {getNexusSubjectDisplay(subject)}
            </p>
            <p className="text-gray-500 text-xs">
              Select a topic to begin learning activities and earn XP and coins
            </p>
          </div>
        )}

 {/* Navigation */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Explore topics to begin learning activities and earn XP and coins.
          </p>
        </div>
      </div>
    </div>
  );
}