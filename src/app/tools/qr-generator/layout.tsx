import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator | Create Custom QR Codes Instantly",
  description:
    "Generate high-quality QR codes for URLs, text, and contact info. Free, private, and customizable. Built for security-conscious users.",
  keywords:
    "qr code generator, create qr code, free qr maker, custom qr codes, secure qr generator",
  openGraph: {
    title: "Instant QR Code Generator | Privacy-First QR Maker",
    description:
      "Create professional QR codes instantly in your browser. No trackers, no data collection.",
    type: "website",
  },
};

export default function QrGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
