"use client";

import { useState, useRef, useMemo } from "react";
import { Upload, FileText, Maximize, X, ShieldCheck, BookOpen, HelpCircle, Terminal, Eye } from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function PdfReaderPage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("pdf-reader", "Industrial-grade PDF viewing portal with local-only rendering and zero cloud telemetry."), []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const clearFile = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    setFileName("");
  };

  const handleFullscreen = () => {
    const iframe = document.getElementById("pdf-frame");
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-red-500/30 selection:text-red-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ══════════════════════════════════════════
          HERO / HEADER
      ══════════════════════════════════════════ */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <ShieldCheck size={14} className="animate-pulse" />
            Secure Portal v7.3
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Document <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400 italic">Portal.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Zero-latency, local PDF rendering environment. 
            <span className="text-slate-200 font-bold block mt-2">No Cloud Transmissions. Isolated Memory Buffers. Absolute Anonymity.</span>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MAIN UTILITY INTERFACE
      ══════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        {!fileUrl ? (
          <div className="max-w-4xl mx-auto">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black p-20 flex flex-col items-center justify-center group cursor-pointer hover:border-red-500/30 transition-all hover:bg-red-500/[0.02] text-center animate-in fade-in slide-in-from-bottom-8 duration-700"
            >
               <div className="w-32 h-32 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-slate-500 group-hover:text-red-400 group-hover:scale-110 transition-all duration-500 mb-10 border border-white/5">
                  <Upload size={56} />
               </div>
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">Inject Asset</h3>
               <p className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-sm leading-relaxed">
                  Select a PDF to initiate a secure, sandboxed viewing session.
               </p>
               <input
                 type="file"
                 accept="application/pdf"
                 className="hidden"
                 ref={fileInputRef}
                 onChange={handleFileChange}
               />
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
             <div className="bg-[#0f172a] border border-white/5 rounded-[3rem] overflow-hidden shadow-3xl">
                <div className="bg-white/5 px-10 py-6 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
                         <Terminal size={22} />
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{fileName}</h3>
                         <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Active Secure Session</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <button 
                        onClick={handleFullscreen}
                        className="p-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all border border-white/10"
                      >
                         <Maximize size={20} />
                      </button>
                      <button 
                        onClick={clearFile}
                        className="px-8 py-4 bg-red-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-500 transition-all flex items-center gap-2 shadow-xl"
                      >
                         <X size={16} /> Terminate
                      </button>
                   </div>
                </div>

                <div className="aspect-[16/10] bg-black/40 p-10">
                   <iframe 
                     id="pdf-frame"
                     src={`${fileUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                     className="w-full h-full rounded-2xl border border-white/5 shadow-2xl bg-slate-900"
                   />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 border border-red-500/10">
                      <Eye size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Visibility</p>
                      <p className="text-white font-black uppercase tracking-tight text-lg italic">Local High-Def</p>
                   </div>
                </div>
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 border border-red-500/10">
                      <ShieldCheck size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Encryption</p>
                      <p className="text-white font-black uppercase tracking-tight text-lg italic">Isolated Buffer</p>
                   </div>
                </div>
                <div className="bg-[#0f172a] p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6">
                   <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 border border-red-500/10">
                      <FileText size={24} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Protocol</p>
                      <p className="text-white font-black uppercase tracking-tight text-lg italic">ISO 32000-1</p>
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
                <div className="w-16 h-16 bg-red-500/10 rounded-[1.5rem] flex items-center justify-center text-red-400 border border-red-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Portal <span className="text-red-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Viewing Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Does the PDF leave my computer?", a: "Negative. The portal utilizes local Blob URLs to render the document within your browser's memory sandbox. No data is authorized for cloud transmission." },
                  { q: "Can I edit the PDF here?", a: "The portal is optimized for high-fidelity viewing and secure reading. For synthesis or splitting, please utilize the respective utility modules in the suite." },
                  { q: "Is there a file size limit?", a: "The architecture supports high-density archives; however, rendering performance is determined by your local system hardware and RAM allocation." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-red-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-red-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(225,29,72,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-red-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    Utilize the terminate command after your session to 
                    immediately purge the document bitstream from memory buffers.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-red-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">RENDER</div>
                        <div className="text-[10px] font-bold text-red-400 uppercase tracking-[0.3em]">Direct Logic</div>
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
