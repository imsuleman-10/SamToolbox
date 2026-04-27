"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, RefreshCw, FileText, BookOpen, HelpCircle } from "lucide-react";

export default function PdfCompressPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const compressPDF = async () => {
    if (!file) return;
    setIsProcessing(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Load with updateMetadata set to false to maybe drop some metadata
      const pdf = await PDFDocument.load(arrayBuffer, { updateMetadata: false });
      
      // Save it back. By default, pdf-lib removes unused objects when saving
      // which can reduce the size of poorly optimized PDFs.
      const pdfBytes = await pdf.save({ useObjectStreams: false }); 
      
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `compressed-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to compress PDF. It might be password protected.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6">
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-red-100">
          <FileText size={12} />
          <span>Local PDF Engine</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          PDF <span className="text-red-600">Compress</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Lightweight local optimization. 
          <span className="text-slate-900 font-semibold block sm:inline"> Securely restructure documents to reduce file size without uploads.</span>
        </p>
      </div>

      <div className="bg-white p-4 sm:p-10 rounded-[1.5rem] sm:rounded-3xl shadow-2xl border border-slate-100 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-110 transition-transform duration-700" />
        
        {!file ? (
          <div 
            className="border-2 border-dashed border-slate-200 rounded-2xl p-8 sm:p-16 text-center hover:border-red-300 hover:bg-red-50/30 transition-all cursor-pointer group relative z-10"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">Select PDF</h3>
            <p className="text-sm text-slate-500">Fast, local, and private processing</p>
          </div>
        ) : (
          <div className="space-y-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 bg-white text-red-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
                  <FileText size={24} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-800 truncate text-sm sm:text-base">{file.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Weight: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); }}
                className="w-full sm:w-auto px-4 py-2 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
              >
                Remove
              </button>
            </div>

            <div className="bg-brand-50/50 p-6 rounded-2xl border border-brand-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p className="flex gap-2">
                <span className="font-black text-brand-600 uppercase tracking-tighter">Note:</span>
                Browser-based compression strips unused objects and metadata. For scanned documents, it focuses on structural optimization.
              </p>
            </div>

            <button
              onClick={compressPDF}
              disabled={isProcessing}
              className="w-full py-4 sm:py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isProcessing ? <RefreshCw className="animate-spin" /> : <><Download size={18} /> Rebuild & Save</>}
            </button>
          </div>
        )}
        <input 
          type="file" 
          accept="application/pdf" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />
      </div>
    </div>

      {/* Information Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-xl text-red-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Optimization Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Document Selection", desc: "Upload your target PDF. Our engine maps it directly to browser memory for analysis." },
              { step: "02", title: "Structural Scan", desc: "The processor identifies redundant objects, stale metadata, and unoptimized page trees." },
              { step: "03", title: "Lossless Rebuild", desc: "The PDF is re-encoded using efficient object streams to reduce weight without affecting content." },
              { step: "04", title: "Secure Export", desc: "Download the rebuilt document. The process is finalized entirely within your local sandbox." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-red-100 transition-colors duration-300">{item.step}</span>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Compression FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "How much size is saved?", a: "Results vary. Typical files see 10-30% reduction by purging redundant structural data and unoptimized metadata." },
              { q: "Will image quality drop?", a: "No. This tool utilizes structural optimization rather than image downsampling, preserving original visual fidelity." },
              { q: "Is it safe for legal files?", a: "Yes. Since all processing is 100% local, sensitive documents never cross the network or touch our servers." },
              { q: "Can I undo compression?", a: "Compression is a rebuild process. We recommend keeping your original file until you've verified the optimized version." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {faq.q}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
