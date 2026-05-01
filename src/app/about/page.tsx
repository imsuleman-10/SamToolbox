import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck, Zap, MonitorSmartphone, Star,
  Code2, ArrowRight, Lock, Globe2, Cpu,
  CheckCircle2, Sparkles, Fingerprint, Terminal
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
    title: "Sovereign Mission",
    icon: <ShieldCheck size={26} />,
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    body: "At SamToolbox, we believe powerful utility tasks should never require uploading sensitive data to third-party servers. Our mission is to provide a comprehensive suite of professional tools that run 100% locally on your device, powered by modern browser APIs. No registration, no tracking, just pure utility.",
  },
  {
    num: "02",
    title: "Pure Isolation",
    icon: <Fingerprint size={26} />,
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    body: "Every product decision we make is filtered through one question: 'Does this require a server?' If the answer is yes, we find a way to make it work without one. We don't harvest your data, we don't use cookies for tracking, and we never see the files you process. Your privacy isn't a feature; it's our foundation.",
  },
  {
    num: "03",
    title: "Edge Computing",
    icon: <Code2 size={26} />,
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    body: "Built using Next.js 16 and TailwindCSS, SamToolbox leverages HTML5 Canvas, File APIs, Web Workers, and WebAssembly to deliver desktop-class performance in a web context. By utilizing the compute power of your own hardware, we ensure military-grade data sovereignty.",
  },
];

const pillars = [
  { icon: <Lock size={20} />, title: "Absolute Privacy", desc: "Files are processed in browser memory only. Nothing is ever sent to a server.", color: "text-rose-500 bg-rose-500/10" },
  { icon: <Zap size={20} />, title: "Blazing Speed", desc: "Execution is near-instant, measured in milliseconds, without server delays.", color: "text-rose-500 bg-rose-500/10" },
  { icon: <Star size={20} />, title: "Zero Cost. Always.", desc: "No paywalls, subscription traps, or trial limits. Every tool is free forever.", color: "text-rose-500 bg-rose-500/10" },
  { icon: <MonitorSmartphone size={20} />, title: "Works Everywhere", desc: "Fully responsive on all devices and functions offline after the first load.", color: "text-rose-500 bg-rose-500/10" },
  { icon: <Globe2 size={20} />, title: "Open Standard", desc: "Built on standard web technologies without proprietary plugins or dependencies.", color: "text-rose-500 bg-rose-500/10" },
  { icon: <Cpu size={20} />, title: "Local Compute", desc: "Uses your device's power for processing, ensuring total data control.", color: "text-rose-500 bg-rose-500/10" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#020617] min-h-screen selection:bg-rose-500/30 selection:text-rose-200 font-sans">

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section className="relative w-full pt-48 pb-64 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 font-black text-[10px] uppercase tracking-[0.4em] mb-12 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
            <Sparkles size={14} className="animate-pulse" />
            Sovereign Protocol v1.0
          </div>
          
          <h1 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter mb-10 leading-[0.8] animate-in fade-in slide-in-from-bottom-8 duration-700">
            Privacy-First<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-rose-600 italic">
              Toolbox for Pros.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium animate-in fade-in duration-1000 delay-300">
            SamToolbox is revolutionizing online utilities by eliminating the server. 
            Powerful tools, professional results, and <span className="text-white font-black italic">absolute data sovereignty.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CORE MISSION CARDS
      ══════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 -mt-32 relative z-20 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {principles.map((p, i) => (
            <div key={i} className="group relative bg-[#0f172a] rounded-[3.5rem] border border-white/5 p-12 shadow-3xl shadow-black transition-all duration-700 hover:border-rose-500/30 hover:-translate-y-4 animate-in fade-in slide-in-from-bottom-12 duration-700" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="absolute top-0 right-0 p-8 text-white/5 font-black text-8xl italic select-none">{p.num}</div>
              <div className={`w-20 h-20 ${p.bg} ${p.accent} border ${p.border} rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                {p.icon}
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter mb-6 uppercase italic">{p.title}</h2>
              <p className="text-slate-400 leading-relaxed text-lg font-medium group-hover:text-slate-300 transition-colors">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          STAT/DETAIL SECTION
      ══════════════════════════════════════ */}
      <section className="py-40 px-6 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0f172a]/30 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 font-black text-[10px] uppercase tracking-[0.4em]">
                <Terminal size={14} />
                Execution Mode
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none uppercase italic">
                No storage. No logs.<br />
                Just <span className="text-rose-500">local</span> speed.
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed font-medium">
                In an era where your data is the product, SamToolbox takes a stand. 
                We provide the convenience of online tools with the <span className="text-white font-bold italic">security of offline software.</span>
              </p>
              
              <ul className="space-y-6">
                {[
                  "Military-grade client-side processing",
                  "Zero data retention protocol",
                  "No tracking cookies or telemetry",
                  "100% open-standard web architecture"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-200 font-black text-sm uppercase tracking-tight">
                    <div className="w-6 h-6 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                      <CheckCircle2 size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-rose-600/10 blur-[120px] rounded-full group-hover:bg-rose-600/20 transition-all duration-1000" />
              <div className="relative bg-[#0f172a] rounded-[4rem] border border-white/5 p-12 md:p-16 shadow-3xl shadow-black overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 rounded-full blur-3xl" />
                 <div className="grid grid-cols-2 gap-10">
                    {pillars.map((pill, i) => (
                      <div key={i} className="space-y-4">
                        <div className={`w-14 h-14 ${pill.color} border border-rose-500/20 rounded-2xl flex items-center justify-center mb-6`}>
                          {pill.icon}
                        </div>
                        <h4 className="font-black text-white text-lg uppercase tracking-tighter italic">{pill.title}</h4>
                        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">{pill.desc}</p>
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
      <section className="py-64 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="w-24 h-24 bg-[#0f172a] border border-white/5 text-rose-500 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-3xl mx-auto group hover:scale-110 transition-transform duration-500">
            <Lock size={40} className="animate-pulse" />
          </div>
          <h2 className="text-5xl md:text-[6rem] font-black text-white tracking-tighter mb-10 leading-none uppercase">
            Private by design.<br />
            <span className="italic text-rose-500">Free by choice.</span>
          </h2>
          <p className="text-slate-400 text-xl mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
            Join thousands of professionals who trust SamToolbox for their daily tasks 
            without ever compromising their data security.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/tools"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 px-12 py-8 bg-white text-slate-900 font-black uppercase tracking-widest text-[11px] rounded-[2rem] shadow-3xl transition-all hover:scale-105"
            >
              Start Using Systems
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-12 py-8 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[11px] rounded-[2rem] transition-all hover:bg-white/10"
            >
              Signal Command
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
