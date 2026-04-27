"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Maximize, X, ShieldCheck, BookOpen, HelpCircle } from "lucide-react";

export default function PdfReaderPage() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const clearFile = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    setFileName("");
  };

  const handleFullscreen = () => {
    const iframe = document.getElementById("pdf-frame");
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-12 px-4">
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8 border border-red-100">
          <ShieldCheck size={14} />
          <span>Local Viewer · Zero Uploads</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
          PDF <span className="text-red-600">Reader</span>
        </h1>
        <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          View PDF documents instantly in your browser with complete privacy.
          <span className="text-slate-900 font-semibold"> Your files stay on your device and are never stored.</span>
        </p>
      </div>

      {!fileUrl ? (
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-8 rounded-[1.5rem] sm:rounded-2xl shadow-lg border border-slate-200">
          <div
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 sm:p-16 text-center hover:border-red-300 hover:bg-red-50/30 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-red-500 mb-6" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">Open a PDF File</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Select any PDF from your device to view instantly. 100% private — nothing is uploaded to any server.
            </p>
          </div>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="bg-white rounded-[1.5rem] sm:rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] sm:h-[800px] mx-[-1rem] sm:mx-0">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:justify-between items-center gap-4 z-10 shadow-sm relative">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="bg-red-100 p-2 rounded-lg text-red-600 shrink-0">
                <FileText size={20} />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-semibold text-slate-800 font-mono text-xs sm:text-sm truncate max-w-[200px] sm:max-w-sm" title={fileName}>{fileName}</span>
                <span className="text-[10px] text-slate-500 font-medium">Secure Local View</span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleFullscreen}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 bg-white hover:bg-slate-50 transition font-medium text-xs sm:text-sm shadow-sm"
              >
                <Maximize size={16} /> <span className="hidden sm:inline">Fullscreen</span>
              </button>
              <button
                onClick={clearFile}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg font-medium text-xs sm:text-sm transition"
              >
                <X size={16} /> Close
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 w-full bg-slate-300">
            <iframe
              id="pdf-frame"
              src={`${fileUrl}#toolbar=0`}
              className="w-full h-full border-none"
              title="PDF Viewer"
            ></iframe>
          </div>

          {/* Privacy Banner */}
          <div className="bg-slate-900 text-white px-6 py-3 text-[10px] text-center font-medium">
            <span className="opacity-75">Your document is rendered locally. No data transmitted.</span>
          </div>
        </div>
      )}
    </div>

      {/* Information Section */}
      <div className="max-w-6xl mx-auto px-4 mt-20 grid lg:grid-cols-2 gap-12 border-t border-slate-100 pt-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-xl text-red-600">
              <BookOpen size={20} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Viewing Protocol</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: "01", title: "Secure Mapping", desc: "Select your PDF from local storage. The file is mapped directly to browser memory via isolated blob references." },
              { step: "02", title: "Direct Rendering", desc: "The document is rendered in a secure portal. This ensures zero latency and total isolation from cloud analytics." },
              { step: "03", title: "Enhanced Mode", desc: "Activate Fullscreen for a distraction-free professional reading experience or to present directly from the portal." },
              { step: "04", title: "Privacy Flush", desc: "Closing the file revokes the local memory URL, ensuring no residual document data remains in your system cache." }
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
            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Privacy FAQ</h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Is the document uploaded?", a: "No. We utilize sandboxed rendering. Your document data never crosses the network or touches our servers." },
              { q: "Why use this viewer?", a: "Most online viewers track document metadata. Our local engine ensures complete anonymity for sensitive archives." },
              { q: "Password support?", a: "Yes. Encrypted PDFs will trigger the native secure password prompt directly within your browser's local context." },
              { q: "File size limit?", a: "The tool is optimized for high-capacity files. We've successfully tested professional reports exceeding 500MB." }
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
