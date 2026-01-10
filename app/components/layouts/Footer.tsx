"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { useSocialMedia } from "@/app/(sections)/home/hooks";

export default function Footer() {
  const { t } = useLanguage();
  const { data: socialMedia } = useSocialMedia();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="py-8 border-t border-[var(--border)] bg-[var(--background)]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-[var(--foreground-secondary)] text-sm">
            © {currentYear} Robby Suganda. {t("footer.copyright")}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialMedia?.map((social) => (
              <motion.a
                key={social.key}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
