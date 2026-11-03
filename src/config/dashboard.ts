import type { UniverseId } from "@/types/theme";

export const JUNIOR_SUBJECTS = ["Mathematics", "EVS", "Language", "Art"] as const;
export type JuniorSubject = (typeof JUNIOR_SUBJECTS)[number];

export const NEXUS_SUBJECTS = ["Mathematics", "Science", "Languages", "Social Studies"] as const;
export type NexusSubject = (typeof NEXUS_SUBJECTS)[number];

export const ASCEND_SUBJECTS = [
  "Physics",
  "Chemistry",
  "Mathematics",
  "Biology",
  "Commerce",
  "Humanities",
] as const;
export type AscendSubject = (typeof ASCEND_SUBJECTS)[number];

export type SelectedSubject =
  | (typeof JUNIOR_SUBJECTS)[number]
  | (typeof NEXUS_SUBJECTS)[number]
  | (typeof ASCEND_SUBJECTS)[number];

export const universeSubjectsMap: Record<UniverseId, readonly string[]> = {
  junior: JUNIOR_SUBJECTS,
  nexus: NEXUS_SUBJECTS,
  ascend: ASCEND_SUBJECTS,
};

export const universeThemesConfig: Record<UniverseId, UniverseThemeConfig> = {
  junior: {
    id: "junior",
    name: "SHATRA Junior",
    tone: "coral",
    accentColor: "#e98757",
    softColor: "#fff0e7",
    textColor: "#512917",
    borderColor: "#f1cfbb",
    cardBackground: "#fffaf4",
    progressionColor: "#ffd7c0",
  },
  nexus: {
    id: "nexus",
    name: "SHATRA Nexus",
    tone: "violet",
    accentColor: "#6f5ce0",
    softColor: "#f0ecff",
    textColor: "#2c245c",
    borderColor: "#ddd4ff",
    cardBackground: "#fbf9ff",
    progressionColor: "#dcd4ff",
  },
  ascend: {
    id: "ascend",
    name: "SHATRA Ascend",
    tone: "sky",
    accentColor: "#277d99",
    softColor: "#edf6fa",
    textColor: "#17324a",
    borderColor: "#cfe3ed",
    cardBackground: "#f9fbfc",
    progressionColor: "#d6eaf2",
  },
};

export const universeClassRanges: Record<UniverseId, { min: number; max: number }> = {
  junior: { min: 1, max: 5 },
  nexus: { min: 6, max: 10 },
  ascend: { min: 11, max: 12 },
};

export function getUniverseForClass(classNum: number): UniverseId {
  if (classNum >= 1 && classNum <= 5) return "junior";
  if (classNum >= 6 && classNum <= 10) return "nexus";
  return "ascend";
}

export function getUniverseTheme(universeId: UniverseId): UniverseThemeConfig {
  return universeThemesConfig[universeId];
}

export function getSubjectsForUniverse(universeId: UniverseId): readonly string[] {
  return universeSubjectsMap[universeId];
}