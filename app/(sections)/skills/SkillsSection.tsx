"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/app/components/ui/SectionTitle";
import FilterTabs from "@/app/components/ui/FilterTabs";
import Skeleton from "@/app/components/ui/Skeleton";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useSkills, useSkillCategories } from "./hooks";
import type { SkillCategory } from "./types";

export default function SkillsSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");
  const { data: categories, isLoading: categoriesLoading } = useSkillCategories();
  const { data: skills, isLoading: skillsLoading, error, refetch } = useSkills(activeCategory);

  const isLoading = categoriesLoading || skillsLoading;

  return (
    <section id="skills">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t("skills.title")} />

        {categoriesLoading ? (
          <div className="flex gap-2 mb-8">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} width={80} height={36} className="rounded-full" />
            ))}
          </div>
        ) : (
          <FilterTabs
            tabs={categories || []}
            activeTab={activeCategory}
            onTabChange={(key) => setActiveCategory(key as SkillCategory)}
          />
        )}

        {error ? (
          <ErrorMessage message="Failed to load skills" onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <Skeleton key={i} height={100} className="rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {skills?.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="flex flex-col items-center justify-center p-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)] transition-colors duration-300 cursor-pointer group"
                >
                  {skill.icon && (
                    <skill.icon className="w-10 h-10 text-[var(--foreground-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300" />
                  )}
                  <span className="mt-2 text-sm text-[var(--foreground)] text-center font-medium">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}