"use client";

import { motion } from "framer-motion";
import type { FilterTab } from "@/app/lib/types";

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

export default function FilterTabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: FilterTabsProps) {
  return (
    <div className={`flex flex-wrap justify-center gap-2 mb-8 ${className}`}>
      {tabs.map((tab) => (
        <motion.button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
            activeTab === tab.key
              ? "bg-[var(--foreground)] text-[var(--background)]"
              : "bg-[var(--surface)] text-[var(--foreground-secondary)] hover:bg-[var(--border)] hover:text-[var(--foreground)]"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}
