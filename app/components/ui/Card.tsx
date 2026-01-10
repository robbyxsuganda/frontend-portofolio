"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <motion.div
      className={`bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)" } : undefined}
    >
      {children}
    </motion.div>
  );
}
