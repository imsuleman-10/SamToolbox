import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Layers,
  FileCheck,
  Scale,
} from "lucide-react";
import { TOOL_SEO_REGISTRY, BASE_URL } from "@/lib/toolSeoData";
import InteractiveRating from "@/components/InteractiveRating";

interface ToolSsrSectionProps {
  slug: string;
}

export default function ToolSsrSection({ slug }: ToolSsrSectionProps) {
  const entry = TOOL_SEO_REGISTRY[slug];
  if (!entry) return null;

  const faqs = entry.faqs || [];

  const defaultSteps = [
    {
      step: "01",
      title: "Upload or Select Your Files",
      desc: "Drag and drop your files directly into the workspace above or click to browse from your device. No file size restrictions.",
    },
    {
      step: "02",
      title: "Configure & Set Options",
      desc: "Customize your output parameters, page ranges, orientation, or compression level with instant live preview.",
    },
    {
      step: "03",
      title: "100% In-Browser Processing",
      desc: "All calculations and transformations execute inside your device's RAM using WebAssembly. Zero files are sent to any remote server.",
    },
    {
      step: "04",
      title: "Download Instant Output",
      desc: "Save your processed document or generated report directly to your downloads with a single click. No watermarks, forever free.",
    },
  ];

  const popularTools = [
    { name: "Merge PDF", slug: "pdf-merge" },
    { name: "Compress PDF", slug: "pdf-compress" },
    { name: "PDF to Word", slug: "pdf-to-word" },
    { name: "Salary Tax Calculator", slug: "salary-tax-calculator" },
    { name: "Merit Calculator", slug: "merit-calculator" },
    { name: "Marla Converter", slug: "marla-converter" },
    { name: "CV Maker", slug: "cv-maker" },
    { name: "QR Generator", slug: "qr-generator" },
  ].filter((t) => t.slug !== slug).slice(0, 6);

  return (
    <section className="bg-white border-t border-slate-200 text-slate-800 py-16 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* ── 1. SEMANTIC BREADCRUMB ───────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-red-600 transition-colors">Tools</Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">{entry.title}</span>
        </nav>

        {/* ── 2. EDITORIAL OVERVIEW & H1 SUMMARY (SPEAKABLE AEO) ──────────── */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            100% In-Browser Privacy &amp; Zero Server Uploads
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {entry.h1}
          </h2>
          <p className="speakable-summary text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl">
            {entry.description}
          </p>
        </div>

        {/* ── 3. STEP-BY-STEP HOW-TO GUIDE ─────────────────────────────────── */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-red-600" />
              How to Use {entry.title} in 4 Easy Steps
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Follow this quick step-by-step workflow for optimal results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {defaultSteps.map((s) => (
              <div
                key={s.step}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2 hover:border-red-300 transition-colors"
              >
                <div className="text-xs font-black text-red-600 font-mono tracking-wider">
                  STEP {s.step}
                </div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. ENTERPRISE ARCHITECTURE HIGHLIGHTS ───────────────────────── */}
        <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Why Choose SamToolbox for {entry.title}?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-100/60 flex items-center justify-center text-emerald-700">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900">Zero Server Uploads</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traditional web tools upload your confidential records to third-party cloud servers.
                SamToolbox processes your files strictly inside your browser's local memory.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-red-100/60 flex items-center justify-center text-red-700">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900">WebAssembly Performance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Powered by compiled WebAssembly and native Web Workers for instantaneous conversions
                without waiting in cloud queues or dealing with file upload lags.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-lg bg-blue-100/60 flex items-center justify-center text-blue-700">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900">100% Free Forever</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No subscription paywalls, no forced email registrations, and zero watermarks.
                Unlimited daily operations for personal and enterprise use.
              </p>
            </div>
          </div>
        </div>

        {/* ── 5. ENTERPRISE ARCHITECTURAL COMPARISON MATRIX ───────────────── */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-red-600" />
              SamToolbox vs. Traditional Cloud Utilities
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Architectural comparison showing why in-browser processing is safer, faster, and truly free.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="py-3 px-4">Feature / Capability</th>
                  <th className="py-3 px-4 text-emerald-700 bg-emerald-50/50">SamToolbox (Client-Side)</th>
                  <th className="py-3 px-4 text-slate-500">Legacy Cloud Converters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">File Privacy &amp; Security</td>
                  <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    100% In-Memory RAM (0 Bytes Uploaded)
                  </td>
                  <td className="py-3 px-4 text-slate-500 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    Transferred to Remote Cloud Servers
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">File Size Limitations</td>
                  <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Unlimited (Bound only by Device RAM)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    Strict 15 MB - 50 MB Free Cap / Paid Paywall
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Processing Speed &amp; Latency</td>
                  <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      Instant WebAssembly (Sub-Second)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    Slow (Network Upload Queue + Server Latency)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Registration / Account Required</td>
                  <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      None (No Sign-Up, No Credit Card)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    Mandatory Registration &amp; Email Harvesting
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Pricing &amp; Watermarks</td>
                  <td className="py-3 px-4 text-emerald-700 bg-emerald-50/30 font-medium">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      100% Free Forever &amp; Zero Watermarks
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    $12 – $24 / Month Subscription Tier
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 6. REAL USER INTERACTIVE RATING WIDGET (SCHEMA BACKING) ─────── */}
        <InteractiveRating toolSlug={slug} toolTitle={entry.title} />

        {/* ── 7. SSR FREQUENTLY ASKED QUESTIONS (AEO & LLMO) ─────────────── */}
        {faqs.length > 0 && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-red-600" />
                Frequently Asked Questions ({entry.title})
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Direct, factual answers for search engines and AI assistants.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2"
                >
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-start gap-2">
                    <span className="text-red-600 font-mono font-bold">Q:</span>
                    <span>{f.question}</span>
                  </h4>
                  <p className="speakable-faq-answer text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 8. RELATED UTILITIES (INTERNAL LINK EQUITY) ──────────────────── */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-600" />
              Explore Related Online Utilities
            </h3>
            <Link
              href="/tools"
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              All 84 Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {popularTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="p-3 rounded-xl bg-slate-50 hover:bg-red-50/50 border border-slate-200 hover:border-red-200 transition-all text-center space-y-1 block group"
              >
                <p className="font-semibold text-xs text-slate-800 group-hover:text-red-600 transition-colors truncate">
                  {tool.name}
                </p>
                <p className="text-[11px] text-slate-400 group-hover:text-red-500">
                  Try free →
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── 9. PLATFORM ATTRIBUTION & CREATOR DOSSIER ───────────────────── */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-medium text-slate-700">
              SamToolbox — Free In-Browser PDF Suite &amp; Calculator Platform
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Architected by{" "}
              <Link
                href="/suleman-zaheer"
                className="font-semibold text-slate-800 hover:text-red-600 underline"
              >
                Suleman Zaheer
              </Link>{" "}
              (Lead Software Engineer &amp; Systems Architect) · 100% Client-Side WebAssembly
            </p>
          </div>
          <Link
            href="/suleman-zaheer"
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:border-red-400 text-slate-800 text-xs font-semibold shrink-0 transition-colors"
          >
            View Creator Dossier ↗
          </Link>
        </div>

      </div>
    </section>
  );
}
