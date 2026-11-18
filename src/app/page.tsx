"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, Layers, Scissors, Minimize2, FileText, Presentation, 
  Sheet, FileImage, RotateCw, Hash, Stamp, PenTool, Lock, 
  Unlock, FileCheck2, ArrowRight, ShieldCheck, Sparkles, 
  CheckCircle2, Camera, Wrench, ScanText, Trash2, LayoutGrid,
  FileCode, FileSpreadsheet, Archive, EyeOff, GitCompare, Code,
  Calculator, GraduationCap, Building2, Heart, DollarSign
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

  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mb-4 transition-transform group-hover:scale-110 ${colorClasses}`}>
      <IconComp {...iconProps} />
    </div>
  );
}

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchesSearch = 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
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
          100% Free & Unlimited Client-Side Tools
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          84+ Free Online Tools — PDF, Developer & Productivity Suite
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Everything you need in one place — merge, compress and convert PDFs, format JSON, encode Base64, generate QR codes, check diffs, convert units, and 80+ more tools. 100% FREE, in-browser, zero uploads, zero sign-up.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g. merge, compress, word, sign)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#e5322d] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
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

      {/* ── TOOL CARDS GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredTools.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-slate-200">
            <p className="text-slate-500 text-sm mb-3">No tools found matching &quot;{searchQuery}&quot;</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs font-bold text-[#e5322d] hover:underline"
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
                className="tool-card group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 relative overflow-hidden"
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

                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
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

      {/* ── TRUST & INDUSTRIAL STANDARDS SECTION ── */}
      <section className="bg-white border-y border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              The PDF software designed for speed and complete privacy
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Unlike other online converters that upload your confidential documents to unknown remote cloud servers, SamToolbox processes 100% of your files locally in your web browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">100% Private & Secure</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your files never leave your computer. Everything happens inside your browser session using high-performance WebAssembly and JavaScript engines.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#e5322d] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Zero Latency</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Skip long upload and download queues. Documents are processed instantly at native device speed, saving you time and bandwidth.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">International Standards</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Engineered to produce ISO-compliant PDF specifications compatible with Adobe Acrobat Reader, Preview, Chrome, and professional print workflows.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
