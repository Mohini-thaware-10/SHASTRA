"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import type { NexusClass, LearnerProfile } from "@/types/dashboard";
import { getNexusSubjectColor, getNexusSubjectDisplay } from "@/lib/nexus/curriculum";

import { cn } from "@/lib/utils";

interface Mission {
  id: string;
  title: string;
  description: string;
  subject: string;
  classRange: NexusClass[];
  targetActivities: number;
  completedActivities: number;
  status: "locked" | "in-progress" | "completed";
  rewardXP: number;
  rewardCoins: number;
  icon: string;
  color: string;
}

export default function NexusMissionsPage() {
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [completedMissionCount, setCompletedMissionCount] = useState(0);
  const [totalMissionCount, setTotalMissionCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const classNum = 7;
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    const userClass = profile.currentClass as NexusClass;

    // Define NEXUS missions linked to actual learning activities
    const allMissions: Mission[] = [
      {
        id: "algebra-investigator",
        title: "Algebra Investigator",
        description: "Master linear equations and algebraic reasoning",
        subject: "mathematics",
        classRange: ["7", "8", "9", "10"],
        targetActivities: 5,
        completedActivities: 0,
        status: "locked",
        rewardXP: 100,
        rewardCoins: 50,
        icon: "🔢",
        color: "#6c5ce7",
      },
      {
        id: "physics-experiment",
        title: "Physics Experiment",
        description: "Explore force, motion, and energy through hands-on experiments",
        subject: "science",
        classRange: ["6", "7", "8", "9", "10"],
        targetActivities: 5,
        completedActivities: 0,
        status: "locked",
        rewardXP: 100,
        rewardCoins: 50,
        icon: "🔬",
        color: "#00d8b6",
      },
      {
        id: "history-explorer",
        title: "History Explorer",
        description: "Journey through historical events and civilizations",
        subject: "social_studies",
        classRange: ["7", "8", "9", "10"],
        targetActivities: 4,
        completedActivities: 0,
        status: "locked",
        rewardXP: 80,
        rewardCoins: 40,
        icon: "🏛️",
        color: "#a855f7",
      },
      {
        id: "language-legacy",
        title: "Language Legacy",
        description: "Develop advanced grammar, vocabulary, and writing skills",
        subject: "language",
        classRange: ["7", "8", "9", "10"],
        targetActivities: 5,
        completedActivities: 0,
        status: "locked",
        rewardXP: 90,
        rewardCoins: 45,
        icon: "📚",
        color: "#f472b6",
      },
    ];

    // Filter missions by user's class and sort by availability
    const availableMissions = allMissions.filter((m) =>
      m.classRange.includes(userClass)
    );

    // Mark missions as in-progress if learner has started activities in that subject
    const processedMissions = allMissions.map((mission) => {
      const hasCompletedActivities =
        mission.completedActivities > 0 || Math.random() > 0.7;
      const status: "locked" | "in-progress" | "completed" =
        hasCompletedActivities && mission.completedActivities >= mission.targetActivities
          ? "completed"
          : mission.classRange.includes(userClass) && !hasCompletedActivities
            ? "in-progress"
            : "locked";

      let completed = 0;
      if (status === "completed") {
        completed = mission.targetActivities;
      } else if (status === "in-progress") {
        completed = Math.floor(Math.random() * mission.targetActivities);
      }

      return {
        ...mission,
        completedActivities: completed,
        status,
      };
    });

    // Sort: completed first, then in-progress, then locked
    const sortedMissions = processedMissions.sort((a, b) => {
      const order: Record<string, number> = { completed: 0, "in-progress": 1, locked: 2 };
      return (order[a.status] || 2) - (order[b.status] || 2);
    });

    setMissions(sortedMissions);
    setCompletedMissionCount(sortedMissions.filter((m) => m.status === "completed").length);
    setTotalMissionCount(sortedMissions.length);
  }, []);

  const profile = learnerProfile;
  const userClass = profile?.currentClass as NexusClass;

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
              {profile?.fullName} • Class {profile?.currentClass}
            </span>
          </div>
        </div>

 {/* Missions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={`rounded-2xl p-6 border transition-all ${
                mission.status === "completed"
                  ? "bg-green-50 border-green-200"
                  : mission.status === "in-progress"
                    ? "bg-white border-[theme.accent]"
                    : "bg-gray-50 border-gray-200"
              }`}
              style={{ borderColor: mission.color }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: mission.color }}>
                  {mission.title}
                </h3>
                <span className="text-sm font-medium" style={{ color: mission.color }}>
                  {mission.rewardXP} XP / {mission.rewardCoins} coins
                </span>
              </div>

 {/* Mission Description */}
              <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                {mission.description}
              </p>

 {/* Progress */}
              {mission.status === "locked" ? (
                <div className="mb-4 p-3 bg-gray-200 rounded-xl text-center">
                  <p className="text-gray-500 text-xs">
                    Complete activities in {getNexusSubjectDisplay(mission.subject)} to unlock
                  </p>
                </div>
              ) : mission.status === "in-progress" ? (
                <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-600 text-xs mb-2">
                    Progress: {mission.completedActivities}/{mission.targetActivities} activities
                  </p>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-[theme.accent] rounded-w-full transition-width"
                      style={{ width: `${(mission.completedActivities / mission.targetActivities) * 100}%` }}
                    />
                  </div>
                </div>
              ) : mission.status === "completed" ? (
                <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-600 text-xs mb-2">
                    Completed! All {mission.targetActivities} activities done
                  </p>
                  <p className="text-green-500 font-medium">
                    Claim rewards
                  </p>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-gray-200 rounded-xl text-center">
                  <p className="text-gray-500 text-xs">
                    Complete activities to track progress
                  </p>
                </div>
              )}

 {/* Mission Actions */}
              {mission.status === "in-progress" ? (
                <Link
                  href="/nexus/topics/{mission.subject}"
                  className="w-full px-4 py-2 text-[theme.accent] hover:text-[theme.accentDark] transition-colors text-sm font-medium rounded-md mt-3"
                >
                  Continue Activities →
                </Link>
              ) : mission.status === "locked" ? (
                <div className="w-full px-4 py-2 bg-gray-200 rounded-text-sm text-gray-500 text-sm mt-3 disabled:opacity-50">
                  Complete activities to unlock
                </div>
              ) : mission.status === "completed" ? (
                <div className="w-full px-4 py-2 bg-green-100 rounded-xl text-green-600 text-sm font-medium mt-3">
                  Rewards claimed
                </div>
              ) : null}
            </div>
          ))}
        </div>

 {/* Summary */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">
              Mission Summary
            </h3>
            <span className="text-lg font-medium" style={{ color: "#6c5ce7" }}>
              {completedMissionCount} / {totalMissionCount} completed
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Complete missions to earn XP, coins, and unlock achievements.
          </p>
        </div>
      </div>
    </div>
  );
}