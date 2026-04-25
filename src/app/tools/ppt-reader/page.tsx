"use client";

import { useState, useRef } from "react";
import JSZip from "jszip";
import { Upload, X, Presentation, Info, CheckCircle2, Zap } from "lucide-react";

export default function PptReaderPage() {
  const [slides, setSlides] = useState<string[]>([]);
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
        const zip = await JSZip.loadAsync(arrayBuffer);
        
        // Find all slide files: ppt/slides/slide*.xml
        const slideFiles = Object.keys(zip.files).filter(path => 
          /^ppt\/slides\/slide\d+\.xml$/.test(path)
        );
        
        // Sort slides by number
        slideFiles.sort((a, b) => {
          const numA = parseInt(a.match(/slide(\d+)/)?.[1] || "0");
          const numB = parseInt(b.match(/slide(\d+)/)?.[1] || "0");
          return numA - numB;
        });

        const extractedSlides: string[] = [];

        for (const filePath of slideFiles) {
          const xmlContent = await zip.files[filePath].async("string");
          const parser = new DOMParser();
          const doc = parser.parseFromString(xmlContent, "application/xml");
          
          // PPTX text nodes are usually in <a:t>
          const textNodes = doc.getElementsByTagName("a:t");
          const slideTextContent = Array.from(textNodes)
            .map(node => node.textContent)
            .join(" ")
            .trim();
            
          extractedSlides.push(slideTextContent);
        }

        setSlides(extractedSlides.length ? extractedSlides : ["No text contents found in presentation."]);
      } catch (err) {
        console.error(err);
        alert("Failed to read the PowerPoint. Make sure it's a valid .pptx file.");
        clearFile();
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const clearFile = () => {
    setSlides([]);
    setFileName("");
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-orange-100">
          <Presentation size={14} />
          <span>No PowerPoint Required</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
          PowerPoint <span className="text-orange-600">Text Viewer</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          Extract and read text from PPTX presentations instantly — no Microsoft Office needed.
          <span className="text-slate-900 font-semibold"> Perfect for quickly scanning slide content, preparing for meetings, or accessing presentation notes. All processing happens locally in your browser.</span>
        </p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 text-[11px] font-bold rounded-lg border border-amber-200">
          <Info size={12} />
          <span>Images & graphics are not rendered — text content only</span>
        </div>
      </div>

      {slides.length === 0 ? (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div
            className="border-2 border-dashed border-slate-300 rounded-xl p-16 text-center hover:border-orange-300 hover:bg-orange-50/30 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-16 w-16 text-orange-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Select a PowerPoint File</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Choose any .pptx file to extract slide text instantly. Your file never leaves your device.
            </p>
          </div>
          <input
            type="file"
            accept=".pptx"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col min-h-[600px]">
          {/* Header */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:justify-between items-center gap-4 shadow-sm relative">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                <Presentation size={24} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 font-mono text-sm truncate max-w-sm" title={fileName}>{fileName}</span>
                <span className="text-[10px] text-slate-500 font-medium">Local Extraction · Private</span>
              </div>
            </div>

            <button
              onClick={clearFile}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg font-medium text-sm transition shrink-0"
            >
              <X size={16} /> Close File
            </button>
          </div>

          {/* Slides Viewer */}
          <div className="flex-1 w-full bg-slate-100 overflow-y-auto p-4 md:p-8 space-y-6 flex flex-col items-center">
            {slides.map((text, idx) => (
              <div key={idx} className="bg-white w-full max-w-4xl p-6 md:p-10 rounded-xl shadow border border-slate-200 relative aspect-video flex items-center justify-center text-center overflow-hidden">
                <div className="absolute top-4 left-4 bg-orange-100 text-orange-600 font-bold px-3 py-1 rounded text-xs shadow-sm">
                  Slide {idx + 1}
                </div>
                <div className="text-slate-800 text-lg md:text-xl font-medium leading-relaxed max-w-2xl px-4">
                  {text || <span className="text-slate-400 italic">No textual content found on this slide</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* How It Works */}
      {slides.length === 0 && (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Upload size={20} className="text-orange-600" />
            </div>
            <h3 className="text-sm font-black text-slate-800 mb-1.5 uppercase tracking-wide">1. Upload File</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select any .pptx file from your device — no email or account required.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <Zap size={20} className="text-orange-600" />
            </div>
            <h3 className="text-sm font-black text-slate-800 mb-1.5 uppercase tracking-wide">2. Extract Text</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our tool reads all slides and extracts every piece of text content instantly.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
              <CheckCircle2 size={20} className="text-orange-600" />
            </div>
            <h3 className="text-sm font-black text-slate-800 mb-1.5 uppercase tracking-wide">3. Read & Copy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Browse slide-by-slide. Copy any text instantly for your notes or reports.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
