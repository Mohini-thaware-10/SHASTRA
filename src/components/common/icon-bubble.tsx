import { createElement } from "react";

import { iconMap } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { IconName } from "@/types/content";
import type { UniverseTone } from "@/types/theme";

import { toneStyles } from "@/content/landing";

interface IconBubbleProps {
  name: IconName;
  tone?: UniverseTone;
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
}

const sizeStyles = {
  sm: "h-9 w-9 rounded-[0.9rem]",
  md: "h-12 w-12 rounded-[1.15rem]",
  lg: "h-16 w-16 rounded-[1.4rem]",
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function IconBubble({
  name,
  tone = "violet",
  size = "md",
  className,
  iconClassName,
}: IconBubbleProps) {
  const icon = iconMap[name];
  const styles = toneStyles[tone];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center border",
        sizeStyles[size],
        styles.soft,
        styles.text,
        styles.border,
        className,
      )}
    >
      {createElement(icon, {
        className: cn(iconSizes[size], iconClassName),
        strokeWidth: 1.8,
      })}
    </span>
  );
}
