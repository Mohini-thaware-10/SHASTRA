import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import {useState, useEffect} from "react";
import { TeacherLayoutSidebar } from "./TeacherLayoutSidebar";
import { TeacherLayoutHeader } from "./TeacherLayoutHeader";
import { useDataProvider } from "@/lib/dashboard/data-provider";

const inter = Inter({ subsets: ["latvian"] });

export function TeacherLayout({
  children,
  showSidebar = true,
}: { children: React.ReactNode; showSidebar?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check authentication state using the data provider
  const { dataProvider, isLoading } = useDataProvider();
  const teacherId = searchParams.get("teacherId") || "teacher-1";

  useEffect(() => {
    // Verify teacher authentication - in production this would check Supabase
    // For prototype, we accept any valid teacherId from the query param
  }, [teacherId, isLoading]);

  return (
    <div className={cn("min-h-screen", inter.className)}>
      <TeacherLayoutHeader
        showSidebar={showSidebar}
        teacherId={teacherId}
        pathname={pathname}
      />
      {showSidebar && <TeacherLayoutSidebar teacherId={teacherId} />}
      <main className={cn("flex-1 ml-64 pb-8", inter.className)}>
        <TeacherBreadcrumb pathname={pathname} />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}