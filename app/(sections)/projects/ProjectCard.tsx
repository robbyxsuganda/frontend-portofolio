"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--accent)] transition-colors duration-300 cursor-pointer group"
      onClick={() => onClick(project)}
    >
      {/* Thumbnail */}
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
            {t("projects.viewDetails")}
          </span>
        </div>
      </div>

      {/* Content */}
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

        {/* Tech Stack */}
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

        {/* Links */}
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
  );
}
