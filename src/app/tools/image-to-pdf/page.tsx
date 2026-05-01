"use client";

import { useState, useRef, useMemo } from "react";
import { 
  Upload, Download, Trash2, FileText, ChevronUp, ChevronDown, 
  Zap, ShieldCheck, BookOpen, HelpCircle, Terminal, Plus, X, RefreshCw
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function ImageToPdfPage() {
  const [images, setImages] = useState<{ url: string; file: File; id: string }[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("image-to-pdf", "Industrial-grade image to PDF synthesis engine with local-only processing."), []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => ({
        file,
        url: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(7)
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].url);
      copy.splice(index, 1);
      return copy;
    });
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setImages(prev => {
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    setImages(prev => {
      const copy = [...prev];
      [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
      return copy;
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    
    try {
      const { jsPDF } = await import("jspdf");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();
        
        const img = new Image();
        img.src = images[i].url;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const imgRatio = img.width / img.height;
        const pdfRatio = pdfWidth / pdfHeight;

        let finalWidth = pdfWidth;
        let finalHeight = pdfHeight;
        
        if (imgRatio > pdfRatio) {
          finalHeight = pdfWidth / imgRatio;
        } else {
          finalWidth = pdfHeight * imgRatio;
        }

        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;

        pdf.addImage(img, "JPEG", x, y, finalWidth, finalHeight);
      }
      
      pdf.save(`synthesis-${new Date().getTime()}.pdf`);
    } catch (err) {
      console.error(err);
      alert("Synthesis Conflict: Critical error during image-to-binary conversion.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-orange-500/30 selection:text-orange-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Zap size={14} className="animate-pulse" />
            Synthesis Engine v6.7
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 italic">Fusion.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Multi-image to PDF architectural mapping. 
            <span className="text-slate-200 font-bold block mt-2">Local Binary Synthesis. Zero Cloud Buffering. High-Fidelity Rendering.</span>
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
                     <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400">
                        <Terminal size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Synthesis Core</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">{images.length} Assets loaded</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <button 
                       onClick={() => fileInputRef.current?.click()}
                       className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all border border-white/5 shadow-xl flex items-center gap-2"
                     >
                       <Plus size={16} /> Add Assets
                     </button>
                     <input
                       type="file"
                       ref={fileInputRef}
                       onChange={handleFileChange}
                       accept="image/*"
                       multiple
                       className="hidden"
                     />
                     <button 
                       onClick={generatePDF}
                       disabled={images.length === 0 || isGenerating}
                       className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-orange-500 transition-all flex items-center gap-3 shadow-xl disabled:opacity-30"
                     >
                       {isGenerating ? <RefreshCw className="animate-spin" size={16} /> : <Download size={16} />} Synthesize
                     </button>
                  </div>
               </div>

               <div className="p-10">
                  {images.length === 0 ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/5 rounded-[2.5rem] py-40 flex flex-col items-center justify-center group cursor-pointer hover:border-orange-500/30 transition-all hover:bg-orange-500/[0.02]"
                    >
                       <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-500 group-hover:text-orange-400 group-hover:scale-110 transition-all duration-500 mb-6">
                          <Upload size={40} />
                       </div>
                       <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">Awaiting Asset Injection</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
                       {images.map((img, index) => (
                         <div key={img.id} className="bg-black/40 border border-white/5 rounded-[2.5rem] overflow-hidden group relative">
                            <div className="aspect-[4/3] relative">
                               <img src={img.url} alt="asset" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            </div>
                            <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                               <button onClick={() => moveUp(index)} className="p-2 bg-black/60 text-white rounded-lg hover:bg-orange-600 transition-colors border border-white/10"><ChevronUp size={16} /></button>
                               <button onClick={() => moveDown(index)} className="p-2 bg-black/60 text-white rounded-lg hover:bg-orange-600 transition-colors border border-white/10"><ChevronDown size={16} /></button>
                               <button onClick={() => removeImage(index)} className="p-2 bg-rose-600/80 text-white rounded-lg hover:bg-rose-600 transition-colors border border-white/10"><Trash2 size={16} /></button>
                            </div>
                            <div className="absolute bottom-6 left-8 right-8">
                               <p className="text-white font-black text-[10px] uppercase tracking-widest truncate">{img.file.name}</p>
                               <p className="text-slate-500 font-bold text-[9px] uppercase tracking-widest mt-1">Page {index + 1}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400">
                    <FileText size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Status</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Standard</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">ISO 32000-2</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Latency</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Zero</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-orange-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                     Fuser Active
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-amber-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-orange-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-orange-100 font-medium text-sm leading-relaxed">
                  Asset synthesis is executed strictly via local browser logic. Your raw image bitstreams are never authorized for cloud transmission.
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
                <div className="w-16 h-16 bg-orange-500/10 rounded-[1.5rem] flex items-center justify-center text-orange-400 border border-orange-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Fuser <span className="text-orange-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Synthesis Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is fidelity preserved?", a: "Affirmative. The synthesis engine maps images to the PDF document grid with high-resolution vector scaling for maximum clarity." },
                  { q: "Maximum page count?", a: "The architecture handles high-density archives; however, system RAM determines the maximum image buffer capacity for synthesis." },
                  { q: "Supported source formats?", a: "The fuser handles all major web-standard image formats including JPEG, PNG, and WebP via local hardware acceleration." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-orange-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-orange-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-orange-500/10 border border-orange-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(249,115,22,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-orange-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    For optimal synthesis velocity, organize your image assets 
                    in the desired sequence before executing the fusion protocol.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">FUSION</div>
                        <div className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.3em]">Direct Logic</div>
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
