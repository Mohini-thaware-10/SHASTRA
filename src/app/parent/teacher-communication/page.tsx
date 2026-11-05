import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TeacherLayout } from "@/components/teacher/TeacherLayout";
import {
  ParentProfile,
  getParentById,
} from "@/data/parent/parent-data-provider";
import { TeacherLayoutHeader } from "@/components/teacher/TeacherLayoutHeader";
import { TeacherLayoutSidebar } from "@/components/teacher/TeacherLayoutSidebar";

const inter = Inter({ subsets: ["latvian"] });

export default function ParentTeacherCommunicationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get parentId from query param
  const parentId = searchParams.get("parentId") || "parent-1";

  // Verify parent access
  const parent = useDataProvider().getParentById(parentId);

  if (!parent) {
    return (
      <div className="p-8 text-center">
        <h2>Access Denied</h2>
        <p>Invalid or pending parent account.</p>
        <button
          onClick={() => router.push("/sign-in?role=parent")}
          className="mt-4 btn-primary"
        >
          Sign In as Parent
        </button>
      </div>
    );
  }

  // Get linked children
  const children = parent.linkedChildren || [];
  const selectedChildId = searchParams.get("childId") || (children.length > 0 ? children[0].id : "");
  const selectedChild = children.find((c) => c.id === selectedChildId) || null;

  // Mock teacher and communication data
  const mockTeacher = {
    name: "Mrs. Anita Sharma",
    subject: "Mathematics",
    class: "Class 5 A",
    school: "Springfields Public School",
  };

  const mockMessages = [
    {
      id: "msg-1",
      title: "Quarterly Assessment Schedule",
      date: "2024-11-20",
      type: "announcement",
      content: "The quarterly mathematics assessment will be held on December 5th. Please ensure your child is prepared.",
      read: false,
    },
    {
      id: "msg-2",
      title: "Learning Progress Update",
      date: "2024-11-18",
      type: "progress",
      content: "Your child has shown improvement in fractions. Current progress: 72%. Keep encouraging practice.",
      read: true,
    },
    {
      id: "msg-3",
      title: "Parent-Teacher Meeting",
      date: "2024-11-25",
      type: "meeting",
      content: "Parent-teacher meeting scheduled for December 10th, 3:00-5:00 PM. Your presence is appreciated.",
      read: false,
    },
  ];

  return (
    <TeacherLayout
      teacherId={parentId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={parentId}
          pathname="/parent/teacher-communication"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Teacher Communication
              </br>
              {selectedChild ? `for ${selectedChild.fullName}` : ""}
            </h1>

            {/* Teacher Information */}
            <section className="bg-white rounded-xl p-5 shadow-sm border-border mb-6">
              <h2 className="font-medium text-sm text-muted-foreground mb-3">Teacher Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Teacher</p>
                  <p className="font-medium">{mockTeacher.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Subject</p>
                  <p className="font-medium">{mockTeacher.subject}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Class</p>
                  <p className="font-medium">{mockTeacher.class}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">School</p>
                  <p className="font-medium">{mockTeacher.school}</p>
                </div>
              </div>
            </section>

            {/* Messages */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border mb-6">
              <h2 className="font-semibold text-lg mb-3">Messages</h2>
              <p className="text-sm text-muted-foreground mb-3">
                {mockMessages.length} messages
                </br>
                {mockMessages.filter((m) => !m.read).length} unread
              </p>
              <div className="space-y-3">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "p-3 rounded-border-border border-border border-border",
                      !message.read && "bg-background/50"
                    )}
                  >
                    <div className="flex items-between justify-between">
                      <div>
                        <p className="font-medium text-sm">{message.title}</p>
                        <p className="text-xs text-muted-foreground">{message.date}</p>
                      </div>
                      <span
                        className={cn(
                          "px-2 py-1 rounded text-xs",
                          !message.read ? "bg-primary/20 text-primary" : "bg-muted-foreground/20 text-muted-foreground"
                        )}
                      >
                        {message.read ? "Read" : "Unread"}
                      </span>
                    </div>
                    <p className="text-sm line-clamp-2">{message.content}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Compose Message */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border">
              <h2 className="font-semibold text-lg mb-3">Compose Message</h2>
              <p className="text-sm text-muted-foreground mb-3">
                Communication is prototype-only. Actual message delivery is not connected.
                </br>
                Do not share personal or confidential information.
              </p>
              <form className="space-y-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Recipient</label>
                  <p className="font-medium text-primary">{mockTeacher.name} — {mockTeacher.subject}</p>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Message</label>
                  <textarea
                    rows="4"
                    className="rounded border-border px-3 py-2 w-full resize-none"
                    placeholder="Write your message here..."
                    disabled
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn-primary" disabled>
                  Send Message (Prototype)
                  </button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Message sending is prototype-only and not connected to any backend.
                </p>
              </form>
            </section>

            {/* Child Selector */}
            {children.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h2 className="font-medium text-sm text-muted-foreground mb-3">View Communications For</h2>
                <div className="grid grid-cols-2 gap-2">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      className={cn(
                        "px-3 py-1 rounded border-border border-border text-sm",
                        searchParams.get("childId") === child.id && "bg-primary/10 text-primary"
                      )}
                      onClick={() => router.push(`/parent/teacher-communication?childId=${child.id}`)}
                    >
                      {child.fullName}
                      </br>
                      <span className="text-xs text-primary">{child.universe}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>
      </div>
    </TeacherLayout>
  );
}