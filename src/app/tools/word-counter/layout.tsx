import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("word-counter");

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}