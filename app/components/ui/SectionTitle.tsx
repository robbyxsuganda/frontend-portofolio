"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <motion.div
      className={`text-center mb-12 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--foreground-secondary)] text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="mt-4 flex justify-center">
        <div className="w-20 h-1 bg-[var(--accent)] rounded-full"></div>
      </div>
    </motion.div>
  );
}
