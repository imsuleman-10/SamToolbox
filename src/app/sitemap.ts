import { MetadataRoute } from "next";
import { ALL_TOOLS } from "@/lib/allToolsList";

const BASE_URL = "https://samtoolbox.vercel.app";

// Additional utilities not in ALL_TOOLS list
const EXTRA_SLUGS = [
  "qr-generator",
  "image-compress",
  "image-converter",
  "image-resize",
  "notes-to-pdf",
  "excel-reader",
  "word-reader",
  "ppt-reader",
  "pdf-reader",
  "font-generator",
  "goal-planner",
  "question-generator",
  "resume-score",
  "robots-txt-builder",
  "seo-meta-generator",
  "assignment-formatter",
  "password-strength",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/suleman-zaheer`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${BASE_URL}/sam_new.png`,
        `${BASE_URL}/suleman-pro.png`,
        `${BASE_URL}/suleman.png`,
      ],
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Tool Pages from ALL_TOOLS
  const toolPages: MetadataRoute.Sitemap = ALL_TOOLS.map((tool) => ({
    url: `${BASE_URL}${tool.href}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: tool.badge ? 0.9 : 0.85,
  }));

  // Extra Utilities
  const extraPages: MetadataRoute.Sitemap = EXTRA_SLUGS.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // De-duplicate URLs
  const seen = new Set<string>();
  const combined = [...staticPages, ...toolPages, ...extraPages].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });

  return combined;
}
