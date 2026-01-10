import { api } from "@/app/lib/api";
import { FALLBACK_PROJECT_CATEGORIES, FALLBACK_PROJECTS } from "@/app/lib/fallback";
import type { FilterTab } from "@/app/lib/types";
import type { Project, ProjectCategory } from "./types";

export const getProjectCategories = () =>
  api.get<FilterTab[]>(
    "/projects/categories",
    { tags: ["project-categories"] },
    FALLBACK_PROJECT_CATEGORIES
  );

export const getProjects = (category?: ProjectCategory) => {
  // Filter fallback projects based on category
  const filteredFallback =
    category && category !== "all"
      ? FALLBACK_PROJECTS.filter((project) => project.category.includes(category))
      : FALLBACK_PROJECTS;

  return api.get<Project[]>(
    category && category !== "all" ? `/projects?category=${category}` : "/projects",
    { tags: ["projects"] },
    filteredFallback
  );
};
