import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  showWordmark?: boolean;
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

const markSizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const wordSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function BrandMark({
  className,
  showWordmark = true,
  tone = "dark",
  size = "md",
}: BrandMarkProps) {
  const isLight = tone === "light";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[30%]",
          markSizes[size],
          isLight
            ? "bg-white/10 ring-1 ring-white/20"
            : "bg-[linear-gradient(145deg,#2d2550_0%,#3c316a_55%,#6a57d5_100%)] shadow-[0_10px_24px_-14px_rgba(36,30,61,0.65)]",
        )}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 48 48"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="24"
            cy="24"
            r="17.5"
            stroke={isLight ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.22)"}
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <ellipse
            cx="24"
            cy="24"
            rx="20"
            ry="8"
            transform="rotate(-32 24 24)"
            stroke={isLight ? "rgba(255,255,255,0.36)" : "rgba(255,255,255,0.28)"}
            strokeWidth="1"
          />
          <path
            d="M24 9.5L26.7 20.9L38.5 24L26.7 27.1L24 38.5L21.3 27.1L9.5 24L21.3 20.9L24 9.5Z"
            fill="#f2ebff"
          />
          <circle cx="35.5" cy="12.5" r="2.1" fill="#f0c978" />
        </svg>
      </span>

      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display font-semibold tracking-[0.24em]",
              wordSizes[size],
              isLight ? "text-white" : "text-ink",
            )}
          >
            SHATRA
          </span>
          <span
            className={cn(
              "mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.3em]",
              isLight ? "text-white/50" : "text-ink-muted",
            )}
          >
            Learn beyond limits
          </span>
        </span>
      ) : null}
    </span>
  );
}
