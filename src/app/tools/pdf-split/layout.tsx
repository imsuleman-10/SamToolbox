import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("pdf-split");

export default function PdfSplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}