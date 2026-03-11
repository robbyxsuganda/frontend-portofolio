"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Modal from "@/app/components/ui/Modal";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Project } from "./types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();

  return (
    <Modal
      isOpen={!!project}
      onClose={onClose}
      title={project?.title}
      size="2xl"
    >
      {project && (
        <div className="space-y-6">
          {/* Hero Image */}
          <div className="relative h-48 md:h-56 -mx-4 md:-mx-6 -mt-4 md:-mt-6 overflow-hidden rounded-t-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent" />
          </div>

          {/* Period Badge */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[var(--accent)] text-white text-sm rounded-full font-medium">
              {project.period}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">
              {t("projects.description")}
            </h4>
            <p className="text-[var(--foreground-secondary)] leading-relaxed">
              {project.details || project.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-medium text-[var(--foreground)] mb-3">
              {t("projects.techStack")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-[var(--accent)]/10 text-[var(--accent)] text-sm rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-[var(--foreground)] mb-3">
                {t("projects.keyFeatures")}
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-[var(--foreground-secondary)]"
                  >
                    <FaCheck className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-[var(--foreground)] mb-3">
                {t("projects.gallery")}
              </h4>
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
                {project.gallery.map((img, idx) => (
                  <SwiperSlide key={img || idx}>
                    <div className="relative h-56 md:h-72">
                      <Image
                        src={img}
                        alt={`${project.title} - ${idx + 1}`}
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

          {/* Action Links */}
          <div className="flex gap-3 pt-4 border-t border-[var(--border)]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <FaGithub className="w-5 h-5" />
                {t("projects.viewCode")}
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--foreground)] rounded-lg font-medium hover:bg-[var(--surface)] transition-colors"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
                {t("projects.liveDemo")}
              </a>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
