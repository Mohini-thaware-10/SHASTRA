import type {
  Achievement,
  Capability,
  IconName,
  JourneyStep,
  KnowledgeGap,
  QuestPreview,
  SubjectWorld,
  TeacherInsight,
} from "@/types/content";
import type { UniverseTone } from "@/types/theme";

export const heroContent = {
  eyebrow: "AI-powered learning · Class 1–12",
  titleLead: "Your World.",
  titleAccent: "Your Journey.",
  titleTail: "Your Growth.",
  description:
    "Discover a learning universe that adapts to you. Explore interactive worlds, complete exciting challenges and learn at your own pace with your personal AI companion.",
  primaryCta: { label: "Create Your Universe", href: "/sign-in" },
  secondaryCta: { label: "Explore SHATRA", href: "#universes" },
  proof: [
    { icon: "sparkles" as IconName, label: "Personalised from day one" },
    { icon: "compass" as IconName, label: "Three age-based universes" },
    { icon: "shield" as IconName, label: "Designed for Class 1–12" },
  ],
} as const;

export const universesSectionContent = {
  eyebrow: "Three universes. One journey.",
  title: "A learning world that grows with you.",
  description:
    "Every stage of school brings a different kind of curiosity. SHATRA meets students where they are with three distinct environments — connected by one deeply personal learning journey.",
  previewLabel: "Interactive preview",
  exploreLabel: "Explore this universe",
} as const;

export const journeySteps: readonly JourneyStep[] = [
  {
    id: "identity",
    number: "01",
    title: "Create your identity",
    description:
      "Tell SHATRA how you learn, what you love and where you want to grow. Your universe begins taking shape around you.",
    icon: "identity",
    tone: "violet",
  },
  {
    id: "universe",
    number: "02",
    title: "Discover your universe",
    description:
      "Step into a world built for your class, your pace and your interests — with a companion ready to guide the way.",
    icon: "map",
    tone: "sky",
  },
  {
    id: "quests",
    number: "03",
    title: "Learn through quests",
    description:
      "Turn lessons into challenges, stories and discoveries that make understanding feel earned and memorable.",
    icon: "quests",
    tone: "coral",
  },
  {
    id: "feedback",
    number: "04",
    title: "Grow through feedback",
    description:
      "See what you have mastered and what comes next, with intelligent guidance that adapts as you do.",
    icon: "feedback",
    tone: "gold",
  },
] as const;

export const howItWorksContent = {
  eyebrow: "How SHATRA works",
  title: "Four steps. One very personal journey.",
  description:
    "No two learners are the same. SHATRA starts with who you are, then builds an experience that keeps moving with you.",
} as const;

export const capabilities: readonly Capability[] = [
  {
    id: "personalised",
    title: "Personalised learning",
    description:
      "Every path is shaped around pace, strengths, interests and the goals that matter to each student.",
    icon: "compass",
    tone: "violet",
    size: "lead",
  },
  {
    id: "companion",
    title: "AI learning companion",
    description:
      "A patient guide that explains, encourages and knows when to step back so students can think for themselves.",
    icon: "sparkles",
    tone: "sky",
    size: "wide",
  },
  {
    id: "vernacular",
    title: "Vernacular tutoring",
    description:
      "Concepts explained in the language a student thinks in, without losing academic depth.",
    icon: "languages",
    tone: "gold",
    size: "standard",
  },
  {
    id: "quests",
    title: "Interactive learning quests",
    description:
      "Lessons become adventures with purpose, progress and a reason to keep going.",
    icon: "swords",
    tone: "coral",
    size: "wide",
  },
  {
    id: "assessments",
    title: "Adaptive assessments",
    description:
      "Checks that respond to ability, reveal real understanding and never feel like a trap.",
    icon: "gauge",
    tone: "mint",
    size: "standard",
  },
  {
    id: "progress",
    title: "Learning progress",
    description:
      "A clear, motivating view of mastery, momentum and the next meaningful step.",
    icon: "chart",
    tone: "violet",
    size: "compact",
  },
  {
    id: "insights",
    title: "Teacher insights",
    description:
      "Class-level signals that surface gaps early and point toward thoughtful interventions.",
    icon: "users",
    tone: "sky",
    size: "wide",
  },
  {
    id: "early-support",
    title: "Early learning support",
    description:
      "Warm, confidence-building foundations for younger learners and the skills they will carry forward.",
    icon: "sprout",
    tone: "gold",
    size: "standard",
  },
] as const;

export const capabilitiesSectionContent = {
  eyebrow: "Key capabilities",
  title: "The intelligence behind the adventure.",
  description:
    "Personalisation, guidance and insight working quietly together — so every student can move forward with confidence.",
} as const;

export const studentExperienceContent = {
  eyebrow: "The student experience",
  title: "Learning that feels like it belongs to you.",
  description:
    "An avatar that is truly yours. Worlds worth exploring. Quests that turn effort into progress. This is what a school day could feel like.",
  tabs: [
    { id: "quests", label: "Daily quests" },
    { id: "worlds", label: "Subject worlds" },
    { id: "achievements", label: "Achievements" },
  ],
  profile: {
    greeting: "Welcome back, Explorer",
    level: "Level 12",
    path: "Pathfinder",
    xp: "2,480",
    nextLevel: "320 XP to Level 13",
    streak: 14,
    rank: "Top 8% this week",
  },
  quests: [
    {
      id: "fractions",
      title: "Fraction Forge",
      subject: "Mathematics",
      progress: 72,
      xp: 120,
      icon: "calculator",
      tone: "violet",
    },
    {
      id: "ecosystem",
      title: "Ecosystem Expedition",
      subject: "Science",
      progress: 45,
      xp: 90,
      icon: "flask",
      tone: "mint",
    },
    {
      id: "story",
      title: "Story Alchemist",
      subject: "English",
      progress: 88,
      xp: 110,
      icon: "book",
      tone: "gold",
    },
  ] satisfies readonly QuestPreview[],
  worlds: [
    { id: "math", name: "Mathematics", mastery: 82, icon: "calculator", tone: "violet" },
    { id: "science", name: "Science", mastery: 74, icon: "flask", tone: "mint" },
    { id: "english", name: "English", mastery: 88, icon: "book", tone: "gold" },
    { id: "social", name: "Social Studies", mastery: 63, icon: "globe", tone: "sky" },
    { id: "arts", name: "Creative Arts", mastery: 91, icon: "palette", tone: "blush" },
    { id: "language", name: "Hindi", mastery: 77, icon: "languages", tone: "coral" },
  ] satisfies readonly SubjectWorld[],
  achievements: [
    {
      id: "streak",
      title: "Fortnight Flame",
      description: "14-day learning streak",
      icon: "flame",
      tone: "coral",
      unlocked: true,
    },
    {
      id: "fractions",
      title: "Fraction Master",
      description: "Completed Fraction Forge",
      icon: "star",
      tone: "gold",
      unlocked: true,
    },
    {
      id: "curious",
      title: "Curiosity Badge",
      description: "Asked 50 great questions",
      icon: "sparkles",
      tone: "violet",
      unlocked: true,
    },
    {
      id: "science",
      title: "Ecosystem Explorer",
      description: "Finish the Science expedition",
      icon: "flask",
      tone: "mint",
      unlocked: false,
    },
    {
      id: "writer",
      title: "Story Alchemist",
      description: "Complete three writing quests",
      icon: "book",
      tone: "gold",
      unlocked: false,
    },
    {
      id: "zenith",
      title: "Nexus Zenith",
      description: "Reach Level 15",
      icon: "trophy",
      tone: "sky",
      unlocked: false,
    },
  ] satisfies readonly Achievement[],
} as const;

export const teacherExperienceContent = {
  eyebrow: "For teachers",
  title: "See the whole class. Reach every learner.",
  description:
    "SHATRA gives teachers a clear view of class progress, surfaces knowledge gaps early and suggests thoughtful next steps — without adding to the workload.",
  bullets: [
    {
      icon: "chart" as IconName,
      title: "Class performance insights",
      description: "A calm, current picture of how the class is really progressing.",
    },
    {
      icon: "scan" as IconName,
      title: "Knowledge gap identification",
      description: "Spot the concepts holding students back before they become patterns.",
    },
    {
      icon: "wand" as IconName,
      title: "Assessment assistance",
      description: "Thoughtful prompts and checks that respect teacher judgement.",
    },
    {
      icon: "target" as IconName,
      title: "Student progress tracking",
      description: "Individual momentum without losing sight of the whole room.",
    },
    {
      icon: "sprout" as IconName,
      title: "Suggested interventions",
      description: "Practical next steps, ready when a learner needs something different.",
    },
  ],
  panel: {
    label: "Illustrative preview",
    className: "Class 8B · Mathematics",
    period: "This week",
    metrics: [
      { label: "Class mastery", value: "72%", helper: "+6% from last week", progress: 72, tone: "sky" },
      { label: "Needs attention", value: "4", helper: "students flagged early", progress: 24, tone: "coral" },
      { label: "Weekly growth", value: "+8%", helper: "across core topics", progress: 68, tone: "mint" },
    ] satisfies readonly TeacherInsight[],
    gaps: [
      { topic: "Fractions & ratios", value: 38, students: 9, tone: "coral" },
      { topic: "Linear equations", value: 54, students: 6, tone: "gold" },
      { topic: "Geometry reasoning", value: 71, students: 3, tone: "sky" },
    ] satisfies readonly KnowledgeGap[],
    intervention: {
      title: "Suggested next step",
      description:
        "A short visual refresher on fractions could help 9 students reconnect with the current unit.",
      action: "View learning path",
    },
  },
} as const;

export const finalCtaContent = {
  eyebrow: "Your next chapter",
  titleLead: "Your Learning Adventure",
  titleAccent: "Starts Here.",
  description:
    "One platform. Endless possibilities. A learning journey designed around you.",
  cta: { label: "Start Your Journey", href: "/sign-in" },
  secondary: { label: "Explore the universes", href: "#universes" },
  note: "Class 1–12 · Three universes · One personalised journey",
} as const;

export const toneStyles: Record<
  UniverseTone,
  { soft: string; text: string; solid: string; border: string }
> = {
  coral: {
    soft: "bg-[#fff0e8]",
    text: "text-[#b95328]",
    solid: "bg-[#ea8858]",
    border: "border-[#f6d3c2]",
  },
  violet: {
    soft: "bg-[#efeaff]",
    text: "text-[#5d4bc9]",
    solid: "bg-[#7b6ce8]",
    border: "border-[#ded5ff]",
  },
  sky: {
    soft: "bg-[#e7f5fb]",
    text: "text-[#287b9e]",
    solid: "bg-[#6bb5d8]",
    border: "border-[#cce8f3]",
  },
  gold: {
    soft: "bg-[#fbf1d8]",
    text: "text-[#976a1c]",
    solid: "bg-[#d5a13f]",
    border: "border-[#f0dfb6]",
  },
  mint: {
    soft: "bg-[#e8f6f1]",
    text: "text-[#2e7f69]",
    solid: "bg-[#69b99f]",
    border: "border-[#cfe9df]",
  },
  blush: {
    soft: "bg-[#fdeef1]",
    text: "text-[#b34f68]",
    solid: "bg-[#e58ba0]",
    border: "border-[#f6d6de]",
  },
};
