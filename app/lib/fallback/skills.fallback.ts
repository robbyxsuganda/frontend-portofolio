import {
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiNestjs,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiRedis,
  SiPrisma,
  SiSequelize,
  SiVercel,
  SiSupabase,
  SiCloudflare,
  SiAmazon,
  SiDocker,
  SiJest,
  SiSwagger,
  SiPostman,
  SiGraphql,
  SiTrpc,
  SiTailwindcss,
  SiRedux,
  SiReactquery,
  SiSocketdotio,
  SiApollographql,
  SiWordpress,
} from "react-icons/si";
import type { Skill } from "@/app/(sections)/skills/types";
import type { FilterTab } from "@/app/lib/types";

export const FALLBACK_SKILL_CATEGORIES: FilterTab[] = [
  { key: "all", label: "All" },
  { key: "language", label: "Languages" },
  { key: "framework", label: "Frameworks" },
  { key: "database", label: "Database" },
  { key: "cloud", label: "Cloud" },
  { key: "api", label: "API" },
  { key: "tools", label: "Tools" },
];

export const FALLBACK_SKILLS: Skill[] = [
  // Languages
  { name: "JavaScript", icon: SiJavascript, category: ["language"] },
  { name: "TypeScript", icon: SiTypescript, category: ["language"] },
  { name: "PHP", icon: SiPhp, category: ["language"] },

  // Frameworks/Libraries
  { name: "React.js", icon: SiReact, category: ["framework"] },
  { name: "Next.js", icon: SiNextdotjs, category: ["framework"] },
  { name: "Node.js", icon: SiNodedotjs, category: ["framework"] },
  { name: "Express.js", icon: SiExpress, category: ["framework"] },
  { name: "Nest.js", icon: SiNestjs, category: ["framework"] },
  { name: "Laravel", icon: SiLaravel, category: ["framework"] },
  { name: "React Native", icon: SiReact, category: ["framework"] },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: ["framework"] },
  { name: "Redux", icon: SiRedux, category: ["framework"] },
  { name: "TanStack Query", icon: SiReactquery, category: ["framework"] },
  { name: "Socket.io", icon: SiSocketdotio, category: ["framework"] },
  { name: "Apollo", icon: SiApollographql, category: ["framework"] },

  // Database
  { name: "MySQL", icon: SiMysql, category: ["database"] },
  { name: "PostgreSQL", icon: SiPostgresql, category: ["database"] },
  { name: "MongoDB", icon: SiMongodb, category: ["database"] },
  { name: "Firebase", icon: SiFirebase, category: ["database"] },
  { name: "Redis", icon: SiRedis, category: ["database"] },
  { name: "Prisma", icon: SiPrisma, category: ["database"] },
  { name: "Sequelize", icon: SiSequelize, category: ["database"] },

  // Cloud & Serverless
  { name: "Vercel", icon: SiVercel, category: ["cloud"] },
  { name: "Supabase", icon: SiSupabase, category: ["cloud"] },
  { name: "Cloudflare", icon: SiCloudflare, category: ["cloud"] },
  { name: "AWS", icon: SiAmazon, category: ["cloud"] },

  // API
  { name: "REST API", icon: SiPostman, category: ["api"] },
  { name: "GraphQL", icon: SiGraphql, category: ["api"] },
  { name: "tRPC", icon: SiTrpc, category: ["api"] },

  // Tools
  { name: "Docker", icon: SiDocker, category: ["tools"] },
  { name: "Jest", icon: SiJest, category: ["tools"] },
  { name: "Swagger", icon: SiSwagger, category: ["tools"] },
  { name: "Postman", icon: SiPostman, category: ["tools"] },
  { name: "WordPress", icon: SiWordpress, category: ["tools"] },
];
