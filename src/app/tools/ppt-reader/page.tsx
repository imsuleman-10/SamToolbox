"use client";

import { useState, useRef } from "react";
import { Upload, X, Presentation, Info, CheckCircle2, Zap, BookOpen, HelpCircle } from "lucide-react";

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
        const JSZip = (await import("jszip")).default;
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
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-[1.5rem] sm:rounded-2xl shadow-lg border border-slate-200">
          <div
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 sm:p-16 text-center hover:border-orange-300 hover:bg-orange-50/30 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-orange-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Select a PowerPoint File</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
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
        <div className="bg-slate-50 rounded-[1.5rem] sm:rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col min-h-[500px] sm:min-h-[600px] mx-[-1rem] sm:mx-0">
          {/* Header */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between items-center gap-4 shadow-sm relative">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600 shrink-0">
                <Presentation size={20} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold text-slate-800 font-mono text-xs sm:text-sm truncate max-w-[200px] sm:max-w-sm" title={fileName}>{fileName}</span>
                <span className="text-[10px] text-slate-500 font-medium">Local Extraction · Private</span>
              </div>
            </div>

            <button
              onClick={clearFile}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg font-medium text-sm transition shrink-0"
            >
              <X size={16} /> Close File
            </button>
          </div>

          {/* Slides Viewer */}
          <div className="flex-1 w-full bg-slate-100 overflow-y-auto p-4 sm:p-8 space-y-6 flex flex-col items-center">
            {slides.map((text, idx) => (
              <div key={idx} className="bg-white w-full max-w-4xl p-6 sm:p-10 rounded-xl shadow border border-slate-200 relative aspect-video flex items-center justify-center text-center overflow-hidden">
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-orange-100 text-orange-600 font-bold px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs shadow-sm">
                  Slide {idx + 1}
                </div>
                <div className="text-slate-800 text-sm sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl px-4 overflow-y-auto scrollbar-hide max-h-full">
                  {text || <span className="text-slate-400 italic text-sm">No textual content found on this slide</span>}
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
      
      {/* Information Section */}
      <div className="max-w-7xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-xl text-orange-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Extraction Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Package Decomposition", desc: "Choose a .pptx file. Our engine utilizes JSZip to deconstruct the presentation package into its component XML structures." },
              { step: "02", title: "XML Parsing", desc: "The system scans the /ppt/slides/ directory to locate text nodes within the XML schema, extracting raw textual data from every slide." },
              { step: "03", title: "Sequence Alignment", desc: "We sort the extracted data by slide number to ensure your reading flow matches the original presentation's narrative structure." },
              { step: "04", title: "Session Flush", desc: "Closing the file immediately clears the slides from your browser's active session. We maintain a zero-log policy for all document data." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group">
                <span className="text-3xl font-black text-slate-100 group-hover:text-orange-100 transition-colors duration-300">{item.step}</span>
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Intelligence FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Why are images missing?", a: "This tool is a 'Textual Extraction Engine'. We focus on the underlying data to provide a high-speed, low-bandwidth reading experience." },
              { q: "Is my presentation safe?", a: "Yes. SamToolbox utilizes 'Local Deconstruction' technology. Your file is never uploaded; it is parsed entirely within your browser." },
              { q: "Can I extract from .ppt?", a: "Currently, we support the modern XML-based .pptx format. Older .ppt files should be converted to .pptx before using this tool." },
              { q: "How fast is the extraction?", a: "Extraction is nearly instantaneous. Even for 100+ slide presentations, the local XML parsing logic completes the task in seconds." }
            ].map((faq, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
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
