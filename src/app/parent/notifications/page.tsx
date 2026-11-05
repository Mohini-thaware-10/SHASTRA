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

export default function ParentNotificationsPage() {
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

  // Mock notifications
  const mockNotifications = [
    {
      id: "notif-1",
      title: "Assessment Submitted",
      message: "Your child submitted the mathematics assessment",
      date: "2024-11-28",
      read: false,
      category: "assessment",
    },
    {
      id: "notif-2",
      title: "Learning Milestone",
      message: "Your child completed 20 lessons",
      date: "2024-11-25",
      read: true,
      category: "milestone",
    },
    {
      id: "notif-3",
      title: "Upcoming Quiz",
      message: "Mathematics quiz scheduled for December 5th",
      date: "2024-11-20",
      read: false,
      category: "upcoming",
    },
    {
      id: "notif-4",
      title: "Teacher Announcement",
      message: "Class schedule changed for next week",
      date: "2024-11-18",
      read: true,
      category: "announcement",
    },
  ];

  // Filter by read status
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <TeacherLayout
      teacherId={parentId}
      showSidebar={true}
    >
      <div className="min-h-span">
        <TeacherLayoutHeader
          showSidebar={true}
          teacherId={parentId}
          pathname="/parent/notifications"
        />
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-bold text-2xl mb-4">
              Notifications
              </br>
              {selectedChild ? `for ${selectedChild.fullName}` : ""}
            </h1>

            {/* Notification Count */}
            {unreadCount > 0 && (
              <div className="bg-error/10 text-error mb-4">
                <p className="text-sm text-error font-medium">
                  {unreadCount} unread notification{s unreadCount > 1 ? "s" : ""}
                  </br>
                  Review your notifications
                  </br>
                  <a href="/parent/notifications" className="text-error hover-underline">Mark all as read</a>
                </p>
              </div>
            )}

            {/* Notifications List */}
            <section className="bg-white rounded-xl p-6 shadow-sm border-border space-y-3">
              {mockNotifications.length === 0 ? (
                <p className="text-center text-muted-foreground mb-4">
                  No notifications.
                  </br>
                  {selectedChild ? `for ${selectedChild.fullName}` : ""}
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mockNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "p-3 rounded-border-border border-border border-border",
                        !notification.read && "bg-notification/20"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-md flex-shrink-0 bg-notification/20 flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-4 h-4"
                            fill="currentColor"
                          >
                            {notification.category === "assessment"
                              ? `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10h-2l-2-8H14V2z"/>
                              : notification.category === "milestone"
                                ? `<path d="M12 3l1.6 10.6L20.6 10.6l-3.4 20.6L12 21 5 10.6l-3.4-10.6L12 3z"/>
                                : `<path d="M12 5v14M18 2l-5 5-5-5H6l5 5V2h5zM6 2v6h12V2H6zm3 4h-2v2h2V6zM6 12h12v2H6V12z"/>`
                        }
                        />
                      </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{notification.date}</span>
                    </div>
                  ))}
                  {/* No notifications CTA */}
                  {mockNotifications.length === 0 && (
                    <p className="col-span-2 p-4 text-center text-muted-foreground">
                      No notifications.
                      </br>
                      <a href="/parent/notifications" className="text-primary hover-underline">Enable notifications</a>
                    </p>
                  )}
                </div>
              </section>

              {/* Mark All as Read */}
              {unreadCount > 0 && (
                <section className="mt-4 pt-3 border-t border-border">
                  <button
                    className="w-full btn-primary text-sm"
                  >
                    Mark All as Read
                    </button>
                  </section>
              )}
            </section>

            {/* Child Selector */}
            {children.length > 0 && (
              <section className="mt-6 pt-6 border-t border-border">
                <h2 className="font-medium text-sm text-muted-foreground mb-3">View Notifications For</h2>
                <div className="grid grid-cols-2 gap-2">
                  {children.map((child) => (
                    <button
                      key={child.id}
                      className={cn(
                        "px-3 py-1 rounded border-border border-border text-sm",
                        searchParams.get("childId") === child.id && "bg-primary/10 text-primary"
                      )}
                      onClick={() => router.push(`/parent/notifications?childId=${child.id}`)}
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