"use client";

import { useState, useRef } from "react";
import Compressor from "compressorjs";
import { Upload, Download, RefreshCw, FileImage, HelpCircle, BookOpen } from "lucide-react";

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | Blob | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        setIsCompressing(false);
      },
    });
  };

  const handleDownload = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const a = document.createElement("a");
    a.href = url;
    a.download = `compressed-${file?.name || "image.jpg"}`;
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
    <>
      <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6">
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-brand-100">
          <FileImage size={12} />
          <span>Local Engine V2</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          Image <span className="text-brand-600">Forge</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Reduce image size without sacrificing quality. 
          <span className="text-slate-900 font-semibold block sm:inline"> Processed 100% locally on your device.</span>
        </p>
      </div>

      <div className="bg-white p-4 sm:p-10 rounded-[1.5rem] sm:rounded-3xl shadow-2xl border border-slate-100 mb-8 sm:mb-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-110 transition-transform duration-700" />
        
        {!file ? (
          <div 
            className="border-2 border-dashed border-slate-200 rounded-2xl p-8 sm:p-16 text-center hover:border-brand-300 hover:bg-brand-50/30 transition-all cursor-pointer group relative z-10"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-brand-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">Select Image</h3>
            <p className="text-sm text-slate-500">JPG, PNG, or WEBP (Max 20MB)</p>
          </div>
        ) : (
          <div className="space-y-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 bg-white text-brand-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <FileImage size={24} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-800 truncate text-sm sm:text-base">{file.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Source: {formatSize(file.size)}</p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setCompressedFile(null); }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
              >
                Reset
              </button>
            </div>

            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Target Quality
                </label>
                <span className="text-2xl font-black text-brand-600">{Math.round(quality * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1" 
                step="0.05" 
                value={quality} 
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-brand-600 mb-4"
              />
              <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <span>Maximum Compression</span>
                <span>Visually Lossless</span>
              </div>
            </div>

            <button
              onClick={handleCompress}
              disabled={isCompressing}
              className="w-full py-4 sm:py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-brand-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isCompressing ? <RefreshCw className="animate-spin" /> : "Initiate Compression"}
            </button>
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
      </div>

      {compressedFile && (
        <div className="bg-slate-900 rounded-[1.5rem] sm:rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-blue-500 to-brand-500" />
          
          <div className="flex flex-col items-center relative z-10">
            <div className="w-16 h-16 bg-brand-500/10 rounded-full flex items-center justify-center mb-6 border border-brand-500/20">
              <RefreshCw className="text-brand-400" />
            </div>
            
            <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Forged Successfully</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 w-full max-w-2xl mb-10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Old Size</p>
                <p className="text-lg font-bold">{formatSize(file!.size)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">New Size</p>
                <p className="text-lg font-bold text-brand-400">{formatSize(compressedFile.size)}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-center col-span-2 sm:col-span-1">
                <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">Savings</p>
                <p className="text-lg font-bold text-green-400">
                  {Math.round((1 - compressedFile.size / file!.size) * 100)}%
                </p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-5 bg-brand-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-lg hover:bg-brand-500 transition-all hover:scale-105"
            >
              <Download size={20} />
              Download Result
            </button>
          </div>
        </div>
      )}
      
      {/* Information Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-brand-50 rounded-xl text-brand-600">
                <BookOpen size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Compression Protocol</h2>
            </div>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Initialize Asset", desc: "Select your high-resolution source image (JPG, PNG, WebP). The engine accepts files up to 20MB for processing." },
                { step: "02", title: "Calibrate Quality", desc: "Adjust the quality slider. Values between 70% and 85% usually provide the best balance between file size and visual fidelity." },
                { step: "03", title: "Initiate Forge", desc: "The compression algorithm runs locally on your device, quantizing pixel data to reduce weight without server interaction." },
                { step: "04", title: "Export Result", desc: "Instantly download your optimized asset. The engine provides a detailed breakdown of space saved during the process." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <span className="text-3xl font-black text-slate-100 group-hover:text-brand-100 transition-colors duration-300">{item.step}</span>
                  <div className="space-y-1">
                    <h3 className="font-black text-slate-800 uppercase tracking-wide text-sm">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-900 rounded-xl text-white">
                <HelpCircle size={20} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Optimization FAQ</h2>
            </div>

            <div className="space-y-4">
              {[
                { q: "Does quality drop significantly?", a: "Our engine uses smart quantization. At 80% quality, most images look identical to the naked eye while being significantly lighter." },
                { q: "Why compress locally?", a: "It's faster and safer. Your raw data never leaves your system, protecting your sensitive assets and personal privacy." },
                { q: "Can I compress PNG files?", a: "Yes, the engine handles JPG, PNG, and WebP, maintaining transparency where applicable during the compression process." },
                { q: "How much space can I save?", a: "Typically 60-90% savings depending on the source resolution and the selected quality calibration." }
              ].map((faq, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                  <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    {faq.q}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
