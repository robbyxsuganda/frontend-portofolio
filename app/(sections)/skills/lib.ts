import { api } from "@/app/lib/api";
import { FALLBACK_SKILL_CATEGORIES, FALLBACK_SKILLS } from "@/app/lib/fallback";
import type { FilterTab } from "@/app/lib/types";
import type { Skill, SkillCategory } from "./types";

export const getSkillCategories = () =>
  api.get<FilterTab[]>(
    "/skills/categories",
    { tags: ["skill-categories"] },
    FALLBACK_SKILL_CATEGORIES
  );

export const getSkills = (category?: SkillCategory) => {
  // Filter fallback skills based on category
  const filteredFallback =
    category && category !== "all"
      ? FALLBACK_SKILLS.filter((skill) => skill.category.includes(category))
      : FALLBACK_SKILLS;

  return api.get<Skill[]>(
    category && category !== "all" ? `/skills?category=${category}` : "/skills",
    { tags: ["skills"] },
    filteredFallback
  );
};
