import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV Maker - Free Professional Resume Builder | SamToolbox",
  description:
    "Create ATS-friendly, executive-level resumes with premium templates. Download print-ready PDFs instantly. No uploads, 100% private. Made for professionals who demand excellence.",
  keywords:
    "cv maker, resume builder, free cv creator, professional resume, executive cv, ATS resume, job application, career tools",
  openGraph: {
    title: "CV Maker - Professional Resume Builder | SamToolbox",
    description:
      "Design executive resumes with premium templates. Download PDF instantly. Privacy-first, no server uploads.",
    type: "website",
    url: "https://samtoolbox.com/tools/cv-maker",
  },
};

export default function CvMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}