import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("font-generator");

export default function FontGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}