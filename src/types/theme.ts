export const UNIVERSE_IDS = ["junior", "nexus", "ascend"] as const;

export type UniverseId = (typeof UNIVERSE_IDS)[number];

export type UniverseTone =
  | "coral"
  | "violet"
  | "sky"
  | "gold"
  | "mint"
  | "blush";

export interface UniverseTheme {
  id: UniverseId;
  name: string;
  shortName: string;
  ageGroup: string;
  ageLabel: string;
  tagline: string;
  description: string;
  longDescription: string;
  atmosphere: string;
  tone: UniverseTone;
  highlights: readonly string[];
  subjects: readonly string[];
}
