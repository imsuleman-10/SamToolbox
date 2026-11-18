"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, Layers, Scissors, Minimize2, FileText, Presentation, 
  Sheet, FileImage, RotateCw, Hash, Stamp, PenTool, Lock, 
  Unlock, FileCheck2, ArrowRight, ShieldCheck, Sparkles, 
  CheckCircle2, Camera, Wrench, ScanText, Trash2, LayoutGrid,
  FileCode, FileSpreadsheet, Archive, EyeOff, GitCompare, Code,
  Calculator, GraduationCap, Building2, Heart, DollarSign,
  Binary, Globe, Key, Cpu, QrCode, Terminal, HelpCircle,
  ExternalLink, Check, Zap, Shield, BookOpen
} from "lucide-react";
import { ALL_TOOLS, CATEGORIES, ToolItem } from "@/lib/allToolsList";

// Icon mapping helper
function renderToolIcon(iconName: string, color: string) {
  const iconProps = { className: "w-6 h-6" };
  
  let colorClasses = "bg-red-50 text-[#e5322d]";
  if (color === "emerald") colorClasses = "bg-emerald-50 text-emerald-600";
  if (color === "amber") colorClasses = "bg-amber-50 text-amber-600";
  if (color === "blue") colorClasses = "bg-blue-50 text-blue-600";
  if (color === "purple") colorClasses = "bg-purple-50 text-purple-600";
  if (color === "teal") colorClasses = "bg-teal-50 text-teal-600";

  let IconComp = Layers;
  if (iconName === "Scissors") IconComp = Scissors;
  if (iconName === "Trash2") IconComp = Trash2;
  if (iconName === "LayoutGrid") IconComp = LayoutGrid;
  if (iconName === "Camera") IconComp = Camera;
  if (iconName === "Minimize2") IconComp = Minimize2;
  if (iconName === "Wrench") IconComp = Wrench;
  if (iconName === "ScanText") IconComp = ScanText;
  if (iconName === "Image") IconComp = FileImage;
  if (iconName === "FileText") IconComp = FileText;
  if (iconName === "Presentation") IconComp = Presentation;
  if (iconName === "Sheet") IconComp = Sheet;
  if (iconName === "Code") IconComp = Code;
  if (iconName === "FileImage") IconComp = FileImage;
  if (iconName === "FileCode") IconComp = FileCode;
  if (iconName === "FileSpreadsheet") IconComp = FileSpreadsheet;
  if (iconName === "Table") IconComp = Sheet;
  if (iconName === "Archive") IconComp = Archive;
  if (iconName === "RotateCw") IconComp = RotateCw;
  if (iconName === "Hash") IconComp = Hash;
  if (iconName === "Stamp") IconComp = Stamp;
  if (iconName === "PenTool") IconComp = PenTool;
  if (iconName === "EyeOff") IconComp = EyeOff;
  if (iconName === "Unlock") IconComp = Unlock;
  if (iconName === "Lock") IconComp = Lock;
  if (iconName === "FileCheck2") IconComp = FileCheck2;
  if (iconName === "GitCompare") IconComp = GitCompare;
  if (iconName === "Calculator") IconComp = Calculator;
  if (iconName === "GraduationCap") IconComp = GraduationCap;
  if (iconName === "Building2") IconComp = Building2;
  if (iconName === "Heart") IconComp = Heart;
  if (iconName === "DollarSign") IconComp = DollarSign;
  if (iconName === "Binary") IconComp = Binary;
  if (iconName === "Globe") IconComp = Globe;
  if (iconName === "Key") IconComp = Key;
  if (iconName === "Cpu") IconComp = Cpu;
  if (iconName === "QrCode") IconComp = QrCode;
  if (iconName === "Terminal") IconComp = Terminal;

  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mb-4 transition-transform group-hover:scale-110 ${colorClasses}`}>
      <IconComp {...iconProps} />
    </div>
  );
}

// Group tools by primary domain for the crawler directory
const DIRECTORY_GROUPS = [
  {
    title: "PDF Manipulation & Conversion Suite",
    desc: "Merge, split, compress, edit, convert, and sign PDF documents locally in your browser with zero server uploads.",
    tools: ALL_TOOLS.filter(t => t.id.includes("pdf") || ["remove-pages", "organize-pdf", "page-numbers", "rotate-pdf"].includes(t.id)),
  },
  {
    title: "Developer & Engineering Utilities",
    desc: "Format JSON, encode Base64, debug JWTs, generate hashes, test regular expressions, and optimize code in real time.",
    tools: ALL_TOOLS.filter(t => ["json-formatter", "base64-encoder", "url-encoder", "jwt-decoder", "hash-generator", "diff-checker", "regex-tester", "markdown-to-html", "css-minifier", "html-minifier", "csv-to-json", "cron-generator", "slug-generator", "barcode-generator", "qr-generator", "robots-txt-builder", "seo-meta-generator", "lorem-ipsum-generator"].includes(t.id)),
  },
  {
    title: "Calculators & Financial Engines",
    desc: "FBR Pakistan salary tax calculators, Zakat Nisab estimators, compound interest, loan EMI, BMI, and academic GPA systems.",
    tools: ALL_TOOLS.filter(t => ["salary-tax-calculator", "zakat-calculator", "compound-interest", "loan-calculator", "percentage-calculator", "bmi-calculator", "age-calculator", "merit-calculator", "gpa-calculator", "invoice-generator"].includes(t.id)),
  },
  {
    title: "Converters & Smart Generators",
    desc: "Live currency rates, physical unit converters, world time zone calculators, Marla land units, and multimedia utilities.",
    tools: ALL_TOOLS.filter(t => ["currency-converter", "unit-converter", "time-zone-converter", "marla-converter", "aspect-ratio-calculator", "color-picker", "font-generator", "svg-to-png", "case-converter", "word-counter", "password-generator", "password-strength", "morse-code-translator", "image-compress", "image-converter", "image-resize"].includes(t.id)),
  },
  {
    title: "Academic, Career & Regional Tools",
    desc: "Professional ATS-friendly CV makers, assignment formatters, notes converters, study Pomodoro timers, and FPSC/NADRA photo resizers.",
    tools: ALL_TOOLS.filter(t => ["cv-maker", "assignment-formatter", "notes-to-pdf", "study-timer", "passport-photo-resizer", "stamp-paper-formatter", "resume-score", "question-generator", "goal-planner", "word-reader", "excel-reader", "ppt-reader"].includes(t.id)),
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesSearch = 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "all" || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="bg-[#f8fafc] text-slate-800">
      {/* ── HERO SECTION (iLovePDF Standard) ── */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          100% Free & Unlimited In-Browser Productivity Tools
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          84+ Free Online Tools — PDF, Developer &amp; Productivity Suite
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Every essential utility in one unified suite: merge, compress, and convert PDFs, format JSON, encode Base64, generate QR codes, compute FBR salary taxes, calculate Zakat, resize passport photos, and convert units. <strong>100% free, 100% private in-browser execution with zero server uploads.</strong>
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 84+ tools (e.g. merge, json, compress, salary tax, base64, qr)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#e5322d] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#e5322d] text-white shadow-md shadow-red-500/20"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── TOOL CARDS GRID (Live Filtered) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Showing {filteredTools.length} of {ALL_TOOLS.length} Tools
          </p>
          <a href="#complete-directory" className="text-xs font-bold text-[#e5322d] hover:underline flex items-center gap-1">
            Browse Full Crawler Directory <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {filteredTools.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-slate-200">
            <p className="text-slate-500 text-sm mb-3">No tools found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs font-bold text-[#e5322d] hover:underline cursor-pointer"
            >
              Reset search filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href || `/tools/${tool.id}`}
                className="tool-card group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 relative overflow-hidden transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {renderToolIcon(tool.icon, tool.color)}
                    {tool.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-[#e5322d]">
                        {tool.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#e5322d] transition-colors mb-2">
                    {tool.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal line-clamp-3">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#e5322d] transition-colors">
                  <span>Open tool</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── ALL 84 TOOLS CRAWLER DIRECTORY (Googlebot Complete Link Mesh) ── */}
      <section id="complete-directory" className="bg-slate-100/70 border-y border-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-[11px] font-bold uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5" />
              Complete Production Tools Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
              Explore All 84 Online Tools — Direct Permanent Links
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every tool route is independently server-side rendered, zero-upload private, and accessible directly. Click any link below to launch the dedicated workstation.
            </p>
          </div>

          <div className="space-y-12">
            {DIRECTORY_GROUPS.map((group, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#e5322d]" />
                    {group.title}
                    <span className="text-xs font-semibold text-slate-400 ml-1">({group.tools.length} Tools)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{group.desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group.tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.id}`}
                      className="group/link flex flex-col p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                    >
                      <span className="text-sm font-bold text-slate-800 group-hover/link:text-[#e5322d] transition-colors flex items-center justify-between">
                        {tool.title}
                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover/link:text-[#e5322d] group-hover/link:translate-x-0.5 transition-all" />
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-normal">
                        {tool.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST & INDUSTRIAL ZERO-UPLOAD STANDARDS SECTION ── */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Enterprise Privacy &amp; Zero-Upload Security Architecture
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Unlike legacy online converters that secretly upload your sensitive PDFs and confidential data to remote cloud servers, SamToolbox executes 100% of operations locally inside your web browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100% Client-Side Privacy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your documents, files, and credentials never touch a remote server. Execution occurs strictly in your device RAM via WebAssembly and Web Crypto APIs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#e5322d] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Instant Zero-Queue Speed</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No file upload wait times, server timeouts, or bandwidth bottlenecks. Conversions complete in milliseconds at native hardware speed.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">ISO Compliant Standards</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generates strict ISO-32000 compliant PDF structures, valid RFC-7519 JWT representations, and compliant QR code encodings recognized globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GEO, AEO & LLMO HIGH-DENSITY KNOWLEDGE BASE ── */}
      <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-3 inline-block">
              Frequently Asked Questions &amp; Technical Insights
            </span>
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Answers for Search Engines, AI Overviews &amp; Enterprise Users
            </h2>
            <p className="text-sm text-slate-600">
              Concise, factual specifications designed for Google AI Overviews, ChatGPT Search, Microsoft Copilot, Perplexity, and human developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#e5322d] shrink-0 mt-0.5" />
                What makes SamToolbox different from iLovePDF or Smallpdf?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                Unlike iLovePDF or Smallpdf, which transmit user documents to cloud servers, SamToolbox operates <strong>100% in-browser</strong>. Using client-side WebAssembly, Canvas, and Web Cryptography, files remain strictly inside user RAM, ensuring zero data leakage, complete GDPR compliance, and zero server upload wait times.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#e5322d] shrink-0 mt-0.5" />
                Are all 84+ online tools completely free with no restrictions?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                Yes. Every single tool on SamToolbox is 100% free with unlimited usage. There are no hourly task quotas, no hidden paywalls, no file size throttles, and no account registration or credit card requirements.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#e5322d] shrink-0 mt-0.5" />
                Which countries and regional standards does SamToolbox support?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                SamToolbox supports global audiences including the United States, United Kingdom, Canada, Australia, European Union, Pakistan, India, UAE, and Saudi Arabia. It includes specialized utilities like FBR Pakistan Salary Tax 2024–2026, Zakat Nisab calculators, Pakistani Marla/Kanal land converters, and international ISO-3166 passport photo standards.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2">
                <HelpCircle className="w-5 h-5 text-[#e5322d] shrink-0 mt-0.5" />
                What developer utilities are provided on the platform?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">
                Developer tools include a JSON Formatter &amp; Validator, Base64 String/File Encoder &amp; Decoder, URL Encoder, JWT Token Decoder, MD5/SHA-256 Hash Generator, Text Diff Checker, Regex Tester, CSV-to-JSON Converter, CSS/HTML Minifiers, and Robots.txt Builders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTHOR & FOUNDER CITATION (E-E-A-T ENTITY BOOST) ── */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-red-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/suleman-main.jpeg" 
              alt="Suleman Zaheer - Architect of SamToolbox" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-base font-bold text-slate-900">
              Architected &amp; Maintained by <Link href="/suleman-zaheer" className="text-[#e5322d] hover:underline">Suleman Zaheer</Link>
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Full-Stack Software Engineer, Founder of SAMStack Tech, and Principal Architect of SamToolbox. Dedicated to building hyper-fast, privacy-first web utilities with zero cloud tracking. Read full biography, software architecture thesis, and verified publications on his <Link href="/suleman-zaheer" className="text-[#2563eb] hover:underline font-semibold">Authoritative Entity Profile</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
