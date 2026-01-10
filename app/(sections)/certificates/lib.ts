import { api } from "@/app/lib/api";
import { FALLBACK_CERTIFICATE_CATEGORIES, FALLBACK_CERTIFICATES } from "@/app/lib/fallback";
import type { FilterTab } from "@/app/lib/types";
import type { Certificate, CertificateCategory } from "./types";

export const getCertificateCategories = () =>
  api.get<FilterTab[]>(
    "/certificates/categories",
    { tags: ["certificate-categories"] },
    FALLBACK_CERTIFICATE_CATEGORIES
  );

export const getCertificates = (category?: CertificateCategory) => {
  // Filter fallback certificates based on category
  const filteredFallback =
    category && category !== "all"
      ? FALLBACK_CERTIFICATES.filter((cert) => cert.category.includes(category))
      : FALLBACK_CERTIFICATES;

  return api.get<Certificate[]>(
    category && category !== "all" ? `/certificates?category=${category}` : "/certificates",
    { tags: ["certificates"] },
    filteredFallback
  );
};
