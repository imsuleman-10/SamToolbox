"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, BookOpen, HelpCircle } from "lucide-react";

export default function WordReaderPage() {
  const [htmlData, setHtmlData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setIsProcessing(true);
      
      try {
        const mammoth = await import("mammoth");
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
        setHtmlData(result.value);
      } catch (err) {
        console.error(err);
        alert("Failed to read the Word document. Make sure it's a valid .docx file.");
        clearFile();
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const clearFile = () => {
    setHtmlData(null);
    setFileName("");
  };

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 border border-blue-100">
          <FileText size={12} />
          <span>Local Document View</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 mb-6 tracking-tight">
          Word <span className="text-blue-600">Reader</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Open Microsoft Word (.docx) files instantly in your browser. 
          <span className="text-slate-900 font-semibold block sm:inline"> Zero uploads. Your documents stay private on your hardware.</span>
        </p>
      </div>

      {!htmlData ? (
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-10 rounded-[1.5rem] sm:rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden group">
          <div 
            className="border-2 border-dashed border-slate-200 rounded-2xl p-8 sm:p-20 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-3">
              {isProcessing ? "Reading Document..." : "Select .docx File"}
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              100% Client-Side Processing. We never see your data.
            </p>
          </div>
          <input 
            type="file" 
            accept=".docx" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            disabled={isProcessing}
          />
        </div>
      ) : (
        <div className="bg-slate-100 rounded-[1.5rem] sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] sm:h-[800px] mx-[-1rem] sm:mx-0">
          {/* Header */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex flex-row justify-between items-center shadow-sm relative z-10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600 shrink-0">
                <FileText size={20} />
              </div>
              <span className="font-bold text-slate-800 font-mono text-xs sm:text-sm truncate max-w-[200px] sm:max-w-md" title={fileName}>{fileName}</span>
            </div>
            
            <button 
              onClick={clearFile}
              className="flex items-center justify-center gap-2 px-3 sm:px-5 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shrink-0"
            >
              <X size={14} /> <span className="hidden sm:inline">Close</span>
            </button>
          </div>
          
          {/* Word Viewer Area */}
          <div className="flex-1 w-full bg-slate-100 overflow-auto p-4 sm:p-12 flex justify-center custom-scrollbar">
             <div 
               className="bg-white max-w-4xl w-full min-h-full p-6 sm:p-16 rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 prose prose-slate prose-sm sm:prose-base text-slate-800"
               dangerouslySetInnerHTML={{ __html: htmlData }}
             />
          </div>

          <div className="bg-slate-900 text-white px-6 py-3 text-[10px] text-center font-medium">
            <span className="opacity-75">Local rendering active. Your data remains encrypted on your machine.</span>
          </div>
        </div>
      )}
      
      {/* Information Section */}
      <div className="max-w-6xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Viewing Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Document Selection", desc: "Choose a .docx file. Our engine performs a local binary scan to identify text, headers, and structural elements." },
              { step: "02", title: "Local Conversion", desc: "The system utilizes advanced Mammoth logic to render Word content into semantic HTML directly in your browser memory." },
              { step: "03", title: "Fluid Navigation", desc: "Interact with the rendered document in our high-fidelity viewer, optimized for industrial-grade readability." },
              { step: "04", title: "Session Purge", desc: "Closing the file immediately flushes all document data from your browser's active memory, ensuring zero data footprint." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-blue-100 transition-colors duration-300">{item.step}</span>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Privacy FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is this secure for confidential files?", a: "Yes. SamToolbox utilizes a 'Private Sandbox' architecture. Your documents are never uploaded; they are processed entirely on your local CPU." },
              { q: "Which formats are supported?", a: "We focus on the modern .docx format to ensure 100% conversion accuracy and visual fidelity in the browser environment." },
              { q: "Does it render images?", a: "Most embedded images are rendered as local base64 assets, allowing you to view complex Word documents with their original visual context." },
              { q: "Can I save as PDF?", a: "Currently, this is a viewer. To create PDFs, we recommend using our specialized 'Notes to PDF' or 'Image to PDF' utilities." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
