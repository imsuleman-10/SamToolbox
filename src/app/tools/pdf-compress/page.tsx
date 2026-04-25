"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, RefreshCw, FileText } from "lucide-react";

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
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Compress PDF</h1>
        <p className="text-slate-600">Lightweight local PDF optimization. Securely restructures documents to reduce file size.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
        {!file ? (
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 text-brand-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">Select a PDF</h3>
            <p className="text-slate-500">Max size based on your device limits</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 mb-1">{file.name}</h4>
                  <p className="text-sm text-slate-500 shrink-0">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); }}
                className="text-slate-400 hover:text-red-500 transition ml-4"
              >
                Remove
              </button>
            </div>

             <div className="bg-brand-50 p-4 rounded-xl border border-brand-100 text-sm text-slate-600 space-y-2">
                <p><strong>Note:</strong> Browser-based PDF compression is lightweight. It rebuilds the document structure and strips unused objects. Large scanned PDFs with images may not compress significantly.</p>
              </div>

            <button
              onClick={compressPDF}
              disabled={isProcessing}
              className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold shadow-md hover:bg-brand-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? <RefreshCw className="animate-spin" /> : <><Download size={20} /> Compress PDF</>}
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
  );
}
