import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/strategies",
    "/strategies/multifamily",
    "/strategies/net-lease",
    "/strategies/residential-acquisitions",
    "/our-approach",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `https://www.clearstone-ventures.com${path}`,
    changeFrequency: "monthly" as const,
    priority: path ? 0.7 : 1,
  }));
}
