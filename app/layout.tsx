import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import { LanguageProvider } from "@/app/context/LanguageContext";
import QueryProvider from "@/app/lib/providers/QueryProvider";
import Navbar from "@/app/components/layouts/Navbar";
import Footer from "@/app/components/layouts/Footer";
import ENVIRONMENT from "./config/environment";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    ENVIRONMENT.SITE_URL 
  ),
  title: {
    default: "Robby Suganda | Software Developer",
    template: "%s | Robby Suganda",
  },
  description:
    "A passionate Software Developer with hands-on experience in building scalable web and mobile applications using JavaScript, TypeScript, and modern frameworks.",
  keywords: [
    "Robby Suganda",
    "Software Developer",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Indonesia",
  ],
  authors: [{ name: "Robby Suganda", url: ENVIRONMENT.SITE_URL }],
  creator: "Robby Suganda",
  openGraph: {
    title: "Robby Suganda | Software Developer",
    description:
      "A passionate Software Developer with hands-on experience in building scalable web and mobile applications.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Robby Suganda Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Robby Suganda | Software Developer",
    description:
      "A passionate Software Developer with hands-on experience in building scalable web and mobile applications.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Robby Suganda",
  url: ENVIRONMENT.SITE_URL,
  jobTitle: "Software Developer",
  description:
    "A passionate Software Developer with hands-on experience in building scalable web and mobile applications.",
  email: "robbyxsuganda@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tangerang",
    addressCountry: "Indonesia",
  },
  sameAs: [
    "https://github.com/robbyxsuganda",
    "https://linkedin.com/in/robbyxsuganda",
  ],
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider>
            <LanguageProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </LanguageProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
