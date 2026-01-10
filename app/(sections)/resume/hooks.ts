import { useQuery } from "@tanstack/react-query";
import { getExperiences } from "./lib";

export function useExperiences() {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
    staleTime: 1000 * 60 * 5,
  });
}
