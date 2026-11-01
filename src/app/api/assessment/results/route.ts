import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  // In a real implementation, this would fetch from a database
  // For now, return mock results
  const mockResults = {
    totalQuestions: 20,
    correctAnswers: 16,
    incorrectAnswers: 3,
    unansweredQuestions: 1,
    accuracyPercentage: 80,
    timeTaken: "14:32",
    subjectPerformance: {
      mathematics: { correct: 5, total: 5, percentage: 100 },
      science: { correct: 4, total: 5, percentage: 80 },
      english: { correct: 7, total: 10, percentage: 70 },
    },
    topicPerformance: {
      fractions: { correct: 3, total: 3, percentage: 100 },
      algebra: { correct: 2, total: 3, percentage: 67 },
      cellStructure: { correct: 1, total: 1, percentage: 100 },
    },
    difficultyPerformance: {
      easy: { correct: 8, total: 8, percentage: 100 },
      medium: { correct: 5, total: 7, percentage: 71 },
      hard: { correct: 3, total: 5, percentage: 60 },
    },
  };

  return NextResponse.json(mockResults);
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");
  const { action } = await request.json();

  // In a real implementation, this would save to a database
  return NextResponse.json({ status: "ok" });
}