import { api } from "@/app/lib/api";
import { FALLBACK_SERVICES } from "@/app/lib/fallback";
import type { Service } from "./types";

export const getServices = () =>
  api.get<Service[]>("/services", { tags: ["services"] }, FALLBACK_SERVICES);
