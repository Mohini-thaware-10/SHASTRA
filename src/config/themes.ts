import type { UniverseId, UniverseTheme } from "@/types/theme";
import { UNIVERSE_IDS } from "@/types/theme";

export const universeThemes: Record<UniverseId, UniverseTheme> = {
  junior: {
    id: "junior",
    name: "SHATRA Junior",
    shortName: "Junior",
    ageGroup: "Class 1–5",
    ageLabel: "Ages 6–11",
    tagline: "Wonder takes the wheel.",
    description:
      "A bright, playful world where friendly characters turn first lessons into everyday adventures.",
    longDescription:
      "Gentle challenges, colourful story worlds and a companion who celebrates every small win. Junior makes foundational learning feel safe, joyful and full of possibility.",
    atmosphere: "Playful · Warm · Encouraging",
    tone: "coral",
    highlights: ["Story-led lessons", "Friendly guides", "Gentle challenges"],
    subjects: ["Stories", "Numbers", "Nature", "Art"],
  },
  nexus: {
    id: "nexus",
    name: "SHATRA Nexus",
    shortName: "Nexus",
    ageGroup: "Class 6–10",
    ageLabel: "Ages 11–16",
    tagline: "Adventure meets mastery.",
    description:
      "Anime-inspired realms, character progression and quests that make deeper learning feel like discovery.",
    longDescription:
      "Nexus turns concepts into quests. Students explore subject worlds, grow their character and build real understanding through challenges designed around how they learn best.",
    atmosphere: "Adventurous · Bold · Curious",
    tone: "violet",
    highlights: ["Quest-based discovery", "Character progression", "Subject realms"],
    subjects: ["Mathematics", "Science", "Languages", "Social Studies"],
  },
  ascend: {
    id: "ascend",
    name: "SHATRA Ascend",
    shortName: "Ascend",
    ageGroup: "Class 11–12",
    ageLabel: "Ages 16–18",
    tagline: "Built for what comes next.",
    description:
      "A focused, future-facing academy for senior students, with stream-aware study spaces and clear progress.",
    longDescription:
      "Ascend brings calm structure to serious study. Stream-specific paths, adaptive practice and intelligent feedback help senior students move forward with confidence.",
    atmosphere: "Focused · Refined · Future-facing",
    tone: "sky",
    highlights: ["Stream-aware paths", "Deep practice", "Focused insight"],
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Commerce", "Humanities"],
  },
};

export const universes = UNIVERSE_IDS.map((id) => universeThemes[id]);

export const getUniverse = (id: UniverseId): UniverseTheme => universeThemes[id];

export const defaultUniverseId: UniverseId = "nexus";
