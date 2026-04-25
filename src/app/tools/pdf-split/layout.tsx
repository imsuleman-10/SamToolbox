import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Splitter - Extract Pages from PDF | SamToolbox",
  description:
    "Extract specific pages from PDF files with range selection. Processed entirely in your browser with zero uploads — instant, secure, professional quality, and completely free forever.",
  keywords:
    "pdf splitter, split pdf, extract pdf pages, pdf page extractor, pdf range select, local pdf split, secure pdf splitter, free pdf extractor, pdf page selection, pdf document split",
  openGraph: {
    title: "PDF Splitter | SamToolbox",
    description:
      "Extract specific pages from PDFs locally with range-based selection.",
    type: "website",
    url: "https://samtoolbox.com/tools/pdf-split",
  },
};

export default function PdfSplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}