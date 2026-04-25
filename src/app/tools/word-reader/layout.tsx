import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word Document Reader - Read DOCX Files Locally | SamToolbox",
  description:
    "Read Microsoft Word (.docx) files instantly in your browser. Local processing with zero uploads — your documents remain completely private, secure, and the service is 100% free forever.",
  keywords:
    "word reader, docx viewer, read word document, word file reader, local docx reader, secure word viewer, microsoft word reader, docx text extractor, free word reader, browser docx viewer",
  openGraph: {
    title: "Word Document Reader | SamToolbox",
    description:
      "Read DOCX files locally in your browser with complete privacy.",
    type: "website",
    url: "https://samtoolbox.com/tools/word-reader",
  },
};

export default function WordReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}