import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer - Resize Images Locally | SamToolbox",
  description:
    "Resize images by exact pixel dimensions with aspect ratio lock. Local browser processing ensures instant results and absolute privacy — your images never leave your device, completely free.",
  keywords:
    "image resizer, resize image, image dimensions, photo resize, aspect ratio, image scaler, jpg resize, png resize, bulk image resize, local image processing",
  openGraph: {
    title: "Image Resizer | SamToolbox",
    description:
      "Resize images to exact dimensions locally with aspect ratio preservation.",
    type: "website",
    url: "https://samtoolbox.com/tools/image-resize",
  },
};

export default function ImageResizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}