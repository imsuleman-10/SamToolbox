"use client";

import { useState, useRef, ReactNode } from "react";
import Link from "next/link";
import { 
  Upload, Download, FileText, CheckCircle2, ArrowRight, 
  RotateCw, Trash2, ArrowLeft, Plus, ShieldCheck, Sparkles 
} from "lucide-react";

export interface ToolWorkspaceProps {
  title: string;
  description: string;
  acceptedFileTypes?: string;
  allowMultiple?: boolean;
  actionButtonText: string;
  categoryLabel?: string;
  badge?: string;
  optionsPanel?: (files: File[]) => ReactNode;
  onProcess: (files: File[]) => Promise<{ 
    downloadData?: Uint8Array | Blob | string; 
    filename?: string; 
    mimeType?: string; 
    savedPercent?: number;
    extraMessage?: string;
  }>;
}

export default function ToolWorkspace({
  title,
  description,
  acceptedFileTypes = ".pdf,application/pdf",
  allowMultiple = false,
  actionButtonText,
  categoryLabel = "PDF Tool",
  badge,
  optionsPanel,
  onProcess,
}: ToolWorkspaceProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState<{
    downloadData?: Uint8Array | Blob | string;
    filename?: string;
    mimeType?: string;
    savedPercent?: number;
    extraMessage?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      if (allowMultiple) {
        setFiles(prev => [...prev, ...droppedFiles]);
      } else {
        setFiles([droppedFiles[0]]);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      if (allowMultiple) {
        setFiles(prev => [...prev, ...selected]);
      } else {
        setFiles([selected[0]]);
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const resetAll = () => {
    setFiles([]);
    setIsDone(false);
    setResult(null);
  };

  const handleExecute = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    try {
      const res = await onProcess(files);
      setResult(res);
      setIsDone(true);
      
      // Auto-trigger download
      if (res.downloadData && res.filename) {
        const blob = res.downloadData instanceof Blob 
          ? res.downloadData 
          : new Blob([res.downloadData as any], { type: res.mimeType || "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = res.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "An error occurred while processing the file. Please check file format and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#f8fafc] text-slate-800 flex flex-col justify-between">
      {/* Top Breadcrumb & Header */}
      <section className="pt-10 pb-6 px-4 max-w-5xl mx-auto text-center w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#e5322d] rounded-full text-xs font-semibold mb-3 border border-red-100">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e5322d]" />
          {categoryLabel}
          {badge && <span className="ml-1 px-1.5 py-0.5 bg-[#e5322d] text-white rounded text-[10px]">{badge}</span>}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-3">
          {title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </section>

      {/* Main Interactive Stage */}
      <div className="flex-1 max-w-5xl mx-auto px-4 w-full pb-16 flex flex-col justify-center">
        {/* Hidden File Input */}
        <input 
          ref={fileInputRef} 
          type="file" 
          accept={acceptedFileTypes} 
          multiple={allowMultiple} 
          onChange={handleFileInput} 
          className="hidden" 
        />

        {/* STAGE 1: Drag & Drop Zone (No files chosen yet) */}
        {files.length === 0 && !isDone && (
          <div 
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-10 sm:p-16 text-center transition-all bg-white shadow-sm flex flex-col items-center justify-center ${
              dragActive 
                ? "border-[#e5322d] bg-red-50/40 scale-[1.01]" 
                : "border-slate-300 hover:border-slate-400"
            }`}
          >
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-5 rounded-2xl bg-[#e5322d] hover:bg-[#cc241f] text-white text-lg font-bold shadow-xl shadow-red-500/25 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 mb-4 cursor-pointer"
            >
              <Upload className="w-6 h-6" />
              {allowMultiple ? "Select PDF files" : "Select PDF file"}
            </button>
            <p className="text-slate-500 text-sm font-medium mb-8">
              or drop {allowMultiple ? "PDFs" : "PDF"} here
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-6 border-t border-slate-100 max-w-md w-full">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                100% In-Browser Privacy
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Instant Processing
              </span>
            </div>
          </div>
        )}

        {/* STAGE 2: Interactive Workbench (Files Selected, configuring options) */}
        {files.length > 0 && !isDone && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* File List / Preview Area */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#e5322d]" />
                    Selected {files.length} {files.length === 1 ? "file" : "files"}
                  </h3>
                  {allowMultiple && (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold text-[#e5322d] hover:text-[#cc241f] flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add more files
                    </button>
                  )}
                </div>

                <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                  {files.map((file, idx) => (
                    <div 
                      key={`${file.name}-${idx}`}
                      className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-lg bg-red-100 text-[#e5322d] flex items-center justify-center shrink-0 font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-semibold text-slate-900 truncate">{file.name}</p>
                          <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>

                      <button 
                        onClick={() => removeFile(idx)}
                        className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between mt-6">
                <button
                  onClick={resetAll}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Cancel & choose other
                </button>
                <span className="text-xs text-slate-400">Total: {files.length} file(s)</span>
              </div>
            </div>

            {/* Tool Options & Action Column */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Tool Settings
                </h4>
                {optionsPanel ? optionsPanel(files) : (
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Default high-efficiency settings selected. Click the button below to process your PDF instantly.
                  </p>
                )}
              </div>

              <div className="pt-6 mt-6">
                <button
                  disabled={isProcessing}
                  onClick={handleExecute}
                  className="w-full py-4 rounded-xl bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-base shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <RotateCw className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {actionButtonText}
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: Completion & Download Screen */}
        {isDone && (
          <div className="bg-white rounded-3xl p-10 sm:p-14 text-center shadow-sm border border-slate-200 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              PDF successfully processed!
            </h2>
            <p className="text-slate-600 text-sm max-w-md mb-6">
              {result?.extraMessage || "Your file is ready. If your download did not start automatically, click the button below."}
            </p>

            {result?.savedPercent && result.savedPercent > 0 && (
              <div className="mb-6 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-bold inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Compressed file is {result.savedPercent}% smaller!
              </div>
            )}

            {result?.downloadData && (
              <button
                onClick={() => {
                  if (!result.downloadData || !result.filename) return;
                  const blob = result.downloadData instanceof Blob 
                    ? result.downloadData 
                    : new Blob([result.downloadData as any], { type: result.mimeType || "application/pdf" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = result.filename;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  setTimeout(() => URL.revokeObjectURL(url), 2000);
                }}
                className="px-8 py-4 rounded-xl bg-[#e5322d] hover:bg-[#cc241f] text-white font-bold text-base shadow-xl shadow-red-500/25 flex items-center gap-2 mb-6 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download {result.filename || "PDF"}
              </button>
            )}

            <div className="flex items-center gap-4 text-xs font-semibold">
              <button
                onClick={resetAll}
                className="text-slate-600 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
              >
                Process another file
              </button>
              <span className="text-slate-300">•</span>
              <Link 
                href="/tools" 
                className="text-[#e5322d] hover:text-[#cc241f]"
              >
                Explore other tools →
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Trust & Features Footer Banner */}
      <section className="border-t border-slate-200/80 bg-white py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-around gap-6 text-center text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span><strong>100% Secure:</strong> No files leave your browser</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#e5322d] shrink-0" />
            <span><strong>Zero limits:</strong> 100% Free & Unlimited</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
            <span><strong>ISO Compliant:</strong> Standard PDF output</span>
          </div>
        </div>
      </section>
    </div>
  );
}
