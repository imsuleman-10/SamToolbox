"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { 
  BookOpen, Download, Type, AlignLeft, Settings, 
  Sparkles, ShieldCheck, Zap, HelpCircle, 
  ArrowRight, ArrowLeft, User, FileText, 
  Check, LayoutTemplate, FileDown,
  RefreshCw, Terminal, PencilLine
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

type StepType = "setup" | "content" | "preview";
type FontType = "helvetica" | "times" | "courier";

interface DocumentData {
  title: string;
  author: string;
  subject: string;
  content: string;
  fontSize: number;
  fontFamily: FontType;
}

export default function NotesToPdfPage() {
  const [step, setStep] = useState<StepType>("setup");
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.5);
  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<DocumentData>({
    title: "System Synchronization Notes",
    author: "Suleman Mughal",
    subject: "Industrial Computing",
    content: "This document outlines the core protocols for distributed asset synchronization.\n\nKey Observations:\n1. Edge-side processing reduces network overhead by 40%.\n2. Local state management ensures 100% availability during network outages.\n3. Zero-latency feedback loops are critical for industrial automation.\n\nImplementation Strategy:\nWe will leverage the SAMToolBox orchestration layer to handle all browser-side computations, ensuring maximum data sovereignty.",
    fontSize: 12,
    fontFamily: "helvetica",
  });

  const schema = useMemo(() => generateSoftwareApplicationSchema("notes-to-pdf", "Professional notes transcription engine with paper-inspired UI and high-fidelity PDF rendering."), []);

  useEffect(() => {
    if (step !== "preview") return;
    const updateScale = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const targetWidth = 794; 
      const newScale = (containerWidth - 64) / targetWidth;
      setPreviewScale(Math.min(newScale, 1));
    };

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    updateScale();
    return () => observer.disconnect();
  }, [step]);

  const getCanvasData = async () => {
    const { toCanvas } = await import("html-to-image");
    const previewElement = document.getElementById("notes-render");
    if (!previewElement) return null;
    return await toCanvas(previewElement, {
      pixelRatio: 3,
      backgroundColor: "#ffffff",
    });
  };

  const generatePDF = async () => {
    setIsProcessing(true);
    try {
      const canvas = await getCanvasData();
      if (!canvas) return;
      const { jsPDF } = await import("jspdf");
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.title.slice(0, 20) || "Notes"}.pdf`);
    } catch (e) {
      console.error(e);
      alert("System Conflict: Unable to forge document container.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-indigo-500/30 selection:text-indigo-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Zap size={14} className="animate-pulse" />
            Transcription Engine v14.2
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Notes <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic">Synthesizer.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Professional high-fidelity PDF forge. 
            <span className="text-slate-200 font-bold block mt-2">Zero-Cloud Persistence. Client-Side Rendering. Pure Sovereign Logic.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Editor Workspace */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                        <Terminal size={22} className="text-indigo-400" />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Input Buffer</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Step {step === "setup" ? "01" : step === "content" ? "02" : "03"} of 03</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     {["setup", "content", "preview"].map((s, i) => (
                       <div key={s} className={`w-3 h-3 rounded-full transition-all ${step === s ? "bg-indigo-500 w-8" : "bg-white/10"}`} />
                     ))}
                  </div>
               </div>

               <div className="p-10 min-h-[500px]">
                  {step === "setup" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Author Identity</label>
                             <div className="relative group">
                                <User size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                                <input 
                                  value={data.author} 
                                  onChange={e => setData({...data, author: e.target.value})}
                                  placeholder="SYSTEM OPERATOR"
                                  className="w-full pl-16 pr-8 py-5 bg-black/40 border border-white/5 rounded-2xl focus:border-indigo-500/30 outline-none text-white font-bold transition-all"
                                />
                             </div>
                          </div>
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Subject Vector</label>
                             <div className="relative group">
                                <AlignLeft size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                                <input 
                                  value={data.subject} 
                                  onChange={e => setData({...data, subject: e.target.value})}
                                  placeholder="INDUSTRIAL PROTOCOL"
                                  className="w-full pl-16 pr-8 py-5 bg-black/40 border border-white/5 rounded-2xl focus:border-indigo-500/30 outline-none text-white font-bold transition-all"
                                />
                             </div>
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Document Designation</label>
                          <div className="relative group">
                             <FileText size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                             <input 
                               value={data.title} 
                               onChange={e => setData({...data, title: e.target.value})}
                               placeholder="PROTOCOL_V2.PDF"
                               className="w-full pl-16 pr-8 py-5 bg-black/40 border border-white/5 rounded-2xl focus:border-indigo-500/30 outline-none text-white font-bold transition-all"
                             />
                          </div>
                       </div>
                       <div className="grid md:grid-cols-2 gap-8 pt-8">
                          <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                             <div className="flex items-center gap-3">
                                <Type size={18} className="text-indigo-400" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Typeface Array</span>
                             </div>
                             <div className="grid grid-cols-3 gap-3">
                                {(["helvetica", "times", "courier"] as FontType[]).map(f => (
                                  <button
                                    key={f}
                                    onClick={() => setData({...data, fontFamily: f})}
                                    className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${data.fontFamily === f ? "bg-indigo-600 text-white shadow-lg" : "bg-white/5 text-slate-500 hover:text-white"}`}
                                  >
                                    {f}
                                  </button>
                                ))}
                             </div>
                          </div>
                          <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                   <Settings size={18} className="text-indigo-400" />
                                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Glyph Density</span>
                                </div>
                                <span className="text-indigo-400 font-black italic">{data.fontSize}PT</span>
                             </div>
                             <input 
                               type="range" min="8" max="24" step="1"
                               value={data.fontSize}
                               onChange={e => setData({...data, fontSize: parseInt(e.target.value)})}
                               className="w-full accent-indigo-500"
                             />
                          </div>
                       </div>
                    </div>
                  )}

                  {step === "content" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 flex items-center gap-2">
                          <PencilLine size={14} className="text-indigo-400" />
                          Data Stream
                       </label>
                       <textarea 
                         value={data.content}
                         onChange={e => setData({...data, content: e.target.value})}
                         className="w-full h-[400px] p-10 bg-black/40 border border-white/5 rounded-[2.5rem] focus:border-indigo-500/30 outline-none text-white font-medium leading-relaxed resize-none scrollbar-hide"
                         placeholder="Incorporate your industrial intelligence here..."
                       />
                    </div>
                  )}

                  {step === "preview" && (
                    <div className="flex flex-col items-center animate-in zoom-in-95 duration-500" ref={containerRef}>
                       <div 
                         id="notes-render"
                         className="bg-white text-black p-20 shadow-2xl origin-top"
                         style={{ 
                           width: "794px", 
                           minHeight: "1123px", 
                           transform: `scale(${previewScale})`,
                           fontFamily: data.fontFamily === "helvetica" ? "Inter, sans-serif" : data.fontFamily === "times" ? "serif" : "monospace"
                         }}
                       >
                          <div className="flex justify-between items-start border-b-2 border-black/10 pb-8 mb-12">
                             <div>
                                <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">{data.title}</h1>
                                <p className="text-xs font-bold text-black/40 uppercase tracking-widest">{data.subject}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest mb-1">{data.author}</p>
                                <p className="text-[10px] font-bold text-black/30">{new Date().toLocaleDateString()}</p>
                             </div>
                          </div>
                          <div 
                            className="whitespace-pre-wrap leading-relaxed text-black/80"
                            style={{ fontSize: `${data.fontSize}pt` }}
                          >
                             {data.content}
                          </div>
                       </div>
                    </div>
                  )}
               </div>

               <div className="bg-white/5 px-10 py-8 border-t border-white/5 flex items-center justify-between">
                  <button 
                    onClick={() => setStep(step === "preview" ? "content" : "setup")}
                    disabled={step === "setup"}
                    className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors disabled:opacity-20"
                  >
                    <ArrowLeft size={16} /> Decelerate
                  </button>
                  {step !== "preview" ? (
                    <button 
                      onClick={() => setStep(step === "setup" ? "content" : "preview")}
                      className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-500 transition-all flex items-center gap-3 shadow-xl"
                    >
                      Accelerate <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button 
                      onClick={generatePDF}
                      disabled={isProcessing}
                      className="px-12 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all flex items-center gap-4 shadow-2xl disabled:opacity-50"
                    >
                      {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <><FileDown size={20} /> Forge PDF</>}
                    </button>
                  )}
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400">
                    <LayoutTemplate size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Architecture</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Grid Format</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">A4 Industrial</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Rendering</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Pixel-Perfect</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-indigo-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                     Logic Synchronized
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-cyan-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-indigo-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-indigo-100 font-medium text-sm leading-relaxed">
                  Every transcription cycle occurs strictly in-memory. Your data never leaves the local orchestration layer.
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
                <div className="w-16 h-16 bg-indigo-500/10 rounded-[1.5rem] flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Transcription <span className="text-indigo-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Protocol Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Data Persistence?", a: "Negative. The synthesizer operates on a transient memory model. Refreshing the browser buffer immediately purges all active transcription data." },
                  { q: "Export Fidelity?", a: "High. The engine utilizes a high-DPI canvas re-mapping protocol to ensure crisp text and structural alignment in the final PDF forge." },
                  { q: "Multi-page Support?", a: "Currently optimized for single-page high-fidelity briefs. For multi-page technical reports, we recommend the 'Document Merge' engine." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-indigo-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-indigo-500/10 border border-indigo-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(79,70,229,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-indigo-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    For optimal legibility in technical archives, utilize 'Helvetica' 
                    with a 12PT density setting.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Privacy Standard</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">HI-RES</div>
                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Canvas Logic</div>
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
