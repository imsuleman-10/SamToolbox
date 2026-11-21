import type { Metadata } from "next";
import { getToolMetadata, getToolJsonLd } from "@/lib/toolSeoData";
import ToolSsrSection from "@/components/ToolSsrSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getToolMetadata(slug);
}

export default async function DynamicToolLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const jsonLd = getToolJsonLd(slug);

  return (
    <>
      {/* 100% Server-Side Rendered JSON-LD Schema.org Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* Dynamic Tool Workspace */}
      {children}

      {/* 100% Server-Side Rendered (SSR) SEO / AEO / GEO / LLMO Section */}
      <ToolSsrSection slug={slug} />
    </>
  );
}
