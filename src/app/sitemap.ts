import { MetadataRoute } from "next";
import { TOOL_SEO_REGISTRY, BASE_URL } from "@/lib/toolSeoData";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        `${BASE_URL}/logo.png`,
        `${BASE_URL}/og-image.jpg`,
      ],
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
      images: [`${BASE_URL}/og-image.jpg`],
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
      priority: 0.8,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [`${BASE_URL}/og-image.jpg`],
    },
  ];

  // All 62 Enterprise Tool Pages from TOOL_SEO_REGISTRY
  const toolSlugs = Object.keys(TOOL_SEO_REGISTRY);
  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: [
      "salary-tax-calculator",
      "merit-calculator",
      "marla-converter",
      "zakat-calculator",
      "pdf-merge",
      "pdf-split",
      "pdf-compress",
      "pdf-to-word",
      "word-to-pdf",
      "cv-maker",
      "qr-generator",
    ].includes(slug)
      ? 0.95
      : 0.85,
    images: [`${BASE_URL}/og-image.jpg`],
  }));

  // De-duplicate URLs
  const seen = new Set<string>();
  const combined = [...staticPages, ...toolPages].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });

  return combined;
}
