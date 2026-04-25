"use client";

import { useState, useRef } from "react";
import { Upload, FileText, Maximize, X, ShieldCheck } from "lucide-react";

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
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-red-100">
          <ShieldCheck size={14} />
          <span>Local Viewer · Zero Uploads</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
          PDF <span className="text-red-600">Reader</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          View PDF documents instantly in your browser with complete privacy.
          <span className="text-slate-900 font-semibold"> No server uploads, no tracking — your files stay on your device and are never stored.</span>
        </p>
      </div>

      {!fileUrl ? (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div
            className="border-2 border-dashed border-slate-300 rounded-xl p-16 text-center hover:border-red-300 hover:bg-red-50/30 transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto h-16 w-16 text-red-500 mb-6" />
            <h3 className="text-xl font-medium text-slate-800 mb-2">Open a PDF File</h3>
            <p className="text-slate-500 max-w-md mx-auto">
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
        <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden flex flex-col h-[800px]">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:justify-between items-center gap-4 z-10 shadow-sm relative">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="bg-red-100 p-2 rounded-lg text-red-600">
                <FileText size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-slate-800 font-mono text-sm truncate max-w-sm" title={fileName}>{fileName}</span>
                <span className="text-[10px] text-slate-500 font-medium">Secure Local View</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleFullscreen}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-600 bg-white hover:bg-slate-50 transition font-medium text-sm shadow-sm"
              >
                <Maximize size={16} /> Fullscreen
              </button>
              <button
                onClick={clearFile}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg font-medium text-sm transition"
              >
                <X size={16} /> Close File
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
          <div className="bg-slate-900 text-white px-6 py-3 text-xs text-center font-medium">
            <span className="opacity-75">Your document is rendered locally. No data has been or will be transmitted to any server.</span>
          </div>
        </div>
      )}
    </div>
  );
}
