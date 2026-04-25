import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Compressor - Reduce PDF File Size | SamToolbox",
  description:
    "Compress PDF files locally by optimizing document structure. No uploads, instant processing, maintains document integrity, 100% secure and free forever for all your PDF compression needs.",
  keywords:
    "pdf compressor, compress pdf, reduce pdf size, pdf optimizer, local pdf compression, pdf file size reduction, secure pdf compress, free pdf compressor, pdf document compression",
  openGraph: {
    title: "PDF Compressor | SamToolbox",
    description:
      "Reduce PDF file size locally while maintaining document quality.",
    type: "website",
    url: "https://samtoolbox.com/tools/pdf-compress",
  },
};

export default function PdfCompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}