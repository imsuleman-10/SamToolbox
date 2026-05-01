"use client";

import { useState, useRef, useMemo } from "react";
import Compressor from "compressorjs";
import { 
  Upload, Download, RefreshCw, FileImage, HelpCircle, 
  BookOpen, ShieldCheck, Zap, Settings,
  Cpu, Terminal, X, ArrowRight, Activity
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | Blob | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("image-compress", "Professional image optimization engine with local hardware acceleration and zero cloud latency."), []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setCompressedFile(null);
    }
  };

  const handleCompress = () => {
    if (!file) return;
    setIsCompressing(true);

    new Compressor(file, {
      quality: quality,
      success(result) {
        setCompressedFile(result);
        setIsCompressing(false);
      },
      error(err) {
        console.error(err.message);
        alert("Compression Conflict: Buffer overflow or invalid asset encoding.");
        setIsCompressing(false);
      },
    });
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `optimized-${file?.name || "asset.jpg"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
            <Cpu size={14} className="animate-pulse" />
            Neural Compactor v8.4
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Binary <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic">Squeeze.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            High-fidelity asset optimization. 
            <span className="text-slate-200 font-bold block mt-2">Local Bitstream Re-encoding. Zero Cloud Transmissions. Isolated Memory Buffer.</span>
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
                     <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                        <Terminal size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Command Center</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Ready for re-mapping</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all flex items-center gap-3 shadow-xl"
                  >
                    <Upload size={16} /> Inject Asset
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
               </div>

               <div className="p-10">
                  {!file ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/5 rounded-[2.5rem] py-32 flex flex-col items-center justify-center group cursor-pointer hover:border-blue-500/30 transition-all hover:bg-blue-500/[0.02]"
                    >
                       <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-slate-500 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-500 mb-6">
                          <FileImage size={40} />
                       </div>
                       <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">Awaiting Bitstream Injection</p>
                    </div>
                  ) : (
                    <div className="space-y-10 animate-in zoom-in-95 duration-500">
                       <div className="flex flex-col md:flex-row gap-10 items-center">
                          <div className="w-full md:w-1/2 aspect-video bg-black/40 rounded-[2.5rem] overflow-hidden border border-white/5 relative group flex items-center justify-center">
                             <img 
                               src={URL.createObjectURL(file)} 
                               alt="Preview" 
                               className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
                             />
                             <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-black/40">
                                <p className="text-white font-black truncate max-w-[200px] text-sm uppercase tracking-tight">{file.name}</p>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">{formatSize(file.size)} detected</p>
                             </div>
                             <button 
                               onClick={() => {setFile(null); setCompressedFile(null);}}
                               className="absolute top-8 right-8 bg-rose-600/20 text-rose-400 p-2 rounded-xl border border-rose-500/20 hover:bg-rose-600/40 transition-all"
                             >
                                <X size={16} />
                             </button>
                          </div>

                          <div className="w-full md:w-1/2 space-y-8">
                             <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                                <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-3">
                                      <Zap size={18} className="text-blue-400" />
                                      <span className="text-[10px] font-black text-white uppercase tracking-widest">Efficiency Vector</span>
                                   </div>
                                   <span className="text-blue-400 font-black text-[10px] uppercase tracking-widest">{Math.round(quality * 100)}%</span>
                                </div>
                                <input 
                                  type="range" 
                                  min="0.1" 
                                  max="1" 
                                  step="0.1"
                                  value={quality}
                                  onChange={e => setQuality(parseFloat(e.target.value))}
                                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                             </div>

                             <button 
                               onClick={handleCompress}
                               disabled={isCompressing}
                               className="w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-30"
                             >
                               {isCompressing ? <RefreshCw className="animate-spin" size={20} /> : <><Settings size={20} /> Execute Compaction</>}
                             </button>
                          </div>
                       </div>

                       {compressedFile && (
                         <div className="p-10 bg-blue-500/5 rounded-[2.5rem] border border-blue-500/20 animate-in slide-in-from-top-4 duration-500">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                               <div className="space-y-2 text-center md:text-left">
                                  <h4 className="text-white font-black uppercase tracking-tight text-xl italic">Optimized Matrix Ready</h4>
                                  <div className="flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                     <span>Original: {formatSize(file.size)}</span>
                                     <ArrowRight size={14} className="text-blue-500" />
                                     <span className="text-blue-400">Final: {formatSize(compressedFile.size)}</span>
                                     <span className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded">-{Math.round(((file.size - compressedFile.size) / file.size) * 100)}%</span>
                                  </div>
                               </div>
                               <button 
                                 onClick={handleDownload}
                                 className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all flex items-center gap-3 shadow-xl"
                               >
                                  <Download size={18} /> Extract Optimized Asset
                               </button>
                            </div>
                         </div>
                       )}
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                    <Activity size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Status</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Accelerator</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Canvas-G2</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Latency</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Zero</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     Compactor Active
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-cyan-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-emerald-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-emerald-100 font-medium text-sm leading-relaxed">
                  Asset optimization is executed strictly via local hardware acceleration. Your original bitstreams never traverse cloud infrastructure.
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
                <div className="w-16 h-16 bg-emerald-500/10 rounded-[1.5rem] flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Compactor <span className="text-emerald-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Binary Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Lossless or Lossy?", a: "The engine utilizes advanced lossy re-encoding algorithms to maximize binary reduction while preserving perceived visual fidelity." },
                  { q: "Maximum file capacity?", a: "Optimized for high-density assets; however, local system RAM determines the maximum bitstream capacity for structural analysis." },
                  { q: "Supported formats?", a: "The compactor handles all major web-standard formats including JPEG, PNG, and WebP via hardware-accelerated transcoding." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-emerald-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-emerald-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(16,185,129,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-emerald-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    For optimal web performance, target a compaction quality 
                    between 0.7 and 0.8 to balance weight and fidelity.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LOG</div>
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Privacy Index</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">BIT-ST</div>
                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">Direct Logic</div>
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
