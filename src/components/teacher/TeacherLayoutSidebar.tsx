import { Inter } from "next/font/google";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useDataProvider } from "@/lib/dashboard/data-provider";
import {
  DashboardIcon,
  ClassesIcon,
  StudentsIcon,
  AnalyticsIcon,
  AssessmentsIcon,
  AssignmentsIcon,
  LessonPlannerIcon,
  InterventionsIcon,
  ReportsIcon,
  ProfileIcon,
  SettingsIcon,
} from "lucide-react";

const inter = Inter({ subsets: ["latvian"] });

export function TeacherLayoutSidebar({
  teacherId,
}: {
  teacherId: string;
}) {
  const { dataProvider } = useDataProvider();
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { key: "dashboard", icon: DashboardIcon, label: "Dashboard", href: "/teacher" },
    { key: "classrooms", icon: ClassesIcon, label: "My Classrooms", href: "/teacher/classrooms" },
    { key: "students", icon: StudentsIcon, label: "Students", href: "/teacher/students" },
    { key: "analytics", icon: AnalyticsIcon, label: "Learning Analytics", href: "/teacher/analytics" },
    { key: "assessments", icon: AssessmentsIcon, label: "Assessments", href: "/teacher/assessments" },
    { key: "assignments", icon: AssignmentsIcon, label: "Assignment Management", href: "/teacher/assignments" },
    { key: "lesson-planner", icon: LessonPlannerIcon, label: "Lesson Planner", href: "/teacher/lesson-planner" },
    { key: "interventions", icon: InterventionsIcon, label: "Intervention Centre", href: "/teacher/interventions" },
    { key: "reports", icon: ReportsIcon, label: "Reports", href: "/teacher/reports" },
    { key: "profile", icon: ProfileIcon, label: "Profile", href: "/teacher/profile" },
    { key: "settings", icon: SettingsIcon, label: "Settings", href: "/teacher/settings" },
  ];

  return (
    <aside
      className={cn(
        "w-64 h-screen bg-white border-r border-border flex flex-col",
        collapsed && "w-20",
        "shadow-lg",
        "sticky top-0",
        "border-border"
      )}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="font-semibold text-lg">{inter.name}</h2>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "hidden md:block p-2 rounded hover:bg-accent/10 transition-colors",
            "accordion-button"
          )}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 collapsed:w-5 collapsed:h-5 transition-transform"
            fill="currentColor"
          >
            <path d="M12 5l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <nav className="flex-1 flex flex-col pt-2 {
        !collapsed: p-4;
        collapsed: hidden;
      }">
        {collapsed ? (
          // Collapsed mode: show only icons as navigation items
          sidebarItems.map((item) => (
            <button
              key={item.key}
              className="p-2 rounded hover:bg-accent/10 transition-colors"
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
            </button>
          ))
        ) : (
          // Expanded mode: show icon + label
          sidebarItems.map((item) => (
            <button
              key={item.key}
              className="flex items-center py-2 px-3 rounded hover:bg-accent/10 transition-colors"
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))
        )}
      </nav>

      <div className="mt-auto p-4 border-t border-border">
        <ProfileDropdown />
      </div>
    </aside>
  );
}

interface ProfileDropdownProps {
  teacherId: string;
}

function ProfileDropdown() {
  return (
    <div>
      <button
        className="w-full flex items-center justify-between py-2 px-3 rounded border-border border-border hover:border-accent transition-colors"
        aria-haspopup="menu"
        aria-label="Teacher profile"
      >
        <span className="font-medium text-sm">Teacher</span>
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 collapsed:w-4 collapsed:h-4"
          fill="currentColor"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}