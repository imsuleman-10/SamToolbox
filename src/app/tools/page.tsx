"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  QrCode, Type, ALargeSmall, FileText, Image as ImageIcon, 
  ArrowRight, Zap, ShieldCheck, Cpu, Database, Binary, 
  Layers, Settings2, Sparkles, Wand2, Search, X,
  Target, Timer, BookOpen, FileCheck, Lock, GraduationCap,
  Calendar, Brain, Globe, Shield
} from "lucide-react";

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      name: "CORE SYSTEMS",
      icon: <Cpu size={16} />,
      color: "text-amber-500",
      tools: [
        {
          title: "CV / Resume Maker",
          description: "Premium recruitment templates with real-time PDF generation.",
          icon: <FileText size={24} />,
          href: "/tools/cv-maker",
          tag: "PRO",
          tagColor: "bg-amber-500/10 text-amber-600",
          keywords: "cv resume maker job recruitment pdf"
        },
        {
          title: "QR Code Architect",
          description: "Generate high-density QR codes for URLs, WiFi, and VCards.",
          icon: <QrCode size={24} />,
          href: "/tools/qr-generator",
          tag: "SaaS",
          tagColor: "bg-blue-500/10 text-blue-600",
          keywords: "qr code generator scan mobile"
        },
      ],
    },
    {
      name: "VISUAL ASSETS",
      icon: <ImageIcon size={16} />,
      color: "text-purple-500",
      tools: [
        {
          title: "Image Converter",
          description: "Transcode perfectly between JPG, PNG, WebP, and SVG formats.",
          icon: <ImageIcon size={24} />,
          href: "/tools/image-converter",
          tag: "NEW",
          tagColor: "bg-purple-500/10 text-purple-600",
          keywords: "image converter jpg png jpeg webp svg transition format"
        },
        {
          title: "Image Compactor",
          description: "Intelligent size reduction without compromising visual fidelity.",
          icon: <Sparkles size={24} />,
          href: "/tools/image-compress",
          tag: "NEURAL",
          tagColor: "bg-emerald-500/10 text-emerald-600",
          keywords: "image compress shrink reduce size optimizer"
        },
        {
          title: "Asset Resizer",
          description: "Pixel-perfect scaling with custom aspect ratio constraints.",
          icon: <Layers size={24} />,
          href: "/tools/image-resize",
          keywords: "image resize scale crop dimensions"
        },
        {
          title: "Image to PDF",
          description: "Convert image collections into professional, layered PDF documents.",
          icon: <FileText size={24} />,
          href: "/tools/image-to-pdf",
          tag: "NEW",
          tagColor: "bg-purple-500/10 text-purple-600",
          keywords: "image to pdf convert jpg png pdf creator"
        },
      ],
    },
    {
      name: "LINGUIST SUITE",
      icon: <Binary size={16} />,
      color: "text-rose-500",
      tools: [
        {
          title: "Advanced Analytics",
          description: "Comprehensive word density and readability analysis.",
          icon: <Type size={24} />,
          href: "/tools/word-counter",
          tag: "FREE",
          tagColor: "bg-rose-500/10 text-rose-600",
          keywords: "word counter text analysis reading time character count"
        },
        {
          title: "Case Architect",
          description: "Batch transformation between CamelCase, snake_case, etc.",
          icon: <ALargeSmall size={24} />,
          href: "/tools/case-converter",
          keywords: "case converter uppercase lowercase camelcase snakecase"
        },
        {
          title: "Unicode Forge",
          description: "Generate styled typography for digital brand presence.",
          icon: <Wand2 size={24} />,
          href: "/tools/font-generator",
          keywords: "font generator unicode text style social media fancy"
        },
      ],
    },
    {
      name: "DOCUMENT PIPELINE",
      icon: <Database size={16} />,
      color: "text-slate-500",
      tools: [
        {
          title: "PDF Pipeline",
          description: "Secure merging and splitting of heavy documents.",
          icon: <FileText size={24} />,
          href: "/tools/pdf-merge",
          tag: "SECURITY",
          tagColor: "bg-slate-900 text-white",
          keywords: "pdf merge split join extract"
        },
        {
          title: "PDF Optimizer",
          description: "Compress PDF archives while preserving text clarity.",
          icon: <Settings2 size={24} />,
          href: "/tools/pdf-compress",
          keywords: "pdf compress reduce size optimizer shrink"
        },
        {
          title: "PDF Splitter",
          description: "Extract specific pages or ranges from large PDF documents.",
          icon: <FileText size={24} />,
          href: "/tools/pdf-split",
          tag: "UTILITY",
          tagColor: "bg-slate-500/10 text-slate-600",
          keywords: "pdf split extract pages divide separate"
        },
        {
          title: "Universal Reader",
          description: "Secure, local viewer for PDF, Office, and Excel documents.",
          icon: <ShieldCheck size={24} />,
          href: "/tools/pdf-reader",
          tag: "LOCAL",
          tagColor: "bg-indigo-500/10 text-indigo-600",
          keywords: "pdf reader view excel word ppt office viewer"
        },
      ],
    },
    {
      name: "STUDENT SUITE",
      icon: <GraduationCap size={16} />,
      color: "text-emerald-500",
      tools: [
        {
          title: "Resume Score Checker",
          description: "ATS resume analysis with scoring and improvement suggestions.",
          icon: <FileCheck size={24} />,
          href: "/tools/resume-score",
          tag: "NEW",
          tagColor: "bg-emerald-500/10 text-emerald-600",
          keywords: "resume score checker ats analysis cv improvement"
        },
        {
          title: "GPA Calculator",
          description: "Calculate semester and cumulative GPA for Pakistani universities.",
          icon: <GraduationCap size={24} />,
          href: "/tools/gpa-calculator",
          tag: "NEW",
          tagColor: "bg-emerald-500/10 text-emerald-600",
          keywords: "gpa calculator semester cgpa university grading"
        },
        {
          title: "Study Timer",
          description: "Pomodoro timer with productivity tracking and session history.",
          icon: <Timer size={24} />,
          href: "/tools/study-timer",
          tag: "NEW",
          tagColor: "bg-emerald-500/10 text-emerald-600",
          keywords: "study timer pomodoro productivity focus session tracking"
        },
        {
          title: "Goal Planner",
          description: "Set and track daily and weekly goals with progress monitoring.",
          icon: <Target size={24} />,
          href: "/tools/goal-planner",
          tag: "NEW",
          tagColor: "bg-emerald-500/10 text-emerald-600",
          keywords: "goal planner daily weekly tracker productivity"
        },
        {
          title: "Question Generator",
          description: "Random MCQs and quiz questions for exam preparation.",
          icon: <Brain size={24} />,
          href: "/tools/question-generator",
          tag: "NEW",
          tagColor: "bg-emerald-500/10 text-emerald-600",
          keywords: "question generator quiz mcq exam practice study"
        },
      ],
    },
    {
      name: "PRODUCTIVITY TOOLS",
      icon: <Settings2 size={16} />,
      color: "text-cyan-500",
      tools: [
        {
          title: "Assignment Formatter",
          description: "Auto-format assignments and export to professional PDFs.",
          icon: <FileText size={24} />,
          href: "/tools/assignment-formatter",
          tag: "NEW",
          tagColor: "bg-cyan-500/10 text-cyan-600",
          keywords: "assignment formatter pdf export formatting title page"
        },
        {
          title: "Notes to PDF",
          description: "Convert messy notes into beautifully formatted PDF documents.",
          icon: <BookOpen size={24} />,
          href: "/tools/notes-to-pdf",
          tag: "NEW",
          tagColor: "bg-cyan-500/10 text-cyan-600",
          keywords: "notes to pdf converter formatter clean document"
        },
        {
          title: "Password Strength Checker",
          description: "Analyze password security with crack time estimation.",
          icon: <Lock size={24} />,
          href: "/tools/password-strength",
          tag: "NEW",
          tagColor: "bg-cyan-500/10 text-cyan-600",
          keywords: "password strength checker security crack time analysis"
        },
      ],
    },
    {
      name: "OFFICE SUITE",
      icon: <FileText size={16} />,
      color: "text-emerald-500",
      tools: [
        {
          title: "Word Reader",
          description: "View and extract text from Word documents locally.",
          icon: <FileText size={24} />,
          href: "/tools/word-reader",
          keywords: "word reader doc docx view extract text"
        },
        {
          title: "Excel Reader",
          description: "Open and analyze spreadsheet data without uploads.",
          icon: <Database size={24} />,
          href: "/tools/excel-reader",
          keywords: "excel reader xls xlsx spreadsheet view data"
        },
        {
          title: "PowerPoint Reader",
          description: "Preview presentation slides directly in browser.",
          icon: <Layers size={24} />,
          href: "/tools/ppt-reader",
          keywords: "ppt reader powerpoint slides presentation view"
        },
      ],
    },
    {
      name: "SEO POWER SUITE",
      icon: <Search size={16} />,
      color: "text-blue-500",
      tools: [
        {
          title: "SEO Meta Generator",
          description: "Generate perfectly optimized meta tags for high search rankings.",
          icon: <Globe size={24} />,
          href: "/tools/seo-meta-generator",
          tag: "SEO",
          tagColor: "bg-blue-500/10 text-blue-600",
          keywords: "seo meta generator tags title description keywords"
        },
        {
          title: "Robots.txt Builder",
          description: "Create secure and optimized robots.txt files for search crawlers.",
          icon: <Shield size={24} />,
          href: "/tools/robots-txt-builder",
          tag: "TECH",
          tagColor: "bg-emerald-500/10 text-emerald-600",
          keywords: "robots.txt builder generator seo crawler bot control"
        },
      ],
    },
  ];

  // Improved search: matches partial words and individual keywords
  const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const filteredCategories = categories.map(cat => ({
    ...cat,
    tools: cat.tools.filter(tool => {
      if (searchTerms.length === 0) return true;

      const searchableText = `${tool.title} ${tool.description} ${tool.keywords || ""}`.toLowerCase();

      // Check if ANY search term is a partial match (contains or is contained)
      return searchTerms.some(term => 
        searchableText.split(/\s+/).some(word => 
          word.includes(term) || term.includes(word)
        )
      );
    })
  })).filter(cat => cat.tools.length > 0);

  return (
    <div className="min-h-screen bg-white selection:bg-brand-100 selection:text-brand-900">
      
      {/* ══════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/15 blur-[150px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-brand-400 font-bold text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Zap size={14} className="animate-pulse" />
            System Directory
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            The Tool <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-blue-400 to-indigo-400">Inventory.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-medium leading-relaxed mb-12">
            Every module in our suite is engineered to run in a sandboxed environment 
            on your local machine. High fidelity, zero telemetry.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl group">
             <div className="absolute inset-0 bg-brand-600/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl" />
             <div className="relative flex items-center bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl group-focus-within:border-brand-500/50 transition-all">
                <div className="pl-4 pr-3 text-slate-500 group-focus-within:text-brand-400 transition-colors">
                   <Search size={20} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a tool or function..." 
                  className="w-full bg-transparent border-0 outline-none text-white text-sm font-medium placeholder:text-slate-600 py-3"
                />
                {searchQuery && (
                   <button 
                    onClick={() => setSearchQuery("")}
                    className="p-2 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-all mr-1"
                   >
                     <X size={16} />
                   </button>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CATEGORY GRID
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24 min-h-[400px]">
        {filteredCategories.length > 0 ? (
          <div className="space-y-32">
            {filteredCategories.map((cat, idx) => (
              <div key={idx} className="relative animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-6 mb-12">
                  <div className={`p-4 bg-slate-900 rounded-2xl text-white shadow-xl flex items-center gap-4`}>
                    <div className={cat.color}>{cat.icon}</div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">{cat.name}</span>
                  </div>
                  <div className="h-px flex-1 bg-slate-100" />
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{cat.tools.length} MODULES</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.tools.map((tool, tIdx) => (
                    <Link
                      key={tIdx}
                      href={tool.href}
                      className="group relative bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-brand-500/50 shadow-sm hover:shadow-2xl hover:shadow-brand-600/5 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-between min-h-[290px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-10">
                          <div className="w-16 h-16 bg-slate-50 group-hover:bg-white rounded-2xl flex items-center justify-center text-brand-600 shadow-sm group-hover:shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-2">
                            {tool.icon}
                          </div>
                          {tool.tag && (
                            <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${tool.tagColor}`}>
                              {tool.tag}
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-3">
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none group-hover:text-brand-600 transition-colors">
                            {tool.title}
                          </h3>
                          <p className="text-slate-500 text-[15px] leading-relaxed font-medium">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 mt-10 flex items-center gap-2 text-brand-600 font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        Initialize Engine <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-in fade-in duration-500">
             <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Search size={32} />
             </div>
             <h3 className="text-2xl font-black text-slate-900 mb-2">No matching modules found.</h3>
             <p className="text-slate-500 font-medium">Try searching for different keywords or browse categories.</p>
             <button 
               onClick={() => setSearchQuery("")}
               className="mt-8 text-brand-600 font-black text-xs uppercase tracking-widest hover:underline"
             >
                Clear Search Query
             </button>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════
          INFRASTRUCTURE BANNER
      ══════════════════════════════════════ */}
      <section className="bg-slate-50 py-32 px-6 border-y border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block p-6 bg-white rounded-3xl shadow-xl border border-slate-100 mb-10">
             <ShieldCheck size={48} className="text-emerald-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
            100% Local Logic Architecture.
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Unlike traditional cloud tools, SamToolbox leverages your system&apos;s hardware directly. This means professional performance with absolute privacy guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-12 text-slate-400">
             <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 mb-1 tracking-tighter">AES-GCM</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Encryption Standard</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 mb-1 tracking-tighter">WASM</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Compute Core</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 mb-1 tracking-tighter">SANDBOX</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">Isolation Layer</span>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
