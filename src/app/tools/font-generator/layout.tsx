import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Font Generator & Unicode Text Converter - Cool Text Fonts | SamToolbox",
  description:
    "Convert plain text into stylish Unicode fonts for social media bios and posts. 100% client-side processing with instant results — no uploads, no tracking, completely free.",
  keywords:
    "font generator, unicode text, fancy fonts, cool text, instagram fonts, twitter bios, typography converter, text art, unicode symbols, social media text",
  openGraph: {
    title: "Font Generator | SamToolbox",
    description:
      "Create stylish Unicode fonts from plain text instantly with local processing.",
    type: "website",
    url: "https://samtoolbox.com/tools/font-generator",
  },
};

export default function FontGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}