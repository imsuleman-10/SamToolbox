import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  MonitorSmartphone,
  Star,
  Code2,
  ArrowRight,
  Lock,
  Globe2,
  Cpu,
  CheckCircle2,
  Sparkles,
  Fingerprint,
  Terminal,
  UserCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About SamToolbox | 84+ Privacy-First In-Browser Utilities",
  description:
    "SamToolbox is a 100% free, privacy-first online utility suite. All 84+ tools run locally in your web browser with zero server uploads and zero data retention. Architected by Suleman Zaheer.",
  keywords: [
    "about samtoolbox",
    "privacy browser tools",
    "local processing tools",
    "no upload tools",
    "free online utilities",
    "ilovepdf alternative",
    "smallpdf private alternative",
    "suleman zaheer samtoolbox",
  ],
  alternates: {
    canonical: "https://samtoolbox.vercel.app/about",
  },
  openGraph: {
    title: "About SamToolbox | 84+ Privacy-First Browser Tools",
    description: "84+ free professional tools. Zero servers. Zero uploads. Powered 100% by your browser memory.",
    url: "https://samtoolbox.vercel.app/about",
    images: ["https://samtoolbox.vercel.app/og-image.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About SamToolbox | 84+ Privacy-First Browser Tools",
    description: "84+ free professional tools. Zero servers. Zero uploads. Powered 100% by your browser memory.",
    images: ["https://samtoolbox.vercel.app/og-image.jpg"],
  },
};

const principles = [
  {
    num: "01",
    title: "Sovereign Privacy",
    icon: <ShieldCheck size={26} />,
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    body: "At SamToolbox, we believe utility tasks should never require uploading confidential documents to third-party servers. All 84+ tools run 100% inside your local device RAM using WebAssembly and client-side JavaScript. No registration, no tracking, just pure utility.",
  },
  {
    num: "02",
    title: "Zero Data Retention",
    icon: <Fingerprint size={26} />,
    accent: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    body: "Every engineering decision is governed by one rule: 'Can this run without a server?' If yes, it runs purely in your browser. We store no files, maintain no document caches, and never log user inputs. Your privacy is our fundamental architecture.",
  },
  {
    num: "03",
    title: "Client-Side Compute",
    icon: <Code2 size={26} />,
    accent: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    body: "Built with Next.js App Router and TailwindCSS, SamToolbox leverages WebAssembly, HTML5 Canvas, Web Workers, and modern File APIs to deliver desktop-grade PDF manipulation and calculation speed with sub-second response times.",
  },
];

const pillars = [
  { icon: <Lock size={20} />, title: "Absolute Privacy", desc: "Files process strictly in browser RAM. Zero bytes are uploaded to remote servers.", color: "text-emerald-600 bg-emerald-50" },
  { icon: <Zap size={20} />, title: "Sub-Second Speed", desc: "Instant WebAssembly execution with zero cloud queues or file upload lags.", color: "text-red-600 bg-red-50" },
  { icon: <Star size={20} />, title: "100% Free Forever", desc: "No subscriptions, paywalls, or feature gates. Unlimited daily utility operations.", color: "text-amber-600 bg-amber-50" },
  { icon: <MonitorSmartphone size={20} />, title: "Multi-Platform", desc: "Responsive across desktop, tablet, and mobile browsers with zero software installs.", color: "text-indigo-600 bg-indigo-50" },
  { icon: <Globe2 size={20} />, title: "Global & Regional", desc: "Includes specialized Pakistani real estate, tax, and university merit formulas alongside global PDF tools.", color: "text-teal-600 bg-teal-50" },
  { icon: <Cpu size={20} />, title: "Zero Telemetry", desc: "No invasive telemetry or tracking cookies. Complete sovereign document security.", color: "text-purple-600 bg-purple-50" },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://samtoolbox.vercel.app/about#webpage",
    name: "About SamToolbox — 84+ Privacy-First Browser Tools",
    url: "https://samtoolbox.vercel.app/about",
    description: "Learn about SamToolbox: a free, 100% client-side online utility suite engineered by Suleman Zaheer.",
    mainEntity: {
      "@type": "Organization",
      "@id": "https://samtoolbox.vercel.app/#organization",
      name: "SamToolbox",
      url: "https://samtoolbox.vercel.app",
      founder: {
        "@type": "Person",
        "@id": "https://samtoolbox.vercel.app/suleman-zaheer#person",
        name: "Suleman Zaheer",
        url: "https://samtoolbox.vercel.app/suleman-zaheer",
        jobTitle: "Lead Software Engineer & Systems Architect",
      },
    },
  };

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative w-full pt-20 pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-50 border border-red-200 rounded-full text-red-600 font-bold text-xs uppercase tracking-wider">
            <Sparkles size={14} />
            100% Client-Side Privacy Architecture
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Privacy-First Web Utilities.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
              Zero Server Uploads.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            SamToolbox eliminates the cloud middleman. We provide <strong>84+ enterprise-grade PDF, document, and calculator tools</strong> that execute entirely within your device's browser memory for total privacy and unmatched speed.
          </p>
        </div>
      </section>

      {/* ── CORE PRINCIPLES ────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:border-red-300 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 ${p.bg} ${p.accent} border ${p.border} rounded-xl flex items-center justify-center`}>
                  {p.icon}
                </div>
                <span className="text-2xl font-black text-slate-200 font-mono">{p.num}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{p.title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CREATOR ATTRIBUTION DOSSIER ─────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5" /> Platform Leadership &amp; Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Architected by Suleman Zaheer
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              SamToolbox is designed, engineered, and maintained by <strong>Muhammad Suleman Zaheer Mughal</strong> (Lead Software Engineer, Systems Architect, Founder &amp; CEO of SAMStack Tech). Primarily a high-level software engineer studying CS at UET Lahore, he is also a recognized author and Urdu poet.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-2">
              <span>• Monthly Platform Revenue: PKR 1.5–2L ($530–$715 USD)</span>
              <span>• Net Worth: ~$200K USD</span>
              <span>• ORCID: 0009-0006-0200-0583</span>
            </div>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/suleman-zaheer"
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all text-center"
            >
              Read Wikipedia Article →
            </Link>
            <Link
              href="/tools"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 transition-all text-center"
            >
              Explore 84+ Tools
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6 PILLARS GRID ─────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Why Thousands of Users Rely on SamToolbox
          </h2>
          <p className="text-sm text-slate-500">
            Engineered from first principles to outperform server-dependent file utilities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pill, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className={`w-11 h-11 ${pill.color} rounded-xl flex items-center justify-center`}>
                {pill.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base">{pill.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{pill.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200 py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-14 h-14 bg-red-50 text-red-600 border border-red-200 rounded-2xl flex items-center justify-center mx-auto">
            <Lock size={26} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Private by Design. Free by Choice.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            Experience absolute data sovereignty. Process your confidential contracts, academic papers, and tax documents with 0 bytes leaving your computer.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/tools"
              className="w-full sm:w-auto px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all"
            >
              Open Tool Directory <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all"
            >
              Contact Engineering
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
