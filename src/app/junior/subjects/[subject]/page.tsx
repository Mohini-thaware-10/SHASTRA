"use client";

import { useState, useEffect, useParams } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { getTopicsForSubjectAndClass, getActivitiesForTopic } from "@/lib/junior/curriculum";
import type { JuniorTopic } from "@/lib/junior/curriculum";
import type { LearnerProfile } from "@/types/dashboard";

import { cn } from "@/lib/utils";

export default function JuniorSubjectsPage() {
  const { subject } = useParams<{ subject: string }>();
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [topics, setTopics] = useState<JuniorTopic[]>([]);
  const router = useRouter();

  useEffect(() => {
    const classNum = 3;
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    const subjectKey = subject || "mathematics";
    const fetchedTopics = getTopicsForSubjectAndClass(subjectKey, classNum);
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
  const classNum = profile.currentClass as "1" | "2" | "3" | "4" | "5";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6 rounded-xl bg-white p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <Link
              href="/junior/world"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to World Map
            </Link>
            <span className="text-sm text-gray-600">
              {profile.fullName} • Class {profile.currentClass}
            </span>
          </div>
        </div>

        {/* Subject Header */}
        <div className="mb-6 rounded-xl bg-white p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-2">
            {subject === "mathematics"
              ? "Mathematics"
              : subject === "english"
                ? "English"
                : subject === "science"
                  ? "Science"
                  : "Environmental Studies"}
          </h2>
          <p className="text-gray-600">
            {subject === "mathematics"
              ? "Numbers, shapes, and calculations"
              : subject === "english"
                ? "Letters, words, and stories"
                : subject === "science"
                  ? "Plants, animals, and environment"
                  : "Family, nature, and our surroundings"}
          </p>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              className="rounded-lg bg-white p-4 border border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/junior/topics/${topic.id}`)}
            >
              <h3 className="font-medium text-blue-600 mb-1">
                {topic.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {topic.description}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {topic.activityCount} activities
              </p>
            </div>
          ))}
        </div>

 {/* Progress Summary */}
        {topics.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="font-medium text-blue-600 mb-2">
              Progress Overview
            </h3>
            <p className="text-gray-600 text-sm">
              {topics.length} topics available
            </p>
            <p className="text-gray-500 text-xs">
              Complete topics to unlock lessons and earn rewards
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