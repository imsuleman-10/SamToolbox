import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("pdf-merge");

export default function PdfMergeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}