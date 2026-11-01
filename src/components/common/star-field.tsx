import { cn } from "@/lib/utils";

const stars = [
  { className: "left-[8%] top-[18%] h-1 w-1", delay: "0s" },
  { className: "left-[18%] top-[64%] h-1.5 w-1.5", delay: "1.4s" },
  { className: "left-[29%] top-[26%] h-1 w-1", delay: "2.1s" },
  { className: "left-[41%] top-[9%] h-1.5 w-1.5", delay: "0.8s" },
  { className: "left-[55%] top-[19%] h-1 w-1", delay: "2.8s" },
  { className: "left-[68%] top-[7%] h-1 w-1", delay: "1.9s" },
  { className: "left-[76%] top-[36%] h-1.5 w-1.5", delay: "0.4s" },
  { className: "left-[88%] top-[21%] h-1 w-1", delay: "2.5s" },
  { className: "left-[92%] top-[58%] h-1.5 w-1.5", delay: "1.1s" },
  { className: "left-[81%] top-[76%] h-1 w-1", delay: "3.1s" },
  { className: "left-[63%] top-[88%] h-1 w-1", delay: "0.6s" },
  { className: "left-[46%] top-[72%] h-1.5 w-1.5", delay: "1.7s" },
  { className: "left-[34%] top-[87%] h-1 w-1", delay: "2.3s" },
  { className: "left-[16%] top-[84%] h-1 w-1", delay: "0.9s" },
  { className: "left-[6%] top-[43%] h-1.5 w-1.5", delay: "3.4s" },
  { className: "left-[72%] top-[52%] h-0.5 w-0.5", delay: "1.3s" },
];

interface StarFieldProps {
  className?: string;
  tone?: "dark" | "light";
}

export function StarField({ className, tone = "dark" }: StarFieldProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {stars.map((star, index) => (
        <span
          key={index}
          className={cn(
            "animate-shatra-twinkle absolute rounded-full",
            star.className,
            tone === "dark" ? "bg-violet/55" : "bg-white/70",
          )}
          style={{ animationDelay: star.delay }}
        />
      ))}
    </div>
  );
}
