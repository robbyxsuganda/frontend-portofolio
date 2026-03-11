"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "@/app/components/ui/SectionTitle";
import FilterTabs from "@/app/components/ui/FilterTabs";
import Skeleton from "@/app/components/ui/Skeleton";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useProjects, useProjectCategories } from "./hooks";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import type { Project, ProjectCategory } from "./types";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const { data: categories, isLoading: categoriesLoading } = useProjectCategories();
  const {
    data: projects,
    isLoading: projectsLoading,
    error,
    refetch,
  } = useProjects(activeCategory);

  const isLoading = categoriesLoading || projectsLoading;

  return (
    <section id="projects" className="bg-[var(--surface)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t("projects.title")} />

        {/* Category Filter */}
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
            onTabChange={(key) => setActiveCategory(key as ProjectCategory)}
          />
        )}

        {/* Grid */}
        {error ? (
          <ErrorMessage message="Failed to load projects" onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} height={350} className="rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {projects?.map((project) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
