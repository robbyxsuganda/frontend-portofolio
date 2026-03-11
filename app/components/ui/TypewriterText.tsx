"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export default function TypewriterText({
  texts,
  className = "",
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      {/* Single cursor animation — CSS-only via globals.css */}
      <span className="typewriter-cursor inline-block w-0.5 h-[1em] bg-[var(--accent)] ml-1 align-middle" />
    </span>
  );
}
