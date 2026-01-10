import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import type { Profile, Education, Stat, SocialMedia } from "@/app/(sections)/home/types";

export const FALLBACK_PROFILE: Profile = {
  name: "Robby Suganda",
  title: "Software Developer",
  jobTitle: [
    "Software Developer",
    "Full Stack Developer",
    "Backend Developer",
    "Frontend Developer",
  ],
  summary:
    "A person with hands-on experience in building scalable web and mobile applications using JavaScript, TypeScript, PHP, and modern frameworks such as Node.js, React.js, Next.js, Express, Nest.js, Laravel and React Native. Proficient in working with databases like PostgreSQL, MySQL, and MongoDB. Passionate about software development with a deep curiosity about how technology systems work. Quick to adapt, collaborative in team environments, and always eager to contribute to innovative and impactful projects.",
  email: "robbyxsuganda@gmail.com",
  phone: "+62 821-124-81600",
  location: "Tangerang, Indonesia",
  availability: "Available for Work",
  cvUrl: "/cv/robby-suganda-cv.pdf",
  profileImage: "https://avatars.githubusercontent.com/u/77280315?v=4",
};

export const FALLBACK_EDUCATION: Education[] = [
  {
    institution: "Hacktiv8",
    degree: "Full Stack JavaScript Immersive Program",
    period: "Nov 2024 – Mar 2025",
    location: "Tangerang, Indonesia",
    achievement: "Teacher's Award",
  },
  {
    institution: "Universitas Budi Luhur",
    degree: "Bachelor of Information Technology",
    period: "Sep 2020 – Feb 2024",
    location: "Jakarta, Indonesia",
    achievement: "GPA 3.62/4.00",
  },
];

export const FALLBACK_STATS: Stat[] = [
  { value: "3+", label: "Years Experience" },
  { value: "5+", label: "Projects Completed" },
  { value: "10+", label: "Certifications" },
  { value: "100%", label: "Commitment" },
];

export const FALLBACK_SOCIAL_MEDIA: SocialMedia[] = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/robbyxsuganda",
    icon: FaGithub,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/robbyxsuganda",
    icon: FaLinkedinIn,
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://instagram.com/robbyxsuganda",
    icon: FaInstagram,
  },
];
