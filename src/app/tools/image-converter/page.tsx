"use client";

import { useState, useRef, useMemo } from "react";
import { 
  Upload, Download, Settings, FileImage, ShieldCheck, Zap, 
  HelpCircle, BookOpen, Terminal, RefreshCw, 
  Layers, ArrowRight, Cpu, Image as ImageIcon
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

const FORMATS = [
  { id: "image/jpeg", label: "JPEG", desc: "Best for Photos", ext: "jpg" },
  { id: "image/png", label: "PNG", desc: "Lossless / Clear", ext: "png" },
  { id: "image/webp", label: "WEBP", desc: "Ultra Efficient", ext: "webp" },
  { id: "image/avif", label: "AVIF", desc: "Next-Gen Spec", ext: "avif" },
  { id: "image/bmp", label: "BMP", desc: "Windows Bitmap", ext: "bmp" },
  { id: "image/gif", label: "GIF", desc: "Legacy Raster", ext: "gif" },
  { id: "image/x-icon", label: "ICO", desc: "System Favicon", ext: "ico" },
  { id: "image/tiff", label: "TIFF", desc: "High Fidelity", ext: "tiff" },
  { id: "image/svg+xml", label: "SVG", desc: "Vector Data", ext: "svg" },
  { id: "image/heic", label: "HEIC", desc: "Apple Standard", ext: "heic" },
  { id: "image/heif", label: "HEIF", desc: "High Efficiency", ext: "heif" },
  { id: "application/pdf", label: "PDF", desc: "Print Document", ext: "pdf" }
];

export default function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("image/jpeg");
  const [isConverting, setIsConverting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("image-converter", "Professional industrial-grade image transcoding engine with multi-format support and 100% local hardware acceleration."), []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleDownload = () => {
    if (!imageUrl || !canvasRef.current || !file) return;
    setIsConverting(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (targetFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);
      
      try {
        const quality = targetFormat === "image/jpeg" || targetFormat === "image/webp" ? 0.92 : 1;
        
        if (targetFormat === "application/pdf") {
            import("jspdf").then(({ jsPDF }) => {
                const pdf = new jsPDF({
                    orientation: canvas.width > canvas.height ? 'l' : 'p',
                    unit: 'px',
                    format: [canvas.width, canvas.height]
                });
                pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", 0, 0, canvas.width, canvas.height);
                pdf.save(`optimized-${file.name.split('.')[0]}.pdf`);
                setIsConverting(false);
            });
            return;
        }

        const newUrl = canvas.toDataURL(targetFormat, quality);
        const a = document.createElement("a");
        a.href = newUrl;
        const ext = FORMATS.find(f => f.id === targetFormat)?.ext || "img";
        a.download = `optimized-${file.name.split('.')[0]}.${ext}`;
        a.click();
      } catch (e) {
        alert("System Conflict: Your browser engine does not support direct encoding to " + targetFormat.split('/')[1].toUpperCase() + ".");
      } finally {
        setTimeout(() => setIsConverting(false), 800);
      }
    };
    img.onerror = () => {
      alert("Ingestion Error: Ensure the asset is a valid image bitstream.");
      setIsConverting(false);
    };
    img.src = imageUrl;
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
            <Layers size={14} className="animate-pulse" />
            SAMToolBox v11.4
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic">Transcoder.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Multi-vector asset conversion. 
            <span className="text-slate-200 font-bold block mt-2">Local Binary Re-mapping. Zero Data Exposure. High-Fidelity Output.</span>
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
                          <ImageIcon size={40} />
                       </div>
                       <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">Awaiting Bitstream Injection</p>
                    </div>
                  ) : (
                    <div className="space-y-10 animate-in zoom-in-95 duration-500">
                       <div className="flex flex-col md:flex-row gap-10 items-center">
                          <div className="w-full md:w-1/2 aspect-video bg-black/40 rounded-[2.5rem] overflow-hidden border border-white/5 relative group">
                             <img src={imageUrl!} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                             <div className="absolute bottom-8 left-8">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 italic">Source Buffer</p>
                                <p className="text-white font-black truncate max-w-[200px] text-sm uppercase">{file.name}</p>
                             </div>
                             <div className="absolute top-8 right-8 bg-black/60 px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase tracking-widest border border-white/10">
                                {file.type.split('/')[1].toUpperCase()}
                             </div>
                          </div>

                          <div className="w-full md:w-1/2 space-y-8">
                             <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Target Format Vector</label>
                                <div className="grid grid-cols-2 gap-3">
                                   {FORMATS.slice(0, 6).map(f => (
                                     <button
                                       key={f.id}
                                       onClick={() => setTargetFormat(f.id)}
                                       className={`p-4 rounded-2xl border transition-all text-left group ${targetFormat === f.id ? "bg-blue-600 border-blue-500 shadow-lg" : "bg-white/5 border-white/5 hover:border-white/10"}`}
                                     >
                                        <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${targetFormat === f.id ? "text-white" : "text-slate-500 group-hover:text-white"}`}>{f.label}</div>
                                        <div className={`text-[8px] font-bold uppercase tracking-widest ${targetFormat === f.id ? "text-blue-200" : "text-slate-700"}`}>{f.desc}</div>
                                     </button>
                                   ))}
                                </div>
                             </div>

                             <button 
                               onClick={handleDownload}
                               disabled={isConverting}
                               className="w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-blue-500 transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-30"
                             >
                               {isConverting ? <RefreshCw className="animate-spin" size={20} /> : <><Zap size={20} /> Execute Transcoding</>}
                             </button>
                          </div>
                       </div>
                       
                       <canvas ref={canvasRef} className="hidden" />

                       <div className="p-8 bg-white/5 rounded-3xl border border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
                          {FORMATS.slice(6).map(f => (
                            <button
                              key={f.id}
                              onClick={() => setTargetFormat(f.id)}
                              className={`p-4 rounded-xl border transition-all text-center ${targetFormat === f.id ? "bg-blue-600 border-blue-500 shadow-lg" : "bg-white/5 border-white/5 hover:border-white/10"}`}
                            >
                               <div className={`text-[10px] font-black uppercase tracking-widest ${targetFormat === f.id ? "text-white" : "text-slate-600 hover:text-white"}`}>{f.label}</div>
                            </button>
                          ))}
                       </div>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400">
                    <Cpu size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Status</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Vector Support</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Multi-Format</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Execution</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Client-Side</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-cyan-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                     Transcoder Active
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-600 to-blue-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-cyan-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-cyan-100 font-medium text-sm leading-relaxed">
                  Every transcoding cycle occurs strictly via local hardware acceleration. No bitstream telemetry is authorized for cloud transmission.
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
                <div className="w-16 h-16 bg-cyan-500/10 rounded-[1.5rem] flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Transcode <span className="text-cyan-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Format Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Format Compatibility?", a: "The engine supports a vast array of binary vectors. Note that some specialized formats (e.g., HEIC) require modern browser engines for native re-mapping." },
                  { q: "Bitstream Integrity?", a: "High. Transcoding utilizes lossless canvas mapping where possible. For JPEG/WEBP exports, we maintain a 92% fidelity coefficient by default." },
                  { q: "Vector PDF Support?", a: "Affirmative. The transcoder can forge PDF containers from raster assets, maintaining correct orientation and pixel density." }
                ].map((faq, i) => (
                  <div key={i} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/20 transition-all group">
                    <h3 className="font-black text-white text-sm mb-4 flex items-start gap-4">
                      <span className="text-cyan-400 font-mono">Q.</span> {faq.q}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed font-medium pl-8 group-hover:text-slate-300 transition-colors">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] rounded-[4rem] p-16 md:p-20 text-white relative overflow-hidden border border-white/5">
               <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               <div className="relative z-10 text-center sm:text-left">
                  <div className="w-24 h-24 bg-cyan-500/10 border border-cyan-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(6,182,212,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-cyan-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    For next-gen web integration, utilize the 'WEBP' or 'AVIF' 
                    transcoding vectors for maximum efficiency.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">12+</div>
                        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">Format Vectors</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">RAW</div>
                        <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">Pure Buffer</div>
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
