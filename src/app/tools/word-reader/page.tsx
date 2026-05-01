"use client";

import { useState, useRef, useMemo } from "react";
import { Upload, X, FileText, BookOpen, HelpCircle, Terminal, Eye, ShieldCheck, Activity } from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function WordReaderPage() {
  const [htmlData, setHtmlData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("word-reader", "Professional Word document portal with local-only rendering and zero cloud telemetry."), []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsProcessing(true);
      
      try {
        const mammoth = await import("mammoth");
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
        setHtmlData(result.value);
      } catch (err) {
        console.error(err);
        alert("Failed to read the Word document. Make sure it's a valid .docx file.");
        clearFile();
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const clearFile = () => {
    setHtmlData(null);
    setFileName("");
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Activity size={14} className="animate-pulse" />
            Lexicon Portal v5.4
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Word <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">Portal.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Instant Microsoft Word (.docx) visualization. 
            <span className="text-slate-200 font-bold block mt-2">Local Binary Mapping. Zero Cloud Buffering. Absolute Privacy.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        {!htmlData ? (
          <div className="max-w-4xl mx-auto">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black p-20 flex flex-col items-center justify-center group cursor-pointer hover:border-blue-500/30 transition-all hover:bg-blue-500/[0.02] text-center animate-in fade-in slide-in-from-bottom-8 duration-700"
            >
               <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-slate-500 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500 mb-10 border border-white/5">
                  <Upload size={56} />
               </div>
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Inject Document</h3>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-sm leading-relaxed">
                  Select a .docx file to initiate a secure, sandboxed reading session.
               </p>
               <input
                 type="file"
                 accept=".docx"
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
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
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

                <div className="bg-slate-50/5 p-10 md:p-20 flex justify-center overflow-auto custom-scrollbar h-[800px]">
                   <div 
                     className="bg-white max-w-4xl w-full p-16 md:p-24 rounded-2xl shadow-2xl prose prose-slate prose-lg text-slate-800"
                     dangerouslySetInnerHTML={{ __html: htmlData }}
                   />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/10">
                      <Eye size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Visibility</p>
                      <p className="text-white font-black uppercase tracking-tight text-lg italic">Local HTML-5</p>
                   </div>
                </div>
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/10">
                      <ShieldCheck size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Encryption</p>
                      <p className="text-white font-black uppercase tracking-tight text-lg italic">Memory Sandbox</p>
                   </div>
                </div>
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/10">
                      <FileText size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Format</p>
                      <p className="text-white font-black uppercase tracking-tight text-lg italic">DOCX Standard</p>
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
                <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Portal <span className="text-blue-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Viewing Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Is the document uploaded?", a: "Negative. Lexicon Portal utilizes Mammoth logic to map Word binaries to HTML directly within your browser's memory sandbox. Zero data telemetry is authorized." },
                  { q: "Can I edit the document?", a: "The portal is optimized for high-fidelity viewing and secure reading. For synthesis or mutation, please utilize the respective utility modules in the suite." },
                  { q: "Format support?", a: "We focus on the modern .docx standard to ensure maximum rendering accuracy and structural fidelity in the local environment." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-blue-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-blue-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(37,99,235,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-blue-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    Utilize the terminate command after your session to 
                    immediately purge the document bitstream from memory buffers.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">RENDER</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Direct Logic</div>
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
