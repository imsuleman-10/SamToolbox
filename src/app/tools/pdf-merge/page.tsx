"use client";

import { useState, useRef, useMemo } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, Trash2, FileText, ChevronUp, ChevronDown, RefreshCw, Layout, BookOpen, HelpCircle, ShieldCheck, Zap, Terminal } from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function PdfMergePage() {
  const [files, setFiles] = useState<{ file: File; id: string }[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("pdf-merge", "Industrial-grade PDF synthesis engine with local-only processing and multi-asset merging capabilities."), []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        id: Math.random().toString(36).substring(7)
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles(prev => {
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles(prev => {
      const copy = [...prev];
      [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
      return copy;
    });
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      return;
    }
    
    setIsMerging(true);
    
    try {
      const mergedPdf = await PDFDocument.create();

      for (const { file } of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `merged-document-${new Date().getTime()}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("System Conflict: Unable to synthesize PDF assets. Ensure files are not encrypted.");
    } finally {
      setIsMerging(false);
    }
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
            <Layout size={14} className="animate-pulse" />
            Document Synthesis v11.4
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 italic">Synthesizer.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Multi-document vector merging. 
            <span className="text-slate-200 font-bold block mt-2">Local Binary Fusion. Zero Cloud Trace. High-Fidelity Output.</span>
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
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Fusion Workspace</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Ready for synthesis</p>
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
                    multiple
                    className="hidden"
                  />
               </div>

               <div className="p-10">
                  {files.length === 0 ? (
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
                    <div className="space-y-4 animate-in zoom-in-95 duration-500">
                       {files.map((f, i) => (
                         <div key={f.id} className="bg-white/5 border border-white/5 rounded-[1.5rem] p-6 flex items-center justify-between group hover:border-rose-500/20 transition-all">
                            <div className="flex items-center gap-6 min-w-0">
                               <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-rose-400 font-black text-xs shrink-0 border border-white/5">
                                  {i + 1}
                               </div>
                               <div className="min-w-0">
                                  <p className="text-white font-black truncate max-w-[200px] md:max-w-md text-sm uppercase tracking-tight">{f.file.name}</p>
                                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1 italic">{(f.file.size / 1024 / 1024).toFixed(2)} MB</p>
                               </div>
                            </div>

                            <div className="flex items-center gap-2">
                               <div className="flex flex-col gap-1 mr-4">
                                  <button onClick={() => moveUp(i)} className="p-1 text-slate-600 hover:text-rose-400 transition-colors disabled:opacity-0" disabled={i === 0}>
                                     <ChevronUp size={18} />
                                  </button>
                                  <button onClick={() => moveDown(i)} className="p-1 text-slate-600 hover:text-rose-400 transition-colors disabled:opacity-0" disabled={i === files.length - 1}>
                                     <ChevronDown size={18} />
                                  </button>
                               </div>
                               <button 
                                 onClick={() => removeFile(f.id)}
                                 className="p-3 bg-rose-600/10 text-rose-400 rounded-xl hover:bg-rose-600/20 transition-all border border-rose-500/10"
                               >
                                  <Trash2 size={16} />
                               </button>
                            </div>
                         </div>
                       ))}

                       <div className="pt-10 border-t border-white/5 mt-10">
                          <button 
                            onClick={mergePDFs}
                            disabled={isMerging || files.length < 2}
                            className="w-full py-6 bg-rose-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-rose-500 transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-30"
                          >
                            {isMerging ? <RefreshCw className="animate-spin" size={20} /> : <><Zap size={20} /> Execute Synthesis</>}
                          </button>
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
                    <Download size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Status</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Vector Count</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">{files.length} Assets</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Execution</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Local Binary</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-rose-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                     Synthesizer Active
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-rose-600 to-orange-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-rose-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-rose-100 font-medium text-sm leading-relaxed">
                  Document synthesis is executed strictly via local hardware processing. No document bitstreams are authorized for cloud transmission.
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
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Synthesis <span className="text-rose-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Vector Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is there a file count limit?", a: "Negative. The synthesizer can map dozens of documents; however, workstation RAM determines the maximum bitstream capacity." },
                  { q: "Encrypted PDF Support?", a: "The engine requires raw bitstream access. Encrypted assets must be unlocked locally prior to synthesis." },
                  { q: "Metadata Preservation?", a: "Standard page vectors are mapped directly. Deep document metadata may be normalized during the fusion process." }
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
                    For optimal synthesis of high-density documents, ensure all 
                    assets share identical page orientation vectors.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">FUSE</div>
                        <div className="text-[10px] font-bold text-rose-400 uppercase tracking-[0.3em]">Sync Logic</div>
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
