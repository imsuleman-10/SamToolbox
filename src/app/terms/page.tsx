import type { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Free Open Web Utility License | SamToolbox",
  description:
    "Official Terms of Service for SamToolbox. Free lifetime usage for personal, educational, and commercial purposes with zero warranty on client-side computational output.",
  alternates: {
    canonical: "https://samtoolbox.vercel.app/terms",
  },
};

export default function TermsOfServicePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SamToolbox Terms of Service",
    url: "https://samtoolbox.vercel.app/terms",
    description: "Legal terms of service and usage conditions for the SamToolbox utility platform.",
    publisher: {
      "@type": "Organization",
      name: "SamToolbox",
      url: "https://samtoolbox.vercel.app",
    },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-12 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs">
        
        {/* Header */}
        <div className="border-b border-slate-100 pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Scale className="w-4 h-4" /> Open Web Utility License
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: November 2026 • Effective Date: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>SamToolbox</strong> (https://samtoolbox.vercel.app or its affiliated domain mirrors), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you must discontinue using the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Free Lifetime Commercial &amp; Personal License</h2>
            <p>
              All 62+ utility tools on SamToolbox—including PDF manipulation suites, academic assignment formatters, FBR income tax calculators, university merit aggregators, and land area converters—are provided <strong>100% free of charge</strong> for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Individual personal workflows and study requirements.</li>
              <li>Enterprise, corporate, and commercial business document processing.</li>
              <li>Educational and non-profit institutional operations.</li>
            </ul>
            <p>
              No subscription fee, paid tier, or license activation is required.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. In-Browser Client Computation &amp; Liability Disclaimer</h2>
            <p>
              All software functions execute locally within your device's web browser environment. While every effort is made by our engineering team to ensure rigorous accuracy and standards compliance (e.g., ISO 32000-1 for PDF, FBR Tax Slabs for Pakistan, LDA/CDA land measurement standards):
            </p>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Disclaimer of Warranties:</strong> The utilities are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind. Users should verify critical legal, financial, or tax calculations with certified professionals before official governmental filings.
              </span>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Prohibited Uses</h2>
            <p>
              Users agree not to attempt to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Launch automated denial-of-service (DDoS) attacks against platform hosting infrastructure.</li>
              <li>Reverse engineer or scrape platform assets in violation of fair use.</li>
              <li>Circumvent or tamper with client-side cryptographic hashing tools.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Governing Law &amp; Creator Attribution</h2>
            <p>
              These Terms shall be interpreted in accordance with applicable digital laws. The platform was architected and is maintained under the direction of{" "}
              <Link href="/suleman-zaheer" className="font-semibold text-red-600 hover:underline">
                Suleman Zaheer
              </Link>{" "}
              (Founder &amp; CEO of SAMStack Tech, Lahore, Pakistan).
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
