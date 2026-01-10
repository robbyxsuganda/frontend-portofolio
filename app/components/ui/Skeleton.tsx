"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  count?: number;
}

export default function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  count = 1,
}: SkeletonProps) {
  const baseClass = "bg-[var(--surface)] animate-pulse";
  
  const variantClass = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const style = {
    width: width ?? "100%",
    height: height ?? (variant === "text" ? "1rem" : "100%"),
  };

  const items = Array.from({ length: count }, (_, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`${baseClass} ${variantClass[variant]} ${className}`}
      style={style}
    />
  ));

  return count === 1 ? items[0] : <div className="space-y-2">{items}</div>;
}

// Pre-built skeleton patterns
export function CardSkeleton() {
  return (
    <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl space-y-4">
      <Skeleton height={200} className="rounded-lg" />
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="text" count={2} />
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={80} height={80} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
