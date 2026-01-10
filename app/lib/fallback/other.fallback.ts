import type { OtherItem } from "@/app/(sections)/other/types";
import type { FilterTab } from "@/app/lib/types";

export const FALLBACK_OTHER_CATEGORIES: FilterTab[] = [
  { key: "all", label: "All" },
  { key: "achievement", label: "Achievement" },
  { key: "activity", label: "Activity" },
  { key: "event", label: "Event" },
];

export const FALLBACK_OTHER_ITEMS: OtherItem[] = [
  {
    title: "Teacher's Award - Hacktiv8",
    description:
      "Received the Teacher's Award during the Full Stack JavaScript Immersive Program at Hacktiv8, recognizing outstanding performance and dedication throughout the bootcamp.",
    category: ["achievement"],
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=Teachers+Award",
    date: "Mar 2025",
    details:
      "This award was given based on academic performance, collaboration with peers, and active participation in class activities throughout the 4-month intensive bootcamp program.",
  },
  {
    title: "Algorithm Solving Competition",
    description:
      "Participated in the Algorithm Solving Competition organized by Universitas Budi Luhur, demonstrating problem-solving skills and algorithmic thinking.",
    category: ["achievement", "event"],
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=Algorithm+Competition",
    date: "Jun 2021",
    details:
      "Competed against fellow students in solving various algorithmic challenges, showcasing proficiency in data structures and algorithms.",
  },
  {
    title: "INSW Project Contributor",
    description:
      "Contributing to the Indonesia National Single Window (INSW) project as a vendor for the Ministry of Finance of the Republic of Indonesia.",
    category: ["activity"],
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=INSW+Project",
    date: "Jul 2025 - Present",
    details:
      "Working on critical government infrastructure supporting national export-import processes, collaborating with multiple government agencies to ensure seamless system integration.",
  },
];
