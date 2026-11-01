import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
  return NextResponse.json({
    title: "Diagnostic Assessment",
    description:
      "Short assessment to understand your knowledge and identify learning priorities",
    estimatedDuration: "15 minutes",
    totalQuestions: 20,
    purpose:
      "This assessment helps us understand your current knowledge level and create a personalized learning path for you in SHATRA.",
  });
}