import { MetadataRoute } from "next";
import ENVIRONMENT from "./config/environtment";

export default function sitemap(): MetadataRoute.Sitemap {
  

  return [
    {
      url: ENVIRONMENT.SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${ENVIRONMENT.SITE_URL}/#about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${ENVIRONMENT.SITE_URL}/#skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${ENVIRONMENT.SITE_URL}/#projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${ENVIRONMENT.SITE_URL}/#certificates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${ENVIRONMENT.SITE_URL}/#contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
