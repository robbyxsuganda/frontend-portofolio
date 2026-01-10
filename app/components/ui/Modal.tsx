"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";
import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "md" | "lg" | "xl" | "2xl" | "full";
}

export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = "lg",
}: ModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sizeClasses = {
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-5xl",
    full: "max-w-[95vw] max-h-[95vh]",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${sizeClasses[size]} bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl`}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-[var(--border)]">
                <h3 className="text-xl font-bold text-[var(--foreground)] font-[family-name:var(--font-sora)]">
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-colors cursor-pointer"
                >
                  <HiX className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Close button for no title modals */}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
              >
                <HiX className="w-6 h-6" />
              </button>
            )}

            {/* Content */}
            <div className={title ? "p-4 md:p-6 max-h-[80vh] overflow-y-auto" : ""}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
