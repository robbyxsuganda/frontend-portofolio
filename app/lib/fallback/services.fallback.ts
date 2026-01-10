import { HiCode, HiDeviceMobile, HiServer, HiCloud } from "react-icons/hi";
import type { Service } from "@/app/(sections)/services/types";

export const FALLBACK_SERVICES: Service[] = [
  {
    key: "web-development",
    title: "Web Development",
    description:
      "Building responsive and scalable web applications using modern technologies like Next.js, React.js, Node.js, and Express.js with clean and maintainable code.",
    icon: HiCode,
  },
  {
    key: "mobile-development",
    title: "Mobile Development",
    description:
      "Creating cross-platform mobile applications using React Native and Expo, delivering native-like experiences on both iOS and Android devices.",
    icon: HiDeviceMobile,
  },
  {
    key: "backend-development",
    title: "Backend Development",
    description:
      "Developing robust backend systems and RESTful APIs using Node.js, Express.js, Nest.js, and Laravel with secure authentication and database management.",
    icon: HiServer,
  },
  {
    key: "cloud-services",
    title: "Cloud & DevOps",
    description:
      "Deploying and managing applications on cloud platforms like Vercel, Supabase, AWS, and Cloudflare with containerization using Docker.",
    icon: HiCloud,
  },
];
