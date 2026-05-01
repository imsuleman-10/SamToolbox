"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  QrCode, Type, ALargeSmall, FileText, Image as ImageIcon, 
  ArrowRight, Zap, ShieldCheck, Cpu, Database, Binary, 
  Layers, Settings, Sparkles, Wand2, Search, X,
  Target, Timer, BookOpen, FileCheck, Lock, GraduationCap,
  Calendar, Brain, Globe, Shield, Terminal, Activity
} from "lucide-react";

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      name: "CORE SYSTEMS",
      icon: <Cpu size={16} />,
      color: "text-blue-400",
      tools: [
        {
          title: "CV / Resume Maker",
          description: "Premium recruitment templates with real-time PDF generation.",
          icon: <FileText size={24} />,
          href: "/tools/cv-maker",
          tag: "PRO",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "cv resume maker job recruitment pdf"
        },
        {
          title: "QR Code Architect",
          description: "Generate high-density QR codes for URLs, WiFi, and VCards.",
          icon: <QrCode size={24} />,
          href: "/tools/qr-generator",
          tag: "SaaS",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "qr code generator scan mobile"
        },
      ],
    },
    {
      name: "VISUAL ASSETS",
      icon: <ImageIcon size={16} />,
      color: "text-blue-400",
      tools: [
        {
          title: "Image Converter",
          description: "Transcode perfectly between JPG, PNG, WebP, and SVG formats.",
          icon: <ImageIcon size={24} />,
          href: "/tools/image-converter",
          tag: "NEW",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "image converter jpg png jpeg webp svg transition format"
        },
        {
          title: "Image Compactor",
          description: "Intelligent size reduction without compromising visual fidelity.",
          icon: <Sparkles size={24} />,
          href: "/tools/image-compress",
          tag: "NEURAL",
          tagColor: "bg-blue-500/10 text-blue-400",
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
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "image to pdf convert jpg png pdf creator"
        },
      ],
    },
    {
      name: "LINGUIST SUITE",
      icon: <Binary size={16} />,
      color: "text-blue-400",
      tools: [
        {
          title: "Advanced Analytics",
          description: "Comprehensive word density and readability analysis.",
          icon: <Type size={24} />,
          href: "/tools/word-counter",
          tag: "FREE",
          tagColor: "bg-blue-500/10 text-blue-400",
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
      color: "text-blue-400",
      tools: [
        {
          title: "PDF Pipeline",
          description: "Secure merging and splitting of heavy documents.",
          icon: <FileText size={24} />,
          href: "/tools/pdf-merge",
          tag: "SECURITY",
          tagColor: "bg-blue-600 text-white",
          keywords: "pdf merge split join extract"
        },
        {
          title: "PDF Optimizer",
          description: "Compress PDF archives while preserving text clarity.",
          icon: <Settings size={24} />,
          href: "/tools/pdf-compress",
          keywords: "pdf compress reduce size optimizer shrink"
        },
        {
          title: "PDF Splitter",
          description: "Extract specific pages or ranges from large PDF documents.",
          icon: <FileText size={24} />,
          href: "/tools/pdf-split",
          tag: "UTILITY",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "pdf split extract pages divide separate"
        },
        {
          title: "Universal Reader",
          description: "Secure, local viewer for PDF, Office, and Excel documents.",
          icon: <ShieldCheck size={24} />,
          href: "/tools/pdf-reader",
          tag: "LOCAL",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "pdf reader view excel word ppt office viewer"
        },
      ],
    },
    {
      name: "STUDENT SUITE",
      icon: <GraduationCap size={16} />,
      color: "text-blue-400",
      tools: [
        {
          title: "Resume Score Checker",
          description: "ATS resume analysis with scoring and improvement suggestions.",
          icon: <FileCheck size={24} />,
          href: "/tools/resume-score",
          tag: "NEW",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "resume score checker ats analysis cv improvement"
        },
        {
          title: "GPA Calculator",
          description: "Calculate semester and cumulative GPA for Pakistani universities.",
          icon: <GraduationCap size={24} />,
          href: "/tools/gpa-calculator",
          tag: "NEW",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "gpa calculator semester cgpa university grading"
        },
        {
          title: "Study Timer",
          description: "Pomodoro timer with productivity tracking and session history.",
          icon: <Timer size={24} />,
          href: "/tools/study-timer",
          tag: "NEW",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "study timer pomodoro productivity focus session tracking"
        },
        {
          title: "Goal Planner",
          description: "Set and track daily and weekly goals with progress monitoring.",
          icon: <Target size={24} />,
          href: "/tools/goal-planner",
          tag: "NEW",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "goal planner daily weekly tracker productivity"
        },
        {
          title: "Question Generator",
          description: "Random MCQs and quiz questions for exam preparation.",
          icon: <Brain size={24} />,
          href: "/tools/question-generator",
          tag: "NEW",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "question generator quiz mcq exam practice study"
        },
      ],
    },
    {
      name: "PRODUCTIVITY TOOLS",
      icon: <Settings size={16} />,
      color: "text-blue-400",
      tools: [
        {
          title: "Assignment Formatter",
          description: "Auto-format assignments and export to professional PDFs.",
          icon: <FileText size={24} />,
          href: "/tools/assignment-formatter",
          tag: "NEW",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "assignment formatter pdf export formatting title page"
        },
        {
          title: "Notes to PDF",
          description: "Convert messy notes into beautifully formatted PDF documents.",
          icon: <BookOpen size={24} />,
          href: "/tools/notes-to-pdf",
          tag: "NEW",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "notes to pdf converter formatter clean document"
        },
        {
          title: "Password Strength Checker",
          description: "Analyze password security with crack time estimation.",
          icon: <Lock size={24} />,
          href: "/tools/password-strength",
          tag: "NEW",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "password strength checker security crack time analysis"
        },
      ],
    },
    {
      name: "OFFICE SUITE",
      icon: <FileText size={16} />,
      color: "text-blue-400",
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
      color: "text-blue-400",
      tools: [
        {
          title: "SEO Meta Generator",
          description: "Generate perfectly optimized meta tags for high search rankings.",
          icon: <Globe size={24} />,
          href: "/tools/seo-meta-generator",
          tag: "SEO",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "seo meta generator tags title description keywords"
        },
        {
          title: "Robots.txt Builder",
          description: "Create secure and optimized robots.txt files for search crawlers.",
          icon: <Shield size={24} />,
          href: "/tools/robots-txt-builder",
          tag: "TECH",
          tagColor: "bg-blue-500/10 text-blue-400",
          keywords: "robots.txt builder generator seo crawler bot control"
        },
      ],
    },
  ];

  const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean);

  const filteredCategories = categories.map(cat => ({
    ...cat,
    tools: cat.tools.filter(tool => {
      if (searchTerms.length === 0) return true;
      const searchableText = `${tool.title} ${tool.description} ${tool.keywords || ""}`.toLowerCase();
      return searchTerms.some(term => 
        searchableText.split(/\s+/).some(word => 
          word.includes(term) || term.includes(word)
        )
      );
    })
  })).filter(cat => cat.tools.length > 0);

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200">
      
      {/* ══════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl mx-auto sm:mx-0">
            <Activity size={14} className="animate-pulse" />
            System Directory v10.4
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 italic">Inventory.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl font-medium leading-relaxed mb-12">
            Every module in our suite is engineered for zero-latency local execution. 
            <span className="text-slate-200 font-bold block mt-2">Isolated Runtime. Zero Surveillance. High Fidelity Output.</span>
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl group mx-auto sm:mx-0">
             <div className="absolute inset-0 bg-blue-600/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl" />
             <div className="relative flex items-center bg-white/5 border border-white/10 p-2 rounded-2xl backdrop-blur-xl group-focus-within:border-blue-500/50 transition-all">
                <div className="pl-4 pr-3 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                   <Search size={20} />
                </div>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search system capability..." 
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
          <div className="space-y-40">
            {filteredCategories.map((cat, idx) => (
              <div key={idx} className="relative animate-in fade-in slide-in-from-bottom-10 duration-700">
                <div className="flex items-center gap-6 mb-16">
                  <div className={`p-4 bg-white/5 border border-white/10 rounded-2xl text-white shadow-xl flex items-center gap-4`}>
                    <div className={cat.color}>{cat.icon}</div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">{cat.name}</span>
                  </div>
                  <div className="h-px flex-1 bg-white/5" />
                  <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">{cat.tools.length} MODULES ONLINE</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.tools.map((tool, tIdx) => (
                    <Link
                      key={tIdx}
                      href={tool.href}
                      className="group relative bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 hover:border-blue-500/30 shadow-3xl shadow-black transition-all duration-700 hover:-translate-y-4 overflow-hidden flex flex-col justify-between min-h-[320px]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-12">
                          <div className="w-16 h-16 bg-white/5 group-hover:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-white/5 group-hover:border-blue-500/20 shadow-sm transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                            {tool.icon}
                          </div>
                          {tool.tag && (
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/5 shadow-2xl ${tool.tagColor}`}>
                              {tool.tag}
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="text-3xl font-black text-white tracking-tighter leading-none group-hover:text-blue-400 transition-colors italic">
                            {tool.title}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed font-medium">
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 mt-12 flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 italic">
                        Initialize Engine <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 animate-in fade-in duration-700">
             <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-slate-600">
                <Search size={48} />
             </div>
             <h3 className="text-4xl font-black text-white tracking-tighter mb-4 italic">No matching modules detected.</h3>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Verify capability search parameters or browse registry.</p>
             <button 
               onClick={() => setSearchQuery("")}
               className="mt-12 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-500/10 transition-all italic"
             >
                Clear Registry Filter
             </button>
          </div>
        )}
      </section>

      {/* ══════════════════════════════════════
          INFRASTRUCTURE BANNER
      ══════════════════════════════════════ */}
      <section className="bg-white/5 py-40 px-6 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block p-10 bg-blue-600 rounded-[3rem] shadow-3xl shadow-blue-900/40 border border-white/10 mb-12 animate-pulse">
             <ShieldCheck size={64} className="text-white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-none italic">
            Zero-Trust <span className="text-blue-400">Architecture.</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-20">
            SamToolbox orchestrates every operation within your local browser environment. 
            Absolute data sovereignty for high-security professional workflows.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-slate-500 border-t border-white/5 pt-20">
             <div className="space-y-3">
                <span className="text-3xl font-black text-white tracking-tighter italic">RAM-SYNC</span>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">Isolated Memory</p>
             </div>
             <div className="space-y-3">
                <span className="text-3xl font-black text-white tracking-tighter italic">WASM-X</span>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">Logic Engine</p>
             </div>
             <div className="space-y-3">
                <span className="text-3xl font-black text-white tracking-tighter italic">0-SURV</span>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">Privacy Standard</p>
             </div>
             <div className="space-y-3">
                <span className="text-3xl font-black text-white tracking-tighter italic">PWA-PRO</span>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400">Local Delivery</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer Space */}
      <div className="h-40" />

    </div>
  );
}
