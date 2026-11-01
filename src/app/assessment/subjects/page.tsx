"use client";

import { useState } from "react";
import { Container } from "@/components/common/container";
import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubjectSelectionProps {
  classLevel: string;
  onSelect: (subjects: string[]) => void;
}

function getSubjectsForClass(classLevel: string): { id: string; name: string }[] {
  const num = parseInt(classLevel);

  if (num >= 11) {
    return [
      { id: "physics", name: "Physics" },
      { id: "chemistry", name: "Chemistry" },
      { id: "mathematics", name: "Mathematics" },
      { id: "biology", name: "Biology" },
      { id: "english", name: "English" },
    ];
  }

  if (num >= 6) {
    return [
      { id: "mathematics", name: "Mathematics" },
      { id: "science", name: "Science" },
      { id: "english", name: "English" },
      { id: "social", name: "Social Science" },
    ];
  }

  // Classes 1-5
  return [
    { id: "mathematics", name: "Mathematics" },
    { id: "english", name: "English" },
    { id: "evs", name: "Environmental Studies" },
  ];
}

function getSubjectDisplayName(subjectId: string): string {
  const map: Record<string, string> = {
    physics: "Physics",
    chemistry: "Chemistry",
    mathematics: "Mathematics",
    biology: "Biology",
    english: "English",
    social: "Social Science",
  };
  return map[subjectId] || subjectId;
}

export function SubjectSelectionPage({ classLevel, onSelect }: SubjectSelectionProps) {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const allAvailableSubjects = getSubjectsForClass(classLevel);

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleContinue = () => {
    if (selectedSubjects.length > 0) {
      onSelect(selectedSubjects);
    }
  };

  const subjectLabel = selectedSubjects.length === 1 ? "subject" : "subjects";

  return (
    <Container size="default">
      <SectionHeading
        eyebrow="Subject Selection"
        title="Select Assessment Subjects"
        description="Choose the subjects you'd like to be assessed on"
      />

      <div className="pace-step">
        <p className="text-text-soft mb-4">
          Based on your class level, here are the available subjects:
        </p>

        <div className="grid grid-cols-2 gap-3" style={{ maxWidth: "unset" }}>
          {allAvailableSubjects.map((subject) => (
            <div
              key={subject.id}
              className={cn(
                "border rounded-md p-3 text-sm transition-colors",
                selectedSubjects.includes(subject.id)
                  ? "bg-primary/10 border-primary border text-primary"
                  : "bg-border-soft text-text cursor-pointer"
              )}
              onClick={() => handleSubjectToggle(subject.id)}
            >
              <span className="select-icon" />
              <span className="ml-1">{getSubjectDisplayName(subject.id)}</span>
            </div>
          ))}
        </div>

        {selectedSubjects.length > 0 && (
          <div className="mt-4 p-3 rounded-md bg-primary/5">
            <p className="text-sm text-text-soft/70 mb-1">
              Selected {selectedSubjects.length} {subjectLabel}
            </p>
            <p className="text-xs text-text-soft/70">
              {selectedSubjects.map((s) => getSubjectDisplayName(s)).join(", ")}
            </p>
          </div>
        )}

        {!selectedSubjects.length && (
          <p className="text-xs text-text-soft/60 mt-2">
            Please select at least one subject to continue
          </p>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-border-soft">
        <div className="flex justify-between">
          {selectedSubjects.length > 0 && (
            <button className="btn-outline" onClick={handleContinue}>
              Continue to Assessment
            </button>
          )}
          {!selectedSubjects.length && (
            <button className="btn-outline disabled" disabled>
              Select Subjects First
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}