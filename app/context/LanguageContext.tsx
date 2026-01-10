"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.services": "Services",
    "nav.resume": "Resume",
    "nav.projects": "Projects",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",
    
    // Home
    "home.badge": "Available for freelance work",
    "home.greeting": "Hi, I'm",
    "home.status": "Available Now",
    "home.location": "Based in",
    "home.hireMe": "Hire Me",
    "home.downloadCv": "Download CV",
    "home.followMe": "Follow me",
    
    // About
    "about.title": "About Me",
    "about.education": "Education",
    "about.stats.projects": "Projects",
    "about.stats.experience": "Years Experience",
    "about.stats.certificates": "Certificates",
    
    // Skills
    "skills.title": "My Skills",
    
    // Services
    "services.title": "Services",
    
    // Resume
    "resume.title": "Work Experience",
    
    // Projects
    "projects.title": "Projects",
    "projects.viewCode": "View Code",
    "projects.liveDemo": "Live Demo",
    
    // Certificates
    "certificates.title": "Certificates",
    "certificates.viewCertificate": "View Certificate",
    
    // Contact
    "contact.title": "Get In Touch",
    "contact.form.name": "Your Name",
    "contact.form.email": "Your Email",
    "contact.form.message": "Your Message",
    "contact.form.send": "Send Message",
    "contact.comments.title": "Leave a Comment",
    "contact.comments.name": "Name",
    "contact.comments.message": "Message",
    "contact.comments.photo": "Profile Photo",
    "contact.comments.submit": "Submit Comment",
    "contact.info.title": "Contact Info",
    
    // Footer
    "footer.copyright": "All rights reserved.",
  },
  id: {
    // Navbar
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.skills": "Keahlian",
    "nav.services": "Layanan",
    "nav.resume": "Resume",
    "nav.projects": "Proyek",
    "nav.certificates": "Sertifikat",
    "nav.contact": "Kontak",
    
    // Home
    "home.badge": "Tersedia untuk pekerjaan freelance",
    "home.greeting": "Hai, Saya",
    "home.status": "Tersedia Sekarang",
    "home.location": "Berbasis di",
    "home.hireMe": "Hubungi Saya",
    "home.downloadCv": "Unduh CV",
    "home.followMe": "Ikuti saya",
    
    // About
    "about.title": "Tentang Saya",
    "about.education": "Pendidikan",
    "about.stats.projects": "Proyek",
    "about.stats.experience": "Tahun Pengalaman",
    "about.stats.certificates": "Sertifikat",
    
    // Skills
    "skills.title": "Keahlian Saya",
    
    // Services
    "services.title": "Layanan",
    
    // Resume
    "resume.title": "Pengalaman Kerja",
    
    // Projects
    "projects.title": "Proyek",
    "projects.viewCode": "Lihat Kode",
    "projects.liveDemo": "Demo Langsung",
    
    // Certificates
    "certificates.title": "Sertifikat",
    "certificates.viewCertificate": "Lihat Sertifikat",
    
    // Contact
    "contact.title": "Hubungi Saya",
    "contact.form.name": "Nama Anda",
    "contact.form.email": "Email Anda",
    "contact.form.message": "Pesan Anda",
    "contact.form.send": "Kirim Pesan",
    "contact.comments.title": "Tinggalkan Komentar",
    "contact.comments.name": "Nama",
    "contact.comments.message": "Pesan",
    "contact.comments.photo": "Foto Profil",
    "contact.comments.submit": "Kirim Komentar",
    "contact.info.title": "Info Kontak",
    
    // Footer
    "footer.copyright": "Hak cipta dilindungi.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
