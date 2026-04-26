import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using more premium fonts
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SamToolbox | Premium Industrial-Grade Browser Tools",
    template: "%s | SamToolbox",
  },
  description: "Lightweight, high-performance, browser-based tools. 100% privacy-first, zero-upload architecture for modern professionals. Convert, compress, create PDFs, generate QR codes, and more.",
  keywords: "online tools, PDF converter, image converter, QR generator, CV maker, document reader, free tools, web utilities",
  authors: [{ name: "SamToolbox" }],
  creator: "SamToolbox",
  publisher: "SamToolbox",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "LcebSxNpS-SRI0tWToRJ3zX9rYqZM4Ltokkil3HUdvU",
  },
  openGraph: {
    title: "SamToolbox | Private Browser Utilities",
    description: "Convert, Compress, and Create with zero server uploads. 100% privacy-first online tools.",
    url: "https://samtoolbox.com",
    siteName: "SamToolbox",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://samtoolbox.com/logo.jpg",
        width: 1200,
        height: 630,
        alt: "SamToolbox Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SamToolbox | Premium Browser Tools",
    description: "Free, privacy-first online tools for conversions, compression, and document handling.",
    images: ["https://samtoolbox.com/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6367920112912612"
        crossOrigin="anonymous"
      />
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-900">
        <Preloader />
        <Navbar />
        {/* Removed max-w-7xl and padding here to allow full-width heroes/sections per-page */}
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
