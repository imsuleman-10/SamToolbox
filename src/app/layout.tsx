import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using more premium fonts
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
  description: "Lightweight, high-performance, browser-based tools. 100% privacy-first, zero-upload architecture for modern professionals.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  verification: {
    google: "LcebSxNpS-SRI0tWToRJ3zX9rYqZM4Ltokkil3HUdvU",
  },
  openGraph: {
    title: "SamToolbox | Private Browser Utilities",
    description: "Convert, Compress, and Create with zero server uploads.",
    url: "https://samtoolbox.com",
    siteName: "SamToolbox",
    locale: "en_US",
    type: "website",
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
