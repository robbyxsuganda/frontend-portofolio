"use client";

import { motion } from "framer-motion";
import { HiAcademicCap, HiCalendar, HiLocationMarker } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";
import SectionTitle from "@/app/components/ui/SectionTitle";
import Card from "@/app/components/ui/Card";
import Skeleton, { CardSkeleton } from "@/app/components/ui/Skeleton";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useProfile, useEducation, useStats } from "@/app/(sections)/home/hooks";

export default function AboutSection() {
  const { t } = useLanguage();
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
  const { data: education, isLoading: educationLoading, error: educationError } = useEducation();
  const { data: stats, isLoading: statsLoading, error: statsError } = useStats();

  const isLoading = profileLoading || educationLoading || statsLoading;
  const error = profileError || educationError || statsError;

  if (error) {
    return (
      <section id="about" className="bg-[var(--surface)]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title={t("about.title")} />
          <ErrorMessage message="Failed to load about section" />
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="bg-[var(--surface)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t("about.title")} />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton height={32} width="60%" />
                <Skeleton variant="text" count={4} />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4 font-[family-name:var(--font-sora)]">
                  {profile?.name}
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                  {profile?.summary}
                </p>
                <p className="text-[var(--foreground-secondary)] leading-relaxed mb-8">
                  {t("about.secondary")}
                </p>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative p-6 bg-gradient-to-br from-[var(--card-bg)] to-[var(--surface)] border border-[var(--border)] rounded-xl shadow-sm"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center shadow-md">
                    <FaQuoteLeft className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-lg font-medium text-[var(--foreground)] italic font-[family-name:var(--font-sora)] mt-2 ml-4">
                    &quot;{t("about.quote")}&quot;
                  </p>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Right - Education */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
              <HiAcademicCap className="w-6 h-6 text-[var(--accent)]" />
              {t("about.education")}
            </h3>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : (
                education?.map((edu, index) => (
                  <Card key={index} className="!p-5">
                    <h4 className="font-bold text-[var(--foreground)]">
                      {edu.institution}
                    </h4>
                    <p className="text-[var(--foreground-secondary)] text-sm mt-1">
                      {edu.degree}
                    </p>
                    {edu.achievement && (
                      <span className="inline-block mt-3 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-xs rounded-full font-medium">
                        {edu.achievement}
                      </span>
                    )}
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-[var(--foreground-secondary)]">
                      <span className="flex items-center gap-1">
                        <HiCalendar className="w-3 h-3" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiLocationMarker className="w-3 h-3" />
                        {edu.location}
                      </span>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-4 md:gap-8 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isLoading ? (
            <>
              <Skeleton height={120} className="rounded-xl" />
              <Skeleton height={120} className="rounded-xl" />
              <Skeleton height={120} className="rounded-xl" />
            </>
          ) : (
            stats?.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--accent)] mb-2 font-[family-name:var(--font-sora)]">
                  {stat.value}
                </div>
                <div className="text-[var(--foreground-secondary)] text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
