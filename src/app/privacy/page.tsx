import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | 100% Client-Side Zero Server Upload Guarantee | SamToolbox",
  description:
    "SamToolbox privacy policy. We do not collect, upload, store, or log your files or personal documents. 100% client-side WebAssembly execution in your local browser memory.",
  alternates: {
    canonical: "https://samtoolbox.vercel.app/privacy",
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SamToolbox Privacy Policy",
    url: "https://samtoolbox.vercel.app/privacy",
    description: "Official privacy policy and zero server data retention guarantee of SamToolbox.",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Zero Server Retention Guarantee
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Privacy Policy &amp; Data Security
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: November 2026 • Effective Date: January 2025 • Version 2.4
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Zero Server Uploads</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Files you drop or process never travel over the internet to remote servers. All computation runs inside your browser's private memory.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">No File Logging</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We operate zero backend document databases, zero intermediate file caches, and zero file ingestion pipelines.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">No Forced Tracking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No mandatory account creation, no password harvesting, and no invasive personal profile building.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Architectural Privacy (In-Browser Execution)</h2>
            <p>
              Unlike legacy cloud file converters (e.g., Smallpdf, iLovePDF, Adobe Document Cloud) that require uploading your private PDF, Word, or Excel documents to remote cloud storage clusters, <strong>SamToolbox</strong> uses modern WebAssembly (WASM), HTML5 Canvas, and client-side JavaScript APIs (pdf-lib, pdfjs, Tesseract.js).
            </p>
            <p>
              When you convert, merge, compress, or sign a document, the binary byte manipulation occurs exclusively within your local computer or mobile device RAM. Once you close the tab, the allocated memory is instantly purged by your operating system.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Cookies, Local Storage &amp; User Ratings</h2>
            <p>
              SamToolbox uses standard browser <code>localStorage</code> strictly to persist non-identifying client preferences:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Tool interactive ratings and feedback submitted via the 5-star review widget.</li>
              <li>Temporary offline theme or calculator parameter states.</li>
            </ul>
            <p>
              We do not use tracking cookies to monitor your browsing activities across third-party websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Compliance with Global Privacy Regulations (GDPR &amp; CCPA)</h2>
            <p>
              Because SamToolbox never ingests, stores, or transmits your uploaded documents or Personally Identifiable Information (PII), we inherently fulfill the strict data minimization requirements set forth by:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>GDPR (EU):</strong> Zero cross-border personal data transfers.</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>CCPA (California):</strong> We do not sell user data.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Contact &amp; Data Inquiries</h2>
            <p>
              For security, architectural inquiries, or privacy validation, you may contact the platform engineering office directly:
            </p>
            <p className="font-medium text-slate-800">
              Email: <a href="mailto:support@samtoolbox.com" className="text-red-600 hover:underline">support@samtoolbox.com</a> • Creator Dossier: <Link href="/suleman-zaheer" className="text-red-600 hover:underline">Suleman Zaheer (Architect)</Link>
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
