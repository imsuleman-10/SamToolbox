import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF Converter - Convert JPG/PNG to PDF | SamToolbox",
  description:
    "Convert multiple images into a single PDF document locally. Instant processing, no uploads, preserves image quality, 100% secure and free forever for JPG, PNG to PDF conversion.",
  keywords:
    "image to pdf, jpg to pdf, png to pdf, convert image to pdf, picture to pdf, local image converter, secure image to pdf, free image pdf converter, bulk image to pdf, image document converter",
  openGraph: {
    title: "Image to PDF Converter | SamToolbox",
    description:
      "Convert images to PDF locally with perfect quality and privacy.",
    type: "website",
    url: "https://samtoolbox.com/tools/image-to-pdf",
  },
};

export default function ImageToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}