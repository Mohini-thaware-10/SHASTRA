import type { UniverseTone } from "./theme";

export type IconName =
  | "sparkles"
  | "compass"
  | "target"
  | "brain"
  | "languages"
  | "swords"
  | "gauge"
  | "chart"
  | "users"
  | "sprout"
  | "identity"
  | "map"
  | "quests"
  | "feedback"
  | "shield"
  | "book"
  | "atom"
  | "palette"
  | "music"
  | "globe"
  | "flask"
  | "calculator"
  | "trophy"
  | "flame"
  | "star"
  | "arrow"
  | "check"
  | "clock"
  | "lock"
  | "graduation"
  | "scan"
  | "wand";

export type CapabilitySize = "lead" | "wide" | "standard" | "compact";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface JourneyStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: IconName;
  tone: UniverseTone;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: UniverseTone;
  size: CapabilitySize;
}

export interface QuestPreview {
  id: string;
  title: string;
  subject: string;
  progress: number;
  xp: number;
  icon: IconName;
  tone: UniverseTone;
}

export interface SubjectWorld {
  id: string;
  name: string;
  mastery: number;
  icon: IconName;
  tone: UniverseTone;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  tone: UniverseTone;
  unlocked: boolean;
}

export interface TeacherInsight {
  label: string;
  value: string;
  helper: string;
  progress?: number;
  tone: UniverseTone;
}

export interface KnowledgeGap {
  topic: string;
  value: number;
  students: number;
  tone: UniverseTone;
}

export interface FooterColumn {
  title: string;
  links: readonly NavItem[];
}
