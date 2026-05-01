"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { 
  Download, RefreshCw, Palette, Settings, 
  HelpCircle, BookOpen, ShieldCheck, Zap,
  Cpu, QrCode, Terminal
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function QrGeneratorPage() {
  const [text, setText] = useState("https://samtoolbox.vercel.app");
  const [colorLight, setColorLight] = useState("#ffffff");
  const [colorDark, setColorDark] = useState("#0f172a"); 
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("qr-generator", "Professional industrial-grade QR code generation engine with local-only processing."), []);

  useEffect(() => {
    generateQR();
  }, [text, colorLight, colorDark]);

  const generateQR = async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);
    
    try {
      const QRCode = (await import("qrcode")).default;
      await QRCode.toCanvas(canvasRef.current, text || " ", {
        width: 1000, 
        margin: 2,
        color: {
          dark: colorDark,
          light: colorLight,
        },
      });
      canvasRef.current.style.width = '100%';
      canvasRef.current.style.height = 'auto';
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-matrix-${Date.now()}.png`;
    a.click();
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
            <QrCode size={14} className="animate-pulse" />
            Matrix Architect v8.2
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            QR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 italic">Matrix.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            High-resolution data encoding. 
            <span className="text-slate-200 font-bold block mt-2">Static Pattern Forge. Zero-Redirection. Pure Local Generation.</span>
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
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Data Vector</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Ready for encoding</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2 px-4 py-2 bg-black/40 rounded-xl border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Live Forge</span>
                     </div>
                  </div>
               </div>

               <div className="p-10 space-y-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Payload String</label>
                     <textarea 
                       value={text}
                       onChange={e => setText(e.target.value)}
                       className="w-full h-32 bg-black/40 border border-white/5 rounded-[2rem] p-8 text-white font-medium leading-relaxed outline-none focus:border-blue-500/30 transition-all resize-none custom-scrollbar"
                       placeholder="INJECT DATA FOR ENCODING..."
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="p-8 bg-white/5 rounded-3xl border border-white/5 space-y-6">
                        <div className="flex items-center gap-3">
                           <Palette size={18} className="text-blue-400" />
                           <span className="text-[10px] font-black text-white uppercase tracking-widest">Chrome Geometry</span>
                        </div>
                        <div className="space-y-6">
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pattern Color</span>
                              <input 
                                type="color" 
                                value={colorDark}
                                onChange={e => setColorDark(e.target.value)}
                                className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer"
                              />
                           </div>
                           <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Background Vector</span>
                              <input 
                                type="color" 
                                value={colorLight}
                                onChange={e => setColorLight(e.target.value)}
                                className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="p-8 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/[0.02] group-hover:bg-blue-500/[0.05] transition-all" />
                        <div className="relative z-10 w-full aspect-square max-w-[200px] bg-white rounded-2xl p-4 shadow-2xl">
                           <canvas ref={canvasRef} className="w-full h-full" />
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={handleDownload}
                    disabled={!text}
                    className="w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-30"
                  >
                    <Download size={20} /> Extract Matrix (PNG)
                  </button>
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                    <Settings size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Engine</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Encoding</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">ECC-Medium</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Resolution</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">1000px SQ</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                     Forge Active
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-blue-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-blue-100 font-medium text-sm leading-relaxed">
                  QR pattern generation occurs strictly via local memory allocation. No data telemetry is authorized for cloud transmission.
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
                <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Forge <span className="text-blue-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Matrix Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Are these QR codes static?", a: "Affirmative. These are 100% static matrices. They encode data directly into the pixel pattern and will never expire." },
                  { q: "Contrast requirements?", a: "QR scanners rely on contrast vectors. For maximum reliability, we recommend a light background and dark foreground pattern." },
                  { q: "Commercial utilization?", a: "Absolute. The exported PNG matrices are high-resolution and suitable for print media, billboards, and digital deployment." }
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
                    For optimal scan velocity in print media, ensure the QR matrix 
                    occupies at least 2cm x 2cm of surface area.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-EXP</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Pattern Life</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">HI-RES</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Matrix Density</div>
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
