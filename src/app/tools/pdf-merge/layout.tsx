import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Merger - Combine PDF Files Locally | SamToolbox",
  description:
    "Merge multiple PDF files into one document with local browser processing. No uploads, instant merging, preserves document quality, absolutely secure and 100% free forever.",
  keywords:
    "pdf merger, combine pdf, merge pdf files, pdf joiner, pdf combiner, merge documents, local pdf merge, secure pdf merger, free pdf joiner, pdf file merge",
  openGraph: {
    title: "PDF Merger | SamToolbox",
    description:
      "Combine multiple PDFs into one document securely with local processing.",
    type: "website",
    url: "https://samtoolbox.com/tools/pdf-merge",
  },
};

export default function PdfMergeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}