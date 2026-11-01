import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SubjectConfig = { name: string; code: string }[];

type ClassSubjects = {
  "4": SubjectConfig;
  "8": SubjectConfig;
} & {
  11: {
    science: SubjectConfig;
    commerce: SubjectConfig;
  };
};

export function GET() {
  // Subject configuration based on class level
  const subjectsByClass: Record<string, SubjectConfig> = {
    "4": [
      { name: "Mathematics", code: "math" },
      { name: "English", code: "eng" },
      { name: "Environmental Studies", code: "evs" },
    ],
    "8": [
      { name: "Mathematics", code: "math" },
      { name: "Science", code: "science" },
      { name: "English", code: "eng" },
      { name: "Social Science", code: "ss" },
    ],
    "11": {
      science: [
        { name: "Physics", code: "physics" },
        { name: "Chemistry", code: "chemistry" },
        { name: "Mathematics", code: "math" },
        { name: "English", code: "eng" },
      ],
      commerce: [
        { name: "Accountancy", code: "acc" },
        { name: "Business Studies", code: "bus" },
        { name: "Economics", code: "eco" },
        { name: "English", code: "eng" },
      ],
    },
  };

  const classLevel = "8"; // This would come from the student's registration data

  if (classLevel === "11") {
    // Return both streams for class 11
    return NextResponse.json({
      science: subjectsByClass["11"].science,
      commerce: subjectsByClass["11"].commerce,
    });
  }

  return NextResponse.json({
    subjects: subjectsByClass[classLevel] || subjectsByClass["4"],
  });
}