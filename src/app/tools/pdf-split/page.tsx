"use client";

import { useState, useRef, useMemo } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, RefreshCw, FileText, BookOpen, HelpCircle, ShieldCheck, Zap, Terminal, Scissors, X } from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function PdfSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [range, setRange] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("pdf-split", "Precision PDF page extraction engine with local-only parsing and zero cloud telemetry."), []);

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
        alert("System Breach: Unable to decrypt PDF architecture. Ensure file is not password protected.");
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
        alert("Invalid Extraction Coordinates.");
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
      a.download = `extracted-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Extraction Failure: Critical system error during asset synthesis.");
    } finally {
      setIsProcessing(false);
    }
  };

  const parseRange = (rangeStr: string, totalPages: number): number[] => {
    const pages = new Set<number>();
    const ranges = rangeStr.split(",").map((r) => r.trim());

    ranges.forEach((range) => {
      if (range.includes("-")) {
        const [start, end] = range.split("-").map((num) => parseInt(num));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) {
            if (i > 0 && i <= totalPages) pages.add(i);
          }
        }
      } else {
        const page = parseInt(range);
        if (!isNaN(page) && page > 0 && page <= totalPages) {
          pages.add(page);
        }
      }
    });

    return Array.from(pages).sort((a, b) => a - b);
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-rose-500/30 selection:text-rose-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Scissors size={14} className="animate-pulse" />
            Page Extraction v10.2
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400 italic">Splitter.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Precision page vector isolation. 
            <span className="text-slate-200 font-bold block mt-2">Local Binary Decoupling. Zero Data Leakage. Instant Extraction.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Workspace */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400">
                        <Terminal size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Extraction Core</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Ready for decoupling</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-4 bg-rose-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 transition-all flex items-center gap-3 shadow-xl"
                  >
                    <Upload size={16} /> Inject PDF
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="application/pdf"
                    className="hidden"
                  />
               </div>

               <div className="p-10">
                  {!file ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/5 rounded-[2.5rem] py-32 flex flex-col items-center justify-center group cursor-pointer hover:border-rose-500/30 transition-all hover:bg-rose-500/[0.02]"
                    >
                       <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-500 group-hover:text-rose-400 group-hover:scale-110 transition-all duration-500 mb-6">
                          <FileText size={40} />
                       </div>
                       <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">Awaiting Asset Injection</p>
                    </div>
                  ) : (
                    <div className="space-y-10 animate-in zoom-in-95 duration-500">
                       <div className="flex flex-col md:flex-row gap-10 items-center">
                          <div className="w-full md:w-1/2 aspect-video bg-black/40 rounded-[2.5rem] overflow-hidden border border-white/5 relative group flex items-center justify-center">
                             <div className="text-center p-8">
                                <FileText size={80} className="text-rose-500/20 mx-auto mb-6" />
                                <p className="text-white font-black truncate max-w-[250px] text-sm uppercase tracking-tight">{file.name}</p>
                                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-2">{pageCount} Pages Loaded</p>
                             </div>
                             <button 
                               onClick={() => { setFile(null); setPageCount(0); }}
                               className="absolute top-8 right-8 bg-rose-600/20 text-rose-400 p-2 rounded-xl border border-rose-500/20 hover:bg-rose-600/40 transition-all"
                             >
                                <X size={16} />
                             </button>
                          </div>

                          <div className="w-full md:w-1/2 space-y-8">
                             <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                                <div className="flex items-center gap-3">
                                   <Scissors size={18} className="text-rose-400" />
                                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Extraction Vector</span>
                                </div>
                                
                                <div className="space-y-4">
                                   <input 
                                     value={range}
                                     onChange={e => setRange(e.target.value)}
                                     placeholder="e.g. 1-5, 8, 11-14"
                                     className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-white font-bold outline-none focus:border-rose-500/30 transition-all text-sm uppercase tracking-widest"
                                   />
                                   <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-2 italic">
                                      Use commas for lists and hyphens for ranges.
                                   </p>
                                </div>
                             </div>

                             <button 
                               onClick={splitPDF}
                               disabled={isProcessing || !range}
                               className="w-full py-6 bg-rose-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-rose-500 transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-30"
                             >
                               {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <><Download size={20} /> Extract Selection</>}
                             </button>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400">
                    <FileText size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Status</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Vector Mode</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Page-Level</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Latency</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Zero</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-rose-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                     Splitter Active
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-rose-600 to-red-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-rose-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-rose-100 font-medium text-sm leading-relaxed">
                  Every extraction cycle is executed strictly within your browser's local sandbox. No document bitstreams are authorized for cloud transmission.
               </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            DOCUMENTATION & FAQ
        ══════════════════════════════════════════ */}
        <div className="mt-40 border-t border-slate-800 pt-40">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-rose-500/10 rounded-[1.5rem] flex items-center justify-center text-rose-400 border border-rose-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Extraction <span className="text-rose-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Vector Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is there a page limit?", a: "Negative. The extraction core can decouple any number of pages; however, system hardware determines processing speed for high-density assets." },
                  { q: "Encrypted asset support?", a: "The splitter requires direct bitstream access. Encrypted documents must be unlocked locally prior to extraction." },
                  { q: "Output Fidelity?", a: "Absolute. Extracted page vectors are mapped directly to a new PDF container, maintaining original resolution and object data." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-rose-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-rose-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(225,29,72,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-rose-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    For high-speed workflow, utilize the range notation (e.g., 1-10) 
                    to decouple large document segments in a single execution.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">1:1</div>
                        <div className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.3em]">Mapping Logic</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
