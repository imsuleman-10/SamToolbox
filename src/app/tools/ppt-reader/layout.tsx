import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("ppt-reader");

export default function PptReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}