import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");

  // In a real implementation, this would fetch from a database
  // For now, return a mock review state
  return NextResponse.json({
    sessionId,
    markedForReview: [],
    answeredQuestions: [],
    unansweredQuestions: [],
    reviewReady: false,
  });
}

export async function POST(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("sessionId");
  const { action, questionId } = await request.json();

  // Handle review actions (mark/unmark for review)
  return NextResponse.json({
    sessionId,
    action,
    questionId,
    status: "updated",
  });
}