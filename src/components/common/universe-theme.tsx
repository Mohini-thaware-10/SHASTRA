import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";
import type { UniverseId } from "@/types/theme";

interface UniverseThemeProps extends HTMLAttributes<HTMLDivElement> {
  universe: UniverseId;
}

/**
 * Scopes the SHATRA universe design tokens to a subtree.
 * Future dashboards can wrap entire screens with this component while
 * keeping the same component and token contracts.
 */
export function UniverseTheme({
  universe,
  className,
  children,
  ...props
}: UniverseThemeProps) {
  return (
    <div data-universe={universe} className={cn(className)} {...props}>
      {children}
    </div>
  );
}
