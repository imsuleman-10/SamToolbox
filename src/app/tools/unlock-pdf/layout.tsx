import type { Metadata } from "next";
import { getToolMetadata, getToolJsonLd } from "@/lib/toolSeoData";
import ToolSsrSection from "@/components/ToolSsrSection";

const TOOL_SLUG = "unlock-pdf";

export const metadata: Metadata = getToolMetadata(TOOL_SLUG);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getToolJsonLd(TOOL_SLUG);

  return (
    <>
      {/* 100% Server-Side Rendered JSON-LD Schema.org Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Interactive Tool Workspace */}
      {children}

      {/* 100% Server-Side Rendered (SSR) SEO / AEO / GEO / LLMO Section */}
      <ToolSsrSection slug={TOOL_SLUG} />
    </>
  );
}
