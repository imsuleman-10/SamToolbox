import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("seo-meta-generator");

export default function SeoMetaGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
