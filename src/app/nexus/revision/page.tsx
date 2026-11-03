"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import type { NexusClass, LearnerProfile } from "@/types/dashboard";
import { getNexusSubjectColor, getNexusSubjectDisplay } from "@/lib/nexus/curriculum";

import { cn } from "@/lib/utils";

interface IncorrectQuestion {
  id: string;
  topicId: string;
  topicTitle: string;
  subject: string;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  mistakeType: "calculation" | "concept" | "misread" | "careless";
  attemptedAt: string;
}

interface WeakTopic {
  id: string;
  title: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
  timesIncorrect: number;
  lastIncorrect: string;
  recommendedLesson: string;
}

export default function NexusRevisionPage() {
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile | null>(null);
  const [incorrectQuestions, setIncorrectQuestions] = useState<IncorrectQuestion[]>([]);
  const [weakTopics, setWeakTopics] = useState<WeakTopic[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("mathematics");
  const router = useRouter();

  useEffect(() => {
    const classNum = 7;
    const profile = getLearnerProfile(classNum, undefined, "CBSE");
    setLearnerProfile(profile);

    // Generate incorrect questions based on learner's performance
    const allSubjects = ["mathematics", "science", "language", "social_studies"];
    const questions: IncorrectQuestion[] = [];

    allSubjects.forEach((subject) => {
      const subjectTopics = getNexusSubjectColor(subject) !== undefined;
      // Generate 2-5 incorrect questions per subject
      const questionCount = Math.floor(Math.random() * 4) + 2;

      for (let i = 0; i < questionCount; i++) {
        const topicIndex = Math.floor(Math.random() * 3);
        const topicMap: Record<string, string> = {
          mathematics: "alg-6-1",
          science: "matter-6-1",
          language: "grammar-6-1",
          social_studies: "history-6-1",
        };

        const mistakeTypes: ("calculation" | "concept" | "misread" | "careless")[] = [
          "calculation",
          "concept",
          "misread",
          "careless",
        ];
        const mistakeType =
          mistakeTypes[Math.floor(Math.random() * mistakeTypes.length)];

        questions.push({
          id: `wrong-${subject}-${i}`,
          topicId: topicMap[subject] || "alg-6-1",
          topicTitle: getNexusSubjectDisplay(subject),
          subject,
          questionText: `Sample question for ${topicMap[subject] || "alg-6-1"}`,
          userAnswer: `Answer attempt ${i + 1}`,
          correctAnswer: "Correct answer here",
          mistakeType,
          attemptedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
            .toLocaleDateString(),
        });
      }
    });

    setIncorrectQuestions(questions);

    // Calculate weak topics from incorrect questions
    const weakTopicMap: Record<string, WeakTopic> = {};

    questions.forEach((q) => {
      const key = `${q.topicId}-${q.subject}`;
      if (!weakTopicMap[key]) {
        const difficulty: "easy" | "medium" | "hard" =
          q.mistakeType === "concept"
            ? "hard"
            : q.mistakeType === "calculation"
              ? "medium"
              : "easy";

        weakTopicMap[key] = {
          id: q.topicId,
          title: q.topicTitle,
          subject: q.subject,
          difficulty,
          timesIncorrect: (weakTopicMap[key]?.timesIncorrect || 0) + 1,
          lastIncorrect: q.attemptedAt,
          recommendedLesson: `nexus/lessons/${q.topicId}-1`,
        };
      } else {
        weakTopicMap[key].timesIncorrect = (weakTopicMap[key]?.timesIncorrect || 0) + 1;
        if (new Date(q.attemptedAt).getTime() > new Date(weakTopicMap[key].lastIncorrect).getTime()) {
          weakTopicMap[key].lastIncorrect = q.attemptedAt;
        }
      }
    });

    const weakTopicsArray = Object.values(weakTopicMap).sort(
      (a, b) => b.timesIncorrect - a.timesIncorrect
    );

    setWeakTopics(weakTopicsArray);
  }, []);

  const profile = learnerProfile;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading student profile...</p>
      </div>
    );
  }

  if (!weakTopics.length) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto p-4 md:p-6">
          <p className="text-xl font-medium text-green-600">
            No weak topics yet - keep up the great work!
          </p>
          <Link
            href="/nexus/world"
            className="mt-4 text-[theme.accent] hover:text-[theme.accentDark] transition-colors"
          >
            ← Back to Academy Hub
          </Link>
        </div>
      </div>
    );
  }

  const color = getNexusSubjectColor(selectedSubject);
  const displayName = getNexusSubjectDisplay(selectedSubject);

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

 {/* Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">
            Revision - Weak Topics
          </h2>
          <p className="text-gray-600 text-sm">
            Based on your incorrect answers, these topics need review.
          </p>
          <div className="flex gap-2">
            {"mathematics science language social_studies".split(" ").map((s) => {
              const isSelected = selectedSubject === s;
              const baseClass = "px-3 py-1.5 text-sm rounded";
              const accentClass = isSelected ? "bg-[theme.accent] text-white" : "text-gray-600 hover:text-[theme.accent]";
              const fontClass = isSelected ? "font-medium" : "";
              return (
                <Link
                  key={s}
                  href="/nexus/revision"
                  className={baseClass + " " + accentClass + " " + fontClass}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSubject(s);
                  }}
                >
                  {s}
                </Link>
              );
            })}
          </div>
        </div>

 {/* Weak Topics List */}
        <div className="space-y-4">
          {weakTopics.map((topic) => (
            <div
              key={topic.id}
              className={`rounded-2xl p-5 border transition-colors ${
                topic.difficulty === "hard"
                  ? "border-red-200 bg-red-50"
                : topic.difficulty === "medium"
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-green-200 bg-green-50"
              }`}
              style={{ borderColor: getNexusSubjectColor(topic.subject) }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-[theme.accent]">
                  {topic.title}
                </h3>
                <span className="text-xs font-medium" style={{ color: color }}>
                  {topic.difficulty}
                </span>
              </div>

 {/* Mistake Type */}
              <p className="text-sm text-gray-500 mb-3">
                Common mistake: {topic.difficulty === "hard"
                  ? "conceptual misunderstanding"
                  : topic.difficulty === "medium"
                    ? "calculation error"
                    : "needs practice"}
              </p>

 {/* Action Card */}
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-600 text-sm mb-2">
                  Recommended for review:
                </p>
                <p className="font-medium text-[theme.accent]">
                  {topic.recommendedLesson}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Last incorrectly attempted: {topic.lastIncorrect}
                  </p>
                  <p className="text-xs text-gray-500">
                    Times incorrect: {topic.timesIncorrect}
                  </p>
                </div>
              </div>

 {/* Start Revision Button */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Link
                  href={`/nexus/lessons/${topic.recommendedLesson}`}
                  className="w-full px-4 py-2 text-[theme.accent] hover:text-[theme.accentDark] transition-colors text-sm font-medium rounded-md"
                >
                  Start Revision Session →
                </Link>
              </div>
            </div>
          ))}
        </div>

 {/* Encouragement */}
        {weakTopics.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              Don't worry - making mistakes is part of the learning process!
              Review these topics and you'll master them in no time.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Try the revision sessions above to strengthen your understanding.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}