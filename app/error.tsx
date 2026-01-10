"use client";

import { useEffect } from "react";
import { HiExclamationCircle } from "react-icons/hi";
import Button from "@/app/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-500/10">
          <HiExclamationCircle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-[var(--foreground-secondary)] mb-8">
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" href="/">Go Home</Button>
        </div>
      </div>
    </div>
  );
}
