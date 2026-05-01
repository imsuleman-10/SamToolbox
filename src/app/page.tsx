import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import AdSenseAdUnit from "@/components/AdSenseAdUnit";
import {
  QrCode, Type, ALargeSmall, FileText, Image as ImageIcon,
  ShieldCheck, Zap, Cpu, ArrowRight, Sparkles, Lock, Globe2,
  MonitorSmartphone, Users, Star, ChevronRight, CheckCircle2,
  Fingerprint, Database, Wind, Settings, Layers, Wand2,
  HelpCircle, MessageSquare, Shield, Activity, HardDrive, Terminal
} from "lucide-react";

export const metadata: Metadata = {
  title: "SamToolbox | Professional Browser Utilities — Private & Fast",
  description:
    "SamToolbox is an industrial-grade suite of 16+ free browser tools. CV Maker, QR Generator, Image Optimizer, and PDF utilities—all processed 100% locally on your device for absolute privacy.",
  keywords:
    "professional tools, privacy-first utilities, local file processing, CV maker, QR generator, image converter, PDF tools, secure browser tools",
  openGraph: {
    title: "SamToolbox | Professional Browser Utilities",
    description: "16+ High-performance tools. Zero server uploads. Absolute privacy.",
    type: "website",
    url: "https://samtoolbox.vercel.app",
  },
};

const tools = [
  {
    title: "CV Architect",
    description: "Professional recruitment templates with real-time A4 PDF generation.",
    icon: <FileText size={22} />,
    href: "/tools/cv-maker",
    tag: "Popular",
    tagColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
  {
    title: "QR Generator",
    description: "High-density QR codes for URLs, WiFi, and VCards with custom aesthetics.",
    icon: <QrCode size={22} />,
    href: "/tools/qr-generator",
    tag: "Essential",
    tagColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
  {
    title: "Image Forge",
    description: "Professional image conversion and neural-engine compression.",
    icon: <ImageIcon size={22} />,
    href: "/tools/image-converter",
    tag: "Studio",
    tagColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
  {
    title: "PDF Pipeline",
    description: "Secure merging, splitting, and optimization of document archives.",
    icon: <Layers size={22} />,
    href: "/tools/pdf-merge",
    tag: "Security",
    tagColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
  {
    title: "Text Analytics",
    description: "Advanced word density, readability, and case transformation engine.",
    icon: <ALargeSmall size={22} />,
    href: "/tools/word-counter",
    tag: "Utility",
    tagColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
  {
    title: "SEO Suite",
    description: "Meta tag generation and robots.txt optimization for search engines.",
    icon: <Globe2 size={22} />,
    href: "/tools/seo-meta-generator",
    tag: "Marketing",
    tagColor: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  },
];

const stats = [
  { value: "16+", label: "Modules" },
  { value: "100%", label: "Local" },
  { value: "0ms", label: "Latency" },
  { value: "∞", label: "Free" },
];

export default function Home() {
  const faqs = [
    {
      q: "How is SamToolbox different from other online tools?",
      a: "Most platforms upload your files to remote servers. SamToolbox processes everything inside your browser using WASM and client-side APIs. Your data never leaves your hardware."
    },
    {
      q: "Are the tools completely free to use?",
      a: "Yes. All modules are free with no subscriptions, paywalls, or limits on local processing throughput."
    },
    {
      q: "Is an internet connection required?",
      a: "You need connectivity to load the initial environment, but once the tools are cached, most functions operate entirely offline."
    },
    {
      q: "Is my privacy guaranteed?",
      a: "Absolutely. We do not maintain servers for file storage. Conversions happen in your local RAM and are purged upon session termination."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SamToolbox",
    "description": "Professional browser utilities for document and image processing. 100% private.",
    "url": "https://samtoolbox.vercel.app",
    "applicationCategory": "Utility",
    "operatingSystem": "Web Browser"
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="flex flex-col items-center bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden font-sans">

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full bg-[#020617] text-white min-h-screen flex flex-col justify-center items-center px-6 py-20 relative overflow-hidden">
        {/* Ambient Light Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[180px] opacity-10" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-700 rounded-full blur-[150px] opacity-10" />
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-blue-400 font-bold text-[9px] uppercase tracking-[0.4em] mb-10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
            <Activity size={12} className="animate-pulse" />
            Industrial Grade Utility Suite
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-black leading-[0.9] tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            Private Tools.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 italic">
              Hardware Power.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-12 duration-700">
            Professional-grade modules optimized for local execution. 
            No uploads, no tracking—just pure browser-based performance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-24 animate-in fade-in slide-in-from-bottom-16 duration-700">
            <Link
              href="/tools"
              className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-2xl shadow-blue-600/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
            >
              System Directory
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/tools/cv-maker"
              className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl border border-white/10 backdrop-blur-md transition-all flex items-center justify-center gap-3"
            >
              Resume Architect
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-20 pt-12 border-t border-white/5">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-3xl md:text-5xl font-black text-white mb-1 tracking-tighter">{s.value}</div>
                <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED TOOLS
      ══════════════════════════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-6 -mt-20 relative z-20 mb-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="group bg-[#0f172a] p-10 rounded-[3rem] border border-white/5 shadow-3xl shadow-black/50 hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all" />
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <div className="w-16 h-16 bg-white/5 group-hover:bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors duration-500 shadow-inner border border-white/5">
                  {tool.icon}
                </div>
                <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full border ${tool.tagColor}`}>
                  {tool.tag}
                </span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-4 relative z-10">
                {tool.title}
              </h3>
              <p className="text-slate-400 text-[15px] leading-relaxed font-medium mb-12 flex-1 relative z-10">
                {tool.description}
              </p>
              
              <div className="flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] relative z-10">
                Launch Protocol <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section className="w-full py-40 px-6 bg-[#020617] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
               <Terminal size={16} /> Technical Architecture
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 leading-none italic">Built on Zero-Trust.</h2>
            <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed uppercase tracking-widest text-[10px]">Unified computation — Absolute hardware control — Local priority encryption</p>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: <HardDrive />, title: "Local Load", desc: "Tool logic is cached in your browser's ephemeral memory. No data is sent back to SamToolbox." },
              { icon: <Database />, title: "Input Buffer", desc: "Provide assets via secure local pointers. They stay within your machine's RAM sandbox." },
              { icon: <Cpu />, title: "Hardware Logic", desc: "Your GPU/CPU performs the transformation directly, eliminating cloud latency and privacy risks." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] shadow-2xl border border-white/5 flex items-center justify-center text-blue-400 mb-10 group-hover:scale-110 transition-transform duration-500 shadow-blue-500/10">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase italic">{step.title}</h3>
                <p className="text-slate-400 text-[15px] leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRIVACY SHOWCASE
      ══════════════════════════════════════════ */}
      <section className="w-full py-40 px-6 overflow-hidden bg-[#020617] border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-blue-400 font-black text-[11px] uppercase tracking-[0.4em] mb-8">
              <Shield size={20} /> Privacy Protocol
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-10 leading-[0.9]">
              Absolute privacy,<br /> by <span className="text-blue-400 italic">design.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12 font-medium">
              We eliminated the server from the equation. In a world of digital surveillance, 
              SamToolbox offers an industrial-grade sanctuary where your professional work remains yours.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <Lock size={20} />, title: "Encapsulated Processing", desc: "The 'Upload' function merely maps files into a local browser sandbox." },
                { icon: <Wind size={20} />, title: "Uncapped Throughput", desc: "No internet bottlenecks. Processing speed depends entirely on your local hardware." },
                { icon: <ShieldCheck size={20} />, title: "Zero Persistent Logs", desc: "No databases, no tracking cookies, no history. Each session is a fresh start." }
              ].map((f, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white/5 rounded-[2.5rem] border border-white/5 group hover:bg-white/10 transition-all">
                  <div className="text-blue-400 shrink-0 bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white/5">{f.icon}</div>
                  <div>
                    <h4 className="font-black text-white text-sm mb-2 uppercase tracking-widest">{f.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full animate-pulse" />
            <div className="relative bg-[#020617] rounded-[4rem] p-16 text-white shadow-3xl overflow-hidden min-h-[550px] flex flex-col justify-center text-center">
               <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none" 
                    style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
               <div className="relative z-10">
                  <div className="w-28 h-28 bg-blue-500/10 border border-blue-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-[0_0_80px_rgba(37,99,235,0.4)]">
                    <Fingerprint size={56} className="text-blue-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-6 tracking-tight uppercase italic">Biometric-Grade Security</h3>
                  <p className="text-slate-400 font-medium text-lg mb-12 leading-relaxed max-w-md mx-auto">
                    All operations occur in an isolated hardware environment. 
                    Your assets are processed and permanently wiped from volatile memory upon session closure.
                  </p>
                  <div className="inline-flex items-center gap-3 px-8 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[11px] font-black uppercase tracking-[0.2em]">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    Verified Local Environment Active
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full py-40 px-6 bg-[#020617] text-white rounded-[5rem] mb-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-24">
             <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 mb-8 shadow-2xl">
                <HelpCircle size={40} className="text-blue-400" />
             </div>
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white leading-none">Technical FAQ.</h2>
             <p className="text-slate-400 font-medium text-lg">Transparency is the core of our engineering philosophy.</p>
          </div>

          <div className="grid gap-8">
            {faqs.map((faq, i) => (
              <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/8 transition-all group">
                <h3 className="text-xl font-black mb-6 flex items-start gap-4">
                  <span className="text-blue-400 bg-blue-400/10 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">Q</span> {faq.q}
                </h3>
                <p className="text-slate-400 font-medium leading-relaxed pl-12">
                   {faq.a}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-24 text-center">
             <p className="text-slate-500 mb-10 font-bold uppercase tracking-widest text-[11px]">System Support</p>
             <Link href="/contact" className="px-12 py-5 bg-white text-slate-900 rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-blue-50 transition-all flex items-center gap-3 mx-auto w-fit shadow-2xl">
                <MessageSquare size={18} /> Contact Engineer
             </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-6 py-40 text-center">
         <h2 className="text-6xl md:text-[6.5rem] font-black text-white tracking-tighter mb-10 leading-[0.9]">
           Work with <span className="text-blue-400 italic">Intimacy.</span>
         </h2>
         <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto mb-16 font-medium leading-relaxed">
           No signups, no data harvesting. Just an industrial suite of professional tools running at the edge.
         </p>
          <Link href="/tools" className="px-16 py-6 bg-blue-600 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-[0_20px_60px_rgba(37,99,235,0.3)] hover:scale-105 transition-all inline-flex items-center gap-4">
            Initialize Local Engine <ArrowRight size={20} />
          </Link>
      </section>

      <AdSenseAdUnit />

      </div>
    </>
  );
}
