"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiPhone, HiLocationMarker, HiCheckCircle } from "react-icons/hi";
import SectionTitle from "@/app/components/ui/SectionTitle";
import Button from "@/app/components/ui/Button";
import Skeleton from "@/app/components/ui/Skeleton";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useProfile } from "@/app/(sections)/home/hooks";
import { useSocialMedia } from "@/app/(sections)/home/hooks";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const { data: profile, isLoading: profileLoading, error: profileError } = useProfile();
  const { data: socialMedia, isLoading: socialLoading } = useSocialMedia();

  const isLoading = profileLoading || socialLoading;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // TODO: Replace with real API call once backend is ready
      // await api.post("/contact", formData);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network
      setFormData({ name: "", email: "", message: "" });
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  const contactItems = [
    {
      href: `mailto:${profile?.email}`,
      icon: HiMail,
      label: t("contact.info.email"),
      value: profile?.email,
    },
    ...(profile?.phone
      ? [
          {
            href: `tel:${profile.phone}`,
            icon: HiPhone,
            label: t("contact.info.phone"),
            value: profile.phone,
          },
        ]
      : []),
  ];

  if (profileError) {
    return (
      <section id="contact" className="bg-[var(--surface)]">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title={t("contact.title")} />
          <ErrorMessage message="Failed to load contact information" />
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-[var(--surface)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t("contact.title")} />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 h-full flex flex-col"
          >
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 font-[family-name:var(--font-sora)]">
              {t("contact.form.title")}
            </h3>

            {/* Form Status Feedback */}
            {formStatus === "success" && (
              <div className="flex items-center gap-3 mb-4 p-4 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                <HiCheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{t("contact.form.success")}</span>
              </div>
            )}
            {formStatus === "error" && (
              <div className="flex items-center gap-3 mb-4 p-4 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                <span className="text-sm font-medium">{t("contact.form.error")}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4 flex-grow flex flex-col">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    {t("contact.form.name")}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    {t("contact.form.email")}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
              </div>
              <div className="flex-grow flex flex-col">
                <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full flex-grow min-h-[120px] px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  required
                  disabled={formStatus === "submitting"}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={formStatus === "submitting"}
              >
                {formStatus === "submitting"
                  ? t("contact.form.sending")
                  : t("contact.form.send")}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info & Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 h-full flex flex-col"
          >
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-6 font-[family-name:var(--font-sora)]">
              {t("contact.info.title")}
            </h3>

            <div className="space-y-4 flex-grow">
              {isLoading ? (
                <>
                  <Skeleton height={72} className="rounded-lg" />
                  <Skeleton height={72} className="rounded-lg" />
                  <Skeleton height={72} className="rounded-lg" />
                </>
              ) : (
                <>
                  {contactItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-[var(--surface)] hover:bg-[var(--border)] transition-colors cursor-pointer group"
                    >
                      <div className="w-12 h-12 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className="block text-sm text-[var(--foreground-secondary)]">
                          {item.label}
                        </span>
                        <span className="text-[var(--foreground)] font-medium group-hover:text-[var(--accent)] transition-colors">
                          {item.value}
                        </span>
                      </div>
                    </a>
                  ))}

                  {/* Location (not a link) */}
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-[var(--surface)]">
                    <div className="w-12 h-12 rounded-lg bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                      <HiLocationMarker className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="block text-sm text-[var(--foreground-secondary)]">
                        {t("contact.info.location")}
                      </span>
                      <span className="text-[var(--foreground)] font-medium">{profile?.location}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <hr className="border-[var(--border)] my-6" />

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-bold text-[var(--foreground)] mb-4 font-[family-name:var(--font-sora)]">
                {t("contact.followMe")}
              </h4>
              <div className="flex flex-wrap gap-3">
                {isLoading ? (
                  <div className="flex gap-3">
                    <Skeleton width={48} height={48} className="rounded-lg" />
                    <Skeleton width={48} height={48} className="rounded-lg" />
                    <Skeleton width={48} height={48} className="rounded-lg" />
                  </div>
                ) : (
                  socialMedia?.map((social) => (
                    <motion.a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--foreground-secondary)] hover:text-white hover:bg-[var(--accent)] transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
