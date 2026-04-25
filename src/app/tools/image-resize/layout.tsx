import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("image-resize");

export default function ImageResizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}