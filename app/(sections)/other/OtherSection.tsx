"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HiCalendar } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionTitle from "@/app/components/ui/SectionTitle";
import FilterTabs from "@/app/components/ui/FilterTabs";
import Modal from "@/app/components/ui/Modal";
import Skeleton from "@/app/components/ui/Skeleton";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { useOther, useOtherCategories } from "./hooks";
import type { OtherItem, OtherCategory } from "./types";

export default function OtherSection() {
  const [activeCategory, setActiveCategory] = useState<OtherCategory>("all");
  const [selectedItem, setSelectedItem] = useState<OtherItem | null>(null);
  const { data: categories, isLoading: categoriesLoading } = useOtherCategories();
  const { data: items, isLoading: itemsLoading, error, refetch } = useOther(activeCategory);

  const isLoading = categoriesLoading || itemsLoading;

  return (
    <section id="other" className="bg-[var(--surface)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title="Other Activities" />

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
            onTabChange={(key) => setActiveCategory(key as OtherCategory)}
          />
        )}

        {error ? (
          <ErrorMessage message="Failed to load activities" onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} height={280} className="rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {items?.map((item) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] transition-colors duration-300 cursor-pointer group"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                        View Details
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium rounded-full capitalize">
                        {item.category[0]}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[var(--foreground-secondary)]">
                        <HiCalendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[var(--foreground)] mb-2 font-[family-name:var(--font-sora)] line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-[var(--foreground-secondary)] text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.title}
        size="2xl"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="relative h-48 md:h-56 -mx-4 md:-mx-6 -mt-4 md:-mt-6 overflow-hidden rounded-t-2xl">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent" />
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[var(--accent)] text-white text-sm rounded-full font-medium capitalize">
                {selectedItem.category[0]}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-[var(--foreground-secondary)]">
                <HiCalendar className="w-4 h-4" />
                {selectedItem.date}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">Description</h4>
              <p className="text-[var(--foreground-secondary)] leading-relaxed">
                {selectedItem.details || selectedItem.description}
              </p>
            </div>

            {selectedItem.gallery && selectedItem.gallery.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[var(--foreground)] mb-3">Gallery</h4>
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={16}
                  slidesPerView={1}
                  className="rounded-xl overflow-hidden"
                  style={{
                    // @ts-expect-error - Custom CSS properties for Swiper
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                  }}
                >
                  {selectedItem.gallery.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative h-56 md:h-72">
                        <Image
                          src={img}
                          alt={`${selectedItem.title} - ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 640px"
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
