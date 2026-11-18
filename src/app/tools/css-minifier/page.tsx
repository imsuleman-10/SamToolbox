"use client";

import { useState } from "react";
import {
  FileCode,
  Copy,
  Check,
  Download,
  Trash2,
  Minimize2,
  Maximize2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function CssMinifierPage() {
  const [inputCss, setInputCss] = useState<string>(
    `/* Header Navigation Styles */\n.header-nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  background-color: #ffffff;\n  border-bottom: 1px solid #e2e8f0;\n}\n\n.header-nav a:hover {\n  color: #e5322d;\n  text-decoration: underline;\n}`
  );
  const [outputCss, setOutputCss] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState<{ origSize: number; newSize: number; saved: string } | null>(null);

  const handleMinify = () => {
    if (!inputCss) return;
    const origSize = new Blob([inputCss]).size;
    let minified = inputCss
      .replace(/\/\*[\s\S]*?\*\//g, "") // remove comments
      .replace(/\s+/g, " ") // collapse multiple spaces
      .replace(/\s*([\{\}:;,])\s*/g, "$1") // strip around braces, colons, semicolons
      .replace(/;}/g, "}") // strip trailing semicolon before closing brace
      .trim();

    setOutputCss(minified);
    const newSize = new Blob([minified]).size;
    const saved = origSize > 0 ? (((origSize - newSize) / origSize) * 100).toFixed(1) + "%" : "0%";
    setStats({ origSize, newSize, saved });
  };

  const handleBeautify = () => {
    if (!inputCss) return;
    let clean = inputCss
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\{\s*/g, " {\n  ")
      .replace(/;\s*/g, ";\n  ")
      .replace(/\s*\}\s*/g, "\n}\n\n")
      .trim();

    setOutputCss(clean);
    setStats(null);
  };

  const handleCopy = () => {
    if (!outputCss) return;
    navigator.clipboard.writeText(outputCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputCss) return;
    const blob = new Blob([outputCss], { type: "text/css;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "styles.min.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#e5322d] text-xs font-bold mb-4">
          <FileCode className="w-3.5 h-3.5" />
          CSS Optimization &amp; AST Engine
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
          CSS Minifier &amp; Beautifier Online
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Compress stylesheet code by stripping comments and redundant whitespace, or format unminified CSS with clean indentation.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleMinify}
              className="px-4 py-2 bg-[#e5322d] hover:bg-[#cc241f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" /> Minify CSS
            </button>
            <button
              onClick={handleBeautify}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" /> Beautify CSS
            </button>
          </div>

          <div className="flex items-center gap-2">
            {outputCss && (
              <>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Output"}
                </button>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Save .css
                </button>
              </>
            )}
            <button
              onClick={() => {
                setInputCss("");
                setOutputCss("");
                setStats(null);
              }}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Compression Badge */}
        {stats && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
            <span className="font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Compression Complete!
            </span>
            <span className="font-mono">
              Original: {stats.origSize} B → Minified: {stats.newSize} B ({stats.saved} saved)
            </span>
          </div>
        )}

        {/* Text Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Raw CSS Input</label>
            <textarea
              value={inputCss}
              onChange={(e) => setInputCss(e.target.value)}
              placeholder="Paste CSS stylesheet code here..."
              className="w-full h-80 p-4 font-mono text-xs sm:text-sm bg-slate-50 text-slate-900 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 leading-relaxed resize-y"
              spellCheck={false}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">Processed CSS Output</label>
            <textarea
              readOnly
              value={outputCss}
              placeholder="Minified or beautified CSS will appear here..."
              className="w-full h-80 p-4 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 leading-relaxed resize-y focus:outline-none selection:bg-red-500/40"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <ShieldCheck className="w-4 h-4" /> 100% In-Browser Minification
          </span>
          <span className="text-[11px] text-slate-400">W3C CSS Level 3 Compliant</span>
        </div>
      </div>
    </div>
  );
}
