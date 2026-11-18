import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
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
    default: "SamToolbox | 84+ Free Online PDF Tools, Developer Utilities & Calculators — 100% Private",
    template: "%s | SamToolbox",
  },
  description:
    "Enterprise-grade suite of 84+ free in-browser PDF tools, developer utilities, and calculators. Merge, compress, convert, edit & sign PDFs. 100% client-side with zero server uploads.",
  keywords: [
    "SamToolbox",
    "SamToolbox PDF",
    "free pdf tools",
    "iLovePDF alternative",
    "Smallpdf free alternative",
    "merge pdf online",
    "compress pdf online",
    "pdf to word converter",
    "word to pdf converter",
    "free json formatter",
    "url encoder online",
    "fbr salary tax calculator 2024-2026",
    "university aggregate merit calculator",
    "marla converter pakistan",
    "zakat calculator nisab",
    "e-stamp paper margin formatter",
    "passport photo resizer nadra fpsc",
    "gpa calculator",
    "loan emi calculator",
    "client-side pdf processing",
    "zero upload privacy tools",
    "browser utility suite",
    "free online tools usa",
    "free online tools uk",
    "free online tools canada",
    "free online tools australia",
    "free online tools india",
  ],
  authors: [{ name: "Suleman Zaheer", url: "https://samtoolbox.vercel.app/suleman-zaheer" }],
  creator: "Suleman Zaheer",
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
      "en-CA": "https://samtoolbox.vercel.app",
      "en-AU": "https://samtoolbox.vercel.app",
      "en-IN": "https://samtoolbox.vercel.app",
      "en-PK": "https://samtoolbox.vercel.app",
      "en-AE": "https://samtoolbox.vercel.app",
      "en-SA": "https://samtoolbox.vercel.app",
      "en-SG": "https://samtoolbox.vercel.app",
      "en-ZA": "https://samtoolbox.vercel.app",
      "en-NZ": "https://samtoolbox.vercel.app",
      "es": "https://samtoolbox.vercel.app",
      "es-ES": "https://samtoolbox.vercel.app",
      "es-MX": "https://samtoolbox.vercel.app",
      "fr": "https://samtoolbox.vercel.app",
      "fr-FR": "https://samtoolbox.vercel.app",
      "fr-CA": "https://samtoolbox.vercel.app",
      "de": "https://samtoolbox.vercel.app",
      "de-DE": "https://samtoolbox.vercel.app",
      "ar": "https://samtoolbox.vercel.app",
      "ar-AE": "https://samtoolbox.vercel.app",
      "ar-SA": "https://samtoolbox.vercel.app",
      "pt": "https://samtoolbox.vercel.app",
      "pt-BR": "https://samtoolbox.vercel.app",
      "hi": "https://samtoolbox.vercel.app",
      "hi-IN": "https://samtoolbox.vercel.app",
      "ur": "https://samtoolbox.vercel.app",
      "ur-PK": "https://samtoolbox.vercel.app",
      "it-IT": "https://samtoolbox.vercel.app",
      "nl-NL": "https://samtoolbox.vercel.app",
      "ja-JP": "https://samtoolbox.vercel.app",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon" },
    ],
  },
  openGraph: {
    title: "SamToolbox | 84+ Free Online PDF Tools & Developer Utilities Suite",
    description:
      "Every tool you need to work with PDFs, code, and calculations at your fingertips. 100% free, private, and instant with zero server uploads.",
    url: "https://samtoolbox.vercel.app",
    siteName: "SamToolbox",
    images: [
      {
        url: "https://samtoolbox.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SamToolbox - 84+ Free Online PDF Tools & Developer Suite",
      },
    ],
    locale: "en_US",
    alternateLocale: [
      "en_GB", "en_CA", "en_AU", "en_IN", "en_PK", "es_ES", "es_MX",
      "fr_FR", "de_DE", "ar_AE", "pt_BR", "hi_IN", "ur_PK", "ja_JP"
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SamToolbox | 84+ Free Online PDF, Developer & Productivity Suite",
    description:
      "Merge, split, compress, convert, edit, and code directly in your browser with 84+ tools. Complete zero-upload privacy.",
    images: ["https://samtoolbox.vercel.app/og-image.jpg"],
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
  verification: {
    other: {
      "msvalidate.01": "B036193B0CBC01502907165B16C7DF9E",
    },
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
        {/* 100% Server-Side Rendered (SSR) Root Schema.org Graph */}
        <script
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
