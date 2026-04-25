import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("image-compress");

export default function ImageCompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}