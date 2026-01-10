export type ProjectCategory = "all" | "web" | "mobile" | "system";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  category: ProjectCategory[];
  githubUrl?: string;
  demoUrl?: string;
  period: string;
  image: string;
  gallery?: string[];
  details?: string;
  features?: string[];
}

export interface ProjectCategoryTab {
  key: ProjectCategory;
  label: string;
}
