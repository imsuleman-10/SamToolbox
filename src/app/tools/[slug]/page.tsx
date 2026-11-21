import { TOOL_SEO_REGISTRY } from "@/lib/toolSeoData";
import DynamicToolClient from "@/components/DynamicToolClient";

export const dynamicParams = true;

// Pre-render all expanded high-volume search tools at build time
export async function generateStaticParams() {
  const expandedSlugs = [
    "what-is-my-ip",
    "dns-lookup",
    "ssl-checker",
    "markdown-editor",
    "grammar-checker",
    "plagiarism-checker",
    "youtube-thumbnail-downloader",
    "og-meta-previewer",
    "heic-to-jpg",
    "webp-to-png",
    "png-to-webp",
    "epub-to-pdf",
    "pdf-summarizer",
    "sql-formatter",
    "yaml-to-json",
    "whiteboard",
    "pomodoro-timer",
    "glassmorphism-generator",
    "box-shadow-generator",
    "random-number-generator",
    "text-to-speech",
    "speech-to-text",
    "color-palette-generator",
    "meta-tags-generator",
    "pdf-to-txt"
  ];
  return expandedSlugs.map((slug) => ({ slug }));
}

export default async function DynamicToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = TOOL_SEO_REGISTRY[slug];

  const formattedTitle = entry?.title || slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const description = entry?.description || `Free online ${formattedTitle} tool with 100% private in-browser execution and zero server file uploads on SamToolbox.`;

  return (
    <DynamicToolClient
      slug={slug}
      title={formattedTitle}
      description={description}
      category={entry?.category || "UtilityApplication"}
    />
  );
}
