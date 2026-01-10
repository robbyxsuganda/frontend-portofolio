import { IconType } from "react-icons";

export type SkillCategory = "all" | "language" | "framework" | "database" | "cloud" | "api" | "tools";

export interface Skill {
  name: string;
  icon: IconType;
  category: SkillCategory[];
}

export interface SkillCategoryTab {
  key: SkillCategory;
  label: string;
}
