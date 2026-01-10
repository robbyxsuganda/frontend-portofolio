import type { Certificate } from "@/app/(sections)/certificates/types";
import type { FilterTab } from "@/app/lib/types";

export const FALLBACK_CERTIFICATE_CATEGORIES: FilterTab[] = [
  { key: "all", label: "All" },
  { key: "bootcamp", label: "Bootcamp" },
  { key: "course", label: "Course" },
  { key: "achievement", label: "Achievement" },
];

export const FALLBACK_CERTIFICATES: Certificate[] = [
  {
    title: "K6 for Engineers: Load Testing Real-World Apps at Scale",
    issuer: "Udemy",
    issuedDate: "Dec 2025",
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=K6+Certificate",
    certificateUrl: "#",
    category: ["course"],
  },
  {
    title: "Web Security untuk Penetration Tester dan Bug Bounty Hunter",
    issuer: "Udemy",
    issuedDate: "Dec 2025",
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=Web+Security",
    certificateUrl: "#",
    category: ["course"],
  },
  {
    title: "Laravel Complete Course",
    issuer: "WPU Course",
    issuedDate: "Oct 2025",
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=Laravel+Certificate",
    certificateUrl: "#",
    category: ["course"],
  },
  {
    title: "Secure Coding and Design Best Practices in Node.js JavaScript",
    issuer: "Udemy",
    issuedDate: "Jul 2025",
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=Secure+Coding",
    certificateUrl: "#",
    category: ["course"],
  },
  {
    title: "MERN Stack Complete Course",
    issuer: "WPU Course",
    issuedDate: "May 2025",
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=MERN+Stack",
    certificateUrl: "#",
    category: ["course"],
  },
  {
    title: "Full Stack JavaScript Immersive",
    issuer: "Hacktiv8",
    issuedDate: "Mar 2025",
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=Hacktiv8",
    certificateUrl: "#",
    category: ["bootcamp"],
  },
  {
    title: "JavaScript Intermediate",
    issuer: "HackerRank",
    issuedDate: "Apr 2025",
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=HackerRank",
    certificateUrl: "#",
    category: ["achievement"],
  },
  {
    title: "TOEFL Certificate",
    issuer: "ETS",
    issuedDate: "Sep 2022",
    expirationDate: "Sep 2026",
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=TOEFL",
    certificateUrl: "#",
    category: ["achievement"],
  },
  {
    title: "Algorithm Solving Competition",
    issuer: "Universitas Budi Luhur",
    issuedDate: "Jun 2021",
    image: "https://placehold.co/400x300/1f2937/e5e7eb?text=Algorithm+Solving",
    certificateUrl: "#",
    category: ["achievement"],
  },
];
