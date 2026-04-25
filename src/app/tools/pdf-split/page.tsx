"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, RefreshCw, FileText } from "lucide-react";

export default function PdfSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [range, setRange] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setRange("");
      
      try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        setPageCount(pdf.getPageCount());
      } catch (err) {
        console.error(err);
        alert("Failed to load PDF. It might be password protected.");
        setFile(null);
      }
    }
  };

  const splitPDF = async () => {
    if (!file || !range) return;
    setIsProcessing(true);
    
    try {
      const pagesToExtract = parseRange(range, pageCount);
      if (pagesToExtract.length === 0) {
        alert("Invalid page range.");
        setIsProcessing(false);
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      const originalPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(originalPdf, pagesToExtract.map(p => p - 1));
      copiedPages.forEach((page) => {
        newPdf.addPage(page);
      });

      const pageBytes = await newPdf.save();
      const blob = new Blob([pageBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = `split-${file.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to split PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper to parse "1, 3-5, 8" into [1, 3, 4, 5, 8]
  const parseRange = (input: string, maxPages: number): number[] => {
    const pages = new Set<number>();
    const parts = input.split(",").map(p => p.trim());
    
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(n => parseInt(n));
        if (start && end && start <= end && start >= 1 && end <= maxPages) {
          for (let i = start; i <= end; i++) pages.add(i);
        }
      } else {
        const page = parseInt(part);
        if (page && page >= 1 && page <= maxPages) {
          pages.add(page);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Split PDF</h1>
        <p className="text-slate-600">Extract specific pages from your PDF file securely in your browser.</p>
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
                  <p className="text-sm text-slate-500 shrink-0">{pageCount} pages total</p>
                </div>
              </div>
              <button 
                onClick={() => { setFile(null); setPageCount(0); }}
                className="text-slate-400 hover:text-red-500 transition ml-4"
              >
                Remove
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pages to Extract (e.g. 1, 3-5, 8)
              </label>
              <input 
                type="text" 
                value={range} 
                onChange={(e) => setRange(e.target.value)}
                placeholder="1-3, 5, 8"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
              />
            </div>

            <button
              onClick={splitPDF}
              disabled={isProcessing || !range}
              className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold shadow-md hover:bg-brand-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? <RefreshCw className="animate-spin" /> : <><Download size={20} /> Extract and Download</>}
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
