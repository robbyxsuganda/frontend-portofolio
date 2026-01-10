import { api } from "@/app/lib/api";
import {
  FALLBACK_PROFILE,
  FALLBACK_EDUCATION,
  FALLBACK_STATS,
  FALLBACK_SOCIAL_MEDIA,
} from "@/app/lib/fallback";
import type { Profile, Education, Stat, SocialMedia } from "./types";

export const getProfile = () =>
  api.get<Profile>("/profile", { tags: ["profile"] }, FALLBACK_PROFILE);

export const getEducation = () =>
  api.get<Education[]>("/education", { tags: ["education"] }, FALLBACK_EDUCATION);

export const getStats = () =>
  api.get<Stat[]>("/stats", { tags: ["stats"] }, FALLBACK_STATS);

export const getSocialMedia = () =>
  api.get<SocialMedia[]>("/social-media", { tags: ["social-media"] }, FALLBACK_SOCIAL_MEDIA);
