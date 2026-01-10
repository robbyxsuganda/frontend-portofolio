import { api } from "@/app/lib/api";
import { FALLBACK_OTHER_CATEGORIES, FALLBACK_OTHER_ITEMS } from "@/app/lib/fallback";
import type { FilterTab } from "@/app/lib/types";
import type { OtherItem, OtherCategory } from "./types";

export const getOtherCategories = () =>
  api.get<FilterTab[]>(
    "/other/categories",
    { tags: ["other-categories"] },
    FALLBACK_OTHER_CATEGORIES
  );

export const getOtherItems = (category?: OtherCategory) => {
  // Filter fallback items based on category
  const filteredFallback =
    category && category !== "all"
      ? FALLBACK_OTHER_ITEMS.filter((item) => item.category.includes(category))
      : FALLBACK_OTHER_ITEMS;

  return api.get<OtherItem[]>(
    category && category !== "all" ? `/other?category=${category}` : "/other",
    { tags: ["other"] },
    filteredFallback
  );
};
