import type { Metadata } from "next";
import { BASE_URL } from "@/lib/toolSeoData";

export const metadata: Metadata = {
  title: "All Free Online PDF & Productivity Tools | SamToolbox",
  description: "Explore 55+ free, private online tools to merge, split, compress, convert, edit, and sign PDFs, alongside Pakistani tax, merit, and land area calculators. 100% private in-browser processing with zero server uploads.",
  keywords: [
    "all pdf tools",
    "free online pdf converter suite",
    "iLovePDF alternative",
    "pakistan online tools",
    "fbr salary tax calculator",
    "university merit aggregate calculator",
    "marla converter pakistan",
    "client-side pdf utilities",
  ],
  alternates: {
    canonical: `${BASE_URL}/tools`,
    languages: {
      "x-default": `${BASE_URL}/tools`,
      "en": `${BASE_URL}/tools`,
      "en-US": `${BASE_URL}/tools`,
      "en-GB": `${BASE_URL}/tools`,
      "en-PK": `${BASE_URL}/tools`,
      "ur-PK": `${BASE_URL}/tools`,
      "en-AE": `${BASE_URL}/tools`,
      "en-SA": `${BASE_URL}/tools`,
    },
  },
  openGraph: {
    title: "All Online PDF & Productivity Tools | SamToolbox",
    description: "Browse 55+ free, fast, in-browser PDF manipulation and regional utility tools. Zero cloud uploads.",
    url: `${BASE_URL}/tools`,
    siteName: "SamToolbox",
    images: [
      {
        url: "https://samtoolbox.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SamToolbox Tools Suite",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Online PDF & Productivity Tools | SamToolbox",
    description: "Browse 55+ free, fast, in-browser PDF manipulation and regional utility tools. Zero cloud uploads.",
    images: ["https://samtoolbox.vercel.app/og-image.jpg"],
  },
  other: {
    "geo.region": "PK-PB, US, GB, AE, SA, CA, AU",
    "geo.placename": "Islamabad, Lahore, Karachi, New York, London, Dubai",
    "geo.position": "31.5204;74.3587",
    "ICBM": "31.5204, 74.3587",
  },
};

export default function ToolsDirectoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "SamToolbox Tools Directory",
        url: `${BASE_URL}/tools`,
        description: "Complete catalog of 55+ client-side PDF tools and regional calculators.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tools",
            item: `${BASE_URL}/tools`,
          },
        ],
      },
    ],
  };

  return (
    <>
      {/* 100% Server-Side Rendered (SSR) CollectionPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      {children}
    </>
  );
}
