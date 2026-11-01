import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  tone?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em]",
          tone === "light"
            ? "border-line bg-white/60 text-ink-muted"
            : "border-white/10 bg-white/[0.06] text-white/60",
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "light" ? "bg-violet" : "bg-gold",
          )}
        />
        {eyebrow}
      </span>

      <h2
        className={cn(
          "mt-5 text-[2rem] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-[2.5rem] lg:text-[3rem]",
          tone === "light" ? "text-ink" : "text-white",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-[0.975rem] leading-7 sm:text-base",
            tone === "light" ? "text-ink-soft" : "text-white/60",
            align === "center" && "mx-auto",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
