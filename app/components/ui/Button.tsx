"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-[var(--foreground)] text-[var(--background)] hover:bg-transparent hover:text-[var(--foreground)] border-2 border-[var(--foreground)]",
    outline:
      "border-2 border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("//");

    if (isExternal) {
      return (
        <motion.a
          href={href}
          className={combinedClassName}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: disabled ? 1 : 0.98 }}>
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combinedClassName}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
