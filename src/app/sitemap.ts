import { MetadataRoute } from "next";
import { TOOL_SEO_REGISTRY, BASE_URL } from "@/lib/toolSeoData";

const createLanguageAlternates = (url: string) => ({
  "x-default": url,
  "en": url,
  "en-US": url,
  "en-GB": url,
  "en-CA": url,
  "en-AU": url,
  "en-IN": url,
  "en-PK": url,
  "en-AE": url,
  "en-SA": url,
  "en-SG": url,
  "en-ZA": url,
  "es": url,
  "es-ES": url,
  "es-MX": url,
  "fr": url,
  "fr-FR": url,
  "de": url,
  "de-DE": url,
  "ar": url,
  "ar-AE": url,
  "pt": url,
  "pt-BR": url,
  "hi": url,
  "ur": url,
  "it": url,
  "ja": url,
});

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: createLanguageAlternates(BASE_URL),
      },
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
      alternates: {
        languages: createLanguageAlternates(`${BASE_URL}/tools`),
      },
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/suleman-zaheer`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: createLanguageAlternates(`${BASE_URL}/suleman-zaheer`),
      },
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
      alternates: {
        languages: createLanguageAlternates(`${BASE_URL}/about`),
      },
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: createLanguageAlternates(`${BASE_URL}/contact`),
      },
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: createLanguageAlternates(`${BASE_URL}/privacy`),
      },
      images: [`${BASE_URL}/og-image.jpg`],
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: createLanguageAlternates(`${BASE_URL}/terms`),
      },
      images: [`${BASE_URL}/og-image.jpg`],
    },
  ];

  // All 64 Enterprise Tool Pages from TOOL_SEO_REGISTRY
  const toolSlugs = Object.keys(TOOL_SEO_REGISTRY);
  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => {
    const url = `${BASE_URL}/tools/${slug}`;
    return {
      url,
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
        "json-formatter",
        "url-encoder",
        "cv-maker",
        "qr-generator",
      ].includes(slug)
        ? 0.95
        : 0.85,
      alternates: {
        languages: createLanguageAlternates(url),
      },
      images: [`${BASE_URL}/og-image.jpg`],
    };
  });

  // De-duplicate URLs
  const seen = new Set<string>();
  const combined = [...staticPages, ...toolPages].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });

  return combined;
}
