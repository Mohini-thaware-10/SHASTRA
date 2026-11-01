import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET(request: Request) {
  const { sessionId } = new URL(request.url).searchParams;

  // In a real implementation, this would fetch from a database
  // For now, return mock learner profile
  const mockProfile = {
    studentName: "Student Name",
    classLevel: "8",
    assignedUniverse: "nexus",
    strongSubjects: ["Mathematics", "Cell Structure"],
    developingSubjects: ["Science", "Algebra"],
    needsPracticeSubjects: ["Fractions", "Cell Division"],
    accuracyBySubject: {
      mathematics: 100,
      science: 80,
      english: 70,
    },
    topicRecommendations: [
      "Review fractions - focus on addition and subtraction",
      "Practice algebra fundamentals - solving for x",
      "Revise cell organelles and their functions",
    ],
    learningPriorities: [
      "Strengthen understanding of algebraic equations",
      "Review cell structure and organelles",
      "Practice fraction operations",
    ],
  };

  return NextResponse.json(mockProfile);
}