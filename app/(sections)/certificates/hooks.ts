import { useQuery } from "@tanstack/react-query";
import { getCertificates, getCertificateCategories } from "./lib";
import type { CertificateCategory } from "./types";

export function useCertificateCategories() {
  return useQuery({
    queryKey: ["certificate-categories"],
    queryFn: getCertificateCategories,
    staleTime: 1000 * 60 * 30,
  });
}

export function useCertificates(category?: CertificateCategory) {
  return useQuery({
    queryKey: ["certificates", category],
    queryFn: () => getCertificates(category),
    staleTime: 1000 * 60 * 5,
  });
}
