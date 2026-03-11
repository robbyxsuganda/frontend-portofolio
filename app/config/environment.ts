const ENVIRONMENT = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export default ENVIRONMENT;
