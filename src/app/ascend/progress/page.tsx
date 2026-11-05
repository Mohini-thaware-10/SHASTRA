"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/common/container";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { mockQuestions } from "@/content/assessment";
import { GPProgress } from "@/types/dashboard";
import { getUniverse } from "@/config/themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/dashboard/DailyGoalCard";

export default function AscendProgress() {
  const [learnerProfile, setLearnerProfile] = useState<never>();
  const router = useRouter();

  useEffect(() => {
    const classNum = 11;
    const stream = "science";
    const profile = getLearnerProfile(classNum, stream, "CBSE");
    setLearnerProfile(profile);
  }, []);

  if (!learnerProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-ink">
        <p>Loading progress page...</p>
      </div>
    );
  }

  const theme = getUniverse("ascend");
  const subjectCards = getSubjectOverviewCards(learnerProfile);

  // Mock quiz history
  const quizHistory = [
    {
      id: "q1",
      date: "2024-11-15",
      subject: "Physics",
      topic: "Kinematics",
      score: 85,
      total: 10,
      duration: "25 minutes",
    },
    {
      id: "q2",
      date: "2024-11-10",
      subject: "Chemistry",
      topic: "Chemical Bonding",
      score: 78,
      total: 10,
      duration: "20 minutes",
    },
    {
      id: "q3",
      date: "2024-11-05",
      subject: "Mathematics",
      topic: "Sets and Functions",
      score: 92,
      total: 10,
      duration: "30 minutes",
    },
  ];

  // Mock mock examination results
  const mockExamResults = {
    physics: {
      score: 78,
      total: 50,
      percentage: 78,
      completed: true,
      date: "2024-11-01",
    },
    chemistry: {
      score: 82,
      total: 50,
      percentage: 82,
      completed: true,
      date: "2024-10-25",
    },
    mathematics: {
      score: 88,
      total: 50,
      percentage: 88,
      completed: true,
      date: "2024-10-18",
    },
  };

  // Topic performance data
  const topicPerformance = [
    { topic: "Kinematics", subject: "Physics", mastery: 85, trend: "improving" },
    { topic: "Laws of Motion", subject: "Physics", mastery: 72, trend: "stable" },
    { topic: "Work, Energy and Power", subject: "Physics", mastery: 90, trend: "improving" },
    { topic: "Some Basic Concepts", subject: "Chemistry", mastery: 68, trend: "stable" },
    { topic: "Chemical Bonding", subject: "Chemistry", mastery: 75, trend: "improving" },
    { topic: "Sets and Functions", subject: "Mathematics", mastery: 92, trend: "mastering" },
    { topic: "Trigonometric Functions", subject: "Mathematics", mastery: 78, trend: "stable" },
  ];

  // Learning time
  const totalLearningTime = 450; // minutes
  const averageSessionTime = 35; // minutes

  return (
    <div className="min-h-screen bg-[theme.background] text-[theme.textColor]">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Progress Header */}
        <div className="rounded-xl bg-[theme.soft] border border-[theme.border] p-6 md:p-8 mb-8">
          <h1 className="text-2xl font-display font-bold text-[theme.accent] tracking-wider">
            Academic Progress
          </h1>
          <p className="text-[0.875rem] text-[theme.inkSmall] mt-1">
            Your learning journey analysis
          </p>
          <p className="text-[0.5rem] text-[theme.inkSmall]">
            Class {learnerProfile.currentClass} • {learnerProfile.stream.toUpperCase()} stream
          </p>
        </div>

        {/* Subject Progress Overview */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {subjectCards.map((card) => (
            <div
              key={card.id}
              className="rounded-lg bg-white border border-[theme.border] p-4">
                <div className="flex items-between justify-between">
                  <span className="text-[0.5rem] text-[theme.inkSmall]">{card.name}</span>
                  <span className="text-[0.5rem] text-[theme.accent]">
                    {card.progressPercentage}% complete
                  </span>
                </div>
                <progress
                  className="w-32 h-2 rounded-full appearance-none bg-[theme.soft] border border-[theme.border] mt-2"
                  value={card.progressPercentage}
                  max={100}
                />
                <span className="text-[0.4rem] text-[theme.inkSmall] mt-1">
                  {card.topicsCompleted}/{card.totalTopics} topics
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Topic Performance */}
        <div className="rounded-lg bg-white border border-[theme.border] p-6 mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Topic Performance
          </h2>
          <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
            Mastery across topics in your configured subjects
          </p>
          <div className="grid grid-cols-2 gap-3">
            {topicPerformance.map((item) => (
              <div key={item.topic} className="p-3 rounded bg-[theme.soft] border border-[theme.border]">
                <div className="flex items-between justify-between">
                  <span className="text-[0.5rem] text-[theme.inkSmall]">
                    {item.topic} ({item.subject})
                  </span>
                  <span className="text-[0.5rem] text-[theme.accent]">
                    {item.mastery}% mastery
                  </span>
                </div>
                <progress
                  className="w-32 h-2 rounded-full appearance-none bg-[theme.soft] overflow-hidden"
                  value={item.mastery}
                  max={100}
                />
                <span className="text-[0.4rem] text-[theme.inkSmall]">
                  {item.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz History */}
        <div className="rounded-lg bg-white border border-[theme.border] p-6 mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Quiz History
          </h2>
          <p className="text-[0.5rem] text-[theme.inkSmall] mb-4">
            Recent quiz attempts
          </p>
          <div className="overflow-x-auto">
            <table className="w-full rounded-lg bg-[theme.soft] border border-[theme.border]">
              <thead>
                <tr className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked">
                  <th className="p-3">Date</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Topic</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Duration</th>
                </tr>
              </thead>
              <tbody>
                {quizHistory.map((quiz) => (
                  <tr key={quiz.id} className="text-[0.5rem] text-[theme.inkSmall]">
                    <td className="p-3">{quiz.date}</td>
                    <td className="p-3">{quiz.subject}</td>
                    <td className="p-3">{quiz.topic}</td>
                    <td className="p-3">
                      <span className="text-[theme.accent]">{quiz.score}</span> / {quiz.total}
                    </td>
                    <td className="p-3">{quiz.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mock Examination Results */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[["Physics", "Chemistry", "Mathematics"].map((subject) => {
            const result = mockExamResults[subject.toLowerCase()] || {
              score: 0,
              total: 50,
              percentage: 0,
              completed: false,
              date: "",
            };
            return (
              <div
                key={subject}
                className="rounded-lg bg-[theme.soft] border border-[theme.border] p-4">
                <div className="flex items-between justify-between">
                  <span className="text-[0.5rem] text-[theme.inkSmall]">
                    {subject} Mock Exam
                  </span>
                  <span className="text-[0.5rem] text-[theme.accent]">
                    {result.percentage}%
                  </span>
                </div>
                <progress
                  className="w-32 h-2 rounded-full appearance-none bg-[theme.soft] border border-[theme.border] mt-2"
                  value={result.percentage}
                  max={100}
                />
                <span className="text-[0.4rem] text-[theme.inkSmall] mt-1">
                  {result.date || "Not yet taken"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Strengths and Improvement Areas */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-lg bg-white border border-[theme.border] p-6">
            <h3 className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked mb-3">
              Strengths
            </h3>
            <ul className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="p-2 rounded bg-[theme.soft] border border-[theme.border]">
                  <span className="text-[0.5rem] text-[theme.inkSmall]">
                    {["Physics numerical problems", "Chemical bonding", "Quadratic equations"][i]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-white border border-[theme.border] p-6">
            <h3 className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked mb-3">
              Improvement Areas
            </h3>
            <ul className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <li key={i} className="p-2 rounded bg-[theme.soft] border border-[theme.border]">
                  <span className="text-[0.5rem] text-[theme.inkSmall]">
                    {["Complex numbers", "Organic chemistry", "Kinematics graphs"][i]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Learning Time Summary */}
        <div className="rounded-lg bg-[theme.soft] border border-[theme.border] p-6">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Learning Time Summary
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked">Total Learning Time</p>
              <p className="text-2xl font-bold text-[theme.accent]">
                {totalLearningTime} minutes
              </p>
              <p className="text-[0.4rem] text-[theme.inkSmall]">
                Equivalent to {Math.round(totalLearningTime / 60)} hours of study
              </p>
            </div>
            <div>
              <p className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked">Average Session</p>
              <p className="text-2xl font-bold text-[theme.accent]">
                {averageSessionTime} minutes
              </p>
              <p className="text-[0.4rem] text-[theme.inkSmall]">
                Typical session duration
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}