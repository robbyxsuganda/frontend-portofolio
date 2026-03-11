import { MetadataRoute } from "next";
import ENVIRONMENT from "./config/environment";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${ENVIRONMENT.SITE_URL}/sitemap.xml`,
    host: ENVIRONMENT.SITE_URL,
  };
}
