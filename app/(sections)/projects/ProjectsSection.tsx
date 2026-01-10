"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
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
import { useLanguage } from "@/app/context/LanguageContext";
import { useProjects, useProjectCategories } from "./hooks";
import type { Project, ProjectCategory } from "./types";

export default function ProjectsSection() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { data: categories, isLoading: categoriesLoading } = useProjectCategories();
  const { data: projects, isLoading: projectsLoading, error, refetch } = useProjects(activeCategory);

  const isLoading = categoriesLoading || projectsLoading;

  return (
    <section id="projects" className="bg-[var(--surface)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t("projects.title")} />

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
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] transition-colors duration-300 cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                        View Details
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-4">
                      <span className="text-xs text-[var(--foreground-secondary)] font-medium">
                        {project.period}
                      </span>
                      <h3 className="text-lg font-bold text-[var(--foreground)] mt-1 font-[family-name:var(--font-sora)]">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-[var(--foreground-secondary)] text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs rounded-md font-medium">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-[var(--border)]">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub className="w-4 h-4" />
                          {t("projects.viewCode")}
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaExternalLinkAlt className="w-4 h-4" />
                          {t("projects.liveDemo")}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
        size="2xl"
      >
        {selectedProject && (
          <div className="space-y-6">
            <div className="relative h-48 md:h-56 -mx-4 md:-mx-6 -mt-4 md:-mt-6 overflow-hidden rounded-t-2xl">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent" />
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[var(--accent)] text-white text-sm rounded-full font-medium">
                {selectedProject.period}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">Description</h4>
              <p className="text-[var(--foreground-secondary)] leading-relaxed">
                {selectedProject.details || selectedProject.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[var(--foreground)] mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] text-sm rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {selectedProject.features && selectedProject.features.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-[var(--foreground)] mb-3">Key Features</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[var(--foreground-secondary)]">
                      <FaCheck className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedProject.gallery && selectedProject.gallery.length > 0 && (
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
                  {selectedProject.gallery.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="relative h-56 md:h-72">
                        <Image
                          src={img}
                          alt={`${selectedProject.title} - ${idx + 1}`}
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

            <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  <FaGithub className="w-5 h-5" />
                  View Code
                </a>
              )}
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--surface)] transition-colors"
                >
                  <FaExternalLinkAlt className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
