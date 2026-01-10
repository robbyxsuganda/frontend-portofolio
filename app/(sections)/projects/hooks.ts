import { useQuery } from "@tanstack/react-query";
import { getProjects, getProjectCategories } from "./lib";
import type { ProjectCategory } from "./types";

export function useProjectCategories() {
  return useQuery({
    queryKey: ["project-categories"],
    queryFn: getProjectCategories,
    staleTime: 1000 * 60 * 30,
  });
}

export function useProjects(category?: ProjectCategory) {
  return useQuery({
    queryKey: ["projects", category],
    queryFn: () => getProjects(category),
    staleTime: 1000 * 60 * 5,
  });
}
