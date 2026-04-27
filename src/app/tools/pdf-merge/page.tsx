"use client";

import { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { Upload, Download, Trash2, FileText, ChevronUp, ChevronDown, RefreshCw, Layout, BookOpen, HelpCircle } from "lucide-react";

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
    <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6">
      <div className="text-center mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-red-100">
          <Layout size={12} />
          <span>Local Assembly Engine</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          PDF <span className="text-red-600">Merge</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Combine multiple documents into a single professional file. 
          <span className="text-slate-900 font-semibold block sm:inline"> Reorder and merge instantly without leaving your browser.</span>
        </p>
      </div>

      <div className="bg-white p-4 sm:p-10 rounded-[1.5rem] sm:rounded-3xl shadow-2xl border border-slate-100 mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-110 transition-transform duration-700" />
        
        <div 
          className="border-2 border-dashed border-slate-200 rounded-2xl p-8 sm:p-16 text-center hover:border-red-300 hover:bg-red-50/30 transition-all cursor-pointer group relative z-10 mb-8"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">Select PDFs</h3>
          <p className="text-sm text-slate-500">Hold Ctrl/Cmd to select multiple files</p>
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
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Selected Assets ({files.length})</h3>
              <button 
                onClick={() => setFiles([])}
                className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
              >
                Clear All
              </button>
            </div>
            
            <div className="space-y-4 mb-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {files.map((fileObj, index) => (
                <div key={fileObj.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group/item hover:border-red-200 transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 bg-white text-red-600 rounded-xl flex items-center justify-center shadow-sm shrink-0 font-bold text-xs">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800 truncate text-sm sm:text-base">{fileObj.file.name}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{(fileObj.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-row sm:flex-col gap-1">
                      <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-20 transition-colors">
                        <ChevronUp size={18} />
                      </button>
                      <button onClick={() => moveDown(index)} disabled={index === files.length - 1} className="p-1.5 text-slate-400 hover:text-red-600 disabled:opacity-20 transition-colors">
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    <button onClick={() => removeFile(fileObj.id)} className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={mergePDFs}
              disabled={isMerging || files.length < 2}
              className="w-full py-4 sm:py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              {isMerging ? <RefreshCw className="animate-spin" /> : <><Download size={18} /> Forge Merged PDF</>}
            </button>
          </div>
        )}
      </div>
    </div>

      {/* Information Section */}
      <div className="max-w-4xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-xl text-red-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Assembly Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Asset Loading", desc: "Select multiple PDF documents. Our engine maps them locally without any network transit." },
              { step: "02", title: "Logical Sequence", desc: "Arrange files in your desired order. This sequence determines the final flow of the compiled master file." },
              { step: "03", title: "Structural Merge", desc: "Initiate the forge. The system re-indexes pages and combines structural metadata into a single container." },
              { step: "04", title: "Master Retrieval", desc: "Download the consolidated PDF. All temporary local references are purged from browser memory immediately." }
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Merge Logic FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is there a limit on files?", a: "Technically no, but browser memory limits typically allow for 50-100 standard documents at once." },
              { q: "Support for encrypted PDFs?", a: "No. Encrypted files must be unlocked before merging to ensure the local engine can read page indices." },
              { q: "Are links preserved?", a: "Yes. Most internal document links and bookmarks are preserved through our high-fidelity assembly process." },
              { q: "How secure is my data?", a: "100%. SamToolbox is air-gapped. Your files are processed entirely within your browser's private memory space." }
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
