import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type BadgeTone =
  | "neutral"
  | "violet"
  | "sky"
  | "gold"
  | "coral"
  | "mint"
  | "blush"
  | "dark";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  icon?: ReactNode;
  dot?: boolean;
}

const toneStyles: Record<BadgeTone, string> = {
  neutral: "border-line bg-white/70 text-ink-soft",
  violet: "border-violet/15 bg-violet-soft text-violet-strong",
  sky: "border-sky/20 bg-sky-soft text-[#287b9e]",
  gold: "border-gold/20 bg-gold-soft text-[#8e641b]",
  coral: "border-coral/20 bg-coral-soft text-[#a94b24]",
  mint: "border-mint/20 bg-mint-soft text-[#2e7f69]",
  blush: "border-blush/20 bg-blush-soft text-[#a8475f]",
  dark: "border-white/10 bg-white/[0.07] text-white/80",
};

export function Badge({
  className,
  tone = "neutral",
  icon,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em]",
        toneStyles[tone],
        className,
      )}
      {...props}
    >
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {icon}
      {children}
    </span>
  );
}
