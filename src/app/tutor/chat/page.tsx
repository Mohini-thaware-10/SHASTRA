import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  LearnerContext,
  MockTutorResponseProvider,
  TutorResponseProvider,
} from "@/types/intelligence/models";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function TutorChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get studentId from query param
  const studentId = searchParams.get("studentId") || "student-1";

  // Verify student access
  const { dataProvider } = useDataProvider();

  // Initialize tutor response provider
  const tutorProvider: TutorResponseProvider = {
    getConceptExplanation: (topic, classLevel, universe) => ({
      id: `exp-${topic}`,
      type: "concept",
      content: `Concept explanation for ${topic}`,
      language: "en",
      classAppropriate: true,
      universeAppropriate: true,
      supportsSteps: true,
    }),
    getStepByStepSolution: (problem, classLevel, universe) => ({
      id: `solution-${problem}`,
      type: "solution",
      content: `Step-by-step solution for ${problem}`,
      language: "en",
      classAppropriate: true,
      universeAppropriate: true,
      supportsSteps: true,
    }),
    getHint: (questionId, classLevel, universe) => ({
      id: `hint-${questionId}`,
      type: "hint",
      content: `Hint for question ${questionId}`,
      language: "en",
      classAppropriate: true,
      universeAppropriate: true,
      supportsSteps: false,
    }),
    getPracticeQuestion: (params) => [
      {
        id: `q-${Math.random().toString(36).slice(2, 9)}`,
        subject: params.subject,
        topic: params.topic,
        questionType: "mcq" as const,
        questionText: `Practice question on ${params.topic}`,
        options: [
          { id: "a", text: "Option A", selected: false },
          { id: "b", text: "Option B", selected: false },
        ],
        correctAnswers: ["a"],
        explanation: "Explanation of the practice question",
        estimatedDuration: 10,
      },
    ],
    getRecommendations: (context) => [],
    getSessionSummary: () => "Session summary.",
  };

  // State
  const [messages, setMessages] = useState<{ id: string; type: "student" | "tutor"; content: string; timestamp: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [universe, setUniverse] = useState<"junior" | "nexus" | "ascend">("nexus");
  const [classLevel, setClassLevel] = useState<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "9" | "10" | "11" | "12">("8");

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    // Add student message
    const studentMessage = {
      id: `msg-${Date.now()}`,
      type: "student",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, studentMessage]);
    setInput("");

    // Simulate tutor response
    setIsTyping(true);

    // Simulate network delay
    setTimeout(() => {
      // Generate a response based on the input
      let tutorContent = "";

      if (input.toLowerCase().includes("fractions")) {
        tutorContent = `Fractions represent parts of a whole. If you have a pizza cut into 8 slices and eat 3, you've eaten 3/8 of the pizza. Would you like to try a practice question on fractions?`;
      } else if (input.toLowerCase().includes("algebra")) {
        tutorContent = `Algebra uses symbols, usually letters, to represent numbers in equations and formulas. For example, in the equation x + 3 = 7, x equals 4. Would you like to try a practice problem on algebra?`;
      } else if (input.toLowerCase().includes("help")) {
        tutorContent = `I'm here to help you learn! You can ask me to explain concepts, solve problems, give hints, or generate practice questions. What would you like to work on?`;
      } else {
        tutorContent = `That's a great question about ${input}. Let me help you understand this better. Could you tell me more about what specific concept you'd like to explore?`;
      }

      const tutorMessage = {
        id: `msg-${Date.now() + 1}`,
        type: "tutor",
        content: tutorContent,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, studentMessage, tutorMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Clear conversation
  const handleClear = () => {
    setMessages([]);
  };

  return (
    <TeacherLayout
      teacherId="parent-1"
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId="parent-1"
          pathname="/tutor/chat"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">

            {/* Chat Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-2xl">AI Tutor Chat</h2>
                <p className="text-sm text-muted-foreground">
                  {universe === "junior"
                    ? "Ask your learning companion!"
                    : universe === "nexus"
                      ? "Ask your academy guide!"
                      : "Ask your academic tutor!"
                  }
                  </br>
                  Class {classLevel}
                  </br>
                  prototype: Not connected to a live AI model.
                </p>
              </div>
              <button
                onClick={handleClear}
                className="text-xs text-primary hover-underline"
              >
                Clear conversation
                </button>
            </div>

            {/* Chat Area */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-border h-[500px] overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-muted-foreground mb-4">
                  Start the conversation by typing a message below.
                  </br>
                  {universe === "junior"
                    ? "I'm your learning companion. I can help you with math, science, and more!"
                    : universe === "nexus"
                      ? "I'm your academy guide. I can help you with lessons, practice, and questions!"
                      : "I'm your academic tutor. I can help you with concepts, problems, and exam preparation."
                  }
                  </span>
                </p>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex items-start gap-3",
                        message.type === "tutor" && "text-right"
                      )}
                    >
                      <div className={cn(
                        "max-w-70 rounded-xl px-3 py-2 text-sm",
                        message.type === "student"
                          ? "bg-background/50 text-primary"
                          : "bg-white text-primary"
                        )}
                      >
                        <p className="text-sm line-clamp-3">{message.content}</p>
                        <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                      </div>
                      {message.type === "tutor" && (
                        <div className="ml-10 max-w-70 rounded-xl px-3 py-2 text-sm text-primary">
                          <p className="text-sm line-clamp-3">{message.content}</p>
                          <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-3 pb-4 text-muted-foreground text-xs">
                <div className="w-8 h-8 rounded-md flex-shrink-0 bg-background/50 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="currentColor"
                  >
                    <path d="M12 5.6L8.6 2H15.4zM12 10.4l3.4 5.8L15.6 18.6l-3.4-3.4L12 13.6l3.4-5.8L12 10.4z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm">Tutor is typing...</p>
                </div>
              </div>
            )}

            {/* Message Composer */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-border border-border bg-background"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-border-border border-border border-border px-3 py-2"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping}
                  className="px-4 py-2 rounded-border-border border-border border-border text-primary hover-underline"
                  disabled={isTyping}
                >
                  Send
                  </button>
                </button>
              </div>

              {/* Suggested Prompts */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  className="px-3 py-1 rounded-border-border border-border border-border text-xs text-primary hover-underline"
                  onClick={() => setInput("Can you explain fractions?")}
                >
                  Explain fractions
                  </button>
                <button
                  className="px-3 py-1 rounded-border-border border-border border-border text-xs text-primary hover-underline"
                  onClick={() => setInput("Help me with algebra")}
                  >
                  Help with algebra
                  </button>
                <button
                  className="px-3 py-1 rounded-border-border border-border border-border text-xs text-primary hover-underline"
                  onClick={() => setInput("Give me a hint")}
                  >
                  Give me a hint
                  </button>
                <button
                  className="px-3 py-1 rounded-border-border border-border border-border text-xs text-primary hover-underline"
                  onClick={() => setInput("Generate practice questions")}
                  >
                  Practice questions
                  </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}