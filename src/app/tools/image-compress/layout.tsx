import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor - Reduce Image Size Locally | SamToolbox",
  description:
    "Compress JPG, PNG, and WEBP images without quality loss. Files are processed entirely in your browser — zero uploads, instant results, professional quality, and 100% free forever.",
  keywords:
    "image compressor, compress jpg, compress png, image optimizer, reduce image size, lossless compression, webp compressor, photo compressor, local image processing, bulk image compress",
  openGraph: {
    title: "Image Compressor | SamToolbox",
    description:
      "Reduce image file sizes locally without quality loss. Fast, private, and free.",
    type: "website",
    url: "https://samtoolbox.com/tools/image-compress",
  },
};

export default function ImageCompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}