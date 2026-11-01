"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { GraduationCap, User } from "lucide-react";

export function AuthRoleSelector({
  defaultRole: initial = "student",
  onSelect,
}: {
  defaultRole?: "student" | "teacher";
  onSelect: (role: "student" | "teacher") => void;
}) {
  const [role, setRole] = useState<"student" | "teacher">(
    initial as "student" | "teacher",
  );

  const options = [
    { label: "Student", icon: User, value: "student" as const },
    { label: "Teacher", icon: GraduationCap, value: "teacher" as const },
  ] as const;

  return (
    <div className="flex gap-2 rounded-md border border-line bg-white/60 p-1">
      {options.map((opt) => {
        const isSelected = role === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            className={cn(
              "flex-1 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors outline-none outline-2 outline-offset-2",
              isSelected
                ? "border-violet-strong bg-violet-soft text-violet-strong"
                : "hover:border-violet-soft hover:text-violet-strong",
            )}
            onClick={() => {
              setRole(opt.value);
              onSelect?.(opt.value);
            }}
            aria-pressed={isSelected}
            aria-label={`Select ${opt.label} account`}
          >
            <opt.icon className="mr-2 h-4 w-4" strokeWidth={1.8} />{opt.label}
          </button>
        );
      })}
    </div>
  );
}