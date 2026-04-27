import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("robots-txt-builder");

export default function RobotsTxtBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
