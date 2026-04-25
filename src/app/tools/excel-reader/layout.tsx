import type { Metadata } from "next";
import { getToolMetadata } from "@/lib/toolMetadata";

export const metadata: Metadata = getToolMetadata("excel-reader");

export default function ExcelReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}