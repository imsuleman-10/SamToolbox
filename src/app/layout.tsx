import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateWebApplicationSchema,
  generateAEOFAQSchema,
} from "@/lib/structuredData";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#e5322d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "SamToolbox | Every Tool You Need for PDFs & Calculations in One Place",
    template: "%s | SamToolbox",
  },
  description:
    "100% Free, Private, In-Browser Tools. Merge, Split, Compress, Convert, Edit, and Sign PDFs. FBR Salary Tax, Aggregate Merit, Marla Converter, Zakat, e-Stamp Paper, and GPA Calculators with zero server uploads.",
  keywords: [
    "SamToolbox",
    "free pdf tools",
    "iLovePDF alternative",
    "merge pdf",
    "compress pdf",
    "pdf to word",
    "word to pdf",
    "fbr salary tax calculator 2024-2025",
    "university aggregate merit calculator",
    "marla converter pakistan",
    "zakat calculator nisab",
    "e-stamp paper margin formatter",
    "passport photo resizer nadra fpsc",
    "gpa calculator",
    "loan emi calculator",
    "client-side pdf processing",
    "zero upload privacy tools",
  ],
  authors: [{ name: "SamToolbox", url: "https://samtoolbox.vercel.app" }],
  creator: "SamToolbox",
  publisher: "SamToolbox",
  applicationName: "SamToolbox",
  metadataBase: new URL("https://samtoolbox.vercel.app"),
  alternates: {
    canonical: "https://samtoolbox.vercel.app",
    languages: {
      "x-default": "https://samtoolbox.vercel.app",
      "en": "https://samtoolbox.vercel.app",
      "en-US": "https://samtoolbox.vercel.app",
      "en-GB": "https://samtoolbox.vercel.app",
      "en-PK": "https://samtoolbox.vercel.app",
      "ur-PK": "https://samtoolbox.vercel.app",
      "en-AE": "https://samtoolbox.vercel.app",
      "en-SA": "https://samtoolbox.vercel.app",
      "en-CA": "https://samtoolbox.vercel.app",
      "en-AU": "https://samtoolbox.vercel.app",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon",
    apple: "/icon",
  },
  openGraph: {
    title: "SamToolbox | Complete Online PDF Tools & Regional Utilities Suite",
    description:
      "Every tool you need to work with PDFs and calculations at your fingertips. 100% free, private, and instant with zero server uploads.",
    url: "https://samtoolbox.vercel.app",
    siteName: "SamToolbox",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_PK", "ur_PK", "ar_AE"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SamToolbox | Free Online PDF & Productivity Suite",
    description:
      "Merge, split, compress, convert, edit, and sign PDFs directly in your browser. Complete zero-upload privacy.",
    creator: "@samtoolbox",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "PK-PB, US, GB, AE, SA, CA, AU",
    "geo.placename": "Islamabad, Lahore, Karachi, New York, London, Dubai",
    "geo.position": "31.5204;74.3587",
    "ICBM": "31.5204, 74.3587",
    "revisit-after": "1 days",
    "rating": "General",
    "distribution": "Global",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const webAppSchema = generateWebApplicationSchema();
  const aeoFaqSchema = generateAEOFAQSchema();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <head>
        <Script
          id="samtoolbox-structured-data-graph"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                organizationSchema,
                websiteSchema,
                webAppSchema,
                aeoFaqSchema,
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#f8fafc] text-slate-800 selection:bg-red-500 selection:text-white">
        <Preloader />
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
