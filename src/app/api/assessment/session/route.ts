import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: Request) {
  const { action, sessionId, answers } = await request.json();

  // In a real implementation, this would save to a database
  // For now, we just acknowledge the action

  switch (action) {
    case "start":
      return NextResponse.json({
        sessionId,
        startedAt: new Date().toISOString(),
        status: "active",
      });
    case "save-answers":
      return NextResponse.json({
        sessionId,
        answersSaved: answers?.length || 0,
        status: "saved",
      });
    case "submit":
      return NextResponse.json({
        sessionId,
        submittedAt: new Date().toISOString(),
        status: "submitted",
      });
    default:
      return NextResponse.json(
        { error: "Unknown action" },
        { status: 400 }
      );
  }
}

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