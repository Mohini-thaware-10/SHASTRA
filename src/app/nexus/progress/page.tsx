"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import type { NexusClass, LearnerProfile } from "@/types/dashboard";
import { getNexusSubjectColor, getNexusSubjectDisplay } from "@/lib/nexus/curriculum";

import { cn } from "@/lib/utils";

interface TopicProgress {
  id: string;
  title: string;
  subject: string;
  totalActivities: number;
  completedActivities: number;
  accuracy: number;
  status: "not-started" | "in-progress" | "completed";
  lastAccessed: string;
}

interface ClassProgress {
  class: NexusClass;
  totalTopics: number;
  completedTopics: number;
  overallAccuracy: number;
  xpEarned: number;
  coinsEarned: number;
  topicProgress: TopicProgress[];
}

export default function NexusProgressPage() {
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [classProgress, setClassProgress] = useState<ClassProgress | null>(null);
  const [selectedClass, setSelectedClass] = useState<NexusClass | null>(null);
  const router = useRouter();

  useEffect(() => {
    const classNum = 7;
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    const userClass = profile.currentClass as NexusClass;

    // Generate topic progress data based on learner's class
    const allSubjects = ["mathematics", "science", "language", "social_studies"];
    const topicProgress: TopicProgress[] = [];

    allSubjects.forEach((subject, si) => {
      const subjectTopics = getNexusCurriculum(userClass, subject as keyof typeof import("@/lib/nexus/curriculum").NEXUS_LOWER_CURRICULUM);
      subjectTopics.forEach((topic: any, ti) => {
        const completed = Math.floor(Math.random() * (topic.activityCount + 1));
        const accuracy = completed > 0 ? (Math.random() * 30 + 70) : 0; // 70-100% if some completed, 0 if none
        const status =
          completed === 0
            ? "not-started"
            : completed >= topic.activityCount
              ? "completed"
              : "in-progress";

        topicProgress.push({
          id: topic.id,
          title: topic.title,
          subject,
          totalActivities: topic.activityCount,
          completedActivities: completed,
          accuracy: Math.round(accuracy),
          status,
          lastAccessed: new Date().toLocaleDateString(),
        });
      });
    });

    // Calculate class-level progress
    const totalTopics = topicProgress.length;
    const completedTopics = topicProgress.filter((t) => t.status === "completed").length;
    const overallAccuracy =
      totalTopics > 0
        ? topicProgress.reduce((sum, t) => sum + t.accuracy, 0) / totalTopics
        : 0;
    const xpEarned = Math.floor(Math.random() * 500) + 100;
    const coinsEarned = Math.floor(Math.random() * 300) + 50;

    const progress: ClassProgress = {
      class: userClass,
      totalTopics,
      completedTopics,
      overallAccuracy: Math.round(overallAccuracy),
      xpEarned,
      coinsEarned,
      topicProgress,
    };

    setClassProgress(progress);
    setSelectedClass(userClass);
  }, []);

  const profile = learnerProfile;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading student profile...</p>
      </div>
    );
  }

  if (!classProgress) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto p-4 md:p-6">
          <p className="text-2xl font-bold text-[theme.accent]">
            Progress loading...
          </p>
        </div>
      </div>
    );
  }

  const progress = classProgress;
  const color = getNexusSubjectColor(
    progress.topicProgress[0]?.subject || "mathematics"
  );

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

 {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div
            className={`rounded-2xl p-4 border transition-colors ${
              progress.overallAccuracy >= 80 ? "bg-green-50 border-green-200" : progress.overallAccuracy >= 60 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200"
            }`}
            style={{ borderColor: color }}
          >
            <p className="text-3xl font-bold" style={{ color: color }}>
              {progress.xpEarned}
            </p>
            <p className="text-gray-600 text-xs mt-1">XP</p>
          </div>
          <div
            className={`rounded-2xl p-4 border transition-colors ${
              progress.overallAccuracy >= 80 ? "bg-green-50 border-green-200" : progress.overallAccuracy >= 60 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200"
            }`}
          >
            <p className="text-3xl font-bold">+{progress.coinsEarned}</p>
            <p className="text-gray-600 text-xs mt-1">Coins</p>
          </div>
          <div
            className={`rounded-2xl p-4 border transition-colors ${
              progress.overallAccuracy >= 80 ? "bg-green-50 border-green-200" : progress.overallAccuracy >= 60 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200"
            }`}
          >
            <p className="text-3xl font-bold">{progress.completedTopics}</p>
            <p className="text-gray-600 text-xs mt-1">/{progress.totalTopics} topics</p>
          </div>
          <div
            className={`rounded-2xl p-4 border transition-colors ${
              progress.overallAccuracy >= 80 ? "bg-green-50 border-green-200" : progress.overallAccuracy >= 60 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200"
            }`}
          >
            <p className="text-3xl font-bold">{Math.round(progress.overallAccuracy)}%</p>
            <p className="text-gray-600 text-xs mt-1">accuracy</p>
          </div>
        </div>

 {/* Topic Progress */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">
            Topic Progress
          </h2>
          <div className="space-y-4">
            {progress.topicProgress.map((topic) => (
              <div
                key={topic.id}
                className={`rounded-xl bg-white p-5 border transition-colors ${
                  topic.status === "completed"
                    ? "border-green-200 bg-green-50"
                    : topic.status === "in-progress"
                      ? "border-[theme.accent] bg-white"
                      : "border-gray-200 bg-gray-50"
                }`}
                style={{ borderColor: getNexusSubjectColor(topic.subject) }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-[theme.accent]">
                    {topic.title}
                  </h3>
                  <span className="text-xs font-medium" style={{ color: color }}>
                    {topic.accuracy}%
                  </span>
                </div>

 {/* Progress Bar */}
                <div className="h-2 rounded-full bg-gray-200 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-w-full transition-width"
                    style={{ width: `${topic.completedActivities / topic.totalActivities * 100}%` }}
                  />
                </div>

 {/* Activity Count */}
                <p className="text-sm text-gray-600">
                  {topic.completedActivities}/{topic.totalActivities} activities
                </p>

 {/* Status */}
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    topic.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : topic.status === "in-progress"
                        ? "bg-[theme.accent] text-white"
                        : "bg-gray-100 text-gray-600"
                  }`}
                  style={{ backgroundColor: topic.status === "completed" ? "#10b981" : topic.status === "in-progress" ? color : "#64748b" }}
                >
                  {topic.status}
                </span>
              </div>
            ))}
          </div>
        </div>

 {/* Class Navigation */}
        {progress.topicProgress.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Select a class to view progress details:
            </p>
            <div className="mt-3 flex gap-2">
              {"6 7 8 9 10".split(" ").map((c) => {
                const isSelected = selectedClass === parseInt(c as NexusClass);
                const baseClass = "px-4 py-2 rounded-md text-sm";
                const accentClass = isSelected ? "bg-[theme.accent] text-white" : "text-gray-600 hover:text-[theme.accent]";
                const fontClass = isSelected ? "font-medium" : "";
                return (
                  <Link
                    key={c}
                    href="/nexus/progress"
                    className={baseClass + " " + accentClass + " " + fontClass}
                  >
                    Class {c}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}