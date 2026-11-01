import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className }: PageShellProps) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className={cn("flex-1", className)}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
