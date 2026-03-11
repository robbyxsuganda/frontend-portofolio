"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiLocationMarker, HiClock, HiDownload, HiArrowRight } from "react-icons/hi";
import Badge from "@/app/components/ui/Badge";
import Button from "@/app/components/ui/Button";
import TypewriterText from "@/app/components/ui/TypewriterText";
import Skeleton from "@/app/components/ui/Skeleton";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useProfile, useSocialMedia, useStats } from "./hooks";
import { useMemo } from "react";

export default function HomeSection() {
  const { t } = useLanguage();
  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
  const { data: socialMedia, isLoading: socialLoading } = useSocialMedia();
  const { data: stats } = useStats();

  const isLoading = profileLoading || socialLoading;

  const { yearsStatValue, projectsStatValue, projectsStatLabel } = useMemo(() => {
    const yearStat = stats?.find((s) => s.label.toLowerCase().includes("year"));
    const projectStat = stats?.find((s) => s.label.toLowerCase().includes("project"));
    return {
      yearsStatValue: yearStat?.value ?? "3+",
      projectsStatValue: projectStat?.value ?? "5+",
      projectsStatLabel: projectStat?.label ?? "Projects",
    };
  }, [stats]);


  if (profileError) {
    return (
      <section id="home" className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 md:px-6">
          <ErrorMessage message="Failed to load profile" />
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <Badge className="mb-6 bg-[var(--surface)] text-[var(--foreground-secondary)] border-[var(--border)]">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
              {t("home.badge")}
            </Badge>

            {isLoading ? (
              <div className="space-y-6">
                <Skeleton height={60} width="80%" />
                <Skeleton height={40} width="60%" />
                <Skeleton variant="text" count={2} />
                <div className="flex gap-4">
                  <Skeleton width={140} height={48} className="rounded-lg" />
                  <Skeleton width={140} height={48} className="rounded-lg" />
                </div>
              </div>
            ) : (
              <>
                {/* Greeting with Name */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-4 font-[family-name:var(--font-sora)]">
                  {t("home.greeting")}{" "}
                  <span className="text-[var(--accent)] relative">
                    {profile?.name}
                  </span>
                </h1>

                {/* Job Title with Typewriter */}
                <div className="text-xl md:text-2xl lg:text-3xl font-medium text-[var(--foreground-secondary)] mb-6 font-[family-name:var(--font-jetbrains-mono)]">
                  <TypewriterText
                    texts={profile?.jobTitle || ["Developer"]}
                    speed={100}
                    deleteSpeed={50}
                    pauseDuration={2000}
                  />
                </div>

                {/* Description */}
                <p className="text-[var(--foreground-secondary)] text-lg leading-relaxed mb-6 max-w-xl">
                  {profile?.summary?.split(".")[0]}.
                </p>

                {/* Location & Status */}
                <div className="flex flex-wrap items-center gap-4 mb-8 text-[var(--foreground-secondary)]">
                  <div className="flex items-center gap-2">
                    <HiLocationMarker className="w-5 h-5" />
                    <span>{t("home.location")} {profile?.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiClock className="w-5 h-5" />
                    <span>{t("home.status")}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <Button href="#contact">
                    <HiArrowRight className="w-5 h-5" />
                    {t("home.hireMe")}
                  </Button>
                  <Button variant="outline" href={profile?.cvUrl || "#"}>
                    <HiDownload className="w-5 h-5" />
                    {t("home.downloadCv")}
                  </Button>
                </div>

                {/* Divider */}
                <hr className="border-[var(--border)] mb-6" />

                {/* Social Media */}
                <div className="flex items-center gap-4">
                  <span className="text-[var(--foreground-secondary)] text-sm">
                    {t("home.followMe")}:
                  </span>
                  <div className="flex items-center gap-3">
                    {socialMedia?.map((social) => (
                      <a
                        key={social.key}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Background Shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/20 to-transparent rounded-full blur-3xl"></div>
              
              {/* Profile Image */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-[var(--border)]">
                {isLoading ? (
                  <Skeleton variant="circular" width="100%" height="100%" />
                ) : (
                  <Image
                    src={profile?.profileImage || "https://placehold.co/400x400/374151/E5E7EB?text=Profile"}
                    alt={`${profile?.name} - Software Developer`}
                    fill
                    priority
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                    className="object-cover"
                  />
                )}
              </div>

              {/* Floating Element - Years */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[var(--accent)] rounded-2xl flex flex-col items-center justify-center text-white font-bold shadow-lg">
                <span className="text-lg font-bold">{yearsStatValue}</span>
                <span className="text-[0.55rem] font-medium text-white/80 text-center px-1">yrs exp</span>
              </div>

              {/* Floating Element - Projects */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl flex flex-col items-center justify-center shadow-lg">
                <span className="text-2xl font-bold text-[var(--accent)]">{projectsStatValue}</span>
                <span className="text-xs text-[var(--foreground-secondary)] text-center px-1">{projectsStatLabel}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}