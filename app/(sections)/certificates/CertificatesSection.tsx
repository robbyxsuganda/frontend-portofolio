"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiCalendar, HiX } from "react-icons/hi";
import SectionTitle from "@/app/components/ui/SectionTitle";
import FilterTabs from "@/app/components/ui/FilterTabs";
import Skeleton from "@/app/components/ui/Skeleton";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCertificates, useCertificateCategories } from "./hooks";
import type { Certificate, CertificateCategory } from "./types";

export default function CertificatesSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>("all");
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const { data: categories, isLoading: categoriesLoading } = useCertificateCategories();
  const { data: certificates, isLoading: certificatesLoading, error, refetch } = useCertificates(activeCategory);

  const isLoading = categoriesLoading || certificatesLoading;

  return (
    <section id="certificates">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t("certificates.title")} />

        {categoriesLoading ? (
          <div className="flex gap-2 mb-8">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} width={80} height={36} className="rounded-full" />
            ))}
          </div>
        ) : (
          <FilterTabs
            tabs={categories || []}
            activeTab={activeCategory}
            onTabChange={(key) => setActiveCategory(key as CertificateCategory)}
          />
        )}

        {error ? (
          <ErrorMessage message="Failed to load certificates" onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} height={250} className="rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {certificates?.map((cert) => (
                <motion.div
                  key={cert.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-gray-500 transition-colors duration-300 cursor-pointer group"
                  onClick={() => setSelectedCertificate(cert)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                        {t("certificates.viewCertificate")}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-[var(--surface)] text-[var(--foreground-secondary)] text-xs font-medium rounded-full capitalize border border-[var(--border)]">
                        {cert.category[0]}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[var(--foreground)] mb-1 font-[family-name:var(--font-sora)] line-clamp-2">
                      {cert.title}
                    </h3>

                    <p className="text-[var(--foreground-secondary)] text-sm mb-2">
                      {cert.issuer}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-[var(--foreground-secondary)]">
                      <HiCalendar className="w-3 h-3" />
                      <span>Issued {cert.issuedDate}</span>
                      {cert.expirationDate && (
                        <span className="text-yellow-500">
                          • Expires {cert.expirationDate}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Certificate Full Image Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <HiX className="w-6 h-6" />
            </button>

            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={selectedCertificate.image}
              alt={selectedCertificate.title}
              className="relative max-w-[98vw] w-auto max-h-[95vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
