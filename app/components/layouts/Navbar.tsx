"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiSun, HiMoon, HiGlobeAlt } from "react-icons/hi";
import { useTheme } from "@/app/context/ThemeContext";
import { useLanguage } from "@/app/context/LanguageContext";
import { MENU } from "@/app/constants/menu.constants";
import { useActiveSection } from "@/app/hooks/useActiveSection";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const sectionIds = MENU.map((item) => item.key);
  const { activeSection, setActiveSection } = useActiveSection(sectionIds, "home");

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (href: string, key: string) => {
    setIsOpen(false);
    setActiveSection(key);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-lg border-b border-[var(--border)]"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home", "home")}
            className="text-xl md:text-2xl font-bold text-[var(--foreground)] font-[family-name:var(--font-sora)] cursor-pointer hover:opacity-80 transition-opacity"
          >
            Robby<span className="text-[var(--foreground-secondary)]">.</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {MENU.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href, item.key)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${
                  activeSection === item.key
                    ? "text-[var(--foreground)]"
                    : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                }`}
              >
                {t(item.translationKey)}
                {activeSection === item.key && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[var(--foreground)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 rounded-lg text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-all duration-300 cursor-pointer flex items-center gap-1"
                aria-label="Switch language"
                aria-expanded={langOpen}
              >
                <HiGlobeAlt className="w-5 h-5" />
                <span className="text-xs font-medium uppercase">{language}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-24 bg-[var(--card-bg)] border border-[var(--border)] rounded-lg shadow-lg overflow-hidden"
                  >
                    {(["en", "id"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-[var(--surface)] transition-colors cursor-pointer ${
                          language === lang
                            ? "text-[var(--foreground)] font-medium"
                            : "text-[var(--foreground-secondary)]"
                        }`}
                      >
                        {lang === "en" ? "English" : "Indonesia"}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <HiMoon className="w-5 h-5" />
              ) : (
                <HiSun className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] transition-all duration-300 cursor-pointer"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {MENU.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.href, item.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                      activeSection === item.key
                        ? "bg-[var(--surface)] text-[var(--foreground)]"
                        : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{t(item.translationKey)}</span>
                    {activeSection === item.key && (
                      <div className="ml-auto w-2 h-2 bg-[var(--foreground)] rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}