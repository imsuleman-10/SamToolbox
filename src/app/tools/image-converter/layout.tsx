import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("image-converter");

export default function ImageConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
