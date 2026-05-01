"use client";

import { useState, useRef, useMemo } from "react";
import { 
  Upload, Download, Image as ImageIcon, Maximize, 
  Terminal, X, RefreshCw, Lock, ShieldCheck, HelpCircle, BookOpen, Layers
} from "lucide-react";
import { generateSoftwareApplicationSchema } from "@/lib/structuredData";

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const schema = useMemo(() => generateSoftwareApplicationSchema("image-resize", "Professional image scaling engine with pixel-perfect precision and local-only hardware acceleration."), []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setImageUrl(url);

      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalRatio(img.width / img.height);
      };
      img.src = url;
    }
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainRatio && originalRatio) {
      setHeight(Math.round(val / originalRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainRatio && originalRatio) {
      setWidth(Math.round(val * originalRatio));
    }
  };

  const handleDownload = () => {
    if (!imageUrl || !canvasRef.current || !file) return;
    setIsProcessing(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const newUrl = canvas.toDataURL(file.type);
      const a = document.createElement("a");
      a.href = newUrl;
      a.download = `resized-${file.name}`;
      a.click();
      setIsProcessing(false);
    };
    img.src = imageUrl;
  };

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-blue-500/30 selection:text-blue-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="pt-24 pb-32 px-6 relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-10 shadow-2xl">
            <Maximize size={14} className="animate-pulse" />
            SAMToolBox Engine v1.0
          </div>
          <h1 className="text-6xl md:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Asset <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic">Resizer.</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Precision coordinate re-mapping. 
            <span className="text-slate-200 font-bold block mt-2">Local Pixel Manipulation. Zero Compression Loss. High-Fidelity Scaling.</span>
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f172a] rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
               <div className="bg-white/5 px-10 py-8 border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                        <Terminal size={22} />
                     </div>
                     <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">Geometric Core</h3>
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-1 italic">Calculating Vectors</p>
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
                       <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">Awaiting Matrix Entry</p>
                    </div>
                  ) : (
                    <div className="space-y-10 animate-in zoom-in-95 duration-500">
                       <div className="flex flex-col md:flex-row gap-10 items-center">
                          <div className="w-full md:w-1/2 aspect-video bg-black/40 rounded-[2.5rem] overflow-hidden border border-white/5 relative group">
                             {imageUrl && <img src={imageUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Preview" />}
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                             <div className="absolute bottom-8 left-8">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 italic">Source Bounds</p>
                                <p className="text-white font-black truncate max-w-[200px] text-sm uppercase">{width} x {height}</p>
                             </div>
                             <button 
                               onClick={() => {setFile(null); setImageUrl(null);}}
                               className="absolute top-8 right-8 bg-slate-800 text-white p-2 rounded-xl border border-white/10 hover:bg-slate-700 transition-all"
                             >
                                <X size={16} />
                             </button>
                          </div>

                          <div className="w-full md:w-1/2 space-y-8">
                              <div className="grid grid-cols-2 gap-6">
                                 <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Width (PX)</label>
                                    <input 
                                      type="number" 
                                      value={width}
                                      onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-black outline-none focus:border-blue-500/50 transition-all"
                                    />
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Height (PX)</label>
                                    <input 
                                      type="number" 
                                      value={height}
                                      onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-black outline-none focus:border-blue-500/50 transition-all"
                                    />
                                 </div>
                              </div>

                              <button 
                                onClick={() => setMaintainRatio(!maintainRatio)}
                                className={`w-full py-4 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${maintainRatio ? "bg-blue-600/10 border-blue-500/30 text-blue-400" : "bg-white/5 border-white/10 text-slate-500"}`}
                              >
                                 {maintainRatio ? <Lock size={14} /> : <X size={14} />}
                                 Aspect Ratio: {maintainRatio ? "LOCKED" : "UNLOCKED"}
                              </button>

                              <button 
                                onClick={handleDownload}
                                disabled={isProcessing || width <= 0 || height <= 0}
                                className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all flex items-center justify-center gap-4 shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed group"
                              >
                                {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <><Download size={20} className="group-hover:translate-y-0.5 transition-transform" /> Extract Scaled Binary</>}
                              </button>
                          </div>
                       </div>
                       <canvas ref={canvasRef} className="hidden" />
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0f172a] p-10 rounded-[3.5rem] border border-white/5 shadow-3xl shadow-black relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400">
                    <Layers size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Status</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Interpolation</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Bi-Linear</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <span className="text-slate-500 font-bold">Latency</span>
                     <span className="text-white font-black uppercase tracking-widest text-[10px]">Zero</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] pt-4 border-t border-white/5">
                     <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                     Dimensional Core Active
                  </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-3xl border border-blue-500/20">
               <ShieldCheck size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Vault Secure</h3>
               <p className="text-blue-100 font-medium text-sm leading-relaxed">
                  Dimensional re-mapping is executed strictly within your workstation's browser environment. Your binary data is never transmitted to cloud infrastructure.
               </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-40 border-t border-slate-800 pt-40">
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-16">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-500/10 rounded-[1.5rem] flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h2 className="text-4xl font-black text-white uppercase tracking-tight leading-none italic">Scaling <span className="text-blue-400">FAQ</span></h2>
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2">Geometry Queries</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { q: "Quality Degradation?", a: "Scaling down (reduction) maintains sharp clarity. Scaling up (expansion) may result in interpolation artifacts. For optimal results, target native resolution." },
                  { q: "Aspect Ratio Control?", a: "Full. You can toggle the 'Pixel Lock' to maintain proportions or define custom anamorphic bounds for specialized layout requirements." },
                  { q: "Hardware Acceleration?", a: "Affirmative. The core utilizes your browser's native Canvas API, offloading re-mapping calculations to your local GPU where available." }
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
                  <div className="w-24 h-24 bg-blue-500/10 border border-blue-500/20 rounded-[2rem] flex items-center justify-center mb-12 shadow-[0_0_80px_rgba(59,130,246,0.2)] mx-auto sm:mx-0">
                    <BookOpen size={48} className="text-blue-400" />
                  </div>
                  <h3 className="text-4xl font-black mb-8 tracking-tight uppercase leading-none">Best Practices</h3>
                  <p className="text-slate-400 font-medium mb-16 leading-relaxed text-xl">
                    For optimal web integration, scale assets to their exact display 
                    dimensions to reduce browser rendering overhead.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">0-LAG</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Execution Speed</div>
                     </div>
                     <div className="space-y-4">
                        <div className="text-4xl font-black text-white tracking-tighter">PX</div>
                        <div className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em]">Perfect Logic</div>
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
