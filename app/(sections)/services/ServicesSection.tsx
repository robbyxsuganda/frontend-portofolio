"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/app/components/ui/SectionTitle";
import Card from "@/app/components/ui/Card";
import Skeleton from "@/app/components/ui/Skeleton";
import ErrorMessage from "@/app/components/ui/ErrorMessage";
import { useLanguage } from "@/app/context/LanguageContext";
import { useServices } from "./hooks";

export default function ServicesSection() {
  const { t } = useLanguage();
  const { data: services, isLoading, error, refetch } = useServices();

  return (
    <section id="services" className="bg-[var(--surface)]">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle title={t("services.title")} />

        {error ? (
          <ErrorMessage message="Failed to load services" onRetry={() => refetch()} />
        ) : isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} height={200} className="rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services?.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center group hover:border-[var(--accent)] transition-colors">
                  {service.icon && (
                    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300">
                      <service.icon className="w-8 h-8" />
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 font-[family-name:var(--font-sora)]">
                    {service.title}
                  </h3>
                  <p className="text-[var(--foreground-secondary)] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
