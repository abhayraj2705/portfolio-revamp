import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { featured } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.url, changeFrequency: "monthly", priority: 1 },
    ...featured.map((p) => ({ url: `${profile.url}/work/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
