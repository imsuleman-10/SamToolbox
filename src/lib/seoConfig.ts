/**
 * SEO Configuration and Utilities
 * Centralized SEO settings for the application
 */

export const SEO_CONFIG = {
  // Domain configuration
  domain: "https://samtoolbox.vercel.app",
  alternateDomain: "https://www.samtoolbox.vercel.app",

  // Site branding
  siteName: "SamToolbox",
  siteDescription:
    "Premium industrial-grade browser tools. Lightweight, high-performance, 100% privacy-first.",

  // Social media profiles (add when available)
  socialProfiles: {
    twitter: "",
    facebook: "",
    linkedin: "",
    github: "https://github.com/imsuleman-10/SamToolbox",
  },

  // Contact information
  contact: {
    email: "contact@samtoolbox.com",
    supportEmail: "support@samtoolbox.com",
    securityEmail: "security@samtoolbox.com",
  },

  // Localization
  defaultLanguage: "en",
  supportedLanguages: ["en", "ur"],

  // Analytics and tracking (add when ready)
  googleAnalyticsId: "G-XXXXXXXXXX", // Add your GA4 ID here
  googleSearchConsoleVerification: "LcebSxNpS-SRI0tWToRJ3zX9rYqZM4Ltokkil3HUdvU",

  // Crawling directives
  allowCrawling: true,
  crawlDelay: 1, // seconds
  maxCrawlDelay: 10, // seconds

  // Open Graph defaults
  ogImage: "https://samtoolbox.com/logo.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,

  // Twitter Card defaults
  twitterHandle: "",
  twitterCardType: "summary_large_image",

  // SEO best practices
  preferredDomain: "samtoolbox.com", // without www
  useTrailingSlash: false,
  maxDescriptionLength: 160,
  maxTitleLength: 60,

  // Sitemap configuration
  sitemapUrl: "/sitemap.xml",
  sitemapIndex: "/sitemap-index.xml",

  // Robots.txt configuration
  robotsUrl: "/robots.txt",

  // Canonical domain (for preventing duplicate content)
  canonicalDomain: "samtoolbox.com",
};

/**
 * Common SEO meta tags generator
 */
export const generateCommonMetaTags = () => ({
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#253fe3",
  msapplicationTileColor: "#253fe3",
});

/**
 * SEO utilities
 */
export const SEOUtils = {
  /**
   * Generate canonical URL
   */
  getCanonicalUrl: (path: string) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const noTrailingSlash = cleanPath.endsWith("/") && cleanPath !== "/" 
      ? cleanPath.slice(0, -1) 
      : cleanPath;
    return `${SEO_CONFIG.domain}${noTrailingSlash}`;
  },

  /**
   * Validate and truncate meta description
   */
  getMetaDescription: (description: string) => {
    return description.length > SEO_CONFIG.maxDescriptionLength
      ? description.substring(0, SEO_CONFIG.maxDescriptionLength - 3) + "..."
      : description;
  },

  /**
   * Validate and truncate meta title
   */
  getMetaTitle: (title: string) => {
    return title.length > SEO_CONFIG.maxTitleLength
      ? title.substring(0, SEO_CONFIG.maxTitleLength - 3) + "..."
      : title;
  },

  /**
   * Generate breadcrumb navigation
   */
  generateBreadcrumbs: (segments: string[]) => {
    return [
      { name: "Home", url: SEO_CONFIG.domain },
      ...segments.map((segment, index) => ({
        name: segment,
        url: `${SEO_CONFIG.domain}/${segments.slice(0, index + 1).join("/")}`,
      })),
    ];
  },

  /**
   * Generate meta keywords (use sparingly)
   */
  generateKeywords: (primary: string[], secondary?: string[]) => {
    const keywords = [...primary, ...(secondary || [])];
    return keywords.slice(0, 10).join(", "); // Google recommends max 10 keywords
  },
};
