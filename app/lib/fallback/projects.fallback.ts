import type { Project } from "@/app/(sections)/projects/types";
import type { FilterTab } from "@/app/lib/types";

export const FALLBACK_PROJECT_CATEGORIES: FilterTab[] = [
  { key: "all", label: "All" },
  { key: "web", label: "Web" },
  { key: "mobile", label: "Mobile" },
  { key: "system", label: "System" },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    title: "Outbound Management System",
    description:
      "Web platform for end-to-end logistics digitalization with automated shipment processing, AI-powered license plate recognition, weighbridge & ERP integration, and comprehensive reporting. Also includes company profile and simple e-commerce module.",
    techStack: [
      "TypeScript",
      "Next.js",
      "React.js",
      "Express.js",
      "MySQL",
      "Prisma ORM",
      "Gemini AI",
      "TanStack Query",
      "Tailwind",
      "Shadcn",
    ],
    category: ["web"],
    period: "May 2025 - Oct 2025",
    image: "https://placehold.co/800x600/1f2937/e5e7eb?text=Outbound+Management+System",
    features: [
      "Automated shipment processing",
      "AI-powered license plate recognition",
      "Weighbridge & ERP integration",
      "Role-Based Access Control (RBAC)",
      "Dashboard management for users, warehouses, goods, customers, fleets",
      "Comprehensive reporting system",
      "Company profile module",
      "Simple e-commerce module",
    ],
    details:
      "Developed a responsive and modern web platform for PT SAJP to digitalize their logistics operations. Implemented Role-Based Access Control (RBAC) to enhance system security and data governance. Integrated AI for automated vehicle license plate verification using Gemini AI.",
  },
  {
    title: "Acara Event Management",
    description:
      "Web platform for event management and ticketing with Midtrans payment gateway integration.",
    techStack: [
      "TypeScript",
      "Next.js",
      "Express.js",
      "MongoDB",
      "Midtrans",
      "TanStack Query",
      "Tailwind",
      "HeroUI",
    ],
    category: ["web"],
    period: "May 2025",
    image: "https://placehold.co/800x600/1f2937/e5e7eb?text=Acara+Event+Management",
    features: [
      "Event creation and management",
      "Ticket booking system",
      "Payment integration with Midtrans",
      "User authentication",
      "Event discovery",
    ],
    details:
      "A comprehensive event management platform that allows organizers to create and manage events while providing attendees with seamless ticket purchasing experience through Midtrans payment gateway.",
  },
  {
    title: "Worklytic",
    description:
      "Mobile app for freelancer-client connections with AI matching and real-time chat functionality.",
    techStack: [
      "TypeScript",
      "Next.js",
      "React Native (Expo)",
      "MongoDB",
      "Midtrans",
      "Gemini AI",
      "Firebase",
      "TanStack Query",
    ],
    category: ["mobile"],
    period: "Mar 2025",
    image: "https://placehold.co/800x600/1f2937/e5e7eb?text=Worklytic",
    features: [
      "AI-powered freelancer-client matching",
      "Real-time chat with Firebase",
      "Payment integration with Midtrans",
      "Profile management",
      "Project posting and bidding",
    ],
    details:
      "A mobile application built with React Native that connects freelancers with clients. Features AI-powered matching using Gemini AI and real-time communication through Firebase.",
  },
  {
    title: "Sales Data Mining System",
    description: "Web application using Apriori Algorithm for sales pattern discovery and analysis.",
    techStack: ["PHP", "JavaScript", "MySQL"],
    category: ["web", "system"],
    period: "Oct 2023 - Jan 2024",
    image: "https://placehold.co/800x600/1f2937/e5e7eb?text=Sales+Data+Mining",
    features: [
      "Apriori Algorithm implementation",
      "Sales pattern discovery",
      "Data visualization",
      "Report generation",
    ],
    details:
      "Developed a data mining system that uses the Apriori Algorithm to discover patterns in sales data, helping businesses understand customer purchasing behavior.",
  },
  {
    title: "Best Employee Decision System",
    description:
      "SAW-based evaluation system for ranking employee performance based on multiple criteria.",
    techStack: ["PHP", "JavaScript", "MySQL", "Git"],
    category: ["web", "system"],
    period: "Sept 2022 - Feb 2023",
    image: "https://placehold.co/800x600/1f2937/e5e7eb?text=Decision+System",
    features: [
      "SAW (Simple Additive Weighting) method",
      "Multi-criteria evaluation",
      "Employee performance ranking",
      "Score calculation based on Attendance, Cooperation, Neatness, and Activeness",
    ],
    details:
      "Collaborated with a team to develop a Decision Support System (DSS) using the SAW method. Successfully evaluated over 40 employees, with the system providing accurate performance rankings.",
  },
];
