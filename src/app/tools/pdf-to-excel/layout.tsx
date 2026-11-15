import type { Metadata } from "next";
import Script from "next/script";
import { getToolMetadata, getToolJsonLd } from "@/lib/toolSeoData";

const TOOL_SLUG = "pdf-to-excel";

export const metadata: Metadata = getToolMetadata(TOOL_SLUG);

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = getToolJsonLd(TOOL_SLUG);

  return (
    <>
      <Script
        id="tool-schema-pdf-to-excel"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      {children}
    </>
  );
}
