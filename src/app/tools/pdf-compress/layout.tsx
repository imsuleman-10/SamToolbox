import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("pdf-compress");

export default function PdfCompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}