import type { Metadata } from "next";

export const origin = "https://www.clearstone-ventures.com";
export const inquiryCategories = [
  "Multifamily Opportunity",
  "Net Lease / Franchise Opportunity",
  "Residential Property",
  "Investment / Joint Venture",
  "General Inquiry",
] as const;
export type InquiryCategory = (typeof inquiryCategories)[number];
export const strategies = [
  {
    slug: "multifamily",
    title: "Multifamily Investments",
    eyebrow: "Commercial real estate · 30+ units",
    image: "/multifamily-community.webp",
    alt: "Illustrative garden-style multifamily apartment community",
    summary: "Find the potential. Improve the fundamentals.",
    description:
      "A value-add acquisition strategy focused on apartment communities of 30 or more units, thoughtful operations and long-term ownership.",
    category: inquiryCategories[0],
  },
  {
    slug: "net-lease",
    title: "Net Lease & Franchise Real Estate",
    eyebrow: "Sites · Operators · Real estate",
    image: "/franchise-nnn.webp",
    alt: "Illustrative freestanding franchise-style restaurant property",
    summary: "The right real estate for the next chapter.",
    description:
      "A franchise-driven approach to site identification, site control and potential development, grounded in operator needs and lease fundamentals.",
    category: inquiryCategories[1],
  },
  {
    slug: "residential-acquisitions",
    title: "Residential Acquisitions",
    eyebrow: "Florida · Research-led sourcing",
    image: "/multifamily-community.webp",
    alt: "",
    summary: "Local opportunity. Considered execution.",
    description:
      "An intended Florida-focused strategy connecting off-market property research, transaction analysis and relationships with verified end buyers.",
    category: inquiryCategories[2],
  },
];
export const processSteps = [
  [
    "Source",
    "Research markets, cultivate relationships and identify opportunities beyond the obvious.",
  ],
  [
    "Evaluate",
    "Review the asset, market, income assumptions, costs and downside scenarios.",
  ],
  [
    "Structure",
    "Consider financing, ownership and partnership terms against the needs of the opportunity.",
  ],
  [
    "Execute",
    "Coordinate diligence and transaction milestones with appropriate professionals.",
  ],
  [
    "Create value",
    "Pursue operational improvements, thoughtful investment and considered disposition paths.",
  ],
];
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: { absolute: `${title} | Clearstone Ventures LTD` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Clearstone Ventures LTD`,
      description,
      url: path,
      type: "website",
      images: [
        {
          url: "/multifamily-community.jpg",
          width: 1672,
          height: 941,
          alt: "Illustrative multifamily community",
        },
      ],
    },
  };
}
export function inquiryHref(category: string, audience?: string) {
  return `/contact?category=${encodeURIComponent(category)}${audience ? `&audience=${encodeURIComponent(audience)}` : ""}`;
}
