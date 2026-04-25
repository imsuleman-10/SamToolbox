import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("word-reader");

export default function WordReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}