"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Search, ArrowRight, Sparkles
} from "lucide-react";
import { ALL_TOOLS, CATEGORIES } from "@/lib/allToolsList";

export default function ToolsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredAll = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      const matchSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat =
        activeCategory === "all" ||
        tool.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#e5322d] rounded-full text-xs font-bold mb-4 border border-red-100">
          <Sparkles className="w-3.5 h-3.5" />
          Complete 84+ Tools Index
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
          All Online PDF &amp; Productivity Tools
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explore our complete collection of fast, private, and 100% free browser tools. Everything runs locally on your device with no file uploads.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all 84+ tools (e.g. merge, compress, json, tax)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#e5322d]"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#e5322d] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredAll.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href || `/tools/${tool.id}`}
            className="tool-card group bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {tool.categoryLabel}
                </span>
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
              <span>Use tool</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
