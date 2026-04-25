import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Reader & Document Viewer - View PDFs Locally | SamToolbox",
  description:
    "Securely view PDF files directly in your browser with complete privacy. Local processing with zero uploads — instant loading, absolute privacy, professional viewing experience, and completely free.",
  keywords:
    "pdf reader, pdf viewer, view pdf online, pdf document viewer, local pdf reader, secure pdf viewer, free pdf reader, browser pdf viewer, pdf file viewer",
  openGraph: {
    title: "PDF Reader & Document Viewer | SamToolbox",
    description:
      "View and interact with PDF files locally in your browser with zero uploads.",
    type: "website",
    url: "https://samtoolbox.com/tools/pdf-reader",
  },
};

export default function PdfReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}