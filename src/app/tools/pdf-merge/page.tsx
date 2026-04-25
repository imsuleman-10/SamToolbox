"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, Trash2, FileText, ChevronUp, ChevronDown, RefreshCw } from "lucide-react";

export default function PdfMergePage() {
  const [files, setFiles] = useState<{ file: File; id: string }[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        id: Math.random().toString(36).substring(7)
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    setFiles(prev => {
      const copy = [...prev];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    setFiles(prev => {
      const copy = [...prev];
      [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
      return copy;
    });
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge.");
      return;
    }
    
    setIsMerging(true);
    
    try {
      const mergedPdf = await PDFDocument.create();

      for (const { file } of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged-document.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Failed to merge PDFs. Make sure they are not password protected.");
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Merge PDF</h1>
        <p className="text-slate-600">Combine multiple PDF files into one easily. 100% Secure & Local.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
        <div 
          className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:bg-slate-50 transition cursor-pointer mb-6"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-brand-500 mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-2">Select PDF files</h3>
          <p className="text-slate-500">Hold ctrl/cmd to select multiple files</p>
        </div>

        <input 
          type="file" 
          accept="application/pdf" 
          multiple
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
        />

        {files.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Files to Merge ({files.length})</h3>
              <button 
                onClick={() => setFiles([])}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-3 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {files.map((fileObj, index) => (
                <div key={fileObj.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-100 text-red-500 rounded-lg flex items-center justify-center shrink-0">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 truncate max-w-xs">{fileObj.file.name}</p>
                      <p className="text-xs text-slate-500">{(fileObj.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1 text-slate-400 hover:text-brand-600 disabled:opacity-30">
                        <ChevronUp size={18} />
                      </button>
                      <button onClick={() => moveDown(index)} disabled={index === files.length - 1} className="p-1 text-slate-400 hover:text-brand-600 disabled:opacity-30">
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    <button onClick={() => removeFile(fileObj.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={mergePDFs}
              disabled={isMerging || files.length < 2}
              className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold shadow-md hover:bg-brand-700 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isMerging ? <RefreshCw className="animate-spin" /> : <><Download size={20} /> Merge PDFs</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
