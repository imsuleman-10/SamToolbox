import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Converter | Convert JPG, PNG, WEBP, and more",
  description:
    "Fast, free, and secure image converter. Change formats between JPG, PNG, WebP, and BMP instantly in your browser. Zero uploads required.",
  keywords:
    "image converter, jpg to png, png to webp, webp to jpg, online image transformer, secure image converter",
  openGraph: {
    title: "Universal Image Converter | Privacy-First Formatting",
    description:
      "Convert image formats directly on your device. Fast, high-quality, and totally secure.",
    type: "website",
  },
};

export default function ImageConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
