export type OtherCategory = "all" | "achievement" | "activity" | "event";

export interface OtherItem {
  title: string;
  description: string;
  category: OtherCategory[];
  image: string;
  date: string;
  details?: string;
  gallery?: string[];
}

export interface OtherCategoryTab {
  key: OtherCategory;
  label: string;
}
