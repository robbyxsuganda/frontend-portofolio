import { useQuery } from "@tanstack/react-query";
import { getOtherItems, getOtherCategories } from "./lib";
import type { OtherCategory } from "./types";

export function useOtherCategories() {
  return useQuery({
    queryKey: ["other-categories"],
    queryFn: getOtherCategories,
    staleTime: 1000 * 60 * 30,
  });
}

export function useOther(category?: OtherCategory) {
  return useQuery({
    queryKey: ["other", category],
    queryFn: () => getOtherItems(category),
    staleTime: 1000 * 60 * 5,
  });
}
