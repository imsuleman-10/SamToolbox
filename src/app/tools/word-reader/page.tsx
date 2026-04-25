"use client";

import { useState, useRef } from "react";
import mammoth from "mammoth";
import { Upload, X, FileText } from "lucide-react";

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
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Word Document Reader</h1>
        <p className="text-slate-600">Read Microsoft Word (.docx) files immediately within your browser.</p>
      </div>

      {!htmlData ? (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div 
            className="border-2 border-dashed border-slate-300 rounded-xl p-16 text-center hover:bg-slate-50 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-16 w-16 text-blue-500 mb-6" />
            <h3 className="text-xl font-medium text-slate-800 mb-2">
              {isProcessing ? "Processing Document..." : "Select a Word file (.docx)"}
            </h3>
            <p className="text-slate-500">100% Private - Processed entirely locally.</p>
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
        <div className="bg-slate-100 rounded-2xl shadow-inner border border-slate-300 overflow-hidden flex flex-col min-h-[800px]">
          {/* Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:justify-between items-center shadow-sm">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <FileText size={24} />
              </div>
              <span className="font-semibold text-slate-800 font-mono truncate max-w-sm" title={fileName}>{fileName}</span>
            </div>
            
            <button 
              onClick={clearFile}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg font-medium text-sm transition mt-4 md:mt-0"
            >
              <X size={16} /> Close Document
            </button>
          </div>
          
          {/* Word Viewer Area */}
          <div className="flex-1 w-full bg-slate-100 overflow-auto p-4 md:p-8 flex justify-center">
             <div 
               className="bg-white max-w-4xl w-full min-h-screen p-8 md:p-16 rounded shadow-sm border border-slate-200 prose prose-slate text-slate-800"
               dangerouslySetInnerHTML={{ __html: htmlData }}
             />
          </div>
        </div>
      )}
    </div>
  );
}
