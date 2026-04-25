import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("pdf-reader");

export default function PdfReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}