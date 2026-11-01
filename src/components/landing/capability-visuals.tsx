import {
  ArrowUpRight,
  BookOpen,
  Calculator,
  Check,
  Compass,
  FlaskConical,
  Languages,
  Sparkles,
  Speech,
  Sprout,
  Star,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

function OrbitChip({
  icon,
  label,
  className,
  delay,
}: {
  icon: ReactNode;
  label: string;
  className: string;
  delay: string;
}) {
  return (
    <div
      className={cn(
        "animate-shatra-float-slow absolute flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 py-1.5 pl-1.5 pr-2.5 shadow-[0_14px_32px_-24px_rgba(30,24,58,0.55)] backdrop-blur-sm",
        className,
      )}
      style={{ animationDelay: delay }}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-violet-soft text-violet-strong">
        {icon}
      </span>
      <span className="text-[0.6rem] font-semibold text-ink">{label}</span>
    </div>
  );
}

function PersonalisedVisual() {
  return (
    <div className="relative h-[260px] overflow-hidden rounded-[1.4rem] border border-violet/10 bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.95)_0%,rgba(238,233,255,0.8)_36%,rgba(229,244,251,0.34)_70%,transparent_100%)] sm:h-[280px]">
      <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-violet/25" />
      <div className="absolute left-1/2 top-1/2 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-sky/35" />
      <div className="absolute left-1/2 top-1/2 h-[94px] w-[94px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/40" />

      <div className="absolute left-1/2 top-1/2 flex h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/90 bg-[linear-gradient(145deg,#ffffff,#efeaff_65%,#dff4fb)] shadow-[0_22px_50px_-30px_rgba(111,92,224,0.65)]">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(145deg,#f6c9a6,#eca77f)]">
          <span className="relative h-6 w-6 rounded-full bg-[#2c245c]">
            <span className="absolute left-1 top-2 h-1 w-1 rounded-full bg-white" />
            <span className="absolute right-1 top-2 h-1 w-1 rounded-full bg-white" />
            <span className="absolute bottom-1.5 left-1/2 h-1 w-2 -translate-x-1/2 rounded-full bg-[#f6c9a6]" />
          </span>
        </span>
        <span className="mt-1.5 font-display text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-violet-strong">
          You
        </span>
      </div>

      <OrbitChip
        icon={<Calculator className="h-3 w-3" strokeWidth={2} />}
        label="Your pace"
        className="left-[5%] top-[16%]"
        delay="0s"
      />
      <OrbitChip
        icon={<FlaskConical className="h-3 w-3" strokeWidth={2} />}
        label="Your interests"
        className="right-[2%] top-[29%]"
        delay="1.2s"
      />
      <OrbitChip
        icon={<BookOpen className="h-3 w-3" strokeWidth={2} />}
        label="Your strengths"
        className="bottom-[15%] left-[4%]"
        delay="0.6s"
      />
      <OrbitChip
        icon={<Compass className="h-3 w-3" strokeWidth={2} />}
        label="Your goals"
        className="bottom-[9%] right-[6%]"
        delay="1.8s"
      />

      <span className="absolute right-[11%] top-[12%] h-2 w-2 rounded-full bg-gold/70" />
      <span className="absolute bottom-[27%] left-[10%] h-1.5 w-1.5 rounded-full bg-violet/60" />
    </div>
  );
}

function CompanionVisual() {
  return (
    <div className="relative mt-5 rounded-[1.25rem] border border-sky/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.9),rgba(229,244,251,0.7))] p-3">
      <div className="flex items-start gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#ffffff,#c8e9f4)] text-[#287b9e] shadow-sm">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <div className="max-w-[86%] rounded-2xl rounded-tl-md border border-white bg-white/85 px-3 py-2 shadow-[0_12px_28px_-24px_rgba(30,24,58,0.45)]">
          <p className="text-[0.66rem] leading-5 text-ink-soft">
            Why does ½ equal 2/4?
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-start justify-end gap-2">
        <div className="max-w-[88%] rounded-2xl rounded-br-md bg-[linear-gradient(135deg,#6f5ce0,#5443b6)] px-3 py-2 text-white shadow-[0_14px_30px_-22px_rgba(84,67,182,0.8)]">
          <p className="text-[0.65rem] leading-5 text-white/92">
            Picture a pizza cut into four. Two slices is still half. Want to try
            another example?
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 pl-11">
        <span className="h-1 w-1 rounded-full bg-sky" />
        <span className="h-1 w-1 rounded-full bg-sky/60" />
        <span className="h-1 w-1 rounded-full bg-sky/30" />
      </div>
    </div>
  );
}

function VernacularVisual() {
  const languages = ["English", "हिन्दी", "தமிழ்", "বাংলা", "मराठी"];

  return (
    <div className="mt-5 rounded-[1.25rem] border border-gold/20 bg-[linear-gradient(145deg,rgba(255,253,249,0.85),rgba(251,240,214,0.6))] p-3.5">
      <div className="flex items-center gap-2 text-[#8e641b]">
        <Speech className="h-4 w-4" strokeWidth={1.8} />
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em]">
          Explain it my way
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {languages.map((language, index) => (
          <span
            key={language}
            className={cn(
              "rounded-full border px-2.5 py-1 text-[0.64rem] font-semibold transition-colors",
              index === 1
                ? "border-gold/30 bg-gold text-white shadow-sm"
                : "border-gold/20 bg-white/75 text-[#8e641b]",
            )}
          >
            {language}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[0.62rem] leading-5 text-ink-muted">
        <Languages className="h-3.5 w-3.5 shrink-0 text-[#8e641b]" strokeWidth={1.8} />
        Concepts explained in the language students think in.
      </div>
    </div>
  );
}

function QuestsVisual() {
  return (
    <div className="mt-5">
      <div className="relative flex items-center justify-between px-2">
        <div className="absolute left-[16%] right-[16%] top-4 h-px border-t border-dashed border-violet/30" />
        {[
          { label: "Discover", done: true },
          { label: "Explore", done: true },
          { label: "Master", done: false },
        ].map((node, index) => (
          <div key={node.label} className="relative z-10 flex flex-col items-center gap-1.5">
            <span
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full border text-[0.6rem] font-bold",
                node.done
                  ? "border-violet/20 bg-violet text-white shadow-[0_8px_18px_-10px_rgba(111,92,224,0.7)]"
                  : "border-violet/25 bg-white text-violet",
              )}
            >
              {node.done ? (
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              ) : (
                index + 1
              )}
            </span>
            <span className="text-[0.55rem] font-semibold text-ink-muted">
              {node.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-violet/10 bg-white/60 px-3 py-2">
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Fraction Forge
        </span>
        <span className="rounded-full bg-violet-soft px-2 py-0.5 text-[0.58rem] font-bold text-violet-strong">
          +120 XP
        </span>
      </div>
    </div>
  );
}

function AssessmentsVisual() {
  const bars = [
    { height: "38%", tone: "bg-sky/50" },
    { height: "58%", tone: "bg-sky/70" },
    { height: "48%", tone: "bg-violet/60" },
    { height: "76%", tone: "bg-violet" },
    { height: "64%", tone: "bg-mint" },
  ];

  return (
    <div className="mt-5 rounded-[1.25rem] border border-mint/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.82),rgba(230,246,240,0.64))] p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-[#2e7f69]">
          Next question
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-0.5 text-[0.55rem] font-semibold text-[#2e7f69]">
          <TrendingUp className="h-3 w-3" strokeWidth={2} />
          Adaptive
        </span>
      </div>
      <div className="mt-3 flex h-20 items-end gap-2">
        {bars.map((bar, index) => (
          <div
            key={index}
            className={cn("flex-1 rounded-t-[0.45rem] rounded-b-sm", bar.tone)}
            style={{ height: bar.height }}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between text-[0.52rem] font-medium text-ink-muted/70">
        <span>Building</span>
        <span>Stretching</span>
        <span>Mastering</span>
      </div>
    </div>
  );
}

function ProgressVisual() {
  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="relative h-[88px] w-[88px] shrink-0">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(120,103,232,0.12)" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#7867e8"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="264"
            strokeDashoffset="58"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-lg font-semibold tracking-[-0.04em] text-ink">
            78%
          </span>
          <span className="text-[0.46rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            mastery
          </span>
        </div>
      </div>
      <div className="min-w-0">
        <span className="inline-flex items-center gap-1 rounded-full bg-mint-soft px-2 py-0.5 text-[0.55rem] font-bold text-[#2e7f69]">
          <TrendingUp className="h-3 w-3" strokeWidth={2.4} />
          +12% this week
        </span>
        <p className="mt-2 text-[0.65rem] leading-5 text-ink-muted">
          Momentum you can see, not just a score.
        </p>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 7 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "h-1.5 w-4 rounded-full",
                index < 5 ? "bg-violet/60" : "bg-violet/15",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightsVisual() {
  const cells = Array.from({ length: 20 }, (_, index) => {
    if ([3, 8, 14, 17].includes(index)) return "coral";
    if ([1, 5, 11, 16].includes(index)) return "gold";
    return "mint";
  });

  return (
    <div className="mt-4 rounded-[1.2rem] border border-sky/15 bg-[linear-gradient(145deg,rgba(255,255,255,0.84),rgba(229,244,251,0.6))] p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[0.58rem] font-semibold uppercase tracking-[0.15em] text-[#287b9e]">
          Class signal
        </span>
        <span className="text-[0.52rem] font-medium text-ink-muted">30 students</span>
      </div>
      <div className="mt-3 grid grid-cols-10 gap-1.5">
        {cells.map((tone, index) => (
          <span
            key={index}
            className={cn(
              "aspect-square rounded-full",
              tone === "mint" && "bg-mint/45",
              tone === "gold" && "bg-gold/55",
              tone === "coral" && "bg-coral/70",
            )}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[0.52rem] font-medium text-ink-muted">
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" /> On track
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Watch
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-coral" /> Support
        </span>
      </div>
    </div>
  );
}

function EarlySupportVisual() {
  return (
    <div className="mt-4 flex items-center gap-3">
      <div className="flex -space-x-1">
        {[
          { letter: "A", className: "bg-coral-soft text-[#a94b24] border-coral/20 -rotate-6" },
          { letter: "B", className: "bg-gold-soft text-[#8e641b] border-gold/20 rotate-3" },
          { letter: "C", className: "bg-mint-soft text-[#2e7f69] border-mint/20 -rotate-2" },
        ].map((block) => (
          <span
            key={block.letter}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-[0.9rem] border font-display text-lg font-bold shadow-sm",
              block.className,
            )}
          >
            {block.letter}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-white/75 py-1.5 pl-1.5 pr-3">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-gold-soft text-[#8e641b]">
          <Sprout className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
        <span className="text-[0.58rem] font-semibold text-ink-muted">
          Small steps, real confidence
        </span>
      </div>
      <Star className="ml-auto h-4 w-4 text-gold" strokeWidth={1.8} />
    </div>
  );
}

function DefaultVisual() {
  return (
    <div className="mt-4 flex items-center gap-2 text-[0.62rem] font-medium text-ink-muted">
      <ArrowUpRight className="h-3.5 w-3.5 text-violet" />
      Built into every learning path
    </div>
  );
}

export function CapabilityVisual({ id }: { id: string }) {
  switch (id) {
    case "personalised":
      return <PersonalisedVisual />;
    case "companion":
      return <CompanionVisual />;
    case "vernacular":
      return <VernacularVisual />;
    case "quests":
      return <QuestsVisual />;
    case "assessments":
      return <AssessmentsVisual />;
    case "progress":
      return <ProgressVisual />;
    case "insights":
      return <InsightsVisual />;
    case "early-support":
      return <EarlySupportVisual />;
    default:
      return <DefaultVisual />;
  }
}
