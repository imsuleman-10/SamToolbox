"use client";

import { useState, useRef } from "react";
import { Upload, Download, Settings2, FileImage, ShieldCheck, Zap, AlertCircle, X } from "lucide-react";

export default function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<string>("image/jpeg");
  const [isConverting, setIsConverting] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      
      // If JPEG, fill white background to avoid black transparency
      if (targetFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      ctx.drawImage(img, 0, 0);
      
      const newUrl = canvas.toDataURL(targetFormat, 0.92);
      const a = document.createElement("a");
      a.href = newUrl;
      const extension = targetFormat.split("/")[1];
      a.download = `samtoolbox-converted-${file.name.split('.')[0]}.${extension}`;
      a.click();
      setTimeout(() => setIsConverting(false), 500);
    };
    img.src = imageUrl;
  };

  const clearFile = () => {
    setFile(null);
    setImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Pro Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-xs font-black uppercase tracking-[0.2em] mb-8 border border-brand-100">
            <ShieldCheck size={14} />
            <span>Industrial Secure Processing</span>
          </div>
          <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Universal Image <span className="text-brand-600">Forge</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Professional-grade image transcoding with zero server latency. 
            Privacy-first execution directly in your hardware.
          </p>
        </div>

        {!file ? (
          /* Premium Upload Zone */
          <div 
            className="group relative max-w-3xl mx-auto"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 text-center cursor-pointer transition-all duration-300 hover:border-brand-500 hover:bg-slate-50/50">
              <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-brand-600 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Upload size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">Initialize Sequence</h3>
              <p className="text-slate-500 font-medium mb-0">Drag and drop or click to select RAW/Raster images</p>
              <div className="mt-8 flex justify-center gap-6">
                {['JPG', 'PNG', 'WEBP', 'GIF', 'AVIF'].map(fmt => (
                  <span key={fmt} className="text-[10px] font-black text-slate-300 tracking-widest">{fmt}</span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Pro Editor Dashboard */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Left: Source Preview */}
            <div className="lg:col-span-5 bg-white p-4 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white">
              <div className="relative group rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center min-h-[400px]">
                <img src={imageUrl!} alt="Original" className="max-h-[500px] object-contain shadow-2xl transition-transform duration-700 group-hover:scale-105" />
                <button 
                  onClick={clearFile}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur text-red-500 rounded-full shadow-lg hover:bg-red-50 transition active:scale-90"
                  title="Remove Image"
                >
                  <X size={20} strokeWidth={3} />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest flex justify-between items-center">
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <span className="text-brand-400">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Engine Settings */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
                    <Settings2 size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight">Output Parameters</h2>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-400 tracking-widest mb-4">Encoding Format</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: "image/jpeg", label: "JPEG", icon: "Best for Photos" },
                        { id: "image/png", label: "PNG", icon: "Lossless / Clear" },
                        { id: "image/webp", label: "WEBP", icon: "Ultra Efficient" }
                      ].map((format) => (
                        <button
                          key={format.id}
                          onClick={() => setTargetFormat(format.id)}
                          className={`relative p-5 rounded-3xl border-2 text-left transition-all duration-300 ${
                            targetFormat === format.id 
                              ? "border-brand-600 bg-brand-50/50 ring-4 ring-brand-50" 
                              : "border-slate-100 bg-slate-50 hover:border-slate-200"
                          }`}
                        >
                          <div className={`text-xl font-black mb-1 ${targetFormat === format.id ? "text-brand-700" : "text-slate-700"}`}>
                            {format.label}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{format.icon}</div>
                          {targetFormat === format.id && (
                            <div className="absolute top-4 right-4 w-5 h-5 bg-brand-600 rounded-full flex items-center justify-center text-white">
                              <Zap size={10} fill="currentColor" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {targetFormat === "image/jpeg" && (
                    <div className="flex items-start gap-4 p-5 rounded-3xl bg-amber-50 border border-amber-100 text-amber-800">
                      <AlertCircle className="shrink-0 mt-0.5" size={18} />
                      <div className="text-sm font-medium leading-relaxed">
                        <strong>Translucency Notice:</strong> JPEG does not support alpha channels. 
                        Transparent areas will be flattened against a solid White background.
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleDownload}
                    disabled={isConverting}
                    className="w-full relative group overflow-hidden py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-slate-900/20 hover:shadow-brand-600/20 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex items-center justify-center gap-3">
                      {isConverting ? <Zap className="animate-pulse" size={20} /> : <Download size={20} />}
                      {isConverting ? "Encoding..." : `Forge ${targetFormat.split("/")[1].toUpperCase()}`}
                    </div>
                  </button>
                </div>
              </div>

              {/* Security Badge */}
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-500 shadow-sm border border-slate-100">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-800 uppercase tracking-widest leading-none mb-1">Hardware Isolated</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Zero Cloud Footprint</div>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hidden Components */}
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
}

