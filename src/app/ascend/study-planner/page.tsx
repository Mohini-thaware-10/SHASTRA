"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/common/container";
import { useRouter } from "next/navigation";

import { getLearnerProfile } from "@/lib/dashboard/mock-data";
import { GPProgress } from "@/types/dashboard";
import { getUniverse } from "@/config/themes";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/dashboard/DailyGoalCard";

export default function AscendStudyPlanner() {
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
        <p>Loading study planner...</p>
      </div>
    );
  }

  const theme = getUniverse("ascend");

  // Study tasks - local prototype persistence
  const [tasks, setTasks] = useState<
    {
      id: string;
      subject: string;
      task: string;
      targetDate: string;
      completed: boolean;
      allocatedMinutes: number;
    }[]
  >([]);

  // Sample subjects for the student's stream
  const streamSubjects = learnerProfile.stream === "science"
    ? ["Physics", "Chemistry", "Mathematics", "Biology"]
    : learnerProfile.stream === "commerce"
      ? ["Accountancy", "Business Studies", "Economics"]
      : ["History", "Political Science", "Literature"];

  const [error, setError] = useState<string | null>(null);

  const handleAddTask = (subject: string, task: string, targetDate: string, minutes: number) => {
    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      subject,
      task,
      targetDate,
      completed: false,
      allocatedMinutes: minutes,
    };
    setTasks((prev) => [...prev, newTask]);
    setError(null);
  };

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const totalAllocatedMinutes = tasks.reduce((sum, task) => sum + task.allocatedMinutes, 0);
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-[theme.background] text-[theme.textColor]">
      <Container className="max-w-[1400px] mx-auto p-4 md:p-6">
        {/* Study Planner Header */}
        <div className="rounded-xl bg-[theme.soft] border border-[theme.border] p-6 md:p-8 mb-8">
          <h1 className="text-2xl font-display font-bold text-[theme.accent] tracking-wider">
            Study Planner
          </h1>
          <p className="text-[0.875rem] text-[theme.inkSmall] mt-1">
            Plan your study schedule and track progress
          </p>
          <p className="text-[0.5rem] text-[theme.inkSmall]">
            Class {learnerProfile.currentClass} • {learnerProfile.stream.toUpperCase()} stream
          </p>
        </div>

        {/* Add Task Form */}
        <div className="rounded-lg bg-white border border-[theme.border] p-6 mb-8">
          <h2 className="text-[0.625rem] text-[theme.inkSmall] uppercase tracked mb-3">
            Add Study Task
          </h2>
          {error && (
            <div className="bg-[theme.soft] border border-[theme.accent] rounded-md p-3 mb-4 flex items-center">
              <span className="text-[0.5rem] text-[theme.accent] mr-2">•</span>
              <span className="text-[0.5rem] text-[theme.accent]">{error}</span>
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const subjectSelect = e.target.subject as HTMLSelectElement;
              const taskInput = e.target.task as HTMLInputElement;
              const dateInput = e.target.targetDate as HTMLInputElement;
              const minutesInput = e.target.allocatedMinutes as HTMLInputElement;

              if (!subjectSelect.value || !taskInput.value || !dateInput.value) {
                setError("Please fill in all fields");
                return;
              }

              handleAddTask(
                subjectSelect.value,
                taskInput.value,
                dateInput.value,
                parseInt(minutesInput.value) || 30
              );

              taskInput.value = "";
              setError(null);
            }}
          >
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked block mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent]"
                >
                  <option value="">Select subject</option>
                  {streamSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked block mb-1">
                  Task
                </label>
                <input
                  type="text"
                  name="task"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent]"
                  placeholder="e.g. Complete Kinematics practice problems"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked block mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  name="targetDate"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent]"
                  required
                />
              </div>
              <div>
                <label className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked block mb-1">
                  Allocated Minutes
                </label>
                <input
                  type="number"
                  name="allocatedMinutes"
                  className="w-full p-2 border rounded-md focus:outline-none focus:border-[theme.accent]"
                  value="30"
                  min="15"
                  max="180"
                  required
                />
                <span className="text-[0.4rem] text-[theme.inkSmall]">minutes</span>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full px-6 py-3 rounded bg-[theme.accent] text-white hover:bg-[theme.accentStrong] transition-colors font-medium"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Task Summary */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-lg bg-white border border-[theme.border] p-6">
            <h3 className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked mb-3">
              Tasks
            </h3>
            <p className="text-[0.75rem] font-medium">
              {tasks.length} tasks
            </p>
            <p className="text-[0.5rem] text-[theme.inkSmall]">
              {completedTasks} completed
            </p>
          </div>
          <div className="rounded-lg bg-white border border-[theme.border] p-6">
            <h3 className="text-[0.5rem] text-[theme.inkSmall] uppercase tracked mb-3">
              Study Time
            </h3>
            <p className="text-[0.75rem] font-medium">
              {totalAllocatedMinutes} minutes allocated
            </p>
            <progress
              className="w-32 h-2 rounded-full appearance-none bg-[theme.soft] border border-[theme.border] mt-2"
              value={totalAllocatedMinutes}
              max={500}
            />
            <span className="text-[0.5rem] text-[theme.inkSmall] mt-1">
              {Math.round((totalAllocatedMinutes / 500) * 100)}% of weekly goal
            </span>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <p className="text-[0.5rem] text-[theme.inkSmall] text-center py-8">
              No tasks yet. Add a study task above to get started.
            </p>
          )}
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-lg bg-white border border-[theme.border] p-4 hover:bg-[theme.soft] transition-colors"
              style={{ borderColor: task.completed ? theme.accent : theme.border }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <svg
                    className={`w-5 h-5 ${task.completed ? "text-[theme.accent]" : "text-[theme.inkSmall]"}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12hM12 5lM19 12lM5 12" />
                  </svg>
                  <div>
                    <span className="text-[0.5rem] text-[theme.inkSmall]">
                      {task.task}
                    </span>
                    <span className="text-[0.4rem] text-[theme.inkSmall] opacity-60">
                      {task.subject}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[0.5rem] font-medium">
                    {task.allocatedMinutes} min
                  </span>
                </div>
              </div>
              <label
                className="cursor-pointer select-none"
                onClick={() => handleToggleTask(task.id)}
              >
                {task.completed ? (
                  <svg
                    className="w-4 h-4 text-[theme.accent]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path d="M5 12hM12 5lM19 12lM5 12" />
                  </svg>
                ) : (
                  "Mark as complete"
                )}
              </label>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}