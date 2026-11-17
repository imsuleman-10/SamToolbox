import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "cohere-ai",
          "OAI-SearchBot",
          "Meta-ExternalAgent",
          "Bytespider",
          "Diffbot",
        ],
        allow: ["/", "/llms.txt", "/llms-full.txt", "/.well-known/ai-plugin.json"],
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://samtoolbox.vercel.app/sitemap.xml",
    host: "https://samtoolbox.vercel.app",
  };
}
