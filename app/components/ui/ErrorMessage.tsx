"use client";

import { HiExclamationCircle, HiRefresh } from "react-icons/hi";
import Button from "./Button";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({
  title = "Something went wrong",
  message = "Failed to load data. Please try again.",
  onRetry,
  className = "",
}: ErrorMessageProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-red-500/10">
        <HiExclamationCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--foreground-secondary)] mb-6 max-w-md">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <HiRefresh className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
