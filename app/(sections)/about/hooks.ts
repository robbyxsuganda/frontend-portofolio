import { useQuery } from "@tanstack/react-query";
import { getProfile, getEducation, getStats } from "./lib";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 1000 * 60 * 5,
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ["education"],
    queryFn: getEducation,
    staleTime: 1000 * 60 * 5,
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 1000 * 60 * 5,
  });
}
