"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiBriefcase } from "react-icons/hi";
import SectionTitle from "@/app/components/ui/SectionTitle";
import Skeleton from "@/app/components/ui/Skeleton";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useExperiences } from "./hooks";

export default function ResumeSection() {
  const { t } = useLanguage();
  const { data: experiences, isLoading, error, refetch } = useExperiences();

  return (
    <section id="resume">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t("resume.title")} />

        {error ? (
          <ErrorMessage message="Failed to load experiences" onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="space-y-8">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex gap-8">
                <Skeleton variant="circular" width={48} height={48} />
                <Skeleton height={200} className="flex-1 rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)] md:-translate-x-0.5"></div>

            {/* Experience Items */}
            <div className="space-y-8 md:space-y-12">
              {experiences?.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Logo */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-4 border-[var(--background)] shadow-lg">
                      <Image
                        src={exp.logo}
                        alt={exp.company}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Period Badge */}
                  <div
                    className={`hidden md:flex md:w-1/2 items-start ${
                      index % 2 === 0 ? "justify-end pr-16" : "justify-start pl-16"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] text-[var(--foreground-secondary)] text-sm font-medium border border-[var(--border)]"
                    >
                      {exp.period}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pl-16" : "md:pr-16 md:text-right"
                    }`}
                  >
                    {/* Mobile Period Badge */}
                    <div className="md:hidden mb-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--foreground-secondary)] text-sm font-medium border border-[var(--border)]">
                        {exp.period}
                      </span>
                    </div>

                    {/* Card */}
                    <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-[var(--accent)] transition-colors duration-300">
                      <h3 className="text-lg font-bold text-[var(--foreground)] mb-1 font-[family-name:var(--font-sora)]">
                        {exp.position}
                      </h3>

                      <div
                        className={`flex items-center gap-2 text-[var(--foreground-secondary)] mb-2 ${

                          index % 2 === 0 ? "" : "md:justify-end"
                        }`}
                      >
                        <HiBriefcase className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                        {exp.type && (
                          <span className="text-[var(--foreground-secondary)] text-sm">
                            • {exp.type}
                          </span>
                        )}
                      </div>

                      <ul
                        className={`space-y-2 text-[var(--foreground-secondary)] text-sm ${
                          index % 2 === 0 ? "" : "md:text-right"
                        }`}
                      >
                        {exp.descriptions.map((desc, i) => (
                          <li
                            key={i}
                            className={`flex items-start gap-2 ${
                              index % 2 === 0 ? "" : "md:flex-row-reverse"
                            }`}
                          >
                             <span className="text-[var(--foreground-tertiary)] mt-1.5">•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
