import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latvian"] });

export function TeacherLayoutHeader({
  showSidebar,
  teacherId,
  pathname,
}: {
  showSidebar: boolean;
  teacherId: string;
  pathname: string;
}) {
  const { dataProvider } = useDataProvider();
  const [teacher, setTeacher] = useState<object | null>(null);
  const [notifications, setNotifications] = useState<readonly { id: string; title: string; message: string; read: boolean; }[]>([]);

  useEffect(() => {
    // Fetch teacher profile from data provider
    const teacherData = dataProvider.getTeacherById(teacherId);
    if (teacherData) {
      setTeacher(teacherData);
    }
  }, [teacherId, dataProvider]);

  useEffect(() => {
    // Fetch notifications
    const notifs = dataProvider.getNotificationsForTeacher(teacherId);
    setNotifications(notifs);
  }, [teacherId, dataProvider]);

  return (
    <header
      className={cn(
        "bg-white border-b border-border",
        "shadow-sm",
        "px-6 py-3",
        "!fixed top-0 left-0 right-0 z-10",
        "!backdrop-filter-blur-sm"
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Brand/Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/icon.svg"
            alt="SHATRA"
            width="32"
            height="32"
            className="object-contain"
          />
          <span className="font-bold text-lg uppercase tracking-wider">SHATRA</span>
        </div>

        {/* Main navigation toggle */}
        <button
          onClick={() => {}}
          className={cn(
            "md:hidden p-2 rounded hover:bg-accent/10 transition-colors",
            "accordion-button"
          )}
          aria-label="Open sidebar"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="currentColor"
          >
            <path d="M3 12l2-2m0 6l2-2m-2 2l2-2m6 12l2-2m-2-6l2-2m2 6l2-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Teacher profile and notifications */}
        <div className="flex items-center gap-4">
          {/* Notifications bell */}
          <button
            aria-label="Notifications"
            className="relative p-2 rounded hover:bg-accent/10 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="currentColor"
            >
              <path d="M18 8A6 6 0 008 8C5.95 8 4 9.95 4 12A5 5 0 019 16a4 4 0 001.371-3H14c.497 0 .684-.12.684-.4v-.2c0-.33-.174-.55-.481-.7H8a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2v-6a2 2 0 00-.581-1H12.684c.001-.269-.124-.489-.325-.7H5.981a2.997 2.997 0 00-.828 1.5H3.35a2 2 0 01-2-2V8z" />
              <circle cx="8" cy="8" r="3" fill="currentColor" opacity="0.4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 right-1 bg-red-500 text-xs text-white rounded w-2 h-2 flex items-center justify-center">
                  {notifications.length > 9 ? "9+" : notifications.length}
                </span>
              )}
            </svg>
          </button>

          {/* Teacher name */}
          {teacher && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-border-border border-border hover:border-accent transition-colors">
              <Image
                src="/avatars/teacher1.png"
                alt="Teacher"
                width: 28
                height: 28
                className="rounded-full object-cover"
              />
              <span className="font-medium text-sm">
                {teacher.fullName.split(" ")[0]}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}