import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("image-to-pdf");

export default function ImageToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}