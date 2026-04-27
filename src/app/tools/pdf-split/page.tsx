"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, RefreshCw, FileText, BookOpen, HelpCircle } from "lucide-react";

export default function PdfSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [range, setRange] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setRange("");
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setPageCount(pdf.getPageCount());
      } catch (err) {
        console.error(err);
        alert("Failed to load PDF. It might be password protected.");
        setFile(null);
      }
    }
  };

  const splitPDF = async () => {
    if (!file || !range) return;
    setIsProcessing(true);
    
    try {
      const pagesToExtract = parseRange(range, pageCount);
      if (pagesToExtract.length === 0) {
        alert("Invalid page range.");
        setIsProcessing(false);
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(originalPdf, pagesToExtract.map(p => p - 1));
      copiedPages.forEach((page) => {
        newPdf.addPage(page);
      });

      const pageBytes = await newPdf.save();
      const blob = new Blob([pageBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `split-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to split PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper to parse "1, 3-5, 8" into [1, 3, 4, 5, 8]
  const parseRange = (input: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(",").map(p => p.trim());
    
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(n => parseInt(n));
        if (start && end && start <= end && start >= 1 && end <= maxPages) {
          for (let i = start; i <= end; i++) pages.add(i);
        }
      } else {
        const page = parseInt(part);
        if (page && page >= 1 && page <= maxPages) {
          pages.add(page);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6">
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-red-100">
          <FileText size={12} />
          <span>Local Extraction Engine</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          PDF <span className="text-red-600">Split</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Extract specific pages or ranges with surgical precision. 
          <span className="text-slate-900 font-semibold block sm:inline"> Instant local splitting. Your document never leaves your machine.</span>
        </p>
      </div>

      <div className="bg-white p-4 sm:p-10 rounded-[1.5rem] sm:rounded-3xl shadow-2xl border border-slate-100 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-110 transition-transform duration-700" />
        
        {!file ? (
          <div 
            className="border-2 border-dashed border-slate-200 rounded-2xl p-8 sm:p-16 text-center hover:border-red-300 hover:bg-red-50/30 transition-all cursor-pointer group relative z-10"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">Select PDF</h3>
            <p className="text-sm text-slate-500">Privacy-First Page Extraction</p>
          </div>
        ) : (
          <div className="space-y-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 bg-white text-red-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <FileText size={24} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-800 truncate text-sm sm:text-base">{file.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{pageCount} Pages Available</p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setPageCount(0); }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
              >
                Reset
              </button>
            </div>

            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
                Page Selection Range
              </label>
              <input 
                type="text" 
                value={range} 
                onChange={(e) => setRange(e.target.value)}
                placeholder="e.g. 1, 3-5, 8"
                className="w-full px-5 py-4 rounded-xl bg-white border-2 border-slate-100 focus:border-red-500/30 focus:ring-4 focus:ring-red-500/5 outline-none transition-all text-slate-700 font-bold placeholder:text-slate-300"
              />
              <p className="text-[10px] text-slate-400 mt-3 font-medium">Use commas for individual pages and hyphens for ranges.</p>
            </div>

            <button
              onClick={splitPDF}
              disabled={isProcessing || !range}
              className="w-full py-4 sm:py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isProcessing ? <RefreshCw className="animate-spin" /> : <><Download size={18} /> Forge Extracted PDF</>}
            </button>
          </div>
        )}
        <input 
          type="file" 
          accept="application/pdf" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
      </div>
    </div>

      {/* Information Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-xl text-red-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Extraction Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Document Ingestion", desc: "Upload your master PDF. Our local engine analyzes the page tree to identify extraction indices." },
              { step: "02", title: "Range Definition", desc: "Specify individual pages (1, 3, 5) or continuous ranges (10-15) using standard syntax." },
              { step: "03", title: "Precision Split", desc: "The system isolates the specified page objects and re-compiles them into a new document container." },
              { step: "04", title: "Secure Retrieval", desc: "Save the extracted file. Your master document remains untouched in your local memory." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-red-100 transition-colors duration-300">{item.step}</span>
                <div className="space-y-1">
                  <h3 className="font-black text-slate-800 uppercase tracking-wide text-sm">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-900 rounded-xl text-white">
              <HelpCircle size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Splitting FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How do I use the range syntax?", a: "Enter page numbers separated by commas for individual pages, or use a hyphen for a range (e.g., '1, 3, 5-10')." },
              { q: "Can I split encrypted files?", a: "No. For security, files with active passwords must be decrypted before our browser-based engine can access them." },
              { q: "Is original quality preserved?", a: "Yes. We use direct object cloning, ensuring that text, vectors, and high-res images remain identical to the source." },
              { q: "Is the splitting done online?", a: "No. All processing is 100% local. Your data never leaves your system, ensuring total privacy for sensitive files." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {faq.q}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
