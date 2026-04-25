import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, Zap, MonitorSmartphone, Star,
  Code2, ArrowRight, Lock, Globe2, Cpu,
  CheckCircle2, Sparkles, Fingerprint
} from "lucide-react";

export const metadata: Metadata = {
  title: "About SamToolbox | Privacy-First Browser Tools",
  description:
    "SamToolbox is a free, privacy-first online toolbox. All tools run 100% in your browser — your files never leave your device. Built with Next.js, React, and modern HTML5 APIs.",
  keywords:
    "about samtoolbox, privacy browser tools, local processing tools, no upload tools, free online utilities",
  openGraph: {
    title: "About SamToolbox | Privacy-First Browser Tools",
    description: "15+ free professional tools. Zero servers. Zero uploads. Powered by your browser.",
    type: "website",
  },
};

const principles = [
  {
    num: "01",
    title: "Our Mission",
    icon: <ShieldCheck size={26} />,
    accent: "text-brand-600",
    bg: "bg-brand-50/50",
    border: "border-brand-100",
    body: "At SamToolbox, we believe powerful utility tasks should never require uploading sensitive data to third-party servers. Our mission is to provide a comprehensive suite of professional tools that run 100% locally on your device, powered by modern browser APIs. No registration, no tracking, just pure utility.",
  },
  {
    num: "02",
    title: "Why We're Different",
    icon: <Fingerprint size={26} />,
    accent: "text-amber-600",
    bg: "bg-amber-50/50",
    border: "border-amber-100",
    body: "Every product decision we make is filtered through one question: 'Does this require a server?' If the answer is yes, we find a way to make it work without one. We don't harvest your data, we don't use cookies for tracking, and we never see the files you process. Your privacy isn't a feature; it's our foundation.",
  },
  {
    num: "03",
    title: "The Technology",
    icon: <Code2 size={26} />,
    accent: "text-indigo-600",
    bg: "bg-indigo-50/50",
    border: "border-indigo-100",
    body: "Built using Next.js 16 and TailwindCSS, SamToolbox leverages HTML5 Canvas, File APIs, Web Workers, and WebAssembly to deliver desktop-class performance in a web context. By utilizing the compute power of your own hardware, we ensure military-grade data sovereignty.",
  },
];

const pillars = [
  { icon: <Lock size={20} />, title: "Absolute Privacy", desc: "Files are processed in browser memory only. Nothing is ever sent to a server.", color: "text-brand-600 bg-brand-50" },
  { icon: <Zap size={20} />, title: "Blazing Speed", desc: "Execution is near-instant, measured in milliseconds, without server delays.", color: "text-amber-600 bg-amber-50" },
  { icon: <Star size={20} />, title: "Zero Cost. Always.", desc: "No paywalls, subscription traps, or trial limits. Every tool is free forever.", color: "text-emerald-600 bg-emerald-50" },
  { icon: <MonitorSmartphone size={20} />, title: "Works Everywhere", desc: "Fully responsive on all devices and functions offline after the first load.", color: "text-purple-600 bg-purple-50" },
  { icon: <Globe2 size={20} />, title: "Open Standard", desc: "Built on standard web technologies without proprietary plugins or dependencies.", color: "text-rose-600 bg-rose-50" },
  { icon: <Cpu size={20} />, title: "Local Compute", desc: "Uses your device's power for processing, ensuring total data control.", color: "text-slate-600 bg-slate-50" },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen selection:bg-brand-100 selection:text-brand-900">

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative w-full pt-32 pb-48 px-6 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Background Aesthetics */}
        <div className="absolute inset-0 bg-[#020617]/70 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-brand-500/20 blur-[120px] rounded-full opacity-50" />
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-500/10 backdrop-blur-md border border-brand-500/20 rounded-full text-brand-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-10">
            <Sparkles size={12} />
            Our Philosophy
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[0.9]">
            The Privacy-First<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-400 to-indigo-400">
              Toolbox for Pros.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            SamToolbox is revolutionizing online utilities by eliminating the server. 
            Powerful tools, professional results, and absolute data sovereignty.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CORE MISSION CARDS
      ══════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 -mt-32 relative z-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <div key={i} className="group relative bg-white rounded-3xl border border-slate-200 p-8 shadow-2xl shadow-slate-200/50 transition-all duration-500 hover:shadow-brand-500/10 hover:-translate-y-2">
              <div className={`w-14 h-14 ${p.bg} ${p.accent} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                {p.icon}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-[10px] font-black ${p.accent} tracking-widest`}>{p.num}</span>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">{p.title}</h2>
              </div>
              <p className="text-slate-500 leading-relaxed text-sm font-medium">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          STAT/DETAIL SECTION
      ══════════════════════════════════════ */}
      <section className="bg-slate-50 py-24 px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="text-[11px] font-black text-brand-600 uppercase tracking-[0.4em] mb-4">Why it matters</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                No storage. No logs.<br />
                Just <span className="text-brand-600 italic">local</span> executions.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                In an era where your data is the product, SamToolbox takes a stand. 
                We provide the convenience of online tools with the security of offline software.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Military-grade client-side encryption",
                  "Zero data retention policies",
                  "No tracking cookies or advertisements",
                  "100% open-standard web architecture"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-brand-500/10 blur-3xl rounded-full" />
              <div className="relative bg-white rounded-[2rem] border border-slate-200 p-8 shadow-xl">
                 <div className="grid grid-cols-2 gap-6">
                    {pillars.map((pill, i) => (
                      <div key={i} className="p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                        <div className={`w-10 h-10 ${pill.color} rounded-xl flex items-center justify-center mb-3`}>
                          {pill.icon}
                        </div>
                        <h4 className="font-black text-slate-900 text-sm mb-1">{pill.title}</h4>
                        <p className="text-[12px] text-slate-500 leading-tight">{pill.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA FOOTER
      ══════════════════════════════════════ */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-4 bg-slate-900 text-white rounded-3xl mb-10 shadow-2xl shadow-slate-900/30">
            <Lock size={32} />
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Private by design.<br />
            Free by choice.
          </h2>
          <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto font-medium">
            Join thousands of professionals who trust SamToolbox for their daily tasks 
            without ever compromising their data security.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tools"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-brand-600/40 transition-all hover:scale-105"
            >
              Start Using Tools
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase tracking-widest text-xs rounded-2xl transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
