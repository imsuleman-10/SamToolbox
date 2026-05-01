"use client";

import { useState, useRef, useMemo } from "react";
import { Upload, X, Presentation, Info, Zap, BookOpen, HelpCircle, Terminal, Eye, ShieldCheck, Activity } from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function PptReaderPage() {
  const [slides, setSlides] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("ppt-reader", "Professional PowerPoint text extraction engine with local-only parsing and zero cloud telemetry."), []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsProcessing(true);
      
      try {
        const JSZip = (await import("jszip")).default;
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        
        const slideFiles = Object.keys(zip.files).filter(path => 
          /^ppt\/slides\/slide\d+\.xml$/.test(path)
        );
        
        slideFiles.sort((a, b) => {
          const numA = parseInt(a.match(/slide(\d+)/)?.[1] || "0");
          const numB = parseInt(b.match(/slide(\d+)/)?.[1] || "0");
          return numA - numB;
        });

        const extractedSlides: string[] = [];

        for (const filePath of slideFiles) {
          const xmlContent = await zip.files[filePath].async("string");
          const parser = new DOMParser();
          const doc = parser.parseFromString(xmlContent, "application/xml");
          
          const textNodes = doc.getElementsByTagName("a:t");
          const slideTextContent = Array.from(textNodes)
            .map(node => node.textContent)
            .join(" ")
            .trim();
            
          extractedSlides.push(slideTextContent);
        }

        setSlides(extractedSlides.length ? extractedSlides : ["No text contents found in presentation."]);
      } catch (err) {
        console.error(err);
        alert("Failed to read the PowerPoint. Make sure it's a valid .pptx file.");
        clearFile();
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const clearFile = () => {
    setSlides([]);
    setFileName("");
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
            <Activity size={14} className="animate-pulse" />
            Extraction Matrix v4.2
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            PPTX <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400 italic">Vault.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Instant PowerPoint (.pptx) textual decomposition. 
            <span className="text-slate-200 font-bold block mt-2">Local XML Parsing. Zero Redirection. Absolute Data Sovereignty.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        {slides.length === 0 ? (
          <div className="max-w-4xl mx-auto">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black p-20 flex flex-col items-center justify-center group cursor-pointer hover:border-orange-500/30 transition-all hover:bg-orange-500/[0.02] text-center animate-in fade-in slide-in-from-bottom-8 duration-700"
            >
               <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-slate-500 group-hover:text-orange-400 group-hover:scale-110 transition-all duration-500 mb-10 border border-white/5">
                  <Upload size={56} />
               </div>
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Inject Presentation</h3>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-sm leading-relaxed">
                  Select a .pptx file to initiate a secure, sandboxed extraction session.
               </p>
               <input
                 type="file"
                 accept=".pptx"
                 className="hidden"
                 ref={fileInputRef}
                 onChange={handleFileChange}
                 disabled={isProcessing}
               />
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
             <div className="bg-[#0f172a] border border-white/5 rounded-[3rem] overflow-hidden shadow-3xl">
                <div className="bg-white/5 px-10 py-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400">
                         <Terminal size={22} />
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{fileName}</h3>
                         <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Active Secure Session</p>
                      </div>
                   </div>
                   <button 
                     onClick={clearFile}
                     className="px-8 py-4 bg-rose-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-500 transition-all flex items-center gap-2 shadow-xl"
                   >
                      <X size={16} /> Terminate Session
                   </button>
                </div>

                <div className="bg-slate-50/5 p-10 md:p-20 space-y-12 overflow-auto custom-scrollbar h-[800px] flex flex-col items-center">
                   {slides.map((text, idx) => (
                      <div key={idx} className="bg-white w-full max-w-4xl p-16 md:p-20 rounded-2xl shadow-2xl border border-slate-200 relative aspect-video flex items-center justify-center text-center">
                         <div className="absolute top-8 left-8 bg-orange-100 text-orange-600 font-black px-4 py-2 rounded-xl text-[10px] uppercase tracking-widest shadow-sm">
                            Matrix Slide {idx + 1}
                         </div>
                         <div className="text-slate-800 text-lg md:text-2xl font-medium leading-relaxed max-w-2xl px-4 overflow-y-auto custom-scrollbar max-h-full">
                            {text || <span className="text-slate-400 italic text-sm">No textual content detected on this vector</span>}
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/10">
                      <Eye size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Visibility</p>
                      <p className="text-white font-black uppercase tracking-tight text-lg italic">Raw Text Vector</p>
                   </div>
                </div>
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/10">
                      <ShieldCheck size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Encryption</p>
                      <p className="text-white font-black uppercase tracking-tight text-lg italic">Isolated Parser</p>
                   </div>
                </div>
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 border border-orange-500/10">
                      <Presentation size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Format</p>
                      <p className="text-white font-black uppercase tracking-tight text-lg italic">PPTX Standard</p>
                   </div>
                </div>
             </div>
          </div>
        )}

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
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Vault <span className="text-orange-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Extraction Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Why are images missing?", a: "This tool is a 'Textual Extraction Engine'. We focus on the underlying data primitives to provide a high-speed, secure reading experience." },
                  { q: "Is the presentation safe?", a: "Yes. SamToolbox utilizes 'Local Deconstruction' architecture. Your file is never uploaded; it is parsed entirely within your browser's memory sandbox." },
                  { q: "Can I extract from .ppt?", a: "Currently, we support the modern XML-based .pptx standard. Older .ppt legacy files should be converted to .pptx prior to using this portal." }
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
                    Utilize the terminate command after your session to 
                    immediately purge the document bitstream from memory buffers.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">EXTRAC</div>
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
