import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PowerPoint Text Viewer - Read PPTX Locally | SamToolbox",
  description:
    "Extract and read text from PowerPoint (.pptx) presentations instantly. Local browser processing with zero uploads — completely secure, maintains privacy, and 100% free forever for all your presentation reading needs.",
  keywords:
    "pptx reader, powerpoint viewer, read presentation, pptx text extractor, local pptx reader, secure presentation viewer, free pptx reader, powerpoint text viewer, browser pptx viewer",
  openGraph: {
    title: "PowerPoint Text Viewer | SamToolbox",
    description:
      "Extract text from PPTX presentations locally with complete privacy.",
    type: "website",
    url: "https://samtoolbox.com/tools/ppt-reader",
  },
};

export default function PptReaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}