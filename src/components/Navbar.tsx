"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, X, ChevronDown, Layers, Scissors, Minimize2, 
  FileText, Presentation, Sheet, FileImage, RotateCw, 
  Hash, Stamp, PenTool, Lock, Unlock, FileCheck2, 
  Search, Shield, LayoutGrid, Camera, Wrench, ScanText, Sparkles
} from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [allToolsOpen, setAllToolsOpen] = useState(false);

  const convertRef = useRef<HTMLDivElement>(null);
  const allToolsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (convertRef.current && !convertRef.current.contains(event.target as Node)) {
        setConvertOpen(false);
      }
      if (allToolsRef.current && !allToolsRef.current.contains(event.target as Node)) {
        setAllToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <Logo size={34} />
          <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-slate-800 transition-colors">
            Sam<span className="text-[#e5322d]">Toolbox</span>
          </span>
        </Link>

        {/* Desktop Main Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <Link
            href="/tools/pdf-merge"
            className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#e5322d] transition-colors rounded-lg hover:bg-slate-50"
          >
            Merge PDF
          </Link>

          <Link
            href="/tools/pdf-split"
            className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#e5322d] transition-colors rounded-lg hover:bg-slate-50"
          >
            Split PDF
          </Link>

          <Link
            href="/tools/pdf-compress"
            className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#e5322d] transition-colors rounded-lg hover:bg-slate-50"
          >
            Compress PDF
          </Link>

          {/* Convert PDF Dropdown */}
          <div className="relative" ref={convertRef}>
            <button
              onClick={() => {
                setConvertOpen(!convertOpen);
                setAllToolsOpen(false);
              }}
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#e5322d] transition-colors rounded-lg hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
            >
              Convert PDF
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${convertOpen ? "rotate-180" : ""}`} />
            </button>

            {convertOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 grid grid-cols-1 gap-1 z-50">
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Convert to PDF
                </div>
                <Link
                  href="/tools/image-to-pdf"
                  onClick={() => setConvertOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#e5322d] text-xs font-semibold transition-colors"
                >
                  <FileImage className="w-4 h-4 text-amber-500" />
                  JPG to PDF
                </Link>
                <Link
                  href="/tools/word-to-pdf"
                  onClick={() => setConvertOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#e5322d] text-xs font-semibold transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-500" />
                  Word to PDF
                </Link>
                <Link
                  href="/tools/excel-to-pdf"
                  onClick={() => setConvertOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#e5322d] text-xs font-semibold transition-colors"
                >
                  <Sheet className="w-4 h-4 text-emerald-500" />
                  Excel to PDF
                </Link>
                <Link
                  href="/tools/powerpoint-to-pdf"
                  onClick={() => setConvertOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#e5322d] text-xs font-semibold transition-colors"
                >
                  <Presentation className="w-4 h-4 text-orange-500" />
                  PowerPoint to PDF
                </Link>

                <div className="border-t border-slate-100 my-1" />

                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Convert from PDF
                </div>
                <Link
                  href="/tools/pdf-to-word"
                  onClick={() => setConvertOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#e5322d] text-xs font-semibold transition-colors"
                >
                  <FileText className="w-4 h-4 text-blue-500" />
                  PDF to Word
                </Link>
                <Link
                  href="/tools/pdf-to-jpg"
                  onClick={() => setConvertOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#e5322d] text-xs font-semibold transition-colors"
                >
                  <FileImage className="w-4 h-4 text-amber-500" />
                  PDF to JPG
                </Link>
                <Link
                  href="/tools/pdf-to-excel"
                  onClick={() => setConvertOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#e5322d] text-xs font-semibold transition-colors"
                >
                  <Sheet className="w-4 h-4 text-emerald-500" />
                  PDF to Excel
                </Link>
              </div>
            )}
          </div>

          {/* All PDF Tools Mega Menu */}
          <div className="relative" ref={allToolsRef}>
            <button
              onClick={() => {
                setAllToolsOpen(!allToolsOpen);
                setConvertOpen(false);
              }}
              className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#e5322d] transition-colors rounded-lg hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
            >
              All PDF Tools
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${allToolsOpen ? "rotate-180" : ""}`} />
            </button>

            {allToolsOpen && (
              <div className="absolute top-full -left-64 mt-2 w-[980px] bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 grid grid-cols-4 gap-6 z-50">
                {/* Col 1: Organize & Optimize */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#e5322d] mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Organize PDF
                  </h4>
                  <ul className="space-y-1 text-xs">
                    <li><Link href="/tools/pdf-merge" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-600 font-medium">Merge PDF</Link></li>
                    <li><Link href="/tools/pdf-split" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-600 font-medium">Split PDF</Link></li>
                    <li><Link href="/tools/remove-pages" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-600 font-medium">Remove Pages</Link></li>
                    <li><Link href="/tools/organize-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-600 font-medium">Organize PDF</Link></li>
                    <li><Link href="/tools/scan-to-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-600 font-medium">Scan to PDF</Link></li>
                  </ul>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 mt-5 mb-3 flex items-center gap-1.5">
                    <Minimize2 className="w-3.5 h-3.5" />
                    Optimize PDF
                  </h4>
                  <ul className="space-y-1 text-xs">
                    <li><Link href="/tools/pdf-compress" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-emerald-600 text-slate-600 font-medium">Compress PDF</Link></li>
                    <li><Link href="/tools/repair-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-emerald-600 text-slate-600 font-medium">Repair PDF</Link></li>
                    <li><Link href="/tools/ocr-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-emerald-600 text-slate-600 font-medium">OCR PDF</Link></li>
                  </ul>
                </div>

                {/* Col 2: Convert */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-3 flex items-center gap-1.5">
                    <FileImage className="w-3.5 h-3.5" />
                    Convert to PDF
                  </h4>
                  <ul className="space-y-1 text-xs">
                    <li><Link href="/tools/image-to-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-amber-600 text-slate-600 font-medium">JPG to PDF</Link></li>
                    <li><Link href="/tools/word-to-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-amber-600 text-slate-600 font-medium">Word to PDF</Link></li>
                    <li><Link href="/tools/powerpoint-to-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-amber-600 text-slate-600 font-medium">PowerPoint to PDF</Link></li>
                    <li><Link href="/tools/excel-to-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-amber-600 text-slate-600 font-medium">Excel to PDF</Link></li>
                    <li><Link href="/tools/html-to-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-amber-600 text-slate-600 font-medium">HTML to PDF</Link></li>
                  </ul>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 mt-5 mb-3 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Convert from PDF
                  </h4>
                  <ul className="space-y-1 text-xs">
                    <li><Link href="/tools/pdf-to-jpg" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-blue-600 text-slate-600 font-medium">PDF to JPG</Link></li>
                    <li><Link href="/tools/pdf-to-word" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-blue-600 text-slate-600 font-medium">PDF to Word</Link></li>
                    <li><Link href="/tools/pdf-to-powerpoint" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-blue-600 text-slate-600 font-medium">PDF to PowerPoint</Link></li>
                    <li><Link href="/tools/pdf-to-excel" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-blue-600 text-slate-600 font-medium">PDF to Excel</Link></li>
                    <li><Link href="/tools/pdf-to-pdfa" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-blue-600 text-slate-600 font-medium">PDF to PDF/A</Link></li>
                  </ul>
                </div>

                {/* Col 3: Edit & Security */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3 flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5" />
                    Edit PDF
                  </h4>
                  <ul className="space-y-1 text-xs">
                    <li><Link href="/tools/rotate-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-purple-600 text-slate-600 font-medium">Rotate PDF</Link></li>
                    <li><Link href="/tools/page-numbers" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-purple-600 text-slate-600 font-medium">Add Page Numbers</Link></li>
                    <li><Link href="/tools/pdf-watermark" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-purple-600 text-slate-600 font-medium">Add Watermark</Link></li>
                    <li><Link href="/tools/edit-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-purple-600 text-slate-600 font-medium">Edit PDF</Link></li>
                    <li><Link href="/tools/redact-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-purple-600 text-slate-600 font-medium">Redact PDF</Link></li>
                  </ul>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 mt-5 mb-3 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    PDF Security
                  </h4>
                  <ul className="space-y-1 text-xs">
                    <li><Link href="/tools/unlock-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-teal-600 text-slate-600 font-medium">Unlock PDF</Link></li>
                    <li><Link href="/tools/protect-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-teal-600 text-slate-600 font-medium">Protect PDF</Link></li>
                    <li><Link href="/tools/sign-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-teal-600 text-slate-600 font-medium">Sign PDF</Link></li>
                    <li><Link href="/tools/compare-pdf" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-teal-600 text-slate-600 font-medium">Compare PDF</Link></li>
                  </ul>
                </div>

                {/* Col 4: Pakistan & Global Utilities */}
                <div className="bg-red-50/40 p-3.5 rounded-2xl border border-red-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#e5322d] mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Pakistan & Global
                  </h4>
                  <ul className="space-y-1 text-xs">
                    <li><Link href="/tools/salary-tax-calculator" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-700 font-bold">Salary Tax (FBR)</Link></li>
                    <li><Link href="/tools/merit-calculator" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-700 font-bold">University Merit</Link></li>
                    <li><Link href="/tools/marla-converter" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-700 font-bold">Marla & Land Converter</Link></li>
                    <li><Link href="/tools/zakat-calculator" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-700 font-bold">Zakat Calculator</Link></li>
                    <li><Link href="/tools/passport-photo-resizer" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-600 font-medium">Passport Photo Resizer</Link></li>
                    <li><Link href="/tools/invoice-generator" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-600 font-medium">Commercial Invoice</Link></li>
                    <li><Link href="/tools/stamp-paper-formatter" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-600 font-medium">e-Stamp Paper</Link></li>
                    <li><Link href="/tools/currency-converter" onClick={() => setAllToolsOpen(false)} className="block py-1 hover:text-[#e5322d] text-slate-600 font-medium">Currency Converter</Link></li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/tools"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#e5322d] px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            Tool Directory
          </Link>

          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            100% Free
          </span>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white z-40 overflow-y-auto p-6 border-t border-slate-200">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#e5322d] mb-3">Popular Tools</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link href="/tools/pdf-merge" onClick={() => setMobileOpen(false)} className="p-2.5 bg-slate-50 rounded-xl font-medium text-slate-800">Merge PDF</Link>
                <Link href="/tools/pdf-split" onClick={() => setMobileOpen(false)} className="p-2.5 bg-slate-50 rounded-xl font-medium text-slate-800">Split PDF</Link>
                <Link href="/tools/pdf-compress" onClick={() => setMobileOpen(false)} className="p-2.5 bg-slate-50 rounded-xl font-medium text-slate-800">Compress PDF</Link>
                <Link href="/tools/image-to-pdf" onClick={() => setMobileOpen(false)} className="p-2.5 bg-slate-50 rounded-xl font-medium text-slate-800">JPG to PDF</Link>
                <Link href="/tools/pdf-to-word" onClick={() => setMobileOpen(false)} className="p-2.5 bg-slate-50 rounded-xl font-medium text-slate-800">PDF to Word</Link>
                <Link href="/tools/sign-pdf" onClick={() => setMobileOpen(false)} className="p-2.5 bg-slate-50 rounded-xl font-medium text-slate-800">Sign PDF</Link>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">All Tools</h4>
              <Link 
                href="/tools" 
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 bg-[#e5322d] text-white font-bold rounded-xl flex items-center justify-center gap-2"
              >
                View All 26+ PDF Tools
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
