import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter - Convert Text Case Instantly | SamToolbox",
  description:
    "Convert text between uppercase, lowercase, title case, sentence case, camelCase, and snake_case instantly. Local processing with zero latency — no uploads, completely free, and works entirely in your browser.",
  keywords:
    "case converter, text case converter, uppercase converter, lowercase converter, title case, sentence case, camelcase, snake_case, text formatter, case changer, local text converter",
  openGraph: {
    title: "Case Converter | SamToolbox",
    description:
      "Convert text between different letter cases instantly with local processing.",
    type: "website",
    url: "https://samtoolbox.com/tools/case-converter",
  },
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}