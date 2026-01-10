import { useQuery } from "@tanstack/react-query";
import { getSkills, getSkillCategories } from "./lib";
import type { SkillCategory } from "./types";

export function useSkillCategories() {
  return useQuery({
    queryKey: ["skill-categories"],
    queryFn: getSkillCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes - categories rarely change
  });
}

export function useSkills(category?: SkillCategory) {
  return useQuery({
    queryKey: ["skills", category],
    queryFn: () => getSkills(category),
    staleTime: 1000 * 60 * 5,
  });
}
