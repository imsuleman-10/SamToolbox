import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  QrCode, Type, ALargeSmall, FileText, Image as ImageIcon,
  ShieldCheck, Zap, Cpu, ArrowRight, Sparkles, Lock, Globe2,
  MonitorSmartphone, Users, Star, ChevronRight, CheckCircle2,
  Fingerprint, Database, Wind, Settings2, Layers, Wand2
} from "lucide-react";

export const metadata: Metadata = {
  title: "SamToolbox | Free Online Browser Tools — Privacy First",
  description:
    "SamToolbox offers 15+ free, professional-grade browser tools including CV Maker, QR Generator, Image Converter, PDF utilities, and more. 100% local processing — your data never leaves your device.",
  keywords:
    "free online tools, CV maker, QR code generator, image converter, PDF tools, browser-based tools, privacy-first tools, word counter, case converter",
  openGraph: {
    title: "SamToolbox | Free Online Browser Tools",
    description:
      "15+ professional browser tools. Zero uploads. Zero servers. Zero compromise on privacy.",
    type: "website",
    url: "https://samtoolbox.com",
  },
};

const tools = [
  {
    title: "CV / Resume Maker",
    description: "Create print-ready, professional resumes with premium templates. Export to PDF in one click.",
    icon: <FileText size={22} />,
    href: "/tools/cv-maker",
    tag: "Most Popular",
    tagColor: "bg-amber-50 text-amber-700 border border-amber-200/50",
    color: "from-amber-500/10 to-orange-500/5",
  },
  {
    title: "QR Code Generator",
    description: "Generate high-resolution, print-quality QR codes for URLs, text, WiFi, and more.",
    icon: <QrCode size={22} />,
    href: "/tools/qr-generator",
    tag: "Essential",
    tagColor: "bg-brand-50 text-brand-700 border border-brand-200/50",
    color: "from-brand-500/10 to-blue-500/5",
  },
  {
    title: "Image Converter",
    description: "Convert between JPG, PNG, WebP, and SVG formats instantly offline.",
    icon: <ImageIcon size={22} />,
    href: "/tools/image-converter",
    tag: "Pro",
    tagColor: "bg-purple-50 text-purple-700 border border-purple-200/50",
    color: "from-purple-500/10 to-violet-500/5",
  },
  {
    title: "Image Compress",
    description: "Reduce image file size without losing quality. Batch compress multiple photos.",
    icon: <Sparkles size={22} />,
    href: "/tools/image-compress",
    tag: "Neural",
    tagColor: "bg-emerald-50 text-emerald-700 border border-emerald-200/50",
    color: "from-emerald-500/10 to-teal-500/5",
  },
  {
    title: "Image Resize",
    description: "Resize images to exact dimensions with aspect ratio lock. Batch processing supported.",
    icon: <Layers size={22} />,
    href: "/tools/image-resize",
    color: "from-cyan-500/10 to-blue-500/5",
  },
  {
    title: "PDF Merge",
    description: "Combine multiple PDFs into one document. Drag, drop, and merge in seconds.",
    icon: <FileText size={22} />,
    href: "/tools/pdf-merge",
    tag: "Security",
    tagColor: "bg-slate-100 text-slate-600 border border-slate-200/50",
    color: "from-slate-500/10 to-gray-500/5",
  },
  {
    title: "PDF Split",
    description: "Extract specific pages from PDF files. Precise control over page ranges.",
    icon: <FileText size={22} />,
    href: "/tools/pdf-split",
    color: "from-slate-500/10 to-gray-500/5",
  },
  {
    title: "PDF Compress",
    description: "Shrink PDF file size while preserving quality. Optimize for web sharing.",
    icon: <Settings2 size={22} />,
    href: "/tools/pdf-compress",
    color: "from-slate-500/10 to-gray-500/5",
  },
  {
    title: "Word Counter",
    description: "Advanced word count, reading time, keyword density, and linguistic analysis.",
    icon: <ALargeSmall size={22} />,
    href: "/tools/word-counter",
    tag: "Utility",
    tagColor: "bg-emerald-50 text-emerald-700 border border-emerald-200/50",
    color: "from-emerald-500/10 to-teal-500/5",
  },
  {
    title: "Case Converter",
    description: "Transform text between uppercase, lowercase, camelCase, snake_case, and more.",
    icon: <Type size={22} />,
    href: "/tools/case-converter",
    color: "from-rose-500/10 to-pink-500/5",
  },
  {
    title: "Font Generator",
    description: "Create fancy unicode text styles for social media, bios, and creative projects.",
    icon: <Wand2 size={22} />,
    href: "/tools/font-generator",
    tag: "Creative",
    tagColor: "bg-rose-50 text-rose-700 border border-rose-200/50",
    color: "from-rose-500/10 to-pink-500/5",
  },
  {
    title: "Image to PDF",
    description: "Convert JPG and PNG images into professional PDF documents instantly.",
    icon: <FileText size={22} />,
    href: "/tools/image-to-pdf",
    tag: "NEW",
    tagColor: "bg-purple-50 text-purple-700 border border-purple-200/50",
    color: "from-purple-500/10 to-violet-500/5",
  },
  {
    title: "PDF Reader",
    description: "View PDF, Word, Excel, and PowerPoint files locally. No upload required.",
    icon: <ShieldCheck size={22} />,
    href: "/tools/pdf-reader",
    tag: "Local",
    tagColor: "bg-indigo-50 text-indigo-700 border border-indigo-200/50",
    color: "from-indigo-500/10 to-purple-500/5",
  },
  {
    title: "Word Reader",
    description: "Open and extract text from DOC/DOCX files directly in your browser.",
    icon: <FileText size={22} />,
    href: "/tools/word-reader",
    color: "from-blue-500/10 to-indigo-500/5",
  },
  {
    title: "Excel Reader",
    description: "Read and analyze XLS/XLSX spreadsheet data without uploading.",
    icon: <Database size={22} />,
    href: "/tools/excel-reader",
    color: "from-emerald-500/10 to-green-500/5",
  },
  {
    title: "PowerPoint Reader",
    description: "Preview PPT and PPTX presentations slide by slide in browser.",
    icon: <Layers size={22} />,
    href: "/tools/ppt-reader",
    color: "from-orange-500/10 to-amber-500/5",
  },
];

const stats = [
  { value: "16+", label: "Professional Tools" },
  { value: "100%", label: "Local Processing" },
  { value: "0", label: "Files Stored" },
  { value: "Free", label: "Access Forever" },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SamToolbox",
    "description": "Free online browser tools for PDF, image, and document processing. 100% privacy-first with zero server uploads.",
    "url": "https://samtoolbox.com",
    "applicationCategory": "Utility",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "CV/Resume Maker",
      "QR Code Generator",
      "Image Converter",
      "PDF Tools",
      "Document Readers",
      "Text Utilities"
    ],
    "author": {
      "@type": "Person",
      "name": "SamToolbox Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SamToolbox"
    }
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
      <div className="flex flex-col items-center bg-white selection:bg-brand-100 selection:text-brand-900">

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="w-full bg-slate-900 text-white min-h-[calc(100vh-81px)] flex flex-col justify-center items-center px-6 rounded-b-[3rem] md:rounded-b-[5rem] shadow-[0_30px_80px_rgba(0,0,0,0.3)] relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Ambient Light Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-48 -right-48 w-[800px] h-[800px] bg-brand-500 rounded-full blur-[180px] opacity-20 animate-pulse" />
          <div className="absolute bottom-0 -left-32 w-[600px] h-[600px] bg-indigo-700 rounded-full blur-[150px] opacity-15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[220px] opacity-10" />
        </div>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
<br /><br />
        <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/8 backdrop-blur-xl border border-white/10 rounded-full text-brand-300 font-black text-[8px] uppercase tracking-[0.4em] mb-8 shadow-2xl">
            <Sparkles size={10} className="animate-pulse" />
            Military Grade Privacy · Industrial Utilities
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-[0.92] tracking-tight mb-6 selection:bg-white selection:text-slate-900">
            Professional Tools.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-300 to-indigo-400">
              Zero Servers.
            </span><br />
            Total Privacy.
          </h1>

          <p className="text-sm md:text-base text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
            Join the privacy revolution. 16+ high-performance tools that process
            everything locally on your machine. <span className="text-white font-semibold">Your files never leave your sight.</span>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link
              href="/tools"
              className="group px-10 py-4 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl shadow-brand-600/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Get Started Now
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/tools/cv-maker"
              className="group px-10 py-4 bg-white/10 hover:bg-white/15 text-white font-black uppercase tracking-widest text-xs rounded-2xl border border-white/20 backdrop-blur-lg transition-all flex items-center gap-2"
            >
              Build Professional CV
              <ChevronRight size={14} />
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-80 border-t border-white/5 pt-10">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl md:text-3xl font-black text-white tracking-tighter mb-1">{s.value}</div>
                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED TOOLS GRID
      ══════════════════════════════════════════ */}
      <section className="w-full max-w-7xl mx-auto px-6 -mt-20 relative z-20 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, i) => (
            <Link
              key={i}
              href={tool.href}
              className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-200/80 shadow-2xl shadow-slate-200/60 hover:shadow-brand-600/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle Gradient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-slate-50 group-hover:bg-white rounded-[1.2rem] flex items-center justify-center text-brand-600 shadow-sm group-hover:shadow-md transition-all duration-500 group-hover:scale-110">
                    {tool.icon}
                  </div>
                  <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full leading-none ${tool.tagColor}`}>
                    {tool.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-3 group-hover:text-brand-700 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-[15px] text-slate-500 leading-relaxed font-medium mb-8">
                  {tool.description}
                </p>
                
                <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
                  Launch Tool <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/tools"
            className="inline-flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-brand-600 transition-colors shadow-xl shadow-slate-900/10"
          >
            Explore 16+ Free Tools <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRIVACY SHOWCASE — "The SamToolbox Way"
      ══════════════════════════════════════════ */}
      <section className="w-full bg-slate-50 border-y border-slate-100 py-32 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-brand-600 font-black text-[11px] uppercase tracking-[0.4em] mb-6">
              <Fingerprint size={16} />
              The Privacy Standard
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
              Why settle for tools<br /> 
              that <span className="text-brand-600 italic">watch</span> you?
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
              Most online converters upload your files to their servers, where they might be logged, analyzed, or leaked. SamToolbox uses <b>Client-Side Execution</b>—meaning your data never leaves your device.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: <Lock />, title: "End-to-End Local", desc: "No data in transit. No data at rest." },
                { icon: <Wind />, title: "Serverless Speed", desc: "Native hardware speeds. Zero upload wait." },
                { icon: <Database />, title: "Zero Logs", desc: "We don't keep records because we never had them." },
                { icon: <CheckCircle2 />, title: "Verified Clean", desc: "Built with standard, audit-friendly APIs." }
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="text-brand-600 shrink-0">{f.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">{f.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            {/* Visual Representation of Local Processing */}
            <div className="absolute inset-0 bg-brand-500/10 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative bg-white rounded-[3rem] border border-slate-200 p-1 bg-gradient-to-br from-white to-slate-50 shadow-2xl">
              <div className="bg-slate-900 rounded-[2.8rem] p-10 text-white min-h-[400px] flex flex-col justify-center overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                 </div>
                 <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-brand-500/20 border border-brand-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(37,99,235,0.3)]">
                      <Cpu size={40} className="text-brand-400" />
                    </div>
                    <div className="text-2xl font-black mb-4">Local Execution Engine</div>
                    <div className="text-slate-400 font-medium mb-8 text-sm">
                      SamToolbox orchestrates your browser&apos;s native capabilities to perform heavy lifting without ever phoning home.
                    </div>
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest text-emerald-400">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Status: Securely Offline
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════ */}
      <section className="w-full max-w-5xl mx-auto px-6 py-32">
        <div className="relative bg-slate-900 rounded-[4rem] overflow-hidden px-8 md:px-16 py-20 text-center text-white shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-brand-600/30 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1] mb-8">
              Experience the future of<br />
              <span className="text-brand-400">online productivity.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium">
              No subscriptions. No friction. Just professional tools that work where you work.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
               <Link
                href="/tools"
                className="group px-12 py-5 bg-brand-600 hover:bg-brand-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-brand-600/40 transition-all hover:scale-105"
              >
                Launch All Tools
              </Link>
              <Link
                href="/about"
                className="px-12 py-5 bg-white/10 hover:bg-white/15 text-white font-black uppercase tracking-widest text-xs rounded-2xl border border-white/20 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
