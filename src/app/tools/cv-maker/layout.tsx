import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("cv-maker");

export default function CvMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}