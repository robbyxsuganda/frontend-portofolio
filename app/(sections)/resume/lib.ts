import { api } from "@/app/lib/api";
import { FALLBACK_EXPERIENCES } from "@/app/lib/fallback";
import type { Experience } from "./types";

export const getExperiences = () =>
  api.get<Experience[]>("/experiences", { tags: ["experiences"] }, FALLBACK_EXPERIENCES);
